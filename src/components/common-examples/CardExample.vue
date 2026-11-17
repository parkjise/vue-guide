<script setup>
import { ref } from 'vue';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseBadge from '@/components/common/BaseBadge.vue';
import BaseButton from '@/components/common/BaseButton.vue';
const favorite = ref(false);
</script>
<template>
  <section class="shared-example shared-example__grid">
    <BaseCard title="서비스 운영 현황" description="프로젝트 대시보드">
      <template #actions><BaseBadge tone="success" dot>정상 운영</BaseBadge></template>
      <p class="shared-example__note">
        오늘 처리한 요청
        <strong>128건</strong>
        <br />
        응답 성공률 99.8%
      </p>
      <template #footer>5분 전 업데이트 · 운영팀</template>
    </BaseCard>
    <BaseCard title="디자인 시스템" description="문서 목록 카드">
      <template #actions>
        <BaseButton
          variant="secondary"
          size="sm"
          :aria-pressed="favorite"
          @click="favorite = !favorite"
        >
          {{ favorite ? '★ 저장됨' : '☆ 즐겨찾기' }}
        </BaseButton>
      </template>
      <p class="shared-example__note">
        카드의 테두리와 제목 구조는 공유하고 본문과 액션은 slot으로 다르게 구성합니다.
      </p>
      <template #footer>공통 컴포넌트 13종 관리 중</template>
    </BaseCard>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
