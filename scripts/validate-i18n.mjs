#!/usr/bin/env node
/**
 * Ensures all full locales define the same translation keys.
 * Partial locales (pt-PT, en-GB) may only override existing keys.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const translationsPath = path.join(root, 'src/i18n/translations.ts');
const localeExtrasPath = path.join(root, 'src/i18n/localeExtras.ts');
const dePath = path.join(root, 'src/i18n/locales/de.ts');
const ptPtPath = path.join(root, 'src/i18n/locales/pt-PT.ts');
const enGbPath = path.join(root, 'src/i18n/locales/en-GB.ts');
const frPath = path.join(root, 'src/i18n/locales/fr.ts');
const itPath = path.join(root, 'src/i18n/locales/it.ts');
const zhPath = path.join(root, 'src/i18n/locales/zh.ts');
const jaPath = path.join(root, 'src/i18n/locales/ja.ts');
const hiPath = path.join(root, 'src/i18n/locales/hi.ts');

function parseDictBlock(source, constName) {
  const re = new RegExp(`const ${constName}(?:: [^=]+)? = \\{([\\s\\S]*?)\\n\\};`);
  const match = source.match(re);
  if (!match) throw new Error(`Could not parse ${constName}`);
  return extractKeys(match[1]);
}

function parseExportObject(source, exportName) {
  const re = new RegExp(`export const ${exportName} = \\{([\\s\\S]*?)\\n\\};`);
  const match = source.match(re);
  if (!match) throw new Error(`Could not parse ${exportName}`);
  return extractKeys(match[1]);
}

function extractKeys(body) {
  const keys = new Set();
  const keyRe = /'([^']+)':/g;
  let m;
  while ((m = keyRe.exec(body))) keys.add(m[1]);
  return keys;
}

function parseExtras(source, exportName) {
  const re = new RegExp(`export const ${exportName}: Record<string, string> = \\{([\\s\\S]*?)\\n\\};`);
  const match = source.match(re);
  if (!match) return new Set();
  return extractKeys(match[1]);
}

const translations = fs.readFileSync(translationsPath, 'utf8');
const extras = fs.readFileSync(localeExtrasPath, 'utf8');
const deSource = fs.readFileSync(dePath, 'utf8');

const ptBR = new Set([...parseDictBlock(translations, 'ptBR'), ...parseExtras(extras, 'localeExtrasPtBR')]);
const en = new Set([...parseDictBlock(translations, 'en'), ...parseExtras(extras, 'localeExtrasEn')]);
const es = new Set([...parseDictBlock(translations, 'es'), ...parseExtras(extras, 'localeExtrasEs')]);
const de = new Set([...parseExportObject(deSource, 'de'), ...parseExtras(extras, 'localeExtrasDe')]);
const fr = new Set([...parseExportObject(fs.readFileSync(frPath, 'utf8'), 'fr')]);
const it = new Set([...parseExportObject(fs.readFileSync(itPath, 'utf8'), 'it')]);
const zh = new Set([...parseExportObject(fs.readFileSync(zhPath, 'utf8'), 'zh')]);
const ja = new Set([...parseExportObject(fs.readFileSync(jaPath, 'utf8'), 'ja')]);
const hi = new Set([...parseExportObject(fs.readFileSync(hiPath, 'utf8'), 'hi')]);

const ptPT = parseExportObject(fs.readFileSync(ptPtPath, 'utf8'), 'ptPT');
const enGB = parseExportObject(fs.readFileSync(enGbPath, 'utf8'), 'enGB');

const FULL_LOCALES = { 'pt-BR': ptBR, en, es, de, fr, it, zh, ja, hi };
const errors = [];

function diff(missing, extra, label, reference) {
  for (const key of missing) {
    if (!reference.has(key)) errors.push(`[${label}] missing key: ${key}`);
  }
  for (const key of extra) {
    if (!reference.has(key)) errors.push(`[${label}] unknown key: ${key}`);
  }
}

const reference = ptBR;
for (const [label, keys] of Object.entries(FULL_LOCALES)) {
  const missing = [...reference].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !reference.has(k));
  diff(missing, extra, label, reference);
}

for (const key of ptPT) {
  if (!ptBR.has(key)) errors.push(`[pt-PT] override key not in pt-BR: ${key}`);
}
for (const key of enGB) {
  if (!en.has(key)) errors.push(`[en-GB] override key not in en: ${key}`);
}

if (errors.length) {
  console.error('i18n validation failed:\n');
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}

console.log(`i18n OK — ${reference.size} keys across pt-BR, en, es, de, fr, it, zh, ja, hi; pt-PT=${ptPT.size} overrides; en-GB=${enGB.size} overrides`);
