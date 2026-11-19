<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/common/BaseButton.vue';
const width = ref(360);
const long = ref(false);
const empty = ref(false);
const count = ref(1);
</script>
<template>
  <section class="publishing-demo">
    <div class="publishing-demo__row">
      <label>
        미리보기 컨테이너 {{ width }}px
        <input v-model="width" type="range" min="280" max="800" step="10" />
      </label>
      <label>
        <input v-model="long" type="checkbox" />
        긴 문구
      </label>
      <label>
        <input v-model="empty" type="checkbox" />
        빈 결과
      </label>
      <label>
        개수
        <select v-model="count">
          <option :value="1">1개</option>
          <option :value="3">3개</option>
          <option :value="10">10개</option>
        </select>
      </label>
    </div>
    <div class="qa-recipe__scroll">
      <div class="qa-recipe__viewport" :style="{ width: width + 'px' }">
        <section class="qa-recipe__card">
          <h3>
            {{
              long
                ? '한글과 English가 섞인 긴 제목은 실제 운영 데이터처럼 여러 줄이 되어도 버튼과 본문을 밀어내지 않아야 합니다.'
                : '검수용 업무 카드'
            }}
          </h3>
          <p>컨테이너 너비 기준으로 가로·세로 배치를 전환합니다.</p>
          <div class="qa-recipe__actions">
            <BaseButton size="sm">상세 보기</BaseButton>
            <BaseButton size="sm" variant="secondary">선택</BaseButton>
          </div>
        </section>
        <p v-if="empty" class="qa-recipe__empty">조회 결과가 없습니다.</p>
        <ul v-else>
          <li v-for="n in count" :key="n">
            업무 항목 {{ n }}
            <span>
              {{
                long
                  ? 'https://example.com/no-spaces-very-long-document-path-that-needs-wrapping-for-mobile-qa'
                  : '승인 대기'
              }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <p class="publishing-demo__note">
      이 슬라이더는 컨테이너 너비만 바꿉니다. 실제 브라우저 viewport 분기·확대·키보드·터치 검수는
      개발자 도구와 기기에서도 별도로 확인하세요.
    </p>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/publishing-examples' as examples;
@include examples.layout;
.qa-recipe {
  &__scroll {
    overflow-x: auto;
    padding: 4px;
  }
  &__viewport {
    container: qa/inline-size;
    max-width: none;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    background: var(--canvas);
    ul {
      list-style: none;
      padding: 0;
      display: grid;
      gap: 8px;
    }
    li {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      font-size: 11px;
      border-bottom: 1px solid var(--border);
      padding: 10px 0;
      span {
        overflow-wrap: anywhere;
        min-width: 0;
      }
    }
  }
  &__card {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    padding: 18px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    h3 {
      font-size: 15px;
      overflow-wrap: anywhere;
      grid-column: 1;
      margin: 0;
    }
    p {
      font-size: 11px;
      color: var(--muted);
      grid-column: 1;
      margin: 0;
    }
  }
  &__actions {
    grid-column: 2;
    grid-row: 1/3;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  &__empty {
    font-size: 12px;
    padding: 20px;
    color: var(--muted);
  }
}
@container qa (max-width:420px) {
  .qa-recipe__card {
    grid-template-columns: minmax(0, 1fr);
  }
  .qa-recipe__actions {
    grid-column: 1;
    grid-row: auto;
    flex-wrap: wrap;
  }
}
</style>
