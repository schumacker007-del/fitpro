import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseAnimation from '../components/ExerciseAnimation';
import { Card, PrimaryButton, SectionTitle, SelectableChip } from '../components/ui';
import { useCustomWorkouts } from '../context/CustomWorkoutContext';
import { useWorkoutDraft } from '../context/WorkoutDraftContext';
import { getMuscleGroup } from '../data/muscleGroups';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export default function WorkoutBuilderScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'WorkoutBuilder'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'WorkoutBuilder'>>();
  const { getCustomWorkout, saveWorkout, deleteWorkout } = useCustomWorkouts();
  const { draft, initDraft, setName, setGoal, setLevel, removeExercise, updateExercise, moveExercise, clearDraft } = useWorkoutDraft();

  const editingId = route.params?.workoutId;
  const isEditing = !!editingId;

  useEffect(() => {
    const existing = editingId ? getCustomWorkout(editingId) : undefined;
    initDraft(existing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!draft.name.trim()) {
      Alert.alert('Dê um nome ao treino', 'Escolha um nome para identificar esse treino.');
      return;
    }
    if (draft.exercises.length === 0) {
      Alert.alert('Adicione exercícios', 'Selecione pelo menos um exercício antes de salvar.');
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
    Alert.alert('Excluir treino', 'Tem certeza que deseja excluir esse treino personalizado?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteWorkout(editingId);
          clearDraft();
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]}>{isEditing ? 'Editar treino' : 'Montar treino'}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title="Nome do treino" />
        <TextInput
          style={styles.input}
          placeholder="Ex.: Treino ABC do professor João"
          placeholderTextColor={colors.textMuted}
          value={draft.name}
          onChangeText={setName}
        />

        <SectionTitle title="Objetivo" />
        <View style={styles.chipRow}>
          <SelectableChip label="Perder peso" selected={draft.goal === 'perder_peso'} onPress={() => setGoal('perder_peso')} />
          <SelectableChip label="Ganhar massa" selected={draft.goal === 'ganhar_massa'} onPress={() => setGoal('ganhar_massa')} />
          <SelectableChip label="Manter forma" selected={draft.goal === 'manter_forma'} onPress={() => setGoal('manter_forma')} />
        </View>

        <SectionTitle title="Nível" />
        <View style={styles.chipRow}>
          <SelectableChip label="Iniciante" selected={draft.level === 'iniciante'} onPress={() => setLevel('iniciante')} />
          <SelectableChip label="Intermediário" selected={draft.level === 'intermediario'} onPress={() => setLevel('intermediario')} />
          <SelectableChip label="Avançado" selected={draft.level === 'avancado'} onPress={() => setLevel('avancado')} />
        </View>

        <SectionTitle
          title="Exercícios"
          subtitle={draft.exercises.length ? `${draft.exercises.length} exercícios adicionados` : 'Nenhum exercício ainda'}
        />

        {draft.exercises.map((exercise, index) => (
          <Card key={exercise.id} style={styles.exerciseCard}>
            <View style={styles.exerciseRow}>
              <View style={styles.thumb}>
                <ExerciseAnimation
                  kind={exercise.animation}
                  size={56}
                  highlightColor={getMuscleGroup(exercise.primaryMuscles[0]).color}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName} numberOfLines={1}>
                  {exercise.name}
                </Text>
                <Text style={styles.exerciseMuscle}>{exercise.muscleGroup}</Text>
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
                <Text style={styles.editLabel}>Séries</Text>
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
                <Text style={styles.editLabel}>Repetições</Text>
                <TextInput
                  style={styles.repsInput}
                  value={exercise.reps}
                  onChangeText={(text) => updateExercise(exercise.id, { reps: text })}
                  placeholder="Ex.: 10-12"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <View style={styles.editField}>
                <Text style={styles.editLabel}>Descanso</Text>
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
            label="Adicionar exercícios"
            icon="add-circle-outline"
            variant="outline"
            onPress={() => navigation.navigate('ExercisePicker')}
          />
        </View>

        <View style={{ marginTop: spacing.lg }}>
          <PrimaryButton label={isEditing ? 'Salvar alterações' : 'Salvar treino'} icon="checkmark" onPress={handleSave} />
        </View>

        {isEditing ? (
          <View style={{ marginTop: spacing.sm }}>
            <PrimaryButton label="Excluir treino" icon="trash-outline" variant="danger" onPress={handleDelete} />
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
