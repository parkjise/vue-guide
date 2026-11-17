<script setup>
import { ref } from 'vue';
import BaseModal from '@/components/common/BaseModal.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseEmptyState from '@/components/common/BaseEmptyState.vue';
const documents = ref(['운영 보고서 초안', '디자인 검토 메모']);
const selected = ref('');
const open = ref(false);
function askDelete(name) {
  selected.value = name;
  open.value = true;
}
function confirmDelete() {
  documents.value = documents.value.filter((name) => name !== selected.value);
  open.value = false;
}
</script>
<template>
  <section class="shared-example">
    <ul v-if="documents.length" class="shared-example__list">
      <li v-for="name in documents" :key="name">
        {{ name }}
        <BaseButton variant="danger" size="sm" @click="askDelete(name)">삭제 확인</BaseButton>
      </li>
    </ul>
    <BaseEmptyState v-else title="모든 샘플 문서를 삭제했습니다">
      <template #action>
        <BaseButton @click="documents = ['운영 보고서 초안', '디자인 검토 메모']">
          예제 초기화
        </BaseButton>
      </template>
    </BaseEmptyState>
    <BaseModal v-model="open" title="문서 삭제 확인">
      <p>{{ selected }} 문서를 목록에서 삭제할까요? 이 예제는 화면 데이터만 변경합니다.</p>
      <div class="shared-example__row">
        <BaseButton variant="secondary" @click="open = false">취소</BaseButton>
        <BaseButton variant="danger" @click="confirmDelete">삭제 실행</BaseButton>
      </div>
    </BaseModal>
    <p class="shared-example__note">
      모달은 열림 상태와 레이아웃을 공유합니다. 선택 문서와 삭제 처리는 부모에 둡니다. Escape 닫기,
      포커스 이동·복원은 공통 BaseModal이 담당합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
