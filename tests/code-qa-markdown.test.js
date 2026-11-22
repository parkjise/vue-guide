import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { renderCodeAnswer } from '../src/lib/codeQaMarkdown.js';
import { createCodeQaPreview } from '../src/lib/codeQaPreview.js';

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

test('Code Q&A keeps the visual preview separate from file sources and removes active markup', () => {
  const answer = renderCodeAnswer(
    [
      '수정 설명',
      '```html preview',
      '<style>.sample { color: blue }</style><div class="sample" onclick="bad()">샘플 UI</div>',
      '<a href="https://example.test">링크</a><iframe src="https://example.test"></iframe>',
      '<script>bad()</script><meta http-equiv="refresh" content="0;url=https://example.test">',
      '```',
      '```vue App.vue',
      '<template><div>샘플 UI</div></template>',
      '```'
    ].join('\n')
  );
  assert.match(answer.html, /수정 설명/);
  assert.doesNotMatch(answer.html, /코드 복사|샘플 UI/);
  assert.match(answer.sourcesHtml, /App.vue 코드 복사/);
  assert.equal(answer.codeBlocks.length, 1);
  const dom = new JSDOM('');
  const preview = createCodeQaPreview(answer.previewHtml, dom.window.document);
  assert.match(preview, /default-src 'none'/);
  assert.match(preview, /class="sample">샘플 UI/);
  assert.match(preview, /<style>\.sample/);
  assert.doesNotMatch(preview, /onclick|example.test|<script|<iframe|http-equiv="refresh"/);
  assert.equal(createCodeQaPreview('', dom.window.document), '');
  dom.window.close();
});
