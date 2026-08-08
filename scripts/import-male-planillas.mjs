#!/usr/bin/env node
/**
 * Parse PLANILHA MASCULINA docx files → JSON + generate maleCuratedWorkouts.ts
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR =
  process.argv[2] ||
  '/Users/luizcarlosschumackerfuck/Downloads/10º FICHAS DE TREINO — MASCULINO';

const DAY_MAP = {
  SEGUNDA: 'mon',
  TERÇA: 'tue',
  TERCA: 'tue',
  QUARTA: 'wed',
  QUINTA: 'thu',
  SEXTA: 'fri',
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
  const femalePath = path.join(ROOT, 'src/data/femaleCuratedWorkouts.ts');
  const powerliftingPath = path.join(ROOT, 'src/data/powerlifting.ts');
  const index = new Map();

  function ingest(source) {
    const re = /id: '(e-lib-[^']+|e-[^']+)'[\s\S]*?name: '([^']+)'/g;
    let m;
    while ((m = re.exec(source))) {
      const id = m[1];
      const name = m[2];
      const norm = normalize(name);
      if (!index.has(norm)) index.set(norm, { id, name });
    }
  }

  ingest(fs.readFileSync(libPath, 'utf8'));
  ingest(fs.readFileSync(workoutsPath, 'utf8'));
  if (fs.existsSync(femalePath)) ingest(fs.readFileSync(femalePath, 'utf8'));
  if (fs.existsSync(powerliftingPath)) ingest(fs.readFileSync(powerliftingPath, 'utf8'));

  const aliases = {
    [normalize('Supino reto com barra')]: 'Supino reto com barra',
    [normalize('Supino reto barra')]: 'Supino reto com barra',
    [normalize('Supino inclinado com halteres')]: 'Supino inclinado com halteres',
    [normalize('Supino inclinado halteres')]: 'Supino inclinado com halteres',
    [normalize('Supino inclinado com barra')]: 'Supino inclinado com halteres',
    [normalize('Supino inclinado no smith')]: 'Supino inclinado com halteres',
    [normalize('Supino declinado com halteres')]: 'Variações de supino com halteres e barra',
    [normalize('Crucifixo ou peck deck')]: 'Crucifixo na máquina peck deck',
    [normalize('Crucifixo no peck deck')]: 'Crucifixo na máquina peck deck',
    [normalize('Crucifixo no banco reto')]: 'Crucifixo reto com halteres',
    [normalize('Crucifixo no banco inclinado')]: 'Crucifixo reto com halteres',
    [normalize('Crucifixo inclinado')]: 'Crucifixo reto com halteres',
    [normalize('Crucifixo com halteres')]: 'Crucifixo reto com halteres',
    [normalize('Crossover no cabo')]: 'Crossover na polia alta',
    [normalize('Crossover no cabo alto')]: 'Crossover na polia alta',
    [normalize('Crossover no cabo baixo')]: 'Crossover na polia alta',
    [normalize('Crossover alto')]: 'Crossover na polia alta',
    [normalize('Crossover baixo')]: 'Crossover na polia alta',
    [normalize('Tríceps testa')]: 'Tríceps testa unilateral com halter',
    [normalize('Tríceps testa barra W')]: 'Tríceps testa unilateral com halter',
    [normalize('Tríceps testa com barra W')]: 'Tríceps testa unilateral com halter',
    [normalize('Tríceps corda no pulley')]: 'Tríceps com corda na polia',
    [normalize('Tríceps corda')]: 'Tríceps com corda na polia',
    [normalize('Tríceps pulley barra reta')]: 'Extensão de tríceps na polia com barra',
    [normalize('Tríceps francês')]: 'Extensão de tríceps acima da cabeça com halter',
    [normalize('Tríceps francês com halter')]: 'Extensão de tríceps acima da cabeça com halter',
    [normalize('Tríceps francês unilateral')]: 'Extensão de tríceps unilateral na polia',
    [normalize('Tríceps coice com halter')]: 'Coice de tríceps unilateral na polia',
    [normalize('Tríceps coice unilateral')]: 'Coice de tríceps unilateral na polia',
    [normalize('Tríceps banco')]: 'Mergulho no banco para tríceps',
    [normalize('Mergulho ou banco')]: 'Mergulho no banco para tríceps',
    [normalize('Kickback no cabo')]: 'Coice de tríceps na polia',
    [normalize('Puxada frente na barra ou pulley')]: 'Puxada alta aberta na frente',
    [normalize('Puxada aberta na frente')]: 'Puxada alta aberta na frente',
    [normalize('Puxada frente pegada aberta')]: 'Puxada alta aberta na frente',
    [normalize('Puxada frente pegada neutra')]: 'Puxada alta na máquina',
    [normalize('Puxada na frente pegada neutra')]: 'Puxada alta na máquina',
    [normalize('Remada curvada com barra')]: 'Remada curvada com barra',
    [normalize('Remada baixa')]: 'Remada baixa sentada na polia',
    [normalize('Remada baixa no cabo')]: 'Remada baixa sentada na polia',
    [normalize('Remada baixa neutra')]: 'Remada baixa sentada na polia',
    [normalize('Remada baixa com triangulo')]: 'Remada baixa sentada na polia',
    [normalize('Remada baixa aberta')]: 'Remada baixa na polia com variações de pegada',
    [normalize('Remada baixa com barra')]: 'Remada curvada com barra',
    [normalize('Remada unilateral no cabo')]: 'Remada unilateral com halter apoiado no banco',
    [normalize('Pulldown ou puxada aberta')]: 'Puxada alta aberta na frente',
    [normalize('Pulldown fechado')]: 'Puxada alta aberta na frente',
    [normalize('Pulldown neutro')]: 'Puxada alta na máquina',
    [normalize('Pulldown unilateral')]: 'Puxada alta unilateral na polia',
    [normalize('Pulldown com braços estendidos')]: 'Pulldown na polia alta com braços estendidos',
    [normalize('Pullover no cabo')]: 'Pulldown na polia alta com braços estendidos',
    [normalize('Pullover com halter ou cabo')]: 'Pulldown na polia alta com braços estendidos',
    [normalize('Rosca direta')]: 'Rosca direta com barra',
    [normalize('Rosca alternada')]: 'Rosca alternada com halteres',
    [normalize('Rosca martelo')]: 'Rosca martelo com halteres',
    [normalize('Rosca concentrada')]: 'Rosca concentração com halter',
    [normalize('Rosca banco inclinado')]: 'Rosca inclinada com halteres',
    [normalize('Agachamento livre')]: 'Agachamento livre com barra',
    [normalize('Agachamento frontal')]: 'Agachamento com barra e variações',
    [normalize('Agachamento no smith')]: 'Agachamento no Smith',
    [normalize('Leg press')]: 'Leg press 45 graus',
    [normalize('Leg press pés médios')]: 'Leg press 45 graus',
    [normalize('Leg press pés abertos')]: 'Leg press 45 graus com variações de pés',
    [normalize('Hack machine')]: 'Agachamento no Smith',
    [normalize('Hack squat')]: 'Agachamento no Smith',
    [normalize('Cadeira extensora')]: 'Cadeira extensora',
    [normalize('Cadeira extensora unilateral')]: 'Cadeira extensora',
    [normalize('Extensora drop set')]: 'Cadeira extensora',
    [normalize('Mesa flexora')]: 'Mesa flexora',
    [normalize('Flexora deitado')]: 'Mesa flexora',
    [normalize('Flexora sentado')]: 'Mesa flexora',
    [normalize('Flexora unilateral')]: 'Mesa flexora',
    [normalize('Posterior no cabo')]: 'Levantamento terra romeno com halteres',
    [normalize('Stiff')]: 'Levantamento terra romeno com halteres',
    [normalize('Stiff com barra')]: 'Levantamento terra com barra',
    [normalize('Stiff com halteres')]: 'Levantamento terra romeno com halteres',
    [normalize('Stiff ou levantamento terra romeno')]: 'Levantamento terra com barra',
    [normalize('Elevação pélvica')]: 'Ponte de glúteos com barra',
    [normalize('Elevação de quadril')]: 'Ponte de glúteos com barra',
    [normalize('Afundo')]: 'Afundo andando com halteres',
    [normalize('Afundo no lugar')]: 'Afundo andando',
    [normalize('Passada no lugar')]: 'Afundo andando',
    [normalize('Passada andando')]: 'Afundo andando com halteres',
    [normalize('Passada com halteres')]: 'Afundo andando com halteres',
    [normalize('Passada no smith')]: 'Agachamento no Smith',
    [normalize('Passada no smith ou halteres')]: 'Afundo andando com halteres',
    [normalize('Passada no step')]: 'Afundo andando com halteres',
    [normalize('Passada búlgaro')]: 'Agachamento búlgaro',
    [normalize('Panturrilha em pé')]: 'Elevação de panturrilhas em pé com halteres',
    [normalize('Panturrilha sentado')]: 'Elevação de panturrilhas em pé',
    [normalize('Panturrilha no leg press')]: 'Elevação de panturrilhas em pé com halteres',
    [normalize('Desenvolvimento com halteres ou barra')]: 'Desenvolvimento de ombros sentado com halteres',
    [normalize('Desenvolvimento com barra')]: 'Desenvolvimento militar com barra',
    [normalize('Desenvolvimento halteres')]: 'Desenvolvimento de ombros sentado com halteres',
    [normalize('Desenvolvimento no smith')]: 'Desenvolvimento militar com barra',
    [normalize('Desenvolvimento com halteres')]: 'Desenvolvimento de ombros sentado com halteres',
    [normalize('Elevação lateral')]: 'Elevação lateral com halteres',
    [normalize('Elevação frontal')]: 'Elevação frontal com barra',
    [normalize('Elevação frontal com halteres')]: 'Elevação frontal com barra',
    [normalize('Elevação frontal halteres')]: 'Elevação frontal com barra',
    [normalize('Elevação frontal com anilha')]: 'Elevação frontal com barra',
    [normalize('Elevação lateral inclinada ou posterior')]: 'Crucifixo inverso com halteres apoiado no banco',
    [normalize('Crunch no solo ou máquina')]: 'Abdominal crunch',
    [normalize('Crunch')]: 'Abdominal crunch',
    [normalize('Crunch no solo')]: 'Abdominal crunch',
    [normalize('Abdominal canivete')]: 'Elevação de pernas deitado',
    [normalize('Abdominal infra')]: 'Elevação de pernas deitado',
    [normalize('Infra no banco')]: 'Elevação de pernas deitado',
    [normalize('Infra suspenso')]: 'Elevação de pernas deitado',
    [normalize('Elevação de pernas')]: 'Elevação de pernas deitado',
    [normalize('Prancha')]: 'Prancha nos antebraços',
    [normalize('Abdominal oblíquo')]: 'Abdominal lateral no chão',
    [normalize('Abdominal oblíquo no solo')]: 'Abdominal lateral no chão',
    [normalize('Cadeira abdutora')]: 'Abdução de quadril na polia',
    [normalize('Abdutora')]: 'Abdução de quadril na polia',
    [normalize('Good morning')]: 'Extensão lombar no banco romano',
    [normalize('Remada unilateral com halter')]: 'Remada unilateral com halter apoiado no banco',
    [normalize('Remada cavalinho')]: 'Remada cavalinho com barra T',
    [normalize('Barra fixa')]: 'Barra fixa pronada',
    [normalize('Face pull')]: 'Face pull na polia',
    [normalize('Crucifixo invertido')]: 'Crucifixo inverso com halteres apoiado no banco',
    [normalize('Hip thrust com barra')]: 'Ponte de glúteos com barra',
    [normalize('Glúteo na polia')]: 'Coice de glúteo na polia',
    [normalize('Glúteo 4 apoios com caneleira')]: 'Coice de glúteo na polia',
    [normalize('Levantamento terra')]: 'Levantamento terra com barra',
    [normalize('Levantamento terra sumô')]: 'Levantamento terra sumô com kettlebell',
    [normalize('Supino reto com halteres')]: 'Variações de supino com halteres e barra',
    [normalize('Remada baixa com halter')]: 'Remada curvada com halteres',
    [normalize('Rosca scott')]: 'Rosca Scott com barra W',
    [normalize('Desenvolvimento militar')]: 'Desenvolvimento militar com barra',
    [normalize('Encolhimento com halteres')]: 'Encolhimento de ombros com barra',
    [normalize('Stiff unilateral')]: 'Levantamento terra romeno com halteres',
    [normalize('Prancha lateral')]: 'Prancha nos antebraços',
    [normalize('Prancha com toque no ombro')]: 'Prancha nos antebraços',
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

// --- main ---
const files = fs
  .readdirSync(SOURCE_DIR)
  .filter((f) => /^PLANILHA \d+/i.test(f) && f.endsWith('.docx'))
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

const outJson = path.join(ROOT, '.tmp/male-planillas-parsed.json');
fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, JSON.stringify(allPlans, null, 2));

function planHash(plan) {
  return JSON.stringify(plan.days);
}

const uniquePlans = [];
const seen = new Map();
const duplicateGroups = [];
for (const p of allPlans) {
  const h = planHash(p);
  if (!seen.has(h)) {
    seen.set(h, [p.planNumber]);
    uniquePlans.push(p);
  } else {
    seen.get(h).push(p.planNumber);
  }
}

for (const [hash, planNumbers] of seen.entries()) {
  if (planNumbers.length > 1) {
    duplicateGroups.push({ planNumbers: planNumbers.sort((a, b) => a - b), hash });
  }
}

console.log(`Parsed ${allPlans.length} files, ${uniquePlans.length} unique weekly plans`);
if (duplicateGroups.length) {
  console.log('Duplicate content groups:');
  for (const g of duplicateGroups) {
    console.log(`  Planilhas ${g.planNumbers.join(', ')} are identical`);
  }
}

const workouts = [];
const DAY_LABEL = { mon: 'Segunda', tue: 'Terça', wed: 'Quarta', thu: 'Quinta', fri: 'Sexta' };

for (const plan of allPlans) {
  const pn = String(plan.planNumber).padStart(2, '0');
  for (const day of plan.days) {
    const workoutId = `w-masc-${pn}-${day.dayKey}`;
    const title = `Masculino ${pn} — ${DAY_LABEL[day.dayKey]}: ${day.dayTitle}`;
    const exercises = [];
    for (let i = 0; i < day.exercises.length; i++) {
      const row = day.exercises[i];
      const hit = findExercise(row.name, exerciseIndex);
      if (!hit) unmatched.add(row.name);
      const exId = hit?.id ?? `e-masc-${pn}-${day.dayKey}-${i + 1}`;
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

const libSource = fs.readFileSync(path.join(ROOT, 'src/data/exerciseLibrary.ts'), 'utf8');
const libBlocks = new Map();
const blockRe = /{\s*id: '(e-lib-[^']+)'[\s\S]*?commonMistakes: \[[^\]]*\],\s*}/g;
let bm;
while ((bm = blockRe.exec(libSource))) {
  libBlocks.set(bm[1], bm[0]);
}

const curatedPath = path.join(ROOT, 'src/data/maleCuratedWorkouts.ts');
const lines = [
  "import { WorkoutPlan } from '../types';",
  '',
  '/** Planilhas masculinas importadas de fichas de treino (Seg–Sex). */',
  'export const MALE_CURATED_WORKOUTS: WorkoutPlan[] = [',
];

for (const w of workouts) {
  lines.push('  {');
  lines.push(`    id: '${w.id}',`);
  lines.push(`    title: '${esc(w.title)}',`);
  lines.push(`    goal: 'ganhar_massa',`);
  lines.push(`    level: 'intermediario',`);
  lines.push(`    durationMinutes: ${w.durationMinutes},`);
  lines.push(`    tier: 'pro',`);
  lines.push(`    audience: 'masculino',`);
  lines.push(`    programId: 'masc-${String(w.planNumber).padStart(2, '0')}',`);
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
