<script setup>
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import { codeQaAuth, listCodeAnswers } from '@/lib/codeQa';

const route = useRoute();
const markdown = new MarkdownIt({ html: false, linkify: false }).disable('image');
const dateFormat = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
const session = shallowRef(null);
const items = ref([]);
const selectedId = ref('');
const selected = computed(() => items.value.find((item) => item.id === selectedId.value));
const answerHtml = computed(() => markdown.render(selected.value?.answerMarkdown || ''));
const ready = ref(!codeQaAuth);
const loading = ref(false);
const error = ref(
  route.query.login === 'failed' ? '로그인을 완료하지 못했습니다. 다시 시도해 주세요.' : ''
);
let subscription;
let request;
let refreshTimer;

onMounted(() => {
  if (!codeQaAuth) return;
  const result = codeQaAuth.auth.onAuthStateChange((_event, nextSession) => {
    const previousUser = session.value?.user.id;
    const nextUser = nextSession?.user.id;
    session.value = nextSession;
    ready.value = true;
    if (previousUser !== nextUser) {
      request?.abort();
      items.value = [];
      selectedId.value = '';
      loading.value = false;
      error.value = '';
      if (nextUser) void refreshAnswers();
    }
  });
  subscription = result.data.subscription;
  refreshTimer = window.setInterval(() => {
    if (session.value && document.visibilityState === 'visible' && !loading.value) {
      void refreshAnswers();
    }
  }, 10000);
});
onUnmounted(() => {
  window.clearInterval(refreshTimer);
  subscription?.unsubscribe();
  request?.abort();
});

async function refreshAnswers() {
  if (!session.value) return;
  request?.abort();
  const controller = new AbortController();
  request = controller;
  loading.value = true;
  error.value = '';
  try {
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]);
    const answers = await listCodeAnswers(session.value.access_token, signal);
    if (controller.signal.aborted) return;
    items.value = answers;
    if (!answers.some((item) => item.id === selectedId.value)) {
      selectedId.value = answers[0]?.id ?? '';
    }
  } catch (cause) {
    if (!controller.signal.aborted) {
      items.value = [];
      selectedId.value = '';
      error.value =
        cause instanceof Error && cause.name === 'Error'
          ? cause.message
          : '답변 서버에 연결할 수 없습니다. 다시 시도해 주세요.';
    }
  } finally {
    if (request === controller) loading.value = false;
  }
}

async function signIn() {
  error.value = '';
  try {
    const redirectTo = new URL(import.meta.env.BASE_URL, location.origin).href;
    const { error: authError } = await codeQaAuth.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo }
    });
    if (authError) throw authError;
  } catch {
    error.value = 'Google 로그인을 시작하지 못했습니다. 다시 시도해 주세요.';
  }
}

async function signOut() {
  error.value = '';
  try {
    const { error: authError } = await codeQaAuth.auth.signOut({ scope: 'local' });
    if (authError) throw authError;
  } catch {
    error.value = '로그아웃하지 못했습니다. 다시 시도해 주세요.';
  }
}
</script>

<template>
  <section class="code-qa" aria-labelledby="code-qa-heading">
    <header class="code-qa__header">
      <div>
        <h1 id="code-qa-heading">Code Q&A</h1>
        <p>
          MyCode의
          <strong>VUE → s</strong>
          에서 요청한 답변을 확인하세요.
        </p>
      </div>
      <div v-if="session" class="code-qa__actions">
        <button type="button" :disabled="loading" @click="refreshAnswers">새로고침</button>
        <button type="button" @click="signOut">로그아웃</button>
      </div>
    </header>

    <p v-if="error" class="code-qa__error" role="alert">{{ error }}</p>
    <p v-if="!codeQaAuth" class="code-qa__panel">Code Q&A 서버와 로그인 설정이 필요합니다.</p>
    <p v-else-if="!ready" class="code-qa__panel" role="status">로그인 상태 확인 중…</p>
    <div v-else-if="!session" class="code-qa__panel">
      <p>MyCode에서 사용한 Google 계정으로 로그인하세요.</p>
      <button type="button" @click="signIn">Google 로그인</button>
    </div>
    <p v-else-if="loading && !items.length" class="code-qa__panel" role="status">
      답변 불러오는 중…
    </p>
    <p v-else-if="!items.length && !error" class="code-qa__panel">아직 도착한 답변이 없습니다.</p>

    <div v-if="items.length" class="code-qa__results">
      <ul class="code-qa__panel code-qa__list" aria-label="답변 목록">
        <li v-for="item in items" :key="item.id">
          <button
            type="button"
            :aria-pressed="item.id === selectedId"
            @click="selectedId = item.id"
          >
            <strong>{{ item.title }}</strong>
            <time :datetime="item.createdAt">
              {{ dateFormat.format(new Date(item.createdAt)) }}
            </time>
            <span>{{ item.summary }}</span>
          </button>
        </li>
      </ul>
      <article v-if="selected" class="code-qa__panel code-qa__answer" :aria-label="selected.title">
        <!-- MarkdownIt escapes HTML, and remote images are disabled. -->
        <div class="code-qa__markdown" v-html="answerHtml" />
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.code-qa {
  display: grid;
  gap: 16px;
  color: var(--text);

  h1 {
    font-size: 28px;
  }
  p {
    margin: 0;
  }
  button {
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: inherit;
    padding: 8px 12px;
    cursor: pointer;
  }
  button:disabled {
    cursor: default;
    opacity: 0.6;
  }
  button:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  &__header,
  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }
  &__header {
    justify-content: space-between;
  }
  &__header p,
  time,
  &__list span {
    color: var(--muted);
  }
  &__panel {
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    padding: 16px;
  }
  &__panel > button {
    margin-top: 10px;
  }
  &__error {
    color: var(--danger, #b42318);
  }
  &__results {
    display: grid;
    grid-template-columns: minmax(200px, 290px) minmax(0, 1fr);
    gap: 16px;
    align-items: start;
  }
  &__list {
    margin: 0;
    list-style: none;
    display: grid;
    gap: 8px;
  }
  &__list button {
    display: grid;
    gap: 4px;
    width: 100%;
    text-align: left;
  }
  &__list button[aria-pressed='true'] {
    border-color: var(--primary);
    background: var(--soft);
  }
  &__list time,
  &__list span {
    font-size: 12px;
  }
  &__answer {
    overflow-wrap: anywhere;
  }
  &__markdown :deep(pre) {
    overflow: auto;
    padding: 12px;
    border-radius: 8px;
    background: var(--soft);
  }
  &__markdown :deep(code) {
    font-family: monospace;
  }
  &__markdown :deep(a) {
    color: var(--primary);
    text-decoration: underline;
  }

  @media (max-width: 760px) {
    &__results {
      grid-template-columns: minmax(0, 1fr);
    }
  }
}
</style>
