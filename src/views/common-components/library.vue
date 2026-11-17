<script setup>
import { computed, ref, watch, markRaw, nextTick } from 'vue';
import { Blocks, Search, ArrowDown, Code2, Layers, MousePointerClick } from 'lucide-vue-next';
import CodeExampleCard from '@/components/common/CodeExampleCard.vue';
import { getExampleFiles } from '@/data/codeSnippets';
import guide from '@/data/commonComponentGuide.json';
import BadgeExample from '@/components/common-examples/BadgeExample.vue';
import ButtonExample from '@/components/common-examples/ButtonExample.vue';
import FieldExample from '@/components/common-examples/FieldExample.vue';
import SelectExample from '@/components/common-examples/SelectExample.vue';
import AlertExample from '@/components/common-examples/AlertExample.vue';
import AvatarExample from '@/components/common-examples/AvatarExample.vue';
import EmptyExample from '@/components/common-examples/EmptyExample.vue';
import SkeletonExample from '@/components/common-examples/SkeletonExample.vue';
import CardExample from '@/components/common-examples/CardExample.vue';
import ModalExample from '@/components/common-examples/ModalExample.vue';
import TabsExample from '@/components/common-examples/TabsExample.vue';
import PaginationExample from '@/components/common-examples/PaginationExample.vue';
import ToastExample from '@/components/common-examples/ToastExample.vue';
import MemberManagementExample from '@/components/common-examples/MemberManagementExample.vue';
const examples = markRaw({
  BadgeExample,
  ButtonExample,
  FieldExample,
  SelectExample,
  AlertExample,
  AvatarExample,
  EmptyExample,
  SkeletonExample,
  CardExample,
  ModalExample,
  TabsExample,
  PaginationExample,
  ToastExample,
  MemberManagementExample
});
const categories = ['전체', ...new Set(guide.map((item) => item.category))];
const category = ref('전체');
const keyword = ref('');
const selected = ref('badge');
const detail = ref(null);
const filtered = computed(() =>
  guide.filter(
    (item) =>
      (category.value === '전체' || item.category === category.value) &&
      `${item.title} ${item.summary} ${item.usage}`
        .toLowerCase()
        .includes(keyword.value.trim().toLowerCase())
  )
);
watch(filtered, (items) => {
  if (!items.some((item) => item.id === selected.value)) selected.value = items[0]?.id || '';
});
const active = computed(() => guide.find((item) => item.id === selected.value));
const files = computed(() =>
  active.value
    ? {
        ...getExampleFiles('', `/src/components/common-examples/${active.value.file}.vue`),
        ...getExampleFiles('', '/src/assets/styles/main.scss')
      }
    : {}
);
async function openComposition() {
  category.value = '전체';
  keyword.value = '';
  selected.value = 'composition';
  await nextTick();
  detail.value?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start'
  });
}
</script>
<template>
  <section class="component-library">
    <header class="component-library__hero">
      <div>
        <span class="component-library__eyebrow">
          <Blocks :size="15" />
          REUSABLE VUE COMPONENTS
        </span>
        <h1>
          공통 컴포넌트
          <span>13 COMPONENTS + 1 WORKFLOW</span>
        </h1>
        <p>
          한 번 만들고 여러 화면에서 사용하세요.
          <br />
          실제 동작 예제부터 부모·자식 연결 방식, 전체 Vue·SCSS 소스까지.
        </p>
      </div>
      <button @click="openComposition">
        <Layers :size="17" />
        직원 관리 조합 예제
        <ArrowDown :size="15" />
      </button>
    </header>
    <div class="component-library__principles">
      <article>
        <span>01</span>
        <strong>Props로 전달</strong>
        <p>부모가 업무 데이터를 갖고 컴포넌트에는 표시할 값을 전달합니다.</p>
      </article>
      <article>
        <span>02</span>
        <strong>Emit · v-model로 연결</strong>
        <p>값 변경과 사용자 동작을 부모에 전달해 화면 로직을 연결합니다.</p>
      </article>
      <article>
        <span>03</span>
        <strong>Slot · SCSS로 재사용</strong>
        <p>공통 구조와 스타일을 공유하고 화면별 콘텐츠는 slot으로 채웁니다.</p>
      </article>
    </div>
    <section class="component-library__picker" aria-label="공통 컴포넌트 선택">
      <div class="component-library__toolbar">
        <div class="component-library__categories" role="group" aria-label="컴포넌트 분류">
          <button
            v-for="item in categories"
            :key="item"
            :aria-pressed="category === item"
            @click="category = item"
          >
            {{ item }}
          </button>
        </div>
        <label class="component-library__search">
          <Search :size="15" />
          <input
            v-model="keyword"
            type="search"
            aria-label="공통 컴포넌트 검색"
            placeholder="이름·용도 검색"
          />
        </label>
      </div>
      <div class="component-library__options">
        <button
          v-for="item in filtered"
          :key="item.id"
          :aria-pressed="selected === item.id"
          @click="selected = item.id"
        >
          <small>{{ item.category }}</small>
          <strong>{{ item.title }}</strong>
          <span>{{ item.summary }}</span>
        </button>
      </div>
      <p v-if="!filtered.length" class="component-library__no-results" role="status">
        검색 결과가 없습니다. 검색어나 분류를 변경해 주세요.
      </p>
    </section>
    <section
      v-if="active"
      :key="active.id"
      ref="detail"
      class="component-library__detail"
      aria-label="선택한 컴포넌트 가이드"
    >
      <header class="component-library__detail-heading">
        <div>
          <span>{{ active.category }} / PRACTICAL GUIDE</span>
          <h2>{{ active.title }}</h2>
          <p>{{ active.usage }}</p>
        </div>
        <MousePointerClick :size="25" />
      </header>
      <CodeExampleCard
        :title="active.title + ' · 실제 사용 화면'"
        description="상태를 바꿔 동작을 확인하세요. 코드 보기에는 사용 화면과 공통 컴포넌트·SCSS 원본이 함께 제공됩니다."
        :files="files"
      >
        <component :is="examples[active.file]" />
      </CodeExampleCard>
      <div class="component-library__explanations">
        <article>
          <h3>
            <Code2 :size="17" />
            연결 흐름
          </h3>
          <ol>
            <li v-for="step in active.flow" :key="step">{{ step }}</li>
          </ol>
        </article>
        <article>
          <h3>실무 적용 팁</h3>
          <ul>
            <li v-for="tip in active.tips" :key="tip">{{ tip }}</li>
          </ul>
        </article>
      </div>
      <section class="component-library__contract">
        <h3>Props · Events · Slots 계약</h3>
        <p>아래 인터페이스를 기준으로 화면과 공통 컴포넌트를 연결합니다.</p>
        <div class="component-library__table-scroll">
          <table>
            <caption>{{ active.title }} 사용 인터페이스</caption>
            <thead>
              <tr>
                <th scope="col">이름</th>
                <th scope="col">타입</th>
                <th scope="col">기본값</th>
                <th scope="col">사용법</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in active.api" :key="row.name">
                <th scope="row">
                  <code>{{ row.name }}</code>
                </th>
                <td>{{ row.type }}</td>
                <td>{{ row.default }}</td>
                <td>{{ row.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <aside class="component-library__source-note">
        <Code2 :size="18" />
        <p>
          <strong>코드를 가져가는 순서</strong>
          — 「Vue 코드 보기」에서 첫 번째 파일은 부모 사용 예제입니다. 파일 선택에서 Base*.vue
          원본과 의존 SCSS를 확인하세요. 앱 진입점에서 main.scss를 한 번 불러오면 테마 변수와 공통
          스타일이 적용됩니다.
        </p>
      </aside>
    </section>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.component-library {
  display: grid;
  gap: 24px;
  min-width: 0;
  &__hero {
    @include flex-between;
    flex-wrap: wrap;
    padding: 30px;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: linear-gradient(120deg, var(--surface), var(--soft));
    h1 {
      font-size: clamp(24px, 3vw, 33px);
      letter-spacing: -1px;
      margin: 12px 0;
      span {
        display: block;
        margin-top: 12px;
        color: var(--primary);
        font-size: 10px;
        letter-spacing: 1.2px;
      }
    }
    p {
      font-size: 13px;
      color: var(--muted);
      line-height: 1.9;
      margin: 0;
    }
    > button {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 12px;
      color: var(--primary);
    }
  }
  &__eyebrow {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--primary);
    font-size: 10px;
    letter-spacing: 1.5px;
    font-weight: 700;
  }
  &__principles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    article {
      @include card-surface;
      padding: 20px;
      span {
        display: block;
        color: var(--primary);
        font-size: 11px;
        margin-bottom: 12px;
      }
      strong {
        font-size: 13px;
      }
      p {
        color: var(--muted);
        font-size: 11px;
        line-height: 1.8;
        margin: 8px 0 0;
      }
    }
  }
  &__picker {
    @include card-surface;
    padding: 20px;
    min-width: 0;
  }
  &__toolbar {
    @include flex-between;
    flex-wrap: wrap;
    margin-bottom: 18px;
  }
  &__categories {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    button {
      padding: 7px 10px;
      font-size: 11px;
      border-color: transparent;
      background: var(--canvas);
      &[aria-pressed='true'] {
        color: #fff;
        background: var(--primary);
      }
    }
  }
  &__search {
    display: flex;
    color: var(--muted);
    gap: 6px;
    input {
      min-width: 0;
      width: 190px;
      font-size: 11px;
    }
  }
  &__options {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    button {
      text-align: left;
      padding: 16px;
      min-width: 0;
      &[aria-pressed='true'] {
        background: var(--soft);
        border-color: var(--primary);
        box-shadow: 0 0 0 1px var(--primary);
      }
      small {
        display: block;
        font-size: 9px;
        color: var(--primary);
      }
      strong {
        display: block;
        font-size: 12px;
        margin: 7px 0;
      }
      span {
        display: block;
        color: var(--muted);
        font-size: 10px;
        line-height: 1.8;
      }
    }
  }
  &__no-results {
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    padding: 20px;
  }
  &__detail {
    scroll-margin-top: 95px;
    display: grid;
    gap: 20px;
    min-width: 0;
  }
  &__detail-heading {
    @include flex-between;
    span {
      font-size: 9px;
      color: var(--primary);
      letter-spacing: 1px;
    }
    h2 {
      font-size: 23px;
      margin: 8px 0;
      letter-spacing: -0.5px;
    }
    p {
      font-size: 12px;
      color: var(--muted);
      line-height: 1.8;
      margin: 0;
    }
    > svg {
      color: var(--primary);
      flex-shrink: 0;
    }
  }
  &__explanations {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    article {
      @include card-surface;
      padding: 22px;
      min-width: 0;
    }
    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      margin: 0 0 14px;
    }
    ol,
    ul {
      padding-left: 18px;
      margin: 0;
      font-size: 12px;
      color: var(--muted);
      line-height: 1.9;
    }
    ul {
      list-style: disc;
    }
    li + li {
      margin-top: 8px;
    }
  }
  &__contract {
    @include card-surface;
    min-width: 0;
    padding: 22px;
    h3 {
      font-size: 14px;
      margin: 0;
    }
    > p {
      color: var(--muted);
      font-size: 11px;
      margin: 7px 0 16px;
    }
    table {
      min-width: 620px;
      font-size: 11px;
      line-height: 1.8;
    }
    th,
    td {
      padding: 12px;
    }
    tbody th {
      background: transparent;
      color: var(--primary);
      font-weight: 500;
    }
    caption {
      text-align: left;
      color: var(--caption);
      font-size: 10px;
      margin-bottom: 10px;
    }
  }
  &__table-scroll {
    overflow-x: auto;
  }
  &__source-note {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 16px;
    background: var(--soft);
    border-radius: 12px;
    > svg {
      color: var(--primary);
      flex-shrink: 0;
      margin-top: 3px;
    }
    p {
      font-size: 11px;
      line-height: 1.9;
      color: var(--muted);
      margin: 0;
    }
  }
  @include responsive(tablet) {
    &__options {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @include responsive(mobile) {
    &__hero {
      padding: 22px;
    }
    &__principles,
    &__explanations {
      grid-template-columns: minmax(0, 1fr);
    }
    &__options {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      button {
        padding: 12px;
      }
    }
    &__picker,
    &__contract {
      padding: 14px;
    }
    &__search,
    &__search input {
      width: 100%;
    }
  }
}
</style>
