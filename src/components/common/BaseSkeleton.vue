<script setup>
import { computed } from 'vue';
const props = defineProps({
  lines: { type: Number, default: 3 },
  avatar: Boolean,
  label: { type: String, default: '데이터를 불러오는 중입니다' }
});
const count = computed(() => Math.min(10, Math.max(1, Math.floor(props.lines) || 1)));
</script>
<template>
  <div class="base-skeleton" role="status" :aria-label="label">
    <span v-if="avatar" class="base-skeleton__avatar" aria-hidden="true" />
    <div class="base-skeleton__lines" aria-hidden="true">
      <span v-for="n in count" :key="n" :class="{ 'base-skeleton__short': n === count }" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-skeleton {
  display: flex;
  gap: 14px;
  padding: 18px 0;
  &__avatar,
  &__lines span {
    background: linear-gradient(100deg, var(--border) 20%, var(--soft) 40%, var(--border) 60%);
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.4s linear infinite;
  }
  &__avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  &__lines {
    flex: 1;
    display: grid;
    gap: 10px;
    span {
      display: block;
      height: 13px;
      border-radius: 5px;
    }
    .base-skeleton__short {
      width: 65%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    &__avatar,
    &__lines span {
      animation: none;
    }
  }
}
@keyframes skeleton-shimmer {
  to {
    background-position: -200% 0;
  }
}
</style>
