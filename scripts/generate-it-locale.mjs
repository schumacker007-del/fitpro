#!/usr/bin/env node
/**
 * Generates src/i18n/locales/it.ts from the merged English dictionary.
 * Run: node scripts/generate-it-locale.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const enPath = path.join(root, 'scripts/.en-merged.json');
const outPath = path.join(root, 'src/i18n/locales/it.ts');
const itPath = path.join(root, 'scripts/.it-translations.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const it = JSON.parse(fs.readFileSync(itPath, 'utf8'));

const missing = Object.keys(en).filter((k) => !it[k]);
if (missing.length) {
  console.error('Missing IT translations:', missing.length, missing.slice(0, 5));
  process.exit(1);
}

const lines = ['export const it = {'];
for (const [k, v] of Object.entries(it)) {
  const escaped = String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  if (escaped.length > 90) {
    lines.push(`  '${k}':`);
    lines.push(`    '${escaped}',`);
  } else {
    lines.push(`  '${k}': '${escaped}',`);
  }
}
lines.push('};', '');
fs.writeFileSync(outPath, lines.join('\n'));
console.log('Wrote', outPath, 'with', Object.keys(it).length, 'keys');
