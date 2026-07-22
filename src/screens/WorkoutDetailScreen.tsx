import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseAnimation from '../components/ExerciseAnimation';
import { Card, Pill, PrimaryButton, ProBadge } from '../components/ui';
import { useUser } from '../context/UserContext';
import { WORKOUTS } from '../data/workouts';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export default function WorkoutDetailScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'WorkoutDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'WorkoutDetail'>>();
  const { planTier } = useUser();
  const workout = WORKOUTS.find((w) => w.id === route.params.workoutId);

  if (!workout) return null;

  const isLocked = workout.tier === 'pro' && planTier === 'free';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]}>{workout.title}</Text>
        <View style={{ width: 22 }} />
      </View>

      {isLocked ? (
        <View style={styles.lockedWrap}>
          <Ionicons name="lock-closed" size={36} color={colors.gold} />
          <Text style={styles.lockedTitle}>Treino exclusivo do plano Pro</Text>
          <Text style={styles.lockedSubtitle}>
            Desbloqueie esse e outros treinos completos assinando o FitPro Pro.
          </Text>
          <PrimaryButton
            label="Ver plano Pro"
            icon="star"
            variant="gold"
            onPress={() => (navigation.getParent() as any)?.navigate('Perfil', { screen: 'Paywall' })}
          />
        </View>
      ) : (
        <FlatList
          data={workout.exercises}
          keyExtractor={(e) => e.id}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => navigation.navigate('ExerciseDetail', { workoutId: workout.id, exerciseId: item.id })}
            >
              <Card style={styles.exerciseCard}>
                <View style={styles.exerciseThumb}>
                  <ExerciseAnimation kind={item.animation} size={64} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exerciseIndex}>Exercício {index + 1}</Text>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <View style={styles.pillRow}>
                    <Pill label={`${item.sets}x ${item.reps}`} tone="primary" />
                    <Pill label={item.muscleGroup} />
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Card>
            </Pressable>
          )}
        />
      )}
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
  list: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  exerciseCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  exerciseThumb: { borderRadius: 12, overflow: 'hidden' },
  exerciseIndex: { color: colors.textMuted, fontSize: 11, fontWeight: '700', marginBottom: 2 },
  exerciseName: { color: colors.text, fontSize: 15, fontWeight: '700', marginBottom: 6 },
  pillRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  lockedWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.sm },
  lockedTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: spacing.sm, textAlign: 'center' },
  lockedSubtitle: {
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
});
