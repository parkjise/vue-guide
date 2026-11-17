<script setup>
import { onUnmounted, ref } from 'vue';
import { Save } from 'lucide-vue-next';
import BaseButton from '@/components/common/BaseButton.vue';
const saving = ref(false);
const result = ref('저장 버튼을 눌러 보세요.');
let timer;
function save() {
  if (saving.value) return;
  saving.value = true;
  result.value = '저장을 처리하고 있습니다…';
  // 실제 화면에서는 API 요청을 await하고 finally에서 saving을 해제합니다.
  timer = setTimeout(() => {
    saving.value = false;
    result.value = '저장이 완료되었습니다. (로컬 시연)';
  }, 900);
}
onUnmounted(() => clearTimeout(timer));
</script>
<template>
  <section class="shared-example">
    <div class="shared-example__row">
      <BaseButton :loading="saving" @click="save">
        <Save :size="15" />
        {{ saving ? '저장 중' : '변경사항 저장' }}
      </BaseButton>
      <BaseButton variant="secondary" :disabled="saving" @click="result = '변경을 취소했습니다.'">
        취소
      </BaseButton>
      <BaseButton variant="danger" size="sm" disabled>삭제 권한 없음</BaseButton>
    </div>
    <output class="shared-example__output" aria-live="polite">{{ result }}</output>
    <p class="shared-example__note">
      로딩 여부와 저장 로직은 부모가 관리합니다. 버튼은 loading일 때 자동 비활성화되어 중복 요청을
      막습니다. 아이콘과 문구는 기본 slot으로 전달합니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
