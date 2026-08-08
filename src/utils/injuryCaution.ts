import { INJURY_AFFECTED_MUSCLES, ActiveInjuryArea } from '../data/injuryMuscleMap';
import { ExerciseStep, InjuryArea } from '../types';
import { normalizeInjuryAreas } from './injurySelection';

export function getActiveInjuries(injuryAreas?: InjuryArea[]): ActiveInjuryArea[] {
  const normalized = normalizeInjuryAreas(injuryAreas);
  if (!normalized.length || normalized.includes('nenhuma')) return [];
  return normalized.filter((area): area is ActiveInjuryArea => area !== 'nenhuma');
}

function matchesInjury(
  exercise: Pick<ExerciseStep, 'primaryMuscles' | 'muscleGroup'>,
  injury: ActiveInjuryArea
): boolean {
  const muscles = exercise.primaryMuscles ?? [];
  const affected = INJURY_AFFECTED_MUSCLES[injury];
  if (muscles.some((muscle) => affected.includes(muscle))) return true;

  const group = exercise.muscleGroup.toLowerCase();
  if (injury === 'costas' && (group.includes('costa') || group.includes('lombar') || group.includes('coluna'))) {
    return true;
  }
  if (injury === 'joelho' && (group.includes('joelho') || group.includes('agach'))) return true;
  if (injury === 'quadril' && (group.includes('quadril') || group.includes('gluteo') || group.includes('afundo'))) {
    return true;
  }
  if (injury === 'cotovelo' && (group.includes('cotovelo') || group.includes('triceps') || group.includes('biceps'))) {
    return true;
  }
  if (injury === 'punho' && (group.includes('punho') || group.includes('antebraco'))) return true;
  if (injury === 'tornozelo' && (group.includes('tornozelo') || group.includes('panturrilha'))) return true;

  return false;
}

export function getMatchingInjuriesForExercise(
  exercise: Pick<ExerciseStep, 'primaryMuscles' | 'muscleGroup'>,
  injuryAreas?: InjuryArea[]
): ActiveInjuryArea[] {
  const active = getActiveInjuries(injuryAreas);
  if (!active.length) return [];
  return active.filter((injury) => matchesInjury(exercise, injury));
}

export function exerciseNeedsInjuryCaution(
  exercise: Pick<ExerciseStep, 'primaryMuscles' | 'muscleGroup'>,
  injuryAreas?: InjuryArea[]
): boolean {
  return getMatchingInjuriesForExercise(exercise, injuryAreas).length > 0;
}
