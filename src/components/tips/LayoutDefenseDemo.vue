<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseModal from '@/components/common/BaseModal.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import BaseSkeleton from '@/components/common/BaseSkeleton.vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
import BaseAlert from '@/components/common/BaseAlert.vue';
import BaseIconTooltip from '@/components/common/BaseIconTooltip.vue';
import { usePublishingScrollLock } from '@/composables/publishingScrollLock';
const open = ref(false);
const nested = ref(false);
usePublishingScrollLock(open);
usePublishingScrollLock(nested);
const state = ref('success');
const options = [
  { value: 'loading', label: '로딩' },
  { value: 'success', label: '데이터 있음' },
  { value: 'empty', label: '데이터 없음' },
  { value: 'error', label: '오류' }
];
// 외부 입력이 아닌, 작성자가 정한 정적 HTML만 사용합니다.
const trustedHtml =
  '<p><strong>에디터 본문 스타일</strong>을 별도 래퍼에 복원합니다.</p><ul><li>목록의 들여쓰기와 표식 복원</li><li>긴 URL: https://example.com/very-long-document-path-without-spaces-to-check-wrapping-and-layout</li></ul><p><a href="https://vuejs.org/guide/best-practices/security.html" target="_blank" rel="noopener noreferrer">Vue 보안 가이드</a></p>';
</script>
<template>
  <section class="publishing-demo">
    <div class="layout-recipe__clip">
      <span>overflow: hidden 영역 안의 도움말</span>
      <BaseIconTooltip
        label="Teleport 설명 보기"
        text="이 툴팁은 body로 Teleport되어 부모 카드의 overflow에 잘리지 않습니다."
      />
    </div>
    <div><BaseButton @click="open = true">스크롤 잠금 모달 열기</BaseButton></div>
    <BaseModal v-model="open" title="첫 번째 모달">
      <p>배경 스크롤을 잠그고 기존 body 스타일을 보관합니다.</p>
      <BaseButton @click="nested = true">두 번째 모달 열기</BaseButton>
      <BaseButton variant="secondary" @click="open = false">첫 번째 닫기</BaseButton>
    </BaseModal>
    <BaseModal v-model="nested" title="두 번째 모달">
      <p>이 창만 닫아도 첫 모달이 남아 있으면 스크롤 잠금은 유지됩니다.</p>
      <BaseButton @click="nested = false">두 번째 닫기</BaseButton>
    </BaseModal>
    <BaseSelect v-model="state" label="목록 상태 시뮬레이션" :options="options" required />
    <div class="publishing-demo__box" :aria-busy="state === 'loading'">
      <BaseSkeleton v-if="state === 'loading'" avatar :lines="3" />
      <ul v-else-if="state === 'success'" class="publishing-demo__list">
        <li>문서 01 · 검토 완료</li>
        <li>문서 02 · 승인 대기</li>
      </ul>
      <BaseEmptyState
        v-else-if="state === 'empty'"
        title="조회 결과가 없습니다"
        description="필터를 변경하거나 새 문서를 등록해 주세요."
      />
      <BaseAlert v-else tone="danger" title="불러오지 못했습니다">
        일시적인 오류입니다.
        <template #action>
          <BaseButton size="sm" variant="secondary" @click="state = 'success'">
            다시 시도
          </BaseButton>
        </template>
      </BaseAlert>
    </div>
    <article class="layout-recipe__rich" v-html="trustedHtml" />
    <p class="publishing-demo__note">
      본문 스타일 복원은 XSS 방어가 아닙니다. 외부·사용자 HTML은 별도의 신뢰할 수 있는 정화 과정을
      거친 후 렌더링해야 합니다.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
.layout-recipe {
  &__clip {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    font-size: 12px;
  }
  &__rich {
    padding: 18px;
    border: 1px solid var(--border);
    border-radius: 12px;
    word-break: keep-all;
    overflow-wrap: anywhere;
    font-size: 13px;
    line-height: 1.9;
    :deep(strong) {
      font-weight: 750;
    }
    :deep(ul) {
      list-style: disc;
      padding-left: 22px;
      margin: 12px 0;
    }
    :deep(ol) {
      list-style: decimal;
      padding-left: 22px;
    }
    :deep(a) {
      color: var(--primary);
      text-decoration: underline;
    }
    :deep(p) {
      margin: 0 0 10px;
    }
  }
}
</style>
