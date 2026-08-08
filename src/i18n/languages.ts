import { AppLocale } from './types';

export interface LanguageOption {
  locale: AppLocale;
  nativeName: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { locale: 'pt-BR', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
  { locale: 'pt-PT', nativeName: 'Português (Portugal)', flag: '🇵🇹' },
  { locale: 'en', nativeName: 'English (US)', flag: '🇺🇸' },
  { locale: 'en-GB', nativeName: 'English (UK)', flag: '🇬🇧' },
  { locale: 'es', nativeName: 'Español', flag: '🇪🇸' },
  { locale: 'de', nativeName: 'Deutsch', flag: '🇩🇪' },
  { locale: 'fr', nativeName: 'Français', flag: '🇫🇷' },
  { locale: 'it', nativeName: 'Italiano', flag: '🇮🇹' },
  { locale: 'zh', nativeName: '中文', flag: '🇨🇳' },
  { locale: 'ja', nativeName: '日本語', flag: '🇯🇵' },
  { locale: 'hi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export function getLanguageLabel(locale: AppLocale): string {
  return LANGUAGE_OPTIONS.find((o) => o.locale === locale)?.nativeName ?? locale;
}
