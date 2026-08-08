import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { wipeAllUserData } from '../services/accountDeletion';

const AUTH_SESSION_KEY = '@fitpro/auth_session';

export type AuthProvider = 'google' | 'apple' | 'facebook';

export interface AuthUserSession {
  provider: AuthProvider;
  userId: string;
  email?: string;
  name?: string;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  provider: AuthProvider | null;
  session: AuthUserSession | null;
  loading: boolean;
  loginWithSession: (session: AuthUserSession) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function parseSession(raw: string | null): AuthUserSession | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AuthUserSession;
    if (parsed.provider && parsed.userId) return parsed;
  } catch {
    if (raw === 'google' || raw === 'apple' || raw === 'facebook') {
      return { provider: raw, userId: raw };
    }
  }
  return null;
}

export function AuthProvider({
  children,
  onAccountDeleted,
}: {
  children: React.ReactNode;
  onAccountDeleted?: () => void;
}) {
  const [session, setSession] = useState<AuthUserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(AUTH_SESSION_KEY)
      .then((raw) => setSession(parseSession(raw)))
      .finally(() => setLoading(false));
  }, []);

  const loginWithSession = useCallback(async (next: AuthUserSession) => {
    await AsyncStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(next));
    setSession(next);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_SESSION_KEY);
    setSession(null);
  }, []);

  const deleteAccount = useCallback(async () => {
    await wipeAllUserData();
    setSession(null);
    onAccountDeleted?.();
  }, [onAccountDeleted]);

  const value = useMemo(
    () => ({
      isLoggedIn: session != null,
      provider: session?.provider ?? null,
      session,
      loading,
      loginWithSession,
      logout,
      deleteAccount,
    }),
    [session, loading, loginWithSession, logout, deleteAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
