#!/usr/bin/env node
/**
 * Regenera guifitVideoSources.ts a partir de assets/videos/guifit/*.mp4
 *
 * Convenção nova: e-lib-peito-supino-reto-com-barra.mp4 → ID = nome sem .mp4
 * Arquivos legados (278.mp4) mantêm o mapa atual até serem removidos/substituídos.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const GUIFIT_DIR = path.join(ROOT, 'assets/videos/guifit');
const OUT_FILE = path.join(ROOT, 'src/data/guifitVideoSources.ts');

const filesOnDisk = new Set(
  fs.existsSync(GUIFIT_DIR) ? fs.readdirSync(GUIFIT_DIR).filter((f) => f.endsWith('.mp4')) : [],
);

/** exerciseId → filename */
const entries = new Map();

// 1) Arquivos com nome = ID do exercício (padrão novo)
for (const fname of filesOnDisk) {
  if (fname.startsWith('e-lib-')) {
    entries.set(fname.slice(0, -4), fname);
  }
}

// 2) Legado: preserva mapa numérico só se o arquivo ainda existe e ID não foi substituído
if (fs.existsSync(OUT_FILE)) {
  const ts = fs.readFileSync(OUT_FILE, 'utf8');
  const re = /'([^']+)':\s*require\('\.\.\/\.\.\/assets\/videos\/guifit\/([^']+)'\)/g;
  let m;
  while ((m = re.exec(ts))) {
    const id = m[1];
    const fname = m[2];
    if (entries.has(id)) continue;
    if (!filesOnDisk.has(fname)) continue;
    if (fname.startsWith('e-lib-')) continue;
    entries.set(id, fname);
  }
}

const sorted = [...entries.entries()].sort((a, b) => a[0].localeCompare(b[0]));

const lines = [
  '/** Vídeos GuiFit por ID de exercício (gerado por scripts/sync-guifit-videos.mjs). */',
  'export const GUIFIT_VIDEO_SOURCES: Record<string, number> = {',
  ...sorted.map(([id, fname]) => `  '${id}': require('../../assets/videos/guifit/${fname}'),`),
  '};',
  '',
];

fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8');
console.log(`guifitVideoSources.ts → ${sorted.length} vídeos (${filesOnDisk.size} arquivos em guifit/)`);
