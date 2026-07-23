import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { WorkoutPlan } from '../types';

const CUSTOM_WORKOUTS_KEY = '@fitpro/custom_workouts';

interface CustomWorkoutContextValue {
  customWorkouts: WorkoutPlan[];
  loading: boolean;
  saveWorkout: (plan: WorkoutPlan) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  getCustomWorkout: (id: string) => WorkoutPlan | undefined;
}

const CustomWorkoutContext = createContext<CustomWorkoutContextValue | undefined>(undefined);

export function CustomWorkoutProvider({ children }: { children: React.ReactNode }) {
  const [customWorkouts, setCustomWorkouts] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(CUSTOM_WORKOUTS_KEY);
        if (raw) setCustomWorkouts(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: WorkoutPlan[]) => {
    setCustomWorkouts(next);
    await AsyncStorage.setItem(CUSTOM_WORKOUTS_KEY, JSON.stringify(next));
  }, []);

  const saveWorkout = useCallback(
    async (plan: WorkoutPlan) => {
      const exists = customWorkouts.some((w) => w.id === plan.id);
      const next = exists ? customWorkouts.map((w) => (w.id === plan.id ? plan : w)) : [plan, ...customWorkouts];
      await persist(next);
    },
    [customWorkouts, persist]
  );

  const deleteWorkout = useCallback(
    async (id: string) => {
      await persist(customWorkouts.filter((w) => w.id !== id));
    },
    [customWorkouts, persist]
  );

  const getCustomWorkout = useCallback((id: string) => customWorkouts.find((w) => w.id === id), [customWorkouts]);

  const value = useMemo<CustomWorkoutContextValue>(
    () => ({ customWorkouts, loading, saveWorkout, deleteWorkout, getCustomWorkout }),
    [customWorkouts, loading, saveWorkout, deleteWorkout, getCustomWorkout]
  );

  return <CustomWorkoutContext.Provider value={value}>{children}</CustomWorkoutContext.Provider>;
}

export function useCustomWorkouts() {
  const ctx = useContext(CustomWorkoutContext);
  if (!ctx) throw new Error('useCustomWorkouts must be used within a CustomWorkoutProvider');
  return ctx;
}
