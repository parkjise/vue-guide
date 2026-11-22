<script setup>
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseModal from '@/components/common/BaseModal.vue';
import { useClipboard } from '@/composables/useClipboard';
import { useToast } from '@/composables/useToast';
import { codeQaAuth, deleteCodeAnswers, listCodeAnswers } from '@/lib/codeQa';
import { renderCodeAnswer } from '@/lib/codeQaMarkdown';

const route = useRoute();
const { copy } = useClipboard({ notifyOnFailure: false });
const { toast } = useToast();
const dateFormat = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium', timeStyle: 'short' });
const session = shallowRef(null);
const items = ref([]);
const selectedId = ref('');
const selected = computed(() => items.value.find((item) => item.id === selectedId.value));
const answer = computed(() => renderCodeAnswer(selected.value?.answerMarkdown || ''));
const copyOpen = ref(false);
const manualCopy = shallowRef(null);
const copyField = ref(null);
const deleteOpen = ref(false);
const checkedIds = ref(new Set());
const pendingDeleteIds = ref([]);
const deleting = ref(false);
const deleteError = ref('');
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
      copyOpen.value = false;
      manualCopy.value = null;
      deleteOpen.value = false;
      checkedIds.value.clear();
      pendingDeleteIds.value = [];
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
  if (!session.value || deleting.value) return;
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
    checkedIds.value = new Set(
      answers.filter(({ id }) => checkedIds.value.has(id)).map(({ id }) => id)
    );
    if (!answers.some((item) => item.id === selectedId.value)) {
      selectedId.value = answers[0]?.id ?? '';
    }
  } catch (cause) {
    if (!controller.signal.aborted) {
      items.value = [];
      selectedId.value = '';
      checkedIds.value.clear();
      error.value =
        cause instanceof Error && cause.name === 'Error'
          ? cause.message
          : '답변 서버에 연결할 수 없습니다. 다시 시도해 주세요.';
    }
  } finally {
    if (request === controller) loading.value = false;
  }
}

async function copyAnswerCode(event) {
  const button = event.target?.closest?.('button[data-code-copy]');
  if (!button) return;
  const block = answer.value.codeBlocks[Number(button.dataset.codeCopy)];
  const userId = session.value?.user.id;
  if (
    block &&
    userId &&
    !(await copy(block.text, block.label)) &&
    session.value?.user.id === userId
  ) {
    manualCopy.value = block;
    copyOpen.value = true;
  }
}

function selectManualCode() {
  const field = copyField.value;
  if (!field) return;
  field.focus({ preventScroll: true });
  field.setSelectionRange(0, field.value.length);
}

function toggleChecked(id, checked) {
  if (checked) checkedIds.value.add(id);
  else checkedIds.value.delete(id);
}

function confirmDelete() {
  pendingDeleteIds.value = [...checkedIds.value];
  deleteError.value = '';
  deleteOpen.value = true;
}

async function removeAnswers() {
  const activeSession = session.value;
  const ids = pendingDeleteIds.value;
  if (!activeSession || !ids.length || deleting.value) return;
  deleting.value = true;
  deleteError.value = '';
  request?.abort();
  try {
    await deleteCodeAnswers(activeSession.access_token, ids);
    if (session.value?.user.id !== activeSession.user.id) return;
    const deleted = new Set(ids);
    const index = items.value.findIndex(({ id }) => id === selectedId.value);
    items.value = items.value.filter(({ id }) => !deleted.has(id));
    ids.forEach((id) => checkedIds.value.delete(id));
    if (deleted.has(selectedId.value)) {
      selectedId.value = (items.value[index] || items.value.at(-1))?.id ?? '';
    }
    deleteOpen.value = false;
    toast(`답변 ${ids.length}개를 삭제했습니다.`);
  } catch (cause) {
    deleteError.value =
      cause?.name === 'Error' ? cause.message : '답변을 삭제하지 못했습니다. 다시 시도해 주세요.';
  } finally {
    deleting.value = false;
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
        <button type="button" :disabled="loading || deleting" @click="refreshAnswers">
          새로고침
        </button>
        <button
          type="button"
          class="code-qa__delete"
          :disabled="!checkedIds.size || deleting"
          @click="confirmDelete"
        >
          답변 삭제{{ checkedIds.size ? ` (${checkedIds.size})` : '' }}
        </button>
        <button type="button" :disabled="deleting" @click="signOut">로그아웃</button>
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
        <li v-for="item in items" :key="item.id" class="code-qa__row">
          <input
            type="checkbox"
            class="code-qa__checkbox"
            :checked="checkedIds.has(item.id)"
            :disabled="deleting"
            :aria-label="`${item.title}, ${dateFormat.format(new Date(item.createdAt))} 삭제 대상으로 선택`"
            @change="toggleChecked(item.id, $event.target.checked)"
          />
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
        <div class="code-qa__markdown" @click="copyAnswerCode" v-html="answer.html" />
        <section
          v-if="answer.changesHtml"
          class="code-qa__section"
          aria-labelledby="code-qa-changes"
        >
          <h2 id="code-qa-changes">수정 코드</h2>
          <div class="code-qa__markdown" @click="copyAnswerCode" v-html="answer.changesHtml" />
        </section>
        <section
          v-if="answer.sourcesHtml"
          class="code-qa__section"
          aria-labelledby="code-qa-full-source"
        >
          <h2 id="code-qa-full-source">파일별 전체 소스</h2>
          <div class="code-qa__markdown" @click="copyAnswerCode" v-html="answer.sourcesHtml" />
        </section>
      </article>
    </div>

    <BaseModal v-model="copyOpen" title="코드 복사">
      <p>자동 복사를 사용할 수 없어요. 코드를 전체 선택한 뒤 복사해 주세요.</p>
      <label for="code-qa-manual-copy">{{ manualCopy?.label }}</label>
      <textarea
        id="code-qa-manual-copy"
        ref="copyField"
        class="code-qa__copy-field"
        :value="manualCopy?.text"
        readonly
        spellcheck="false"
        wrap="off"
      />
      <div class="code-qa__dialog-actions">
        <BaseButton variant="outline" @click="copyOpen = false">닫기</BaseButton>
        <BaseButton @click="selectManualCode">전체 선택</BaseButton>
      </div>
    </BaseModal>

    <BaseModal v-model="deleteOpen" title="선택한 답변을 삭제할까요?">
      <p>
        <strong>답변 {{ pendingDeleteIds.length }}개</strong>
        를 삭제합니다. 삭제한 답변은 복구할 수 없습니다.
      </p>
      <p v-if="deleteError" class="code-qa__error" role="alert">{{ deleteError }}</p>
      <div class="code-qa__dialog-actions">
        <BaseButton variant="outline" :disabled="deleting" @click="deleteOpen = false">
          취소
        </BaseButton>
        <BaseButton variant="danger" :loading="deleting" @click="removeAnswers">삭제</BaseButton>
      </div>
    </BaseModal>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/code-palette' as *;

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
  &__row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 9px;
  }
  &__checkbox {
    width: 18px;
    height: 18px;
    accent-color: var(--primary);
    cursor: pointer;
  }
  &__checkbox:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 3px;
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
  &__section {
    display: grid;
    gap: 8px;
    margin-top: 22px;
  }
  &__section h2 {
    font-size: 18px;
  }
  &__copy-field {
    width: 100%;
    min-height: 180px;
    max-height: 45vh;
    padding: 10px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: #1e1e1e;
    color: #d4d4d4;
    font:
      16px/1.5 Consolas,
      monospace;
    resize: vertical;
    user-select: text;
  }
  &__dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  button.code-qa__delete {
    color: var(--danger, #b42318);
  }
  &__markdown :deep(.code-qa__code-block) {
    margin: 12px 0 18px;
    border: 1px solid #454545;
    border-radius: 9px;
    overflow: hidden;
    background: #1e1e1e;
    color: #d4d4d4;
    @include vs-code-dark-tokens;
  }
  &__markdown :deep(.code-qa__code-toolbar) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 6px 10px 6px 14px;
    background: #252526;
    color: #e0e0e0;
    font-size: 12px;
  }
  &__markdown :deep(.code-qa__code-toolbar button) {
    flex: none;
    padding: 4px 10px;
    border: 1px solid #565656;
    border-radius: 5px;
    background: #333;
    color: #fff;
    cursor: pointer;
  }
  &__dialog-actions :deep(.base-button--danger) {
    color: #fff;
    background: var(--danger, #b42318);
    border-color: transparent;
  }
  &__markdown :deep(.code-qa__code-toolbar button:focus-visible),
  &__markdown :deep(.code-qa__code:focus-visible) {
    outline: 2px solid #569cd6;
    outline-offset: -2px;
  }
  &__markdown :deep(.code-qa__code) {
    overflow: auto;
    margin: 0;
    max-height: 600px;
    padding: 14px;
    color-scheme: dark;
    tab-size: 2;
    font:
      13px/1.7 Consolas,
      'SFMono-Regular',
      monospace;
  }
  &__markdown :deep(code) {
    font-family: monospace;
  }
  &__markdown :deep(a) {
    color: var(--primary);
    text-decoration: underline;
  }

  @media (pointer: coarse) {
    &__markdown :deep(.code-qa__code-toolbar button) {
      min-height: 44px;
      padding-inline: 14px;
      touch-action: manipulation;
    }
  }

  @media (max-width: 760px) {
    &__results {
      grid-template-columns: minmax(0, 1fr);
    }
  }
}
</style>
