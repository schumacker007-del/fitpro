import { ActivityLevel, Gender, Goal, UserProfile } from '../types';

export interface NutritionTargets {
  caloriesKcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  waterLiters: number;
}

const ACTIVITY_MULTIPLIER: Record<ActivityLevel, number> = {
  sedentario: 1.2,
  moderado: 1.45,
  ativo: 1.7,
};

const WATER_ML_PER_KG = 35;

const ACTIVITY_WATER_BONUS_ML: Record<ActivityLevel, number> = {
  sedentario: 0,
  moderado: 350,
  ativo: 700,
};

export function calculateWaterLiters(weightKg: number, activityLevel: ActivityLevel = 'moderado'): number {
  const ml = weightKg * WATER_ML_PER_KG + ACTIVITY_WATER_BONUS_ML[activityLevel];
  const liters = ml / 1000;
  return Math.round(Math.max(1.5, liters) * 10) / 10;
}

export function waterCupsFromLiters(liters: number): number {
  return Math.max(1, Math.round((liters * 1000) / 250));
}

function goalCalorieAdjustment(goal: Goal): number {
  if (goal === 'perder_peso') return -400;
  if (goal === 'ganhar_massa') return 300;
  return 0;
}

function estimateBmr(profile: UserProfile): number {
  const { weightKg, heightCm, age, gender } = profile;
  if (gender === 'feminino') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
  if (gender === 'masculino') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 78;
}

export function calculateNutritionTargets(profile: UserProfile): NutritionTargets {
  const activity = profile.activityLevel ?? 'moderado';
  const bmr = estimateBmr(profile);
  const tdee = bmr * ACTIVITY_MULTIPLIER[activity] + goalCalorieAdjustment(profile.goal);
  const caloriesKcal = Math.max(1200, Math.round(tdee));

  const proteinG = Math.round(profile.weightKg * (profile.goal === 'ganhar_massa' ? 2 : 1.8));
  const fatG = Math.round((caloriesKcal * 0.28) / 9);
  const carbsG = Math.max(0, Math.round((caloriesKcal - proteinG * 4 - fatG * 9) / 4));
  const waterLiters = calculateWaterLiters(profile.weightKg, profile.activityLevel ?? 'moderado');

  return { caloriesKcal, proteinG, carbsG, fatG, waterLiters };
}
