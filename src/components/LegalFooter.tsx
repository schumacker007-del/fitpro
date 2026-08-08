import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { navigateToLegalDocument } from '../config/legal';
import { useLanguage } from '../context/LanguageContext';
import { colors, spacing } from '../theme';

export default function LegalFooter({ style }: { style?: ViewStyle }) {
  const navigation = useNavigation();
  const { t } = useLanguage();

  return (
    <View style={[styles.footer, style]}>
      <Pressable onPress={() => navigateToLegalDocument('privacy', navigation)} hitSlop={6}>
        <Text style={styles.link}>{t('legal.privacyPolicy')}</Text>
      </Pressable>
      <Text style={styles.separator}>·</Text>
      <Pressable onPress={() => navigateToLegalDocument('terms', navigation)} hitSlop={6}>
        <Text style={styles.link}>{t('legal.termsOfUse')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  link: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  separator: { color: colors.textMuted, fontSize: 12 },
});
