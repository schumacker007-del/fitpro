import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { EntitlementSyncResult } from '../services/purchases';
import { normalizeInjuryAreas } from '../utils/injurySelection';
import { PlanTier, UserProfile } from '../types';

const PROFILE_KEY = '@fitpro/profile';
const PLAN_KEY = '@fitpro/plan';
const POWERLIFTING_ADVANCED_KEY = '@fitpro/powerlifting_advanced';

export const POWERLIFTING_ADVANCED_DURATION_DAYS = 90;

export interface PowerliftingAdvancedAccess {
  unlockedAt: string;
  expiresAt: string;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function parsePowerliftingAdvancedAccess(raw: string | null): PowerliftingAdvancedAccess | null {
  if (!raw) return null;
  if (raw === 'true') {
    const now = new Date();
    return {
      unlockedAt: now.toISOString(),
      expiresAt: addDays(now, POWERLIFTING_ADVANCED_DURATION_DAYS).toISOString(),
    };
  }
  try {
    const parsed = JSON.parse(raw) as PowerliftingAdvancedAccess;
    if (parsed.unlockedAt && parsed.expiresAt) return parsed;
  } catch {
    // ignore invalid storage
  }
  return null;
}

export function isPowerliftingAdvancedAccessActive(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt) > new Date();
}

interface UserContextValue {
  profile: UserProfile | null;
  planTier: PlanTier;
  powerliftingAdvancedExpiresAt: string | null;
  isPowerliftingAdvancedActive: boolean;
  loading: boolean;
  isOnboarded: boolean;
  bmi: number | null;
  saveProfile: (profile: UserProfile) => Promise<void>;
  upgradeToPro: () => Promise<void>;
  unlockPowerliftingAdvanced: () => Promise<void>;
  applyEntitlements: (entitlements: EntitlementSyncResult) => Promise<void>;
  downgradeToFree: () => Promise<void>;
  resetProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [planTier, setPlanTier] = useState<PlanTier>('free');
  const [powerliftingAdvancedAccess, setPowerliftingAdvancedAccess] = useState<PowerliftingAdvancedAccess | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [rawProfile, rawPlan, rawPlAdvanced] = await Promise.all([
          AsyncStorage.getItem(PROFILE_KEY),
          AsyncStorage.getItem(PLAN_KEY),
          AsyncStorage.getItem(POWERLIFTING_ADVANCED_KEY),
        ]);
        if (rawProfile) {
          const parsed = JSON.parse(rawProfile) as UserProfile;
          setProfile({ ...parsed, injuryAreas: normalizeInjuryAreas(parsed.injuryAreas) });
        }
        if (rawPlan === 'pro') setPlanTier('pro');

        const access = parsePowerliftingAdvancedAccess(rawPlAdvanced);
        if (access) {
          setPowerliftingAdvancedAccess(access);
          if (rawPlAdvanced === 'true') {
            await AsyncStorage.setItem(POWERLIFTING_ADVANCED_KEY, JSON.stringify(access));
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveProfile = useCallback(async (next: UserProfile) => {
    setProfile(next);
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  }, []);

  const upgradeToPro = useCallback(async () => {
    setPlanTier('pro');
    await AsyncStorage.setItem(PLAN_KEY, 'pro');
  }, []);

  const unlockPowerliftingAdvanced = useCallback(async () => {
    const now = new Date();
    const access: PowerliftingAdvancedAccess = {
      unlockedAt: now.toISOString(),
      expiresAt: addDays(now, POWERLIFTING_ADVANCED_DURATION_DAYS).toISOString(),
    };
    setPowerliftingAdvancedAccess(access);
    await AsyncStorage.setItem(POWERLIFTING_ADVANCED_KEY, JSON.stringify(access));
  }, []);

  const applyEntitlements = useCallback(async (entitlements: EntitlementSyncResult) => {
    setPlanTier(entitlements.planTier);
    await AsyncStorage.setItem(PLAN_KEY, entitlements.planTier);

    if (entitlements.powerliftingAdvanced) {
      setPowerliftingAdvancedAccess(entitlements.powerliftingAdvanced);
      await AsyncStorage.setItem(
        POWERLIFTING_ADVANCED_KEY,
        JSON.stringify(entitlements.powerliftingAdvanced),
      );
    } else {
      setPowerliftingAdvancedAccess(null);
      await AsyncStorage.removeItem(POWERLIFTING_ADVANCED_KEY);
    }
  }, []);

  const downgradeToFree = useCallback(async () => {
    setPlanTier('free');
    await AsyncStorage.setItem(PLAN_KEY, 'free');
  }, []);

  const resetProfile = useCallback(async () => {
    setProfile(null);
    setPlanTier('free');
    setPowerliftingAdvancedAccess(null);
    await AsyncStorage.multiRemove([PROFILE_KEY, PLAN_KEY, POWERLIFTING_ADVANCED_KEY]);
  }, []);

  const powerliftingAdvancedExpiresAt = powerliftingAdvancedAccess?.expiresAt ?? null;

  const isPowerliftingAdvancedActive = useMemo(
    () => isPowerliftingAdvancedAccessActive(powerliftingAdvancedExpiresAt),
    [powerliftingAdvancedExpiresAt]
  );

  const bmi = useMemo(() => {
    if (!profile) return null;
    const heightM = profile.heightCm / 100;
    if (!heightM) return null;
    return profile.weightKg / (heightM * heightM);
  }, [profile]);

  const value: UserContextValue = {
    profile,
    planTier,
    powerliftingAdvancedExpiresAt,
    isPowerliftingAdvancedActive,
    loading,
    isOnboarded: !!profile,
    bmi,
    saveProfile,
    upgradeToPro,
    unlockPowerliftingAdvanced,
    applyEntitlements,
    downgradeToFree,
    resetProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
