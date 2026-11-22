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
  assert.match(answer.html, /Counter\.vue 코드 복사/);
  assert.match(answer.html, /data\.js 코드 복사/);
  assert.match(answer.html, /hljs-keyword/);
  assert.doesNotMatch(answer.html, /<img|<script\b/);
  assert.equal(answer.codeBlocks[1].text, 'export const label = "<img onerror=alert(1)>";\n');
});

test('Code Q&A escapes untrusted file labels and keeps older indented code copyable', () => {
  const answer = renderCodeAnswer(
    '```foo <img src="evil">\n<script>hello</script>\n```\n\n    older code\n'
  );
  assert.doesNotMatch(answer.html, /<img|<script\b/);
  assert.match(answer.html, /data-code-copy="1"/);
  assert.equal(answer.codeBlocks[1].text, 'older code\n');
});
