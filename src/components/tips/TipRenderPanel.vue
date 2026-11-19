<script setup>
import { ref } from 'vue';
defineProps({ title: { type: String, required: true } });
const count = ref(0);
</script>
<template>
  <section class="render-panel">
    <h4>{{ title }}</h4>
    <input aria-label="패널 내부 입력" placeholder="여기에 입력하고 숨겼다 다시 표시하세요" />
    <button @click="count++">내부 카운터 {{ count }}</button>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;
.render-panel {
  display: grid;
  gap: 12px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  h4 {
    font-size: 13px;
    margin: 0;
  }
  input {
    min-width: 0;
    width: 100%;
  }
}
</style>
