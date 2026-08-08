import { TranslationKey } from '../i18n/translations';
import { InjuryArea } from '../types';

export interface InjuryOption {
  id: InjuryArea;
  labelKey: TranslationKey;
  image?: number;
}

/** Onboarding cards with banner images. */
export const INJURY_ONBOARDING_OPTIONS: InjuryOption[] = [
  { id: 'nenhuma', labelKey: 'onboarding.injury.nenhuma', image: require('../../assets/onboarding/injuries/card-0.jpg') },
  { id: 'tornozelo', labelKey: 'onboarding.injury.tornozelo', image: require('../../assets/onboarding/injuries/card-1.jpg') },
  { id: 'joelho', labelKey: 'onboarding.injury.joelho', image: require('../../assets/onboarding/injuries/card-2.jpg') },
  { id: 'quadril', labelKey: 'onboarding.injury.quadril', image: require('../../assets/onboarding/injuries/card-3.jpg') },
  { id: 'costas', labelKey: 'onboarding.injury.costas', image: require('../../assets/onboarding/injuries/card-4.jpg') },
  { id: 'cotovelo', labelKey: 'onboarding.injury.cotovelo', image: require('../../assets/onboarding/injuries/card-5.jpg') },
  { id: 'punho', labelKey: 'onboarding.injury.punho', image: require('../../assets/onboarding/injuries/card-6.jpg') },
];

/** Chip list in injury settings (no images). */
export const INJURY_SETTING_OPTIONS: InjuryOption[] = INJURY_ONBOARDING_OPTIONS.map(({ id, labelKey }) => ({
  id,
  labelKey,
}));
