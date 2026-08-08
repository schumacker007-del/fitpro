import { MuscleGroupId } from '../types';
import { TranslationKey } from './translations';

export function muscleGroupLabelKey(id: MuscleGroupId): TranslationKey {
  return `workouts.muscle.${id}` as TranslationKey;
}

export function badgeTitleKey(id: string): TranslationKey {
  return `badges.${id}.title` as TranslationKey;
}

export function badgeDescriptionKey(id: string): TranslationKey {
  return `badges.${id}.description` as TranslationKey;
}
