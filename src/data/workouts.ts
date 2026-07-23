import { ExerciseStep, MuscleGroupId, WorkoutPlan } from '../types';

export const WORKOUTS: WorkoutPlan[] = [
  // ---------- FREE ----------
  {
    id: 'w-free-fullbody',
    title: 'Full Body Iniciante',
    goal: 'manter_forma',
    level: 'iniciante',
    durationMinutes: 20,
    tier: 'free',
    exercises: [
      {
        id: 'e-squat-1',
        name: 'Agachamento livre',
        muscleGroup: 'Pernas',
        primaryMuscles: ['pernas'],
        sets: 3,
        reps: '12-15',
        restSeconds: 45,
        animation: 'squat',
        tier: 'free',
        instructions: [
          'Pés na largura dos ombros, coluna neutra.',
          'Desça flexionando quadril e joelhos, como se fosse sentar.',
          'Desça até as coxas ficarem paralelas ao chão.',
          'Suba controlando o movimento, sem travar os joelhos no topo.',
        ],
        postureTips: [
          'Mantenha o peso nos calcanhares.',
          'Olhar para frente, peito aberto.',
          'Inspire ao descer, expire ao subir.',
        ],
        commonMistakes: [
          'Deixar os joelhos "caírem" para dentro.',
          'Arredondar a lombar no fundo do movimento.',
          'Levantar os calcanhares do chão.',
        ],
      },
      {
        id: 'e-pushup-1',
        name: 'Flexão de braço',
        muscleGroup: 'Peito/Tríceps',
        primaryMuscles: ['peito', 'triceps'],
        sets: 3,
        reps: '8-12',
        restSeconds: 45,
        animation: 'pushup',
        tier: 'free',
        instructions: [
          'Mãos um pouco mais largas que os ombros, corpo alinhado.',
          'Desça o peito em direção ao chão flexionando os cotovelos.',
          'Mantenha o abdômen contraído durante todo o movimento.',
          'Suba empurrando o chão até estender os braços.',
        ],
        postureTips: [
          'Mantenha o corpo alinhado (sem quadril caído ou elevado).',
          'Cotovelos a ~45° do tronco, não totalmente abertos.',
          'Expire ao empurrar o chão.',
        ],
        commonMistakes: [
          'Deixar o quadril cair (lombar hiperestendida).',
          'Mover só a cabeça em vez do tronco inteiro.',
          'Abrir os cotovelos a 90°, sobrecarregando o ombro.',
        ],
      },
      {
        id: 'e-plank-1',
        name: 'Prancha isométrica',
        muscleGroup: 'Core',
        primaryMuscles: ['abdomen'],
        sets: 3,
        reps: '30-45s',
        restSeconds: 30,
        animation: 'plank',
        tier: 'free',
        instructions: [
          'Apoie antebraços e pontas dos pés no chão.',
          'Mantenha corpo em linha reta, sem elevar o quadril.',
          'Contraia abdômen e glúteos durante toda a série.',
        ],
        postureTips: [
          'Contraia abdômen e glúteos o tempo todo.',
          'Mantenha o pescoço neutro, olhando para o chão.',
          'Respire de forma constante, sem prender o ar.',
        ],
        commonMistakes: [
          'Deixar o quadril subir (posição em "V").',
          'Deixar o quadril cair, sobrecarregando a lombar.',
          'Prender a respiração.',
        ],
      },
    ],
  },
  {
    id: 'w-free-cardio',
    title: 'Cardio Queima Rápida',
    goal: 'perder_peso',
    level: 'iniciante',
    durationMinutes: 15,
    tier: 'free',
    exercises: [
      {
        id: 'e-jump-1',
        name: 'Polichinelo (Jumping Jack)',
        muscleGroup: 'Cardio',
        primaryMuscles: ['cardio'],
        sets: 4,
        reps: '30-40s',
        restSeconds: 20,
        animation: 'jump',
        tier: 'free',
        instructions: [
          'Comece em pé, pés juntos e braços ao lado do corpo.',
          'Salte abrindo pernas e levando os braços acima da cabeça.',
          'Volte à posição inicial e repita em ritmo constante.',
        ],
        postureTips: [
          'Aterrisse suavemente, flexionando levemente os joelhos.',
          'Mantenha um ritmo constante.',
          'Braços totalmente estendidos ao subir.',
        ],
        commonMistakes: [
          'Aterrissar com as pernas travadas (impacto seco nas articulações).',
          'Perder a coordenação entre braços e pernas.',
        ],
      },
      {
        id: 'e-lunge-1',
        name: 'Afundo alternado',
        muscleGroup: 'Pernas/Glúteos',
        primaryMuscles: ['pernas', 'gluteos'],
        sets: 3,
        reps: '10-12 por lado',
        restSeconds: 30,
        animation: 'lunge',
        tier: 'free',
        instructions: [
          'Dê um passo longo para frente e flexione ambos os joelhos.',
          'Joelho de trás quase toca o chão, tronco ereto.',
          'Empurre com a perna da frente para voltar à posição inicial.',
        ],
        postureTips: [
          'Tronco ereto durante todo o movimento.',
          'Joelho da frente alinhado com o pé.',
          'Desça até o joelho de trás quase tocar o chão.',
        ],
        commonMistakes: [
          'Deixar o joelho da frente "cair" para dentro.',
          'Inclinar o tronco muito à frente.',
          'Dar passos curtos demais, perdendo amplitude.',
        ],
      },
      {
        id: 'e-stretch-1',
        name: 'Alongamento final',
        muscleGroup: 'Mobilidade',
        primaryMuscles: ['mobilidade'],
        sets: 1,
        reps: '5 min',
        restSeconds: 0,
        animation: 'stretch',
        tier: 'free',
        instructions: [
          'Alongue pernas, quadril e costas por cerca de 30s cada.',
          'Respire profundamente e evite movimentos bruscos.',
        ],
        postureTips: [
          'Alongue até sentir tensão leve, sem dor.',
          'Respire fundo e solte a tensão a cada expiração.',
          'Mantenha cada posição por pelo menos 20-30s.',
        ],
        commonMistakes: [
          'Fazer movimentos bruscos ou "saltitantes".',
          'Prender a respiração durante o alongamento.',
        ],
      },
    ],
  },

  // ---------- PRO ----------
  {
    id: 'w-pro-hipertrofia-superior',
    title: 'Hipertrofia — Superiores',
    goal: 'ganhar_massa',
    level: 'intermediario',
    durationMinutes: 45,
    tier: 'pro',
    exercises: [
      {
        id: 'e-row-1',
        name: 'Remada curvada',
        muscleGroup: 'Costas',
        primaryMuscles: ['costas'],
        sets: 4,
        reps: '8-10',
        restSeconds: 60,
        animation: 'row',
        tier: 'pro',
        instructions: [
          'Incline o tronco à frente mantendo a coluna neutra.',
          'Puxe o peso em direção ao abdômen, cotovelos próximos ao corpo.',
          'Contraia as escápulas no topo do movimento.',
          'Desça controlado até estender os braços.',
        ],
        postureTips: [
          'Mantenha a coluna neutra, sem arredondar.',
          'Puxe com as costas, não só com os braços.',
          'Aproxime as escápulas no topo do movimento.',
        ],
        commonMistakes: [
          'Arredondar a lombar durante a puxada.',
          'Usar embalo do corpo para puxar o peso.',
          'Elevar demais os ombros em vez de usar as costas.',
        ],
      },
      {
        id: 'e-curl-1',
        name: 'Rosca direta',
        muscleGroup: 'Bíceps',
        primaryMuscles: ['biceps'],
        sets: 4,
        reps: '10-12',
        restSeconds: 45,
        animation: 'curl',
        tier: 'pro',
        instructions: [
          'Cotovelos fixos ao lado do corpo.',
          'Flexione levando o peso até a altura do ombro.',
          'Desça controlado sem balançar o tronco.',
        ],
        postureTips: [
          'Cotovelos fixos ao lado do corpo o tempo todo.',
          'Movimento controlado, sem balançar o tronco.',
          'Contraia o bíceps no topo do movimento.',
        ],
        commonMistakes: [
          'Usar impulso do corpo (balançar) para levantar o peso.',
          'Mover os cotovelos para frente durante a subida.',
          'Descer o peso rápido demais.',
        ],
      },
      {
        id: 'e-pushup-2',
        name: 'Flexão com apoio elevado',
        muscleGroup: 'Peito',
        primaryMuscles: ['peito'],
        sets: 4,
        reps: '10-15',
        restSeconds: 60,
        animation: 'pushup',
        tier: 'pro',
        instructions: [
          'Mãos apoiadas em um banco ou step.',
          'Desça o peito em direção às mãos controlando o ritmo.',
          'Empurre de volta mantendo o corpo alinhado.',
        ],
        postureTips: [
          'Mãos firmes no banco, alinhadas com o peito.',
          'Corpo em linha reta da cabeça aos pés.',
          'Desça controlado até quase tocar o banco.',
        ],
        commonMistakes: [
          'Deixar o quadril cair ou subir demais.',
          'Apoio instável do banco/step.',
          'Amplitude curta demais no movimento.',
        ],
      },
    ],
  },
  {
    id: 'w-pro-perna-gluteo',
    title: 'Pernas & Glúteos Avançado',
    goal: 'ganhar_massa',
    level: 'avancado',
    durationMinutes: 50,
    tier: 'pro',
    exercises: [
      {
        id: 'e-squat-2',
        name: 'Agachamento sumô',
        muscleGroup: 'Pernas/Glúteos',
        primaryMuscles: ['pernas', 'gluteos'],
        sets: 4,
        reps: '10-12',
        restSeconds: 60,
        animation: 'squat',
        tier: 'pro',
        instructions: [
          'Pés bem afastados, pontas levemente para fora.',
          'Desça mantendo joelhos alinhados com os pés.',
          'Aperte glúteos ao subir.',
        ],
        postureTips: [
          'Joelhos alinhados com as pontas dos pés durante toda a descida.',
          'Tronco ereto, peito aberto.',
          'Aperte os glúteos com força no topo.',
        ],
        commonMistakes: [
          'Joelhos "colapsando" para dentro.',
          'Pés abertos além da sua mobilidade de quadril.',
          'Inclinar o tronco muito à frente.',
        ],
      },
      {
        id: 'e-lunge-2',
        name: 'Afundo búlgaro',
        muscleGroup: 'Pernas/Glúteos',
        primaryMuscles: ['pernas', 'gluteos'],
        sets: 4,
        reps: '8-10 por lado',
        restSeconds: 60,
        animation: 'lunge',
        tier: 'pro',
        instructions: [
          'Apoie o peito do pé de trás em um banco.',
          'Desça flexionando o joelho da frente.',
          'Suba controlado, mantendo o tronco estável.',
        ],
        postureTips: [
          'Apoie apenas a ponta do pé de trás no banco.',
          'Desça na vertical, sem inclinar o tronco à frente.',
          'Foque o peso na perna da frente.',
        ],
        commonMistakes: [
          'Perder o equilíbrio por falta de estabilidade do core.',
          'Inclinar o tronco à frente e deixar o joelho ultrapassar muito a ponta do pé.',
          'Usar amplitude curta demais.',
        ],
      },
    ],
  },
  {
    id: 'w-pro-emagrecimento-hiit',
    title: 'HIIT Emagrecimento Total',
    goal: 'perder_peso',
    level: 'intermediario',
    durationMinutes: 30,
    tier: 'pro',
    exercises: [
      {
        id: 'e-jump-2',
        name: 'Jump squat',
        muscleGroup: 'Cardio/Pernas',
        primaryMuscles: ['cardio', 'pernas'],
        sets: 5,
        reps: '30s',
        restSeconds: 20,
        animation: 'jump',
        tier: 'pro',
        instructions: [
          'Agache e exploda para cima saltando.',
          'Aterrisse suave flexionando os joelhos.',
          'Repita em ritmo intenso durante o tempo indicado.',
        ],
        postureTips: [
          'Aterrisse sempre flexionando os joelhos, nunca "travado".',
          'Use o impulso dos braços pra ajudar o salto.',
          'Mantenha o core ativado durante o movimento.',
        ],
        commonMistakes: [
          'Aterrissar com as pernas retas (alto impacto nas articulações).',
          'Perder a profundidade do agachamento antes de saltar.',
        ],
      },
      {
        id: 'e-plank-2',
        name: 'Prancha com toque no ombro',
        muscleGroup: 'Core',
        primaryMuscles: ['abdomen', 'ombros'],
        sets: 4,
        reps: '30-40s',
        restSeconds: 20,
        animation: 'plank',
        tier: 'pro',
        instructions: [
          'Na posição de prancha alta, toque o ombro oposto com a mão.',
          'Mantenha o quadril estável, evitando rotação excessiva.',
        ],
        postureTips: [
          'Mantenha o quadril o mais estável possível.',
          'Base bem afastada nos pés pra mais estabilidade.',
          'Movimento lento e controlado ao tocar o ombro.',
        ],
        commonMistakes: [
          'Deixar o quadril balançar/rodar a cada toque.',
          'Fazer o movimento rápido demais, perdendo controle.',
          'Deixar os pés muito juntos, perdendo base.',
        ],
      },
    ],
  },
];

export function getWorkoutsForGoal(goal: string) {
  return WORKOUTS.filter((w) => w.goal === goal || goal === 'manter_forma');
}

export interface ExerciseWithWorkout extends ExerciseStep {
  workoutId: string;
  workoutTitle: string;
}

/** Retorna todos os exercícios (de todos os treinos) que trabalham um grupo muscular, sem duplicar. */
export function getExercisesForMuscleGroup(muscleGroup: MuscleGroupId): ExerciseWithWorkout[] {
  const seen = new Set<string>();
  const result: ExerciseWithWorkout[] = [];
  for (const workout of WORKOUTS) {
    for (const exercise of workout.exercises) {
      if (exercise.primaryMuscles.includes(muscleGroup) && !seen.has(exercise.id)) {
        seen.add(exercise.id);
        result.push({ ...exercise, workoutId: workout.id, workoutTitle: workout.title });
      }
    }
  }
  return result;
}
