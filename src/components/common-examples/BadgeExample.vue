<script setup>
import { ref, computed } from 'vue';
import BaseBadge from '@/components/common/BaseBadge.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
// API의 업무 상태와 UI 표현은 화면(부모)에서 연결합니다.
const statusMap = {
  pending: { label: '승인 대기', tone: 'warning' },
  active: { label: '재직 중', tone: 'success' },
  blocked: { label: '접근 제한', tone: 'danger' }
};
const status = ref('pending');
const options = Object.entries(statusMap).map(([value, item]) => ({ value, label: item.label }));
const current = computed(() => statusMap[status.value]);
</script>
<template>
  <section class="shared-example">
    <div class="shared-example__row">
      <BaseBadge
        v-for="tone in ['primary', 'success', 'warning', 'danger', 'info', 'neutral']"
        :key="tone"
        :tone="tone"
        dot
      >
        {{ tone }}
      </BaseBadge>
    </div>
    <div class="shared-example__form">
      <BaseSelect v-model="status" label="직원 상태" :options="options" required />
    </div>
    <div class="shared-example__row">
      <strong>목록 화면</strong>
      <BaseBadge :tone="current.tone" dot>{{ current.label }}</BaseBadge>
      <strong>상세 화면</strong>
      <BaseBadge :tone="current.tone" size="sm">{{ current.label }}</BaseBadge>
    </div>
    <p class="shared-example__note">
      같은 BaseBadge를 두 화면에서 재사용합니다. 색상만으로 구분하지 않고 상태 문구를 함께
      제공합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
