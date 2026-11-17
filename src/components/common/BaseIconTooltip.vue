<script setup>
import { nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue';
import { CircleHelp } from 'lucide-vue-next';
// 아이콘 버튼과 짧은 설명을 묶습니다. tooltip 안에는 링크·버튼을 넣지 않습니다.
const props = defineProps({
  label: { type: String, required: true },
  text: { type: String, required: true },
  placement: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom'].includes(value)
  }
});
const id = useId();
const trigger = ref(null);
const bubble = ref(null);
const visible = ref(false);
const pinned = ref(false);
const focused = ref(false);
const hovered = ref(false);
const position = ref({ left: '0px', top: '0px' });
const side = ref('top');
let closeTimer;
function cancelClose() {
  clearTimeout(closeTimer);
}
function show() {
  cancelClose();
  visible.value = true;
}
function dismiss() {
  cancelClose();
  pinned.value = false;
  visible.value = false;
}
function leave() {
  cancelClose();
  closeTimer = setTimeout(() => {
    if (!pinned.value && !focused.value && !hovered.value) visible.value = false;
  }, 120);
}
function pointerEnter(event) {
  if (event.pointerType === 'touch') return;
  hovered.value = true;
  show();
}
function pointerLeave() {
  hovered.value = false;
  leave();
}
function focus() {
  focused.value = true;
  show();
}
function blur() {
  focused.value = false;
  pinned.value = false;
  leave();
}
function toggle() {
  // focus로 열린 상태여도 첫 탭은 고정, 두 번째 탭은 닫힘으로 동작합니다.
  if (pinned.value) dismiss();
  else {
    pinned.value = true;
    show();
  }
}
function updatePosition() {
  if (!visible.value || !trigger.value || !bubble.value) return;
  const anchor = trigger.value.getBoundingClientRect();
  const box = bubble.value.getBoundingClientRect();
  const gap = 9;
  const edge = 12;
  if (anchor.bottom < 0 || anchor.top > window.innerHeight) {
    dismiss();
    return;
  }
  const above = anchor.top - edge;
  const below = window.innerHeight - anchor.bottom - edge;
  const useTop =
    props.placement === 'top'
      ? above >= box.height + gap || above > below
      : below < box.height + gap && above > below;
  side.value = useTop ? 'top' : 'bottom';
  const left = Math.max(
    edge,
    Math.min(anchor.left + anchor.width / 2 - box.width / 2, window.innerWidth - box.width - edge)
  );
  const top = Math.max(
    edge,
    Math.min(
      useTop ? anchor.top - gap - box.height : anchor.bottom + gap,
      window.innerHeight - box.height - edge
    )
  );
  position.value = {
    left: `${left}px`,
    top: `${top}px`,
    '--tooltip-arrow': `${Math.max(12, Math.min(box.width - 12, anchor.left + anchor.width / 2 - left))}px`
  };
}
function outside(event) {
  if (!trigger.value?.contains(event.target) && !bubble.value?.contains(event.target)) dismiss();
}
function onEscape(event) {
  if (event.key === 'Escape' && visible.value) dismiss();
}
watch([visible, () => props.text, () => props.placement], async () => {
  if (visible.value) {
    await nextTick();
    updatePosition();
  }
});
onMounted(() => {
  document.addEventListener('pointerdown', outside);
  window.addEventListener('keydown', onEscape);
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition, true);
});
onUnmounted(() => {
  cancelClose();
  document.removeEventListener('pointerdown', outside);
  window.removeEventListener('keydown', onEscape);
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition, true);
});
</script>
<template>
  <span class="base-icon-tooltip">
    <button
      ref="trigger"
      type="button"
      class="base-icon-tooltip__trigger"
      :aria-label="label"
      :aria-describedby="visible ? id : undefined"
      @pointerenter="pointerEnter"
      @pointerleave="pointerLeave"
      @focus="focus"
      @blur="blur"
      @click.stop="toggle"
    >
      <slot><CircleHelp :size="13" aria-hidden="true" /></slot>
    </button>
    <!-- body로 이동시켜 카드의 overflow:hidden에 잘리지 않도록 합니다. -->
    <Teleport to="body">
      <span
        v-if="visible"
        :id="id"
        ref="bubble"
        role="tooltip"
        class="base-icon-tooltip__bubble"
        :class="`base-icon-tooltip__bubble--${side}`"
        :style="position"
        @pointerenter="pointerEnter"
        @pointerleave="pointerLeave"
      >
        {{ text }}
      </span>
    </Teleport>
  </span>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-icon-tooltip {
  display: inline-flex;
  &__trigger {
    @include flex-center;
    width: 24px;
    height: 24px;
    padding: 3px;
    margin: -2px -5px -2px 0;
    border: 0;
    border-radius: 50%;
    color: inherit;
    background: transparent;
    cursor: pointer;
    &:hover:not(:disabled) {
      background: color-mix(in srgb, currentColor 12%, transparent);
    }
    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }
  &__bubble {
    position: fixed;
    z-index: 300;
    box-sizing: border-box;
    width: max-content;
    max-width: min(280px, calc(100vw - 24px));
    padding: 11px 14px;
    border: 1px solid #44516a;
    border-radius: 9px;
    box-shadow: 0 6px 24px #0003;
    background: #19253b;
    color: #fff;
    white-space: normal;
    overflow-wrap: anywhere;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.8;
    text-align: left;
    // 트리거와 설명 사이의 빈 공간도 hover 영역으로 연결합니다.
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 10px;
    }
    &--top::before {
      top: 100%;
    }
    &--bottom::before {
      bottom: 100%;
    }
    &::after {
      content: '';
      position: absolute;
      left: var(--tooltip-arrow);
      transform: translateX(-50%);
      border: 6px solid transparent;
    }
    &--top::after {
      top: 100%;
      border-top-color: #19253b;
    }
    &--bottom::after {
      bottom: 100%;
      border-bottom-color: #19253b;
    }
  }
}
</style>
