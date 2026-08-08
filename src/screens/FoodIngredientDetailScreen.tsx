import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { getFoodIngredientDetail, NutrientIndex } from '../data/foodIngredientDetails';
import { getRecipeIngredient } from '../data/foodRecipes';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

function formatGrams(toTasteLabel: string, value?: number) {
  if (value == null) return toTasteLabel;
  return value < 1 ? `${value.toString().replace('.', ',')} g` : `${value} g`;
}

function formatNutrientValue(value: number) {
  if (Number.isInteger(value)) return String(value);
  return value.toString().replace('.', ',');
}

function NutritionCell({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.nutritionCell}>
      <Text style={styles.nutritionValue}>{formatNutrientValue(value)}</Text>
      <Text style={styles.nutritionLabel}>{label}</Text>
    </View>
  );
}

function IndexScale({ index }: { index: NutrientIndex }) {
  return (
    <View style={styles.indexBlock}>
      <Text style={styles.indexTitle}>{index.label.toUpperCase()}</Text>
      <View style={styles.indexRow}>
        <View style={styles.indexTrack}>
          <View style={styles.indexBlue} />
          <View style={styles.indexRed} />
          <View style={[styles.indexMarker, { left: `${Math.min(1, Math.max(0, index.markerPosition)) * 100}%` }]} />
        </View>
        <Text style={styles.indexValue}>
          {index.displayValue} ({index.level})
        </Text>
      </View>
    </View>
  );
}

export default function FoodIngredientDetailScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'FoodIngredientDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'FoodIngredientDetail'>>();
  const ingredient = getRecipeIngredient(route.params.recipeId, route.params.ingredientId);
  const detail = getFoodIngredientDetail(route.params.ingredientId);
  const toTasteLabel = t('nutrition.labels.toTaste');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('nutrition.labels.ingredient')}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {detail ? (
          <View style={styles.heroWrap}>
            <Image source={detail.image} style={styles.hero} resizeMode="cover" />
          </View>
        ) : null}

        <Text style={styles.name}>{ingredient.name}</Text>

        <View style={styles.amountBadge}>
          <Text style={styles.amountLabel}>{t('nutrition.labels.amountInRecipe')}</Text>
          <Text style={styles.amountValue}>{formatGrams(toTasteLabel, ingredient.amountGrams)}</Text>
        </View>

        {ingredient.description ? <Text style={styles.description}>{ingredient.description}</Text> : null}

        {detail ? (
          <>
            <Text style={styles.sectionLabel}>{t('nutrition.labels.nutritionPer100g')}</Text>
            <Card style={styles.nutritionCard}>
              <View style={styles.nutritionGrid}>
                <NutritionCell value={detail.nutritionPer100g.kcal} label={t('nutrition.labels.kcal')} />
                <NutritionCell value={detail.nutritionPer100g.protein} label={t('nutrition.labels.proteinG')} />
                <NutritionCell value={detail.nutritionPer100g.fat} label={t('nutrition.labels.fatG')} />
                <NutritionCell value={detail.nutritionPer100g.carbs} label={t('nutrition.labels.carbsG')} />
              </View>
            </Card>

            <Card style={styles.listCard}>
              {detail.extraNutrients.map((row, index) => (
                <View
                  key={row.label}
                  style={[styles.listRow, index < detail.extraNutrients.length - 1 && styles.listRowBorder]}
                >
                  <Text style={styles.listLabel}>{row.label}</Text>
                  <Text style={styles.listValue}>{formatNutrientValue(row.value)}</Text>
                </View>
              ))}
            </Card>

            {detail.glycemicIndex ? <IndexScale index={detail.glycemicIndex} /> : null}
            {detail.caloricDensityIndex ? <IndexScale index={detail.caloricDensityIndex} /> : null}
            {detail.inflammatoryFactor ? <IndexScale index={detail.inflammatoryFactor} /> : null}
            {detail.antioxidantIndex ? <IndexScale index={detail.antioxidantIndex} /> : null}
          </>
        ) : (
          <Card>
            <Text style={styles.description}>{t('nutrition.labels.ingredientDetailSoon')}</Text>
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
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 16 },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  heroWrap: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceAlt,
  },
  hero: { width: '100%', height: '100%' },
  name: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: spacing.md, lineHeight: 24 },
  amountBadge: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  amountLabel: { color: colors.textMuted, fontSize: 12, marginBottom: 4 },
  amountValue: { color: colors.primary, fontSize: 20, fontWeight: '800' },
  description: { color: colors.textMuted, fontSize: 14, lineHeight: 22, marginBottom: spacing.md },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  nutritionCard: { marginBottom: spacing.md, paddingVertical: spacing.md },
  nutritionGrid: { flexDirection: 'row' },
  nutritionCell: { flex: 1, alignItems: 'center' },
  nutritionValue: { color: colors.text, fontSize: 22, fontWeight: '800' },
  nutritionLabel: { color: colors.textMuted, fontSize: 11, marginTop: 4, textAlign: 'center' },
  listCard: { marginBottom: spacing.lg, paddingVertical: 0, overflow: 'hidden' },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  listRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  listLabel: { flex: 1, color: colors.textMuted, fontSize: 14 },
  listValue: { color: colors.text, fontSize: 14, fontWeight: '700' },
  indexBlock: { marginBottom: spacing.lg },
  indexTitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  indexRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  indexTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  indexBlue: { flex: 1, backgroundColor: '#5B9BD5' },
  indexRed: { flex: 1, backgroundColor: '#E85D5D' },
  indexMarker: {
    position: 'absolute',
    top: -3,
    width: 3,
    height: 12,
    marginLeft: -1.5,
    backgroundColor: '#E85D5D',
    borderRadius: 1,
  },
  indexValue: { color: colors.text, fontSize: 12, fontWeight: '700', minWidth: 88, textAlign: 'right' },
});
