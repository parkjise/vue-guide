<script setup>
import { computed, ref } from 'vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
const department = ref('');
const departments = [
  { value: 'design', label: '디자인' },
  { value: 'dev', label: '개발' },
  { value: 'ops', label: '운영' }
];
const members = [
  { name: '김지수', department: 'design' },
  { name: '박민준', department: 'dev' },
  { name: '이서연', department: 'dev' }
];
const visible = computed(() =>
  members.filter((item) => !department.value || item.department === department.value)
);
</script>
<template>
  <section class="shared-example">
    <div class="shared-example__form">
      <BaseSelect
        v-model="department"
        label="부서로 직원 필터링"
        :options="departments"
        placeholder="전체 부서"
      />
    </div>
    <ul v-if="visible.length" class="shared-example__list">
      <li v-for="member in visible" :key="member.name">
        {{ member.name }}
        <span>{{ departments.find((item) => item.value === member.department).label }}</span>
      </li>
    </ul>
    <BaseEmptyState
      v-else
      title="이 부서에는 직원이 없습니다"
      description="다른 부서를 선택해 주세요."
    />
    <p class="shared-example__note">
      공통 Select는 업무 데이터의 구조를 알 필요가 없습니다. 부모가 options를 value·label 형태로
      바꾸고 선택값으로 목록을 계산합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
