import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { getFoodCategory } from '../data/foodCategories';
import { getRecipesForCategory } from '../data/foodRecipes';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function FoodCategoryDetailScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'FoodCategoryDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'FoodCategoryDetail'>>();
  const category = getFoodCategory(route.params.categoryId);
  const recipes = getRecipesForCategory(category.id);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {category.label}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <ImageBackground source={category.image} style={styles.hero} imageStyle={styles.heroImage}>
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.85)']} style={styles.heroGradient}>
              <Text style={styles.heroTitle}>{category.label}</Text>
            </LinearGradient>
          </ImageBackground>
        </View>

        <Text style={styles.sectionLabel}>{t('nutrition.labels.recipesAndPreparations')}</Text>
        {recipes.length > 0 ? (
          <Card style={styles.recipeList}>
            {recipes.map((recipe, index) => (
              <Pressable
                key={recipe.id}
                onPress={() => navigation.navigate('FoodRecipeDetail', { recipeId: recipe.id })}
                style={[styles.recipeRow, index < recipes.length - 1 && styles.recipeRowBorder]}
              >
                <Text style={styles.recipeRowTitle} numberOfLines={3}>
                  {recipe.title}
                </Text>
                <Text style={styles.recipeRowKcal}>
                  {Number.isInteger(recipe.nutritionPer100g.kcal)
                    ? recipe.nutritionPer100g.kcal
                    : recipe.nutritionPer100g.kcal.toString().replace('.', ',')}{' '}
                  {t('nutrition.labels.kcal')}
                </Text>
                <Ionicons name="chevron-forward" size={18} color={colors.primary} />
              </Pressable>
            ))}
          </Card>
        ) : (
          <Card>
            <Text style={styles.empty}>{t('nutrition.labels.categoryRecipesSoon')}</Text>
          </Card>
        )}
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
  headerTitle: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
  },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  heroWrap: { marginBottom: spacing.lg },
  hero: {
    aspectRatio: 3,
    borderRadius: radius.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroImage: { borderRadius: radius.lg },
  heroGradient: {
    padding: spacing.lg,
    minHeight: 80,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  recipeList: { paddingVertical: 0, overflow: 'hidden' },
  recipeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  recipeRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  recipeRowTitle: { flex: 1, color: colors.text, fontSize: 14, fontWeight: '600', lineHeight: 19 },
  recipeRowKcal: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
  empty: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
});
