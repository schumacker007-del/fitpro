import { AppLocale, BCP47_LOCALE } from '../i18n/types';

export function formatLocaleDate(
  locale: AppLocale,
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const value = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(BCP47_LOCALE[locale], options).format(value);
}
