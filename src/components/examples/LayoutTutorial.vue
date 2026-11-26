<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import { useClipboard } from '@/composables/useClipboard';

const mode = ref('flex');
const width = ref(100);
const grow = ref(1);
const shrink = ref(1);
const basis = ref(120);
const columns = ref('1,1,1');
const columnSpan = ref(1);
const rowSpan = ref(1);
const preview = ref(null);
const availableWidth = ref(0);
const actualWidth = ref(0);
const { copied, copy } = useClipboard();

const gap = 8;
const siblingBasis = 100;
const isFlex = computed(() => mode.value === 'flex');
const items = computed(() => (isFlex.value ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D', 'E', 'F']));
const containerStyle = computed(() => ({
  display: mode.value,
  gap: gap + 'px',
  ...(isFlex.value
    ? { width: width.value + '%', 'min-width': 'min(100%, 180px)' }
    : {
        'grid-template-columns': columns.value
          .split(',')
          .map((fraction) => 'minmax(0, ' + fraction + 'fr)')
          .join(' '),
        'grid-auto-rows': 'minmax(46px, auto)'
      })
}));
const firstStyle = computed(() =>
  isFlex.value
    ? { flex: `${grow.value} ${shrink.value} ${basis.value}px` }
    : { 'grid-column': 'span ' + columnSpan.value, 'grid-row': 'span ' + rowSpan.value }
);
const itemStyle = computed(() =>
  isFlex.value ? { flex: `1 1 ${siblingBasis}px`, 'min-width': '0' } : { 'min-width': '0' }
);
const css = computed(() => {
  const rules = [
    ['.container', containerStyle.value],
    ['.item', itemStyle.value],
    ['.item:first-child', firstStyle.value]
  ];
  return rules
    .map(([selector, declarations]) => {
      const lines = Object.entries(declarations).map(([key, value]) => `  ${key}: ${value};`);
      return [selector + ' {', ...lines, '}'].join('\n');
    })
    .join('\n\n');
});
const detail = computed(() => {
  if (!isFlex.value) {
    return `A는 ${columnSpan.value}열 × ${rowSpan.value}행을 차지해요.`;
  }
  const remaining = availableWidth.value - (basis.value + 2 * siblingBasis + 2 * gap);
  if (remaining > 0) return '남는 공간을 grow 비율에 따라 나눠요.';
  if (remaining < 0) return '부족한 공간만큼 shrink와 기준 크기에 따라 줄어들어요.';
  return '기준 크기와 간격의 합이 컨테이너 너비와 같아요.';
});

let resizeObserver;
onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    availableWidth.value = preview.value.clientWidth;
    actualWidth.value = Math.round(preview.value.firstElementChild.getBoundingClientRect().width);
  });
  resizeObserver.observe(preview.value);
  resizeObserver.observe(preview.value.firstElementChild);
});
onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <section class="layout-tutorial" aria-labelledby="layout-tutorial-title">
    <header>
      <h2 id="layout-tutorial-title">Flex 축약형 · Grid 레이아웃</h2>
      <p>값을 바꿔 배치와 적용된 CSS를 바로 확인하세요.</p>
    </header>

    <div class="layout-tutorial__controls">
      <label>
        실습 선택
        <select v-model="mode">
          <option value="flex">Flex 축약형</option>
          <option value="grid">Grid 레이아웃</option>
        </select>
      </label>
      <template v-if="isFlex">
        <label>
          A가 늘어나는 비율 · grow
          <select v-model.number="grow">
            <option v-for="value in [0, 1, 2]" :key="value" :value="value">{{ value }}</option>
          </select>
        </label>
        <label>
          A가 줄어드는 비율 · shrink
          <select v-model.number="shrink">
            <option v-for="value in [0, 1, 2]" :key="value" :value="value">{{ value }}</option>
          </select>
        </label>
        <label>
          A의 기준 크기 · basis
          <select v-model.number="basis">
            <option v-for="value in [60, 120, 160]" :key="value" :value="value">
              {{ value }}px
            </option>
          </select>
        </label>
        <label class="layout-tutorial__width" for="layout-tutorial-width">
          <span>
            컨테이너 너비
            <output for="layout-tutorial-width">{{ width }}%</output>
          </span>
          <input
            id="layout-tutorial-width"
            v-model.number="width"
            type="range"
            min="30"
            max="100"
            step="5"
          />
        </label>
      </template>
      <template v-else>
        <label>
          열 구성 · grid-template-columns
          <select v-model="columns">
            <option value="1,1,1">3열 · 1 : 1 : 1</option>
            <option value="1,2,1">3열 · 1 : 2 : 1</option>
            <option value="1,1">2열 · 1 : 1</option>
          </select>
        </label>
        <label>
          A가 차지하는 열 · grid-column
          <select v-model.number="columnSpan">
            <option :value="1">1열</option>
            <option :value="2">2열</option>
          </select>
        </label>
        <label>
          A가 차지하는 행 · grid-row
          <select v-model.number="rowSpan">
            <option :value="1">1행</option>
            <option :value="2">2행</option>
          </select>
        </label>
      </template>
    </div>

    <p v-if="isFlex">
      <code>flex: grow shrink basis</code>
      순서예요. 너비를 줄인 뒤
      <code>shrink</code>
      를 0과 1로 바꿔 A의 크기를 비교해 보세요.
    </p>
    <p v-else>열 비율을 1 : 2 : 1로 바꾼 뒤 A가 2열과 2행에 걸치도록 설정해 보세요.</p>

    <div class="layout-tutorial__surface" role="group" aria-label="실시간 배치 미리보기">
      <div ref="preview" class="layout-tutorial__preview" :style="containerStyle">
        <div
          v-for="item in items"
          :key="item"
          class="layout-tutorial__item"
          :style="item === 'A' ? [itemStyle, firstStyle] : itemStyle"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <p aria-live="polite">
      {{ detail }}
      <span v-if="isFlex">A의 실제 너비는 {{ actualWidth }}px예요.</span>
    </p>

    <div class="layout-tutorial__code-heading">
      <h3>적용된 CSS</h3>
      <button type="button" @click="copy(css, 'CSS')">{{ copied ? '복사됨' : 'CSS 복사' }}</button>
    </div>
    <SyntaxCode :code="css" language="css" label="실시간 레이아웃 CSS" />
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;

.layout-tutorial {
  @include card-surface;
  display: grid;
  min-width: 0;
  gap: 16px;
  padding: clamp(16px, 3vw, 24px);

  h2 {
    font-size: 22px;
    margin-bottom: 6px;
  }

  p {
    color: var(--muted);
    font-size: 13px;
    line-height: 1.7;
  }

  &__controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 170px), 1fr));
    gap: 12px;

    label {
      display: grid;
      gap: 6px;
      min-width: 0;
      font-size: 13px;
    }

    select,
    input {
      width: 100%;
      min-width: 0;
    }
  }

  &__width {
    grid-column: 1 / -1;

    output {
      padding-inline-start: 6px;
      color: var(--primary);
      font-variant-numeric: tabular-nums;
    }
  }

  &__surface {
    min-width: 0;
    padding: 12px;
    background: var(--canvas);
    border: 1px solid var(--border);
    border-radius: 10px;
  }

  &__preview {
    min-width: 0;
  }

  &__item {
    display: grid;
    place-items: center;
    min-height: 46px;
    overflow: hidden;
    border-radius: 7px;
    background: var(--soft);
    color: var(--primary);
    font-weight: 600;

    &:first-child {
      background: var(--primary);
      color: white;
    }
  }

  &__code-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
}
</style>
