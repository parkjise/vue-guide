<script setup>
import BaseTabs from '@/components/common/BaseTabs.vue';
const tabs = [
  { title: '기본 정보', content: '문서 제목, 작성자, 생성일을 보여주는 영역입니다.' },
  { title: '변경 이력', content: '승인 요청 → 담당자 검토 → 승인 완료 순으로 이력을 확인합니다.' },
  { title: '접근 권한', content: '문서 열람 및 수정 권한을 설명하는 영역입니다.' }
];
</script>
<template>
  <section class="shared-example">
    <BaseTabs :items="tabs" />
    <p class="shared-example__note">
      items 배열을 바꾸면 직원 상세, 문서 상세 등 여러 화면에서 재사용할 수 있습니다. 좌우 방향키,
      Home, End로 탭을 이동해 보세요. 현재 BaseTabs는 문자열 콘텐츠용이며 복잡한 폼은 slot 기반으로
      확장하는 편이 좋습니다.
    </p>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/shared-examples' as examples;
@include examples.layout;
</style>
