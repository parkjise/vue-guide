<script setup>
import BaseButton from '@/components/common/BaseButton.vue';
import { useToast } from '@/composables/useToast';
const { toast } = useToast();
// App.vue에 <BaseToast />를 한 번만 배치합니다. 이 화면에서는 알림 함수만 호출합니다.
function save() {
  toast('프로필 변경사항을 저장했습니다. (시연)');
}
function fail() {
  toast('저장에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'error');
}
</script>
<template>
  <section class="shared-example">
    <div class="shared-example__row">
      <BaseButton @click="save">저장 완료 알림</BaseButton>
      <BaseButton variant="secondary" @click="fail">저장 실패 알림</BaseButton>
    </div>
    <p class="shared-example__note">
      어느 화면에서든 useToast()로 같은 알림 영역을 사용합니다. 화면 우측 하단에 4초간 표시되고 닫기
      버튼으로 제거할 수 있습니다. 여러 화면마다 BaseToast를 다시 배치하면 알림이 중복됩니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
