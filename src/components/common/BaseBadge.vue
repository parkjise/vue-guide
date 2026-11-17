<script setup>
// 업무 상태(승인/대기 등)는 부모에서 tone과 표시 문구로 변환합니다.
defineProps({
  tone: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'success', 'warning', 'danger', 'info', 'neutral'].includes(value)
  },
  size: { type: String, default: 'md', validator: (value) => ['sm', 'md'].includes(value) },
  dot: { type: Boolean, default: false }
});
</script>
<template>
  <span class="base-badge" :class="[`base-badge--${tone}`, `base-badge--${size}`]">
    <span v-if="dot" class="base-badge__dot" aria-hidden="true" />
    <slot />
  </span>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-badge {
  @include flex-center;
  display: inline-flex;
  gap: 5px;
  border-radius: 9999px;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 600;
  color: var(--primary);
  background: var(--soft);
  white-space: nowrap;
  &--success {
    color: #047857;
    background: #10b98120;
  }
  &--warning {
    color: #93610b;
    background: #f59e0b20;
  }
  &--danger {
    color: var(--danger);
    background: #ef444420;
  }
  &--info {
    color: #2563eb;
    background: #3b82f620;
  }
  &--neutral {
    color: var(--muted);
    background: var(--canvas);
    border: 1px solid var(--border);
  }
  &--sm {
    font-size: 10px;
    padding: 2px 7px;
  }
  &__dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  }
}
// 다크 배경에서도 상태 문구를 읽을 수 있도록 명도를 높입니다.
:global([data-theme='dark'] .base-badge--success) {
  color: #6ee7b7;
}
:global([data-theme='dark'] .base-badge--warning) {
  color: #fcd34d;
}
:global([data-theme='dark'] .base-badge--danger) {
  color: #fda4af;
}
:global([data-theme='dark'] .base-badge--info) {
  color: #93c5fd;
}
</style>
