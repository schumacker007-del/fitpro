import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import { Card, PrimaryButton } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { RESPONSIBLE_PROFESSIONAL } from '../data/professional';
import { TranslationKey } from '../i18n/translations';
import { PremiumWorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

const FEATURES: { icon: keyof typeof Ionicons.glyphMap; key: TranslationKey }[] = [
  { icon: 'bar-chart-outline' as const, key: 'premium.examAnalysis.featureCharts' },
  { icon: 'library-outline' as const, key: 'premium.examAnalysis.featureGuide' },
  { icon: 'document-text-outline' as const, key: 'premium.examAnalysis.featureReport' },
  { icon: 'fitness-outline' as const, key: 'premium.examAnalysis.featureTraining' },
];

export default function ExamAnalysisScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<PremiumWorkoutsStackParamList, 'ExamAnalysis'>>();
  const { t } = useLanguage();

  const openWhatsApp = async () => {
    const message = t('premium.examAnalysis.whatsappMessage');
    const url = `https://wa.me/${RESPONSIBLE_PROFESSIONAL.whatsapp}?text=${encodeURIComponent(message)}`;
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert(t('premium.examAnalysis.whatsappErrorTitle'), t('premium.examAnalysis.whatsappErrorBody'));
      return;
    }
    await Linking.openURL(url);
  };

  const openMedicalRecords = () => {
    const parent = navigation.getParent();
    (parent as { navigate: (name: string, params?: object) => void })?.navigate('Perfil', {
      screen: 'MedicalRecords',
      params: { category: 'exame_medico' },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('premium.examAnalysis.title')}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name="analytics" size={28} color="#A78BFA" />
          </View>
          <Text style={styles.heroTitle}>{t('premium.examAnalysis.headline')}</Text>
          <Text style={styles.heroText}>{t('premium.examAnalysis.description')}</Text>
        </Card>

        <Card>
          {FEATURES.map((feature, index) => (
            <View
              key={feature.key}
              style={[styles.featureRow, index < FEATURES.length - 1 && styles.featureRowBorder]}
            >
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon} size={18} color={colors.primary} />
              </View>
              <Text style={styles.featureText}>{t(feature.key)}</Text>
            </View>
          ))}
        </Card>

        <MedicalDisclaimerBanner compact />

        <PrimaryButton
          label={t('premium.examAnalysis.ctaDemo')}
          icon="document-text-outline"
          onPress={() => navigation.navigate('ExamAnalysisReport')}
        />

        <PrimaryButton
          label={t('premium.examAnalysis.ctaRequest')}
          icon="logo-whatsapp"
          onPress={openWhatsApp}
        />
        <PrimaryButton
          label={t('premium.examAnalysis.ctaUpload')}
          icon="cloud-upload-outline"
          variant="outline"
          onPress={openMedicalRecords}
        />

        <Text style={styles.fine}>{t('premium.examAnalysis.fine')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 15 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  heroCard: { alignItems: 'center', paddingVertical: spacing.lg },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(167,139,250,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: 26,
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 12 },
  featureRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: { flex: 1, color: colors.text, fontSize: 13, lineHeight: 19 },
  fine: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16 },
});
