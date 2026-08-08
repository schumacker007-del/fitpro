import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BadgeId, DayActivity, GamificationSnapshot } from '../types/gamification';
import { buildSnapshot, isDoneToday, toDateKey, upsertActivity } from '../utils/gamification';

const ACTIVITIES_KEY = '@fitpro/gamification_activities';
const MEDICAL_DISCLAIMER_KEY = '@fitpro/medical_disclaimer_ack';

interface GamificationContextValue {
  loading: boolean;
  snapshot: GamificationSnapshot;
  workoutDoneToday: boolean;
  dietDoneToday: boolean;
  medicalDisclaimerAcknowledged: boolean;
  recordWorkoutDay: () => Promise<BadgeId[]>;
  recordDietDay: () => Promise<BadgeId[]>;
  acknowledgeMedicalDisclaimer: () => Promise<void>;
}

const GamificationContext = createContext<GamificationContextValue | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<DayActivity[]>([]);
  const [medicalDisclaimerAcknowledged, setMedicalDisclaimerAcknowledged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [rawActivities, rawDisclaimer] = await Promise.all([
          AsyncStorage.getItem(ACTIVITIES_KEY),
          AsyncStorage.getItem(MEDICAL_DISCLAIMER_KEY),
        ]);
        if (rawActivities) setActivities(JSON.parse(rawActivities));
        if (rawDisclaimer === '1') setMedicalDisclaimerAcknowledged(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persistActivities = useCallback(async (next: DayActivity[]) => {
    setActivities(next);
    await AsyncStorage.setItem(ACTIVITIES_KEY, JSON.stringify(next));
  }, []);

  const recordField = useCallback(
    async (field: 'workout' | 'diet'): Promise<BadgeId[]> => {
      const today = toDateKey();
      const before = evaluateUnlocked(activities);
      const next = upsertActivity(activities, { date: today, [field]: true });
      await persistActivities(next);
      const after = evaluateUnlocked(next);
      return after.filter((id) => !before.includes(id));
    },
    [activities, persistActivities]
  );

  const recordWorkoutDay = useCallback(() => recordField('workout'), [recordField]);
  const recordDietDay = useCallback(() => recordField('diet'), [recordField]);

  const acknowledgeMedicalDisclaimer = useCallback(async () => {
    setMedicalDisclaimerAcknowledged(true);
    await AsyncStorage.setItem(MEDICAL_DISCLAIMER_KEY, '1');
  }, []);

  const snapshot = useMemo(() => buildSnapshot(activities), [activities]);

  const value = useMemo<GamificationContextValue>(
    () => ({
      loading,
      snapshot,
      workoutDoneToday: isDoneToday(activities, 'workout'),
      dietDoneToday: isDoneToday(activities, 'diet'),
      medicalDisclaimerAcknowledged,
      recordWorkoutDay,
      recordDietDay,
      acknowledgeMedicalDisclaimer,
    }),
    [
      loading,
      snapshot,
      activities,
      medicalDisclaimerAcknowledged,
      recordWorkoutDay,
      recordDietDay,
      acknowledgeMedicalDisclaimer,
    ]
  );

  return <GamificationContext.Provider value={value}>{children}</GamificationContext.Provider>;
}

function evaluateUnlocked(activities: DayActivity[]): BadgeId[] {
  return buildSnapshot(activities).unlockedBadges;
}

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error('useGamification must be used within GamificationProvider');
  return ctx;
}
