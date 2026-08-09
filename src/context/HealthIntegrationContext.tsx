import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BodyMeasurementId } from '../data/bodyMeasurements';
import {
  getHealthAuthorizationStatus,
  getHealthPlatform,
  isHealthKitSupported,
  requestHealthAuthorization,
  saveBodyMeasurementToHealth,
  saveHeightToHealth,
  saveWeightToHealth,
  saveWorkoutToHealth,
} from '../services/appleHealth';
import {
  DEFAULT_HEALTH_INTEGRATION_SETTINGS,
  HealthAuthorizationStatus,
  HealthIntegrationSettings,
  HealthPlatform,
} from '../types/healthIntegration';

const STORAGE_KEY = '@fitpro/health_integration';

interface HealthIntegrationContextValue {
  settings: HealthIntegrationSettings;
  loaded: boolean;
  platform: HealthPlatform;
  isSupported: boolean;
  authorizationStatus: HealthAuthorizationStatus;
  refreshAuthorizationStatus: () => Promise<void>;
  setSaveWorkouts: (enabled: boolean) => Promise<boolean>;
  setSyncBodyMetrics: (enabled: boolean) => Promise<boolean>;
  syncCompletedWorkout: (params: { title: string; startDate: Date; endDate: Date }) => Promise<void>;
  syncProfileBodyMetrics: (weightKg: number, heightCm: number) => Promise<void>;
  syncBodyMeasurement: (id: BodyMeasurementId, valueCm: number) => Promise<void>;
}

const HealthIntegrationContext = createContext<HealthIntegrationContextValue | undefined>(undefined);

export function HealthIntegrationProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<HealthIntegrationSettings>(DEFAULT_HEALTH_INTEGRATION_SETTINGS);
  const [loaded, setLoaded] = useState(false);
  const [authorizationStatus, setAuthorizationStatus] = useState<HealthAuthorizationStatus>('unavailable');

  const platform = getHealthPlatform();
  const isSupported = isHealthKitSupported();

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as HealthIntegrationSettings;
          setSettings({ ...DEFAULT_HEALTH_INTEGRATION_SETTINGS, ...parsed });
        }
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const refreshAuthorizationStatus = useCallback(async () => {
    const status = await getHealthAuthorizationStatus();
    setAuthorizationStatus(status);
  }, []);

  // Do not touch native HealthKit on mount — authorization is refreshed on demand only.

  const persistSettings = useCallback(async (next: HealthIntegrationSettings) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSettings(next);
  }, []);

  const setSaveWorkouts = useCallback(
    async (enabled: boolean) => {
      if (!enabled) {
        await persistSettings({ ...settings, saveWorkouts: false });
        return true;
      }
      if (!isSupported) return false;
      const granted = await requestHealthAuthorization({ workouts: true, bodyMetrics: settings.syncBodyMetrics });
      await refreshAuthorizationStatus();
      if (!granted) return false;
      await persistSettings({ ...settings, saveWorkouts: true });
      return true;
    },
    [isSupported, persistSettings, refreshAuthorizationStatus, settings],
  );

  const setSyncBodyMetrics = useCallback(
    async (enabled: boolean) => {
      if (!enabled) {
        await persistSettings({ ...settings, syncBodyMetrics: false });
        return true;
      }
      if (!isSupported) return false;
      const granted = await requestHealthAuthorization({ workouts: settings.saveWorkouts, bodyMetrics: true });
      await refreshAuthorizationStatus();
      if (!granted) return false;
      await persistSettings({ ...settings, syncBodyMetrics: true });
      return true;
    },
    [isSupported, persistSettings, refreshAuthorizationStatus, settings],
  );

  const syncCompletedWorkout = useCallback(
    async (params: { title: string; startDate: Date; endDate: Date }) => {
      if (!settings.saveWorkouts || !isSupported) return;
      await saveWorkoutToHealth(params);
    },
    [isSupported, settings.saveWorkouts],
  );

  const syncProfileBodyMetrics = useCallback(
    async (weightKg: number, heightCm: number) => {
      if (!settings.syncBodyMetrics || !isSupported) return;
      await Promise.all([saveWeightToHealth(weightKg), saveHeightToHealth(heightCm)]);
    },
    [isSupported, settings.syncBodyMetrics],
  );

  const syncBodyMeasurement = useCallback(
    async (id: BodyMeasurementId, valueCm: number) => {
      if (!settings.syncBodyMetrics || !isSupported) return;
      await saveBodyMeasurementToHealth(id, valueCm);
    },
    [isSupported, settings.syncBodyMetrics],
  );

  const value = useMemo(
    () => ({
      settings,
      loaded,
      platform,
      isSupported,
      authorizationStatus,
      refreshAuthorizationStatus,
      setSaveWorkouts,
      setSyncBodyMetrics,
      syncCompletedWorkout,
      syncProfileBodyMetrics,
      syncBodyMeasurement,
    }),
    [
      settings,
      loaded,
      platform,
      isSupported,
      authorizationStatus,
      refreshAuthorizationStatus,
      setSaveWorkouts,
      setSyncBodyMetrics,
      syncCompletedWorkout,
      syncProfileBodyMetrics,
      syncBodyMeasurement,
    ],
  );

  return <HealthIntegrationContext.Provider value={value}>{children}</HealthIntegrationContext.Provider>;
}

export function useHealthIntegration() {
  const ctx = useContext(HealthIntegrationContext);
  if (!ctx) throw new Error('useHealthIntegration must be used within HealthIntegrationProvider');
  return ctx;
}
