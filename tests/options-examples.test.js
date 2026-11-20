import { dom } from './helpers/options-dom.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc';
import { sourceIdentity } from '../src/data/codeSnippets/sourceIdentity.js';
import { convertOptions } from '../scripts/lib/options-converter.mjs';
import { createServer } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
const catalog = JSON.parse(readFileSync('src/data/optionsSources.json', 'utf8'));
const files = (folder) =>
  readdirSync(folder, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? files(folder + '/' + e.name)
      : e.name.endsWith('.vue')
        ? [folder + '/' + e.name]
        : []
  );
test('Every live Vue source has a matching complete Options example with compilable script, template and unchanged SCSS', () => {
  const paths = files('src');
  assert.equal(Object.keys(catalog).length, paths.length);
  for (const file of paths) {
    const original = readFileSync(file, 'utf8'),
      entry = catalog[sourceIdentity(original)];
    assert.ok(entry, file);
    const { descriptor, errors } = parse(entry.code, { filename: file });
    assert.deepEqual(errors, [], file);
    assert.ok(descriptor.script && !descriptor.scriptSetup, file);
    compileScript(descriptor, { id: file });
    assert.deepEqual(
      compileTemplate({ source: descriptor.template.content, filename: file, id: file }).errors,
      [],
      file
    );
    const originalDescriptor = parse(original).descriptor;
    assert.deepEqual(
      descriptor.styles.map((s) => s.content.trim()),
      originalDescriptor.styles.map((s) => s.content.trim()),
      file
    );
  }
});
// Load and execute the generated SFCs and their generated child components with Vue itself.
// jsdom is a unit-test DOM; no browser automation or provider API calls are used.
const Vue = await import('vue');
const { createRouter, createMemoryHistory } = await import('vue-router');
globalThis.IntersectionObserver = class {
  observe() {}
  disconnect() {}
  unobserve() {}
};
HTMLElement.prototype.scrollIntoView = function () {};
let server;
async function load(file) {
  server ||= await createServer({
    configFile: false,
    envFile: false,
    root: process.cwd(),
    logLevel: 'silent',
    plugins: [
      {
        name: 'execute-options-examples',
        enforce: 'pre',
        transform(code, id) {
          const file = id.split('?')[0];
          if (file.endsWith('.vue') && !id.includes('?')) return convertOptions(code, file);
        }
      },
      vuePlugin()
    ],
    resolve: { alias: { '@': resolve('src') } },
    server: { middlewareMode: true, hmr: false, watch: { ignored: ['**/*'] } }
  });
  const component = (await server.ssrLoadModule('/' + file)).default;
  const visited = new Set();
  function attach(c) {
    if (!c || visited.has(c)) return;
    visited.add(c);
    if (c.__file?.endsWith('.vue')) {
      const entry = catalog[sourceIdentity(readFileSync(c.__file, 'utf8'))];
      c.render = Vue.compile(parse(entry.code).descriptor.template.content);
    }
    for (const child of Object.values(c.components || {})) attach(child);
  }
  attach(component);
  return component;
}
async function mount(file, props = {}) {
  const host = document.createElement('div');
  document.body.append(host);
  const app = Vue.createApp(await load(file), props);
  app.provide(Vue.ssrContextKey, { modules: new Set() });
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }]
  });
  app.use(router);
  await router.isReady();
  const errors = [];
  app.config.errorHandler = (e) => errors.push(e);
  app.config.warnHandler = (message) => errors.push(message);
  const vm = app.mount(host);
  await Vue.nextTick();
  return {
    vm,
    host,
    errors,
    close() {
      app.unmount();
      host.remove();
      assert.deepEqual(errors, [], file);
    }
  };
}
test('Options examples preserve data/computed methods, per-instance state and watcher transitions', async () => {
  const a = await mount('src/views/vue-syntax/reactivity.vue');
  assert.equal(a.vm.total, 33000);
  a.vm.quantity = 3;
  await Vue.nextTick();
  assert.equal(a.vm.total, 48000);
  assert.match(a.vm.summary, /48,000/);
  assert.match(a.vm.history[0], /2 → 3/);
  a.vm.product.options.shipping = 0;
  await Vue.nextTick();
  assert.equal(a.vm.total, 45000);
  a.close();
  const first = await mount('src/components/practice/ui-tabs.vue'),
    second = await mount('src/components/practice/ui-tabs.vue');
  first.vm.selected = 'price';
  await Vue.nextTick();
  assert.match(first.host.textContent, /기본 요금/);
  assert.equal(second.vm.selected, 'intro');
  first.close();
  second.close();
});
test('Options v-model child uses props, computed setter and update events; props update reactively', async () => {
  let updated;
  const field = await mount('src/components/common/BaseField.vue', {
    label: '이메일',
    modelValue: 'before',
    'onUpdate:modelValue': (value) => (updated = value)
  });
  assert.equal(field.host.querySelector('input').value, 'before');
  field.vm.value = 'after';
  assert.equal(updated, 'after');
  assert.ok(field.host.querySelector('label').htmlFor);
  field.close();
  const avatar = await mount('src/components/common/BaseAvatar.vue', {
    name: 'Park Jise',
    src: 'x.svg'
  });
  avatar.vm.failed = true;
  avatar.vm.$.props.src = 'y.svg';
  await Vue.nextTick();
  assert.equal(avatar.vm.failed, false);
  assert.equal(avatar.vm.initials, 'PJ');
  avatar.close();
});
test('Options template refs, native modal lifecycle, cleanup and nested scroll locks execute', async () => {
  // jsdom does not implement native dialog methods; supply the platform contract.
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  dom.window.HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  };
  const modal = await mount('src/components/common/BaseModal.vue', { modelValue: false });
  modal.vm.$.props.modelValue = true;
  await Vue.nextTick();
  await Vue.nextTick();
  assert.equal(modal.host.querySelector('dialog').open, true);
  modal.vm.$.props.modelValue = false;
  await Vue.nextTick();
  await Vue.nextTick();
  assert.equal(modal.host.querySelector('dialog').open, false);
  modal.close();
  const layout = await mount('src/components/tips/LayoutDefenseDemo.vue');
  layout.vm.open = true;
  await Vue.nextTick();
  assert.equal(document.body.style.overflow, 'hidden');
  layout.vm.nested = true;
  await Vue.nextTick();
  layout.vm.nested = false;
  await Vue.nextTick();
  assert.equal(document.body.style.overflow, 'hidden');
  layout.close();
  assert.equal(document.body.style.overflow, '');
});
test('Options writable computed BEM results remain separate for each input mode', async () => {
  const bem = await mount('src/views/tools/bem-generator.vue');
  bem.vm.mode = 'buttons';
  bem.vm.result = { html: 'button result', scss: '' };
  bem.vm.mode = 'ai';
  assert.equal(bem.vm.result, null);
  bem.vm.result = { html: 'AI result', scss: '' };
  bem.vm.mode = 'buttons';
  assert.equal(bem.vm.result.html, 'button result');
  bem.close();
});
test('Options search cancels stale work and debounce timers on unmount', async () => {
  const search = await mount('src/components/tips/DataPerformanceDemo.vue');
  search.vm.query = '에러';
  await Vue.nextTick();
  search.vm.query = '디자인';
  await Vue.nextTick();
  await new Promise((r) => setTimeout(r, 550));
  assert.equal(search.vm.results.length, 11);
  assert.equal(search.vm.error, '');
  search.vm.query = '에러';
  await Vue.nextTick();
  search.close();
  await new Promise((r) => setTimeout(r, 550));
  assert.equal(search.vm.error, '');
});
test('All 40 practice answers and ordinary menu demos mount as Options components without runtime warnings', async () => {
  const ordinary = files('src/components/practice').concat(
    files('src/components/common-examples'),
    [
      'src/views/sm/portal.vue',
      'src/views/html5/semantic.vue',
      'src/views/css3/patterns.vue',
      'src/views/common-components/library.vue'
    ],
    ['vue-syntax', 'vue-patterns', 'dashboard', 'apps', 'ui-kits', 'forms-tables'].flatMap(
      (folder) => files('src/views/' + folder)
    )
  );
  for (const file of ordinary) {
    const demo = await mount(file);
    assert.ok(demo.host.childNodes.length, file);
    demo.close();
    await Vue.nextTick();
  }
});
test.after(async () => {
  await server?.close();
  dom.window.close();
});
