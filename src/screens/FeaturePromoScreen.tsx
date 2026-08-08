import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { TranslationKey } from '../i18n/translations';
import { ProfileStackParamList } from '../navigation/types';
import { markFeaturePromoSeen } from '../services/featurePromo';
import { colors, spacing, typography } from '../theme';

type PromoConfig = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  benefitKeys: [TranslationKey, TranslationKey, TranslationKey];
  ctaKey: TranslationKey;
  target: 'CustomPlan' | 'Paywall';
};

const PROMO_CONFIG: Record<'customPlan' | 'pro', PromoConfig> = {
  customPlan: {
    icon: 'clipboard-outline',
    iconColor: colors.primary,
    iconBg: colors.primaryMuted,
    titleKey: 'promo.customPlan.title',
    subtitleKey: 'promo.customPlan.subtitle',
    benefitKeys: ['promo.customPlan.benefit1', 'promo.customPlan.benefit2', 'promo.customPlan.benefit3'],
    ctaKey: 'promo.customPlan.cta',
    target: 'CustomPlan',
  },
  pro: {
    icon: 'star',
    iconColor: colors.gold,
    iconBg: 'rgba(244, 183, 64, 0.15)',
    titleKey: 'promo.pro.title',
    subtitleKey: 'promo.pro.subtitle',
    benefitKeys: ['promo.pro.benefit1', 'promo.pro.benefit2', 'promo.pro.benefit3'],
    ctaKey: 'promo.pro.cta',
    target: 'Paywall',
  },
};

export default function FeaturePromoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'FeaturePromo'>>();
  const route = useRoute<RouteProp<ProfileStackParamList, 'FeaturePromo'>>();
  const { t } = useLanguage();
  const config = useMemo(() => PROMO_CONFIG[route.params.variant], [route.params.variant]);

  const handleContinue = () => {
    void (async () => {
      await markFeaturePromoSeen(route.params.variant);
      navigation.replace(config.target);
    })();
  };

  const handleSkip = () => {
    void (async () => {
      await markFeaturePromoSeen(route.params.variant);
      navigation.goBack();
    })();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <LinearGradient colors={['#12151D', colors.background]} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <Pressable onPress={handleSkip} style={styles.closeBtn} hitSlop={8}>
          <Ionicons name="close" size={22} color={colors.textMuted} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.iconWrap, { backgroundColor: config.iconBg }]}>
          <Ionicons name={config.icon} size={34} color={config.iconColor} />
        </View>

        <Text style={[typography.h1, styles.title]}>{t(config.titleKey)}</Text>
        <Text style={styles.subtitle}>{t(config.subtitleKey)}</Text>

        <View style={styles.benefits}>
          {config.benefitKeys.map((key) => (
            <View key={key} style={styles.benefitRow}>
              <View style={[styles.benefitDot, { backgroundColor: config.iconColor }]} />
              <Text style={styles.benefitText}>{t(key)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          label={t(config.ctaKey)}
          icon={config.target === 'Paywall' ? 'star' : 'arrow-forward'}
          variant={config.target === 'Paywall' ? 'gold' : 'primary'}
          onPress={handleContinue}
        />
        <Pressable onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>{t('promo.skip')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  closeBtn: { padding: 4 },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    flexGrow: 1,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { color: colors.text, marginBottom: spacing.sm },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginBottom: spacing.xl },
  benefits: { gap: spacing.md },
  benefitRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  benefitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  benefitText: { flex: 1, color: colors.text, fontSize: 15, lineHeight: 22, fontWeight: '600' },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  skipBtn: { alignItems: 'center', paddingVertical: spacing.sm },
  skipText: { color: colors.textMuted, fontSize: 14, fontWeight: '600' },
});
