import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseAnimation from '../components/ExerciseAnimation';
import { Card, Pill, PrimaryButton, ProBadge } from '../components/ui';
import { useCustomWorkouts } from '../context/CustomWorkoutContext';
import { useUser } from '../context/UserContext';
import { getMuscleGroup } from '../data/muscleGroups';
import { RESPONSIBLE_PROFESSIONAL } from '../data/professional';
import { WORKOUTS } from '../data/workouts';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export default function WorkoutDetailScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'WorkoutDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'WorkoutDetail'>>();
  const { planTier } = useUser();
  const { getCustomWorkout } = useCustomWorkouts();
  const workout = WORKOUTS.find((w) => w.id === route.params.workoutId) ?? getCustomWorkout(route.params.workoutId);

  if (!workout) return null;

  const isLocked = workout.tier === 'pro' && planTier === 'free';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]} numberOfLines={1}>
          {workout.title}
        </Text>
        {workout.custom ? (
          <Pressable onPress={() => navigation.navigate('WorkoutBuilder', { workoutId: workout.id })} style={styles.backBtn}>
            <Ionicons name="create-outline" size={20} color={colors.text} />
          </Pressable>
        ) : (
          <View style={{ width: 22 }} />
        )}
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
          ListHeaderComponent={
            <View style={{ marginBottom: spacing.md }}>
              <Pressable
                onPress={() =>
                  planTier === 'pro'
                    ? navigation.navigate('ActiveWorkout', { workoutId: workout.id })
                    : (navigation.getParent() as any)?.navigate('Perfil', { screen: 'Paywall' })
                }
              >
                <Card style={styles.startCard}>
                  <View style={styles.startIconWrap}>
                    <Ionicons name={planTier === 'pro' ? 'play' : 'lock-closed'} size={20} color="#0B1210" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.startTitle}>
                      {planTier === 'pro' ? 'Iniciar treino guiado' : 'Modo Treino Ativo (Pro)'}
                    </Text>
                    <Text style={styles.startSubtitle}>
                      Timer de descanso, esforço (RPE) e progressão de carga automática.
                    </Text>
                  </View>
                </Card>
              </Pressable>

              <View style={styles.credentialRow}>
                <Ionicons name="ribbon-outline" size={14} color={colors.primary} />
                <Text style={styles.credentialText}>
                  Ficha revisada por {RESPONSIBLE_PROFESSIONAL.name} · {RESPONSIBLE_PROFESSIONAL.credential}
                </Text>
              </View>
            </View>
          }
          renderItem={({ item, index }) => {
            const itemLocked = item.tier === 'pro' && planTier === 'free';
            return (
              <Pressable
                onPress={() =>
                  itemLocked
                    ? (navigation.getParent() as any)?.navigate('Perfil', { screen: 'Paywall' })
                    : navigation.navigate('ExerciseDetail', { workoutId: workout.id, exerciseId: item.id })
                }
              >
                <Card style={styles.exerciseCard}>
                  <View style={styles.exerciseThumb}>
                    <ExerciseAnimation
                      kind={item.animation}
                      size={64}
                      highlightColor={getMuscleGroup(item.primaryMuscles[0]).color}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.exerciseIndex}>Exercício {index + 1}</Text>
                    <View style={styles.titleRow}>
                      <Text style={styles.exerciseName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      {item.tier === 'pro' ? <ProBadge /> : null}
                    </View>
                    <View style={styles.pillRow}>
                      <Pill label={`${item.sets}x ${item.reps}`} tone="primary" />
                      <Pill label={item.muscleGroup} />
                    </View>
                  </View>
                  <Ionicons
                    name={itemLocked ? 'lock-closed' : 'chevron-forward'}
                    size={18}
                    color={itemLocked ? colors.gold : colors.textMuted}
                  />
                </Card>
              </Pressable>
            );
          }}
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
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  exerciseName: { color: colors.text, fontSize: 15, fontWeight: '700', flexShrink: 1 },
  pillRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  lockedWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.sm },
  lockedTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: spacing.sm, textAlign: 'center' },
  lockedSubtitle: {
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  startCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.gold, borderColor: colors.gold },
  startIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(11,18,16,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startTitle: { color: '#0B1210', fontWeight: '800', fontSize: 14 },
  startSubtitle: { color: '#0B1210', fontSize: 11, marginTop: 2, opacity: 0.85 },
  credentialRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.sm, paddingHorizontal: 2 },
  credentialText: { color: colors.textMuted, fontSize: 11, flex: 1 },
});
