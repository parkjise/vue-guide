<script setup>
import { ref } from 'vue';
import BaseAlert from '@/components/common/BaseAlert.vue';
import BaseButton from '@/components/common/BaseButton.vue';
const visible = ref(true);
const retry = ref(0);
</script>
<template>
  <section class="shared-example">
    <BaseAlert
      v-if="visible"
      title="저장에 실패했습니다"
      tone="danger"
      dismissible
      @close="visible = false"
    >
      네트워크 연결을 확인한 뒤 다시 시도해 주세요.
      <template #action>
        <BaseButton
          size="sm"
          variant="secondary"
          @click="
            retry++;
            visible = false;
          "
        >
          다시 시도
        </BaseButton>
      </template>
    </BaseAlert>
    <BaseAlert v-else title="안내를 닫았습니다" tone="success">
      재시도 횟수: {{ retry }}. 표시 여부는 부모가 관리합니다.
    </BaseAlert>
    <BaseAlert title="예약 점검 안내" tone="warning">
      예정된 점검 시간을 사용자에게 미리 알려주세요.
    </BaseAlert>
    <BaseAlert title="도움말">
      본문은 slot이므로 링크나 목록 등 화면에 필요한 내용을 넣을 수 있습니다.
    </BaseAlert>
    <div>
      <BaseButton variant="secondary" @click="visible = true">오류 안내 다시 열기</BaseButton>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
