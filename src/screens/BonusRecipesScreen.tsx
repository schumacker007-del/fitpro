import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Pill } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { getBonusRecipes } from '../data/bonusRecipes';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function BonusRecipesScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'BonusRecipes'>>();
  const recipes = useMemo(() => getBonusRecipes(), []);

  const chapters = useMemo(() => {
    const map = new Map<string, typeof recipes>();
    for (const recipe of recipes) {
      const key = recipe.chapter ?? t('diet.bonusRecipesChapterDefault');
      const list = map.get(key) ?? [];
      list.push(recipe);
      map.set(key, list);
    }
    return [...map.entries()];
  }, [recipes, t]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('diet.bonusRecipesTitle')}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/food-categories/sweets.jpg')}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.88)']} style={styles.heroGradient}>
            <Text style={styles.heroKicker}>{t('diet.bonusRecipesKicker')}</Text>
            <Text style={styles.heroTitle}>{t('diet.bonusRecipesTitle')}</Text>
            <Text style={styles.heroSubtitle}>{t('diet.bonusRecipesHeroSubtitle')}</Text>
          </LinearGradient>
        </ImageBackground>

        <Text style={styles.intro}>{t('diet.bonusRecipesIntro')}</Text>

        {chapters.map(([chapter, items]) => (
          <View key={chapter} style={styles.section}>
            <Text style={styles.sectionLabel}>{chapter}</Text>
            <Card style={styles.listCard}>
              {items.map((recipe, index) => (
                <Pressable
                  key={recipe.id}
                  onPress={() => navigation.navigate('FoodRecipeDetail', { recipeId: recipe.id })}
                  style={[styles.recipeRow, index < items.length - 1 && styles.recipeRowBorder]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recipeTitle} numberOfLines={2}>
                      {recipe.title}
                    </Text>
                    <View style={styles.metaRow}>
                      <Pill label={`${recipe.prepTimeMinutes} min`} />
                      <Text style={styles.kcalText}>
                        {recipe.nutritionPerServing?.kcal ?? recipe.nutritionPer100g.kcal} kcal
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                </Pressable>
              ))}
            </Card>
          </View>
        ))}

        <Text style={styles.footerNote}>{t('diet.bonusRecipesFooter')}</Text>
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
  hero: {
    height: 168,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  heroImage: { borderRadius: radius.lg },
  heroGradient: { flex: 1, justifyContent: 'flex-end', padding: spacing.md },
  heroKicker: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroTitle: { color: '#F8FAFC', fontSize: 22, fontWeight: '900' },
  heroSubtitle: { color: 'rgba(248,250,252,0.78)', fontSize: 12, marginTop: 4, lineHeight: 17 },
  intro: { color: colors.textMuted, fontSize: 13, lineHeight: 20, marginBottom: spacing.lg },
  section: { marginBottom: spacing.md },
  sectionLabel: {
    color: '#8B9CB5',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  listCard: { padding: 0, overflow: 'hidden' },
  recipeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  recipeRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  recipeTitle: { color: colors.text, fontWeight: '700', fontSize: 15, marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  kcalText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  footerNote: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
