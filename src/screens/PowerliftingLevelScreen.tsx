import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, SectionTitle } from '../components/ui';
import {
  getPowerliftingLevel,
  getPowerliftingWeekGroups,
  getPowerliftingWorkouts,
  isPowerliftingAdvancedLocked,
  PowerliftingWeekGroup,
  POWERLIFTING_WORKOUT_SCHEDULE,
  POWERLIFTING_WORKOUT_WEEK,
} from '../data/powerlifting';
import { PreventScreenCapture, allowScreenCaptureGuard } from '../hooks/usePreventScreenCapture';
import { navigateBackOrFallback } from '../navigation/navigateFromSearch';
import { WorkoutsStackParamList } from '../navigation/types';
import { useUser } from '../context/UserContext';
import { WorkoutPlan } from '../types';
import { colors, radius, spacing, typography } from '../theme';

function IntroCard({ level }: { level: NonNullable<ReturnType<typeof getPowerliftingLevel>> }) {
  return (
    <Card style={styles.introCard}>
      <View style={[styles.introIcon, { backgroundColor: `${level.color}22` }]}>
        <Ionicons name={level.icon as keyof typeof Ionicons.glyphMap} size={28} color={level.color} />
      </View>
      <Text style={styles.introSubtitle}>{level.subtitle}</Text>
      <Text style={styles.introText}>{level.description}</Text>
      {level.schedule ? <Text style={styles.introSchedule}>{level.schedule}</Text> : null}
      {level.restNotes ? <Text style={styles.introRest}>{level.restNotes}</Text> : null}
      <Text style={styles.introFocus}>{level.focus}</Text>
      {level.tips && level.tips.length > 0 ? (
        <View style={styles.tipsWrap}>
          <Text style={styles.tipsTitle}>Dicas importantes</Text>
          {level.tips.map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Card>
  );
}

function WorkoutDayCard({
  item,
  onPress,
}: {
  item: WorkoutPlan;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.workoutCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.workoutTitle}>{item.title}</Text>
          {POWERLIFTING_WORKOUT_SCHEDULE[item.id] ? (
            <Text style={styles.workoutSchedule}>{POWERLIFTING_WORKOUT_SCHEDULE[item.id]}</Text>
          ) : null}
          {POWERLIFTING_WORKOUT_WEEK[item.id] ? (
            <Pill label={`Semana ${POWERLIFTING_WORKOUT_WEEK[item.id]}`} tone="gold" />
          ) : null}
          <View style={styles.pillRow}>
            <Pill label={`${item.durationMinutes} min`} />
            <Pill label={`${item.exercises.length} exercícios`} tone="primary" />
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </Card>
    </Pressable>
  );
}

function WeekCard({
  group,
  color,
  onPress,
}: {
  group: PowerliftingWeekGroup;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.weekCard}>
        <View style={[styles.weekBadge, { backgroundColor: `${color}22` }]}>
          <Text style={[styles.weekNumber, { color }]}>{group.week}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.weekTitle}>Semana {group.week}</Text>
          <Text style={styles.weekMeta}>
            {group.workoutCount} {group.workoutCount === 1 ? 'treino' : 'treinos'} · ~{group.totalMinutes} min
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </Card>
    </Pressable>
  );
}

function LoadingFallback() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.loadingWrap}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    </SafeAreaView>
  );
}

export default function PowerliftingLevelScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'PowerliftingLevel'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'PowerliftingLevel'>>();
  const { isPowerliftingAdvancedActive } = useUser();
  const level = getPowerliftingLevel(route.params.levelId);
  const isAdvanced = route.params.levelId === 'avancado';
  const workouts = getPowerliftingWorkouts(route.params.levelId);
  const weekGroups = getPowerliftingWeekGroups(route.params.levelId);

  const blockCapture = isAdvanced && isPowerliftingAdvancedActive;

  useFocusEffect(
    useCallback(() => {
      if (!blockCapture) {
        allowScreenCaptureGuard();
      }
    }, [blockCapture]),
  );

  useEffect(() => {
    if (isPowerliftingAdvancedLocked(route.params.levelId, isPowerliftingAdvancedActive)) {
      navigation.replace('PowerliftingAdvancedPaywall');
    }
  }, [navigation, isPowerliftingAdvancedActive, route.params.levelId]);

  if (!level) return <LoadingFallback />;
  if (isPowerliftingAdvancedLocked(route.params.levelId, isPowerliftingAdvancedActive)) return <LoadingFallback />;

  return (
    <>
      <PreventScreenCapture active={blockCapture} />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigateBackOrFallback(navigation, 'Powerlifting')}
            style={styles.backBtn}
            hitSlop={8}
          >
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Powerlifting — {level.title}
          </Text>
        <View style={{ width: 36 }} />
      </View>

      {isAdvanced ? (
        <FlatList
          style={{ flex: 1 }}
          data={weekGroups}
          keyExtractor={(item) => `week-${item.week}`}
          contentContainerStyle={styles.list}
          ListHeaderComponent={<IntroCard level={level} />}
          renderItem={({ item }) => (
            <WeekCard
              group={item}
              color={level.color}
              onPress={() =>
                navigation.navigate('PowerliftingWeek', { levelId: route.params.levelId, week: item.week })
              }
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={workouts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={<IntroCard level={level} />}
          renderItem={({ item }) => (
            <WorkoutDayCard
              item={item}
              onPress={() => navigation.navigate('WorkoutDetail', { workoutId: item.id })}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          ListEmptyComponent={
            workouts.length === 0 ? (
              <View style={styles.emptyWrap}>
                <SectionTitle title="Treinos deste nível" subtitle="Os programas serão adicionados em breve" />
                <Card style={styles.emptyCard}>
                  <Ionicons name="barbell-outline" size={40} color={colors.textMuted} />
                  <Text style={styles.emptyTitle}>Aguardando programas</Text>
                  <Text style={styles.emptyText}>
                    Os treinos de powerlifting {level.title.toLowerCase()} serão cadastrados aqui.
                  </Text>
                </Card>
              </View>
            ) : null
          }
        />
      )}
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
  introCard: { marginBottom: spacing.md, alignItems: 'center' },
  introIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  introSubtitle: { color: colors.primary, fontWeight: '800', fontSize: 13, marginBottom: 6 },
  introText: { color: colors.textMuted, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  introSchedule: { color: colors.text, fontSize: 12, fontWeight: '700', marginTop: spacing.sm, textAlign: 'center' },
  introRest: { color: colors.textMuted, fontSize: 11, marginTop: 4, textAlign: 'center' },
  introFocus: { color: colors.primary, fontSize: 12, fontWeight: '600', marginTop: spacing.sm, textAlign: 'center' },
  tipsWrap: { marginTop: spacing.md, alignSelf: 'stretch', gap: 8 },
  tipsTitle: { color: colors.text, fontSize: 13, fontWeight: '800', textAlign: 'left' },
  tipRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  tipBullet: { color: colors.primary, fontWeight: '800', fontSize: 14, lineHeight: 20 },
  tipText: { flex: 1, color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  weekCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  weekBadge: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekNumber: { fontWeight: '900', fontSize: 20 },
  weekTitle: { color: colors.text, fontWeight: '800', fontSize: 16, marginBottom: 4 },
  weekMeta: { color: colors.textMuted, fontSize: 12 },
  workoutCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  workoutTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: 4 },
  workoutSchedule: { color: colors.primary, fontSize: 12, fontWeight: '700', marginBottom: 8 },
  pillRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  emptyWrap: { marginTop: spacing.sm },
  emptyCard: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  emptyTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  emptyText: { color: colors.textMuted, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
