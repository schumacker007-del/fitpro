import { ExerciseStep, PowerliftingLevel, PowerliftingLevelId, WorkoutPlan } from '../types';
import { ADVANCED_WEEK1_WORKOUTS } from './powerliftingAdvancedWeek1';
import { ADVANCED_WEEK2_WORKOUTS } from './powerliftingAdvancedWeek2';
import { ADVANCED_WEEK3_WORKOUTS } from './powerliftingAdvancedWeek3';
import { ADVANCED_WEEK4_WORKOUTS } from './powerliftingAdvancedWeek4';
import { ADVANCED_WEEK5_WORKOUTS } from './powerliftingAdvancedWeek5';
import { ADVANCED_WEEK6_WORKOUTS } from './powerliftingAdvancedWeek6';
import { ADVANCED_WEEK7_WORKOUTS } from './powerliftingAdvancedWeek7';
import { ADVANCED_WEEK8_WORKOUTS } from './powerliftingAdvancedWeek8';
import { ADVANCED_WEEK9_WORKOUTS } from './powerliftingAdvancedWeek9';
import { ADVANCED_WEEK10_WORKOUTS } from './powerliftingAdvancedWeek10';
import { ADVANCED_WEEK11_WORKOUTS } from './powerliftingAdvancedWeek11';
import { ADVANCED_WEEK12_WORKOUTS } from './powerliftingAdvancedWeek12';

const MAIN_LIFT_REST = 240; // 3–5 min
const ACCESSORY_REST = 90; // 1,5–2 min

const squat: ExerciseStep = {
  id: 'pl-ex-squat',
  name: 'Agachamento livre',
  muscleGroup: 'Quadríceps',
  primaryMuscles: ['quadriceps', 'posterior_gluteos'],
  sets: 3,
  reps: '5',
  restSeconds: MAIN_LIFT_REST,
  animation: 'squat',
  equipment: 'Barra',
  tier: 'free',
  instructions: [
    'Barra apoiada na parte superior das costas, pés na largura dos ombros.',
    'Desça flexionando quadril e joelhos com coluna neutra e peito aberto.',
    'Suba empurrando pelos calcanhares até estender totalmente.',
    'Progressão linear: aumente um pouco a carga quando completar todas as séries com boa técnica.',
  ],
  postureTips: [
    'Joelhos alinhados com a ponta dos pés.',
    'Olhar à frente, core ativado durante toda a série.',
    'Descanso de 3 a 5 minutos entre as séries.',
  ],
  commonMistakes: [
    'Arredondar a lombar na descida.',
    'Levantar os calcanhares do chão.',
    'Aumentar carga sacrificando a técnica.',
  ],
};

const benchPress: ExerciseStep = {
  id: 'pl-ex-bench',
  name: 'Supino reto com barra',
  muscleGroup: 'Peito',
  primaryMuscles: ['peito', 'triceps'],
  sets: 3,
  reps: '5',
  restSeconds: MAIN_LIFT_REST,
  animation: 'chest_press',
  equipment: 'Barra',
  tier: 'free',
  instructions: [
    'Deite no banco com pés firmes no chão e escápulas retraídas.',
    'Desça a barra controlada até tocar levemente o peito.',
    'Empurre para cima em linha reta, sem travar os cotovelos com força.',
  ],
  postureTips: [
    'Escápulas presas no banco durante todo o movimento.',
    'Cotovelos a ~45° do tronco.',
    'Descanso de 3 a 5 minutos entre as séries.',
  ],
  commonMistakes: [
    'Quicar a barra no peito.',
    'Elevar o quadril do banco para ganhar impulso.',
    'Abrir demais os cotovelos.',
  ],
};

const deadlift: ExerciseStep = {
  id: 'pl-ex-deadlift',
  name: 'Levantamento terra',
  muscleGroup: 'Posterior / Costas',
  primaryMuscles: ['costas', 'posterior_gluteos'],
  sets: 1,
  reps: '5',
  restSeconds: MAIN_LIFT_REST,
  animation: 'hip_hinge',
  equipment: 'Barra',
  tier: 'free',
  instructions: [
    'Faça séries de aquecimento progressivas antes da série de trabalho.',
    'Pés na largura do quadril, barra próxima às canelas, coluna neutra.',
    'Suba estendendo quadril e joelhos ao mesmo tempo, barra rente ao corpo.',
    'Execute 1 série de trabalho com 5 repetições após o aquecimento.',
  ],
  postureTips: [
    'Nunca arredonde a lombar.',
    'Barra sempre próxima ao corpo.',
    'Descanso de 3 a 5 minutos após a série de trabalho.',
  ],
  commonMistakes: [
    'Pular o aquecimento antes da série pesada.',
    'Deixar a barra se afastar do corpo.',
    'Hiperestender a lombar no topo.',
  ],
};

const pullUpOrPulldown: ExerciseStep = {
  id: 'pl-ex-pull-accessory',
  name: 'Barra fixa ou puxada frontal',
  muscleGroup: 'Costas',
  primaryMuscles: ['costas', 'biceps'],
  sets: 3,
  reps: '8-10',
  restSeconds: ACCESSORY_REST,
  animation: 'pull_up',
  equipment: 'Barra fixa ou polia',
  tier: 'free',
  instructions: [
    'Opção 1 — Barra fixa: pendure-se e puxe até o queixo passar da barra.',
    'Opção 2 — Puxada frontal: puxe a barra até a altura do peito na polia.',
    'Use a variação que permitir boa técnica com a carga adequada.',
  ],
  postureTips: [
    'Puxe com as costas, não só com os braços.',
    'Descanso de 1,5 a 2 minutos entre as séries.',
  ],
  commonMistakes: [
    'Usar embalo excessivo do corpo.',
    'Amplitude incompleta na descida.',
  ],
};

const plank: ExerciseStep = {
  id: 'pl-ex-plank',
  name: 'Abdominal prancha',
  muscleGroup: 'Core',
  primaryMuscles: ['abdomen'],
  sets: 3,
  reps: '45-60s',
  restSeconds: 60,
  animation: 'plank',
  equipment: 'Peso do corpo',
  tier: 'free',
  instructions: [
    'Apoie antebraços e pontas dos pés no chão, corpo alinhado.',
    'Contraia abdômen e glúteos, mantendo a posição pelo tempo indicado.',
    'Respire normalmente sem perder a postura.',
  ],
  postureTips: [
    'Não deixe o quadril subir nem cair.',
    'Pescoço em posição neutra, olhar para o chão.',
  ],
  commonMistakes: [
    'Deixar o quadril cair, sobrecarregando a lombar.',
    'Prender a respiração.',
  ],
};

const ohp: ExerciseStep = {
  id: 'pl-ex-ohp',
  name: 'Desenvolvimento militar (OHP)',
  muscleGroup: 'Ombros',
  primaryMuscles: ['ombros', 'triceps'],
  sets: 3,
  reps: '5',
  restSeconds: MAIN_LIFT_REST,
  animation: 'shoulder_press',
  equipment: 'Barra',
  tier: 'free',
  instructions: [
    'Em pé, barra na altura dos ombros, mãos um pouco mais largas que os ombros.',
    'Empurre a barra para cima até estender os braços.',
    'Desça controlado até a altura dos ombros.',
  ],
  postureTips: [
    'Glúteos e abdômen contraídos para proteger a lombar.',
    'Barra sobe em linha próxima ao rosto.',
    'Descanso de 3 a 5 minutos entre as séries.',
  ],
  commonMistakes: [
    'Arquear excessivamente a lombar.',
    'Usar impulso das pernas sem controle.',
  ],
};

const bentOverRow: ExerciseStep = {
  id: 'pl-ex-row',
  name: 'Remada curvada com barra',
  muscleGroup: 'Costas',
  primaryMuscles: ['costas', 'biceps'],
  sets: 3,
  reps: '5',
  restSeconds: MAIN_LIFT_REST,
  animation: 'row',
  equipment: 'Barra',
  tier: 'free',
  instructions: [
    'Incline o tronco à frente (~45°), joelhos levemente flexionados.',
    'Puxe a barra em direção ao abdômen, cotovelos próximos ao corpo.',
    'Desça controlado até estender os braços.',
  ],
  postureTips: [
    'Coluna neutra durante toda a série.',
    'Contraia as escápulas no topo do movimento.',
    'Descanso de 3 a 5 minutos entre as séries.',
  ],
  commonMistakes: [
    'Arredondar a lombar.',
    'Usar embalo do corpo para puxar.',
  ],
};

const dipOrSkullcrusher: ExerciseStep = {
  id: 'pl-ex-triceps-accessory',
  name: 'Paralela ou tríceps testa',
  muscleGroup: 'Tríceps',
  primaryMuscles: ['triceps'],
  sets: 3,
  reps: '8-10',
  restSeconds: ACCESSORY_REST,
  animation: 'dip_chest',
  equipment: 'Paralelas ou barra',
  tier: 'free',
  instructions: [
    'Opção 1 — Paralela: desça flexionando os cotovelos e suba estendendo os braços.',
    'Opção 2 — Tríceps testa: deitado, flexione os cotovelos descendo a barra em direção à testa.',
    'Escolha a variação mais confortável para suas articulações.',
  ],
  postureTips: [
    'Cotovelos estáveis, sem abrir demais para os lados.',
    'Descanso de 1,5 a 2 minutos entre as séries.',
  ],
  commonMistakes: [
    'Descer rápido demais na paralela.',
    'Abrir os cotovelos no tríceps testa.',
  ],
};

const hyperextension: ExerciseStep = {
  id: 'pl-ex-hyperextension',
  name: 'Hiperextensão lombar',
  muscleGroup: 'Lombar / Posterior',
  primaryMuscles: ['costas', 'posterior_gluteos'],
  sets: 3,
  reps: '10-12',
  restSeconds: ACCESSORY_REST,
  animation: 'hip_hinge',
  equipment: 'Banco romano',
  tier: 'free',
  instructions: [
    'Apoie o quadril no banco, tronco solto para baixo, tornozelos travados.',
    'Suba o tronco até alinhar com as pernas, contraindo lombar e glúteos.',
    'Desça controlado até sentir alongamento leve.',
  ],
  postureTips: [
    'Suba apenas até ficar reto — não hiperestenda além disso.',
    'Descanso de 1,5 a 2 minutos entre as séries.',
  ],
  commonMistakes: [
    'Subir além da linha reta.',
    'Fazer o movimento rápido demais, com embalo.',
  ],
};

export const POWERLIFTING_WORKOUTS: WorkoutPlan[] = [
  {
    id: 'pl-basico-a',
    title: 'Treino A',
    goal: 'ganhar_massa',
    level: 'iniciante',
    durationMinutes: 60,
    tier: 'free',
    hidden: true,
    exercises: [squat, benchPress, deadlift, pullUpOrPulldown, plank],
  },
  {
    id: 'pl-basico-b',
    title: 'Treino B',
    goal: 'ganhar_massa',
    level: 'iniciante',
    durationMinutes: 55,
    tier: 'free',
    hidden: true,
    exercises: [squat, ohp, bentOverRow, dipOrSkullcrusher, hyperextension],
  },

  // ---------- INTERMEDIÁRIO — Upper/Lower (4x/semana) ----------
  {
    id: 'pl-inter-lower-1',
    title: 'Lower 1',
    goal: 'ganhar_massa',
    level: 'intermediario',
    durationMinutes: 75,
    tier: 'free',
    hidden: true,
    exercises: [
      {
        id: 'pl-int-l1-squat',
        name: 'Agachamento livre',
        muscleGroup: 'Quadríceps',
        primaryMuscles: ['quadriceps', 'posterior_gluteos'],
        sets: 4,
        reps: '4',
        restSeconds: MAIN_LIFT_REST,
        animation: 'squat',
        equipment: 'Barra',
        tier: 'free',
        instructions: [
          'Barra na parte superior das costas, pés na largura dos ombros.',
          'Desça com coluna neutra até profundidade competitiva ou confortável com boa técnica.',
          'Suba empurrando pelos calcanhares até estender totalmente.',
        ],
        postureTips: [
          'RPE 8–9: deixe 1–2 repetições de reserva na maioria das séries.',
          'Use cinto apenas nas séries mais pesadas, se necessário.',
          'Descanso de 3 a 5 minutos entre as séries.',
        ],
        commonMistakes: [
          'Arredondar a lombar na descida.',
          'Sacrificar técnica para bater o número de repetições.',
        ],
      },
      {
        id: 'pl-int-l1-dl-pause',
        name: 'Levantamento terra com pausa (2s)',
        muscleGroup: 'Posterior / Costas',
        primaryMuscles: ['costas', 'posterior_gluteos'],
        sets: 3,
        reps: '3',
        restSeconds: MAIN_LIFT_REST,
        animation: 'hip_hinge',
        equipment: 'Barra',
        tier: 'free',
        instructions: [
          'Posicione a barra próxima às canelas, coluna neutra e peito aberto.',
          'Suba a barra rente ao corpo até a extensão completa.',
          'Na descida, pause 2 segundos com a barra parada no chão antes da próxima repetição.',
        ],
        postureTips: [
          'A pausa no chão fortalece a saída do terra e elimina o rebote.',
          'Mantenha tensão no core durante toda a pausa.',
          'RPE 8–9 nas séries de trabalho.',
        ],
        commonMistakes: [
          'Relaxar a coluna durante a pausa no chão.',
          'Deixar a barra se afastar do corpo na subida.',
        ],
      },
      {
        id: 'pl-int-l1-lunge',
        name: 'Passada / afundo com halteres',
        muscleGroup: 'Quadríceps / Glúteos',
        primaryMuscles: ['quadriceps', 'posterior_gluteos'],
        sets: 3,
        reps: '8-10',
        restSeconds: ACCESSORY_REST,
        animation: 'lunge',
        equipment: 'Halteres',
        tier: 'free',
        instructions: [
          'Em pé, halteres ao lado do corpo.',
          'Dê um passo à frente descendo até ambos os joelhos formarem ~90°.',
          'Empurre pelo calcanhar da frente para retornar e alterne as pernas.',
        ],
        postureTips: [
          'Tronco ereto, core ativado.',
          'Joelho da frente alinhado com o pé, sem ultrapassar demais a ponta.',
        ],
        commonMistakes: [
          'Passo curto demais, sobrecarregando o joelho.',
          'Inclinar o tronco excessivamente à frente.',
        ],
      },
      {
        id: 'pl-int-l1-legcurl',
        name: 'Mesa / cadeira flexora',
        muscleGroup: 'Posterior de coxa',
        primaryMuscles: ['posterior_gluteos'],
        sets: 3,
        reps: '10-12',
        restSeconds: ACCESSORY_REST,
        animation: 'leg_curl_seated',
        equipment: 'Máquina flexora',
        tier: 'free',
        instructions: [
          'Ajuste o apoio para alinhar o joelho ao eixo da máquina.',
          'Flexione as pernas trazendo o calcanhar em direção ao glúteo.',
          'Desça controlado até estender sem travar os joelhos.',
        ],
        postureTips: [
          'Contraia o posterior no topo do movimento.',
          'Descanso de 1,5 a 2 minutos entre as séries.',
        ],
        commonMistakes: [
          'Levantar o quadril do assento para ajudar o movimento.',
          'Usar embalo na descida.',
        ],
      },
      {
        id: 'pl-int-l1-cable-crunch',
        name: 'Abdominal na polia (cable crunch)',
        muscleGroup: 'Core',
        primaryMuscles: ['abdomen'],
        sets: 3,
        reps: '12',
        restSeconds: ACCESSORY_REST,
        animation: 'crunch_cable',
        equipment: 'Polia alta + corda',
        tier: 'free',
        instructions: [
          'Ajoelhe-se de frente para a polia, corda atrás da cabeça.',
          'Flexione o tronco trazendo os cotovelos em direção aos joelhos.',
          'Retorne controlado sem perder a tensão no abdômen.',
        ],
        postureTips: [
          'O movimento vem da flexão do tronco, não do quadril.',
          'Expire ao contrair o abdômen.',
        ],
        commonMistakes: [
          'Sentar no calcanhar e usar o quadril para puxar o peso.',
          'Puxar com os braços em vez de flexionar o tronco.',
        ],
      },
    ],
  },
  {
    id: 'pl-inter-upper-1',
    title: 'Upper 1',
    goal: 'ganhar_massa',
    level: 'intermediario',
    durationMinutes: 70,
    tier: 'free',
    hidden: true,
    exercises: [
      {
        id: 'pl-int-u1-bench',
        name: 'Supino reto com barra',
        muscleGroup: 'Peito',
        primaryMuscles: ['peito', 'triceps'],
        sets: 4,
        reps: '4',
        restSeconds: MAIN_LIFT_REST,
        animation: 'chest_press',
        equipment: 'Barra',
        tier: 'free',
        instructions: [
          'Escápulas retraídas, pés firmes no chão.',
          'Desça a barra até tocar levemente o peito e pause 1 segundo (simula ordem do árbitro).',
          'Empurre para cima em linha reta, sem travar os cotovelos com força.',
        ],
        postureTips: [
          'RPE 8–9: deixe 1–2 repetições de reserva.',
          'Acostume-se a pausar no peito — essencial para competição.',
          'Use cinto nas séries mais pesadas, se necessário.',
        ],
        commonMistakes: [
          'Quicar a barra no peito.',
          'Elevar o quadril do banco para ganhar impulso.',
        ],
      },
      {
        id: 'pl-int-u1-incline-db',
        name: 'Supino inclinado com halteres',
        muscleGroup: 'Peito',
        primaryMuscles: ['peito', 'triceps'],
        sets: 3,
        reps: '6-8',
        restSeconds: MAIN_LIFT_REST,
        animation: 'chest_press_incline_db',
        equipment: 'Halteres + banco inclinado',
        tier: 'free',
        instructions: [
          'Banco inclinado ~30°, halteres na altura do peito.',
          'Empurre para cima até quase estender os braços.',
          'Desça controlado com cotovelos a ~45° do tronco.',
        ],
        postureTips: [
          'Fortalece a parte superior do peito para auxiliar no supino.',
          'Descanso de 2 a 3 minutos entre as séries.',
        ],
        commonMistakes: [
          'Inclinação excessiva do banco (vira desenvolvimento).',
          'Bater os halteres no topo do movimento.',
        ],
      },
      {
        id: 'pl-int-u1-row',
        name: 'Remada curvada ou Pendlay row',
        muscleGroup: 'Costas',
        primaryMuscles: ['costas', 'biceps'],
        sets: 4,
        reps: '6',
        restSeconds: MAIN_LIFT_REST,
        animation: 'row',
        equipment: 'Barra',
        tier: 'free',
        instructions: [
          'Remada curvada: tronco inclinado ~45°, puxe a barra ao abdômen.',
          'Pendlay row: barra no chão a cada rep, tronco paralelo ao solo, puxe explosivo ao abdômen.',
          'Escolha a variação que melhor se encaixa no seu equipamento e objetivo.',
        ],
        postureTips: [
          'Coluna neutra em ambas as variações.',
          'Contraia as escápulas no topo do movimento.',
        ],
        commonMistakes: [
          'Arredondar a lombar.',
          'Usar embalo excessivo do tronco.',
        ],
      },
      {
        id: 'pl-int-u1-lateral',
        name: 'Elevação lateral',
        muscleGroup: 'Ombros',
        primaryMuscles: ['ombros'],
        sets: 3,
        reps: '12',
        restSeconds: ACCESSORY_REST,
        animation: 'lateral_raise',
        equipment: 'Halteres ou cabo',
        tier: 'free',
        instructions: [
          'Em pé, halteres ao lado do corpo, cotovelos levemente flexionados.',
          'Eleve os braços lateralmente até a altura dos ombros.',
          'Desça controlado sem deixar o peso cair.',
        ],
        postureTips: [
          'Tronco estável, sem inclinar para ajudar o movimento.',
          'Cotovelo levemente acima da mão durante a subida.',
        ],
        commonMistakes: [
          'Usar carga alta demais e perder amplitude.',
          'Balançar o tronco para impulsionar o peso.',
        ],
      },
      {
        id: 'pl-int-u1-triceps',
        name: 'Tríceps na polia (rope pushdown)',
        muscleGroup: 'Tríceps',
        primaryMuscles: ['triceps'],
        sets: 3,
        reps: '10',
        restSeconds: ACCESSORY_REST,
        animation: 'triceps_extension',
        equipment: 'Polia alta + corda',
        tier: 'free',
        instructions: [
          'Segure a corda com pegada neutra, cotovelos fixos ao lado do corpo.',
          'Estenda os braços para baixo até o bloqueio completo.',
          'Retorne controlado sem deixar os cotovelos subirem.',
        ],
        postureTips: [
          'Separe levemente as pontas da corda no final do movimento.',
          'Core ativado, tronco estável.',
        ],
        commonMistakes: [
          'Abrir os cotovelos para os lados.',
          'Inclinar o tronco à frente para ajudar.',
        ],
      },
    ],
  },
  {
    id: 'pl-inter-lower-2',
    title: 'Lower 2',
    goal: 'ganhar_massa',
    level: 'intermediario',
    durationMinutes: 75,
    tier: 'free',
    hidden: true,
    exercises: [
      {
        id: 'pl-int-l2-deadlift',
        name: 'Levantamento terra',
        muscleGroup: 'Posterior / Costas',
        primaryMuscles: ['costas', 'posterior_gluteos'],
        sets: 3,
        reps: '3',
        restSeconds: MAIN_LIFT_REST,
        animation: 'hip_hinge',
        equipment: 'Barra',
        tier: 'free',
        instructions: [
          'Pés na largura do quadril, barra próxima às canelas.',
          'Suba estendendo quadril e joelhos simultaneamente, barra rente ao corpo.',
          'Desça controlado revertendo o movimento.',
        ],
        postureTips: [
          'RPE 8–9 nas séries de trabalho.',
          'Use cinto nas séries mais pesadas, se necessário.',
          'Descanso de 3 a 5 minutos entre as séries.',
        ],
        commonMistakes: [
          'Arredondar a lombar.',
          'Hiperestender no topo do movimento.',
        ],
      },
      {
        id: 'pl-int-l2-squat-pause',
        name: 'Agachamento pausado (2s no fundo)',
        muscleGroup: 'Quadríceps',
        primaryMuscles: ['quadriceps', 'posterior_gluteos'],
        sets: 3,
        reps: '4',
        restSeconds: MAIN_LIFT_REST,
        animation: 'squat',
        equipment: 'Barra',
        tier: 'free',
        instructions: [
          'Desça até a profundidade desejada e mantenha a posição por 2 segundos.',
          'Mantenha tensão no core e joelhos alinhados durante a pausa.',
          'Suba explosivo mas controlado após a pausa.',
        ],
        postureTips: [
          'A pausa elimina o reflexo de estiramento e fortalece o fundo do agachamento.',
          'Não relaxe a coluna durante a pausa.',
        ],
        commonMistakes: [
          'Perder tensão no core na pausa (coluna arredonda).',
          'Subir com os joelhos colapsando para dentro.',
        ],
      },
      {
        id: 'pl-int-l2-hip-rdl',
        name: 'Elevação pélvica ou RDL',
        muscleGroup: 'Glúteos / Posterior',
        primaryMuscles: ['posterior_gluteos'],
        sets: 3,
        reps: '8',
        restSeconds: ACCESSORY_REST,
        animation: 'hip_thrust',
        equipment: 'Barra ou halteres',
        tier: 'free',
        instructions: [
          'Opção 1 — Elevação pélvica: costas no banco, barra no quadril, estenda o quadril até alinhar tronco e coxas.',
          'Opção 2 — RDL: barra nas mãos, quadril para trás, desça até sentir alongamento no posterior.',
          'Escolha a variação conforme equipamento e preferência.',
        ],
        postureTips: [
          'No RDL, joelhos quase retos, coluna neutra.',
          'No hip thrust, pause 1s no topo contraindo glúteos.',
        ],
        commonMistakes: [
          'Hiperextender a lombar no topo do hip thrust.',
          'Flexionar demais os joelhos no RDL (vira agachamento).',
        ],
      },
      {
        id: 'pl-int-l2-extension',
        name: 'Cadeira extensora',
        muscleGroup: 'Quadríceps',
        primaryMuscles: ['quadriceps'],
        sets: 3,
        reps: '12',
        restSeconds: ACCESSORY_REST,
        animation: 'leg_extension',
        equipment: 'Máquina extensora',
        tier: 'free',
        instructions: [
          'Ajuste o encosto e o rolo na altura do tornozelo.',
          'Estenda as pernas até o bloqueio, contraindo o quadríceps.',
          'Desça controlado sem deixar o peso bater.',
        ],
        postureTips: [
          'Movimento controlado, sem embalo.',
          'Descanso de 1,5 a 2 minutos entre as séries.',
        ],
        commonMistakes: [
          'Usar carga alta demais e perder amplitude.',
          'Levantar o quadril do assento.',
        ],
      },
      {
        id: 'pl-int-l2-calf',
        name: 'Panturrilha em pé',
        muscleGroup: 'Panturrilha',
        primaryMuscles: ['panturrilha'],
        sets: 4,
        reps: '10',
        restSeconds: ACCESSORY_REST,
        animation: 'calf_raise',
        equipment: 'Máquina ou step',
        tier: 'free',
        instructions: [
          'Apoie as pontas dos pés na plataforma, calcanhares livres.',
          'Suba na ponta dos pés até a contração máxima da panturrilha.',
          'Desça controlado até sentir alongamento completo.',
        ],
        postureTips: [
          'Pause 1 segundo no topo de cada repetição.',
          'Joelhos levemente flexionados, não travados.',
        ],
        commonMistakes: [
          'Amplitude incompleta na descida.',
          'Usar impulso das pernas para subir.',
        ],
      },
    ],
  },
  {
    id: 'pl-inter-upper-2',
    title: 'Upper 2',
    goal: 'ganhar_massa',
    level: 'intermediario',
    durationMinutes: 70,
    tier: 'free',
    hidden: true,
    exercises: [
      {
        id: 'pl-int-u2-spoto',
        name: 'Supino Spoto / pausado',
        muscleGroup: 'Peito',
        primaryMuscles: ['peito', 'triceps'],
        sets: 3,
        reps: '5',
        restSeconds: MAIN_LIFT_REST,
        animation: 'chest_press',
        equipment: 'Barra',
        tier: 'free',
        instructions: [
          'Spoto press: desça a barra até 2–3 cm acima do peito, pause brevemente e empurre.',
          'Supino pausado: desça até o peito, pause 1–2 segundos e suba.',
          'Ambas corrigem a trava no supino e fortalecem a saída do peito.',
        ],
        postureTips: [
          'Escápulas retraídas durante toda a série.',
          'RPE 8–9: mantenha 1–2 repetições de reserva.',
        ],
        commonMistakes: [
          'Relaxar as escápulas durante a pausa.',
          'Perder tensão no core e elevar o quadril.',
        ],
      },
      {
        id: 'pl-int-u2-ohp-db',
        name: 'Desenvolvimento com halteres (OHP)',
        muscleGroup: 'Ombros',
        primaryMuscles: ['ombros', 'triceps'],
        sets: 3,
        reps: '6-8',
        restSeconds: MAIN_LIFT_REST,
        animation: 'shoulder_press',
        equipment: 'Halteres',
        tier: 'free',
        instructions: [
          'Sentado ou em pé, halteres na altura dos ombros.',
          'Empurre para cima até estender os braços.',
          'Desça controlado até a altura dos ombros.',
        ],
        postureTips: [
          'Core e glúteos ativados para proteger a lombar.',
          'Descanso de 2 a 3 minutos entre as séries.',
        ],
        commonMistakes: [
          'Arquear excessivamente a lombar.',
          'Usar impulso das pernas.',
        ],
      },
      {
        id: 'pl-int-u2-pull',
        name: 'Barra fixa com carga ou puxada',
        muscleGroup: 'Costas',
        primaryMuscles: ['costas', 'biceps'],
        sets: 4,
        reps: '6',
        restSeconds: MAIN_LIFT_REST,
        animation: 'pull_up',
        equipment: 'Barra fixa + cinto de peso ou polia',
        tier: 'free',
        instructions: [
          'Opção 1 — Barra fixa com carga: use cinto de peso, puxe até o queixo passar da barra.',
          'Opção 2 — Puxada na polia: puxe a barra até o peito com pegada pronada.',
          'Priorize amplitude completa e controle na descida.',
        ],
        postureTips: [
          'Puxe com as costas, não só com os braços.',
          'RPE 8–9 nas séries de trabalho.',
        ],
        commonMistakes: [
          'Usar embalo do corpo (kipping) fora de contexto.',
          'Amplitude incompleta na descida.',
        ],
      },
      {
        id: 'pl-int-u2-facepull',
        name: 'Face pull',
        muscleGroup: 'Ombros / Costas',
        primaryMuscles: ['ombros', 'costas'],
        sets: 3,
        reps: '15',
        restSeconds: ACCESSORY_REST,
        animation: 'face_pull',
        equipment: 'Polia alta + corda',
        tier: 'free',
        instructions: [
          'Segure a corda com pegada neutra, cotovelos altos.',
          'Puxe a corda em direção ao rosto, abrindo os cotovelos para os lados.',
          'Contraia a parte posterior do ombro no final do movimento.',
        ],
        postureTips: [
          'Essencial para integridade do ombro no powerlifting.',
          'Movimento controlado, sem usar embalo do tronco.',
        ],
        commonMistakes: [
          'Puxar muito baixo (vira remada).',
          'Deixar os cotovelos caírem durante a puxada.',
        ],
      },
      {
        id: 'pl-int-u2-curl',
        name: 'Rosca direta com barra',
        muscleGroup: 'Bíceps',
        primaryMuscles: ['biceps'],
        sets: 3,
        reps: '10',
        restSeconds: ACCESSORY_REST,
        animation: 'curl',
        equipment: 'Barra reta ou W',
        tier: 'free',
        instructions: [
          'Em pé, barra na largura dos ombros, cotovelos fixos ao lado do corpo.',
          'Flexione os cotovelos trazendo a barra em direção aos ombros.',
          'Desça controlado até estender os braços.',
        ],
        postureTips: [
          'Tronco estável, sem balançar para ajudar.',
          'Descanso de 1,5 a 2 minutos entre as séries.',
        ],
        commonMistakes: [
          'Usar embalo do tronco para levantar o peso.',
          'Cotovelos avançando à frente do corpo.',
        ],
      },
    ],
  },

  ...ADVANCED_WEEK1_WORKOUTS,
  ...ADVANCED_WEEK2_WORKOUTS,
  ...ADVANCED_WEEK3_WORKOUTS,
  ...ADVANCED_WEEK4_WORKOUTS,
  ...ADVANCED_WEEK5_WORKOUTS,
  ...ADVANCED_WEEK6_WORKOUTS,
  ...ADVANCED_WEEK7_WORKOUTS,
  ...ADVANCED_WEEK8_WORKOUTS,
  ...ADVANCED_WEEK9_WORKOUTS,
  ...ADVANCED_WEEK10_WORKOUTS,
  ...ADVANCED_WEEK11_WORKOUTS,
  ...ADVANCED_WEEK12_WORKOUTS,
];

export const POWERLIFTING_TAGLINE = 'Do primeiro agachamento ao palco — um app, uma metodologia.';

export const POWERLIFTING_TAGLINE_SHORT = 'Do básico ao palco, no mesmo app.';

export const POWERLIFTING_INTRO =
  'Uma trilha completa de força nos três levantamentos — do iniciante que está aprendendo a técnica ao atleta que prepara a competição. Progressão de carga, periodização e metodologia profissional em um só lugar.';

export const POWERLIFTING_ADVANCED_PRICE = 'R$ 99,90';

export const POWERLIFTING_ADVANCED_PROGRESS_VIDEO = require('../../assets/powerlifting/advanced-progress.mp4');

export interface PowerliftingAdvancedProgressClip {
  id: string;
  source: number;
  poster: number;
  highlight: string;
  title: string;
  subtitle: string;
}

export const POWERLIFTING_ADVANCED_PROGRESS_VIDEOS: PowerliftingAdvancedProgressClip[] = [
  {
    id: 'progress-210',
    source: POWERLIFTING_ADVANCED_PROGRESS_VIDEO,
    poster: require('../../assets/powerlifting/advanced-progress-thumb.png'),
    highlight: '210 kg',
    title: 'Metodologia aplicada na prática',
    subtitle: 'Resultado de periodização estruturada para o desenvolvimento de força máxima',
  },
  {
    id: 'progress-bench-310',
    source: require('../../assets/powerlifting/advanced-bench-310.mp4'),
    poster: require('../../assets/powerlifting/advanced-bench-310-thumb.png'),
    highlight: '310 kg',
    title: 'Supino equipado',
    subtitle: 'Execução real com equipamento de competição e prescrição periodizada',
  },
];

export const POWERLIFTING_ADVANCED_PROGRESS_CAPTION = {
  highlight: POWERLIFTING_ADVANCED_PROGRESS_VIDEOS[0].highlight,
  title: POWERLIFTING_ADVANCED_PROGRESS_VIDEOS[0].title,
  subtitle: POWERLIFTING_ADVANCED_PROGRESS_VIDEOS[0].subtitle,
};

export const POWERLIFTING_ADVANCED_PAYWALL_SUBTITLE =
  'Macrociclo de 12 semanas com prescrição técnica para atletas de powerlifting em busca de performance nos três movimentos de competição.';

export const POWERLIFTING_ADVANCED_PRO_NOTE =
  'Programa especializado desenvolvido com base em princípios de periodização e treinamento de força máxima. Indicado para atletas com domínio técnico consolidado que desejam elevar o desempenho em agachamento, supino e levantamento terra.';

export const POWERLIFTING_ADVANCED_SUMMARY =
  'Programa especializado em ganho de força, elaborado por educador físico credenciado. Periodização progressiva de 12 semanas com prescrição em percentual do 1RM.';

export const POWERLIFTING_ADVANCED_PAYWALL_LEAD =
  'Diferente de rotinas genéricas de academia, este é um programa completo de powerlifting — estruturado para competidores e atletas avançados que necessitam de progressão planejada, controle de volume e intensidade, e preparação específica para o palco ou para recordes pessoais.';

export const POWERLIFTING_ADVANCED_FEATURES = [
  'Conteúdo técnico elaborado e validado por educador físico (CREF)',
  'Macrociclo de 12 semanas com prescrição em percentual do 1RM',
  'Variações competitivas: terra com bloco, déficit, board press e trabalho com pausas',
  'Semanas de intensificação, deload e protocolo de teste de máximo (até 105–110%)',
  'Acessórios direcionados ao reforço de agachamento, supino e levantamento terra',
  '3 meses de acesso ao programa completo no app',
];

export const POWERLIFTING_ADVANCED_PRICE_NOTE = 'Os níveis Básico e Intermediário permanecem gratuitos';

export const POWERLIFTING_ADVANCED_PROFILE_LOCKED =
  'Periodização avançada para força máxima · 3 meses de acesso';

export const POWERLIFTING_ADVANCED_PROFILE_UNLOCKED =
  'Acesso ativo — macrociclo completo de 12 semanas disponível';

export const POWERLIFTING_ADVANCED_UNLOCK_ALERT = {
  title: 'Programa liberado',
  message:
    'O macrociclo Powerlifting Avançado está disponível por 3 meses. Execute as sessões conforme a periodização, registre suas cargas e respeite os dias de recuperação.',
};

export function isPowerliftingAdvancedLevel(levelId: PowerliftingLevelId): boolean {
  return levelId === 'avancado';
}

export function isPowerliftingAdvancedLocked(
  levelId: PowerliftingLevelId,
  isActive: boolean
): boolean {
  return isPowerliftingAdvancedLevel(levelId) && !isActive;
}

export const POWERLIFTING_LEVELS: PowerliftingLevel[] = [
  {
    id: 'basico',
    title: 'Básico',
    subtitle: 'Iniciante — estrutura AB',
    description:
      'Para quem está começando no powerlifting. Frequência alta dos movimentos principais para consolidar a técnica e garantir progressão linear (aumentar um pouco de peso a cada treino).',
    focus: 'Técnica · Progressão linear · 3x por semana',
    schedule: 'Segunda (A) · Quarta (B) · Sexta (A) — alternando nas semanas',
    restNotes: '3–5 min nos exercícios principais · 1,5–2 min nos acessórios',
    color: '#34D399',
    icon: 'leaf-outline',
    workoutIds: ['pl-basico-a', 'pl-basico-b'],
  },
  {
    id: 'intermediario',
    title: 'Intermediário',
    subtitle: 'Upper/Lower — 4x por semana',
    description:
      'A progressão linear semanal diminui neste nível. O volume é separado por grupos musculares com variações dos básicos para corrigir pontos fracos — como a saída do chão no terra ou a trava no supino.',
    focus: 'RPE 8–9 · Variações dos lifts · Upper/Lower',
    schedule: 'Segunda (Lower 1) · Terça (Upper 1) · Quinta (Lower 2) · Sexta (Upper 2)',
    restNotes: 'RPE 8–9 (1–2 repetições de reserva) · 3–5 min nos principais · 1,5–2 min nos acessórios',
    tips: [
      'Mobilidade diária: dedique 10 minutos antes do treino para tornozelos, quadril e ombros.',
      'Regra das pausas: no supino, pause a barra no peito por 1 segundo antes de subir (simula ordem do árbitro).',
      'Cinto e acessórios: use o cinto apenas nas séries mais pesadas dos levantamentos principais.',
    ],
    color: '#F59E0B',
    icon: 'trending-up-outline',
    workoutIds: ['pl-inter-lower-1', 'pl-inter-upper-1', 'pl-inter-lower-2', 'pl-inter-upper-2'],
  },
  {
    id: 'avancado',
    title: 'Avançado',
    subtitle: 'Periodização competitiva — 12 semanas',
    description:
      'Programa especializado em ganho de força, desenvolvido por educador físico. Estrutura de 12 semanas com periodização progressiva, prescrição em % do 1RM e protocolo voltado à performance em competição.',
    focus: 'Força máxima · Periodização · Alta performance',
    schedule: 'Macrociclo de 12 semanas — segunda a sexta (semana 12 com protocolo de máximo)',
    restNotes: '3–5 min nos levantamentos principais · aquecimento progressivo obrigatório',
    premiumPrice: POWERLIFTING_ADVANCED_PRICE,
    premiumLabel: '3 meses de acesso',
    tips: [
      'Estabeleça seu 1RM atual em cada movimento (agachamento, supino e terra) antes de iniciar o macrociclo.',
      'Registre volume, carga e percepção de esforço em cada sessão para monitorar a adaptação ao programa.',
      'Utilize equipamentos de competição (cinto, joelheiras, munhequeiras) conforme a intensidade prescrita.',
    ],
    color: '#EF4444',
    icon: 'trophy-outline',
    workoutIds: [
      'pl-adv-w1-seg',
      'pl-adv-w1-ter',
      'pl-adv-w1-qua',
      'pl-adv-w1-qui',
      'pl-adv-w1-sex',
      'pl-adv-w2-seg',
      'pl-adv-w2-ter',
      'pl-adv-w2-qua',
      'pl-adv-w2-qui',
      'pl-adv-w2-sex',
      'pl-adv-w3-seg',
      'pl-adv-w3-ter',
      'pl-adv-w3-qua',
      'pl-adv-w3-qui',
      'pl-adv-w3-sex',
      'pl-adv-w4-seg',
      'pl-adv-w4-ter',
      'pl-adv-w4-qua',
      'pl-adv-w4-qui',
      'pl-adv-w4-sex',
      'pl-adv-w5-seg',
      'pl-adv-w5-ter',
      'pl-adv-w5-qua',
      'pl-adv-w5-qui',
      'pl-adv-w5-sex',
      'pl-adv-w6-seg',
      'pl-adv-w6-ter',
      'pl-adv-w6-qua',
      'pl-adv-w6-qui',
      'pl-adv-w6-sex',
      'pl-adv-w7-seg',
      'pl-adv-w7-ter',
      'pl-adv-w7-qua',
      'pl-adv-w7-qui',
      'pl-adv-w7-sex',
      'pl-adv-w8-seg',
      'pl-adv-w8-ter',
      'pl-adv-w8-qua',
      'pl-adv-w8-qui',
      'pl-adv-w8-sex',
      'pl-adv-w9-seg',
      'pl-adv-w9-ter',
      'pl-adv-w9-qua',
      'pl-adv-w9-qui',
      'pl-adv-w9-sex',
      'pl-adv-w10-seg',
      'pl-adv-w10-ter',
      'pl-adv-w10-qua',
      'pl-adv-w10-qui',
      'pl-adv-w10-sex',
      'pl-adv-w11-seg',
      'pl-adv-w11-ter',
      'pl-adv-w11-qua',
      'pl-adv-w11-qui',
      'pl-adv-w11-sex',
      'pl-adv-w12-seg',
      'pl-adv-w12-qua',
      'pl-adv-w12-sab',
    ],
  },
];

export function getPowerliftingLevel(levelId: PowerliftingLevelId): PowerliftingLevel | undefined {
  return POWERLIFTING_LEVELS.find((level) => level.id === levelId);
}

export function getPowerliftingWorkouts(levelId: PowerliftingLevelId): WorkoutPlan[] {
  const level = getPowerliftingLevel(levelId);
  if (!level) return [];

  return level.workoutIds
    .map((id) => POWERLIFTING_WORKOUTS.find((workout) => workout.id === id))
    .filter((workout): workout is WorkoutPlan => Boolean(workout));
}

export function getPowerliftingWorkoutCount(levelId: PowerliftingLevelId): number {
  return getPowerliftingWorkouts(levelId).length;
}

export type PowerliftingWeekGroup = {
  week: number;
  workoutIds: string[];
  workoutCount: number;
  totalMinutes: number;
};

export function getPowerliftingWeekGroups(levelId: PowerliftingLevelId): PowerliftingWeekGroup[] {
  if (levelId !== 'avancado') return [];

  const byWeek = new Map<number, string[]>();
  for (const workout of getPowerliftingWorkouts(levelId)) {
    const week = POWERLIFTING_WORKOUT_WEEK[workout.id];
    if (!week) continue;
    const ids = byWeek.get(week) ?? [];
    ids.push(workout.id);
    byWeek.set(week, ids);
  }

  return Array.from(byWeek.entries())
    .sort(([a], [b]) => a - b)
    .map(([week, workoutIds]) => {
      const workouts = workoutIds
        .map((id) => POWERLIFTING_WORKOUTS.find((w) => w.id === id))
        .filter((w): w is WorkoutPlan => Boolean(w));
      return {
        week,
        workoutIds,
        workoutCount: workouts.length,
        totalMinutes: workouts.reduce((sum, w) => sum + w.durationMinutes, 0),
      };
    });
}

export function getPowerliftingWorkoutsForWeek(levelId: PowerliftingLevelId, week: number): WorkoutPlan[] {
  const group = getPowerliftingWeekGroups(levelId).find((g) => g.week === week);
  if (!group) return [];

  return group.workoutIds
    .map((id) => POWERLIFTING_WORKOUTS.find((workout) => workout.id === id))
    .filter((workout): workout is WorkoutPlan => Boolean(workout));
}

export const POWERLIFTING_WORKOUT_SCHEDULE: Record<string, string> = {
  'pl-basico-a': 'Segunda e Sexta',
  'pl-basico-b': 'Quarta',
  'pl-inter-lower-1': 'Segunda — foco agachamento',
  'pl-inter-upper-1': 'Terça — foco supino',
  'pl-inter-lower-2': 'Quinta — foco levantamento terra',
  'pl-inter-upper-2': 'Sexta — volume empurrar/puxar',
  'pl-adv-w1-seg': 'Segunda-feira',
  'pl-adv-w1-ter': 'Terça-feira',
  'pl-adv-w1-qua': 'Quarta-feira',
  'pl-adv-w1-qui': 'Quinta-feira',
  'pl-adv-w1-sex': 'Sexta-feira',
  'pl-adv-w2-seg': 'Segunda-feira',
  'pl-adv-w2-ter': 'Terça-feira',
  'pl-adv-w2-qua': 'Quarta-feira',
  'pl-adv-w2-qui': 'Quinta-feira',
  'pl-adv-w2-sex': 'Sexta-feira',
  'pl-adv-w3-seg': 'Segunda-feira',
  'pl-adv-w3-ter': 'Terça-feira',
  'pl-adv-w3-qua': 'Quarta-feira',
  'pl-adv-w3-qui': 'Quinta-feira',
  'pl-adv-w3-sex': 'Sexta-feira',
  'pl-adv-w4-seg': 'Segunda-feira',
  'pl-adv-w4-ter': 'Terça-feira',
  'pl-adv-w4-qua': 'Quarta-feira',
  'pl-adv-w4-qui': 'Quinta-feira',
  'pl-adv-w4-sex': 'Sexta-feira',
  'pl-adv-w5-seg': 'Segunda-feira',
  'pl-adv-w5-ter': 'Terça-feira',
  'pl-adv-w5-qua': 'Quarta-feira',
  'pl-adv-w5-qui': 'Quinta-feira',
  'pl-adv-w5-sex': 'Sexta-feira',
  'pl-adv-w6-seg': 'Segunda-feira',
  'pl-adv-w6-ter': 'Terça-feira',
  'pl-adv-w6-qua': 'Quarta-feira',
  'pl-adv-w6-qui': 'Quinta-feira',
  'pl-adv-w6-sex': 'Sexta-feira',
  'pl-adv-w7-seg': 'Segunda-feira',
  'pl-adv-w7-ter': 'Terça-feira',
  'pl-adv-w7-qua': 'Quarta-feira',
  'pl-adv-w7-qui': 'Quinta-feira',
  'pl-adv-w7-sex': 'Sexta-feira',
  'pl-adv-w8-seg': 'Segunda-feira',
  'pl-adv-w8-ter': 'Terça-feira',
  'pl-adv-w8-qua': 'Quarta-feira',
  'pl-adv-w8-qui': 'Quinta-feira',
  'pl-adv-w8-sex': 'Sexta-feira',
  'pl-adv-w9-seg': 'Segunda-feira',
  'pl-adv-w9-ter': 'Terça-feira',
  'pl-adv-w9-qua': 'Quarta-feira',
  'pl-adv-w9-qui': 'Quinta-feira',
  'pl-adv-w9-sex': 'Sexta-feira',
  'pl-adv-w10-seg': 'Segunda-feira',
  'pl-adv-w10-ter': 'Terça-feira',
  'pl-adv-w10-qua': 'Quarta-feira',
  'pl-adv-w10-qui': 'Quinta-feira',
  'pl-adv-w10-sex': 'Sexta-feira',
  'pl-adv-w11-seg': 'Segunda-feira',
  'pl-adv-w11-ter': 'Terça-feira',
  'pl-adv-w11-qua': 'Quarta-feira',
  'pl-adv-w11-qui': 'Quinta-feira',
  'pl-adv-w11-sex': 'Sexta-feira',
  'pl-adv-w12-seg': 'Segunda-feira',
  'pl-adv-w12-qua': 'Quarta-feira',
  'pl-adv-w12-sab': 'Sábado — teste de max',
};

/** Semana da planilha avançada (quando aplicável). */
export const POWERLIFTING_WORKOUT_WEEK: Record<string, number> = {
  'pl-adv-w1-seg': 1,
  'pl-adv-w1-ter': 1,
  'pl-adv-w1-qua': 1,
  'pl-adv-w1-qui': 1,
  'pl-adv-w1-sex': 1,
  'pl-adv-w2-seg': 2,
  'pl-adv-w2-ter': 2,
  'pl-adv-w2-qua': 2,
  'pl-adv-w2-qui': 2,
  'pl-adv-w2-sex': 2,
  'pl-adv-w3-seg': 3,
  'pl-adv-w3-ter': 3,
  'pl-adv-w3-qua': 3,
  'pl-adv-w3-qui': 3,
  'pl-adv-w3-sex': 3,
  'pl-adv-w4-seg': 4,
  'pl-adv-w4-ter': 4,
  'pl-adv-w4-qua': 4,
  'pl-adv-w4-qui': 4,
  'pl-adv-w4-sex': 4,
  'pl-adv-w5-seg': 5,
  'pl-adv-w5-ter': 5,
  'pl-adv-w5-qua': 5,
  'pl-adv-w5-qui': 5,
  'pl-adv-w5-sex': 5,
  'pl-adv-w6-seg': 6,
  'pl-adv-w6-ter': 6,
  'pl-adv-w6-qua': 6,
  'pl-adv-w6-qui': 6,
  'pl-adv-w6-sex': 6,
  'pl-adv-w7-seg': 7,
  'pl-adv-w7-ter': 7,
  'pl-adv-w7-qua': 7,
  'pl-adv-w7-qui': 7,
  'pl-adv-w7-sex': 7,
  'pl-adv-w8-seg': 8,
  'pl-adv-w8-ter': 8,
  'pl-adv-w8-qua': 8,
  'pl-adv-w8-qui': 8,
  'pl-adv-w8-sex': 8,
  'pl-adv-w9-seg': 9,
  'pl-adv-w9-ter': 9,
  'pl-adv-w9-qua': 9,
  'pl-adv-w9-qui': 9,
  'pl-adv-w9-sex': 9,
  'pl-adv-w10-seg': 10,
  'pl-adv-w10-ter': 10,
  'pl-adv-w10-qua': 10,
  'pl-adv-w10-qui': 10,
  'pl-adv-w10-sex': 10,
  'pl-adv-w11-seg': 11,
  'pl-adv-w11-ter': 11,
  'pl-adv-w11-qua': 11,
  'pl-adv-w11-qui': 11,
  'pl-adv-w11-sex': 11,
  'pl-adv-w12-seg': 12,
  'pl-adv-w12-qua': 12,
  'pl-adv-w12-sab': 12,
};
