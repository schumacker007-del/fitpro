import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, PrimaryButton, ProBadge, SectionTitle } from '../components/ui';
import { useCustomWorkouts } from '../context/CustomWorkoutContext';
import { useUser } from '../context/UserContext';
import { CURATED_WORKOUTS } from '../data/workouts';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';
import { WorkoutPlan } from '../types';

export default function WorkoutsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'WorkoutsList'>>();
  const { profile, planTier } = useUser();
  const { customWorkouts, deleteWorkout } = useCustomWorkouts();

  const recommended = CURATED_WORKOUTS.filter((w) => !profile || w.goal === profile.goal);
  const others = CURATED_WORKOUTS.filter((w) => profile && w.goal !== profile.goal);
  const ordered = [...recommended, ...others];

  const handleBuild = () => {
    if (planTier === 'pro') {
      navigation.navigate('WorkoutBuilder', undefined);
    } else {
      (navigation.getParent() as any)?.navigate('Perfil', { screen: 'Paywall' });
    }
  };

  const handleDeleteCustom = (workout: WorkoutPlan) => {
    Alert.alert('Excluir treino', `Excluir "${workout.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => deleteWorkout(workout.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={ordered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <SectionTitle
              title="Treinos"
              subtitle={profile ? `Recomendados para o objetivo: ${goalLabel(profile.goal)}` : 'Escolha um treino para começar'}
            />
            <Pressable onPress={() => navigation.navigate('MuscleGroups')}>
              <Card style={styles.muscleGroupsBanner}>
                <Ionicons name="body" size={22} color={colors.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.muscleGroupsTitle}>Buscar por grupo muscular</Text>
                  <Text style={styles.muscleGroupsSubtitle}>Peito, costas, pernas, bíceps e mais</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Card>
            </Pressable>

            <Pressable onPress={handleBuild}>
              <Card style={styles.buildBanner}>
                <Ionicons name="construct" size={22} color={colors.gold} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.muscleGroupsTitle}>Montar meu treino</Text>
                  <Text style={styles.muscleGroupsSubtitle}>
                    Monte com seu professor, do seu jeito — ou deixe o app sugerir um treino pra você.
                  </Text>
                </View>
                {planTier === 'pro' ? (
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                ) : (
                  <Ionicons name="lock-closed" size={18} color={colors.gold} />
                )}
              </Card>
            </Pressable>

            {customWorkouts.length > 0 ? (
              <>
                <View style={{ height: spacing.md }} />
                <SectionTitle title="Meus treinos" subtitle="Montados por você (ou com seu professor)" />
                {customWorkouts.map((item) => (
                  <Pressable key={item.id} onPress={() => navigation.navigate('WorkoutDetail', { workoutId: item.id })}>
                    <Card style={[styles.card, { marginBottom: spacing.sm }]}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.titleRow}>
                          <Text style={styles.workoutTitle}>{item.title}</Text>
                          <ProBadge />
                        </View>
                        <View style={styles.pillRow}>
                          <Pill label={goalLabel(item.goal)} tone="primary" />
                          <Pill label={levelLabel(item.level)} />
                        </View>
                        <Text style={styles.exercisesCount}>{item.exercises.length} exercícios</Text>
                      </View>
                      <Pressable
                        onPress={() => navigation.navigate('WorkoutBuilder', { workoutId: item.id })}
                        style={styles.iconBtn}
                      >
                        <Ionicons name="create-outline" size={18} color={colors.textMuted} />
                      </Pressable>
                      <Pressable onPress={() => handleDeleteCustom(item)} style={styles.iconBtn}>
                        <Ionicons name="trash-outline" size={18} color={colors.danger} />
                      </Pressable>
                    </Card>
                  </Pressable>
                ))}
              </>
            ) : null}

            <View style={{ height: spacing.md }} />
            <SectionTitle title="Treinos prontos" subtitle="Sugeridos pelo app com base no seu objetivo" />
          </>
        }
        renderItem={({ item }) => {
          const locked = item.tier === 'pro' && planTier === 'free';
          return (
            <Pressable onPress={() => navigation.navigate('WorkoutDetail', { workoutId: item.id })}>
              <Card style={styles.card}>
                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.workoutTitle}>{item.title}</Text>
                    {item.tier === 'pro' ? <ProBadge /> : null}
                  </View>
                  <View style={styles.pillRow}>
                    <Pill label={goalLabel(item.goal)} tone="primary" />
                    <Pill label={levelLabel(item.level)} />
                    <Pill label={`${item.durationMinutes} min`} />
                  </View>
                  <Text style={styles.exercisesCount}>{item.exercises.length} exercícios</Text>
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

function goalLabel(goal: string) {
  if (goal === 'perder_peso') return 'Perder peso';
  if (goal === 'ganhar_massa') return 'Ganhar massa';
  return 'Manter forma';
}

function levelLabel(level: string) {
  if (level === 'iniciante') return 'Iniciante';
  if (level === 'intermediario') return 'Intermediário';
  return 'Avançado';
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, paddingBottom: spacing.xl },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  workoutTitle: { color: colors.text, fontSize: 16, fontWeight: '700', flexShrink: 1 },
  pillRow: { flexDirection: 'row', gap: 6, marginBottom: 6, flexWrap: 'wrap' },
  exercisesCount: { color: colors.textMuted, fontSize: 12 },
  muscleGroupsBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  buildBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderColor: colors.gold,
  },
  muscleGroupsTitle: { color: colors.text, fontWeight: '700', fontSize: 14 },
  muscleGroupsSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  iconBtn: { padding: 6 },
});
