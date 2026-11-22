import { createPracticePreview } from '../composables/practicePreview.js';

const previewElements = new Set([
  'a',
  'article',
  'aside',
  'b',
  'blockquote',
  'br',
  'button',
  'caption',
  'code',
  'dd',
  'details',
  'div',
  'dl',
  'dt',
  'em',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'i',
  'input',
  'label',
  'legend',
  'li',
  'main',
  'mark',
  'nav',
  'ol',
  'option',
  'p',
  'pre',
  'section',
  'select',
  'small',
  'span',
  'strong',
  'style',
  'summary',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul'
]);
const previewAttributes = new Set([
  'aria-label',
  'checked',
  'class',
  'colspan',
  'disabled',
  'for',
  'hidden',
  'id',
  'open',
  'placeholder',
  'role',
  'rowspan',
  'selected',
  'style',
  'title',
  'type',
  'value'
]);

export function createCodeQaPreview(html, doc = document) {
  if (!html) return '';
  const preview = doc.createElement('template');
  preview.innerHTML = html;
  for (const element of preview.content.querySelectorAll('*')) {
    if (
      element.namespaceURI !== 'http://www.w3.org/1999/xhtml' ||
      !previewElements.has(element.localName)
    ) {
      element.remove();
      continue;
    }
    for (const attribute of element.getAttributeNames()) {
      if (!previewAttributes.has(attribute)) element.removeAttribute(attribute);
    }
  }
  return createPracticePreview(preview.innerHTML, '');
}
