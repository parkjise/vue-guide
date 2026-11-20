<script setup>
import { ref, computed, watch, useId, defineAsyncComponent } from 'vue';
const SyntaxCode = defineAsyncComponent(() => import('@/components/common/SyntaxCode.vue'));
import { Code2, Copy, Check, ChevronDown, FileCode2 } from 'lucide-vue-next';
import { extractBlock } from '@/data/codeSnippets/blocks';
import { useClipboard } from '@/composables/useClipboard';
import { loadOptionsExamples, findOptionsExample } from '@/data/codeSnippets/apiVariants';
const props = defineProps({
  title: { type: String, default: 'Live example' },
  description: { type: String, default: '' },
  files: { type: Object, required: true },
  initiallyExpanded: { type: Boolean, default: false },
  sourceOnly: { type: Boolean, default: false }
});
const expanded = ref(props.initiallyExpanded);
const selectedFile = ref(Object.keys(props.files)[0] || '');
const selectedTab = ref('full');
const apiMode = ref('composition');
const optionsCatalog = ref(null);
const loadingOptions = ref(false);
const optionsError = ref('');
const originalSource = computed(
  () => props.files[selectedFile.value] ?? Object.values(props.files)[0] ?? ''
);
const vueSource = computed(
  () => /\.vue$/.test(selectedFile.value) && /^<script\b[^>]*\bsetup\b/m.test(originalSource.value)
);
const optionsCode = computed(() => findOptionsExample(optionsCatalog.value, originalSource.value));
const optionsSelected = computed(() => vueSource.value && apiMode.value === 'options');
const canCopy = computed(
  () =>
    !optionsSelected.value || (!loadingOptions.value && !optionsError.value && !!optionsCode.value)
);
async function fetchOptions() {
  if (optionsCatalog.value || loadingOptions.value) return;
  loadingOptions.value = true;
  optionsError.value = '';
  try {
    optionsCatalog.value = await loadOptionsExamples();
  } catch {
    optionsError.value = 'Options API 소스를 불러오지 못했습니다. 다시 시도해 주세요.';
  } finally {
    loadingOptions.value = false;
  }
}
watch([apiMode, vueSource], () => {
  if (optionsSelected.value) fetchOptions();
});
watch(
  () => props.files,
  (files) => {
    if (!(selectedFile.value in files)) selectedFile.value = Object.keys(files)[0] || '';
  }
);
watch(vueSource, (value) => {
  if (!value) selectedTab.value = 'full';
});
function onApiKey(event) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  apiMode.value =
    event.key === 'Home'
      ? 'composition'
      : event.key === 'End'
        ? 'options'
        : apiMode.value === 'composition'
          ? 'options'
          : 'composition';
  event.currentTarget.parentElement.querySelector(`[data-api="${apiMode.value}"]`)?.focus();
}
const id = useId();
const tabs = computed(() =>
  [
    {
      id: 'full',
      label: `전체 코드 (.${selectedFile.value.split('.').pop() || 'vue'})`
    },
    { id: 'template', label: '<template>' },
    { id: 'script', label: optionsSelected.value ? '<script> · Options API' : '<script setup>' },
    { id: 'style', label: '<style scss>' }
  ].filter((tab) => (!props.sourceOnly && vueSource.value) || tab.id === 'full')
);
const source = computed(() => (optionsSelected.value ? optionsCode.value : originalSource.value));
const code = computed(() => {
  if (
    selectedTab.value === 'full' ||
    (selectedTab.value === 'style' && selectedFile.value.endsWith('.scss'))
  )
    return source.value;
  const tag = selectedTab.value;
  return (
    extractBlock(source.value, tag) ||
    '이 파일에는 선택한 블록이 없습니다. 전체 코드 탭을 확인하세요.'
  );
});
const codeLanguage = computed(() =>
  selectedTab.value === 'template'
    ? 'html'
    : selectedTab.value === 'script'
      ? 'javascript'
      : selectedTab.value === 'style'
        ? 'scss'
        : selectedFile.value.split('.').pop()
);
const { copied, copy } = useClipboard();
</script>
<template>
  <article class="code-card">
    <header class="code-card__header">
      <section>
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </section>
      <span class="code-card__live">
        <span />
        {{ sourceOnly ? 'SOURCE FILES' : 'LIVE PREVIEW' }}
      </span>
    </header>
    <section class="code-card__preview" aria-label="동작 예제"><slot /></section>
    <footer class="code-card__toolbar">
      <button :aria-expanded="expanded" :aria-controls="id" @click="expanded = !expanded">
        <Code2 :size="16" />
        {{ sourceOnly ? 'SCSS' : 'Vue' }} 코드 {{ expanded ? '닫기' : '보기' }}
        <ChevronDown :size="14" :class="{ 'code-card__chevron--open': expanded }" />
      </button>
      <span class="code-card__hint">
        {{
          sourceOnly
            ? 'SCSS · 원본 파일'
            : 'Vue 3 · ' + (optionsSelected ? 'Options API' : 'Composition API')
        }}
      </span>
      <button
        :aria-label="'현재 코드 복사'"
        :disabled="!canCopy"
        @click="copy(code, selectedFile.endsWith('.scss') ? 'SCSS' : 'Vue')"
      >
        <Check v-if="copied" :size="15" />
        <Copy v-else :size="15" />
        {{ copied ? '복사됨 ✓' : '코드 복사' }}
      </button>
    </footer>
    <section v-if="expanded" :id="id" class="code-card__source">
      <label class="code-card__file">
        <FileCode2 :size="15" />
        파일
        <select v-model="selectedFile" aria-label="소스 파일">
          <option v-for="(_, name) in files" :key="name" :value="name">{{ name }}</option>
          <option v-if="!selectedFile" value="" disabled>파일 선택</option>
        </select>
      </label>
      <nav v-if="vueSource" class="code-card__api" role="tablist" aria-label="Vue API 방식">
        <button
          v-for="api in ['composition', 'options']"
          :id="`${id}-api-${api}`"
          :key="api"
          role="tab"
          :data-api="api"
          :aria-selected="apiMode === api"
          :aria-controls="`${id}-api-panel`"
          :tabindex="apiMode === api ? 0 : -1"
          @click="apiMode = api"
          @keydown="onApiKey"
        >
          {{ api === 'composition' ? 'Composition API' : 'Options API' }}
        </button>
      </nav>
      <p v-if="vueSource" class="code-card__api-note">
        {{
          optionsSelected
            ? '같은 화면·동작을 data · computed · methods · watch로 작성한 Vue 3 전체 예제입니다. 공유 Composable·useId가 필요한 파일은 setup에서 연결하며, 해당 공통 JS는 두 방식에서 함께 사용합니다.'
            : '실제 화면에서 실행 중인 Composition API 원본입니다. Options API 탭으로 같은 기능의 작성 방식을 비교하세요.'
        }}
      </p>
      <p v-else class="code-card__api-note">
        SCSS·HTML·CSS·공통 JS·에셋은 API 방식과 무관하게 같은 원본을 사용합니다.
      </p>
      <div v-if="optionsSelected && loadingOptions" class="code-card__status" role="status">
        Options API 소스를 불러오는 중입니다…
      </div>
      <div v-else-if="optionsSelected && optionsError" class="code-card__status" role="alert">
        {{ optionsError }}
        <button @click="fetchOptions">다시 시도</button>
      </div>
      <p v-else-if="optionsSelected && !optionsCode" class="code-card__status" role="alert">
        이 원본과 일치하는 Options API 예제를 찾지 못했습니다. 페이지를 새로고침해 주세요.
      </p>
      <section
        v-if="canCopy"
        :id="`${id}-api-panel`"
        :role="vueSource ? 'tabpanel' : undefined"
        :aria-labelledby="vueSource ? `${id}-api-${apiMode}` : undefined"
        :aria-label="vueSource ? undefined : '공통 원본 소스'"
        tabindex="0"
      >
        <nav class="code-card__tabs" aria-label="소스 코드 블록">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :aria-pressed="selectedTab === tab.id"
            @click="selectedTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </nav>
        <SyntaxCode :code="code" :language="codeLanguage" label="소스 코드" />
      </section>
    </section>
  </article>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
.code-card {
  @include card-surface;
  overflow: hidden;
  &__header {
    @include flex-between;
    padding: 22px 26px;
    border-bottom: 1px solid var(--border);
    h2 {
      font-size: 16px;
    }
    p {
      font-size: 12px;
      color: var(--muted);
      margin-top: 4px;
    }
  }
  &__live {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 9px;
    letter-spacing: 1.2px;
    color: var(--caption);
    white-space: nowrap;
    span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--success);
    }
  }
  &__preview {
    padding: 28px;
    min-height: 160px;
  }
  &__toolbar {
    @include flex-between;
    background: var(--canvas);
    border-top: 1px solid var(--border);
    padding: 10px 20px;
    button {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      border: 0;
      background: transparent;
    }
  }
  &__hint {
    margin-left: auto;
    color: var(--caption);
    font-size: 11px;
  }
  &__source {
    background: #1e1e1e;
    color: #d4d4d4;
    color-scheme: dark;
  }
  &__file {
    display: flex;
    padding: 14px 20px;
    gap: 10px;
    select {
      background: #252526;
      color: #e2e8f0;
      max-width: 85%;
    }
  }
  &__api {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 16px 20px 0;
    button {
      background: #252526;
      color: #cbd5e1;
      border: 1px solid #4b5563;
      font-size: 12px;
      &[aria-selected='true'] {
        background: #37316c;
        color: #e0e7ff;
        border-color: #a5b4fc;
      }
    }
  }
  &__api-note,
  &__status {
    padding: 12px 20px;
    margin: 0;
    font-size: 12px;
    line-height: 1.8;
    color: #b8c2d1;
    overflow-wrap: anywhere;
  }
  button:focus-visible,
  select:focus-visible,
  [role='tabpanel']:focus-visible {
    outline: 2px solid #a5b4fc;
    outline-offset: -2px;
  }
  &__toolbar button:disabled {
    opacity: 0.45;
    cursor: wait;
  }
  &__tabs {
    display: flex;
    overflow: auto;
    padding: 0 14px;
    border-bottom: 1px solid #3c3c3c;
    button {
      background: none;
      color: #94a3b8;
      border: 0;
      border-radius: 0;
      font-size: 12px;
      white-space: nowrap;
      &[aria-pressed='true'] {
        color: #c7d2fe;
        border-bottom: 2px solid #818cf8;
      }
    }
  }
  &__chevron--open {
    transform: rotate(180deg);
  }
  @include responsive(mobile) {
    &__header,
    &__preview {
      padding: 18px;
    }
    &__hint {
      display: none;
    }
    &__live {
      font-size: 8px;
    }
  }
}
</style>
