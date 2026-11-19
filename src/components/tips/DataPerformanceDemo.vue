<script setup>
import { computed, ref, watch } from 'vue';
import BaseField from '@/components/common/BaseField.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BasePagination from '@/components/common/BasePagination.vue';
import BaseSkeleton from '@/components/common/BaseSkeleton.vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
import BaseAlert from '@/components/common/BaseAlert.vue';
const source = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  title: `${index % 2 ? '디자인' : '개발'} 문서 ${index + 1}`
}));
const query = ref('');
const retry = ref(0);
const results = ref(source);
const busy = ref(false);
const error = ref('');
const page = ref(1);
const descending = ref(false);
const sorted = computed(() =>
  [...results.value].sort((a, b) => (descending.value ? b.id - a.id : a.id - b.id))
);
const visible = computed(() => sorted.value.slice((page.value - 1) * 5, page.value * 5));
watch([query, retry], ([text], _old, onCleanup) => {
  page.value = 1;
  busy.value = true;
  error.value = '';
  // 외부 요청 없는 시연. 실제 fetch에서는 같은 위치에 AbortController를 두고 취소합니다.
  const timer = setTimeout(() => {
    if (text.trim() === '에러') {
      error.value = '조회 오류 시연입니다. 재시도를 눌러 복구해 보세요.';
      results.value = [];
    } else results.value = source.filter((item) => item.title.includes(text.trim()));
    busy.value = false;
  }, 500);
  // 다음 입력·재시도·컴포넌트 해제 시 이전 작업을 취소합니다.
  onCleanup(() => clearTimeout(timer));
});
function recover() {
  query.value = '';
  retry.value++;
}
</script>
<template>
  <section class="publishing-demo">
    <BaseField
      v-model="query"
      label="문서 검색 · 취소 가능한 지연 처리"
      placeholder="디자인, 개발, 없는값, 에러를 입력하세요"
    />
    <div class="publishing-demo__row">
      <BaseButton variant="secondary" @click="descending = !descending">
        {{ descending ? 'ID 오름차순' : 'ID 내림차순' }} 정렬
      </BaseButton>
      <span class="publishing-demo__note">
        정렬용 복사 배열을 사용해 원본 데이터 순서는 유지합니다.
      </span>
    </div>
    <div :aria-busy="busy">
      <BaseSkeleton v-if="busy" :lines="3" />
      <BaseAlert v-else-if="error" title="검색을 완료하지 못했습니다" tone="danger">
        {{ error }}
        <template #action><BaseButton size="sm" @click="recover">재시도</BaseButton></template>
      </BaseAlert>
      <BaseEmptyState v-else-if="!results.length" title="검색 결과가 없습니다">
        <template #action>
          <BaseButton variant="secondary" @click="recover">검색 초기화</BaseButton>
        </template>
      </BaseEmptyState>
      <ul v-else class="publishing-demo__list">
        <li v-for="item in visible" :key="item.id">#{{ item.id }} {{ item.title }}</li>
      </ul>
    </div>
    <BasePagination
      v-if="!busy && results.length"
      v-model="page"
      :total="results.length"
      :page-size="5"
    />
    <output class="publishing-demo__note" aria-live="polite">
      {{ busy ? '새 검색을 처리 중입니다.' : `${results.length}개 결과 · ${page}페이지` }}
    </output>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
</style>
