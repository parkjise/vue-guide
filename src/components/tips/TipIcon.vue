<script setup>
defineProps({ size: { type: Number, default: 18 } });
</script>
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="m12 2 3.1 6.3L22 9.3l-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.9 6.9-1L12 2Z" />
  </svg>
</template>
<style scoped lang="scss">
svg {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
