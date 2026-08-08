import type { AppLocale } from '../i18n/types';

export type PricingRegion = 'br' | 'us' | 'eu';

/** Numeric fallbacks for savings math when the store price is unavailable. */
export const FALLBACK_NUMERIC = {
  br: { proMonthly: 49.9, proYearly: 399.9, powerlifting: 99.9 },
  us: { proMonthly: 9.99, proYearly: 79.99, powerlifting: 19.99 },
  eu: { proMonthly: 9.99, proYearly: 79.99, powerlifting: 19.99 },
} as const;

/** Localized display fallbacks when RevenueCat is unavailable (demo / dev). */
export const FALLBACK_DISPLAY = {
  br: {
    proMonthly: 'R$ 49,90',
    proYearly: 'R$ 399,90',
    powerlifting: 'R$ 99,90',
  },
  us: {
    proMonthly: '$9.99',
    proYearly: '$79.99',
    powerlifting: '$19.99',
  },
  eu: {
    proMonthly: '€9,99',
    proYearly: '€79,99',
    powerlifting: '€19,99',
  },
} as const;

export function getPricingRegion(locale: AppLocale): PricingRegion {
  if (locale === 'pt-BR') return 'br';
  if (locale === 'en') return 'us';
  return 'eu';
}

export function getFallbackNumeric(region: PricingRegion) {
  return FALLBACK_NUMERIC[region];
}

export function getFallbackDisplay(region: PricingRegion) {
  return FALLBACK_DISPLAY[region];
}
