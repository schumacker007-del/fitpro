import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseAnimation from '../components/ExerciseAnimation';
import { Card, PrimaryButton, SectionTitle, SelectableChip } from '../components/ui';
import { useCustomWorkouts } from '../context/CustomWorkoutContext';
import { useLanguage } from '../context/LanguageContext';
import { useWorkoutDraft } from '../context/WorkoutDraftContext';
import { getMuscleGroup } from '../data/muscleGroups';
import { muscleGroupLabelKey } from '../i18n/muscleGroupLabel';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { TranslationKey } from '../i18n/translations';

const GOAL_KEYS: Record<string, TranslationKey> = {
  perder_peso: 'onboarding.goal.perder_peso',
  ganhar_massa: 'onboarding.goal.ganhar_massa',
  manter_forma: 'onboarding.goal.manter_forma',
};

const LEVEL_KEYS: Record<string, TranslationKey> = {
  iniciante: 'level.beginner',
  intermediario: 'level.intermediate',
  avancado: 'level.advanced',
};

export default function WorkoutBuilderScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'WorkoutBuilder'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'WorkoutBuilder'>>();
  const { getCustomWorkout, saveWorkout, deleteWorkout } = useCustomWorkouts();
  const { draft, initDraft, setName, setGoal, setLevel, removeExercise, updateExercise, moveExercise, clearDraft } = useWorkoutDraft();
  const { t } = useLanguage();

  const editingId = route.params?.workoutId;
  const isEditing = !!editingId;

  useEffect(() => {
    const existing = editingId ? getCustomWorkout(editingId) : undefined;
    initDraft(existing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!draft.name.trim()) {
      Alert.alert(t('workoutBuilder.alertNameTitle'), t('workoutBuilder.alertNameBody'));
      return;
    }
    if (draft.exercises.length === 0) {
      Alert.alert(t('workoutBuilder.alertExercisesTitle'), t('workoutBuilder.alertExercisesBody'));
      return;
    }
    const totalMinutes = Math.max(10, Math.round(draft.exercises.length * 6));
    await saveWorkout({
      id: draft.id ?? `w-custom-${Date.now()}`,
      title: draft.name.trim(),
      goal: draft.goal,
      level: draft.level,
      durationMinutes: totalMinutes,
      tier: 'pro',
      custom: true,
      exercises: draft.exercises,
    });
    clearDraft();
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!editingId) return;
    Alert.alert(t('workoutBuilder.deleteTitle'), t('workoutBuilder.deleteBody'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          await deleteWorkout(editingId);
          clearDraft();
          navigation.goBack();
        },
      },
    ]);
  };

  const exercisesSubtitle =
    draft.exercises.length > 0
      ? t('workoutBuilder.exercisesAdded', { count: draft.exercises.length })
      : t('workoutBuilder.exercisesEmpty');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]}>
          {isEditing ? t('workoutBuilder.titleEdit') : t('workoutBuilder.titleCreate')}
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title={t('workoutBuilder.nameSection')} />
        <TextInput
          style={styles.input}
          placeholder={t('workoutBuilder.namePlaceholder')}
          placeholderTextColor={colors.textMuted}
          value={draft.name}
          onChangeText={setName}
        />

        <SectionTitle title={t('workoutBuilder.goalSection')} />
        <View style={styles.chipRow}>
          <SelectableChip
            label={t(GOAL_KEYS.perder_peso)}
            selected={draft.goal === 'perder_peso'}
            onPress={() => setGoal('perder_peso')}
          />
          <SelectableChip
            label={t(GOAL_KEYS.ganhar_massa)}
            selected={draft.goal === 'ganhar_massa'}
            onPress={() => setGoal('ganhar_massa')}
          />
          <SelectableChip
            label={t(GOAL_KEYS.manter_forma)}
            selected={draft.goal === 'manter_forma'}
            onPress={() => setGoal('manter_forma')}
          />
        </View>

        <SectionTitle title={t('workoutBuilder.levelSection')} />
        <View style={styles.chipRow}>
          <SelectableChip
            label={t(LEVEL_KEYS.iniciante)}
            selected={draft.level === 'iniciante'}
            onPress={() => setLevel('iniciante')}
          />
          <SelectableChip
            label={t(LEVEL_KEYS.intermediario)}
            selected={draft.level === 'intermediario'}
            onPress={() => setLevel('intermediario')}
          />
          <SelectableChip
            label={t(LEVEL_KEYS.avancado)}
            selected={draft.level === 'avancado'}
            onPress={() => setLevel('avancado')}
          />
        </View>

        <SectionTitle title={t('workoutBuilder.exercisesSection')} subtitle={exercisesSubtitle} />

        {draft.exercises.map((exercise, index) => (
          <Card key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseRow}>
              <View style={styles.thumb}>
                <ExerciseAnimation
                  kind={exercise.animation}
                  exerciseId={exercise.id}
                  size={56}
                  highlightColor={getMuscleGroup(exercise.primaryMuscles[0]).color}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName} numberOfLines={1}>
                  {exercise.name}
                </Text>
                <Text style={styles.exerciseMuscle}>
                  {t(muscleGroupLabelKey(exercise.primaryMuscles[0]))}
                </Text>
              </View>
              <View style={styles.reorderCol}>
                <Pressable disabled={index === 0} onPress={() => moveExercise(exercise.id, 'up')}>
                  <Ionicons name="chevron-up" size={18} color={index === 0 ? colors.border : colors.textMuted} />
                </Pressable>
                <Pressable disabled={index === draft.exercises.length - 1} onPress={() => moveExercise(exercise.id, 'down')}>
                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color={index === draft.exercises.length - 1 ? colors.border : colors.textMuted}
                  />
                </Pressable>
              </View>
              <Pressable onPress={() => removeExercise(exercise.id)} style={styles.removeBtn}>
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
              </Pressable>
            </View>

            <View style={styles.editRow}>
              <View style={styles.editField}>
                <Text style={styles.editLabel}>{t('workoutBuilder.sets')}</Text>
                <View style={styles.stepperRow}>
                  <Pressable
                    style={styles.stepperBtn}
                    onPress={() => updateExercise(exercise.id, { sets: Math.max(1, exercise.sets - 1) })}
                  >
                    <Ionicons name="remove" size={14} color={colors.text} />
                  </Pressable>
                  <Text style={styles.stepperValue}>{exercise.sets}</Text>
                  <Pressable
                    style={styles.stepperBtn}
                    onPress={() => updateExercise(exercise.id, { sets: Math.min(10, exercise.sets + 1) })}
                  >
                    <Ionicons name="add" size={14} color={colors.text} />
                  </Pressable>
                </View>
              </View>

              <View style={[styles.editField, { flex: 1 }]}>
                <Text style={styles.editLabel}>{t('workoutBuilder.reps')}</Text>
                <TextInput
                  style={styles.repsInput}
                  value={exercise.reps}
                  onChangeText={(text) => updateExercise(exercise.id, { reps: text })}
                  placeholder={t('workoutBuilder.repsPlaceholder')}
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <View style={styles.editField}>
                <Text style={styles.editLabel}>{t('workoutBuilder.rest')}</Text>
                <View style={styles.stepperRow}>
                  <Pressable
                    style={styles.stepperBtn}
                    onPress={() => updateExercise(exercise.id, { restSeconds: Math.max(0, exercise.restSeconds - 15) })}
                  >
                    <Ionicons name="remove" size={14} color={colors.text} />
                  </Pressable>
                  <Text style={styles.stepperValue}>{exercise.restSeconds}s</Text>
                  <Pressable
                    style={styles.stepperBtn}
                    onPress={() => updateExercise(exercise.id, { restSeconds: Math.min(180, exercise.restSeconds + 15) })}
                  >
                    <Ionicons name="add" size={14} color={colors.text} />
                  </Pressable>
                </View>
              </View>
            </View>
          </Card>
        ))}

        <View style={{ marginTop: spacing.sm }}>
          <PrimaryButton
            label={t('workoutBuilder.addExercises')}
            icon="add-circle-outline"
            variant="outline"
            onPress={() => navigation.navigate('ExercisePicker')}
          />
        </View>

        <View style={{ marginTop: spacing.lg }}>
          <PrimaryButton
            label={isEditing ? t('workoutBuilder.saveEdit') : t('workoutBuilder.save')}
            icon="checkmark"
            onPress={handleSave}
          />
        </View>

        {isEditing ? (
          <View style={{ marginTop: spacing.sm }}>
            <PrimaryButton label={t('workoutBuilder.delete')} icon="trash-outline" variant="danger" onPress={handleDelete} />
          </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backBtn: { padding: 4 },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    color: colors.text,
    fontSize: 14,
    marginBottom: spacing.lg,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: spacing.lg },
  exerciseCard: { marginBottom: spacing.sm },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  thumb: { borderRadius: 10, overflow: 'hidden' },
  exerciseName: { color: colors.text, fontWeight: '700', fontSize: 13 },
  exerciseMuscle: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  reorderCol: { alignItems: 'center' },
  removeBtn: { padding: 4 },
  editRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, alignItems: 'flex-end' },
  editField: { alignItems: 'center' },
  editLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '700', marginBottom: 4, textTransform: 'uppercase' },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stepperBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: { color: colors.text, fontWeight: '800', fontSize: 12, minWidth: 28, textAlign: 'center' },
  repsInput: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: colors.text,
    fontSize: 12,
    textAlign: 'center',
    minWidth: 70,
  },
});
