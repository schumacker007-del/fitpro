import { TranslationKey } from '../i18n/translations';
import { MuscleGroupId } from '../types';

export interface MuscleGroupBanner {
  id: MuscleGroupId;
  labelKey: TranslationKey;
  image: number;
  aspectRatio: number;
}

export interface MuscleGroupBannerSection {
  titleKey: TranslationKey;
  items: MuscleGroupBanner[];
}

export const MUSCLE_GROUP_BANNER_SECTIONS: MuscleGroupBannerSection[] = [
  {
    titleKey: 'workouts.muscleSection.superior',
    items: [
      {
        id: 'peito',
        labelKey: 'workouts.muscle.peito',
        image: require('../../assets/muscle-groups/banners/peito.png'),
        aspectRatio: 1024 / 349,
      },
      {
        id: 'costas',
        labelKey: 'workouts.muscle.costas',
        image: require('../../assets/muscle-groups/banners/costas.png'),
        aspectRatio: 1024 / 349,
      },
      {
        id: 'ombros',
        labelKey: 'workouts.muscle.ombros',
        image: require('../../assets/muscle-groups/banners/ombros.png'),
        aspectRatio: 1024 / 350,
      },
      {
        id: 'biceps',
        labelKey: 'workouts.muscle.biceps',
        image: require('../../assets/muscle-groups/banners/biceps.png'),
        aspectRatio: 1024 / 349,
      },
      {
        id: 'triceps',
        labelKey: 'workouts.muscle.triceps',
        image: require('../../assets/muscle-groups/banners/triceps.png'),
        aspectRatio: 1024 / 349,
      },
      {
        id: 'antebraco',
        labelKey: 'workouts.muscle.antebraco',
        image: require('../../assets/muscle-groups/banners/antebraco.png'),
        aspectRatio: 1024 / 349,
      },
    ],
  },
  {
    titleKey: 'workouts.muscleSection.inferior',
    items: [
      {
        id: 'quadriceps',
        labelKey: 'workouts.muscle.quadriceps',
        image: require('../../assets/muscle-groups/banners/quadriceps.png'),
        aspectRatio: 1024 / 349,
      },
      {
        id: 'gluteos',
        labelKey: 'workouts.muscle.gluteos',
        image: require('../../assets/muscle-groups/banners/gluteos.png'),
        aspectRatio: 1024 / 341,
      },
      {
        id: 'isquiotibiais',
        labelKey: 'workouts.muscle.isquiotibiais',
        image: require('../../assets/muscle-groups/banners/isquiotibiais.png'),
        aspectRatio: 1024 / 350,
      },
      {
        id: 'panturrilha',
        labelKey: 'workouts.muscle.panturrilha',
        image: require('../../assets/muscle-groups/banners/panturrilha.png'),
        aspectRatio: 1024 / 351,
      },
    ],
  },
  {
    titleKey: 'workouts.muscleSection.mobility',
    items: [
      {
        id: 'abdomen',
        labelKey: 'workouts.muscle.abdomen',
        image: require('../../assets/muscle-groups/banners/abdomen.png'),
        aspectRatio: 1024 / 350,
      },
      {
        id: 'funcional',
        labelKey: 'workouts.muscle.funcional',
        image: require('../../assets/muscle-groups/banners/funcional.png'),
        aspectRatio: 1024 / 437,
      },
      {
        id: 'cardio',
        labelKey: 'workouts.muscle.cardio',
        image: require('../../assets/muscle-groups/banners/cardio.png'),
        aspectRatio: 1024 / 348,
      },
      {
        id: 'mobilidade',
        labelKey: 'workouts.muscle.mobilidade',
        image: require('../../assets/muscle-groups/banners/mobilidade.png'),
        aspectRatio: 1024 / 349,
      },
    ],
  },
];

/** Grupos sem banner fotográfico. */
export const MUSCLE_GROUP_BANNER_EXTRAS: { id: MuscleGroupId; labelKey: TranslationKey }[] = [];
