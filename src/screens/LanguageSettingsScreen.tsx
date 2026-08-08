import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGE_OPTIONS, getLanguageLabel } from '../i18n/languages';
import { AppLocale } from '../i18n/types';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { colors, spacing } from '../theme';

export default function LanguageSettingsScreen() {
  const navigation = useNavigation();
  const { locale, setLocale, t } = useLanguage();

  const onSelect = async (next: AppLocale) => {
    if (next === locale) return;
    await setLocale(next);
    Alert.alert(t('language.saved'), getLanguageLabel(next));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation)} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('language.title')}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('language.subtitle')}</Text>

        <Card style={styles.listCard}>
          {LANGUAGE_OPTIONS.map((option, index) => {
            const selected = locale === option.locale;
            return (
              <Pressable
                key={option.locale}
                onPress={() => onSelect(option.locale)}
                style={[styles.row, index < LANGUAGE_OPTIONS.length - 1 && styles.rowBorder]}
              >
                <Text style={styles.flag}>{option.flag}</Text>
                <Text style={[styles.label, selected && styles.labelSelected]}>{option.nativeName}</Text>
                {selected ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : null}
              </Pressable>
            );
          })}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: spacing.md },
  listCard: { padding: 0, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  flag: { fontSize: 24 },
  label: { flex: 1, color: colors.text, fontSize: 15, fontWeight: '600' },
  labelSelected: { color: colors.primary, fontWeight: '800' },
});
