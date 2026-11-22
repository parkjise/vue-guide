import MarkdownIt from 'markdown-it';
import { highlightCode } from '../composables/codeHighlight.js';

const markdown = new MarkdownIt({ html: false, linkify: false }).disable('image');
const { escapeHtml } = markdown.utils;

function codeBlock(tokens, index, _options, env) {
  const { content, info } = tokens[index];
  const [language = '', ...pathParts] = info.trim().split(/\s+/);
  const file = pathParts.join(' ');
  const label = escapeHtml(file || language || '코드');
  const blockIndex = env.codeBlocks.push({ text: content, label: file || language || '소스' }) - 1;
  return `<div class="code-qa__code-block">
    <div class="code-qa__code-toolbar">
      <span>${label}</span>
      <button type="button" data-code-copy="${blockIndex}" aria-label="${label} 코드 복사">복사</button>
    </div>
    <pre class="code-qa__code" tabindex="0" aria-label="${label}"><code>${highlightCode(content, language || 'plaintext')}</code></pre>
  </div>`;
}

markdown.renderer.rules.fence = codeBlock;
markdown.renderer.rules.code_block = codeBlock;

export function renderCodeAnswer(source) {
  const codeBlocks = [];
  return { html: markdown.render(source, { codeBlocks }), codeBlocks };
}
