import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { getTrainingMethodCategory } from '../data/trainingMethodCategories';
import { getTrainingMethod } from '../data/trainingMethods';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function TrainingMethodDetailScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'TrainingMethodDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'TrainingMethodDetail'>>();
  const method = getTrainingMethod(route.params.methodId);
  const category = getTrainingMethodCategory(method.categoryId);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {method.name}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroBadge, { backgroundColor: `${category.color}22` }]}>
          <Ionicons name={method.icon as keyof typeof Ionicons.glyphMap} size={32} color={category.color} />
        </View>

        <Text style={styles.title}>{method.name}</Text>
        <Text style={styles.categoryTag}>{category.title}</Text>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="hand-left-outline" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Como fazer</Text>
          </View>
          <Text style={styles.body}>{method.howTo}</Text>
        </Card>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flag-outline" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Objetivo</Text>
          </View>
          <Text style={styles.body}>{method.objective}</Text>
        </Card>

        {method.example ? (
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="barbell-outline" size={18} color={colors.primary} />
              <Text style={styles.sectionTitle}>Exemplo prático</Text>
            </View>
            <Text style={styles.body}>{method.example}</Text>
          </Card>
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
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 16 },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  heroBadge: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  categoryTag: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  section: { marginBottom: spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  body: { color: colors.text, fontSize: 14, lineHeight: 22 },
});
