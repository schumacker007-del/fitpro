import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CustomPlanRequest } from '../types';

const REQUESTS_KEY = '@fitpro/custom_plan_requests';

interface CustomPlanContextValue {
  requests: CustomPlanRequest[];
  latestRequest: CustomPlanRequest | null;
  loading: boolean;
  createRequest: (input: Omit<CustomPlanRequest, 'id' | 'status' | 'createdAtISO'>) => Promise<CustomPlanRequest>;
  clearRequests: () => Promise<void>;
}

const CustomPlanContext = createContext<CustomPlanContextValue | undefined>(undefined);

export function CustomPlanProvider({ children }: { children: React.ReactNode }) {
  const [requests, setRequests] = useState<CustomPlanRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(REQUESTS_KEY);
        if (raw) setRequests(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: CustomPlanRequest[]) => {
    setRequests(next);
    await AsyncStorage.setItem(REQUESTS_KEY, JSON.stringify(next));
  }, []);

  const createRequest = useCallback(
    async (input: Omit<CustomPlanRequest, 'id' | 'status' | 'createdAtISO'>) => {
      const newRequest: CustomPlanRequest = {
        ...input,
        id: `plan-req-${Date.now()}`,
        status: 'pendente',
        createdAtISO: new Date().toISOString(),
      };
      await persist([newRequest, ...requests].slice(0, 50));
      return newRequest;
    },
    [requests, persist]
  );

  const clearRequests = useCallback(async () => {
    await persist([]);
  }, [persist]);

  const latestRequest = requests[0] ?? null;

  const value = useMemo<CustomPlanContextValue>(
    () => ({ requests, latestRequest, loading, createRequest, clearRequests }),
    [requests, latestRequest, loading, createRequest, clearRequests]
  );

  return <CustomPlanContext.Provider value={value}>{children}</CustomPlanContext.Provider>;
}

export function useCustomPlan() {
  const ctx = useContext(CustomPlanContext);
  if (!ctx) throw new Error('useCustomPlan must be used within a CustomPlanProvider');
  return ctx;
}
