import { ENCYCLOPEDIA_ARTICLES } from './encyclopedia';
import { SPORTS_NUTRITION_PRODUCTS } from './sportsNutrition';
import { SUPPLEMENTS } from './supplements';
import { WORKOUTS, isNoEquipmentExercise, isNoEquipmentWorkout } from './workouts';
import { MainTabParamList } from '../navigation/types';
import { matchesSearchQuery } from '../utils/appSearch';

export type AppSearchKind =
  | 'workout'
  | 'exercise'
  | 'sportsNutrition'
  | 'supplement'
  | 'encyclopedia'
  | 'destination';

export interface AppSearchTarget {
  tab: keyof MainTabParamList;
  screen?: string;
  params?: object;
}

export interface AppSearchEntry {
  id: string;
  kind: AppSearchKind;
  title: string;
  subtitle?: string;
  keywords: string[];
  target: AppSearchTarget;
}

const APP_DESTINATIONS: AppSearchEntry[] = [
  {
    id: 'dest-measurements',
    kind: 'destination',
    title: 'Medidas corporais',
    subtitle: 'Perfil',
    keywords: ['medidas', 'corporais', 'cintura', 'braço', 'perna', 'fita'],
    target: { tab: 'Perfil', screen: 'BodyMeasurements' },
  },
  {
    id: 'dest-messages',
    kind: 'destination',
    title: 'Mensagens',
    subtitle: 'Comunidade',
    keywords: ['mensagens', 'chat', 'instrutor', 'criador', 'contato'],
    target: { tab: 'Comunidade', screen: 'MessagesHub' },
  },
  {
    id: 'dest-body-metrics',
    kind: 'destination',
    title: 'Peso, altura e idade',
    subtitle: 'Perfil',
    keywords: ['peso', 'altura', 'idade', 'dados corporais', 'imc'],
    target: { tab: 'Perfil', screen: 'BodyMetricsSettings' },
  },
  {
    id: 'dest-settings',
    kind: 'destination',
    title: 'Configurações',
    subtitle: 'Perfil',
    keywords: ['configurações', 'idioma', 'notificações', 'unidades', 'conta'],
    target: { tab: 'Perfil', screen: 'Settings' },
  },
  {
    id: 'dest-reminders',
    kind: 'destination',
    title: 'Lembretes de treino e dieta',
    subtitle: 'Perfil',
    keywords: ['lembrete', 'notificação', 'hora do treino', 'dieta', 'alarme'],
    target: { tab: 'Perfil', screen: 'ReminderSettings' },
  },
  {
    id: 'dest-apple-health',
    kind: 'destination',
    title: 'Apple Saúde',
    subtitle: 'Perfil',
    keywords: ['apple', 'saude', 'health', 'healthkit', 'sincronizar'],
    target: { tab: 'Perfil', screen: 'AppleHealthSettings' },
  },
  {
    id: 'dest-powerlifting',
    kind: 'destination',
    title: 'Powerlifting',
    subtitle: 'Treinos',
    keywords: ['powerlifting', 'agachamento', 'supino', 'terra', 'força'],
    target: { tab: 'Treinos', screen: 'Powerlifting' },
  },
  {
    id: 'dest-home-workouts',
    kind: 'destination',
    title: 'Treino em casa',
    subtitle: 'Sem equipamento',
    keywords: ['casa', 'sem equipamento', 'bodyweight', 'peso do corpo', 'home', 'calistenia'],
    target: { tab: 'TreinoEmCasa', screen: 'HomeWorkoutsList' },
  },
  {
    id: 'dest-muscle-groups',
    kind: 'destination',
    title: 'Grupos musculares',
    subtitle: 'Treinos',
    keywords: ['músculo', 'grupo', 'peito', 'costas', 'pernas'],
    target: { tab: 'Treinos', screen: 'MuscleGroups' },
  },
  {
    id: 'dest-peptideos',
    kind: 'destination',
    title: 'Peptídeos',
    subtitle: 'Nutrição esportiva',
    keywords: ['peptídeo', 'peptideo', 'bpc-157', 'tb-500', 'colágeno', 'semaglutida', 'sono', 'dsip'],
    target: { tab: 'Dieta', screen: 'SportsNutrition', params: { categoryId: 'peptideos' } },
  },
  {
    id: 'dest-sports-nutrition',
    kind: 'destination',
    title: 'Nutrição esportiva',
    subtitle: 'Dieta',
    keywords: ['nutrição', 'esportiva', 'whey', 'creatina', 'peptídeos', 'suplemento'],
    target: { tab: 'Dieta', screen: 'SportsNutrition' },
  },
  {
    id: 'dest-supplements',
    kind: 'destination',
    title: 'Guia de suplementos',
    subtitle: 'Dieta',
    keywords: ['suplemento', 'coq10', 'ômega', 'magnésio', 'zinco'],
    target: { tab: 'Dieta', screen: 'Supplements' },
  },
  {
    id: 'dest-encyclopedia',
    kind: 'destination',
    title: 'Enciclopédia fitness',
    subtitle: 'Dieta',
    keywords: ['enciclopédia', 'artigo', 'educação', 'aprender'],
    target: { tab: 'Dieta', screen: 'Encyclopedia' },
  },
  {
    id: 'dest-food-composition',
    kind: 'destination',
    title: 'Composição dos alimentos',
    subtitle: 'Dieta',
    keywords: ['alimento', 'caloria', 'proteína', 'tabela', 'composição'],
    target: { tab: 'Dieta', screen: 'FoodComposition' },
  },
  {
    id: 'dest-progress-report',
    kind: 'destination',
    title: 'Relatório de progresso',
    subtitle: 'Perfil',
    keywords: ['relatório', 'progresso', 'pdf', 'evolução'],
    target: { tab: 'Perfil', screen: 'ProgressReport' },
  },
  {
    id: 'dest-progress-photos',
    kind: 'destination',
    title: 'Fotos de evolução',
    subtitle: 'Perfil',
    keywords: ['foto', 'evolução', 'antes', 'depois'],
    target: { tab: 'Perfil', screen: 'ProgressPhotos' },
  },
  {
    id: 'dest-exam-analysis',
    kind: 'destination',
    title: 'Análise de exames',
    subtitle: 'Premium',
    keywords: ['exame', 'sangue', 'laboratório', 'análise'],
    target: { tab: 'TreinosPremium', screen: 'ExamAnalysis' },
  },
  {
    id: 'dest-custom-plan',
    kind: 'destination',
    title: 'Treino personalizado',
    subtitle: 'Perfil',
    keywords: ['personalizado', 'professor', 'plano', 'whatsapp'],
    target: { tab: 'Perfil', screen: 'CustomPlan' },
  },
  {
    id: 'dest-injuries',
    kind: 'destination',
    title: 'Lesões e limitações',
    subtitle: 'Perfil',
    keywords: ['lesão', 'machucado', 'limitação', 'dor'],
    target: { tab: 'Perfil', screen: 'InjurySettings' },
  },
];

function buildIndex(): AppSearchEntry[] {
  const entries: AppSearchEntry[] = [...APP_DESTINATIONS];

  for (const workout of WORKOUTS) {
    const homeTab = isNoEquipmentWorkout(workout);
    if (!workout.hidden) {
      entries.push({
        id: `workout-${workout.id}`,
        kind: 'workout',
        title: workout.title,
        subtitle: workout.level ? `Treino · ${workout.level}` : 'Treino',
        keywords: [workout.goal, workout.level, workout.durationMinutes?.toString() ?? ''],
        target: {
          tab: homeTab ? 'TreinoEmCasa' : 'Treinos',
          screen: 'WorkoutDetail',
          params: { workoutId: workout.id },
        },
      });
    }

    for (const exercise of workout.exercises) {
      const exerciseHome = homeTab || isNoEquipmentExercise(exercise) || /sem equipamento/i.test(exercise.name);
      entries.push({
        id: `exercise-${workout.id}-${exercise.id}`,
        kind: 'exercise',
        title: exercise.name,
        subtitle: workout.title,
        keywords: [exercise.muscleGroup, workout.title],
        target: {
          tab: exerciseHome ? 'TreinoEmCasa' : 'Treinos',
          screen: 'ExerciseDetail',
          params: { workoutId: workout.id, exerciseId: exercise.id },
        },
      });
    }
  }

  for (const product of SPORTS_NUTRITION_PRODUCTS) {
    entries.push({
      id: `sn-${product.id}`,
      kind: 'sportsNutrition',
      title: product.name,
      subtitle: 'Nutrição esportiva',
      keywords: [product.shortDescription, product.categoryId],
      target: {
        tab: 'Dieta',
        screen: 'SportsNutritionProductDetail',
        params: { productId: product.id },
      },
    });
  }

  for (const supplement of SUPPLEMENTS) {
    entries.push({
      id: `supp-${supplement.id}`,
      kind: 'supplement',
      title: supplement.name,
      subtitle: 'Guia de suplementos',
      keywords: [supplement.shortDescription, supplement.mainFunction],
      target: {
        tab: 'Dieta',
        screen: 'SupplementDetail',
        params: { supplementId: supplement.id },
      },
    });
  }

  for (const article of ENCYCLOPEDIA_ARTICLES) {
    entries.push({
      id: `ency-${article.id}`,
      kind: 'encyclopedia',
      title: article.title,
      subtitle: 'Enciclopédia',
      keywords: [article.shortDescription, article.categoryId],
      target: {
        tab: 'Dieta',
        screen: 'EncyclopediaArticle',
        params: { articleId: article.id },
      },
    });
  }

  return entries;
}

const SEARCH_INDEX = buildIndex();

export function searchAppContent(query: string, limit = 50): AppSearchEntry[] {
  if (!query.trim()) {
    return SEARCH_INDEX.filter((entry) => entry.kind === 'destination').slice(0, 12);
  }

  return SEARCH_INDEX.filter((entry) =>
    matchesSearchQuery(query, entry.title, entry.subtitle, entry.keywords.join(' ')),
  ).slice(0, limit);
}

export function getSearchKindLabel(
  kind: AppSearchKind,
  t?: (key: string) => string,
): string {
  switch (kind) {
    case 'workout':
      return t?.('search.kind.workout') ?? 'Treinos';
    case 'exercise':
      return t?.('search.kind.exercise') ?? 'Exercícios';
    case 'sportsNutrition':
      return t?.('search.kind.sportsNutrition') ?? 'Nutrição esportiva';
    case 'supplement':
      return t?.('search.kind.supplement') ?? 'Suplementos';
    case 'encyclopedia':
      return t?.('search.kind.encyclopedia') ?? 'Enciclopédia';
    case 'destination':
      return t?.('search.kind.destination') ?? 'Atalho';
    default:
      return t?.('search.kind.result') ?? 'Resultado';
  }
}
