#!/usr/bin/env node
/** Builds src/i18n/locales/{locale}.ts from .tmp/translations/{locale}.json */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const locale = process.argv[2];
const exportName = process.argv[3] ?? locale.replace('-', '');

if (!locale) {
  console.error('Usage: node scripts/generate-locale-ts.mjs <locale> [exportName]');
  process.exit(1);
}

const jsonPath = path.join(root, '.tmp/translations', `${locale}.json`);
const outPath = path.join(root, 'src/i18n/locales', `${locale}.ts`);
const dict = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const keys = Object.keys(dict).sort();

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const lines = [`export const ${exportName} = {`];
for (const key of keys) {
  lines.push(`  '${esc(key)}': '${esc(dict[key])}',`);
}
lines.push('};', '');

fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`Wrote ${outPath} (${keys.length} keys)`);
