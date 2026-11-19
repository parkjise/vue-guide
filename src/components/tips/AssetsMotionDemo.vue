<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import TipIcon from './TipIcon.vue';
import designImage from '@/assets/tips/project-design.svg';
import dashboardImage from '@/assets/tips/project-dashboard.svg';
const projects = ref([
  { id: 'design', name: '디자인 시스템', image: designImage },
  { id: 'dashboard', name: '운영 대시보드', image: dashboardImage }
]);
const visible = ref(true);
const highlight = ref(false);
const publicMark = `${import.meta.env.BASE_URL}tips/guide-mark.svg`;
const mobile = ref(false);
let query;
function update(event) {
  mobile.value = event.matches;
}
onMounted(() => {
  query = window.matchMedia('(max-width: 760px)');
  mobile.value = query.matches;
  query.addEventListener('change', update);
});
onUnmounted(() => query?.removeEventListener('change', update));
function restore() {
  projects.value = [
    { id: 'design', name: '디자인 시스템', image: designImage },
    { id: 'dashboard', name: '운영 대시보드', image: dashboardImage }
  ];
}
</script>
<template>
  <section class="publishing-demo">
    <div class="publishing-demo__row">
      <BaseButton
        :class="{ 'asset-recipe__highlight': highlight }"
        variant="secondary"
        @click="highlight = !highlight"
      >
        <TipIcon />
        currentColor 아이콘
      </BaseButton>
      <img :src="publicMark" width="34" height="34" alt="공개 경로 예제 마크" />
      <code>BASE_URL + public 경로</code>
    </div>
    <div class="publishing-demo__row">
      <BaseButton variant="secondary" @click="visible = !visible">안내 전환</BaseButton>
      <BaseButton variant="secondary" @click="projects.reverse()">순서 변경</BaseButton>
      <BaseButton variant="secondary" @click="restore">목록 복원</BaseButton>
    </div>
    <Transition name="asset-fade">
      <p v-if="visible" class="publishing-demo__box">
        Transition은 요소가 들어오고 나갈 때 동작합니다.
      </p>
    </Transition>
    <p class="publishing-demo__note">
      구조가 다른 UI만 JS로 분기: 현재 {{ mobile ? '모바일 select' : '데스크톱 toolbar' }} 표시 중
    </p>
    <label v-if="mobile">
      모바일 작업
      <select
        aria-label="모바일 카드 작업"
        @change="$event.target.value === 'reverse' ? projects.reverse() : restore()"
      >
        <option value="restore">목록 복원</option>
        <option value="reverse">순서 변경</option>
      </select>
    </label>
    <nav v-else class="publishing-demo__row" aria-label="데스크톱 카드 작업">
      <BaseButton size="sm" variant="secondary" @click="projects.reverse()">
        카드 정렬 뒤집기
      </BaseButton>
      <BaseButton size="sm" variant="secondary" @click="restore">전체 카드 보기</BaseButton>
    </nav>
    <TransitionGroup name="asset-list" tag="ul" class="asset-recipe__grid">
      <li v-for="project in projects" :key="project.id">
        <img
          :src="project.image"
          :alt="project.name + ' 예시 화면'"
          width="480"
          height="280"
          loading="lazy"
          decoding="async"
        />
        <div>
          <strong>{{ project.name }}</strong>
          <button
            type="button"
            :aria-label="project.name + ' 제거'"
            @click="projects = projects.filter((item) => item.id !== project.id)"
          >
            제거
          </button>
        </div>
      </li>
    </TransitionGroup>
    <p v-if="!projects.length" class="publishing-demo__note">
      목록이 비었습니다. 목록 복원을 눌러 보세요.
    </p>
    <p class="publishing-demo__note">
      v-for에서도 src/assets의 import URL을 사용할 수 있습니다. 레이아웃은 CSS grid와 미디어 쿼리로
      반응형을 처리합니다.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@use '@/assets/styles/mixins' as mix;
@include examples.layout;
.asset-recipe {
  &__highlight {
    color: var(--danger);
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      min-width: 0;
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      background: var(--surface);
    }
    img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 12/7;
      object-fit: cover;
    }
    li > div {
      @include mix.flex-between;
      padding: 14px;
      font-size: 12px;
    }
    button {
      font-size: 11px;
      padding: 5px 9px;
    }
    @include mix.responsive(mobile) {
      grid-template-columns: minmax(0, 1fr);
    }
  }
}
.asset-fade-enter-active,
.asset-fade-leave-active {
  transition: opacity 0.2s;
}
.asset-fade-enter-from,
.asset-fade-leave-to {
  opacity: 0;
}
.asset-list-move,
.asset-list-enter-active,
.asset-list-leave-active {
  transition:
    transform 0.25s,
    opacity 0.25s;
}
.asset-list-enter-from,
.asset-list-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
@media (prefers-reduced-motion: reduce) {
  .asset-fade-enter-active,
  .asset-fade-leave-active,
  .asset-list-move,
  .asset-list-enter-active,
  .asset-list-leave-active {
    transition: none;
  }
}
</style>
