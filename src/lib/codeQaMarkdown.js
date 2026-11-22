import MarkdownIt from 'markdown-it';
import { highlightCode } from '../composables/codeHighlight.js';

const markdown = new MarkdownIt({ html: false, linkify: false }).disable('image');
const { escapeHtml } = markdown.utils;

function codeBlock(tokens, index, _options, env) {
  const { content, info } = tokens[index];
  const [language = '', ...pathParts] = info.trim().split(/\s+/);
  const descriptor = pathParts.join(' ');
  if (language === 'html' && descriptor === 'preview') return '';
  const changes = descriptor.startsWith('changes:');
  const file = changes ? descriptor.slice('changes:'.length).trim() : descriptor;
  const label = escapeHtml(file || language || '코드');
  const blockIndex = env.codeBlocks.push({ text: content, label: file || language || '소스' }) - 1;
  const html = `<div class="code-qa__code-block">
    <div class="code-qa__code-toolbar">
      <span>${label}</span>
      <button type="button" data-code-copy="${blockIndex}" aria-label="${label} ${changes ? '수정 ' : ''}코드 복사">복사</button>
    </div>
    <pre class="code-qa__code" tabindex="0" aria-label="${label}"><code>${highlightCode(content, language || 'plaintext')}</code></pre>
  </div>`;
  if (!file) return html;
  (changes ? env.changeBlocks : env.sourceBlocks).push(html);
  return '';
}

markdown.renderer.rules.fence = codeBlock;
markdown.renderer.rules.code_block = codeBlock;

export function renderCodeAnswer(source) {
  const env = { codeBlocks: [], sourceBlocks: [], changeBlocks: [] };
  const html = markdown
    .render(source, env)
    .replace(
      /<h([1-6])>(수정 코드|전체 소스|파일별 전체 소스)<\/h\1>\n/g,
      (heading, _level, title) => {
        const section = title === '수정 코드' ? env.changeBlocks : env.sourceBlocks;
        return section.length ? '' : heading;
      }
    );
  return {
    html,
    sourcesHtml: env.sourceBlocks.join(''),
    changesHtml: env.changeBlocks.join(''),
    codeBlocks: env.codeBlocks
  };
}
