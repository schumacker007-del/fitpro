import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { getFoodsForSubcategory, getNutritionGroup } from '../data/nutrition';
import { getRecipesForCategory } from '../data/foodRecipes';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

function formatKcal(kcal: number) {
  return Number.isInteger(kcal) ? String(kcal) : kcal.toString().replace('.', ',');
}

export default function NutritionGroupScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'NutritionGroup'>>();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'NutritionGroup'>>();
  const group = getNutritionGroup(route.params.groupId);
  const recipes = (group.recipeCategoryIds ?? []).flatMap((id) => getRecipesForCategory(id));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {group.label}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <ImageBackground source={group.image} style={styles.hero} imageStyle={styles.heroImage}>
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.85)']} style={styles.heroGradient}>
              <Text style={styles.heroTitle}>{group.label}</Text>
            </LinearGradient>
          </ImageBackground>
        </View>

        <Text style={styles.description}>{group.description}</Text>

        {group.subcategories.length > 0 ? (
          group.subcategories.map((sub) => {
            const foods = getFoodsForSubcategory(group.id, sub.id);
            if (foods.length === 0) return null;
            return (
              <View key={sub.id} style={styles.section}>
                <Text style={styles.sectionLabel}>{sub.label}</Text>
                <Card style={styles.listCard}>
                  {foods.map((food, index) => (
                    <Pressable
                      key={food.id}
                      onPress={() => navigation.navigate('NutritionFoodDetail', { foodId: food.id })}
                      style={[styles.foodRow, index < foods.length - 1 && styles.foodRowBorder]}
                    >
                      <Text style={styles.foodName} numberOfLines={2}>
                        {food.name}
                      </Text>
                      <Text style={styles.foodKcal}>{formatKcal(food.kcal)} {t('nutrition.labels.kcal')}</Text>
                      <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                    </Pressable>
                  ))}
                </Card>
              </View>
            );
          })
        ) : (
          <Card>
            <Text style={styles.empty}>{t('nutrition.labels.groupEmpty')}</Text>
          </Card>
        )}

        {recipes.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>{t('nutrition.labels.recipesAndPreparations')}</Text>
            <Card style={styles.listCard}>
              {recipes.map((recipe, index) => (
                <Pressable
                  key={recipe.id}
                  onPress={() => navigation.navigate('FoodRecipeDetail', { recipeId: recipe.id })}
                  style={[styles.foodRow, index < recipes.length - 1 && styles.foodRowBorder]}
                >
                  <Text style={styles.foodName} numberOfLines={3}>
                    {recipe.title}
                  </Text>
                  <Text style={styles.foodKcal}>
                    {formatKcal(recipe.nutritionPer100g.kcal)} {t('nutrition.labels.kcal')}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                </Pressable>
              ))}
            </Card>
          </View>
        ) : null}
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
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  heroWrap: { marginBottom: spacing.md },
  hero: { aspectRatio: 3, borderRadius: radius.lg, overflow: 'hidden', justifyContent: 'flex-end' },
  heroImage: { borderRadius: radius.lg },
  heroGradient: { padding: spacing.lg, minHeight: 80, justifyContent: 'flex-end' },
  heroTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', lineHeight: 24 },
  description: { color: colors.textMuted, fontSize: 14, lineHeight: 21, marginBottom: spacing.lg },
  section: { marginBottom: spacing.lg },
  sectionLabel: { color: colors.textMuted, fontSize: 13, fontWeight: '600', marginBottom: spacing.sm },
  listCard: { paddingVertical: 0, overflow: 'hidden' },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  foodRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  foodName: { flex: 1, color: colors.text, fontSize: 14, fontWeight: '600', lineHeight: 19 },
  foodKcal: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
  empty: { color: colors.textMuted, fontSize: 14, lineHeight: 21 },
});
