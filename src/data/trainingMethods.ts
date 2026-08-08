import { TrainingMethod, TrainingMethodCategoryId, TrainingMethodId } from '../types';

export const TRAINING_METHODS: TrainingMethod[] = [
  // ── 1. Intensificação e volumetria ──────────────────────────────────────
  {
    id: 'drop_set',
    categoryId: 'intensification',
    name: 'Drop Set',
    shortDescription: 'Reduz a carga após a falha e continua sem descanso.',
    howTo:
      'Realize a série até a falha (ou próximo dela), reduza a carga em cerca de 20% a 30% imediatamente e continue repetindo até a nova falha, sem descanso. Pode ser feito 1, 2 ou 3 drops.',
    objective:
      'Elevar o estresse metabólico e recrutar mais fibras musculares em um curto espaço de tempo.',
    example: 'Supino com 40 kg até falhar → 30 kg até falhar → 22 kg até falhar.',
    icon: 'trending-down-outline',
  },
  {
    id: 'rest_pause',
    categoryId: 'intensification',
    name: 'Rest-Pause',
    shortDescription: 'Série pesada, pausa curta e mais repetições.',
    howTo:
      'Faça uma série pesada até a falha, descanse de 10 a 15 segundos (mantendo-se no aparelho ou com o peso próximo) e faça mais algumas repetições até falhar novamente. Pode repetir o ciclo 1 ou 2 vezes.',
    objective: 'Acumular mais volume com cargas elevadas.',
    example: 'Leg press 8 reps até falha → 15 s de pausa → +3 reps → 15 s → +2 reps.',
    icon: 'pause-circle-outline',
  },
  {
    id: 'cluster_sets',
    categoryId: 'intensification',
    name: 'Cluster Sets',
    shortDescription: 'Micro-séries com pausas curtas dentro do mesmo set.',
    howTo:
      'Divida uma série em várias micro-séries com pequenos descansos dentro do mesmo set (ex.: 4 repetições + 10 s de descanso + 4 repetições + 10 s de descanso, completando a série).',
    objective:
      'Trabalhar com cargas muito altas mantendo boa execução técnica e menor fadiga do sistema nervoso central.',
    example: 'Agachamento: 4 reps + 10 s + 4 reps + 10 s + 4 reps (total 12 reps com carga alta).',
    icon: 'grid-outline',
  },
  {
    id: 'back_off_set',
    categoryId: 'intensification',
    name: 'Back-off Set',
    shortDescription: 'Última série mais leve após as séries pesadas.',
    howTo:
      'Após realizar as séries principais com carga máxima (séries de força), reduza o peso em cerca de 20% para fazer uma última série com mais repetições e foco em bombeamento muscular.',
    objective:
      'Combinar estresse tensional (carga alta) com estresse metabólico (alto volume) no mesmo exercício.',
    example: 'Supino: 4×5 com 80 kg → back-off de 12–15 reps com 65 kg.',
    icon: 'arrow-down-circle-outline',
  },

  // ── 2. Variação de carga e repetições ─────────────────────────────────
  {
    id: 'ascending_pyramid',
    categoryId: 'load_variation',
    name: 'Pirâmide crescente',
    shortDescription: 'Aumenta a carga e reduz as repetições a cada série.',
    howTo:
      'A cada série, aumente a carga e diminua o número de repetições (ex.: 12 reps com 20 kg → 10 reps com 24 kg → 8 reps com 28 kg).',
    objective: 'Preparar as articulações progressivamente até chegar à carga máxima.',
    example: 'Rosca direta: 12×20 kg → 10×24 kg → 8×28 kg → 6×32 kg.',
    icon: 'triangle-outline',
  },
  {
    id: 'descending_pyramid',
    categoryId: 'load_variation',
    name: 'Pirâmide decrescente',
    shortDescription: 'Começa pesado e vai aliviando a carga nas séries.',
    howTo:
      'Comece com a carga mais alta e menos repetições e, a cada série, reduza a carga e aumente o número de repetições (ex.: 6 reps com 30 kg → 8 reps com 26 kg → 10 reps com 22 kg).',
    objective: 'Aproveitar que a musculatura está descansada no início para mover mais peso.',
    example: 'Desenvolvimento: 6×30 kg → 8×26 kg → 10×22 kg → 12×18 kg.',
    icon: 'invert-mode-outline',
  },
  {
    id: 'wave_loading',
    categoryId: 'load_variation',
    name: 'Onda (Wave Loading)',
    shortDescription: 'Alterna subidas e descidas de carga em ciclos.',
    howTo:
      'Alterne subidas e descidas de carga em ciclos dentro do mesmo exercício, mantendo boa técnica em cada onda.',
    objective: 'Potenciação pós-ativação do sistema nervoso para ganhar força.',
    example: '6 reps com 90 kg → 6 reps com 82 kg → 4 reps com 87 kg → reinicia o ciclo.',
    icon: 'pulse-outline',
  },

  // ── 3. Combinados de exercícios ───────────────────────────────────────
  {
    id: 'bi_set',
    categoryId: 'exercise_combos',
    name: 'Bi-Set',
    shortDescription: 'Dois exercícios seguidos para o mesmo músculo.',
    howTo:
      'Realize dois exercícios seguidos para o mesmo grupo muscular sem descanso entre eles (ex.: Supino reto + Crucifixo reto).',
    objective: 'Aumentar o volume e o estresse metabólico no mesmo grupo muscular.',
    example: 'Supino reto 10 reps → Crucifixo reto 12 reps → descanso.',
    icon: 'link-outline',
  },
  {
    id: 'antagonist_superset',
    categoryId: 'exercise_combos',
    name: 'Superset antagonista',
    shortDescription: 'Dois exercícios para músculos opostos, sem pausa.',
    howTo:
      'Realize dois exercícios seguidos para músculos opostos sem descanso (ex.: Rosca direta [bíceps] + Tríceps testa [tríceps] ou Supino [peito] + Remada [costas]).',
    objective: 'Economizar tempo e manter intensidade elevada sem sobrecarregar o mesmo músculo.',
    example: 'Rosca direta 12 reps → Tríceps testa 12 reps → descanso.',
    icon: 'swap-horizontal-outline',
  },
  {
    id: 'tri_set',
    categoryId: 'exercise_combos',
    name: 'Tri-Set',
    shortDescription: 'Três exercícios em sequência sem descanso.',
    howTo:
      'Execute três exercícios em sequência sem intervalo de descanso, para o mesmo músculo ou grupos diferentes.',
    objective: 'Elevar drasticamente o volume e a fadiga muscular em uma única rodada.',
    example: 'Elevação lateral → Elevação frontal → Desenvolvimento — tudo seguido.',
    icon: 'git-merge-outline',
  },
  {
    id: 'giant_set',
    categoryId: 'exercise_combos',
    name: 'Série gigante',
    shortDescription: 'Quatro ou mais exercícios sem pausa entre eles.',
    howTo:
      'Sequência de 4 ou mais exercícios realizados sem pausa entre eles. Muito comum em treino de ombros ou abdômen.',
    objective: 'Gerar alto estresse metabólico e pump intenso em uma única série composta.',
    example: 'Ombros: desenvolvimento → elevação lateral → elevação frontal → encolhimento — tudo seguido.',
    icon: 'albums-outline',
  },

  // ── 4. Ângulo e amplitude ─────────────────────────────────────────────
  {
    id: 'method_21',
    categoryId: 'angle_amplitude',
    name: 'Método 21',
    shortDescription: '7 reps na metade inferior + 7 na superior + 7 completas.',
    howTo:
      'Cada série é dividida em 3 partes de 7 repetições (totalizando 21): 7 reps na metade inferior da amplitude, 7 reps na metade superior e 7 reps na amplitude completa. Muito famoso na rosca direta.',
    objective: 'Gerar um pump severo através da fadiga em diferentes amplitudes do movimento.',
    example: 'Rosca direta: 7 meias reps de baixo + 7 meias reps de cima + 7 reps completas.',
    icon: 'fitness-outline',
  },
  {
    id: 'partial_reps',
    categoryId: 'angle_amplitude',
    name: 'Repetições parciais',
    shortDescription: 'Continua o movimento após a falha na amplitude total.',
    howTo:
      'Após atingir a falha na amplitude completa, continue realizando repetições curtas (apenas na metade ou terço do movimento onde ainda resta força) até a falha total.',
    objective: 'Estender a série além da falha concêntrica e maximizar o recrutamento de fibras.',
    example: 'Após falhar no agachamento completo, faça meias reps na parte superior.',
    icon: 'contract-outline',
  },
  {
    id: 'isometric_hold',
    categoryId: 'angle_amplitude',
    name: 'Isometria',
    shortDescription: 'Segura a posição no ponto de maior tensão.',
    howTo:
      'Mantenha a posição isométrica por 2 a 5 segundos no ponto de maior tensão do movimento, seja no meio da repetição ou no final de cada fase concêntrica.',
    objective: 'Aumentar o tempo sob tensão e reforçar a estabilidade no ângulo mais exigente.',
    example: 'Segurar 3 s no ponto mais baixo do agachamento ou no topo da puxada.',
    icon: 'hourglass-outline',
  },
];

export function getMethodsForCategory(categoryId: TrainingMethodCategoryId): TrainingMethod[] {
  return TRAINING_METHODS.filter((m) => m.categoryId === categoryId);
}

export function getTrainingMethod(id: TrainingMethodId): TrainingMethod {
  const found = TRAINING_METHODS.find((m) => m.id === id);
  if (!found) throw new Error(`Método de treino desconhecido: ${id}`);
  return found;
}
