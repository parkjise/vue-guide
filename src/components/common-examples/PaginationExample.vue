<script setup>
import { computed, ref, watch } from 'vue';
import BasePagination from '@/components/common/BasePagination.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
const page = ref(1);
const pageSize = ref('5');
const all = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  name: `업무 문서 ${String(index + 1).padStart(2, '0')}`
}));
const options = [
  { value: '5', label: '5개씩' },
  { value: '10', label: '10개씩' }
];
const rows = computed(() =>
  all.slice((page.value - 1) * Number(pageSize.value), page.value * Number(pageSize.value))
);
watch(pageSize, () => {
  page.value = 1;
});
</script>
<template>
  <section class="shared-example">
    <div class="shared-example__form">
      <BaseSelect v-model="pageSize" label="페이지당 표시 수" :options="options" required />
    </div>
    <ul class="shared-example__list">
      <li v-for="row in rows" :key="row.id">
        {{ row.name }}
        <span>#{{ row.id }}</span>
      </li>
    </ul>
    <BasePagination v-model="page" :total="all.length" :page-size="Number(pageSize)" />
    <output class="shared-example__note">전체 {{ all.length }}개 · 현재 {{ page }}페이지</output>
    <p class="shared-example__note">
      공통 페이지네이션은 페이지 번호만 바꿉니다. 데이터 slice 또는 서버 재조회는 부모에서 처리하며
      필터·페이지 크기가 바뀌면 첫 페이지로 되돌립니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
