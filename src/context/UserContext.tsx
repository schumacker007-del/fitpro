import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PlanTier, UserProfile } from '../types';

const PROFILE_KEY = '@fitpro/profile';
const PLAN_KEY = '@fitpro/plan';

interface UserContextValue {
  profile: UserProfile | null;
  planTier: PlanTier;
  loading: boolean;
  isOnboarded: boolean;
  bmi: number | null;
  saveProfile: (profile: UserProfile) => Promise<void>;
  upgradeToPro: () => Promise<void>;
  downgradeToFree: () => Promise<void>;
  resetProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [planTier, setPlanTier] = useState<PlanTier>('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [rawProfile, rawPlan] = await Promise.all([
          AsyncStorage.getItem(PROFILE_KEY),
          AsyncStorage.getItem(PLAN_KEY),
        ]);
        if (rawProfile) setProfile(JSON.parse(rawProfile));
        if (rawPlan === 'pro') setPlanTier('pro');
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

  const downgradeToFree = useCallback(async () => {
    setPlanTier('free');
    await AsyncStorage.setItem(PLAN_KEY, 'free');
  }, []);

  const resetProfile = useCallback(async () => {
    setProfile(null);
    setPlanTier('free');
    await AsyncStorage.multiRemove([PROFILE_KEY, PLAN_KEY]);
  }, []);

  const bmi = useMemo(() => {
    if (!profile) return null;
    const heightM = profile.heightCm / 100;
    if (!heightM) return null;
    return profile.weightKg / (heightM * heightM);
  }, [profile]);

  const value: UserContextValue = {
    profile,
    planTier,
    loading,
    isOnboarded: !!profile,
    bmi,
    saveProfile,
    upgradeToPro,
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
