import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PowerliftingAdvancedVideoGallery from '../components/PowerliftingAdvancedVideoGallery';
import LegalFooter from '../components/LegalFooter';
import { Card, PrimaryButton } from '../components/ui';
import { canUseRealPurchases, isExpoGo } from '../config/iap';
import { useLanguage } from '../context/LanguageContext';
import { usePurchases } from '../context/PurchasesContext';
import { useStoreProductPrices } from '../hooks/useStoreProductPrices';
import {
  POWERLIFTING_ADVANCED_FEATURES,
  POWERLIFTING_ADVANCED_PAYWALL_LEAD,
  POWERLIFTING_ADVANCED_PAYWALL_SUBTITLE,
  POWERLIFTING_ADVANCED_PRICE_NOTE,
  POWERLIFTING_ADVANCED_PRO_NOTE,
  POWERLIFTING_ADVANCED_PROGRESS_VIDEOS,
  POWERLIFTING_ADVANCED_UNLOCK_ALERT,
  POWERLIFTING_TAGLINE,
} from '../data/powerlifting';
import { RESPONSIBLE_PROFESSIONAL } from '../data/professional';
import { WorkoutsStackParamList } from '../navigation/types';
import { navigateBackOrFallback } from '../navigation/navigateFromSearch';
import { colors, spacing, typography } from '../theme';

export default function PowerliftingAdvancedPaywallScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'PowerliftingAdvancedPaywall'>>();
  const { t } = useLanguage();
  const {
    isDemoMode,
    isPurchasing,
    isRestoring,
    purchasePowerlifting,
    restore,
    demoPurchasePowerlifting,
  } = usePurchases();
  const { width: windowWidth } = useWindowDimensions();
  const videoWidth = windowWidth - spacing.lg * 2;

  const { powerliftingPrice, loading: loadingPrice } = useStoreProductPrices();
  const priceLabel = powerliftingPrice;

  const handlePurchase = async () => {
    try {
      if (isDemoMode) {
        await demoPurchasePowerlifting();
        Alert.alert(POWERLIFTING_ADVANCED_UNLOCK_ALERT.title, POWERLIFTING_ADVANCED_UNLOCK_ALERT.message);
        navigation.replace('PowerliftingLevel', { levelId: 'avancado' });
        return;
      }

      const success = await purchasePowerlifting();
      if (success) {
        Alert.alert(POWERLIFTING_ADVANCED_UNLOCK_ALERT.title, t('iap.purchaseSuccessPowerlifting'));
        navigation.replace('PowerliftingLevel', { levelId: 'avancado' });
      }
    } catch (error) {
      Alert.alert(t('iap.purchaseError'), error instanceof Error ? error.message : t('iap.purchaseError'));
    }
  };

  const handleRestore = async () => {
    try {
      await restore();
      Alert.alert(t('iap.restorePurchases'), t('iap.restoreSuccess'));
    } catch (error) {
      Alert.alert(t('iap.purchaseError'), error instanceof Error ? error.message : t('iap.purchaseError'));
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => navigateBackOrFallback(navigation, 'Powerlifting')}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={22} color={colors.text} />
          </Pressable>
        </View>

        <PowerliftingAdvancedVideoGallery
          clips={POWERLIFTING_ADVANCED_PROGRESS_VIDEOS}
          height={200}
          layout="carousel"
          slideWidth={videoWidth}
          staticPreview
        />

        <Text style={[typography.h1, styles.title]}>Powerlifting Avançado</Text>
        <Text style={styles.tagline}>{POWERLIFTING_TAGLINE}</Text>
        <Text style={styles.subtitle}>{POWERLIFTING_ADVANCED_PAYWALL_SUBTITLE}</Text>

        <Card style={styles.proCard}>
          <View style={styles.proRow}>
            <View style={styles.proAvatar}>
              <Ionicons name="school-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.proName}>{RESPONSIBLE_PROFESSIONAL.name}</Text>
              <Text style={styles.proRole}>{RESPONSIBLE_PROFESSIONAL.role}</Text>
              <Text style={styles.proCredential}>{RESPONSIBLE_PROFESSIONAL.credential}</Text>
            </View>
          </View>
          <Text style={styles.proNote}>{POWERLIFTING_ADVANCED_PRO_NOTE}</Text>
        </Card>

        <Text style={styles.lead}>{POWERLIFTING_ADVANCED_PAYWALL_LEAD}</Text>

        <Card style={styles.priceCard}>
          <Text style={styles.priceLabel}>{t('powerlifting.advanced.accessDuration')}</Text>
          {loadingPrice ? (
            <ActivityIndicator color={colors.gold} style={{ marginTop: spacing.sm }} />
          ) : (
            <Text style={styles.price}>{priceLabel}</Text>
          )}
          <Text style={styles.priceNote}>{POWERLIFTING_ADVANCED_PRICE_NOTE}</Text>
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          {POWERLIFTING_ADVANCED_FEATURES.map((feature, index) => (
            <View
              key={feature}
              style={[
                styles.featureRow,
                index !== POWERLIFTING_ADVANCED_FEATURES.length - 1 && styles.featureRowBorder,
              ]}
            >
              <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </Card>

        <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
          <PrimaryButton
            label={isPurchasing ? t('iap.purchasing') : `Desbloquear — ${priceLabel}`}
            icon="lock-open"
            variant="gold"
            onPress={handlePurchase}
            disabled={isPurchasing || isRestoring || loadingPrice}
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
  headerRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: spacing.sm },
  closeBtn: { padding: 4 },
  title: { color: colors.text, textAlign: 'center', marginTop: spacing.lg, fontSize: 24 },
  tagline: {
    color: colors.gold,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
    paddingHorizontal: spacing.sm,
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: spacing.sm,
  },
  proCard: { marginTop: spacing.lg },
  proRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  proAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proName: { color: colors.text, fontWeight: '800', fontSize: 14 },
  proRole: { color: colors.textMuted, fontSize: 12, marginTop: 1 },
  proCredential: { color: colors.primary, fontSize: 11, marginTop: 1, fontWeight: '700' },
  proNote: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  lead: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20,
    marginTop: spacing.md,
    textAlign: 'center',
    paddingHorizontal: spacing.xs,
  },
  priceCard: { marginTop: spacing.lg, alignItems: 'center', paddingVertical: spacing.lg },
  priceLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  price: { color: colors.gold, fontSize: 32, fontWeight: '900', marginTop: 4 },
  priceNote: { color: colors.textMuted, fontSize: 12, marginTop: 8, textAlign: 'center' },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 10 },
  featureRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  featureText: { flex: 1, color: colors.text, fontSize: 13, lineHeight: 19 },
  fine: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: spacing.md, lineHeight: 16 },
});
