import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SocialLoginPanel from '../components/SocialLoginPanel';
import LegalFooter from '../components/LegalFooter';
import { useLanguage } from '../context/LanguageContext';
import { colors, spacing, typography } from '../theme';

export default function LoginScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.logoRow}>
          <View style={styles.logoDot} />
          <Text style={styles.logoText}>FitPro</Text>
        </View>
        <Text style={[typography.h1, styles.title, { color: colors.primary }]}>{t('login.title')}</Text>
        <Text style={styles.subtitle}>{t('login.subtitle')}</Text>

        <SocialLoginPanel />

        <LegalFooter />

        {__DEV__ ? <Text style={styles.disclaimer}>{t('login.disclaimer')}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.lg, justifyContent: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xl },
  logoDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  logoText: { color: colors.text, fontWeight: '800', fontSize: 22 },
  title: { color: colors.text, marginBottom: spacing.sm },
  subtitle: { color: colors.textMuted, fontSize: 14, lineHeight: 21, marginBottom: spacing.xl },
  disclaimer: { color: colors.textMuted, fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: spacing.lg },
});
