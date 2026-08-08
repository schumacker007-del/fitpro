import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BodyMeasurementId } from '../data/bodyMeasurements';
import {
  countFilledMeasurements,
  findNextPendingMeasurement,
  getLatestMeasurementUpdate,
  totalMeasurementCount,
} from '../utils/bodyMeasurementsHelpers';

const STORAGE_KEY = '@fitpro/body_measurements';

export type BodyMeasurementsRecord = Partial<Record<BodyMeasurementId, number>>;

export interface BodyMeasurementHistoryEntry {
  id: BodyMeasurementId;
  valueCm: number;
  recordedAt: string;
}

interface BodyMeasurementsStore {
  current: BodyMeasurementsRecord;
  updatedAt: Partial<Record<BodyMeasurementId, string>>;
  history: BodyMeasurementHistoryEntry[];
}

function emptyStore(): BodyMeasurementsStore {
  return { current: {}, updatedAt: {}, history: [] };
}

function parseStore(raw: string | null): BodyMeasurementsStore {
  if (!raw) return emptyStore();
  try {
    const parsed = JSON.parse(raw) as BodyMeasurementsStore | BodyMeasurementsRecord;
    if ('current' in parsed && parsed.current) {
      return {
        current: parsed.current ?? {},
        updatedAt: parsed.updatedAt ?? {},
        history: parsed.history ?? [],
      };
    }
    return { current: parsed as BodyMeasurementsRecord, updatedAt: {}, history: [] };
  } catch {
    return emptyStore();
  }
}

interface BodyMeasurementsContextValue {
  measurements: BodyMeasurementsRecord;
  updatedAt: Partial<Record<BodyMeasurementId, string>>;
  history: BodyMeasurementHistoryEntry[];
  loaded: boolean;
  filledCount: number;
  totalCount: number;
  completionPercent: number;
  nextPendingId: BodyMeasurementId | null;
  lastUpdatedAt: string | null;
  saveMeasurement: (id: BodyMeasurementId, valueCm: number | null) => Promise<void>;
  getHistoryFor: (id: BodyMeasurementId) => BodyMeasurementHistoryEntry[];
}

const BodyMeasurementsContext = createContext<BodyMeasurementsContextValue | undefined>(undefined);

export function BodyMeasurementsProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<BodyMeasurementsStore>(emptyStore);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        setStore(parseStore(raw));
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const saveMeasurement = useCallback(async (id: BodyMeasurementId, valueCm: number | null) => {
    const now = new Date().toISOString();
    setStore((prev) => {
      const next: BodyMeasurementsStore = {
        current: { ...prev.current },
        updatedAt: { ...prev.updatedAt },
        history: [...prev.history],
      };

      if (valueCm == null) {
        delete next.current[id];
        delete next.updatedAt[id];
      } else {
        next.current[id] = valueCm;
        next.updatedAt[id] = now;
        next.history.unshift({ id, valueCm, recordedAt: now });
        next.history = next.history.slice(0, 200);
      }

      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const filledCount = countFilledMeasurements(store.current);
  const totalCount = totalMeasurementCount();

  const value = useMemo(
    () => ({
      measurements: store.current,
      updatedAt: store.updatedAt,
      history: store.history,
      loaded,
      filledCount,
      totalCount,
      completionPercent: totalCount ? Math.round((filledCount / totalCount) * 100) : 0,
      nextPendingId: findNextPendingMeasurement(store.current),
      lastUpdatedAt: getLatestMeasurementUpdate(store.updatedAt),
      saveMeasurement,
      getHistoryFor: (id: BodyMeasurementId) => store.history.filter((entry) => entry.id === id),
    }),
    [store, loaded, filledCount, totalCount, saveMeasurement],
  );

  return <BodyMeasurementsContext.Provider value={value}>{children}</BodyMeasurementsContext.Provider>;
}

export function useBodyMeasurements() {
  const ctx = useContext(BodyMeasurementsContext);
  if (!ctx) throw new Error('useBodyMeasurements must be used within BodyMeasurementsProvider');
  return ctx;
}
