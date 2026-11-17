<script setup>
import { Info, CheckCircle2, AlertTriangle, X } from 'lucide-vue-next';
defineProps({
  title: { type: String, default: '' },
  tone: { type: String, default: 'info' },
  dismissible: Boolean
});
defineEmits(['close']);
</script>
<template>
  <section
    class="base-alert"
    :class="`base-alert--${tone}`"
    :role="tone === 'danger' ? 'alert' : 'status'"
  >
    <CheckCircle2 v-if="tone === 'success'" :size="18" aria-hidden="true" />
    <AlertTriangle v-else-if="['warning', 'danger'].includes(tone)" :size="18" aria-hidden="true" />
    <Info v-else :size="18" aria-hidden="true" />
    <div>
      <strong v-if="title">{{ title }}</strong>
      <div class="base-alert__content"><slot /></div>
      <slot name="action" />
    </div>
    <button v-if="dismissible" type="button" aria-label="안내 닫기" @click="$emit('close')">
      <X :size="16" />
    </button>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--info);
  background: var(--surface);
  border-radius: 10px;
  > svg {
    flex-shrink: 0;
    color: var(--info);
  }
  > div {
    flex: 1;
    min-width: 0;
  }
  strong {
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
  }
  &__content {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.8;
  }
  > button {
    border: 0;
    background: transparent;
    padding: 0;
    color: var(--muted);
  }
  &--success {
    border-left-color: var(--success);
    > svg {
      color: var(--success);
    }
  }
  &--warning {
    border-left-color: var(--warning);
    > svg {
      color: var(--warning);
    }
  }
  &--danger {
    border-left-color: var(--danger);
    > svg {
      color: var(--danger);
    }
  }
}
</style>
