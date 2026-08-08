import { ActiveInjuryArea } from '../data/injuryMuscleMap';
import { TranslationKey } from '../i18n/translations';
import { InjuryArea } from '../types';

const INJURY_AREA_IDS = new Set<InjuryArea>([
  'nenhuma',
  'tornozelo',
  'joelho',
  'quadril',
  'costas',
  'cotovelo',
  'punho',
]);

/** Maps legacy stored values to current injury area ids. */
export function normalizeInjuryAreas(areas?: (InjuryArea | string)[] | null): InjuryArea[] {
  if (!areas?.length) return [];
  return areas
    .map((area) => (area === 'perna' ? 'quadril' : area))
    .filter((area): area is InjuryArea => INJURY_AREA_IDS.has(area as InjuryArea));
}

export function toggleInjurySelection(current: InjuryArea[], area: InjuryArea): InjuryArea[] {
  if (area === 'nenhuma') return ['nenhuma'];
  const withoutNone = current.filter((item) => item !== 'nenhuma');
  if (withoutNone.includes(area)) {
    return withoutNone.filter((item) => item !== area);
  }
  return [...withoutNone, area];
}

export function formatInjurySummary(
  areas: InjuryArea[] | undefined,
  t: (key: TranslationKey) => string,
  noneLabel: string
): string {
  const normalized = normalizeInjuryAreas(areas);
  if (!normalized.length || normalized.includes('nenhuma')) return noneLabel;
  const labels: Record<ActiveInjuryArea, string> = {
    tornozelo: t('onboarding.injury.tornozelo'),
    joelho: t('onboarding.injury.joelho'),
    quadril: t('onboarding.injury.quadril'),
    costas: t('onboarding.injury.costas'),
    cotovelo: t('onboarding.injury.cotovelo'),
    punho: t('onboarding.injury.punho'),
  };
  return normalized
    .filter((area): area is ActiveInjuryArea => area !== 'nenhuma')
    .map((area) => labels[area])
    .join(', ');
}
