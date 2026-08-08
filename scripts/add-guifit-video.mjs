#!/usr/bin/env node
/**
 * Copia um vídeo para assets/videos/guifit/{exerciseId}.mp4 e atualiza o mapa.
 *
 * Uso:
 *   node scripts/add-guifit-video.mjs e-lib-peito-supino-reto-com-barra ./novo-video.mp4
 *   node scripts/add-guifit-video.mjs e-lib-peito-supino-reto-com-barra ./pasta/staging/
 *     (usa o primeiro .mp4 da pasta se não for arquivo)
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const GUIFIT_DIR = path.join(ROOT, 'assets/videos/guifit');

const [exerciseId, sourceArg] = process.argv.slice(2);

if (!exerciseId?.startsWith('e-lib-') || !sourceArg) {
  console.error('Uso: node scripts/add-guifit-video.mjs <exercise-id> <arquivo.mp4 ou pasta>');
  process.exit(1);
}

let source = path.resolve(sourceArg);
if (fs.existsSync(source) && fs.statSync(source).isDirectory()) {
  const mp4 = fs.readdirSync(source).find((f) => f.toLowerCase().endsWith('.mp4'));
  if (!mp4) {
    console.error('Nenhum .mp4 na pasta:', source);
    process.exit(1);
  }
  source = path.join(source, mp4);
}

if (!fs.existsSync(source) || !source.toLowerCase().endsWith('.mp4')) {
  console.error('Arquivo não encontrado:', source);
  process.exit(1);
}

fs.mkdirSync(GUIFIT_DIR, { recursive: true });
const dest = path.join(GUIFIT_DIR, `${exerciseId}.mp4`);
fs.copyFileSync(source, dest);
console.log(`Copiado → assets/videos/guifit/${exerciseId}.mp4`);

spawnSync('node', ['scripts/sync-guifit-videos.mjs'], { cwd: ROOT, stdio: 'inherit' });
