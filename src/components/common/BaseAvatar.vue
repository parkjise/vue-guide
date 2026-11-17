<script setup>
import { computed, ref, watch } from 'vue';
const props = defineProps({
  name: { type: String, required: true },
  src: { type: String, default: '' },
  size: { type: String, default: 'md' }
});
const failed = ref(false);
watch(
  () => props.src,
  () => {
    failed.value = false;
  }
);
const initials = computed(
  () =>
    props.name
      .trim()
      .split(/\s+/)
      .map((part) => Array.from(part)[0])
      .slice(0, 2)
      .join('') || '?'
);
</script>
<template>
  <span class="base-avatar" :class="`base-avatar--${size}`" role="img" :aria-label="name">
    <img v-if="src && !failed" :src="src" alt="" @error="failed = true" />
    <span v-else aria-hidden="true">{{ initials }}</span>
  </span>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-avatar {
  @include flex-center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--soft);
  color: var(--primary);
  font-size: 13px;
  font-weight: 700;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &--sm {
    width: 28px;
    height: 28px;
    font-size: 10px;
  }
  &--lg {
    width: 54px;
    height: 54px;
    font-size: 18px;
  }
}
</style>
