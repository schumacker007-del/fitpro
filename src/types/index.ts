export type Goal = 'perder_peso' | 'ganhar_massa' | 'manter_forma';

export type Gender = 'masculino' | 'feminino' | 'outro';

export type PlanTier = 'free' | 'pro';

export type MuscleGroupId =
  | 'peito'
  | 'costas'
  | 'ombros'
  | 'biceps'
  | 'triceps'
  | 'abdomen'
  | 'pernas'
  | 'gluteos'
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
  animation: 'squat' | 'pushup' | 'jump' | 'lunge' | 'plank' | 'row' | 'curl' | 'stretch';
  tier: PlanTier;
}

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

export interface WorkoutPlan {
  id: string;
  title: string;
  goal: Goal;
  level: 'iniciante' | 'intermediario' | 'avancado';
  durationMinutes: number;
  tier: PlanTier;
  exercises: ExerciseStep[];
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
