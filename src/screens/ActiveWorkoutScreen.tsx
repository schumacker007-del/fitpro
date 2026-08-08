import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BodyMap from '../components/BodyMap';
import ExerciseAnimation from '../components/ExerciseAnimation';
import InjuryCautionBanner from '../components/InjuryCautionBanner';
import RestTimer from '../components/RestTimer';
import RpeSelector from '../components/RpeSelector';
import { Card, PrimaryButton } from '../components/ui';
import { useCustomWorkouts } from '../context/CustomWorkoutContext';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { useTrainingLog } from '../context/TrainingLogContext';
import { useHealthIntegration } from '../context/HealthIntegrationContext';
import { useUser } from '../context/UserContext';
import { badgeTitleKey } from '../i18n/muscleGroupLabel';
import { getMuscleGroup } from '../data/muscleGroups';
import { WORKOUTS } from '../data/workouts';
import { PreventScreenCapture, shouldPreventScreenCapture } from '../hooks/usePreventScreenCapture';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { RpeScore } from '../types';
import { getMatchingInjuriesForExercise } from '../utils/injuryCaution';

type Phase = 'exercise' | 'resting' | 'rpe' | 'done';

export default function ActiveWorkoutScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'ActiveWorkout'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'ActiveWorkout'>>();
  const { addLog, getSuggestion } = useTrainingLog();
  const { syncCompletedWorkout } = useHealthIntegration();
  const { t } = useLanguage();
  const { recordWorkoutDay } = useGamification();
  const { getCustomWorkout } = useCustomWorkouts();
  const { isPowerliftingAdvancedActive, profile } = useUser();
  const workout = WORKOUTS.find((w) => w.id === route.params.workoutId) ?? getCustomWorkout(route.params.workoutId);

  const blockCapture = shouldPreventScreenCapture(workout, isPowerliftingAdvancedActive);

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setNumber, setSetNumber] = useState(1);
  const [phase, setPhase] = useState<Phase>('exercise');
  const [sessionLogs, setSessionLogs] = useState<{ name: string; rpe: RpeScore }[]>([]);
  const workoutRecorded = useRef(false);
  const sessionStartedAt = useRef(new Date());

  const exercise = workout?.exercises[exerciseIndex];
  const isLastExercise = workout ? exerciseIndex === workout.exercises.length - 1 : true;

  const suggestion = useMemo(() => (exercise ? getSuggestion(exercise.id) : null), [exercise, getSuggestion]);
  const injuryMatches = useMemo(
    () => (exercise ? getMatchingInjuriesForExercise(exercise, profile?.injuryAreas) : []),
    [exercise, profile?.injuryAreas]
  );

  useEffect(() => {
    if (phase !== 'done' || workoutRecorded.current || !workout) return;
    workoutRecorded.current = true;
    (async () => {
      const endDate = new Date();
      await syncCompletedWorkout({
        title: workout.title,
        startDate: sessionStartedAt.current,
        endDate,
      });
      const newBadges = await recordWorkoutDay();
      if (newBadges.length > 0) {
        const lines = newBadges.map((id) => t(badgeTitleKey(id))).join('\n');
        Alert.alert(t('diet.achievementTitle'), lines);
      }
    })();
  }, [phase, recordWorkoutDay, syncCompletedWorkout, t, workout]);

  if (!workout || !exercise) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>{t('workouts.title')}</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingWrap}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
          <Text style={styles.doneTitle}>Treino não encontrado</Text>
          <Text style={styles.doneSubtitle}>Não foi possível iniciar este treino.</Text>
          <PrimaryButton label="Voltar" icon="arrow-back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleCompleteSet = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    if (setNumber < exercise.sets) {
      setPhase('resting');
    } else {
      setPhase('rpe');
    }
  };

  const handleRestComplete = () => {
    setSetNumber((n) => n + 1);
    setPhase('exercise');
  };

  const handleSelectRpe = async (rpe: RpeScore) => {
    await addLog({ exerciseId: exercise.id, exerciseName: exercise.name, workoutId: workout.id, rpe });
    setSessionLogs((prev) => [...prev, { name: exercise.name, rpe }]);
    if (isLastExercise) {
      setPhase('done');
    } else {
      setExerciseIndex((i) => i + 1);
      setSetNumber(1);
      setPhase('exercise');
    }
  };

  const confirmExit = () => {
    Alert.alert(t('activeWorkout.exitTitle'), t('activeWorkout.exitMessage'), [
      { text: t('activeWorkout.continueTraining'), style: 'cancel' },
      { text: t('common.exit'), style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <>
      <PreventScreenCapture active={blockCapture} />
      <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={confirmExit} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>
          {phase === 'done'
            ? t('activeWorkout.summaryTitle')
            : t('activeWorkout.exerciseProgress', {
                current: exerciseIndex + 1,
                total: workout.exercises.length,
              })}
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {phase === 'exercise' ? (
          <>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            {injuryMatches.length > 0 ? (
              <View style={{ marginBottom: spacing.sm }}>
                <InjuryCautionBanner injuries={injuryMatches} />
              </View>
            ) : null}
            <View style={styles.demoRow}>
              <ExerciseAnimation
                kind={exercise.animation}
                exerciseId={exercise.id}
                size={170}
                highlightColor={getMuscleGroup(exercise.primaryMuscles[0]).color}
              />
              <BodyMap highlighted={exercise.primaryMuscles} size={95} />
            </View>
            <Card style={styles.setCard}>
              <Text style={styles.setLabel}>
                {t('activeWorkout.setProgress', { current: setNumber, total: exercise.sets })}
              </Text>
              <Text style={styles.repsLabel}>{t('activeWorkout.reps', { reps: exercise.reps })}</Text>
            </Card>
            {suggestion ? <SuggestionBanner suggestion={suggestion.suggestion} t={t} /> : null}
            <View style={{ marginTop: spacing.lg }}>
              <PrimaryButton label={t('activeWorkout.completeSet')} icon="checkmark" onPress={handleCompleteSet} />
            </View>
          </>
        ) : null}

        {phase === 'resting' ? (
          <RestTimer seconds={exercise.restSeconds} onComplete={handleRestComplete} onSkip={handleRestComplete} />
        ) : null}

        {phase === 'rpe' ? (
          <>
            <Text style={styles.exerciseName}>{t('activeWorkout.exerciseDone', { name: exercise.name })}</Text>
            <Text style={styles.rpeQuestion}>{t('activeWorkout.rpeQuestion')}</Text>
            <Card style={{ marginTop: spacing.md }}>
              <RpeSelector onSelect={handleSelectRpe} />
            </Card>
          </>
        ) : null}

        {phase === 'done' ? (
          <>
            <Ionicons name="trophy" size={48} color={colors.gold} style={{ alignSelf: 'center', marginBottom: spacing.sm }} />
            <Text style={styles.doneTitle}>{t('activeWorkout.doneTitle')}</Text>
            <Text style={styles.doneSubtitle}>{workout.title}</Text>
            <Card style={{ marginTop: spacing.lg }}>
              <Text style={styles.sectionLabel}>{t('activeWorkout.effortByExercise')}</Text>
              {sessionLogs.map((log, i) => (
                <View key={i} style={styles.logRow}>
                  <Text style={styles.logName}>{log.name}</Text>
                  <View style={styles.logRpeBadge}>
                    <Text style={styles.logRpeText}>RPE {log.rpe}</Text>
                  </View>
                </View>
              ))}
            </Card>
            <View style={{ marginTop: spacing.lg }}>
              <PrimaryButton label={t('common.finish')} icon="checkmark-done" onPress={() => navigation.goBack()} />
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

function SuggestionBanner({
  suggestion,
  t,
}: {
  suggestion: 'increase_load' | 'more_rest' | 'maintain';
  t: (key: import('../i18n/translations').TranslationKey) => string;
}) {
  if (suggestion === 'maintain') return null;
  const isIncrease = suggestion === 'increase_load';
  return (
    <Card style={[styles.suggestionCard, { borderColor: isIncrease ? colors.primary : colors.danger }]}>
      <Ionicons name={isIncrease ? 'trending-up' : 'alert-circle'} size={18} color={isIncrease ? colors.primary : colors.danger} />
      <Text style={styles.suggestionText}>
        {isIncrease ? t('activeWorkout.suggestionIncrease') : t('activeWorkout.suggestionRest')}
      </Text>
    </Card>
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
  closeBtn: { padding: 4 },
  headerTitle: { color: colors.text, fontWeight: '700', fontSize: 14 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  exerciseName: { ...typography.h2, color: colors.text, textAlign: 'center', marginBottom: spacing.md },
  demoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  setCard: { alignItems: 'center', marginTop: spacing.lg },
  setLabel: { color: colors.text, fontSize: 18, fontWeight: '800' },
  repsLabel: { color: colors.textMuted, marginTop: 4 },
  suggestionCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md, borderWidth: 1 },
  suggestionText: { color: colors.text, flex: 1, fontSize: 12, lineHeight: 17 },
  rpeQuestion: { color: colors.textMuted, textAlign: 'center', marginBottom: spacing.sm },
  doneTitle: { ...typography.h1, color: colors.text, textAlign: 'center' },
  doneSubtitle: { color: colors.textMuted, textAlign: 'center', marginTop: 4 },
  sectionLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginBottom: 8, textTransform: 'uppercase' },
  logRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  logName: { color: colors.text, fontSize: 13, flex: 1, marginRight: 8 },
  logRpeBadge: { backgroundColor: colors.surfaceAlt, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  logRpeText: { color: colors.gold, fontWeight: '800', fontSize: 12 },
});
