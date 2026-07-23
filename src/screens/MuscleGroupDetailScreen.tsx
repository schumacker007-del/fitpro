import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BodyMap from '../components/BodyMap';
import ExerciseAnimation from '../components/ExerciseAnimation';
import { Card, ProBadge } from '../components/ui';
import { getMuscleGroup } from '../data/muscleGroups';
import { getExercisesForMuscleGroup } from '../data/workouts';
import { useUser } from '../context/UserContext';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export default function MuscleGroupDetailScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'MuscleGroupDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'MuscleGroupDetail'>>();
  const { planTier } = useUser();
  const info = getMuscleGroup(route.params.muscleGroupId);
  const exercises = getExercisesForMuscleGroup(route.params.muscleGroupId);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]}>{info.label}</Text>
        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={exercises}
        keyExtractor={(e) => e.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.heroWrap}>
            <BodyMap highlighted={[info.id]} size={110} />
          </View>
        }
        renderItem={({ item, index }) => {
          const locked = item.tier === 'pro' && planTier === 'free';
          return (
            <Pressable
              onPress={() =>
                locked
                  ? navigation.navigate('WorkoutDetail', { workoutId: item.workoutId })
                  : navigation.navigate('ExerciseDetail', { workoutId: item.workoutId, exerciseId: item.id })
              }
            >
              <Card style={styles.exerciseCard}>
                <View style={styles.thumb}>
                  <ExerciseAnimation kind={item.animation} size={64} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.exerciseName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    {item.tier === 'pro' ? <ProBadge /> : null}
                  </View>
                  <Text style={styles.workoutRef} numberOfLines={1}>
                    {item.workoutTitle}
                  </Text>
                </View>
                <View style={styles.repsBadge}>
                  <Text style={styles.repsBadgeText}>
                    {item.sets}x{item.reps}
                  </Text>
                </View>
                <Ionicons
                  name={locked ? 'lock-closed' : 'chevron-forward'}
                  size={16}
                  color={locked ? colors.gold : colors.textMuted}
                />
              </Card>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum exercício cadastrado ainda pra esse grupo.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backBtn: { padding: 4 },
  heroWrap: { alignItems: 'center', marginBottom: spacing.lg },
  list: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  exerciseCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  thumb: { borderRadius: 12, overflow: 'hidden' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  exerciseName: { color: colors.text, fontWeight: '700', fontSize: 14, flexShrink: 1 },
  workoutRef: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  repsBadge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  repsBadgeText: { color: colors.primary, fontWeight: '800', fontSize: 12 },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
