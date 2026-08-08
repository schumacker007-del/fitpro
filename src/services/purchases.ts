import Purchases, {
  CustomerInfo,
  LOG_LEVEL,
  PACKAGE_TYPE,
  PurchasesOfferings,
  PurchasesPackage,
  PURCHASES_ERROR_CODE,
} from 'react-native-purchases';
import { Linking, Platform } from 'react-native';
import {
  canUseRealPurchases,
  getRevenueCatApiKey,
  IAP_ENTITLEMENTS,
  IAP_PRODUCT_IDS,
} from '../config/iap';
import { POWERLIFTING_ADVANCED_DURATION_DAYS } from '../context/UserContext';

export interface EntitlementSyncResult {
  planTier: 'free' | 'pro';
  powerliftingAdvanced: {
    unlockedAt: string;
    expiresAt: string;
  } | null;
}

let configured = false;

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

  if (userId) {
    await Purchases.logIn(userId);
  } else {
    await Purchases.logOut();
  }
}

export async function getOfferings(): Promise<PurchasesOfferings | null> {
  if (!canUseRealPurchases()) return null;
  return Purchases.getOfferings();
}

export function findProPackages(offerings: PurchasesOfferings): {
  monthly: PurchasesPackage | null;
  yearly: PurchasesPackage | null;
} {
  const current = offerings.current;
  if (!current) {
    return { monthly: null, yearly: null };
  }

  const monthly =
    current.availablePackages.find(
      (pkg) =>
        pkg.packageType === PACKAGE_TYPE.MONTHLY ||
        pkg.product.identifier === IAP_PRODUCT_IDS.proMonthly,
    ) ?? null;

  const yearly =
    current.availablePackages.find(
      (pkg) =>
        pkg.packageType === PACKAGE_TYPE.ANNUAL ||
        pkg.product.identifier === IAP_PRODUCT_IDS.proYearly,
    ) ?? null;

  return { monthly, yearly };
}

export function findPowerliftingPackage(offerings: PurchasesOfferings): PurchasesPackage | null {
  for (const offering of Object.values(offerings.all)) {
    const match = offering.availablePackages.find(
      (pkg) => pkg.product.identifier === IAP_PRODUCT_IDS.powerliftingAdvanced,
    );
    if (match) return match;
  }
  return null;
}

export async function purchaseProPackage(pkg: PurchasesPackage): Promise<CustomerInfo> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo;
}

export async function purchasePowerliftingAdvanced(): Promise<CustomerInfo> {
  const offerings = await getOfferings();
  if (!offerings) {
    throw new Error('Offerings unavailable');
  }

  const pkg = findPowerliftingPackage(offerings);
  if (pkg) {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return customerInfo;
  }

  const products = await Purchases.getProducts([IAP_PRODUCT_IDS.powerliftingAdvanced]);
  if (products.length === 0) {
    throw new Error('Powerlifting product not found');
  }

  const { customerInfo } = await Purchases.purchaseStoreProduct(products[0]);
  return customerInfo;
}

export async function restorePurchases(): Promise<CustomerInfo> {
  return Purchases.restorePurchases();
}

export function mapCustomerInfoToEntitlements(customerInfo: CustomerInfo): EntitlementSyncResult {
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
  const customerInfo = await Purchases.getCustomerInfo();
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
  if ('code' in error && (error as { code?: string }).code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
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
