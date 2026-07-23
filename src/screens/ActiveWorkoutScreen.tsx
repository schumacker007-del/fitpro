import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BodyMap from '../components/BodyMap';
import ExerciseAnimation from '../components/ExerciseAnimation';
import RestTimer from '../components/RestTimer';
import RpeSelector from '../components/RpeSelector';
import { Card, PrimaryButton } from '../components/ui';
import { useTrainingLog } from '../context/TrainingLogContext';
import { getMuscleGroup } from '../data/muscleGroups';
import { WORKOUTS } from '../data/workouts';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { RpeScore } from '../types';

type Phase = 'exercise' | 'resting' | 'rpe' | 'done';

export default function ActiveWorkoutScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'ActiveWorkout'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'ActiveWorkout'>>();
  const { addLog, getSuggestion } = useTrainingLog();
  const workout = WORKOUTS.find((w) => w.id === route.params.workoutId);

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [setNumber, setSetNumber] = useState(1);
  const [phase, setPhase] = useState<Phase>('exercise');
  const [sessionLogs, setSessionLogs] = useState<{ name: string; rpe: RpeScore }[]>([]);

  const exercise = workout?.exercises[exerciseIndex];
  const isLastExercise = workout ? exerciseIndex === workout.exercises.length - 1 : true;

  const suggestion = useMemo(() => (exercise ? getSuggestion(exercise.id) : null), [exercise, getSuggestion]);

  if (!workout || !exercise) return null;

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
    Alert.alert('Sair do treino?', 'Seu progresso desta sessão não será salvo.', [
      { text: 'Continuar treinando', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={confirmExit} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>
          {phase === 'done' ? 'Resumo do treino' : `Exercício ${exerciseIndex + 1} de ${workout.exercises.length}`}
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {phase === 'exercise' ? (
          <>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <View style={styles.demoRow}>
              <ExerciseAnimation
                kind={exercise.animation}
                size={170}
                highlightColor={getMuscleGroup(exercise.primaryMuscles[0]).color}
              />
              <BodyMap highlighted={exercise.primaryMuscles} size={95} />
            </View>
            <Card style={styles.setCard}>
              <Text style={styles.setLabel}>Série {setNumber} de {exercise.sets}</Text>
              <Text style={styles.repsLabel}>{exercise.reps} repetições</Text>
            </Card>
            {suggestion ? <SuggestionBanner suggestion={suggestion.suggestion} /> : null}
            <View style={{ marginTop: spacing.lg }}>
              <PrimaryButton label="Concluir série" icon="checkmark" onPress={handleCompleteSet} />
            </View>
          </>
        ) : null}

        {phase === 'resting' ? (
          <RestTimer seconds={exercise.restSeconds} onComplete={handleRestComplete} onSkip={handleRestComplete} />
        ) : null}

        {phase === 'rpe' ? (
          <>
            <Text style={styles.exerciseName}>{exercise.name} concluído! 💪</Text>
            <Text style={styles.rpeQuestion}>Qual foi seu esforço percebido (RPE) nesse exercício?</Text>
            <Card style={{ marginTop: spacing.md }}>
              <RpeSelector onSelect={handleSelectRpe} />
            </Card>
          </>
        ) : null}

        {phase === 'done' ? (
          <>
            <Ionicons name="trophy" size={48} color={colors.gold} style={{ alignSelf: 'center', marginBottom: spacing.sm }} />
            <Text style={styles.doneTitle}>Treino concluído!</Text>
            <Text style={styles.doneSubtitle}>{workout.title}</Text>
            <Card style={{ marginTop: spacing.lg }}>
              <Text style={styles.sectionLabel}>Esforço por exercício</Text>
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
              <PrimaryButton label="Concluir" icon="checkmark-done" onPress={() => navigation.goBack()} />
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function SuggestionBanner({ suggestion }: { suggestion: 'increase_load' | 'more_rest' | 'maintain' }) {
  if (suggestion === 'maintain') return null;
  const isIncrease = suggestion === 'increase_load';
  return (
    <Card style={[styles.suggestionCard, { borderColor: isIncrease ? colors.primary : colors.danger }]}>
      <Ionicons name={isIncrease ? 'trending-up' : 'alert-circle'} size={18} color={isIncrease ? colors.primary : colors.danger} />
      <Text style={styles.suggestionText}>
        {isIncrease
          ? 'Nas últimas sessões seu esforço ficou baixo — considere aumentar a carga.'
          : 'Seu esforço tem ficado muito alto — considere descansar mais ou reduzir a carga.'}
      </Text>
    </Card>
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
