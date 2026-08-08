import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { getNutritionFood } from '../data/nutrition';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

function formatValue(value: number) {
  if (Number.isInteger(value)) return String(value);
  return value.toString().replace('.', ',');
}

function MacroCell({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.macroCell}>
      <Text style={styles.macroValue}>{formatValue(value)}</Text>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );
}

export default function NutritionFoodDetailScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'NutritionFoodDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'NutritionFoodDetail'>>();
  const food = getNutritionFood(route.params.foodId);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('nutrition.labels.food')}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.portionLabel}>
          {t('nutrition.labels.defaultPortion', { portion: food.portionLabel })}
        </Text>
        <Text style={styles.highlight}>{food.highlight}</Text>

        <Card style={styles.macroCard}>
          <View style={styles.macroGrid}>
            <MacroCell value={food.kcal} label={t('nutrition.labels.kcal')} />
            <MacroCell value={food.protein} label={t('nutrition.labels.proteinG')} />
            <MacroCell value={food.fats.total} label={t('nutrition.labels.fatG')} />
            <MacroCell value={food.carbs} label={t('nutrition.labels.carbsG')} />
          </View>
        </Card>

        <Card style={styles.listCard}>
          <View style={styles.listRow}>
            <Text style={styles.listLabel}>{t('nutrition.labels.fiber')}</Text>
            <Text style={styles.listValue}>{formatValue(food.fiber)} g</Text>
          </View>
          {food.carbsNote ? (
            <View style={[styles.listRow, styles.listRowBorder]}>
              <Text style={styles.listLabel}>{t('profile.nutrition.carbs')}</Text>
              <Text style={styles.listValue}>{food.carbsNote}</Text>
            </View>
          ) : null}
          <View style={[styles.listRow, styles.listRowBorder]}>
            <Text style={styles.listLabel}>{t('nutrition.labels.saturatedFat')}</Text>
            <Text style={styles.listValue}>{formatValue(food.fats.saturated)} g</Text>
          </View>
          <View style={[styles.listRow, styles.listRowBorder]}>
            <Text style={styles.listLabel}>{t('nutrition.labels.monounsaturatedFat')}</Text>
            <Text style={styles.listValue}>{formatValue(food.fats.monounsaturated)} g</Text>
          </View>
          <View style={[styles.listRow, styles.listRowBorder]}>
            <Text style={styles.listLabel}>{t('nutrition.labels.polyunsaturatedFat')}</Text>
            <Text style={styles.listValue}>{formatValue(food.fats.polyunsaturated)} g</Text>
          </View>
          <View style={[styles.listRow, styles.listRowBorder]}>
            <Text style={styles.listLabel}>{t('nutrition.labels.sodium')}</Text>
            <Text style={styles.listValue}>{formatValue(food.sodiumMg)} mg</Text>
          </View>
        </Card>
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
  name: { color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: spacing.xs, lineHeight: 26 },
  portionLabel: { color: colors.primary, fontSize: 13, fontWeight: '600', marginBottom: spacing.md },
  highlight: { color: colors.textMuted, fontSize: 14, lineHeight: 22, marginBottom: spacing.lg },
  macroCard: { marginBottom: spacing.md, paddingVertical: spacing.md },
  macroGrid: { flexDirection: 'row' },
  macroCell: { flex: 1, alignItems: 'center' },
  macroValue: { color: colors.text, fontSize: 22, fontWeight: '800' },
  macroLabel: { color: colors.textMuted, fontSize: 11, marginTop: 4, textAlign: 'center' },
  listCard: { paddingVertical: 0, overflow: 'hidden' },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  listRowBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  listLabel: { flex: 1, color: colors.textMuted, fontSize: 14 },
  listValue: { color: colors.text, fontSize: 14, fontWeight: '700' },
});
