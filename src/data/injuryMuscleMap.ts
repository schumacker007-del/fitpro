import { TranslationKey } from '../i18n/translations';
import { InjuryArea, MuscleGroupId } from '../types';

export type ActiveInjuryArea = Exclude<InjuryArea, 'nenhuma'>;

/** Grupos musculares que costumam sobrecarregar cada área lesionada declarada no onboarding. */
export const INJURY_AFFECTED_MUSCLES: Record<ActiveInjuryArea, MuscleGroupId[]> = {
  tornozelo: ['panturrilha', 'cardio', 'funcional', 'quadriceps'],
  joelho: ['quadriceps', 'isquiotibiais', 'posterior_gluteos', 'gluteos', 'panturrilha'],
  quadril: ['gluteos', 'posterior_gluteos', 'quadriceps', 'isquiotibiais'],
  costas: ['costas', 'posterior_gluteos', 'isquiotibiais', 'mobilidade'],
  cotovelo: ['triceps', 'biceps', 'ombros'],
  punho: ['antebraco', 'biceps', 'triceps'],
};

export const INJURY_LABEL_KEYS = {
  tornozelo: 'onboarding.injury.tornozelo',
  joelho: 'onboarding.injury.joelho',
  quadril: 'onboarding.injury.quadril',
  costas: 'onboarding.injury.costas',
  cotovelo: 'onboarding.injury.cotovelo',
  punho: 'onboarding.injury.punho',
} as const satisfies Record<ActiveInjuryArea, TranslationKey>;
