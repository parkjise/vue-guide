<script setup>
import { Inbox } from 'lucide-vue-next';
defineProps({
  title: { type: String, default: '아직 데이터가 없습니다' },
  description: { type: String, default: '' }
});
</script>
<template>
  <section class="base-empty-state">
    <span class="base-empty-state__icon">
      <slot name="icon"><Inbox :size="26" aria-hidden="true" /></slot>
    </span>
    <h3>{{ title }}</h3>
    <p v-if="description">{{ description }}</p>
    <div v-if="$slots.action"><slot name="action" /></div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-empty-state {
  @include flex-center;
  flex-direction: column;
  gap: 12px;
  padding: 35px 20px;
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: 12px;
  h3 {
    font-size: 15px;
    margin: 0;
  }
  p {
    color: var(--muted);
    line-height: 1.8;
    font-size: 12px;
    margin: 0;
    max-width: 420px;
  }
  &__icon {
    @include flex-center;
    width: 52px;
    height: 52px;
    background: var(--soft);
    color: var(--primary);
    border-radius: 15px;
  }
}
</style>
