<script setup>
import { computed, ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
import TipRenderPanel from './TipRenderPanel.vue';
const active = ref(false);
const show = ref(true);
const members = ref([
  { id: 'a', name: '김지수', selected: false },
  { id: 'b', name: '박민준', selected: false },
  { id: 'c', name: '이서연', selected: false }
]);
const count = computed(() => members.value.filter((item) => item.selected).length);
</script>
<template>
  <section class="publishing-demo">
    <div class="publishing-demo__row">
      <BaseButton
        variant="secondary"
        class="markup-recipe__toggle"
        :class="['markup-recipe__button', { 'is-active': active }]"
        :aria-pressed="active"
        @click="active = !active"
      >
        객체 클래스 {{ active ? '활성' : '비활성' }}
      </BaseButton>
      <BaseButton variant="secondary" @click="members.reverse()">리스트 순서 뒤집기</BaseButton>
    </div>
    <ul class="publishing-demo__list">
      <li v-for="member in members" :key="member.id">
        <label>
          <input v-model="member.selected" type="checkbox" />
          {{ member.name }}
        </label>
      </li>
    </ul>
    <output class="publishing-demo__note">
      선택 {{ count }}명 · key를 id로 유지해 순서 변경 후에도 선택 항목이 같습니다.
    </output>
    <div>
      <BaseButton @click="show = !show">두 패널 {{ show ? '숨기기' : '다시 표시' }}</BaseButton>
    </div>
    <div class="publishing-demo__grid">
      <div>
        <p class="publishing-demo__note">v-show: DOM·내부 상태 유지</p>
        <TipRenderPanel v-show="show" title="v-show 패널" />
      </div>
      <div>
        <p class="publishing-demo__note">v-if: 해제 시 인스턴스 제거</p>
        <TipRenderPanel v-if="show" title="v-if 패널" />
      </div>
    </div>
    <p class="publishing-demo__note">
      패널마다 입력·카운터를 바꾼 뒤 숨겼다 다시 표시해 보세요. v-if 쪽은 새로 생성되어
      초기화됩니다. 공통 버튼의 한 루트에 부모 class도 자동 병합됩니다.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
.markup-recipe__button.is-active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
.markup-recipe__toggle {
  border-radius: 999px;
}
</style>
