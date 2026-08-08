import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPrivacyPolicyContent, getTermsOfUseContent } from '../data/legalContent';
import { useLanguage } from '../context/LanguageContext';
import { colors, spacing } from '../theme';

type LegalDocumentKind = 'privacy' | 'terms';

export default function LegalDocumentView({ document }: { document: LegalDocumentKind }) {
  const navigation = useNavigation();
  const { locale, t } = useLanguage();
  const content = document === 'privacy' ? getPrivacyPolicyContent(locale) : getTermsOfUseContent(locale);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{content.title}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.updated}>
          {t('legal.lastUpdated')}: {content.lastUpdated}
        </Text>

        {content.sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.paragraphs.map((paragraph, index) => (
              <Text key={`${section.title}-${index}`} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>
        ))}
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
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: '800', flex: 1, textAlign: 'center' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  updated: { color: colors.textMuted, fontSize: 12, marginBottom: spacing.lg },
  section: { marginBottom: spacing.lg },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '800', marginBottom: spacing.sm },
  paragraph: { color: colors.textMuted, fontSize: 14, lineHeight: 22, marginBottom: spacing.sm },
});
