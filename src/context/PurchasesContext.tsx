import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { PurchasesPackage } from 'react-native-purchases';
import { isDemoPurchaseMode } from '../config/iap';
import { useAuth } from './AuthContext';
import { useUser } from './UserContext';
import {
  configurePurchases,
  getOfferings,
  getPurchaseErrorMessage,
  isPurchaseCancelled,
  mapCustomerInfoToEntitlements,
  openManageSubscriptions,
  purchasePowerliftingAdvanced,
  purchaseProPackage,
  restorePurchases,
  syncEntitlementsFromRevenueCat,
  syncPurchasesUser,
} from '../services/purchases';

interface PurchasesContextValue {
  isDemoMode: boolean;
  isReady: boolean;
  isPurchasing: boolean;
  isRestoring: boolean;
  purchasePro: (pkg: PurchasesPackage) => Promise<boolean>;
  purchasePowerlifting: () => Promise<boolean>;
  restore: () => Promise<boolean>;
  openManageSubscriptions: () => void;
  demoPurchasePro: () => Promise<void>;
  demoPurchasePowerlifting: () => Promise<void>;
}

const PurchasesContext = createContext<PurchasesContextValue | undefined>(undefined);

export function PurchasesProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const { applyEntitlements, upgradeToPro, unlockPowerliftingAdvanced } = useUser();
  const [isReady, setIsReady] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const isDemoMode = isDemoPurchaseMode();

  const syncToUser = useCallback(async () => {
    const entitlements = await syncEntitlementsFromRevenueCat();
    if (entitlements) {
      await applyEntitlements(entitlements);
    }
  }, [applyEntitlements]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await configurePurchases(session?.userId);
        await syncPurchasesUser(session?.userId);
        if (!cancelled) {
          await syncToUser();
        }
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [session?.userId, syncToUser]);

  const purchasePro = useCallback(
    async (pkg: PurchasesPackage): Promise<boolean> => {
      setIsPurchasing(true);
      try {
        const customerInfo = await purchaseProPackage(pkg);
        await applyEntitlements(mapCustomerInfoToEntitlements(customerInfo));
        return true;
      } catch (error) {
        if (!isPurchaseCancelled(error)) {
          throw new Error(getPurchaseErrorMessage(error));
        }
        return false;
      } finally {
        setIsPurchasing(false);
      }
    },
    [applyEntitlements],
  );

  const purchasePowerlifting = useCallback(async (): Promise<boolean> => {
    setIsPurchasing(true);
    try {
      const customerInfo = await purchasePowerliftingAdvanced();
      await applyEntitlements(mapCustomerInfoToEntitlements(customerInfo));
      return true;
    } catch (error) {
      if (!isPurchaseCancelled(error)) {
        throw new Error(getPurchaseErrorMessage(error));
      }
      return false;
    } finally {
      setIsPurchasing(false);
    }
  }, [applyEntitlements]);

  const restore = useCallback(async (): Promise<boolean> => {
    setIsRestoring(true);
    try {
      const customerInfo = await restorePurchases();
      await applyEntitlements(mapCustomerInfoToEntitlements(customerInfo));
      return true;
    } catch (error) {
      throw new Error(getPurchaseErrorMessage(error));
    } finally {
      setIsRestoring(false);
    }
  }, [applyEntitlements]);

  const demoPurchasePro = useCallback(async () => {
    await upgradeToPro();
  }, [upgradeToPro]);

  const demoPurchasePowerlifting = useCallback(async () => {
    await unlockPowerliftingAdvanced();
  }, [unlockPowerliftingAdvanced]);

  const value = useMemo(
    (): PurchasesContextValue => ({
      isDemoMode,
      isReady,
      isPurchasing,
      isRestoring,
      purchasePro,
      purchasePowerlifting,
      restore,
      openManageSubscriptions,
      demoPurchasePro,
      demoPurchasePowerlifting,
    }),
    [
      isDemoMode,
      isReady,
      isPurchasing,
      isRestoring,
      purchasePro,
      purchasePowerlifting,
      restore,
      demoPurchasePro,
      demoPurchasePowerlifting,
    ],
  );

  return <PurchasesContext.Provider value={value}>{children}</PurchasesContext.Provider>;
}

export function usePurchases() {
  const ctx = useContext(PurchasesContext);
  if (!ctx) throw new Error('usePurchases must be used within PurchasesProvider');
  return ctx;
}

export { getOfferings, findProPackages, findPowerliftingPackage } from '../services/purchases';
export type { PurchasesPackage } from 'react-native-purchases';
