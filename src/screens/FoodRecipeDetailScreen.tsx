import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { getFoodCategory } from '../data/foodCategories';
import { getFoodRecipe } from '../data/foodRecipes';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

function formatGrams(toTasteLabel: string, value?: number) {
  if (value == null) return toTasteLabel;
  return value < 1 ? `${value.toString().replace('.', ',')} g` : `${value} g`;
}

export default function FoodRecipeDetailScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'FoodRecipeDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'FoodRecipeDetail'>>();
  const recipe = getFoodRecipe(route.params.recipeId);
  const category = getFoodCategory(recipe.categoryId);
  const nutrition = recipe.nutritionPerServing ?? recipe.nutritionPer100g;
  const nutritionTitle = recipe.nutritionLabel
    ? t('nutrition.labels.nutritionValue', { label: recipe.nutritionLabel })
    : t('nutrition.labels.nutritionPer100g');
  const toTasteLabel = t('nutrition.labels.toTaste');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {category.label}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image source={recipe.image} style={styles.hero} resizeMode="cover" />
        </View>

        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        {recipe.prepTimeMinutes > 0 ? (
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.timeText}>
              {t('nutrition.labels.prepTime', { minutes: recipe.prepTimeMinutes })}
            </Text>
          </View>
        ) : null}

        <Text style={styles.sectionLabel}>{nutritionTitle}</Text>
        <Card style={styles.nutritionCard}>
          {recipe.comingSoon ? (
            <View style={styles.nutritionGrid}>
              <NutritionCell value={nutrition.kcal} label={t('nutrition.labels.kcal')} />
            </View>
          ) : (
            <View style={styles.nutritionGrid}>
              <NutritionCell value={nutrition.kcal} label={t('nutrition.labels.kcal')} />
              <NutritionCell value={nutrition.protein} label={t('nutrition.labels.proteinG')} />
              <NutritionCell value={nutrition.fat} label={t('nutrition.labels.fatG')} />
              <NutritionCell value={nutrition.carbs} label={t('nutrition.labels.carbsG')} />
            </View>
          )}
        </Card>

        {recipe.comingSoon ? (
          <Card style={styles.comingSoonCard}>
            <Ionicons name="restaurant-outline" size={28} color={colors.primary} />
            <Text style={styles.comingSoonTitle}>{t('nutrition.labels.recipeComingSoonTitle')}</Text>
            <Text style={styles.comingSoonText}>{t('nutrition.labels.recipeComingSoonBody')}</Text>
          </Card>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>{t('nutrition.labels.ingredients')}</Text>
              <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
            </View>
            <Card style={styles.listCard}>
              {recipe.ingredients.map((item, index) => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('FoodIngredientDetail', { recipeId: recipe.id, ingredientId: item.id })
                  }
                  style={[styles.listRow, index < recipe.ingredients.length - 1 && styles.listRowBorder]}
                >
                  <Text style={styles.listName}>{item.name}</Text>
                  <Text style={styles.listAmount}>{formatGrams(toTasteLabel, item.amountGrams)}</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                </Pressable>
              ))}
            </Card>

            {recipe.toTaste.length > 0 ? (
              <>
                <Text style={styles.sectionLabel}>{toTasteLabel}</Text>
                <Card style={styles.listCard}>
                  {recipe.toTaste.map((item, index) => (
                    <Pressable
                      key={item.id}
                      onPress={() =>
                        navigation.navigate('FoodIngredientDetail', {
                          recipeId: recipe.id,
                          ingredientId: item.id,
                        })
                      }
                      style={[styles.listRow, index < recipe.toTaste.length - 1 && styles.listRowBorder]}
                    >
                      <Text style={[styles.listName, { flex: 1 }]}>{item.name}</Text>
                      <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                    </Pressable>
                  ))}
                </Card>
              </>
            ) : null}

            <Text style={styles.sectionLabel}>{t('nutrition.labels.recipeSteps')}</Text>
            {recipe.steps.map((step, index) => (
              <Card key={index} style={styles.stepCard}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function NutritionCell({ value, label }: { value: number; label: string }) {
  const display = Number.isInteger(value) ? String(value) : value.toString().replace('.', ',');
  return (
    <View style={styles.nutritionCell}>
      <Text style={styles.nutritionValue}>{display}</Text>
      <Text style={styles.nutritionLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
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
  topTitle: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
  },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  heroWrap: {
    width: '100%',
    aspectRatio: 1024 / 723,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceAlt,
  },
  hero: {
    width: '100%',
    height: '100%',
  },
  recipeTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: spacing.sm,
  },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.lg },
  timeText: { color: colors.textMuted, fontSize: 13 },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  nutritionCard: { marginBottom: spacing.lg, paddingVertical: spacing.md },
  nutritionGrid: { flexDirection: 'row' },
  nutritionCell: { flex: 1, alignItems: 'center' },
  nutritionValue: { color: colors.text, fontSize: 22, fontWeight: '800' },
  nutritionLabel: { color: colors.textMuted, fontSize: 11, marginTop: 4, textAlign: 'center' },
  listCard: { marginBottom: spacing.lg, paddingVertical: 0, overflow: 'hidden' },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  listRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  listName: { flex: 1, color: colors.text, fontSize: 14 },
  listAmount: { color: colors.textMuted, fontSize: 14, fontWeight: '600' },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.sm,
    padding: spacing.md,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepNumber: { color: colors.primary, fontWeight: '800', fontSize: 14 },
  stepText: { flex: 1, color: colors.text, fontSize: 14, lineHeight: 21 },
  comingSoonCard: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  comingSoonTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  comingSoonText: { color: colors.textMuted, fontSize: 13, lineHeight: 20, textAlign: 'center' },
});
