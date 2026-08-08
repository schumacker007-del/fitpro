import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, SectionTitle } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import {
  ENCYCLOPEDIA_CATEGORIES,
  getEncyclopediaArticlesForCategory,
} from '../data/encyclopedia';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function EncyclopediaScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'Encyclopedia'>>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('diet.encyclopediaTitle')}</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={ENCYCLOPEDIA_CATEGORIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <SectionTitle
            title={t('nutrition.labels.explanatoryContent')}
            subtitle={t('nutrition.labels.encyclopediaIntro')}
          />
        }
        renderItem={({ item }) => {
          const count = getEncyclopediaArticlesForCategory(item.id).length;

          return (
            <Pressable onPress={() => navigation.navigate('EncyclopediaCategory', { categoryId: item.id })}>
              <Card style={styles.categoryCard}>
                {item.image ? (
                  <Image source={item.image} style={styles.categoryImage} resizeMode="cover" />
                ) : (
                  <View style={[styles.iconWrap, { backgroundColor: `${item.color}22` }]}>
                    <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={24} color={item.color} />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                  <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
                  <Text style={styles.categoryDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  {count > 0 ? (
                    <Text style={styles.countHint}>
                      {count === 1
                        ? t('nutrition.labels.articleCountOne')
                        : t('nutrition.labels.articleCount', { count })}
                    </Text>
                  ) : (
                    <Text style={styles.countHintMuted}>{t('nutrition.labels.inProgress')}</Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Card>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={
          <Card style={styles.emptyCard}>
            <Ionicons name="book-outline" size={40} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>{t('nutrition.labels.encyclopediaBuildingTitle')}</Text>
            <Text style={styles.emptyText}>{t('nutrition.labels.encyclopediaBuildingBody')}</Text>
          </Card>
        }
      />
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
  list: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl, flexGrow: 1 },
  emptyCard: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  emptyTitle: { color: colors.text, fontWeight: '800', fontSize: 16, textAlign: 'center' },
  emptyText: { color: colors.textMuted, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  categoryCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  categoryImage: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: 2 },
  categorySubtitle: { color: colors.textMuted, fontSize: 12, marginBottom: 4 },
  categoryDescription: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  countHint: { color: colors.primary, fontSize: 11, fontWeight: '700', marginTop: 6 },
  countHintMuted: { color: colors.textMuted, fontSize: 11, fontWeight: '600', marginTop: 6, fontStyle: 'italic' },
});
