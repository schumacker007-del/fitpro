import { MuscleGroupId } from '../types';
import { TranslationKey } from '../i18n/translations';

export interface MuscleGroupSectionItem {
  id: MuscleGroupId;
  labelKey: TranslationKey;
}

export interface MuscleGroupSection {
  id: 'superior' | 'inferior' | 'mobility';
  titleKey: TranslationKey;
  items: MuscleGroupSectionItem[];
}

export const MUSCLE_GROUP_SECTIONS: MuscleGroupSection[] = [
  {
    id: 'superior',
    titleKey: 'workouts.muscleSection.superior',
    items: [
      { id: 'peito', labelKey: 'workouts.muscle.peito' },
      { id: 'costas', labelKey: 'workouts.muscle.costas' },
      { id: 'ombros', labelKey: 'workouts.muscle.ombros' },
      { id: 'biceps', labelKey: 'workouts.muscle.biceps' },
      { id: 'triceps', labelKey: 'workouts.muscle.triceps' },
      { id: 'antebraco', labelKey: 'workouts.muscle.antebraco' },
      { id: 'abdomen', labelKey: 'workouts.muscle.abdomen' },
    ],
  },
  {
    id: 'inferior',
    titleKey: 'workouts.muscleSection.inferior',
    items: [
      { id: 'quadriceps', labelKey: 'workouts.muscle.quadriceps' },
      { id: 'gluteos', labelKey: 'workouts.muscle.gluteos' },
      { id: 'isquiotibiais', labelKey: 'workouts.muscle.isquiotibiais' },
      { id: 'panturrilha', labelKey: 'workouts.muscle.panturrilha' },
    ],
  },
  {
    id: 'mobility',
    titleKey: 'workouts.muscleSection.mobility',
    items: [{ id: 'mobilidade', labelKey: 'workouts.muscle.mobilidade' }],
  },
];
