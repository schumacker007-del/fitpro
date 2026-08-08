import { Gender, Goal } from '../types';

/** Treino básico sugerido por sexo e objetivo (ids de CURATED_WORKOUTS). */
export const SUGGESTED_WORKOUT_BY_PROFILE: Record<Gender, Record<Goal, string>> = {
  feminino: {
    perder_peso: 'w-pro-emagrecimento-hiit',
    ganhar_massa: 'w-fem-01-mon',
    manter_forma: 'w-free-fullbody',
    condicionamento_fisico: 'w-free-cardio',
  },
  masculino: {
    perder_peso: 'w-pro-emagrecimento-hiit',
    ganhar_massa: 'w-masc-01-mon',
    manter_forma: 'w-free-fullbody',
    condicionamento_fisico: 'w-free-cardio',
  },
  outro: {
    perder_peso: 'w-free-cardio',
    ganhar_massa: 'w-pro-hipertrofia-superior',
    manter_forma: 'w-free-fullbody',
    condicionamento_fisico: 'w-free-cardio',
  },
};

export function getSuggestedWorkoutId(gender: Gender | undefined, goal: Goal | undefined): string | null {
  if (!goal) return null;
  const g = gender ?? 'outro';
  return SUGGESTED_WORKOUT_BY_PROFILE[g][goal] ?? null;
}
