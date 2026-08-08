import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import {
  getPowerliftingLevel,
  getPowerliftingWorkoutsForWeek,
  isPowerliftingAdvancedLocked,
  POWERLIFTING_WORKOUT_SCHEDULE,
} from '../data/powerlifting';
import { PreventScreenCapture, allowScreenCaptureGuard } from '../hooks/usePreventScreenCapture';
import { navigateBackOrFallback } from '../navigation/navigateFromSearch';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

function LoadingFallback() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.loadingWrap}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    </SafeAreaView>
  );
}

export default function PowerliftingWeekScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'PowerliftingWeek'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'PowerliftingWeek'>>();
  const { isPowerliftingAdvancedActive } = useUser();
  const { levelId, week } = route.params;
  const level = getPowerliftingLevel(levelId);
  const workouts = getPowerliftingWorkoutsForWeek(levelId, week);
  const locked = isPowerliftingAdvancedLocked(levelId, isPowerliftingAdvancedActive);

  const blockCapture = levelId === 'avancado' && isPowerliftingAdvancedActive;

  useFocusEffect(
    useCallback(() => {
      if (!blockCapture) {
        allowScreenCaptureGuard();
      }
    }, [blockCapture]),
  );

  useEffect(() => {
    if (locked) {
      navigation.replace('PowerliftingAdvancedPaywall');
    }
  }, [locked, navigation]);

  if (locked) return <LoadingFallback />;
  if (!level) return <LoadingFallback />;

  const totalMinutes = workouts.reduce((sum, w) => sum + w.durationMinutes, 0);

  return (
    <>
      <PreventScreenCapture active={blockCapture} />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            onPress={() =>
              navigateBackOrFallback(navigation, 'PowerliftingLevel', { levelId: route.params.levelId })
            }
            style={styles.backBtn}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Semana {week}
          </Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={workouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Card style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: `${level.color}22` }]}>
              <Ionicons name="calendar-outline" size={24} color={level.color} />
            </View>
            <Text style={styles.summaryTitle}>Semana {week}</Text>
            <Text style={styles.summaryText}>
              {workouts.length} {workouts.length === 1 ? 'treino' : 'treinos'} · ~{totalMinutes} min no total
            </Text>
          </Card>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('WorkoutDetail', { workoutId: item.id })}>
            <Card style={styles.workoutCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.workoutTitle}>{item.title.replace(/^Semana \d+ · /, '')}</Text>
                {POWERLIFTING_WORKOUT_SCHEDULE[item.id] ? (
                  <Text style={styles.workoutSchedule}>{POWERLIFTING_WORKOUT_SCHEDULE[item.id]}</Text>
                ) : null}
                <View style={styles.pillRow}>
                  <Pill label={`${item.durationMinutes} min`} />
                  <Pill label={`${item.exercises.length} exercícios`} tone="primary" />
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Card>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>{t('powerlifting.weekEmpty')}</Text>
          </View>
        }
      />
    </SafeAreaView>
    </>
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
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 15 },
  list: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl, flexGrow: 1 },
  summaryCard: { marginBottom: spacing.md, alignItems: 'center' },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  summaryTitle: { color: colors.text, fontWeight: '800', fontSize: 18, marginBottom: 4 },
  summaryText: { color: colors.textMuted, fontSize: 13, textAlign: 'center' },
  workoutCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  workoutTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: 4 },
  workoutSchedule: { color: colors.primary, fontSize: 12, fontWeight: '700', marginBottom: 8 },
  pillRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyWrap: { paddingVertical: spacing.xl, alignItems: 'center' },
  emptyText: { color: colors.textMuted, fontSize: 13, textAlign: 'center' },
});
