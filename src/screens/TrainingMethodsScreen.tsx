import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, SectionTitle } from '../components/ui';
import { TRAINING_METHOD_CATEGORIES } from '../data/trainingMethodCategories';
import { getMethodsForCategory } from '../data/trainingMethods';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function TrainingMethodsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'TrainingMethods'>>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Métodos de treino</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={TRAINING_METHOD_CATEGORIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <SectionTitle
            title="Técnicas de musculação"
            subtitle="Principais métodos organizados por objetivo para usar na sua rotina"
          />
        }
        renderItem={({ item }) => {
          const count = getMethodsForCategory(item.id).length;
          return (
            <Pressable onPress={() => navigation.navigate('TrainingMethodCategory', { categoryId: item.id })}>
              <Card style={styles.categoryCard}>
                <View style={[styles.iconWrap, { backgroundColor: `${item.color}22` }]}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                  <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
                  <Text style={styles.categoryDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{count}</Text>
                </View>
              </Card>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
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
  list: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  categoryCard: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: 2 },
  categorySubtitle: { color: colors.primary, fontSize: 11, fontWeight: '600', marginBottom: 4 },
  categoryDescription: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  countBadge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    minWidth: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countText: { color: colors.text, fontWeight: '800', fontSize: 13 },
});
