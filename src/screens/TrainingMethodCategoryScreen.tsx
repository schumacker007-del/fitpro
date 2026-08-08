import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { getTrainingMethodCategory } from '../data/trainingMethodCategories';
import { getMethodsForCategory } from '../data/trainingMethods';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function TrainingMethodCategoryScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'TrainingMethodCategory'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'TrainingMethodCategory'>>();
  const category = getTrainingMethodCategory(route.params.categoryId);
  const methods = getMethodsForCategory(category.id);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {category.title}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={methods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Card style={styles.introCard}>
            <View style={[styles.introIcon, { backgroundColor: `${category.color}22` }]}>
              <Ionicons name={category.icon} size={28} color={category.color} />
            </View>
            <Text style={styles.introText}>{category.description}</Text>
          </Card>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('TrainingMethodDetail', { methodId: item.id })}>
            <Card style={styles.methodCard}>
              <View style={[styles.methodIcon, { backgroundColor: `${category.color}18` }]}>
                <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color={category.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.methodName}>{item.name}</Text>
                <Text style={styles.methodShort} numberOfLines={2}>
                  {item.shortDescription}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Card>
          </Pressable>
        )}
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
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 15 },
  list: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  introCard: { marginBottom: spacing.md, gap: spacing.sm },
  introIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  introText: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  methodCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodName: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: 3 },
  methodShort: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
});
