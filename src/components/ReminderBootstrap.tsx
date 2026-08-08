import React, { useEffect } from 'react';
import { useAppPreferences } from '../context/AppPreferencesContext';
import { useLanguage } from '../context/LanguageContext';
import { useReminderSettings } from '../context/ReminderSettingsContext';
import { applyReminderSchedule, cancelAllReminders } from '../services/reminderNotifications';

/** Reaplica lembretes ao abrir o app (ex.: após reinício do celular). */
export default function ReminderBootstrap() {
  const { settings, loaded } = useReminderSettings();
  const { preferences, loaded: preferencesLoaded } = useAppPreferences();
  const { t } = useLanguage();

  useEffect(() => {
    if (!loaded || !preferencesLoaded) return;

    if (!preferences.notificationsEnabled) {
      void cancelAllReminders();
      return;
    }

    void applyReminderSchedule(settings, {
      workoutTitle: t('reminders.workout.title'),
      workoutBody: t('reminders.workout.body'),
      dietTitle: t('reminders.diet.title'),
      dietBody: t('reminders.diet.body'),
    });
  }, [loaded, preferencesLoaded, preferences.notificationsEnabled, settings, t]);

  return null;
}
