import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LoadSuggestion, RpeScore, TrainingLogEntry } from '../types';

const LOGS_KEY = '@fitpro/training_logs';

interface TrainingLogContextValue {
  logs: TrainingLogEntry[];
  loading: boolean;
  addLog: (entry: Omit<TrainingLogEntry, 'id' | 'dateISO'>) => Promise<void>;
  getLogsForExercise: (exerciseId: string) => TrainingLogEntry[];
  getSuggestion: (exerciseId: string) => { suggestion: LoadSuggestion; avgRpe: number } | null;
  clearLogs: () => Promise<void>;
}

const TrainingLogContext = createContext<TrainingLogContextValue | undefined>(undefined);

export function TrainingLogProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<TrainingLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(LOGS_KEY);
        if (raw) setLogs(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: TrainingLogEntry[]) => {
    setLogs(next);
    await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(next));
  }, []);

  const addLog = useCallback(
    async (entry: Omit<TrainingLogEntry, 'id' | 'dateISO'>) => {
      const newEntry: TrainingLogEntry = {
        ...entry,
        id: `${entry.exerciseId}-${Date.now()}`,
        dateISO: new Date().toISOString(),
      };
      await persist([newEntry, ...logs].slice(0, 500));
    },
    [logs, persist]
  );

  const clearLogs = useCallback(async () => {
    await persist([]);
  }, [persist]);

  const getLogsForExercise = useCallback(
    (exerciseId: string) => logs.filter((l) => l.exerciseId === exerciseId).sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1)),
    [logs]
  );

  const getSuggestion = useCallback(
    (exerciseId: string): { suggestion: LoadSuggestion; avgRpe: number } | null => {
      const recent = getLogsForExercise(exerciseId).slice(0, 3);
      if (recent.length === 0) return null;
      const avgRpe = recent.reduce((sum, l) => sum + l.rpe, 0) / recent.length;
      let suggestion: LoadSuggestion = 'maintain';
      if (avgRpe <= 6) suggestion = 'increase_load';
      else if (avgRpe >= 9) suggestion = 'more_rest';
      return { suggestion, avgRpe };
    },
    [getLogsForExercise]
  );

  const value = useMemo<TrainingLogContextValue>(
    () => ({ logs, loading, addLog, getLogsForExercise, getSuggestion, clearLogs }),
    [logs, loading, addLog, getLogsForExercise, getSuggestion, clearLogs]
  );

  return <TrainingLogContext.Provider value={value}>{children}</TrainingLogContext.Provider>;
}

export function useTrainingLog() {
  const ctx = useContext(TrainingLogContext);
  if (!ctx) throw new Error('useTrainingLog must be used within a TrainingLogProvider');
  return ctx;
}
