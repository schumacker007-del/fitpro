import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, PrimaryButton, SectionTitle } from '../components/ui';
import { useUser } from '../context/UserContext';
import { getWorkoutsForGoal } from '../data/workouts';
import { colors, spacing, typography } from '../theme';

export default function HomeScreen() {
  const { profile, planTier, bmi } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const goal = profile?.goal ?? 'manter_forma';
  const suggestedWorkout = getWorkoutsForGoal(goal).find((w) => w.tier === 'free') ?? getWorkoutsForGoal(goal)[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Olá, {profile?.name ?? 'atleta'} 👋</Text>
            <Text style={styles.subGreeting}>{goalLabel(goal)}</Text>
          </View>
          <Pill label={planTier === 'pro' ? 'PRO' : 'FREE'} tone={planTier === 'pro' ? 'gold' : 'default'} />
        </View>

        <View style={styles.statsRow}>
          <StatCard label="Peso" value={profile ? `${profile.weightKg} kg` : '--'} icon="scale-outline" />
          <StatCard label="Altura" value={profile ? `${profile.heightCm} cm` : '--'} icon="resize-outline" />
          <StatCard label="Idade" value={profile ? `${profile.age} anos` : '--'} icon="calendar-outline" />
        </View>

        <Card style={styles.bmiCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionLabel}>Seu IMC estimado</Text>
            <Text style={styles.bmiValue}>{bmi ? bmi.toFixed(1) : '--'}</Text>
            <Text style={styles.bmiHint}>{bmi ? bmiHint(bmi) : 'Complete seu perfil para calcular'}</Text>
          </View>
          <Ionicons name="pulse-outline" size={32} color={colors.primary} />
        </Card>

        {suggestedWorkout ? (
          <>
            <SectionTitle title="Treino de hoje" subtitle="Baseado no seu objetivo" />
            <Card>
              <Text style={styles.workoutTitle}>{suggestedWorkout.title}</Text>
              <View style={styles.pillRow}>
                <Pill label={`${suggestedWorkout.durationMinutes} min`} />
                <Pill label={`${suggestedWorkout.exercises.length} exercícios`} />
              </View>
              <View style={{ marginTop: spacing.md }}>
                <PrimaryButton
                  label="Ver treino"
                  icon="play"
                  onPress={() =>
                    (navigation.getParent() as any)?.navigate('Treinos', {
                      screen: 'WorkoutDetail',
                      params: { workoutId: suggestedWorkout.id },
                    })
                  }
                />
              </View>
            </Card>
          </>
        ) : null}

        {planTier === 'free' ? (
          <Pressable
            onPress={() => (navigation.getParent() as any)?.navigate('Perfil', { screen: 'Paywall' })}
          >

            <Card style={styles.proBanner}>
              <Ionicons name="star" size={26} color="#0B1210" />
              <View style={{ flex: 1 }}>
                <Text style={styles.proBannerTitle}>Desbloqueie o FitPro Pro</Text>
                <Text style={styles.proBannerSubtitle}>Treinos completos, dietas detalhadas e mais.</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#0B1210" />
            </Card>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <Card style={styles.statCard}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

function goalLabel(goal: string) {
  if (goal === 'perder_peso') return 'Foco em perder peso';
  if (goal === 'ganhar_massa') return 'Foco em ganhar massa';
  return 'Foco em manter a forma';
}

function bmiHint(bmi: number) {
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 25) return 'Peso adequado';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obesidade — considere orientação profissional';
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { ...typography.h2, color: colors.text },
  subGreeting: { color: colors.textMuted, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  statCard: { flex: 1, alignItems: 'center', gap: 4, paddingVertical: spacing.md },
  statValue: { color: colors.text, fontWeight: '800', fontSize: 16 },
  statLabel: { color: colors.textMuted, fontSize: 11 },
  bmiCard: { flexDirection: 'row', alignItems: 'center' },
  sectionLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  bmiValue: { color: colors.text, fontSize: 28, fontWeight: '800', marginTop: 2 },
  bmiHint: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  workoutTitle: { color: colors.text, fontSize: 17, fontWeight: '800', marginBottom: 8 },
  pillRow: { flexDirection: 'row', gap: 6 },
  proBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.gold, borderColor: colors.gold },
  proBannerTitle: { color: '#0B1210', fontWeight: '800', fontSize: 15 },
  proBannerSubtitle: { color: '#0B1210', fontSize: 12, marginTop: 2 },
});
