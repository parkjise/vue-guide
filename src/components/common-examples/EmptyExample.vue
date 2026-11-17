<script setup>
import { computed, ref } from 'vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
import BaseField from '@/components/common/BaseField.vue';
import BaseButton from '@/components/common/BaseButton.vue';
const keyword = ref('없는 검색어');
const projects = ref(['디자인 시스템', '고객 관리 포털']);
const visible = computed(() =>
  projects.value.filter((item) => item.includes(keyword.value.trim()))
);
function resetSearch() {
  keyword.value = '';
}
</script>
<template>
  <section class="shared-example">
    <div class="shared-example__form">
      <BaseField v-model="keyword" label="프로젝트 검색" placeholder="검색어를 입력하세요" />
    </div>
    <ul v-if="visible.length" class="shared-example__list">
      <li v-for="project in visible" :key="project">{{ project }}</li>
    </ul>
    <BaseEmptyState
      v-else
      title="검색 결과가 없습니다"
      description="검색어를 줄이거나 초기화하면 전체 프로젝트를 볼 수 있습니다."
    >
      <template #action><BaseButton @click="resetSearch">검색 초기화</BaseButton></template>
    </BaseEmptyState>
    <p class="shared-example__note">
      데이터가 없는 경우와 검색 결과가 없는 경우는 문구와 행동이 다릅니다. 공통 빈 상태 컴포넌트는
      유지하고 title·description·action slot만 바꿉니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
