#!/usr/bin/env node
/**
 * Parse PLANILHA FEMININA docx files → JSON + generate femaleCuratedWorkouts.ts
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR =
  process.argv[2] ||
  '/Users/luizcarlosschumackerfuck/Downloads/9º FICHAS DE TREINO — FEMININO';

const DAY_MAP = {
  'SEGUNDA': 'mon',
  'TERÇA': 'tue',
  'TERCA': 'tue',
  'QUARTA': 'wed',
  'QUINTA': 'thu',
  'SEXTA': 'fri',
};

function normalize(s) {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[–—-]/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractText(docxPath) {
  const r = spawnSync('textutil', ['-stdout', '-convert', 'txt', docxPath], { encoding: 'utf8' });
  return r.stdout || '';
}

function parseExerciseLine(line) {
  const m = line.match(/^(.+?)\s*[–—-]\s*(\d+)\s*x\s*(.+)$/i);
  if (!m) return null;
  const name = m[1].trim();
  const sets = parseInt(m[2], 10);
  const reps = m[3].trim();
  return { name, sets, reps };
}

/** Docx often puts several exercises on one line separated by U+2028 or double spaces. */
function extractExercisesFromText(text) {
  const normalized = text.replace(/\u2028/g, '\n').replace(/\r/g, '');
  const results = [];
  const re =
    /([A-Za-zÀ-ÿ][^–—\n]*?)\s*[–—-]\s*(\d+)\s*x\s*([\d\s–—a-zA-Z]+?)(?=\s+[A-Za-zÀ-ÿ][^–—\n]*?\s*[–—-]\s*\d+\s*x|$)/g;
  let m;
  while ((m = re.exec(normalized))) {
    const name = m[1].trim();
    const sets = parseInt(m[2], 10);
    let reps = m[3].trim();
    reps = reps.replace(/\s+/g, ' ');
    if (name && sets > 0) results.push({ name, sets, reps });
  }
  return results;
}

function parsePlanilla(text, planNumber) {
  const days = [];
  const chunks = text.split(/(?=(?:SEGUNDA|TERÇA|TERCA|QUARTA|QUINTA|SEXTA)[\s-–—]*FEIRA)/i);
  for (const chunk of chunks) {
    const header = chunk.match(/^(SEGUNDA|TERÇA|TERCA|QUARTA|QUINTA|SEXTA)[\s-–—]*FEIRA\s*[–—-]\s*(.+)/i);
    if (!header) continue;
    const dayKey = DAY_MAP[header[1].toUpperCase().replace('Ç', 'C')];
    const dayTitle = header[2].split('\n')[0].trim();
    const exercises = [];
    const lines = chunk.split(/\n/);
    for (const raw of lines) {
      const line = raw.replace(/\u2028/g, ' ').trim();
      if (!line || line.startsWith('Parâmetros') || line.includes('séries totais')) continue;
      const fromLine = extractExercisesFromText(line);
      if (fromLine.length) {
        exercises.push(...fromLine);
        continue;
      }
      const ex = parseExerciseLine(line);
      if (ex) exercises.push(ex);
    }
    if (exercises.length) {
      days.push({ dayKey, dayTitle, exercises });
    }
  }
  return { planNumber, days };
}

function loadExerciseIndex() {
  const libPath = path.join(ROOT, 'src/data/exerciseLibrary.ts');
  const workoutsPath = path.join(ROOT, 'src/data/workouts.ts');
  const index = new Map();

  function ingest(source) {
    const re = /id: '(e-lib-[^']+|e-[^']+)'[\s\S]*?name: '([^']+)'/g;
    let m;
    while ((m = re.exec(source))) {
      const id = m[1];
      const name = m[2];
      const norm = normalize(name);
      if (!index.has(norm)) index.set(norm, { id, name });
      // also store without accents partial
    }
  }

  ingest(fs.readFileSync(libPath, 'utf8'));
  ingest(fs.readFileSync(workoutsPath, 'utf8'));

  // Manual aliases from fichas
  const aliases = {
    [normalize('Agachamento no smith')]: 'Agachamento no Smith',
    [normalize('Leg press pés médios')]: 'Leg press 45 graus',
    [normalize('Leg press pés abertos')]: 'Leg press 45 graus com variações de pés',
    [normalize('Cadeira extensora com pausa')]: 'Cadeira extensora',
    [normalize('Cadeira extensora unilateral')]: 'Cadeira extensora',
    [normalize('Hip thrust com barra')]: 'Ponte de glúteos com barra',
    [normalize('Hip thrust unilateral')]: 'Ponte de glúteos com barra',
    [normalize('Stiff com halteres')]: 'Levantamento terra romeno com halteres',
    [normalize('Supino reto com halteres')]: 'Variações de supino com halteres e barra',
    [normalize('Agachamento sumô com halteres')]: 'Agachamento sumô com halter',
    [normalize('Passada no step')]: 'Passada no step',
    [normalize('Passada búlgaro')]: 'Agachamento búlgaro',
    [normalize('Passada búlgaro com halteres')]: 'Agachamento búlgaro',
    [normalize('Glúteo 4 apoios com caneleira')]: 'Coice de glúteo na polia',
    [normalize('Panturrilha em pé')]: 'Elevação de panturrilhas em pé com halteres',
    [normalize('Panturrilha sentado')]: 'Elevação de panturrilhas sentado',
    [normalize('Panturrilha no leg press')]: 'Elevação de panturrilhas no leg press',
    [normalize('Supino reto com halteres')]: 'Supino reto com halteres',
    [normalize('Remada baixa com halter')]: 'Remada baixa com halteres',
    [normalize('Remada unilateral com halter')]: 'Remada unilateral com halter apoiado no banco',
    [normalize('Elevação lateral')]: 'Elevação lateral com halteres',
    [normalize('Desenvolvimento com halteres')]: 'Desenvolvimento de ombros sentado com halteres',
    [normalize('Crunch')]: 'Abdominal crunch',
    [normalize('Crunch no solo')]: 'Abdominal crunch',
    [normalize('Prancha')]: 'Prancha nos antebraços',
    [normalize('Prancha lateral')]: 'Prancha lateral',
    [normalize('Stiff com halteres')]: 'Stiff com halteres',
    [normalize('Stiff unilateral')]: 'Stiff unilateral com halter',
    [normalize('Hip thrust unilateral')]: 'Hip thrust unilateral',
    [normalize('Abdução de quadril na polia')]: 'Abdução de quadril na polia',
    [normalize('Elevação frontal')]: 'Elevação frontal com halteres',
    [normalize('Crucifixo invertido')]: 'Crucifixo inverso com halteres apoiado no banco',
    [normalize('Crucifixo invertido no banco inclinado')]: 'Crucifixo inverso inclinado com halteres',
    [normalize('Elevação de pernas')]: 'Elevação de pernas deitado',
    [normalize('Abdominal oblíquo no solo')]: 'Abdominal lateral no chão',
    [normalize('Agachamento sumô com halteres')]: 'Agachamento sumô com halteres',
    [normalize('Mesa flexora')]: 'Mesa flexora',
  };

  for (const [aliasNorm, canonical] of Object.entries(aliases)) {
    const canonNorm = normalize(canonical);
    const hit = index.get(canonNorm);
    if (hit) index.set(aliasNorm, hit);
  }

  return index;
}

function findExercise(name, index) {
  const norm = normalize(name);
  if (index.has(norm)) return index.get(norm);
  // fuzzy contains
  for (const [k, v] of index.entries()) {
    if (k.includes(norm) || norm.includes(k)) return v;
  }
  return null;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function restForReps(reps) {
  if (/s\b/i.test(reps)) return 30;
  return 75;
}

function repsToTier(reps) {
  return 'pro';
}

// --- main ---
const files = fs
  .readdirSync(SOURCE_DIR)
  .filter((f) => /^PLANILHA FEMININA \d+/i.test(f) && f.endsWith('.docx'))
  .sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0], 10);
    const nb = parseInt(b.match(/\d+/)[0], 10);
    return na - nb;
  })
  .slice(0, 15);

const exerciseIndex = loadExerciseIndex();
const allPlans = [];
const unmatched = new Set();

for (const fname of files) {
  const num = parseInt(fname.match(/\d+/)[0], 10);
  const text = extractText(path.join(SOURCE_DIR, fname));
  allPlans.push(parsePlanilla(text, num));
}

const outJson = path.join(ROOT, '.tmp/female-planillas-parsed.json');
fs.writeFileSync(outJson, JSON.stringify(allPlans, null, 2));

// Dedupe: hash each plan's full exercise list
function planHash(plan) {
  return JSON.stringify(plan.days);
}

const uniquePlans = [];
const seen = new Map();
for (const p of allPlans) {
  const h = planHash(p);
  if (!seen.has(h)) {
    seen.set(h, p.planNumber);
    uniquePlans.push(p);
  }
}

console.log(`Parsed ${allPlans.length} files, ${uniquePlans.length} unique weekly plans`);

// Generate workouts - use ALL 15 plan numbers even if duplicate content (user may want labels 01-15)
// Actually user sent 15 fichas - if 6-15 are duplicates, import 15 weekly programs with 5 days = 75 workouts
// If only 2-3 unique, still create 15 labels as user expects "planilha 01" etc.

const workouts = [];
const DAY_LABEL = { mon: 'Segunda', tue: 'Terça', wed: 'Quarta', thu: 'Quinta', fri: 'Sexta' };

for (const plan of allPlans) {
  const pn = String(plan.planNumber).padStart(2, '0');
  for (const day of plan.days) {
    const workoutId = `w-fem-${pn}-${day.dayKey}`;
    const title = `Feminino ${pn} — ${DAY_LABEL[day.dayKey]}: ${day.dayTitle}`;
    const exercises = [];
    for (let i = 0; i < day.exercises.length; i++) {
      const row = day.exercises[i];
      const hit = findExercise(row.name, exerciseIndex);
      if (!hit) unmatched.add(row.name);
      const exId = hit?.id ?? `e-fem-${pn}-${day.dayKey}-${i + 1}`;
      const exName = hit?.name ?? row.name;
      exercises.push({
        id: exId,
        name: exName,
        sets: row.sets,
        reps: row.reps,
        restSeconds: restForReps(row.reps),
        libraryId: hit?.id,
      });
    }
    workouts.push({
      id: workoutId,
      title,
      planNumber: plan.planNumber,
      dayKey: day.dayKey,
      dayTitle: day.dayTitle,
      exerciseCount: exercises.length,
      durationMinutes: 70,
      exercises,
    });
  }
}

console.log(`Workouts: ${workouts.length}, unmatched exercises: ${unmatched.size}`);
if (unmatched.size) {
  console.log('Unmatched:', [...unmatched].sort().join('\n  '));
}

// Read exerciseLibrary for full exercise blocks when libraryId matches e-lib
const libSource = fs.readFileSync(path.join(ROOT, 'src/data/exerciseLibrary.ts'), 'utf8');
const libBlocks = new Map();
const blockRe = /{\s*id: '(e-lib-[^']+)'[\s\S]*?commonMistakes: \[[^\]]*\],\s*}/g;
let bm;
while ((bm = blockRe.exec(libSource))) {
  libBlocks.set(bm[1], bm[0]);
}

const curatedPath = path.join(ROOT, 'src/data/femaleCuratedWorkouts.ts');
const lines = [
  "import { WorkoutPlan } from '../types';",
  '',
  '/** Planilhas femininas importadas de fichas de treino (Seg–Sex). */',
  'export const FEMALE_CURATED_WORKOUTS: WorkoutPlan[] = [',
];

for (const w of workouts) {
  lines.push('  {');
  lines.push(`    id: '${w.id}',`);
  lines.push(`    title: '${esc(w.title)}',`);
  lines.push(`    goal: 'ganhar_massa',`);
  lines.push(`    level: 'intermediario',`);
  lines.push(`    durationMinutes: ${w.durationMinutes},`);
  lines.push(`    tier: 'pro',`);
  lines.push(`    audience: 'feminino',`);
  lines.push(`    programId: 'fem-${String(w.planNumber).padStart(2, '0')}',`);
  lines.push(`    exercises: [`);
  for (const ex of w.exercises) {
    if (ex.libraryId && libBlocks.has(ex.libraryId)) {
      let block = libBlocks.get(ex.libraryId);
      block = block.replace(/sets: \d+/, `sets: ${ex.sets}`);
      block = block.replace(/reps: '[^']*'/, `reps: '${esc(ex.reps)}'`);
      block = block.replace(/restSeconds: \d+/, `restSeconds: ${ex.restSeconds}`);
      lines.push('      ' + block.replace(/\n/g, '\n      ') + ',');
    } else {
      lines.push(`      {`);
      lines.push(`        id: '${ex.id}',`);
      lines.push(`        name: '${esc(ex.name)}',`);
      lines.push(`        muscleGroup: 'Funcional',`);
      lines.push(`        primaryMuscles: ['funcional'],`);
      lines.push(`        sets: ${ex.sets},`);
      lines.push(`        reps: '${esc(ex.reps)}',`);
      lines.push(`        restSeconds: ${ex.restSeconds},`);
      lines.push(`        animation: 'squat',`);
      lines.push(`        tier: 'pro',`);
      lines.push(`        instructions: ['Execute ${esc(ex.name)} com controle.'],`);
      lines.push(`        postureTips: ['Mantenha o core ativado.'],`);
      lines.push(`        commonMistakes: ['Usar carga excessiva.'],`);
      lines.push(`      },`);
    }
  }
  lines.push('    ],');
  lines.push('  },');
}

lines.push('];', '');
fs.writeFileSync(curatedPath, lines.join('\n'), 'utf8');
console.log(`Written ${curatedPath}`);
