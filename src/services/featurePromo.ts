import AsyncStorage from '@react-native-async-storage/async-storage';

export type FeaturePromoVariant = 'customPlan' | 'pro';

const STORAGE_KEYS: Record<FeaturePromoVariant, string> = {
  customPlan: '@fitpro/promo_seen_custom_plan',
  pro: '@fitpro/promo_seen_pro',
};

export async function hasSeenFeaturePromo(variant: FeaturePromoVariant): Promise<boolean> {
  const value = await AsyncStorage.getItem(STORAGE_KEYS[variant]);
  return value === '1';
}

export async function markFeaturePromoSeen(variant: FeaturePromoVariant): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS[variant], '1');
}

export const FEATURE_PROMO_STORAGE_KEYS = Object.values(STORAGE_KEYS);
