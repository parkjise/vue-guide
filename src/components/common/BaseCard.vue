<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' }
});
</script>
<template>
  <section class="base-card">
    <header class="base-card__header">
      <div>
        <h3>{{ title }}</h3>
        <p v-if="description">{{ description }}</p>
      </div>
      <slot name="actions" />
    </header>
    <div class="base-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="base-card__footer"><slot name="footer" /></footer>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.base-card {
  @include card-surface;
  min-width: 0;
  overflow: hidden;
  &__header {
    @include flex-between;
    flex-wrap: wrap;
    padding: 18px;
    border-bottom: 1px solid var(--border);
    h3 {
      margin: 0;
      font-size: 15px;
    }
    p {
      margin: 5px 0 0;
      color: var(--muted);
      font-size: 11px;
      line-height: 1.7;
    }
  }
  &__body {
    padding: 18px;
    font-size: 13px;
  }
  &__footer {
    padding: 13px 18px;
    border-top: 1px solid var(--border);
    background: var(--canvas);
    font-size: 11px;
    color: var(--muted);
  }
}
</style>
