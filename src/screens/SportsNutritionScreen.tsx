import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, SectionTitle } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import {
  getSportsNutritionCategoryProductCount,
  getSportsNutritionChildProducts,
  getSportsNutritionProductsByCategory,
  getTopLevelSportsNutritionProducts,
  SPORTS_NUTRITION_CATEGORIES,
  SPORTS_NUTRITION_PRODUCTS,
} from '../data/sportsNutrition';
import { DietStackParamList } from '../navigation/types';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { SportsNutritionCategoryId } from '../types';
import { colors, radius, spacing, typography } from '../theme';

export default function SportsNutritionScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'SportsNutrition'>>();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'SportsNutrition'>>();
  const [activeCategory, setActiveCategory] = useState<SportsNutritionCategoryId | 'all'>(
    route.params?.categoryId ?? 'all',
  );

  useFocusEffect(
    useCallback(() => {
      setActiveCategory(route.params?.categoryId ?? 'all');
    }, [route.params?.categoryId]),
  );

  const products = useMemo(() => {
    if (activeCategory === 'all') return getTopLevelSportsNutritionProducts();
    return getSportsNutritionProductsByCategory(activeCategory);
  }, [activeCategory]);

  const categoriesWithProducts = SPORTS_NUTRITION_CATEGORIES.filter(
    (category) => getSportsNutritionCategoryProductCount(category.id) > 0
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation, 'DietHome')} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('diet.sportsNutritionTitle')}</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <SectionTitle
              title={t('nutrition.labels.athleteProducts')}
              subtitle={t('nutrition.labels.sportsNutritionIntro')}
            />
            {SPORTS_NUTRITION_PRODUCTS.length > 0 ? (
              <View style={styles.filterRow}>
                <Pressable onPress={() => setActiveCategory('all')}>
                  <Pill label={t('nutrition.labels.all')} tone={activeCategory === 'all' ? 'primary' : 'default'} />
                </Pressable>
                {categoriesWithProducts.map((category) => (
                  <Pressable key={category.id} onPress={() => setActiveCategory(category.id)}>
                    <Pill
                      label={category.title}
                      tone={activeCategory === category.id ? 'primary' : 'default'}
                    />
                  </Pressable>
                ))}
              </View>
            ) : null}
          </>
        }
        renderItem={({ item }) => {
          const category = SPORTS_NUTRITION_CATEGORIES.find((entry) => entry.id === item.categoryId);
          const childCount = getSportsNutritionChildProducts(item.id).length;
          const isNested = Boolean(item.parentId) && activeCategory !== 'all';

          return (
            <Pressable
              onPress={() => navigation.push('SportsNutritionProductDetail', { productId: item.id })}
            >
              <Card style={isNested ? [styles.itemCard, styles.nestedItemCard] : styles.itemCard}>
                {item.image ? (
                  <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
                ) : (
                  <View style={[styles.iconWrap, { backgroundColor: `${item.color}22` }]}>
                    <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={22} color={item.color} />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  {category ? <Text style={[styles.categoryLabel, { color: category.color }]}>{category.title}</Text> : null}
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemShort} numberOfLines={2}>
                    {item.shortDescription}
                  </Text>
                  {childCount > 0 ? (
                    <Text style={styles.childHint}>
                      {childCount === 1
                        ? t('nutrition.labels.variationInLine')
                        : t('nutrition.labels.variationsInLine', { count: childCount })}
                    </Text>
                  ) : null}
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Card>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={
          <Card style={styles.emptyCard}>
            <Ionicons name="nutrition-outline" size={40} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>{t('nutrition.labels.catalogBuildingTitle')}</Text>
            <Text style={styles.emptyText}>{t('nutrition.labels.catalogBuildingBody')}</Text>
            <View style={styles.previewCategories}>
              {SPORTS_NUTRITION_CATEGORIES.map((category) => (
                <View key={category.id} style={styles.previewChip}>
                  <Ionicons
                    name={category.icon as keyof typeof Ionicons.glyphMap}
                    size={14}
                    color={category.color}
                  />
                  <Text style={styles.previewChipText}>{category.title}</Text>
                </View>
              ))}
            </View>
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
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: spacing.md },
  itemCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  nestedItemCard: { marginLeft: spacing.md },
  itemImage: {
    width: 72,
    height: 52,
    borderRadius: radius.sm,
    backgroundColor: '#FFFFFF',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: { fontSize: 11, fontWeight: '700', marginBottom: 2 },
  itemName: { color: colors.text, fontWeight: '800', fontSize: 14, marginBottom: 3 },
  itemShort: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  childHint: { color: colors.primary, fontSize: 11, fontWeight: '700', marginTop: 6 },
  emptyCard: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  emptyTitle: { color: colors.text, fontWeight: '800', fontSize: 16, textAlign: 'center' },
  emptyText: { color: colors.textMuted, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  previewCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing.sm,
  },
  previewChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  previewChipText: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
});
