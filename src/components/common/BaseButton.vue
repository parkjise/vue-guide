<script setup>
// native button 속성·이벤트는 루트 버튼으로 전달됩니다. 로딩 중 중복 클릭을 막습니다.
defineProps({
  variant: { type: String, default: 'primary' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  size: { type: String, default: 'md' }
});
</script>
<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading ? 'true' : undefined"
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-button {
  @include focus-ring;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  &--primary {
    background: var(--primary);
    color: #fff;
    border-color: var(--primary);
    &:hover:not(:disabled) {
      background: var(--hover);
    }
  }
  &--danger {
    background: var(--danger);
    color: #fff;
    &:hover:not(:disabled) {
      background: color-mix(in srgb, var(--danger), #000 15%);
    }
  }
  &--sm {
    font-size: 12px;
    padding: 6px 10px;
  }
  &__spinner {
    width: 13px;
    height: 13px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: button-spin 0.8s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    &__spinner {
      animation: none;
    }
  }
}
@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
