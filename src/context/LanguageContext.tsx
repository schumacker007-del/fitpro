import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getLanguageLabel } from '../i18n/languages';
import { translate, TranslationKey } from '../i18n/translations';
import { resolveDeviceLocale } from '../i18n/resolveDeviceLocale';
import { AppLocale, isAppLocale } from '../i18n/types';

const LOCALE_KEY = '@fitpro/locale';

interface LanguageContextValue {
  locale: AppLocale;
  loading: boolean;
  languageLabel: string;
  setLocale: (locale: AppLocale) => Promise<void>;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(() => resolveDeviceLocale());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(LOCALE_KEY);
        if (isAppLocale(saved)) {
          setLocaleState(saved);
        } else {
          const detected = resolveDeviceLocale();
          setLocaleState(detected);
          await AsyncStorage.setItem(LOCALE_KEY, detected);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setLocale = useCallback(async (next: AppLocale) => {
    setLocaleState(next);
    await AsyncStorage.setItem(LOCALE_KEY, next);
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => translate(locale, key, params),
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      loading,
      languageLabel: getLanguageLabel(locale),
      setLocale,
      t,
    }),
    [locale, loading, setLocale, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
