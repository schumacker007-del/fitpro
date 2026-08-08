import { AnimationKind, ExerciseStep, MuscleGroupId, WorkoutPlan } from '../types';

const HEAVY_REST = 300;
const ACCESSORY_REST = 120;

export function percentLift(opts: {
  id: string;
  name: string;
  muscleGroup: string;
  primaryMuscles: MuscleGroupId[];
  animation: AnimationKind;
  equipment: string;
  sets: number;
  reps: string;
  workPercent: number;
  pyramid: string[];
  extraInstructions?: string[];
  extraTips?: string[];
}): ExerciseStep {
  return {
    id: opts.id,
    name: opts.name,
    muscleGroup: opts.muscleGroup,
    primaryMuscles: opts.primaryMuscles,
    sets: opts.sets,
    reps: `${opts.reps} @ ${opts.workPercent}%`,
    restSeconds: HEAVY_REST,
    animation: opts.animation,
    equipment: opts.equipment,
    tier: 'free',
    instructions: [
      'Aquecimento progressivo (% do 1RM):',
      ...opts.pyramid.map((line) => `• ${line}`),
      `Séries de trabalho: ${opts.sets}×${opts.reps} @ ${opts.workPercent}% do 1RM.`,
      ...(opts.extraInstructions ?? []),
    ],
    postureTips: [
      'Registre as cargas usadas em cada percentual para acompanhar a progressão semanal.',
      'Descanso de 3 a 5 minutos entre as séries de trabalho.',
      ...(opts.extraTips ?? []),
    ],
    commonMistakes: [
      'Pular etapas do aquecimento antes das séries pesadas.',
      'Aumentar o percentual sem manter a técnica competitiva.',
    ],
  };
}

export function accessory(
  opts: Pick<ExerciseStep, 'id' | 'name' | 'muscleGroup' | 'primaryMuscles' | 'sets' | 'reps' | 'animation'> &
    Partial<Pick<ExerciseStep, 'equipment' | 'instructions' | 'postureTips' | 'commonMistakes' | 'restSeconds'>>
): ExerciseStep {
  return {
    restSeconds: ACCESSORY_REST,
    equipment: 'Barra',
    tier: 'free',
    instructions: opts.instructions ?? [],
    postureTips: opts.postureTips ?? ['Descanso de 1,5 a 2 minutos entre as séries.'],
    commonMistakes: opts.commonMistakes ?? [],
    ...opts,
  };
}

export const ADVANCED_WEEK1_WORKOUTS: WorkoutPlan[] = [
  {
    id: 'pl-adv-w1-seg',
    title: 'Semana 1 · Segunda',
    goal: 'ganhar_massa',
    level: 'avancado',
    durationMinutes: 100,
    tier: 'free',
    hidden: true,
    exercises: [
      percentLift({
        id: 'pl-adv-w1-seg-squat',
        name: 'Agachamento (Agx)',
        muscleGroup: 'Quadríceps',
        primaryMuscles: ['quadriceps', 'posterior_gluteos'],
        animation: 'squat',
        equipment: 'Barra',
        sets: 5,
        reps: '4',
        workPercent: 70,
        pyramid: ['20% × 8', '30% × 6', '50% × 5', '60% × 4'],
      }),
      percentLift({
        id: 'pl-adv-w1-seg-bench',
        name: 'Supino (Sup)',
        muscleGroup: 'Peito',
        primaryMuscles: ['peito', 'triceps'],
        animation: 'chest_press',
        equipment: 'Barra',
        sets: 3,
        reps: '4',
        workPercent: 80,
        pyramid: ['20% × 8', '30% × 5', '50% × 5', '60% × 4', '70% × 3'],
        extraTips: ['Pause 1 segundo no peito nas séries de trabalho.'],
      }),
      accessory({
        id: 'pl-adv-w1-seg-incline',
        name: 'Supino inclinado com halteres',
        muscleGroup: 'Peito',
        primaryMuscles: ['peito', 'triceps'],
        sets: 5,
        reps: '6',
        animation: 'chest_press_incline_db',
        equipment: 'Halteres + banco inclinado',
        instructions: [
          'Banco inclinado ~30°, halteres na altura do peito.',
          'Empurre para cima e desça controlado com cotovelos a ~45°.',
        ],
      }),
      accessory({
        id: 'pl-adv-w1-seg-abs',
        name: 'Abdominais',
        muscleGroup: 'Core',
        primaryMuscles: ['abdomen'],
        sets: 3,
        reps: '15-20',
        animation: 'crunch',
        equipment: 'Peso do corpo',
        instructions: ['Escolha crunch, prancha ou abdominal na polia conforme a rotina do dia.'],
      }),
      accessory({
        id: 'pl-adv-w1-seg-mob',
        name: 'Mobilidades',
        muscleGroup: 'Mobilidade',
        primaryMuscles: ['mobilidade'],
        sets: 1,
        reps: '10 min',
        animation: 'stretch',
        equipment: 'Peso do corpo',
        restSeconds: 0,
        instructions: [
          'Dedique ~10 minutos para tornozelos, quadril, ombros e coluna torácica.',
          'Realize antes ou após os levantamentos principais, conforme sua rotina.',
        ],
      }),
      accessory({
        id: 'pl-adv-w1-seg-dip',
        name: 'Paralelas',
        muscleGroup: 'Tríceps / Peito',
        primaryMuscles: ['triceps', 'peito'],
        sets: 5,
        reps: '5',
        animation: 'dip_chest',
        equipment: 'Paralelas',
        instructions: [
          'Corpo suspenso, desça flexionando os cotovelos e suba estendendo os braços.',
          'Mantenha leve inclinação do tronco se quiser ênfase em peito.',
        ],
      }),
    ],
  },
  {
    id: 'pl-adv-w1-ter',
    title: 'Semana 1 · Terça',
    goal: 'ganhar_massa',
    level: 'avancado',
    durationMinutes: 105,
    tier: 'free',
    hidden: true,
    exercises: [
      percentLift({
        id: 'pl-adv-w1-ter-deadlift',
        name: 'Terra com bloco',
        muscleGroup: 'Posterior / Costas',
        primaryMuscles: ['costas', 'posterior_gluteos'],
        animation: 'hip_hinge',
        equipment: 'Barra + blocos',
        sets: 2,
        reps: '4',
        workPercent: 85,
        pyramid: ['20% × 8', '30% × 5', '50% × 5', '60% × 5', '70% × 4', '80% × 3'],
        extraInstructions: [
          'A barra parte elevada nos blocos — reduz amplitude e permite cargas maiores no topo.',
        ],
      }),
      accessory({
        id: 'pl-adv-w1-ter-row',
        name: 'Remada curvada',
        muscleGroup: 'Costas',
        primaryMuscles: ['costas', 'biceps'],
        sets: 5,
        reps: '5',
        animation: 'row',
        instructions: [
          'Tronco inclinado ~45°, puxe a barra ao abdômen com coluna neutra.',
          'Contraia as escápulas no topo de cada repetição.',
        ],
      }),
      accessory({
        id: 'pl-adv-w1-ter-pullup',
        name: 'Barra fixa',
        muscleGroup: 'Costas',
        primaryMuscles: ['costas', 'biceps'],
        sets: 5,
        reps: '6',
        animation: 'pull_up',
        equipment: 'Barra fixa',
        instructions: [
          'Pendure-se com braços estendidos e puxe até o queixo passar da barra.',
          'Desça controlado até extensão completa.',
        ],
      }),
      accessory({
        id: 'pl-adv-w1-ter-abs',
        name: 'Abdômen com carga',
        muscleGroup: 'Core',
        primaryMuscles: ['abdomen'],
        sets: 5,
        reps: '15',
        animation: 'crunch_cable',
        equipment: 'Polia / anilha',
        instructions: [
          'Use polia alta (crunch) ou anilha no peito conforme disponibilidade.',
          'Movimento controlado, foco na contração abdominal.',
        ],
      }),
    ],
  },
  {
    id: 'pl-adv-w1-qua',
    title: 'Semana 1 · Quarta',
    goal: 'ganhar_massa',
    level: 'avancado',
    durationMinutes: 95,
    tier: 'free',
    hidden: true,
    exercises: [
      percentLift({
        id: 'pl-adv-w1-qua-bench',
        name: 'Supino (Sup)',
        muscleGroup: 'Peito',
        primaryMuscles: ['peito', 'triceps'],
        animation: 'chest_press',
        equipment: 'Barra',
        sets: 2,
        reps: '4',
        workPercent: 80,
        pyramid: ['20% × 8', '30% × 5', '50% × 5', '60% × 5', '70% × 4', '75% × 3'],
      }),
      accessory({
        id: 'pl-adv-w1-qua-triceps',
        name: 'Tríceps francês',
        muscleGroup: 'Tríceps',
        primaryMuscles: ['triceps'],
        sets: 5,
        reps: '8',
        animation: 'triceps_overhead',
        equipment: 'Barra ou halter',
        instructions: [
          'Braços estendidos acima da cabeça, flexione os cotovelos descendo o peso atrás da cabeça.',
          'Estenda de volta controlando o movimento.',
        ],
      }),
      accessory({
        id: 'pl-adv-w1-qua-curl',
        name: 'Rosca direta',
        muscleGroup: 'Bíceps',
        primaryMuscles: ['biceps'],
        sets: 5,
        reps: '8',
        animation: 'curl',
        instructions: ['Cotovelos fixos ao lado do corpo, suba a barra sem balançar o tronco.'],
      }),
      accessory({
        id: 'pl-adv-w1-qua-ohp',
        name: 'Desenvolvimento de ombro com barra livre',
        muscleGroup: 'Ombros',
        primaryMuscles: ['ombros', 'triceps'],
        sets: 5,
        reps: '6',
        animation: 'shoulder_press',
        equipment: 'Barra',
        instructions: [
          'Em pé ou sentado, empurre a barra da altura dos ombros até a extensão completa.',
          'Core e glúteos ativados para proteger a lombar.',
        ],
      }),
    ],
  },
  {
    id: 'pl-adv-w1-qui',
    title: 'Semana 1 · Quinta',
    goal: 'ganhar_massa',
    level: 'avancado',
    durationMinutes: 90,
    tier: 'free',
    hidden: true,
    exercises: [
      percentLift({
        id: 'pl-adv-w1-qui-squat',
        name: 'Agachamento (Agx)',
        muscleGroup: 'Quadríceps',
        primaryMuscles: ['quadriceps', 'posterior_gluteos'],
        animation: 'squat',
        equipment: 'Barra',
        sets: 3,
        reps: '4',
        workPercent: 75,
        pyramid: ['20% × 8', '30% × 5', '50% × 5', '60% × 4', '70% × 4'],
      }),
      accessory({
        id: 'pl-adv-w1-qui-hyper',
        name: 'Banco lombar (hiperextensão)',
        muscleGroup: 'Lombar',
        primaryMuscles: ['costas', 'posterior_gluteos'],
        sets: 4,
        reps: '10',
        animation: 'hip_hinge',
        equipment: 'Banco romano',
        instructions: [
          'Suba o tronco até alinhar com as pernas, contraindo lombar e glúteos.',
          'Não hiperestenda além da linha reta.',
        ],
      }),
      accessory({
        id: 'pl-adv-w1-qui-goodmorning',
        name: 'Good morning',
        muscleGroup: 'Posterior / Lombar',
        primaryMuscles: ['posterior_gluteos', 'costas'],
        sets: 5,
        reps: '8',
        animation: 'hip_hinge',
        equipment: 'Barra',
        instructions: [
          'Barra nas costas, quadril para trás com joelhos levemente flexionados.',
          'Desça até sentir alongamento no posterior, suba contraindo glúteos e lombar.',
        ],
        postureTips: ['Use carga moderada — técnica e controle são prioritários.'],
      }),
    ],
  },
  {
    id: 'pl-adv-w1-sex',
    title: 'Semana 1 · Sexta',
    goal: 'ganhar_massa',
    level: 'avancado',
    durationMinutes: 105,
    tier: 'free',
    hidden: true,
    exercises: [
      percentLift({
        id: 'pl-adv-w1-sex-bench',
        name: 'Supino (Sup)',
        muscleGroup: 'Peito',
        primaryMuscles: ['peito', 'triceps'],
        animation: 'chest_press',
        equipment: 'Barra',
        sets: 3,
        reps: '4',
        workPercent: 80,
        pyramid: ['30% × 8', '40% × 5', '50% × 4', '60% × 3', '70% × 3'],
      }),
      percentLift({
        id: 'pl-adv-w1-sex-deadlift',
        name: 'Terra com 2 pauses (canela e joelho)',
        muscleGroup: 'Posterior / Costas',
        primaryMuscles: ['costas', 'posterior_gluteos'],
        animation: 'hip_hinge',
        equipment: 'Barra',
        sets: 3,
        reps: '5',
        workPercent: 70,
        pyramid: ['20% × 8', '30% × 5', '50% × 4', '60% × 4'],
        extraInstructions: [
          'Pause 1–2 segundos com a barra na canela e novamente no joelho em cada repetição.',
          'Fortalece posições fracas da subida do terra.',
        ],
      }),
      accessory({
        id: 'pl-adv-w1-sex-closebench',
        name: 'Supino fechado',
        muscleGroup: 'Tríceps / Peito',
        primaryMuscles: ['triceps', 'peito'],
        sets: 5,
        reps: '6',
        animation: 'chest_press',
        equipment: 'Barra — pegada fechada',
        instructions: [
          'Pegada na largura dos ombros ou um pouco mais fechada.',
          'Cotovelos mais próximos do tronco, desça até o peito e empurre.',
        ],
        postureTips: ['Excelente acessório para força de tríceps no supino competitivo.'],
      }),
    ],
  },
];

export const ADVANCED_WEEK1_IDS = ADVANCED_WEEK1_WORKOUTS.map((w) => w.id);
