import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseAnimation from '../components/ExerciseAnimation';
import InjuryCautionBanner from '../components/InjuryCautionBanner';
import MuscleZoomCard from '../components/MuscleZoomCard';
import { Card, Pill, PrimaryButton } from '../components/ui';
import { useCustomWorkouts } from '../context/CustomWorkoutContext';
import { useLanguage } from '../context/LanguageContext';
import { useTrainingLog } from '../context/TrainingLogContext';
import { useUser } from '../context/UserContext';
import { muscleGroupLabelKey } from '../i18n/muscleGroupLabel';
import { getMuscleGroup } from '../data/muscleGroups';
import { WORKOUTS } from '../data/workouts';
import { PreventScreenCapture, shouldPreventScreenCapture } from '../hooks/usePreventScreenCapture';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { getMatchingInjuriesForExercise } from '../utils/injuryCaution';

export default function ExerciseDetailScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'ExerciseDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'ExerciseDetail'>>();
  const { planTier, isPowerliftingAdvancedActive, profile } = useUser();
  const { t } = useLanguage();
  const { getSuggestion } = useTrainingLog();
  const { getCustomWorkout } = useCustomWorkouts();
  const workout = WORKOUTS.find((w) => w.id === route.params.workoutId) ?? getCustomWorkout(route.params.workoutId);
  const exercise = workout?.exercises.find((e) => e.id === route.params.exerciseId);

  const blockCapture = shouldPreventScreenCapture(workout, isPowerliftingAdvancedActive);

  if (!workout || !exercise) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.loadingWrap}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  const isPro = planTier === 'pro';
  const suggestion = getSuggestion(exercise.id);
  const injuryMatches = getMatchingInjuriesForExercise(exercise, profile?.injuryAreas);

  return (
    <>
      <PreventScreenCapture active={blockCapture} />
      <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]} numberOfLines={1}>
          {exercise.name}
        </Text>
        <View style={{ width: 22 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.demoRow}>
          <ExerciseAnimation
            kind={exercise.animation}
            exerciseId={exercise.id}
            size={240}
            highlightColor={getMuscleGroup(exercise.primaryMuscles[0]).color}
          />
        </View>

        <View style={styles.zoomRow}>
          {exercise.primaryMuscles.slice(0, 2).map((m) => (
            <MuscleZoomCard key={m} muscle={m} size={92} />
          ))}
        </View>

        <View style={styles.pillRow}>
          <Pill label={t('exerciseDetail.sets', { count: exercise.sets })} tone="primary" />
          <Pill label={t('exerciseDetail.reps', { reps: exercise.reps })} tone="primary" />
          <Pill label={t('exerciseDetail.rest', { seconds: exercise.restSeconds })} tone="gold" />
        </View>

        {injuryMatches.length > 0 ? (
          <View style={{ marginTop: spacing.md }}>
            <InjuryCautionBanner injuries={injuryMatches} />
          </View>
        ) : null}

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.sectionLabel}>{t('exerciseDetail.muscleGroup')}</Text>
          <Text style={styles.value}>{t(muscleGroupLabelKey(exercise.primaryMuscles[0]))}</Text>
          <View style={styles.muscleChipRow}>
            {exercise.primaryMuscles.map((m) => {
              const info = getMuscleGroup(m);
              return (
                <View key={m} style={[styles.muscleChip, { backgroundColor: `${info.color}26`, borderColor: info.color }]}>
                  <View style={[styles.muscleDot, { backgroundColor: info.color }]} />
                  <Text style={[styles.muscleChipText, { color: info.color }]}>{t(muscleGroupLabelKey(m))}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.sectionLabel}>{t('exerciseDetail.howTo')}</Text>
          {exercise.instructions.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </Card>

        {suggestion && suggestion.suggestion !== 'maintain' ? (
          <Card
            style={[
              styles.suggestionCard,
              { borderColor: suggestion.suggestion === 'increase_load' ? colors.primary : colors.danger },
            ]}
          >
            <Ionicons
              name={suggestion.suggestion === 'increase_load' ? 'trending-up' : 'alert-circle'}
              size={18}
              color={suggestion.suggestion === 'increase_load' ? colors.primary : colors.danger}
            />
            <Text style={styles.suggestionText}>
              {suggestion.suggestion === 'increase_load'
                ? t('exerciseDetail.suggestionIncrease', { rpe: suggestion.avgRpe.toFixed(1) })
                : t('exerciseDetail.suggestionRest', { rpe: suggestion.avgRpe.toFixed(1) })}
            </Text>
          </Card>
        ) : null}

        {isPro ? (
          <>
            <Card style={{ marginTop: spacing.md }}>
              <View style={styles.checklistHeader}>
                <Ionicons name="body" size={16} color={colors.primary} />
                <Text style={styles.sectionLabel}>{t('exerciseDetail.postureTitle')}</Text>
              </View>
              {exercise.postureTips.map((tip, i) => (
                <View key={i} style={styles.checkRow}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                  <Text style={styles.checkText}>{tip}</Text>
                </View>
              ))}
            </Card>

            <Card style={{ marginTop: spacing.md }}>
              <View style={styles.checklistHeader}>
                <Ionicons name="warning" size={16} color={colors.danger} />
                <Text style={styles.sectionLabel}>{t('exerciseDetail.errorsAvoid')}</Text>
              </View>
              {exercise.commonMistakes.map((mistake, i) => (
                <View key={i} style={styles.checkRow}>
                  <Ionicons name="close-circle" size={16} color={colors.danger} />
                  <Text style={styles.checkText}>{mistake}</Text>
                </View>
              ))}
            </Card>
          </>
        ) : (
          <Card style={styles.teaserCard}>
            <Ionicons name="lock-closed" size={20} color={colors.gold} />
            <Text style={styles.teaserTitle}>{t('exerciseDetail.proTeaserTitle')}</Text>
            <Text style={styles.teaserSubtitle}>{t('exerciseDetail.proTeaserSubtitle')}</Text>
            <PrimaryButton
              label={t('common.viewProPlan')}
              icon="star"
              variant="gold"
              onPress={() => (navigation.getParent() as any)?.navigate('Perfil', { screen: 'Paywall' })}
            />
          </Card>
        )}

        <Text style={styles.tip}>{t('exerciseDetail.animationTip')}</Text>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backBtn: { padding: 4 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, alignItems: 'stretch' },
  demoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  zoomRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.md, marginTop: spacing.md },
  pillRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginTop: spacing.lg, flexWrap: 'wrap' },
  sectionLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' },
  value: { color: colors.text, fontSize: 16, fontWeight: '700' },
  muscleChipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: spacing.sm },
  muscleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },
  muscleDot: { width: 7, height: 7, borderRadius: 4 },
  muscleChipText: { fontSize: 12, fontWeight: '700' },
  stepRow: { flexDirection: 'row', gap: 10, marginBottom: 12, alignItems: 'flex-start' },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepBadgeText: { color: '#0B1210', fontWeight: '800', fontSize: 12 },
  stepText: { color: colors.text, flex: 1, lineHeight: 20 },
  tip: { color: colors.textMuted, fontSize: 13, marginTop: spacing.lg, textAlign: 'center', lineHeight: 18 },
  suggestionCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md, borderWidth: 1 },
  suggestionText: { color: colors.text, flex: 1, fontSize: 12, lineHeight: 17 },
  checklistHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  checkRow: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'flex-start' },
  checkText: { color: colors.text, flex: 1, fontSize: 13, lineHeight: 19 },
  teaserCard: { alignItems: 'center', gap: 6, marginTop: spacing.md },
  teaserTitle: { color: colors.text, fontWeight: '800', fontSize: 14, textAlign: 'center', marginTop: 4 },
  teaserSubtitle: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: spacing.sm },
});
