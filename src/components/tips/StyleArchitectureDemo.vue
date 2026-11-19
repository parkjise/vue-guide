<script setup>
import { ref } from 'vue';
import TipIcon from './TipIcon.vue';
import BaseButton from '@/components/common/BaseButton.vue';
const color = ref('#6366f1');
const percent = ref(65);
const title = ref('공통 토큰을 활용한 업무 카드');
</script>
<template>
  <section class="publishing-demo">
    <div class="publishing-demo__row">
      <label>
        강조 색상
        <input v-model="color" type="color" />
      </label>
      <label>
        진행률 {{ percent }}%
        <input v-model="percent" type="range" min="0" max="100" />
      </label>
    </div>
    <label>
      카드 제목
      <input v-model="title" aria-label="SCSS 예제 카드 제목" />
    </label>
    <article class="style-recipe" :style="{ '--progress': percent + '%' }">
      <h3>{{ title }}</h3>
      <p>색상은 CSS v-bind, 진행률은 인라인 CSS 변수로 연결합니다.</p>
      <div
        class="style-recipe__track"
        role="progressbar"
        aria-label="업무 진행률"
        :aria-valuenow="Number(percent)"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span />
      </div>
      <BaseButton class="style-recipe__action">
        <TipIcon />
        부모에서 공통 버튼 스타일 조정
      </BaseButton>
    </article>
    <p class="publishing-demo__note">
      카드·정렬은 공통 mixin을 사용하고, 화면별 규칙은 scoped SCSS에 둡니다. 아래 소스에는 선택
      적용용 Vite 자동 주입 설정도 함께 제공합니다.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/mixins' as mix;
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
.style-recipe {
  @include mix.card-surface;
  display: grid;
  gap: 15px;
  padding: 22px;
  border-top: 4px solid v-bind(color);
  h3 {
    margin: 0;
    font-size: 17px;
    overflow-wrap: anywhere;
  }
  p {
    font-size: 12px;
    color: var(--muted);
    margin: 0;
  }
  &__track {
    height: 10px;
    border-radius: 20px;
    background: var(--border);
    overflow: hidden;
    span {
      display: block;
      width: var(--progress);
      height: 100%;
      background: v-bind(color);
      transition: width 0.2s;
    }
  }
  &__action {
    justify-self: start;
  }
  .style-recipe__action:deep(svg) {
    width: 16px;
  }
  @media (prefers-reduced-motion: reduce) {
    &__track span {
      transition: none;
    }
  }
}
</style>
