<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import categories from '@/data/publishingTips.json';
import CodeExampleCard from '@/components/common/CodeExampleCard.vue';
import SyntaxCode from '@/components/common/SyntaxCode.vue';
import { getExampleFiles } from '@/data/codeSnippets';
import { useClipboard } from '@/composables/useClipboard';
import {
  readPublishingProgress,
  savePublishingProgress,
  publishingMarkdown
} from '@/composables/publishingChecklist';
import StyleArchitectureDemo from './StyleArchitectureDemo.vue';
import MarkupDirectivesDemo from './MarkupDirectivesDemo.vue';
import LayoutDefenseDemo from './LayoutDefenseDemo.vue';
import AssetsMotionDemo from './AssetsMotionDemo.vue';
import AccessibilityFormDemo from './AccessibilityFormDemo.vue';
import DataPerformanceDemo from './DataPerformanceDemo.vue';
import WorkflowQADemo from './WorkflowQADemo.vue';
import viteConfig from '@/examples/config/vite-scss.config.js?raw';
import designSvg from '@/assets/tips/project-design.svg?raw';
import dashboardSvg from '@/assets/tips/project-dashboard.svg?raw';
import publicSvg from '../../../public/tips/guide-mark.svg?raw';
const props = defineProps({ category: { type: String, required: true } });
const demos = {
  StyleArchitectureDemo,
  MarkupDirectivesDemo,
  LayoutDefenseDemo,
  AssetsMotionDemo,
  AccessibilityFormDemo,
  DataPerformanceDemo,
  WorkflowQADemo
};
const allTips = categories.flatMap((c) => c.tips);
const validIds = allTips.map((t) => t.id);
const done = ref(readPublishingProgress(validIds));
const storageFailed = ref(false);
watch(
  done,
  (value) => {
    storageFailed.value = !savePublishingProgress(value);
  },
  { deep: true }
);
const current = computed(() => categories.find((c) => c.id === props.category));
const isChecklist = computed(() => props.category === 'checklist');
const query = ref('');
const origin = ref('all');
const filtered = computed(() =>
  (isChecklist.value ? categories : [current.value])
    .filter(Boolean)
    .map((c) => ({
      ...c,
      tips: c.tips.filter(
        (t) =>
          (origin.value === 'all' || t.origin === origin.value) &&
          `${t.title} ${t.why} ${t.how} ${t.caution} ${t.checklist}`
            .toLowerCase()
            .includes(query.value.trim().toLowerCase())
      )
    }))
    .filter((c) => c.tips.length)
);
const visibleIds = computed(() => filtered.value.flatMap((c) => c.tips.map((t) => t.id)));
const { copy } = useClipboard();
function toggle(id, checked) {
  done.value = checked ? [...new Set([...done.value, id])] : done.value.filter((x) => x !== id);
}
function markVisible(checked) {
  done.value = checked
    ? [...new Set([...done.value, ...visibleIds.value])]
    : done.value.filter((id) => !visibleIds.value.includes(id));
}
function resetFilter() {
  query.value = '';
  origin.value = 'all';
}
function download() {
  const url = URL.createObjectURL(
    new Blob([publishingMarkdown(categories, done.value)], { type: 'text/markdown;charset=utf-8' })
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vue-publishing-checklist.md';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const files = computed(() => {
  if (!current.value) return {};
  const result = {
    ...getExampleFiles('', `/src/components/tips/${current.value.demo}.vue`),
    ...getExampleFiles('', '/src/assets/styles/main.scss')
  };
  if (props.category === 'styles') {
    result['src/examples/config/vite-scss.config.js'] = viteConfig;
    Object.assign(result, getExampleFiles('', '/src/assets/styles/practice/_tokens.scss'));
  }
  if (props.category === 'assets')
    Object.assign(result, {
      'src/assets/tips/project-design.svg': designSvg,
      'src/assets/tips/project-dashboard.svg': dashboardSvg,
      'public/tips/guide-mark.svg': publicSvg
    });
  return result;
});
</script>
<template>
  <section class="tips-guide">
    <header class="tips-guide__hero">
      <span class="tips-guide__eyebrow">VUE 3 · PUBLISHING PLAYBOOK</span>
      <h2>{{ isChecklist ? '실무 퍼블리싱 체크리스트' : current?.title }}</h2>
      <p>
        {{
          isChecklist
            ? '배포 전에 하나씩 확인하세요. 체크한 항목은 현재 브라우저에 저장됩니다.'
            : current?.description
        }}
      </p>
      <div class="tips-guide__stats">
        <span>7개 분야 · 42개 팁</span>
        <span>핵심 16 + 확장 26</span>
        <strong>확인 {{ done.length }} / 42</strong>
      </div>
      <progress :value="done.length" max="42" aria-label="전체 체크리스트 진행률" />
    </header>
    <nav class="tips-guide__nav" aria-label="팁 분야">
      <RouterLink
        v-for="c in categories"
        :key="c.id"
        :to="`/tips/${c.slug}`"
        :aria-current="current?.id === c.id ? 'page' : undefined"
      >
        {{ c.title }}
      </RouterLink>
      <RouterLink to="/tips/checklist" :aria-current="isChecklist ? 'page' : undefined">
        전체 체크리스트
      </RouterLink>
    </nav>
    <CodeExampleCard
      v-if="current"
      :key="current.id"
      :title="`${current.title} · 화면에서 직접 확인`"
      description="입력·클릭으로 동작을 확인하세요. 코드 보기에서 실제 Vue 파일과 공통 SCSS·의존 파일을 복사할 수 있습니다."
      :files="files"
    >
      <component :is="demos[current.demo]" />
    </CodeExampleCard>
    <section class="tips-guide__tools" aria-label="팁 검색 및 체크리스트 관리">
      <label>
        팁 검색
        <input v-model="query" type="search" placeholder="예: 모달, 이미지, 반응형" />
      </label>
      <label>
        범위
        <select v-model="origin">
          <option value="all">전체 팁</option>
          <option>요청한 핵심</option>
          <option>실무 확장</option>
        </select>
      </label>
      <span>{{ visibleIds.length }}개 표시</span>
      <template v-if="isChecklist">
        <button :disabled="!visibleIds.length" @click="markVisible(true)">
          표시 항목 모두 확인
        </button>
        <button :disabled="!visibleIds.length" @click="markVisible(false)">
          표시 항목 체크 해제
        </button>
        <button @click="copy(publishingMarkdown(categories, done), '체크리스트')">
          Markdown 복사
        </button>
        <button @click="download">파일 내려받기</button>
      </template>
    </section>
    <p v-if="storageFailed" role="status">
      브라우저 저장소를 사용할 수 없습니다. 현재 화면에서 체크한 뒤 파일로 내려받아 주세요.
    </p>
    <p class="tips-guide__intro">
      {{
        isChecklist
          ? '항목별 설명과 동작 예제는 해당 분야 메뉴에서 확인할 수 있습니다. 검색한 항목만 한 번에 체크할 수도 있습니다.'
          : '아래 코드는 핵심 패턴을 설명하는 발췌입니다. 바로 실행할 전체 파일은 위 동작 예제의 코드 보기에서 확인하세요.'
      }}
    </p>
    <section v-for="group in filtered" :key="group.id" class="tips-guide__group">
      <header v-if="isChecklist" class="tips-guide__group-heading">
        <h3>{{ group.title }}</h3>
        <RouterLink :to="`/tips/${group.slug}`">설명·동작 예제 보기 →</RouterLink>
      </header>
      <article
        v-for="(tip, index) in group.tips"
        :key="tip.id"
        class="tip-item"
        :class="{ 'tip-item--checked': done.includes(tip.id) }"
      >
        <div class="tip-item__heading">
          <h3>{{ String(index + 1).padStart(2, '0') }}. {{ tip.title }}</h3>
          <span>{{ tip.origin }}</span>
        </div>
        <template v-if="!isChecklist">
          <dl>
            <dt>왜 필요한가요?</dt>
            <dd>{{ tip.why }}</dd>
            <dt>실무에서는 이렇게</dt>
            <dd>{{ tip.how }}</dd>
            <dt>주의할 점</dt>
            <dd>{{ tip.caution }}</dd>
          </dl>
          <div v-if="tip.code" class="tip-item__source">
            <header>
              <span>핵심 패턴 · {{ tip.language }}</span>
              <button
                :aria-label="`${tip.title} 핵심 패턴 복사`"
                @click="copy(tip.code, tip.language)"
              >
                소스 복사
              </button>
            </header>
            <SyntaxCode
              :code="tip.code"
              :language="tip.language"
              :label="`${tip.title} 핵심 패턴`"
            />
          </div>
        </template>
        <label class="tip-item__check">
          <input
            type="checkbox"
            :checked="done.includes(tip.id)"
            @change="toggle(tip.id, $event.target.checked)"
          />
          <span>{{ tip.checklist }}</span>
        </label>
      </article>
      <p v-if="!isChecklist" class="tips-guide__reference">
        <a :href="group.source" target="_blank" rel="noopener noreferrer">관련 공식 문서 ↗</a>
      </p>
    </section>
    <div v-if="!filtered.length" class="tips-guide__empty">
      <p>검색 조건에 맞는 팁이 없습니다.</p>
      <button @click="resetFilter">검색 조건 초기화</button>
    </div>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/styles/mixins' as mix;
.tips-guide {
  display: grid;
  gap: 22px;
  min-width: 0;
  grid-template-columns: minmax(0, 1fr);
  &__hero {
    @include mix.card-surface;
    padding: 28px;
    background: linear-gradient(125deg, var(--surface), var(--soft));
    h2 {
      margin: 12px 0;
      font-size: 26px;
    }
    p {
      color: var(--muted);
      line-height: 1.8;
    }
    progress {
      width: 100%;
      height: 8px;
      accent-color: var(--primary);
      margin-top: 16px;
    }
  }
  &__eyebrow {
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--primary);
    font-weight: 700;
  }
  &__stats {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 12px;
    strong {
      color: var(--primary);
    }
  }
  &__nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    a {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 12px;
      color: var(--muted);
      font-size: 12px;
      &[aria-current='page'] {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
      }
    }
  }
  &__tools {
    display: flex;
    align-items: end;
    gap: 12px;
    flex-wrap: wrap;
    label {
      display: grid;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
    }
    input,
    select {
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 11px;
      max-width: 100%;
      min-width: 0;
    }
    span {
      padding: 10px 0;
      font-size: 12px;
      color: var(--muted);
    }
  }
  button {
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    font: inherit;
    font-size: 12px;
    &:disabled {
      opacity: 0.45;
      cursor: default;
    }
  }
  a,
  button,
  input,
  select {
    @include mix.focus-ring;
  }
  &__intro,
  &__reference {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.9;
    margin: 0;
  }
  &__group {
    display: grid;
    gap: 16px;
    min-width: 0;
    grid-template-columns: minmax(0, 1fr);
  }
  &__group-heading {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    h3 {
      margin: 0;
      font-size: 17px;
    }
    a {
      font-size: 12px;
      color: var(--primary);
    }
  }
  &__empty {
    @include mix.card-surface;
    padding: 30px;
    text-align: center;
  }
}
.tip-item {
  @include mix.card-surface;
  min-width: 0;
  overflow: hidden;
  padding: 22px;
  display: grid;
  gap: 18px;
  &--checked {
    border-color: var(--primary);
  }
  &__heading {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    h3 {
      font-size: 17px;
      line-height: 1.6;
      margin: 0;
    }
    span {
      font-size: 11px;
      color: var(--primary);
      background: var(--soft);
      padding: 5px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }
  }
  dl {
    display: grid;
    grid-template-columns: 125px minmax(0, 1fr);
    gap: 12px 20px;
    margin: 0;
    font-size: 13px;
    line-height: 1.9;
  }
  dt {
    font-weight: 700;
  }
  dd {
    margin: 0;
    color: var(--muted);
    overflow-wrap: anywhere;
    white-space: pre-line;
  }
  &__source {
    min-width: 0;
    border-radius: 8px;
    overflow: hidden;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      background: #252526;
      color: #ddd;
      font-size: 11px;
    }
  }
  &__check {
    display: flex;
    align-items: start;
    gap: 10px;
    font-size: 13px;
    line-height: 1.8;
    cursor: pointer;
    border-top: 1px solid var(--border);
    padding-top: 16px;
    input {
      margin-top: 5px;
      accent-color: var(--primary);
      flex-shrink: 0;
      width: 17px;
      height: 17px;
    }
    span {
      overflow-wrap: anywhere;
    }
  }
}
@include mix.responsive(mobile) {
  .tips-guide__hero {
    padding: 20px;
    h2 {
      font-size: 22px;
    }
  }
  .tips-guide__tools label {
    width: 100%;
  }
  .tip-item {
    padding: 16px;
    dl {
      grid-template-columns: minmax(0, 1fr);
      gap: 5px;
    }
    dd {
      margin-bottom: 12px;
    }
  }
}
</style>
