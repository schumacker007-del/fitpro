export type BadgeId =
  | 'first_workout'
  | 'streak_3'
  | 'streak_7'
  | 'streak_30'
  | 'diet_streak_7'
  | 'combo_7'
  | 'ten_workouts';

export interface BadgeDefinition {
  id: BadgeId;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface DayActivity {
  date: string;
  workout: boolean;
  diet: boolean;
}

export interface GamificationSnapshot {
  workoutStreak: number;
  dietStreak: number;
  comboStreak: number;
  bestWorkoutStreak: number;
  totalWorkoutDays: number;
  totalDietDays: number;
  unlockedBadges: BadgeId[];
}
