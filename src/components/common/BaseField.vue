<script setup>
import { computed, useId } from 'vue';
defineOptions({ inheritAttrs: false });
const props = defineProps({
  label: { type: String, required: true },
  id: { type: String, default: '' },
  type: { type: String, default: 'text' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  required: Boolean,
  disabled: Boolean
});
const value = defineModel({ type: String, default: '' });
const generatedId = useId();
const fieldId = computed(() => props.id || generatedId);
const describedBy = computed(
  () =>
    [props.hint && `${fieldId.value}-hint`, props.error && `${fieldId.value}-error`]
      .filter(Boolean)
      .join(' ') || undefined
);
</script>
<template>
  <div class="base-field">
    <label :for="fieldId">
      {{ label }}
      <span v-if="required" aria-hidden="true">*</span>
    </label>
    <input
      v-bind="$attrs"
      :id="fieldId"
      v-model="value"
      :type="type"
      :required="required"
      :disabled="disabled"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
    />
    <p v-if="hint" :id="`${fieldId}-hint`" class="base-field__hint">{{ hint }}</p>
    <p v-if="error" :id="`${fieldId}-error`" class="base-field__error" role="alert">{{ error }}</p>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-field {
  display: grid;
  gap: 7px;
  label {
    font-size: 12px;
    font-weight: 600;
    display: block;
  }
  input {
    width: 100%;
    min-width: 0;
    &[aria-invalid='true'] {
      border-color: var(--danger);
    }
    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
  }
  p {
    margin: 0;
    font-size: 11px;
    line-height: 1.7;
  }
  &__hint {
    color: var(--muted);
  }
  &__error {
    color: var(--danger);
  }
}
</style>
