import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import { useLanguage } from '../context/LanguageContext';
import { getEncyclopediaArticle, getEncyclopediaCategory } from '../data/encyclopedia';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function EncyclopediaArticleScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'EncyclopediaArticle'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<DietStackParamList, 'EncyclopediaArticle'>>();
  const article = getEncyclopediaArticle(route.params.articleId);
  const category = getEncyclopediaCategory(article.categoryId);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('diet.encyclopediaTitle')}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MedicalDisclaimerBanner />

        <View style={[styles.heroBadge, { backgroundColor: `${category.color}22` }]}>
          <Ionicons name={article.icon as keyof typeof Ionicons.glyphMap} size={32} color={category.color} />
        </View>

        <Text style={[styles.categoryTag, { color: category.color }]}>{category.title}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.lead}>{article.shortDescription}</Text>

        {article.description ? (
          <Card style={styles.section}>
            <Text style={styles.body}>{article.description}</Text>
          </Card>
        ) : null}

        {article.sections.map((section, index) => (
          <Card key={`${article.id}-section-${index}`} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.label}</Text>
            <Text style={styles.body}>{section.body}</Text>
          </Card>
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
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 16 },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  heroBadge: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  categoryTag: { fontSize: 12, fontWeight: '700', textAlign: 'center', marginBottom: 6 },
  title: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  lead: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  section: { marginBottom: spacing.sm, gap: spacing.xs },
  sectionLabel: { color: colors.text, fontWeight: '800', fontSize: 14 },
  body: { color: colors.textMuted, fontSize: 14, lineHeight: 22 },
});
