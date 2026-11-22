import test from 'node:test';
import assert from 'node:assert/strict';
import { renderCodeAnswer } from '../src/lib/codeQaMarkdown.js';

test('Code Q&A renders separately named and highlighted code blocks with raw copy text', () => {
  const answer = renderCodeAnswer(
    [
      '#### 파일별 변경',
      '',
      '```vue src/components/Counter.vue',
      '<script setup>const count = 1</script>',
      '```',
      '',
      '```javascript src/data/data.js',
      'export const label = "<img onerror=alert(1)>";',
      '```'
    ].join('\n')
  );
  assert.match(answer.sourcesHtml, /Counter\.vue 코드 복사/);
  assert.match(answer.sourcesHtml, /data\.js 코드 복사/);
  assert.match(answer.sourcesHtml, /hljs-keyword/);
  assert.doesNotMatch(answer.sourcesHtml, /<img|<script\b/);
  assert.equal(answer.codeBlocks[1].text, 'export const label = "<img onerror=alert(1)>";\n');
});

test('Code Q&A escapes untrusted file labels and keeps older indented code copyable', () => {
  const answer = renderCodeAnswer(
    '```foo <img src="evil">\n<script>hello</script>\n```\n\n    older code\n'
  );
  assert.doesNotMatch(answer.sourcesHtml, /<img|<script\b/);
  assert.match(answer.html, /data-code-copy="1"/);
  assert.equal(answer.codeBlocks[1].text, 'older code\n');
});

test('Code Q&A shows changed code separately from the complete component and stylesheet', () => {
  const answer = renderCodeAnswer(
    [
      '수정 설명',
      '',
      '```html preview',
      '<div>기존 미리보기</div>',
      '```',
      '',
      '```vue changes:src/App.vue',
      '<button class="sample">수정</button>',
      '```',
      '',
      '```css changes:src/style.css',
      '.sample { color: blue; }',
      '```',
      '',
      '```vue src/App.vue',
      '<template><button class="sample">수정</button></template>',
      '<style scoped src="./style.css"></style>',
      '```',
      '',
      '```css src/style.css',
      '.sample { color: blue; padding: 12px; }',
      '```'
    ].join('\n')
  );
  assert.match(answer.html, /수정 설명/);
  assert.doesNotMatch(answer.html, /기존 미리보기|코드 복사/);
  assert.match(answer.changesHtml, /src\/App\.vue 수정 코드 복사/);
  assert.match(answer.changesHtml, /src\/style\.css 수정 코드 복사/);
  assert.doesNotMatch(answer.changesHtml, /padding/);
  assert.match(answer.sourcesHtml, /src\/style\.css 코드 복사/);
  assert.match(answer.sourcesHtml, /padding/);
  assert.deepEqual(
    answer.codeBlocks.map(({ label }) => label),
    ['src/App.vue', 'src/style.css', 'src/App.vue', 'src/style.css']
  );
  assert.equal(answer.codeBlocks[1].text, '.sample { color: blue; }\n');
});
