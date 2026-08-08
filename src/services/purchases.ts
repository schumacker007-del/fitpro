import { Linking, Platform } from 'react-native';
import {
  canUseRealPurchases,
  getRevenueCatApiKey,
  IAP_ENTITLEMENTS,
  IAP_PRODUCT_IDS,
} from '../config/iap';
import { POWERLIFTING_ADVANCED_DURATION_DAYS } from '../context/UserContext';

export type { CustomerInfo, PurchasesOfferings, PurchasesPackage } from 'react-native-purchases';

export interface EntitlementSyncResult {
  planTier: 'free' | 'pro';
  powerliftingAdvanced: {
    unlockedAt: string;
    expiresAt: string;
  } | null;
}

type PurchasesModule = typeof import('react-native-purchases');

let purchasesModule: PurchasesModule | null = null;
let configured = false;

async function loadPurchasesModule(): Promise<PurchasesModule | null> {
  if (!canUseRealPurchases()) return null;
  if (!purchasesModule) {
    purchasesModule = await import('react-native-purchases');
  }
  return purchasesModule;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export async function configurePurchases(userId?: string): Promise<void> {
  if (!canUseRealPurchases()) return;

  const apiKey = getRevenueCatApiKey();
  if (!apiKey || apiKey.length < 8) return;
  if (apiKey.startsWith('test_') && !__DEV__) return;

  const mod = await loadPurchasesModule();
  if (!mod) return;

  const { default: Purchases, LOG_LEVEL } = mod;

  if (!configured) {
    if (__DEV__) {
      await Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    }
    Purchases.configure({ apiKey, appUserID: userId });
    configured = true;
    return;
  }

  await syncPurchasesUser(userId);
}

export async function syncPurchasesUser(userId?: string): Promise<void> {
  if (!canUseRealPurchases() || !configured) return;

  const mod = await loadPurchasesModule();
  if (!mod) return;

  const { default: Purchases } = mod;
  if (userId) {
    await Purchases.logIn(userId);
  } else {
    await Purchases.logOut();
  }
}

export async function getOfferings(): Promise<import('react-native-purchases').PurchasesOfferings | null> {
  const mod = await loadPurchasesModule();
  if (!mod) return null;
  return mod.default.getOfferings();
}

export function findProPackages(offerings: import('react-native-purchases').PurchasesOfferings): {
  monthly: import('react-native-purchases').PurchasesPackage | null;
  yearly: import('react-native-purchases').PurchasesPackage | null;
} {
  const current = offerings.current;
  if (!current) {
    return { monthly: null, yearly: null };
  }

  const monthly =
    current.availablePackages.find(
      (pkg) =>
        pkg.packageType === 'MONTHLY' ||
        pkg.product.identifier === IAP_PRODUCT_IDS.proMonthly,
    ) ?? null;

  const yearly =
    current.availablePackages.find(
      (pkg) =>
        pkg.packageType === 'ANNUAL' ||
        pkg.product.identifier === IAP_PRODUCT_IDS.proYearly,
    ) ?? null;

  return { monthly, yearly };
}

export function findPowerliftingPackage(
  offerings: import('react-native-purchases').PurchasesOfferings,
): import('react-native-purchases').PurchasesPackage | null {
  for (const offering of Object.values(offerings.all)) {
    const match = offering.availablePackages.find(
      (pkg) => pkg.product.identifier === IAP_PRODUCT_IDS.powerliftingAdvanced,
    );
    if (match) return match;
  }
  return null;
}

export async function purchaseProPackage(
  pkg: import('react-native-purchases').PurchasesPackage,
): Promise<import('react-native-purchases').CustomerInfo> {
  const mod = await loadPurchasesModule();
  if (!mod) throw new Error('Purchases unavailable');
  const { customerInfo } = await mod.default.purchasePackage(pkg);
  return customerInfo;
}

export async function purchasePowerliftingAdvanced(): Promise<import('react-native-purchases').CustomerInfo> {
  const mod = await loadPurchasesModule();
  if (!mod) throw new Error('Purchases unavailable');

  const offerings = await getOfferings();
  if (!offerings) {
    throw new Error('Offerings unavailable');
  }

  const pkg = findPowerliftingPackage(offerings);
  if (pkg) {
    const { customerInfo } = await mod.default.purchasePackage(pkg);
    return customerInfo;
  }

  const products = await mod.default.getProducts([IAP_PRODUCT_IDS.powerliftingAdvanced]);
  if (products.length === 0) {
    throw new Error('Powerlifting product not found');
  }

  const { customerInfo } = await mod.default.purchaseStoreProduct(products[0]);
  return customerInfo;
}

export async function restorePurchases(): Promise<import('react-native-purchases').CustomerInfo> {
  const mod = await loadPurchasesModule();
  if (!mod) throw new Error('Purchases unavailable');
  return mod.default.restorePurchases();
}

export function mapCustomerInfoToEntitlements(
  customerInfo: import('react-native-purchases').CustomerInfo,
): EntitlementSyncResult {
  const proEntitlement = customerInfo.entitlements.active[IAP_ENTITLEMENTS.pro];
  const proActive = proEntitlement?.isActive ?? false;

  const plEntitlement = customerInfo.entitlements.active[IAP_ENTITLEMENTS.powerliftingAdvanced];
  let powerliftingAdvanced: EntitlementSyncResult['powerliftingAdvanced'] = null;

  if (plEntitlement?.isActive) {
    const now = new Date();
    const unlockedAt = plEntitlement.latestPurchaseDate
      ? new Date(plEntitlement.latestPurchaseDate)
      : now;
    const expiresAt = plEntitlement.expirationDate
      ? new Date(plEntitlement.expirationDate)
      : addDays(unlockedAt, POWERLIFTING_ADVANCED_DURATION_DAYS);

    powerliftingAdvanced = {
      unlockedAt: unlockedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };
  }

  return {
    planTier: proActive ? 'pro' : 'free',
    powerliftingAdvanced,
  };
}

export async function syncEntitlementsFromRevenueCat(): Promise<EntitlementSyncResult | null> {
  if (!canUseRealPurchases()) return null;
  const mod = await loadPurchasesModule();
  if (!mod) return null;
  const customerInfo = await mod.default.getCustomerInfo();
  return mapCustomerInfoToEntitlements(customerInfo);
}

export function openManageSubscriptions(): void {
  if (Platform.OS === 'ios') {
    void Linking.openURL('https://apps.apple.com/account/subscriptions');
    return;
  }

  if (Platform.OS === 'android') {
    void Linking.openURL('https://play.google.com/store/account/subscriptions?package=com.luizschumacker.training');
  }
}

export function isPurchaseCancelled(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  if ('userCancelled' in error && (error as { userCancelled?: boolean }).userCancelled) {
    return true;
  }
  if ('code' in error && (error as { code?: string }).code === 'PURCHASE_CANCELLED_ERROR') {
    return true;
  }
  return false;
}

export function getPurchaseErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message?: unknown }).message);
  }
  return 'Unknown purchase error';
}
