import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseAnimation from '../components/ExerciseAnimation';
import { Card, PrimaryButton, SelectableChip } from '../components/ui';
import { useWorkoutDraft } from '../context/WorkoutDraftContext';
import { getMuscleGroup, MUSCLE_GROUPS } from '../data/muscleGroups';
import { getExercisesForMuscleGroup } from '../data/workouts';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { MuscleGroupId } from '../types';

export default function ExercisePickerScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'ExercisePicker'>>();
  const { draft, addExercise, removeExercise, isSelected } = useWorkoutDraft();
  const [activeGroup, setActiveGroup] = useState<MuscleGroupId>('peito');

  const exercises = useMemo(() => getExercisesForMuscleGroup(activeGroup), [activeGroup]);
  const groupInfo = getMuscleGroup(activeGroup);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]}>Adicionar exercícios</Text>
        <View style={{ width: 22 }} />
      </View>

      <SectionList
        sections={[{ title: groupInfo.label, data: exercises }]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.groupChipsWrap}>
            {MUSCLE_GROUPS.map((g) => (
              <SelectableChip key={g.id} label={g.label} selected={activeGroup === g.id} onPress={() => setActiveGroup(g.id)} />
            ))}
          </View>
        }
        renderSectionHeader={() => (
          <Text style={styles.sectionHeader}>{exercises.length} exercícios em {groupInfo.label}</Text>
        )}
        renderItem={({ item }) => {
          const selected = isSelected(item.id);
          return (
            <Pressable onPress={() => (selected ? removeExercise(item.id) : addExercise(item))}>
              <Card style={[styles.exerciseCard, selected && styles.exerciseCardSelected]}>
                <View style={styles.thumb}>
                  <ExerciseAnimation kind={item.animation} size={56} highlightColor={groupInfo.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exerciseName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.exerciseMeta}>
                    {item.sets}x {item.reps} · descanso {item.restSeconds}s
                  </Text>
                </View>
                <Ionicons
                  name={selected ? 'checkmark-circle' : 'add-circle-outline'}
                  size={26}
                  color={selected ? colors.primary : colors.textMuted}
                />
              </Card>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum exercício cadastrado ainda pra esse grupo.</Text>}
      />

      <View style={styles.footer}>
        <PrimaryButton
          label={`Concluir (${draft.exercises.length} selecionado${draft.exercises.length === 1 ? '' : 's'})`}
          icon="checkmark"
          onPress={() => navigation.goBack()}
        />
      </View>
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
  list: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  groupChipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: spacing.md },
  sectionHeader: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginBottom: spacing.sm, textTransform: 'uppercase' },
  exerciseCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  exerciseCardSelected: { borderColor: colors.primary, backgroundColor: 'rgba(52,211,153,0.08)' },
  thumb: { borderRadius: 12, overflow: 'hidden' },
  exerciseName: { color: colors.text, fontWeight: '700', fontSize: 14 },
  exerciseMeta: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});
