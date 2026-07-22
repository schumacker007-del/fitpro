export type Goal = 'perder_peso' | 'ganhar_massa' | 'manter_forma';

export type Gender = 'masculino' | 'feminino' | 'outro';

export type PlanTier = 'free' | 'pro';

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
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string[];
  animation: 'squat' | 'pushup' | 'jump' | 'lunge' | 'plank' | 'row' | 'curl' | 'stretch';
  tier: PlanTier;
}

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
