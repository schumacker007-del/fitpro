import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, ProBadge, SectionTitle } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { getHomeLibraryExercises, getHomeWorkouts } from '../data/workouts';
import { allowScreenCaptureGuard } from '../hooks/usePreventScreenCapture';
import { HomeWorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';
import { WorkoutPlan } from '../types';

type ListItem =
  | { kind: 'workout'; workout: WorkoutPlan }
  | { kind: 'exercise'; workoutId: string; exerciseId: string; title: string; muscleGroup: string; tier?: 'free' | 'pro' };

export default function HomeWorkoutsScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<HomeWorkoutsStackParamList, 'HomeWorkoutsList'>>();
  const { planTier } = useUser();

  useFocusEffect(
    useCallback(() => {
      allowScreenCaptureGuard();
    }, []),
  );

  const items = useMemo<ListItem[]>(() => {
    const workouts = getHomeWorkouts().map((workout) => ({ kind: 'workout' as const, workout }));
    const exercises = getHomeLibraryExercises().map((entry) => ({
      kind: 'exercise' as const,
      workoutId: entry.workoutId,
      exerciseId: entry.exercise.id,
      title: entry.exercise.name,
      muscleGroup: entry.exercise.muscleGroup,
      tier: entry.exercise.tier,
    }));
    return [...workouts, ...exercises];
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={items}
        keyExtractor={(item) =>
          item.kind === 'workout' ? `workout-${item.workout.id}` : `exercise-${item.workoutId}-${item.exerciseId}`
        }
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <SectionTitle title={t('homeWorkouts.title')} subtitle={t('homeWorkouts.subtitle')} />

            <Pressable onPress={() => navigation.navigate('MuscleGroups')}>
              <Card style={styles.muscleGroupsBanner}>
                <Ionicons name="body-outline" size={22} color={colors.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.muscleGroupsTitle}>{t('homeWorkouts.muscleGroupsTitle')}</Text>
                  <Text style={styles.muscleGroupsSubtitle}>{t('homeWorkouts.muscleGroupsSubtitle')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Card>
            </Pressable>

            <View style={{ height: spacing.md }} />
            <SectionTitle title={t('homeWorkouts.readyWorkouts')} subtitle={t('homeWorkouts.readyWorkoutsSubtitle')} />
          </>
        }
        renderItem={({ item }) => {
          if (item.kind === 'workout') {
            const locked = item.workout.tier === 'pro' && planTier === 'free';
            return (
              <Pressable onPress={() => navigation.navigate('WorkoutDetail', { workoutId: item.workout.id })}>
                <Card style={styles.card}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.titleRow}>
                      <Text style={styles.workoutTitle}>{item.workout.title}</Text>
                      {item.workout.tier === 'pro' ? <ProBadge /> : null}
                    </View>
                    <View style={styles.pillRow}>
                      <Pill label={goalLabel(item.workout.goal, t)} tone="primary" />
                      <Pill label={levelLabel(item.workout.level, t)} />
                      <Pill label={`${item.workout.durationMinutes} ${t('common.minutes')}`} />
                    </View>
                    <Text style={styles.exercisesCount}>
                      {item.workout.exercises.length} {t('common.exercises')}
                    </Text>
                  </View>
                  <Ionicons
                    name={locked ? 'lock-closed' : 'chevron-forward'}
                    size={20}
                    color={locked ? colors.gold : colors.textMuted}
                  />
                </Card>
              </Pressable>
            );
          }

          const locked = item.tier === 'pro' && planTier === 'free';
          return (
            <Pressable
              onPress={() =>
                navigation.navigate('ExerciseDetail', { workoutId: item.workoutId, exerciseId: item.exerciseId })
              }
            >
              <Card style={styles.card}>
                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.workoutTitle}>{item.title}</Text>
                    {item.tier === 'pro' ? <ProBadge /> : null}
                  </View>
                  <View style={styles.pillRow}>
                    <Pill label={item.muscleGroup} />
                  </View>
                </View>
                <Ionicons
                  name={locked ? 'lock-closed' : 'chevron-forward'}
                  size={20}
                  color={locked ? colors.gold : colors.textMuted}
                />
              </Card>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
}

function goalLabel(goal: string, t: (key: import('../i18n/translations').TranslationKey) => string) {
  if (goal === 'perder_peso') return t('onboarding.goal.perder_peso');
  if (goal === 'ganhar_massa') return t('onboarding.goal.ganhar_massa');
  if (goal === 'condicionamento_fisico') return t('onboarding.goal.condicionamento_fisico');
  return t('onboarding.goal.manter_forma');
}

function levelLabel(level: string, t: (key: import('../i18n/translations').TranslationKey) => string) {
  if (level === 'iniciante') return t('level.beginner');
  if (level === 'intermediario') return t('level.intermediate');
  return t('level.advanced');
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, paddingBottom: spacing.xl },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  workoutTitle: { color: colors.text, fontSize: 16, fontWeight: '700', flexShrink: 1 },
  pillRow: { flexDirection: 'row', gap: 6, marginBottom: 6, flexWrap: 'wrap' },
  exercisesCount: { color: colors.textMuted, fontSize: 12 },
  muscleGroupsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
    borderColor: 'rgba(34,197,94,0.35)',
    borderRadius: radius.lg,
  },
  muscleGroupsTitle: { color: colors.text, fontWeight: '700', fontSize: 14 },
  muscleGroupsSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
});
