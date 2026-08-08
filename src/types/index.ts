export type Goal = 'perder_peso' | 'ganhar_massa' | 'manter_forma' | 'condicionamento_fisico';

export type ActivityLevel = 'sedentario' | 'moderado' | 'ativo';

export type FitnessLevel = 'iniciante' | 'intermediario' | 'avancado';

export type InjuryArea =
  | 'nenhuma'
  | 'tornozelo'
  | 'joelho'
  | 'quadril'
  | 'costas'
  | 'cotovelo'
  | 'punho';

export type TrainingMotivation =
  | 'saude_melhor'
  | 'imunidade'
  | 'aparencia'
  | 'forca_resistencia'
  | 'desejo_sexual';

export type Gender = 'masculino' | 'feminino' | 'outro';

export type PlanTier = 'free' | 'pro';

export type MuscleGroupId =
  | 'peito'
  | 'costas'
  | 'ombros'
  | 'biceps'
  | 'triceps'
  | 'antebraco'
  | 'abdomen'
  | 'quadriceps'
  | 'posterior_gluteos'
  | 'gluteos'
  | 'isquiotibiais'
  | 'panturrilha'
  | 'funcional'
  | 'cardio'
  | 'mobilidade';

export interface UserProfile {
  name: string;
  gender: Gender;
  weightKg: number;
  heightCm: number;
  age: number;
  goal: Goal;
  activityLevel?: ActivityLevel;
  fitnessLevel?: FitnessLevel;
  injuryAreas?: InjuryArea[];
  trainingMotivations?: TrainingMotivation[];
  city?: string;
  state?: string;
  gym?: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  age?: number;
  city: string;
  state: string;
  country: string;
  goalLabel: string;
  gym?: string;
  bio?: string;
  avatarColor: string;
}

export interface ExerciseStep {
  id: string;
  name: string;
  muscleGroup: string;
  primaryMuscles: MuscleGroupId[];
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string[];
  /** Pontos-chave de postura, respiração e alinhamento (checklist guiado — Pro). */
  postureTips: string[];
  /** Erros comuns de execução a evitar (Pro). */
  commonMistakes: string[];
  animation: AnimationKind;
  /** Equipamento sugerido (ex.: "Barra", "Halteres", "Máquina", "Peso do corpo"). */
  equipment?: string;
  tier: PlanTier;
}

/**
 * Padrão de movimento usado para escolher a animação. Cada variação de
 * exercício (pegada, ângulo de banco, aparelho) tem sua própria animação
 * para deixar claro qual é o movimento certo — só exercícios praticamente
 * idênticos (ex.: puxada aberta x fechada na mesma máquina) compartilham a
 * mesma pose. Todas mantêm o mesmo modelo/estilo visual em todo o app.
 */
export type AnimationKind =
  | 'squat'
  | 'pushup'
  | 'jump'
  | 'lunge'
  | 'plank'
  | 'row'
  | 'curl'
  | 'stretch'
  | 'chest_press'
  | 'pulldown'
  | 'hip_hinge'
  | 'shoulder_press'
  | 'lateral_raise'
  | 'leg_curl'
  | 'hip_thrust'
  | 'calf_raise'
  | 'crunch'
  | 'chest_fly'
  | 'front_raise'
  | 'rear_delt_fly'
  | 'shrug'
  | 'triceps_extension'
  | 'pull_up'
  | 'leg_extension'
  | 'hip_abduction'
  | 'leg_raise'
  | 'chest_press_incline'
  | 'chest_press_decline'
  | 'curl_hammer'
  | 'curl_scott'
  | 'curl_concentrated'
  | 'triceps_skullcrusher'
  | 'triceps_overhead'
  | 'triceps_kickback'
  | 'seated_row'
  | 'face_pull'
  | 'leg_press'
  | 'leg_curl_seated'
  | 'calf_raise_seated'
  | 'calf_raise_legpress'
  | 'crunch_oblique'
  | 'crunch_cable'
  | 'pullover'
  | 'step_up'
  | 'plank_side'
  | 'wrist_curl'
  | 'wrist_roller'
  | 'pistol_squat'
  | 'burpee'
  | 'jumping_jack'
  | 'mountain_climber'
  | 'kb_swing'
  | 'treadmill'
  | 'bike'
  | 'elliptical'
  | 'rowing_machine'
  | 'stair_climber'
  | 'stretch_hamstring'
  | 'stretch_quad'
  | 'stretch_calf'
  | 'stretch_chest'
  | 'stretch_shoulder'
  | 'stretch_triceps'
  | 'stretch_catcow'
  | 'stretch_glute'
  | 'chest_press_db'
  | 'chest_press_incline_db'
  | 'pec_deck_seated'
  | 'cable_crossover_standing'
  | 'dip_chest'
  | 'chest_fly_flat_db'
  | 'chest_fly_incline_db'
  | 'chest_fly_decline_db'
  | 'chest_fly_floor'
  | 'pec_deck_unilateral'
  | 'cable_fly_incline_bench'
  | 'cable_fly_decline_bench'
  | 'cable_fly_bent_over'
  | 'pushup_knees'
  | 'pushup_close'
  | 'pushup_wall'
  | 'pushup_clap'
  | 'pushup_bars'
  | 'pushup_ball'
  | 'pushup_band'
  | 'pushup_lateral_band'
  | 'chest_press_decline_db'
  | 'chest_press_machine'
  | 'chest_press_machine_incline'
  | 'chest_press_floor'
  | 'chest_press_cable_standing'
  | 'chest_press_cable_bench'
  | 'chest_press_band'
  | 'chest_press_unilateral_machine'
  | 'chest_press_incline_rotation'
  | 'svend_press_db'
  | 'svend_press_incline'
  | 'svend_standing_plate'
  | 'svend_standing_bar'
  | 'pullover_bar'
  | 'pullover_machine'
  | 'pullover_press_combo';

/** Percepção Subjetiva de Esforço (RPE), de 1 (muito fácil) a 10 (esforço máximo). */
export type RpeScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface TrainingLogEntry {
  id: string;
  exerciseId: string;
  exerciseName: string;
  workoutId: string;
  rpe: RpeScore;
  dateISO: string;
}

export type LoadSuggestion = 'increase_load' | 'more_rest' | 'maintain';

/** Periodicidade da ficha de treino personalizada montada pelo professor (Pro). */
export type PlanFrequency = 'semanal' | 'mensal';

export type TrainingPlace = 'casa' | 'academia' | 'ambos';

export type CustomPlanStatus = 'pendente' | 'em_producao' | 'entregue';

/** Solicitação de treino sob medida, montado manualmente pelo professor responsável (feature Pro). */
export interface CustomPlanRequest {
  id: string;
  frequency: PlanFrequency;
  goal: Goal;
  daysPerWeek: number;
  trainingPlace: TrainingPlace;
  equipment: string[];
  restrictions: string;
  notes: string;
  status: CustomPlanStatus;
  createdAtISO: string;
}

/** Foto de evolução física registrada pelo aluno (feature Pro). */
export interface ProgressPhoto {
  id: string;
  /** Caminho local (FileSystem) da imagem, copiada para armazenamento permanente do app. */
  uri: string;
  dateISO: string;
  weightKg?: number;
  note?: string;
}

/** Categoria de documento de saúde anexado pelo aluno. */
export type MedicalRecordCategory =
  | 'analise_laboratorial'
  | 'exame_medico'
  | 'prescricao'
  | 'avaliacao_medica';

export type MedicalRecordMediaType = 'photo' | 'video' | 'pdf';

/** Documento de saúde (exame, prescrição, avaliação) salvo localmente no app. */
export interface MedicalRecord {
  id: string;
  uri: string;
  mediaType: MedicalRecordMediaType;
  category: MedicalRecordCategory;
  title: string;
  note?: string;
  dateISO: string;
  /** Nome original do arquivo (útil para PDFs importados). */
  fileName?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  goal: Goal;
  level: 'iniciante' | 'intermediario' | 'avancado';
  durationMinutes: number;
  tier: PlanTier;
  exercises: ExerciseStep[];
  /** Planos "biblioteca" (agrupam exercícios por grupo muscular) não aparecem na listagem principal de treinos. */
  hidden?: boolean;
  /** Treino montado pelo próprio aluno (ou pelo professor dele, direto no app) — editável e removível. */
  custom?: boolean;
  /** Público-alvo do treino (planilhas por sexo). */
  audience?: Gender;
  /** Agrupa dias da mesma planilha (ex.: fem-01). */
  programId?: string;
}

export interface Meal {
  name: string;
  items: string[];
  kcal: number;
}

export interface DietPlan {
  id: string;
  goal: Goal;
  title: string;
  tier: PlanTier;
  dailyKcalTarget: string;
  meals: Meal[];
  tips: string[];
}

export type FoodCategoryId =
  | 'dairy'
  | 'cereals'
  | 'eggs_cheese'
  | 'poultry'
  | 'vegetables'
  | 'seafood'
  | 'fruits'
  | 'nuts_seeds'
  | 'hot_beverages'
  | 'seed_oils'
  | 'solid_fats'
  | 'legumes'
  | 'beef'
  | 'flour_pasta'
  | 'juices'
  | 'seasonings'
  | 'sweets'
  | 'pork'
  | 'veal_other_meat'
  | 'canned_meat'
  | 'cold_cuts'
  | 'lamb'
  | 'baby_food'
  | 'fast_food'
  | 'alcohol'
  | 'other_foods';

export type TrainingMethodCategoryId =
  | 'intensification'
  | 'load_variation'
  | 'exercise_combos'
  | 'angle_amplitude';

export type TrainingMethodId =
  | 'drop_set'
  | 'rest_pause'
  | 'cluster_sets'
  | 'back_off_set'
  | 'ascending_pyramid'
  | 'descending_pyramid'
  | 'wave_loading'
  | 'bi_set'
  | 'antagonist_superset'
  | 'tri_set'
  | 'giant_set'
  | 'method_21'
  | 'partial_reps'
  | 'isometric_hold';

export interface TrainingMethod {
  id: TrainingMethodId;
  categoryId: TrainingMethodCategoryId;
  name: string;
  shortDescription: string;
  howTo: string;
  objective: string;
  example?: string;
  icon: string;
}

export interface TrainingMethodCategory {
  id: TrainingMethodCategoryId;
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  color: string;
}

export interface FoodNutritionPer100g {
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface FoodRecipeIngredient {
  id: string;
  name: string;
  amountGrams?: number;
  /** Ingrediente sem quantidade fixa (ex.: sal a gosto). */
  toTaste?: boolean;
  description?: string;
}

export interface FoodRecipe {
  id: string;
  categoryId: FoodCategoryId;
  title: string;
  prepTimeMinutes: number;
  image: number;
  nutritionPer100g: FoodNutritionPer100g;
  ingredients: FoodRecipeIngredient[];
  toTaste: FoodRecipeIngredient[];
  steps: string[];
  /** Macros por porção (e-books bônus). Quando definido, substitui o rótulo "por 100g". */
  nutritionPerServing?: FoodNutritionPer100g;
  /** Rótulo da tabela nutricional (ex.: "por porção"). */
  nutritionLabel?: string;
  /** Agrupamento editorial (ex.: capítulo do e-book bônus). */
  chapter?: string;
  /** Receita do pacote bônus — listada na seção dedicada da Dieta. */
  isBonus?: boolean;
  /** Receita cadastrada parcialmente — aguardando conteúdo do usuário. */
  comingSoon?: boolean;
}

export type SupplementId =
  | 'coq10'
  | 'nac'
  | 'omega3'
  | 'magnesium'
  | 'zinc'
  | 'vitamin_c'
  | 'vitamin_d3'
  | 'collagen_type2';

export interface Supplement {
  id: SupplementId;
  name: string;
  shortDescription: string;
  mainFunction: string;
  benefits: string;
  icon: string;
  color: string;
}

export interface SupplementStack {
  title: string;
  items: string[];
  color: string;
}

export type SportsNutritionProductId = string;

export type SportsNutritionCategoryId =
  | 'proteinas'
  | 'hipercaloricos'
  | 'performance'
  | 'perda-peso'
  | 'aminoacidos'
  | 'recuperacao'
  | 'energia'
  | 'vitaminas'
  | 'peptideos'
  | 'produtos-especiais'
  | 'outros';

export interface SportsNutritionCategory {
  id: SportsNutritionCategoryId;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  image?: number;
}

export interface SportsNutritionProduct {
  id: SportsNutritionProductId;
  name: string;
  categoryId: SportsNutritionCategoryId;
  shortDescription: string;
  benefits: string[];
  usage?: string;
  whenToTake?: string;
  description?: string;
  parentId?: SportsNutritionProductId;
  icon: string;
  color: string;
  image?: number;
}

export type EncyclopediaCategoryId = string;
export type EncyclopediaArticleId = string;

export interface EncyclopediaCategory {
  id: EncyclopediaCategoryId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  image?: number;
}

export interface EncyclopediaArticleSection {
  label: string;
  body: string;
}

export interface EncyclopediaArticle {
  id: EncyclopediaArticleId;
  categoryId: EncyclopediaCategoryId;
  title: string;
  shortDescription: string;
  description?: string;
  sections: EncyclopediaArticleSection[];
  icon: string;
}

export type BodyBiotypeId = 'ectomorph' | 'mesomorph' | 'endomorph';

export type PowerliftingLevelId = 'basico' | 'intermediario' | 'avancado';

export interface PowerliftingLevel {
  id: PowerliftingLevelId;
  title: string;
  subtitle: string;
  description: string;
  focus: string;
  schedule?: string;
  restNotes?: string;
  tips?: string[];
  color: string;
  icon: string;
  premiumPrice?: string;
  premiumLabel?: string;
  workoutIds: string[];
}

export interface BodyBiotype {
  id: BodyBiotypeId;
  name: string;
  nickname: string;
  structure: string;
  metabolism: string;
  characteristics: string;
  trainingTendency: string;
  color: string;
  icon: string;
}

export interface BiotypeIdentificationTest {
  id: string;
  title: string;
  instructions: string;
  results: { biotypeId: BodyBiotypeId; label: string }[];
}

export type TrainingFeedMediaType = 'image' | 'video';

export type TrainingFeedReaction = 'like' | 'dislike';

export interface TrainingFeedComment {
  id: string;
  authorName: string;
  text: string;
  createdAtISO: string;
}

export interface TrainingFeedPost {
  id: string;
  authorName: string;
  mediaUri: string;
  mediaType: TrainingFeedMediaType;
  caption?: string;
  createdAtISO: string;
  comments: TrainingFeedComment[];
  likes: number;
  dislikes: number;
  userReaction: TrainingFeedReaction | null;
}

export type MessageContactId = 'creator' | 'instructor';

export interface DirectMessage {
  id: string;
  contactId: MessageContactId;
  body: string;
  createdAtISO: string;
}
