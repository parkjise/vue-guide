import { JSDOM } from 'jsdom';
export const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/'
});
for (const key of [
  'window',
  'history',
  'location',
  'document',
  'Document',
  'Element',
  'HTMLElement',
  'SVGElement',
  'Node',
  'Event',
  'MouseEvent',
  'KeyboardEvent',
  'localStorage'
])
  globalThis[key] = dom.window[key];
globalThis.requestAnimationFrame = (fn) => setTimeout(fn, 0);
globalThis.cancelAnimationFrame = clearTimeout;
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
