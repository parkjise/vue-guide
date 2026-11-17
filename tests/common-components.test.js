import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc';
import { resolveSourcePath } from '../src/data/codeSnippets/resolveSource.js';

const guide = JSON.parse(readFileSync('src/data/commonComponentGuide.json', 'utf8'));
test('Every common component guide has a full compilable parent example and resolvable imports', () => {
  assert.equal(guide.length, 14);
  assert.equal(new Set(guide.map((item) => item.id)).size, guide.length);
  const visited = new Set();
  function check(file) {
    if (visited.has(file)) return;
    visited.add(file);
    const source = readFileSync('.' + file, 'utf8');
    if (file.endsWith('.vue')) {
      const { descriptor, errors } = parse(source, { filename: file });
      assert.deepEqual(errors, [], file);
      assert.ok(descriptor.scriptSetup && descriptor.template, file);
      const script = compileScript(descriptor, { id: file });
      const result = compileTemplate({
        source: descriptor.template.content,
        filename: file,
        id: file,
        compilerOptions: { bindingMetadata: script.bindings }
      });
      assert.deepEqual(result.errors, [], file);
      assert.ok(
        descriptor.styles.every((style) => style.lang === 'scss' && style.scoped),
        file
      );
    }
    for (const match of source.matchAll(/from\s*['"](@\/[^'"]+|\.\.?\/[^'"]+)['"]/g)) {
      const target = resolveSourcePath(file, match[1], (path) => existsSync('.' + path));
      assert.ok(target, `${file} -> ${match[1]}`);
      check(target);
    }
  }
  for (const item of guide) {
    assert.ok(
      item.usage && item.api.length && item.flow.length >= 3 && item.tips.length >= 2,
      item.id
    );
    check(`/src/components/common-examples/${item.file}.vue`);
  }
  assert.ok(visited.has('/src/components/common/BaseField.vue'));
  assert.ok(visited.has('/src/components/common/BaseBadge.vue'));
  assert.ok(visited.has('/src/components/common/BaseModal.vue'));
});
