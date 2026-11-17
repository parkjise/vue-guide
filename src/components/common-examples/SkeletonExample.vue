<script setup>
import { onUnmounted, ref } from 'vue';
import BaseSkeleton from '@/components/common/BaseSkeleton.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';
const loading = ref(false);
let timer;
function reload() {
  if (loading.value) return;
  loading.value = true;
  timer = setTimeout(() => {
    loading.value = false;
  }, 1400);
}
onUnmounted(() => clearTimeout(timer));
</script>
<template>
  <section class="shared-example">
    <div>
      <BaseButton :disabled="loading" variant="secondary" @click="reload">
        데이터 다시 불러오기
      </BaseButton>
    </div>
    <div :aria-busy="loading">
      <BaseSkeleton v-if="loading" :lines="3" avatar label="프로젝트 정보를 불러오는 중입니다" />
      <BaseCard v-else title="고객 관리 포털" description="최신 프로젝트 정보">
        <p>담당자 김지수 · 검토 대기 문서 3건</p>
      </BaseCard>
    </div>
    <p class="shared-example__note">
      로딩·실패·빈 상태·정상 결과는 부모에서 나눕니다. Skeleton은 로딩 중 모양만 표시합니다. 화면을
      떠날 때 예제의 타이머를 정리하며, 애니메이션 줄이기 설정도 따릅니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
