#!/usr/bin/env node
/**
 * Importa vídeos GuiFit de uma pasta (flat) para assets/videos/guifit/{e-lib-id}.mp4
 *
 * Uso:
 *   node scripts/batch-import-guifit-folder.mjs "/path/to/BIBLIOTECA folder"
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const GUIFIT_DIR = path.join(ROOT, 'assets/videos/guifit');
const CATALOG = path.join(ROOT, '.tmp/guifit-catalog.csv');
const LIBRARY = path.join(ROOT, 'src/data/exerciseLibrary.ts');
const SOURCES = path.join(ROOT, 'src/data/guifitVideoSources.ts');

const sourceDir = process.argv[2];
if (!sourceDir || !fs.existsSync(sourceDir)) {
  console.error('Uso: node scripts/batch-import-guifit-folder.mjs <pasta-com-mp4>');
  process.exit(1);
}

function normalize(s) {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[—–-]/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseLibrary() {
  const text = fs.readFileSync(LIBRARY, 'utf8');
  const exercises = [];
  const idRe = /id: '(e-lib-[^']+)'/g;
  const nameRe = /name: '([^']+)'/g;
  let m;
  const ids = [];
  while ((m = idRe.exec(text))) ids.push(m[1]);
  const names = [];
  while ((m = nameRe.exec(text))) names.push(m[1]);
  // exerciseLibrary pairs id/name in same exercise blocks — scan blocks
  const blockRe = /id: '(e-lib-[^']+)'[\s\S]*?name: '([^']+)'/g;
  while ((m = blockRe.exec(text))) {
    exercises.push({ id: m[1], name: m[2] });
  }
  return exercises;
}

function parseCatalog() {
  const lines = fs.readFileSync(CATALOG, 'utf8').split('\n').slice(1);
  const byNum = new Map();
  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split(',');
    const numero = parts[0];
    const name = parts[3];
    const size = parseInt(parts[6], 10);
    if (!numero || !name) continue;
    byNum.set(numero, { name, size });
  }
  return byNum;
}

function parseLegacyNumeroMap() {
  const text = fs.readFileSync(SOURCES, 'utf8');
  const map = new Map();
  const re = /'(e-lib-[^']+)':\s*require\('\.\.\/\.\.\/assets\/videos\/guifit\/(\d+)\.mp4'\)/g;
  let m;
  while ((m = re.exec(text))) map.set(m[1], m[2]);
  return map;
}

function scanSourceFolder(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.mp4'));
  const byNumero = new Map();
  const byNormName = new Map();

  for (const fname of files) {
    const full = path.join(dir, fname);
    const stat = fs.statSync(full);
    const treinos = fname.match(/Treinos\s*\((\d+)\)/i);
    const numero = treinos?.[1];
    let label = fname.replace(/\.mp4$/i, '');
    if (treinos) label = label.replace(/Treinos\s*\(\d+\)\s*-\s*/i, '');
    const norm = normalize(label);

    const entry = { full, fname, size: stat.size, norm, numero };

    if (numero) {
      if (!byNumero.has(numero)) byNumero.set(numero, []);
      byNumero.get(numero).push(entry);
    }
    if (!byNormName.has(norm)) byNormName.set(norm, []);
    byNormName.get(norm).push(entry);
  }
  return { byNumero, byNormName, total: files.length };
}

function pickBest(candidates, hintSize) {
  if (!candidates?.length) return null;
  if (hintSize && candidates.length > 1) {
    const bySize = candidates.find((c) => c.size === hintSize);
    if (bySize) return bySize;
    const close = candidates.find((c) => Math.abs(c.size - hintSize) < 5000);
    if (close) return close;
  }
  return candidates[0];
}

function findFileForExercise(ex, catalog, legacyNum, scan) {
  const normName = normalize(ex.name);

  // 1) Legacy numero from current map
  if (legacyNum) {
    const cat = catalog.get(legacyNum);
    const fromNum = pickBest(scan.byNumero.get(legacyNum), cat?.size);
    if (fromNum) return fromNum;
  }

  // 2) Catalog: find numero where exercise name matches
  for (const [num, cat] of catalog.entries()) {
    if (normalize(cat.name) === normName) {
      const fromNum = pickBest(scan.byNumero.get(num), cat.size);
      if (fromNum) return fromNum;
    }
  }

  // 3) Filename normalized exact match
  const exact = pickBest(scan.byNormName.get(normName));
  if (exact) return exact;

  // 4) Partial name match (filename contains exercise name or vice versa)
  let best = null;
  let bestLen = 0;
  for (const [norm, candidates] of scan.byNormName.entries()) {
    if (norm.includes(normName) || normName.includes(norm)) {
      const len = Math.min(norm.length, normName.length);
      if (len > bestLen) {
        bestLen = len;
        best = candidates[0];
      }
    }
  }
  return best;
}

const exercises = parseLibrary();
const catalog = parseCatalog();
const legacy = parseLegacyNumeroMap();
const scan = scanSourceFolder(sourceDir);

fs.mkdirSync(GUIFIT_DIR, { recursive: true });

let copied = 0;
let skipped = 0;
let missing = 0;
const missingList = [];

for (const ex of exercises) {
  const dest = path.join(GUIFIT_DIR, `${ex.id}.mp4`);
  const src = findFileForExercise(ex, catalog, legacy.get(ex.id), scan);

  if (!src) {
    missing++;
    missingList.push(ex.id);
    continue;
  }

  if (fs.existsSync(dest)) {
    const destSize = fs.statSync(dest).size;
    if (destSize === src.size) {
      skipped++;
      continue;
    }
  }

  fs.copyFileSync(src.full, dest);
  copied++;
}

console.log(`Fonte: ${scan.total} arquivos em ${sourceDir}`);
console.log(`Exercícios na biblioteca: ${exercises.length}`);
console.log(`Copiados: ${copied}, já ok: ${skipped}, sem match: ${missing}`);

if (missingList.length) {
  console.log('\nSem arquivo na pasta para:');
  missingList.forEach((id) => console.log(`  - ${id}`));
}

// Remove numeric legado não referenciado após sync
spawnSync('node', ['scripts/sync-guifit-videos.mjs'], { cwd: ROOT, stdio: 'inherit' });

const synced = fs.readFileSync(SOURCES, 'utf8');
const referenced = new Set();
const reqRe = /guifit\/([^'"]+\.mp4)/g;
let rm;
while ((rm = reqRe.exec(synced))) referenced.add(rm[1]);

let removed = 0;
for (const f of fs.readdirSync(GUIFIT_DIR)) {
  if (!f.endsWith('.mp4')) continue;
  if (f.startsWith('e-lib-')) continue;
  if (!referenced.has(f)) {
    fs.unlinkSync(path.join(GUIFIT_DIR, f));
    removed++;
  }
}

if (removed) console.log(`Removidos ${removed} .mp4 numéricos órfãos`);
