import { getLocales } from 'expo-localization';
import { AppLocale, DEFAULT_LOCALE } from './types';

/** When the device language is not supported, prefer English over Portuguese. */
const UNSUPPORTED_DEVICE_FALLBACK: AppLocale = 'en';

function matchLocale(languageCode: string, regionCode: string | null, languageTag: string): AppLocale | null {
  const code = languageCode.toLowerCase();
  const region = (regionCode ?? '').toUpperCase();
  const tag = languageTag.toLowerCase();

  if (code === 'pt') {
    if (region === 'PT' || tag.endsWith('-pt')) return 'pt-PT';
    return 'pt-BR';
  }
  if (code === 'en') {
    if (region === 'GB' || tag.endsWith('-gb')) return 'en-GB';
    return 'en';
  }
  if (code === 'es') return 'es';
  if (code === 'de') return 'de';
  if (code === 'fr') return 'fr';
  if (code === 'it') return 'it';
  if (code === 'zh') return 'zh';
  if (code === 'ja') return 'ja';
  if (code === 'hi') return 'hi';
  return null;
}

/** Maps the device locale list to the best supported app locale. */
export function resolveDeviceLocale(): AppLocale {
  const locales = getLocales();
  for (const loc of locales) {
    const languageCode = loc.languageCode ?? '';
    const languageTag = loc.languageTag ?? languageCode;
    if (!languageCode) continue;
    const matched = matchLocale(languageCode, loc.regionCode ?? null, languageTag);
    if (matched) return matched;
  }
  return UNSUPPORTED_DEVICE_FALLBACK ?? DEFAULT_LOCALE;
}
