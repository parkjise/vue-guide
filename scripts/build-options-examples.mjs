import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc';
import { format } from 'prettier';
import { convertOptions } from './lib/options-converter.mjs';
import { sourceIdentity } from '../src/data/codeSnippets/sourceIdentity.js';
const collect = (path) =>
  readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? collect(join(path, entry.name))
      : entry.name.endsWith('.vue')
        ? [join(path, entry.name)]
        : []
  );
const examples = {};
for (const file of collect('src')) {
  const original = readFileSync(file, 'utf8');
  try {
    let code = await format(convertOptions(original, file), {
      parser: 'vue',
      singleQuote: true,
      printWidth: 92,
      trailingComma: 'none'
    });
    const originalStyles = parse(original).descriptor.styles;
    const formattedStyles = parse(code).descriptor.styles;
    for (let i = formattedStyles.length - 1; i >= 0; i--) {
      code =
        code.slice(0, formattedStyles[i].loc.start.offset) +
        originalStyles[i].content +
        code.slice(formattedStyles[i].loc.end.offset);
    }
    const { descriptor, errors } = parse(code, { filename: file });
    if (errors.length) throw Error(errors.join('\n'));
    compileScript(descriptor, { id: file });
    const rendered = compileTemplate({
      source: descriptor.template.content,
      filename: file,
      id: file
    });
    if (rendered.errors.length) throw Error(rendered.errors.join('\n'));
    if (descriptor.scriptSetup) throw Error('Options example still uses script setup');
    const hash = sourceIdentity(original);
    if (examples[hash] && examples[hash].code !== code) throw Error('Source identity collision');
    examples[hash] = { file, code };
  } catch (error) {
    throw Error(`${file}: ${error.message}`, { cause: error });
  }
}
writeFileSync('src/data/optionsSources.json', JSON.stringify(examples, null, 2) + '\n');
console.log(
  `Generated and compiled ${Object.keys(examples).length} complete Options API examples.`
);
