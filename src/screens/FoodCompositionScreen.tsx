import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../context/LanguageContext';
import {
  getNutritionFoodCount,
  NUTRITION_GROUPS,
  searchNutritionFoods,
  searchNutritionGroups,
} from '../data/nutrition';
import type { NutritionFoodItem, NutritionGroupInfo } from '../data/nutrition/types';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

function GroupCard({ item, onPress }: { item: NutritionGroupInfo; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.cardWrap, pressed && styles.cardPressed]}>
      <View style={styles.cardImage}>
        <Image source={item.image} style={styles.cardPhoto} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.82)']}
          locations={[0, 0.78, 1]}
          style={styles.cardGradient}
        />
        <View style={styles.cardLabelWrap}>
          <Text style={styles.cardLabel}>{item.label}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function FoodSearchRow({ item, onPress }: { item: NutritionFoodItem; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.searchRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.searchRowTitle}>{item.name}</Text>
        <Text style={styles.searchRowMeta}>{item.portionLabel}</Text>
      </View>
      <Text style={styles.searchRowKcal}>{item.kcal} Kcal</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.primary} />
    </Pressable>
  );
}

export default function FoodCompositionScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'FoodComposition'>>();
  const [query, setQuery] = useState('');

  const foodResults = useMemo(() => searchNutritionFoods(query), [query]);
  const groups = useMemo(() => searchNutritionGroups(query), [query]);
  const isSearching = query.trim().length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('diet.compositionTitle')}
        </Text>
        <View style={styles.iconBtn} />
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t('nutrition.labels.searchPlaceholder')}
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      {isSearching && foodResults.length > 0 ? (
        <FlatList
          data={foodResults}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={<Text style={styles.sectionHeading}>{t('nutrition.labels.foodsHeading')}</Text>}
          renderItem={({ item }) => (
            <FoodSearchRow
              item={item}
              onPress={() => navigation.navigate('NutritionFoodDetail', { foodId: item.id })}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            isSearching && foodResults.length === 0 ? (
              <Text style={styles.emptySearch}>
                {t('nutrition.labels.emptySearch', { query })}
              </Text>
            ) : null
          }
          renderItem={({ item }) => (
            <GroupCard
              item={item}
              onPress={() => navigation.navigate('NutritionGroup', { groupId: item.id })}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          ListFooterComponent={
            <Text style={styles.count}>
              {t('nutrition.labels.foodCountFooter', {
                foods: String(getNutritionFoodCount()),
                categories: String(NUTRITION_GROUPS.length),
              })}
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  iconBtn: {
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
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: 15, paddingVertical: 0 },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  sectionHeading: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  searchRowTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
  searchRowMeta: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  searchRowKcal: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
  separator: { height: spacing.sm },
  cardWrap: { borderRadius: radius.lg, overflow: 'hidden', backgroundColor: '#000' },
  cardPressed: { opacity: 0.92 },
  cardImage: {
    width: '100%',
    aspectRatio: 3,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  cardPhoto: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  cardGradient: { ...StyleSheet.absoluteFillObject },
  cardLabelWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
  },
  cardLabel: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', lineHeight: 17 },
  emptySearch: {
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontSize: 14,
  },
  count: { color: colors.textMuted, textAlign: 'center', fontSize: 11, marginTop: spacing.lg },
});
