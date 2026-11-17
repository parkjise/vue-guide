<script setup>
import { ref } from 'vue';
import BaseAvatar from '@/components/common/BaseAvatar.vue';
import BaseButton from '@/components/common/BaseButton.vue';
const useImage = ref(false);
// 외부 이미지 요청 없이 동작하는 시연용 SVG입니다.
const avatar =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="#6366f1"/><circle cx="40" cy="30" r="14" fill="#fff"/><ellipse cx="40" cy="77" rx="29" ry="27" fill="#fff"/></svg>'
  );
</script>
<template>
  <section class="shared-example">
    <div class="shared-example__row">
      <BaseAvatar name="김 지수" size="sm" />
      <BaseAvatar name="Min Park" />
      <BaseAvatar name="이 서연" size="lg" :src="useImage ? avatar : ''" />
      <span>이 서연 · 프로필</span>
    </div>
    <div>
      <BaseButton variant="secondary" @click="useImage = !useImage">
        {{ useImage ? '이니셜 표시' : '프로필 이미지 표시' }}
      </BaseButton>
    </div>
    <p class="shared-example__note">
      이미지가 없거나 로드에 실패하면 이름에서 이니셜을 만듭니다. 목록과 상세 화면에서는 size만
      바꿉니다. 이름은 접근 가능한 이미지 설명으로도 사용됩니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
