import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BodyMap from '../components/BodyMap';
import ExerciseAnimation from '../components/ExerciseAnimation';
import { Card, Pill } from '../components/ui';
import { getMuscleGroup } from '../data/muscleGroups';
import { WORKOUTS } from '../data/workouts';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export default function ExerciseDetailScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'ExerciseDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'ExerciseDetail'>>();
  const workout = WORKOUTS.find((w) => w.id === route.params.workoutId);
  const exercise = workout?.exercises.find((e) => e.id === route.params.exerciseId);

  if (!workout || !exercise) return null;

  return (
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
          <ExerciseAnimation kind={exercise.animation} size={180} />
          <BodyMap highlighted={exercise.primaryMuscles} size={100} />
        </View>

        <View style={styles.pillRow}>
          <Pill label={`${exercise.sets} séries`} tone="primary" />
          <Pill label={`${exercise.reps} repetições`} tone="primary" />
          <Pill label={`Descanso ${exercise.restSeconds}s`} tone="gold" />
        </View>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.sectionLabel}>Grupo muscular</Text>
          <Text style={styles.value}>{exercise.muscleGroup}</Text>
          <View style={styles.muscleChipRow}>
            {exercise.primaryMuscles.map((m) => {
              const info = getMuscleGroup(m);
              return (
                <View key={m} style={[styles.muscleChip, { backgroundColor: `${info.color}26`, borderColor: info.color }]}>
                  <View style={[styles.muscleDot, { backgroundColor: info.color }]} />
                  <Text style={[styles.muscleChipText, { color: info.color }]}>{info.label}</Text>
                </View>
              );
            })}
          </View>
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <Text style={styles.sectionLabel}>Como executar</Text>
          {exercise.instructions.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </Card>

        <Text style={styles.tip}>
          💡 A animação acima ilustra o padrão de movimento. Ajuste carga e amplitude conforme sua mobilidade.
        </Text>
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
  content: { padding: spacing.lg, paddingBottom: spacing.xl, alignItems: 'stretch' },
  demoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.md },
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
});
