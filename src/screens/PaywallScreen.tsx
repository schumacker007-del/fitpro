import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PurchasesPackage } from 'react-native-purchases';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton } from '../components/ui';
import LegalFooter from '../components/LegalFooter';
import { useLanguage } from '../context/LanguageContext';
import { findProPackages, getOfferings, usePurchases } from '../context/PurchasesContext';
import { canUseRealPurchases, isExpoGo, shouldUseFallbackPrices } from '../config/iap';
import { getFallbackDisplay, getFallbackNumeric, getPricingRegion } from '../config/pricing';
import { TranslationKey } from '../i18n/translations';
import { ProfileStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

const FEATURE_KEYS = [
  'paywall.feature.profile',
  'paywall.feature.basicWorkouts',
  'paywall.feature.recipes',
  'paywall.feature.fullLibrary',
  'paywall.feature.supervision',
  'paywall.feature.buildWorkout',
  'paywall.feature.customPlan',
  'paywall.feature.progressPhotos',
  'paywall.feature.noAds',
] as const;

const FEATURE_FLAGS: { free: boolean; pro: boolean }[] = [
  { free: true, pro: true },
  { free: true, pro: true },
  { free: true, pro: true },
  { free: false, pro: true },
  { free: false, pro: true },
  { free: false, pro: true },
  { free: false, pro: true },
  { free: false, pro: true },
  { free: false, pro: true },
];

function computeYearlySavingsPercent(monthlyPrice: number, yearlyPrice: number): number | null {
  const annualIfMonthly = monthlyPrice * 12;
  if (annualIfMonthly <= 0 || yearlyPrice >= annualIfMonthly) return null;
  return Math.round(((annualIfMonthly - yearlyPrice) / annualIfMonthly) * 100);
}

type PlanId = 'monthly' | 'yearly';

export default function PaywallScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'Paywall'>>();
  const { t, locale } = useLanguage();
  const {
    isDemoMode,
    isPurchasing,
    isRestoring,
    purchasePro,
    restore,
    demoPurchasePro,
  } = usePurchases();

  const [selected, setSelected] = useState<PlanId>('yearly');
  const [loadingPrices, setLoadingPrices] = useState(canUseRealPurchases());
  const [pricesError, setPricesError] = useState(false);
  const [monthlyPkg, setMonthlyPkg] = useState<PurchasesPackage | null>(null);
  const [yearlyPkg, setYearlyPkg] = useState<PurchasesPackage | null>(null);

  const pricingRegion = getPricingRegion(locale);
  const fallbackDisplay = getFallbackDisplay(pricingRegion);
  const fallbackNumeric = getFallbackNumeric(pricingRegion);

  useEffect(() => {
    if (shouldUseFallbackPrices()) {
      setLoadingPrices(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const offerings = await getOfferings();
        if (cancelled) return;
        if (offerings) {
          const { monthly, yearly } = findProPackages(offerings);
          setMonthlyPkg(monthly);
          setYearlyPkg(yearly);
          if (!monthly && !yearly) {
            setPricesError(true);
          }
        } else {
          setPricesError(true);
        }
      } catch {
        if (!cancelled) setPricesError(true);
      } finally {
        if (!cancelled) setLoadingPrices(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const getPriceLabel = useCallback(
    (plan: PlanId): string => {
      const price = shouldUseFallbackPrices()
        ? plan === 'monthly'
          ? fallbackDisplay.proMonthly
          : fallbackDisplay.proYearly
        : (plan === 'monthly' ? monthlyPkg : yearlyPkg)?.product.priceString ??
          (plan === 'monthly' ? fallbackDisplay.proMonthly : fallbackDisplay.proYearly);
      return plan === 'monthly'
        ? t('iap.pricePerMonth', { price })
        : t('iap.pricePerYear', { price });
    },
    [fallbackDisplay.proMonthly, fallbackDisplay.proYearly, monthlyPkg, t, yearlyPkg],
  );

  const handleSubscribe = async () => {
    try {
      if (isDemoMode) {
        await demoPurchasePro();
        Alert.alert(t('paywall.title'), t('iap.purchaseSuccessPro'));
        navigation.goBack();
        return;
      }

      const pkg = selected === 'monthly' ? monthlyPkg : yearlyPkg;
      if (!pkg) {
        Alert.alert(t('iap.purchaseError'), t('iap.pricesUnavailable'));
        return;
      }

      const success = await purchasePro(pkg);
      if (success) {
        Alert.alert(t('paywall.title'), t('iap.purchaseSuccessPro'));
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(t('iap.purchaseError'), error instanceof Error ? error.message : t('iap.purchaseError'));
    }
  };

  const handleRestore = async () => {
    try {
      await restore();
      Alert.alert(t('iap.restorePurchases'), t('iap.restoreSuccess'));
      navigation.goBack();
    } catch (error) {
      Alert.alert(t('iap.purchaseError'), error instanceof Error ? error.message : t('iap.purchaseError'));
    }
  };

  const yearlySavingsPercent = useMemo(() => {
    if (shouldUseFallbackPrices()) {
      return computeYearlySavingsPercent(fallbackNumeric.proMonthly, fallbackNumeric.proYearly);
    }
    const monthlyPrice = monthlyPkg?.product.price ?? fallbackNumeric.proMonthly;
    const yearlyPrice = yearlyPkg?.product.price ?? fallbackNumeric.proYearly;
    return computeYearlySavingsPercent(monthlyPrice, yearlyPrice);
  }, [monthlyPkg, yearlyPkg, fallbackNumeric.proMonthly, fallbackNumeric.proYearly]);

  const plans: { id: PlanId; label: string; badge?: string }[] = [
    { id: 'monthly', label: t('iap.planMonthly') },
    {
      id: 'yearly',
      label: t('iap.planYearly'),
      badge:
        yearlySavingsPercent != null && yearlySavingsPercent > 0
          ? t('iap.saveBadge', { percent: yearlySavingsPercent })
          : undefined,
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color={colors.text} />
          </Pressable>
        </View>

        <Ionicons name="star" size={40} color={colors.gold} style={{ alignSelf: 'center' }} />
        <Text style={[typography.h1, styles.title]}>{t('paywall.title')}</Text>
        <Text style={styles.subtitle}>{t('paywall.subtitle')}</Text>

        <Card style={{ marginTop: spacing.lg }}>
          {FEATURE_KEYS.map((key, i) => {
            const f = FEATURE_FLAGS[i];
            return (
            <View key={key} style={[styles.featureRow, i !== FEATURE_KEYS.length - 1 && styles.featureRowBorder]}>
              <Text style={styles.featureLabel}>{t(key as TranslationKey)}</Text>
              <View style={styles.featureIcons}>
                <Ionicons name={f.free ? 'checkmark' : 'close'} size={16} color={f.free ? colors.primary : colors.textMuted} />
                <Ionicons name={f.pro ? 'checkmark-circle' : 'close'} size={16} color={f.pro ? colors.gold : colors.textMuted} />
              </View>
            </View>
            );
          })}
          <View style={styles.legendRow}>
            <Text style={styles.legendText}>{t('common.free')}</Text>
            <Text style={[styles.legendText, { color: colors.gold }]}>{t('paywall.legendPro')}</Text>
          </View>
        </Card>

        {loadingPrices ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>{t('iap.loadingPrices')}</Text>
          </View>
        ) : (
          <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
            {plans.map((plan) => {
              const isSelected = selected === plan.id;
              return (
                <Pressable key={plan.id} onPress={() => setSelected(plan.id)}>
                  <Card style={[styles.planCard, isSelected && styles.planCardSelected]}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.planLabel}>{plan.label}</Text>
                      <Text style={styles.planPrice}>{getPriceLabel(plan.id)}</Text>
                    </View>
                    {plan.badge ? (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{plan.badge}</Text>
                      </View>
                    ) : null}
                    <Ionicons
                      name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                      size={20}
                      color={isSelected ? colors.primary : colors.textMuted}
                    />
                  </Card>
                </Pressable>
              );
            })}
          </View>
        )}

        {pricesError && !isDemoMode ? (
          <Text style={styles.fine}>{t('iap.pricesUnavailable')}</Text>
        ) : null}

        <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
          <PrimaryButton
            label={isPurchasing ? t('iap.purchasing') : t('iap.subscribeNow')}
            icon="star"
            variant="gold"
            onPress={handleSubscribe}
            disabled={isPurchasing || isRestoring || loadingPrices}
          />
          <PrimaryButton
            label={isRestoring ? t('iap.restoring') : t('iap.restorePurchases')}
            icon="refresh"
            variant="outline"
            onPress={handleRestore}
            disabled={isPurchasing || isRestoring || (isDemoMode && !canUseRealPurchases())}
          />
        </View>

        {isDemoMode ? (
          <Text style={styles.fine}>{t(isExpoGo() ? 'iap.expoGoNote' : 'iap.demoNote')}</Text>
        ) : null}
        <LegalFooter style={{ marginTop: spacing.sm }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  headerRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  closeBtn: { padding: 4 },
  title: { color: colors.text, textAlign: 'center', marginTop: spacing.sm },
  subtitle: { color: colors.textMuted, textAlign: 'center', marginTop: 6, lineHeight: 20, paddingHorizontal: spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  featureRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  featureLabel: { color: colors.text, flex: 1, fontSize: 13, marginRight: 8 },
  featureIcons: { flexDirection: 'row', gap: 14, width: 50, justifyContent: 'space-between' },
  legendRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginTop: 8, paddingRight: 2 },
  legendText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  planCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  planCardSelected: { borderColor: colors.primary, backgroundColor: colors.primaryMutedLight },
  planLabel: { color: colors.text, fontWeight: '800', fontSize: 15 },
  planPrice: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  badge: { backgroundColor: colors.gold, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { color: '#0B1210', fontSize: 10, fontWeight: '800' },
  loadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.lg },
  loadingText: { color: colors.textMuted, fontSize: 13 },
  fine: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: spacing.md, lineHeight: 16 },
});
