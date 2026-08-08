import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useCustomWorkouts } from '../context/CustomWorkoutContext';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { useProgressPhotos } from '../context/ProgressPhotoContext';
import { useTrainingLog } from '../context/TrainingLogContext';
import { useUser } from '../context/UserContext';
import { WORKOUTS } from '../data/workouts';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { colors, spacing, typography } from '../theme';
import {
  computeAppStatistics,
  formatKg,
  formatMinutes,
} from '../utils/workoutStatistics';

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function StatisticsScreen() {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const { logs } = useTrainingLog();
  const { snapshot } = useGamification();
  const { profile } = useUser();
  const { photos } = useProgressPhotos();
  const { customWorkouts } = useCustomWorkouts();

  const stats = useMemo(
    () =>
      computeAppStatistics({
        logs,
        workouts: [...WORKOUTS, ...customWorkouts],
        gamification: snapshot,
        profile,
        photos,
      }),
    [customWorkouts, logs, photos, profile, snapshot],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation)} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('statistics.title')}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{t('statistics.section.workouts')}</Text>
        <Card style={styles.card}>
          <StatRow label={t('statistics.workouts.count')} value={String(stats.workouts.workoutCount)} />
          <View style={styles.divider} />
          <StatRow
            label={t('statistics.workouts.totalTime')}
            value={formatMinutes(stats.workouts.totalGymMinutes)}
          />
          <View style={styles.divider} />
          <StatRow
            label={t('statistics.workouts.totalWeightLifted')}
            value={formatKg(stats.workouts.totalWeightLiftedKg)}
          />
          <View style={styles.divider} />
          <StatRow label={t('statistics.workouts.totalReps')} value={String(stats.workouts.totalReps)} />
          <View style={styles.divider} />
          <StatRow
            label={t('statistics.workouts.avgSetsPerExercise')}
            value={String(stats.workouts.avgSetsPerExercise)}
          />
          <View style={styles.divider} />
          <StatRow
            label={t('statistics.workouts.avgRepsPerSet')}
            value={String(stats.workouts.avgRepsPerSet)}
          />
          <View style={styles.divider} />
          <StatRow label={t('statistics.workouts.best1Rm')} value={formatKg(stats.workouts.best1RmKg)} />
          <View style={styles.divider} />
          <StatRow
            label={t('statistics.workouts.bestExerciseVolume')}
            value={formatKg(stats.workouts.bestExerciseVolumeKg)}
          />
        </Card>

        <Text style={styles.sectionTitle}>{t('statistics.section.weight')}</Text>
        <Card style={styles.card}>
          <StatRow label={t('statistics.weight.avg')} value={formatKg(stats.weight.avgKg)} />
          <View style={styles.divider} />
          <StatRow label={t('statistics.weight.max')} value={formatKg(stats.weight.maxKg)} />
          <View style={styles.divider} />
          <StatRow label={t('statistics.weight.min')} value={formatKg(stats.weight.minKg)} />
        </Card>

        <Text style={styles.hint}>{t('statistics.hint')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 16 },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  sectionTitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  card: { padding: 0, overflow: 'hidden', marginBottom: spacing.md },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  statLabel: { flex: 1, color: colors.text, fontSize: 15, fontWeight: '500' },
  statValue: { color: '#E85D5D', fontSize: 15, fontWeight: '700' },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.md,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
