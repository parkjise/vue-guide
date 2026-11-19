import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc';
import { createScrollLockManager } from '../src/composables/publishingScrollLock.js';
import {
  readPublishingProgress,
  savePublishingProgress,
  publishingMarkdown
} from '../src/composables/publishingChecklist.js';
import { menuGroups } from '../src/data/menuData.js';
const categories = JSON.parse(readFileSync('src/data/publishingTips.json', 'utf8'));
const tips = categories.flatMap((c) => c.tips);
test('Publishing tips cover seven fields with 42 unique checks and eight matching menu routes', () => {
  assert.equal(categories.length, 7);
  assert.equal(tips.length, 42);
  assert.equal(new Set(tips.map((t) => t.id)).size, 42);
  assert.equal(tips.filter((t) => t.origin === '요청한 핵심').length, 16);
  const group = menuGroups.find((g) => g.title === '팁');
  assert.equal(group.children.length, 8);
  for (const c of categories) {
    assert.equal(c.tips.length, 6);
    assert.ok(group.children.some((item) => item.path === `/tips/${c.slug}`));
    assert.match(c.source, /^https:\/\//);
    for (const t of c.tips)
      for (const field of ['title', 'why', 'how', 'caution', 'checklist'])
        assert.ok(t[field].length > 8, `${t.id}.${field}`);
  }
});
test('Tip demos and shared guide compile templates with script bindings', () => {
  for (const name of readdirSync('src/components/tips').filter((f) => f.endsWith('.vue'))) {
    const file = `src/components/tips/${name}`;
    const { descriptor, errors } = parse(readFileSync(file, 'utf8'), { filename: file });
    assert.deepEqual(errors, [], name);
    const script = compileScript(descriptor, { id: name });
    const result = compileTemplate({
      source: descriptor.template.content,
      filename: file,
      id: name,
      compilerOptions: { bindingMetadata: script.bindings }
    });
    assert.deepEqual(result.errors, [], name);
  }
});
test('Nested scroll locks retain original styles until final release and release is idempotent', () => {
  const doc = {
    body: { style: { overflow: 'scroll', paddingRight: '7px' } },
    documentElement: { clientWidth: 980 }
  };
  const viewport = { innerWidth: 1000, getComputedStyle: () => ({ paddingRight: '7px' }) };
  const manager = createScrollLockManager(doc, viewport);
  const first = manager.acquire();
  const second = manager.acquire();
  assert.deepEqual(doc.body.style, { overflow: 'hidden', paddingRight: '27px' });
  first();
  first();
  assert.equal(doc.body.style.overflow, 'hidden');
  second();
  assert.deepEqual(doc.body.style, { overflow: 'scroll', paddingRight: '7px' });
  const again = manager.acquire();
  again();
  assert.equal(doc.body.style.paddingRight, '7px');
});
test('Checklist persistence rejects malformed, stale and duplicate IDs and tolerates blocked storage', () => {
  const valid = tips.map((t) => t.id);
  assert.deepEqual(
    readPublishingProgress(valid, {
      getItem: () => JSON.stringify([valid[0], valid[0], 'stale', null])
    }),
    [valid[0]]
  );
  for (const payload of ['broken', '{}', 'null'])
    assert.deepEqual(readPublishingProgress(valid, { getItem: () => payload }), []);
  const blocked = {
    getItem() {
      throw Error('blocked');
    },
    setItem() {
      throw Error('blocked');
    }
  };
  assert.deepEqual(readPublishingProgress(valid, blocked), []);
  assert.equal(savePublishingProgress([], blocked), false);
  let saved;
  assert.equal(
    savePublishingProgress([valid[0]], {
      setItem(key, value) {
        saved = JSON.parse(value);
      }
    }),
    true
  );
  assert.deepEqual(saved, [valid[0]]);
});
test('Markdown export preserves real line breaks, category headings and all check states', () => {
  const markdown = publishingMarkdown(categories, [tips[0].id]);
  assert.equal(markdown.split('\n').filter((line) => line.startsWith('- [')).length, 42);
  assert.equal(markdown.split('\n').filter((line) => line.startsWith('## ')).length, 7);
  assert.ok(markdown.includes(`- [x] ${tips[0].checklist}`));
  assert.ok(markdown.includes(`- [ ] ${tips[1].checklist}`));
});
