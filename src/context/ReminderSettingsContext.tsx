import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { applyReminderSchedule, ReminderCopy } from '../services/reminderNotifications';
import { DEFAULT_REMINDER_SETTINGS, ReminderSettings } from '../types/reminders';

const STORAGE_KEY = '@fitpro/reminder_settings';

interface ReminderSettingsContextValue {
  settings: ReminderSettings;
  loaded: boolean;
  saveSettings: (next: ReminderSettings, copy: ReminderCopy) => Promise<boolean>;
}

const ReminderSettingsContext = createContext<ReminderSettingsContextValue | undefined>(undefined);

export function ReminderSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_REMINDER_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as ReminderSettings;
          setSettings({ ...DEFAULT_REMINDER_SETTINGS, ...parsed });
        }
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const saveSettings = useCallback(async (next: ReminderSettings, copy: ReminderCopy) => {
    const hasAny = next.workoutEnabled || next.dietEnabled;
    const granted = await applyReminderSchedule(next, copy);

    if (!hasAny || granted) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSettings(next);
    }

    return granted;
  }, []);

  const value = useMemo(
    () => ({ settings, loaded, saveSettings }),
    [settings, loaded, saveSettings],
  );

  return <ReminderSettingsContext.Provider value={value}>{children}</ReminderSettingsContext.Provider>;
}

export function useReminderSettings() {
  const ctx = useContext(ReminderSettingsContext);
  if (!ctx) throw new Error('useReminderSettings must be used within ReminderSettingsProvider');
  return ctx;
}
