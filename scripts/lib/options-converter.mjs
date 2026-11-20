import { parse as parseSfc } from '@vue/compiler-sfc';
import { baseParse } from '@vue/compiler-dom';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import generateModule from '@babel/generator';
import * as t from '@babel/types';
const traverse = traverseModule.default;
const generate = generateModule.default;
const print = (node) => generate(node, { comments: true }).code;
const member = (...parts) =>
  parts.reduce((a, b) => t.memberExpression(a, t.identifier(b)), t.thisExpression());
const calleeName = (node) =>
  t.isCallExpression(node) && t.isIdentifier(node.callee) ? node.callee.name : '';
const clone = (node) => t.cloneNode(node, true);
const functionBody = (node) =>
  t.isBlockStatement(node.body) ? node.body : t.blockStatement([t.returnStatement(node.body)]);
function method(name, fn) {
  return t.objectMethod(
    'method',
    t.identifier(name),
    fn.params || [],
    functionBody(fn),
    false,
    false,
    fn.async || false
  );
}
function templateExpressions(template, rewrite) {
  const edits = [];
  function visit(node) {
    if (node.type === 5) edits.push(node.content);
    if (node.type === 1)
      for (const prop of node.props) if (prop.type === 7 && prop.exp) edits.push(prop.exp);
    for (const child of node.children || []) visit(child);
  }
  visit(baseParse(template));
  for (const exp of edits.sort((a, b) => b.loc.start.offset - a.loc.start.offset))
    template =
      template.slice(0, exp.loc.start.offset) +
      rewrite(exp.content) +
      template.slice(exp.loc.end.offset);
  return template;
}
// Compile-time generation only. Unknown syntax fails the build instead of showing mislabeled code.
export function convertOptions(source, filename) {
  const { descriptor } = parseSfc(source, { filename });
  if (!descriptor.scriptSetup) return source;
  let script = descriptor.scriptSetup.content;
  // A factory returning writable computed refs becomes explicit Options computed getters/setters.
  if (filename.endsWith('/tools/bem-generator.vue')) {
    script = script.replace(/function outputField\(key\) \{[\s\S]*?\n\}\n/, '');
    script = script.replace(
      /outputField\('([^']+)'\)/g,
      (_, key) =>
        `computed({ get: () => modeOutputs.value[mode.value]['${key}'], set: (value) => { modeOutputs.value[mode.value]['${key}'] = value; } })`
    );
  }
  // This derived-only watchEffect is more directly expressed as an Options computed property.
  if (filename.endsWith('/vue-syntax/reactivity.vue')) {
    script = script.replace(
      "const summary = ref('');",
      'const summary = computed(() => `현재 주문 금액: ${total.value.toLocaleString()}원`);'
    );
    script = script.replace(/watchEffect\(\(\) => \{[\s\S]*?\n\}\);/, '');
  }
  // Options lifecycle/watch equivalent of the shared nested scroll-lock composable.
  if (script.includes('usePublishingScrollLock(open)')) {
    script = script.replace('{ usePublishingScrollLock }', '{ createScrollLockManager }');
    script = `import { watch, onUnmounted } from 'vue';\n` + script;
    script = script.replace(
      'usePublishingScrollLock(open);',
      `const scrollLock = createScrollLockManager(document, window);\nlet releaseOpen;\nwatch(open, (value) => { if (value) releaseOpen = scrollLock.acquire(); else { releaseOpen?.(); releaseOpen = undefined; } });`
    );
    script = script.replace(
      'usePublishingScrollLock(nested);',
      `let releaseNested;\nwatch(nested, (value) => { if (value) releaseNested = scrollLock.acquire(); else { releaseNested?.(); releaseNested = undefined; } });\nonUnmounted(() => { releaseOpen?.(); releaseNested?.(); });`
    );
  }
  const ast = parse(script, { sourceType: 'module' });
  let program;
  traverse(ast, {
    Program(path) {
      program = path;
      path.stop();
    }
  });
  const bindings = new Map();
  const refNames = new Set(
    [...descriptor.template.content.matchAll(/\bref="([A-Za-z_$][\w$]*)"/g)].map((m) => m[1])
  );
  const propsDecls = [],
    emitDecls = [],
    optionDecls = [],
    exposeDecls = [];
  const imports = [],
    moduleDeclarations = [],
    bridgeDeclarations = [],
    dataDeclarations = [],
    functions = [],
    effects = [];
  const componentNames = new Set();
  const importData = new Set();
  const topDataNodes = new Set();
  function addBinding(id, kind, extras = {}) {
    bindings.set(id, { kind, binding: program.scope.getBinding(id), ...extras });
  }
  function macro(call) {
    const name = calleeName(call);
    if (name === 'defineProps') {
      propsDecls.push(call.arguments[0]);
      return true;
    }
    if (name === 'defineEmits') {
      emitDecls.push(call.arguments[0]);
      return true;
    }
    if (name === 'defineOptions') {
      optionDecls.push(call.arguments[0]);
      return true;
    }
    if (name === 'defineExpose') {
      exposeDecls.push(call.arguments[0]);
      return true;
    }
    return false;
  }
  for (const node of ast.program.body) {
    if (t.isImportDeclaration(node)) {
      imports.push(node);
      for (const specifier of node.specifiers) {
        const name = specifier.local.name;
        if (node.source.value === 'vue') continue;
        const kebab = name.replace(/[A-Z]/g, (m, i) => (i ? '-' : '') + m.toLowerCase());
        if (new RegExp(`<\\/?(?:${name}|${kebab})(?:\\s|/?>)`).test(descriptor.template.content))
          componentNames.add(name);
        else if (new RegExp(`\\b${name}\\b`).test(descriptor.template.content))
          importData.add(name);
      }
    } else if (t.isVariableDeclaration(node)) {
      for (const decl of node.declarations) {
        const name = t.isIdentifier(decl.id) ? decl.id.name : '';
        const call = calleeName(decl.init);
        if (macro(decl.init)) {
          if (name) addBinding(name, call === 'defineProps' ? 'props' : 'emit');
        } else if (call === 'defineModel') {
          const modelName = t.isStringLiteral(decl.init.arguments[0])
            ? decl.init.arguments[0].value
            : 'modelValue';
          const config = t.isStringLiteral(decl.init.arguments[0])
            ? decl.init.arguments[1]
            : decl.init.arguments[0];
          addBinding(name, 'model', { modelName, config });
        } else if (call === 'useRoute' || call === 'useRouter') {
          addBinding(name, call === 'useRoute' ? 'route' : 'router');
        } else if (call.startsWith('use')) {
          bridgeDeclarations.push(t.variableDeclaration(node.kind, [decl]));
          for (const id of Object.keys(t.getBindingIdentifiers(decl.id))) addBinding(id, 'bridge');
        } else if (call === 'defineAsyncComponent') {
          moduleDeclarations.push(t.variableDeclaration(node.kind, [decl]));
          componentNames.add(name);
        } else if (t.isFunctionExpression(decl.init) || t.isArrowFunctionExpression(decl.init)) {
          addBinding(name, 'method');
          functions.push({ name, fn: decl.init });
        } else if (call === 'computed') {
          addBinding(name, 'computed');
          functions.push({ name, computed: decl.init.arguments[0] });
        } else {
          if (!name) throw Error(`Unsupported data destructuring in ${filename}`);
          const isRef = call === 'ref';
          addBinding(name, isRef && refNames.has(name) ? 'templateRef' : 'data', {
            ref: isRef,
            reactive: call === 'reactive'
          });
          if (!(isRef && refNames.has(name))) {
            if (isRef || call === 'reactive')
              decl.init = decl.init.arguments[0] || t.identifier('undefined');
            const declaration = t.variableDeclaration(node.kind, [decl]);
            dataDeclarations.push(declaration);
            topDataNodes.add(decl);
          }
        }
      }
    } else if (t.isFunctionDeclaration(node)) {
      addBinding(node.id.name, 'method');
      functions.push({ name: node.id.name, fn: node });
    } else if (t.isExpressionStatement(node) && macro(node.expression)) {
      // Component options are emitted below.
    } else if (t.isTryStatement(node)) {
      dataDeclarations.push(node);
      topDataNodes.add(node);
    } else if (t.isExpressionStatement(node)) effects.push(node.expression);
    else throw Error(`Unsupported statement ${node.type} in ${filename}`);
  }
  function replacement(name, dataContext = false) {
    const info = bindings.get(name);
    if (info.kind === 'props') return member('$props');
    if (info.kind === 'emit') return member('$emit');
    if (info.kind === 'route') return member('$route');
    if (info.kind === 'router') return member('$router');
    if (info.kind === 'templateRef') return member('$refs', name);
    if (dataContext && info.kind === 'data') return t.identifier(name);
    return member(name);
  }
  const isDataContext = (path) => !!path.findParent((p) => topDataNodes.has(p.node));
  const inBridge = (path) =>
    !!path.findParent((p) => bridgeDeclarations.some((d) => d.declarations.includes(p.node)));
  // Resolve Babel lexical bindings, so a callback parameter named `item` never becomes `this.item`.
  traverse(ast, {
    MemberExpression: {
      exit(path) {
        const node = path.node;
        if (
          !t.isIdentifier(node.object) ||
          node.computed ||
          !t.isIdentifier(node.property, { name: 'value' })
        )
          return;
        const info = bindings.get(node.object.name);
        if (!info || path.scope.getBinding(node.object.name) !== info.binding || inBridge(path))
          return;
        if (info.ref || ['computed', 'model', 'templateRef', 'bridge'].includes(info.kind)) {
          path.replaceWith(replacement(node.object.name, isDataContext(path)));
          path.skip();
        }
      }
    },
    Identifier(path) {
      const name = path.node.name,
        info = bindings.get(name);
      if (!info || path.scope.getBinding(name) !== info.binding || inBridge(path)) return;
      const parent = path.parentPath;
      // A ref's .value is handled as one expression before rewriting the identifier.
      if (
        parent.isMemberExpression() &&
        parent.node.object === path.node &&
        !parent.node.computed &&
        t.isIdentifier(parent.node.property, { name: 'value' }) &&
        (info.ref || ['computed', 'model', 'templateRef', 'bridge'].includes(info.kind))
      )
        return;
      const assignment =
        (parent.isAssignmentExpression() && parent.node.left === path.node) ||
        (parent.isUpdateExpression() && parent.node.argument === path.node);
      if (!path.isReferencedIdentifier() && !assignment) return;
      // data() declares local initializers in their original order.
      if (isDataContext(path) && info.kind === 'data') return;
      path.replaceWith(replacement(name, isDataContext(path)));
      path.skip();
    }
  });
  const options = [];
  options.push(
    t.objectProperty(
      t.identifier('name'),
      t.stringLiteral(
        filename
          .split('/')
          .pop()
          .replace('.vue', '')
          .replace(/(^|[-_])([a-z])/g, (_, _dash, letter) => letter.toUpperCase())
      )
    )
  );
  for (const option of optionDecls) options.push(...option.properties);
  if (componentNames.size)
    options.push(
      t.objectProperty(
        t.identifier('components'),
        t.objectExpression(
          [...componentNames].map((name) =>
            t.objectProperty(t.identifier(name), t.identifier(name), false, true)
          )
        )
      )
    );
  const props = propsDecls.flatMap((p) => p?.properties || []);
  const models = [...bindings].filter(([, v]) => v.kind === 'model');
  for (const [, model] of models)
    props.push(
      t.objectProperty(t.identifier(model.modelName), model.config || t.objectExpression([]))
    );
  if (props.length)
    options.push(t.objectProperty(t.identifier('props'), t.objectExpression(props)));
  if (emitDecls.length || models.length) {
    const definitions = emitDecls.flatMap((d) =>
      t.isArrayExpression(d)
        ? d.elements.map((e) => t.objectProperty(e, t.nullLiteral()))
        : d.properties
    );
    for (const [, model] of models)
      definitions.push(
        t.objectProperty(t.stringLiteral('update:' + model.modelName), t.nullLiteral())
      );
    options.push(t.objectProperty(t.identifier('emits'), t.objectExpression(definitions)));
  }
  if (bridgeDeclarations.length) {
    const names = [...bindings].filter(([, v]) => v.kind === 'bridge').map(([name]) => name);
    const setup = t.objectMethod(
      'method',
      t.identifier('setup'),
      [],
      t.blockStatement([
        ...bridgeDeclarations,
        t.returnStatement(
          t.objectExpression(
            names.map((name) =>
              t.objectProperty(t.identifier(name), t.identifier(name), false, true)
            )
          )
        )
      ])
    );
    setup.leadingComments = [
      {
        type: 'CommentLine',
        value:
          ' 공유 Composable과 useId만 setup에서 연결합니다. 화면 상태·계산·이벤트는 아래 Options API를 사용합니다.'
      }
    ];
    options.push(setup);
  }
  const dataNames = [...bindings].filter(([, v]) => v.kind === 'data').map(([name]) => name);
  if (dataDeclarations.length || importData.size)
    options.push(
      t.objectMethod(
        'method',
        t.identifier('data'),
        [],
        t.blockStatement([
          ...dataDeclarations,
          t.returnStatement(
            t.objectExpression(
              [...dataNames, ...importData].map((name) =>
                t.objectProperty(t.identifier(name), t.identifier(name), false, true)
              )
            )
          )
        ])
      )
    );
  const computed = [],
    methods = [];
  for (const fn of functions) {
    if (fn.computed) {
      if (t.isObjectExpression(fn.computed))
        computed.push(
          t.objectProperty(
            t.identifier(fn.name),
            t.objectExpression(
              fn.computed.properties.map((p) =>
                t.isObjectMethod(p) ? p : method(p.key.name, p.value)
              )
            )
          )
        );
      else computed.push(method(fn.name, fn.computed));
    } else methods.push(method(fn.name, fn.fn));
  }
  for (const [name, model] of models)
    computed.push(
      t.objectProperty(
        t.identifier(name),
        t.objectExpression([
          t.objectMethod(
            'method',
            t.identifier('get'),
            [],
            t.blockStatement([t.returnStatement(member(model.modelName))])
          ),
          t.objectMethod(
            'method',
            t.identifier('set'),
            [t.identifier('value')],
            t.blockStatement([
              t.expressionStatement(
                t.callExpression(member('$emit'), [
                  t.stringLiteral('update:' + model.modelName),
                  t.identifier('value')
                ])
              )
            ])
          )
        ])
      )
    );
  for (const expose of exposeDecls) {
    const names = [];
    for (const prop of expose.properties) {
      names.push(t.stringLiteral(prop.key.name));
      if (t.isArrowFunctionExpression(prop.value) || t.isFunctionExpression(prop.value))
        methods.push(method(prop.key.name, prop.value));
    }
    options.push(t.objectProperty(t.identifier('expose'), t.arrayExpression(names)));
  }
  if (computed.length)
    options.push(t.objectProperty(t.identifier('computed'), t.objectExpression(computed)));
  if (methods.length)
    options.push(t.objectProperty(t.identifier('methods'), t.objectExpression(methods)));
  const watches = [],
    created = [],
    hooks = new Map();
  for (const effect of effects) {
    const call = calleeName(effect);
    if (call === 'watch') {
      const [src, callback, config] = effect.arguments;
      if (t.isMemberExpression(src) && t.isThisExpression(src.object)) {
        const name = src.property.name;
        const handler =
          t.isIdentifier(callback) || t.isMemberExpression(callback)
            ? t.functionExpression(
                null,
                [t.identifier('value'), t.identifier('oldValue'), t.identifier('onCleanup')],
                t.blockStatement([
                  t.returnStatement(
                    t.callExpression(callback, [
                      t.identifier('value'),
                      t.identifier('oldValue'),
                      t.identifier('onCleanup')
                    ])
                  )
                ])
              )
            : callback;
        const entry = t.objectExpression([
          method('handler', handler),
          ...(config?.properties || [])
        ]);
        watches.push(t.objectProperty(t.stringLiteral(name), entry));
      } else {
        const getter = t.isArrayExpression(src)
          ? t.arrowFunctionExpression(
              [],
              t.arrayExpression(
                src.elements.map((e) =>
                  t.isArrowFunctionExpression(e) || t.isFunctionExpression(e)
                    ? t.callExpression(e, [])
                    : e
                )
              )
            )
          : t.isArrowFunctionExpression(src) || t.isFunctionExpression(src)
            ? src
            : t.arrowFunctionExpression([], src);
        created.push(
          t.expressionStatement(
            t.callExpression(member('$watch'), [getter, callback, ...(config ? [config] : [])])
          )
        );
      }
    } else if (['onMounted', 'onUnmounted', 'onBeforeUnmount', 'onBeforeMount'].includes(call)) {
      const name = {
        onMounted: 'mounted',
        onUnmounted: 'unmounted',
        onBeforeUnmount: 'beforeUnmount',
        onBeforeMount: 'beforeMount'
      }[call];
      const fn = effect.arguments[0];
      const body =
        t.isArrowFunctionExpression(fn) || t.isFunctionExpression(fn)
          ? functionBody(fn).body
          : [t.expressionStatement(t.callExpression(fn, []))];
      hooks.set(name, [...(hooks.get(name) || []), ...body]);
    } else throw Error(`Unsupported effect ${call || print(effect)} in ${filename}`);
  }
  if (watches.length)
    options.push(t.objectProperty(t.identifier('watch'), t.objectExpression(watches)));
  if (created.length)
    options.push(t.objectMethod('method', t.identifier('created'), [], t.blockStatement(created)));
  for (const [name, body] of hooks)
    options.push(t.objectMethod('method', t.identifier(name), [], t.blockStatement(body)));
  // Remove Composition-only imports. Utilities and shared Composables remain explicit dependencies.
  const removed = new Set([
    'ref',
    'reactive',
    'computed',
    'watch',
    'watchEffect',
    'onMounted',
    'onUnmounted',
    'onBeforeUnmount',
    'onBeforeMount',
    'useRoute',
    'useRouter'
  ]);
  for (const node of imports)
    node.specifiers = node.specifiers.filter(
      (s) => !(t.isImportSpecifier(s) && removed.has(s.imported.name))
    );
  const outputAst = t.file(
    t.program([
      ...imports.filter((n) => n.specifiers.length),
      ...moduleDeclarations,
      t.exportDefaultDeclaration(t.objectExpression(options))
    ])
  );
  let template = templateExpressions(descriptor.template.content, (expr) => {
    for (const [name, info] of bindings) {
      if (info.kind === 'props') expr = expr.replace(new RegExp(`\\b${name}\\.`, 'g'), '$props.');
      if (info.kind === 'emit') expr = expr.replace(new RegExp(`\\b${name}\\(`, 'g'), '$emit(');
      if (info.kind === 'templateRef')
        expr = expr.replace(new RegExp(`(?<![\\w$.])${name}\\b`, 'g'), `$refs.${name}`);
      if (info.kind === 'route' || info.kind === 'router')
        expr = expr.replace(
          new RegExp(`\\b${name}\\.`, 'g'),
          info.kind === 'route' ? '$route.' : '$router.'
        );
    }
    return expr;
  });
  // Preserve original template/static assets/scoped SCSS verbatim except instance-expression equivalents.
  const scriptStart = source.lastIndexOf('<script', descriptor.scriptSetup.loc.start.offset);
  const scriptEnd = source.indexOf('</script>', descriptor.scriptSetup.loc.end.offset) + 9;
  const templateStart = source.indexOf('<template>') + 10;
  const templateEnd = source.lastIndexOf('</template>');
  let result =
    source.slice(0, scriptStart) +
    '<script>\n// Options API: data · computed · methods · watch · lifecycle\n' +
    print(outputAst) +
    '\n</script>' +
    source.slice(scriptEnd);
  const resultTemplateStart = result.indexOf('<template>', result.indexOf('</script>') + 9) + 10;
  const resultTemplateEnd = result.lastIndexOf('</template>');
  result = result.slice(0, resultTemplateStart) + template + result.slice(resultTemplateEnd);
  return result;
}
