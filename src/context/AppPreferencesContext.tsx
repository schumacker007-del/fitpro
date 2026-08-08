import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AppPreferences, DEFAULT_APP_PREFERENCES, UnitSystem } from '../types/appPreferences';

const STORAGE_KEY = '@fitpro/app_preferences';

interface AppPreferencesContextValue {
  preferences: AppPreferences;
  loaded: boolean;
  setNotificationsEnabled: (value: boolean) => Promise<void>;
  setUnitSystem: (value: UnitSystem) => Promise<void>;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue | undefined>(undefined);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<AppPreferences>(DEFAULT_APP_PREFERENCES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<AppPreferences>;
          setPreferences({ ...DEFAULT_APP_PREFERENCES, ...parsed });
        }
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = useCallback(async (next: AppPreferences) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPreferences(next);
  }, []);

  const setNotificationsEnabled = useCallback(
    async (value: boolean) => {
      await persist({ ...preferences, notificationsEnabled: value });
    },
    [persist, preferences],
  );

  const setUnitSystem = useCallback(
    async (value: UnitSystem) => {
      await persist({ ...preferences, unitSystem: value });
    },
    [persist, preferences],
  );

  const value = useMemo(
    () => ({ preferences, loaded, setNotificationsEnabled, setUnitSystem }),
    [preferences, loaded, setNotificationsEnabled, setUnitSystem],
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

export function useAppPreferences() {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) throw new Error('useAppPreferences must be used within AppPreferencesProvider');
  return ctx;
}
