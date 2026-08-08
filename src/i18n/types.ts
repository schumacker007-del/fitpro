export type AppLocale = 'pt-BR' | 'pt-PT' | 'en' | 'en-GB' | 'es' | 'de' | 'fr' | 'it' | 'zh' | 'ja' | 'hi';

export const DEFAULT_LOCALE: AppLocale = 'pt-BR';

export const SUPPORTED_LOCALES: AppLocale[] = [
  'pt-BR',
  'pt-PT',
  'en',
  'en-GB',
  'es',
  'de',
  'fr',
  'it',
  'zh',
  'ja',
  'hi',
];

/** Parent locale used when a key is missing in the child variant. */
export const LOCALE_FALLBACK: Partial<Record<AppLocale, AppLocale>> = {
  'pt-PT': 'pt-BR',
  'en-GB': 'en',
  zh: 'en',
  ja: 'en',
  hi: 'en',
};

/** BCP 47 tags for Intl date/number formatting. */
export const BCP47_LOCALE: Record<AppLocale, string> = {
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-PT',
  en: 'en-US',
  'en-GB': 'en-GB',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
  it: 'it-IT',
  zh: 'zh-CN',
  ja: 'ja-JP',
  hi: 'hi-IN',
};

export function getLocaleChain(locale: AppLocale): AppLocale[] {
  const chain: AppLocale[] = [locale];
  let current = LOCALE_FALLBACK[locale];
  while (current) {
    chain.unshift(current);
    current = LOCALE_FALLBACK[current];
  }
  return chain;
}

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return value != null && (SUPPORTED_LOCALES as string[]).includes(value);
}
