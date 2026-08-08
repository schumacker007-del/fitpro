import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

/** RevenueCat entitlement identifiers — must match RevenueCat dashboard. */
export const IAP_ENTITLEMENTS = {
  pro: 'pro',
  powerliftingAdvanced: 'powerlifting_advanced',
} as const;

/** App Store / Play Store product identifiers — must match store consoles. */
export const IAP_PRODUCT_IDS = {
  proMonthly: 'fitpro_pro_monthly',
  proYearly: 'fitpro_pro_yearly',
  powerliftingAdvanced: 'fitpro_powerlifting_advanced',
} as const;

export const REVENUECAT_IOS_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ?? '';
export const REVENUECAT_ANDROID_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY ?? '';

export function getRevenueCatApiKey(): string {
  return Platform.OS === 'ios' ? REVENUECAT_IOS_API_KEY : REVENUECAT_ANDROID_API_KEY;
}

export function isRevenueCatConfigured(): boolean {
  return Boolean(getRevenueCatApiKey());
}

export function isExpoGo(): boolean {
  return (
    Constants.appOwnership === 'expo' ||
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient
  );
}

/** True when real store purchases can be attempted (API key + native build, not Expo Go). */
export function canUseRealPurchases(): boolean {
  return isRevenueCatConfigured() && Platform.OS !== 'web' && !isExpoGo();
}

/** Use localized fallback prices instead of RevenueCat offerings (Expo Go / demo). */
export function shouldUseFallbackPrices(): boolean {
  return !canUseRealPurchases();
}

/** Dev-only demo purchases when real store purchases are unavailable. */
export function isDemoPurchaseMode(): boolean {
  return __DEV__ && !canUseRealPurchases();
}
