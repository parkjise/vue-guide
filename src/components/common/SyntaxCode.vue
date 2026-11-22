<script setup>
import { computed } from 'vue';
import { highlightCode } from '@/composables/codeHighlight';
const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: 'plaintext' },
  label: { type: String, default: '소스 코드' }
});
const highlighted = computed(() => highlightCode(props.code, props.language));
</script>
<template>
  <pre class="syntax-code" tabindex="0" :aria-label="label"><code v-html="highlighted" /></pre>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/code-palette' as *;
.syntax-code {
  @include custom-scrollbar;
  @include focus-ring;
  margin: 0;
  padding: 22px 24px;
  max-height: 600px;
  overflow: auto;
  background: #1e1e1e;
  color: #d4d4d4;
  color-scheme: dark;
  white-space: pre;
  tab-size: 2;
  text-align: left;
  font:
    13px/1.85 'SFMono-Regular',
    Consolas,
    'Liberation Mono',
    monospace;
  code {
    font: inherit;
    background: transparent;
    color: inherit;
    padding: 0;
  }
  &::selection,
  :deep(::selection) {
    background: #264f78;
  }
  :deep(code) {
    @include vs-code-dark-tokens;
  }
  @include responsive(mobile) {
    padding: 16px;
    font-size: 12px;
  }
}
</style>
