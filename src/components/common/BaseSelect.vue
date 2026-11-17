<script setup>
import { useId } from 'vue';
defineOptions({ inheritAttrs: false });
defineProps({
  label: { type: String, required: true },
  options: { type: Array, required: true },
  placeholder: { type: String, default: '선택하세요' },
  disabled: Boolean,
  required: Boolean
});
const value = defineModel({ type: String, default: '' });
const id = useId();
</script>
<template>
  <div class="base-select">
    <label :for="id">{{ label }}</label>
    <select v-bind="$attrs" :id="id" v-model="value" :disabled="disabled" :required="required">
      <option value="" :disabled="required">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-select {
  display: grid;
  gap: 7px;
  label {
    display: block;
    font-size: 12px;
    font-weight: 600;
  }
  select {
    width: 100%;
    min-width: 0;
    &:disabled {
      opacity: 0.55;
    }
  }
}
</style>
