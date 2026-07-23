export type Goal = 'perder_peso' | 'ganhar_massa' | 'manter_forma';

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
  | 'kb_swing';

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
