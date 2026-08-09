import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface MainUnlockContextValue {
  mainUnlocked: boolean;
  unlockMain: () => void;
}

const MainUnlockContext = createContext<MainUnlockContextValue | undefined>(undefined);

export function MainUnlockProvider({ children }: { children: React.ReactNode }) {
  const [mainUnlocked, setMainUnlocked] = useState(false);

  const unlockMain = useCallback(() => {
    requestAnimationFrame(() => {
      setTimeout(() => setMainUnlocked(true), 50);
    });
  }, []);

  const value = useMemo(
    () => ({
      mainUnlocked,
      unlockMain,
    }),
    [mainUnlocked, unlockMain],
  );

  return <MainUnlockContext.Provider value={value}>{children}</MainUnlockContext.Provider>;
}

export function useMainUnlock() {
  const ctx = useContext(MainUnlockContext);
  if (!ctx) throw new Error('useMainUnlock must be used within MainUnlockProvider');
  return ctx;
}
