import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, ProBadge, SectionTitle } from '../components/ui';
import { useUser } from '../context/UserContext';
import { WORKOUTS } from '../data/workouts';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

export default function WorkoutsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'WorkoutsList'>>();
  const { profile, planTier } = useUser();

  const recommended = WORKOUTS.filter((w) => !profile || w.goal === profile.goal);
  const others = WORKOUTS.filter((w) => profile && w.goal !== profile.goal);
  const ordered = [...recommended, ...others];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={ordered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <SectionTitle
            title="Treinos"
            subtitle={profile ? `Recomendados para o objetivo: ${goalLabel(profile.goal)}` : 'Escolha um treino para começar'}
          />
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
});
