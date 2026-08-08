import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { Alert, ImageBackground, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, PrimaryButton, ProBadge, SectionTitle } from '../components/ui';
import { useCustomWorkouts } from '../context/CustomWorkoutContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { getWorkoutsForGoal, getVisibleCuratedWorkouts, groupWorkoutsByProgram } from '../data/workouts';
import { allowScreenCaptureGuard } from '../hooks/usePreventScreenCapture';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';
import { WorkoutPlan } from '../types';

export default function WorkoutsScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'WorkoutsList'>>();
  const { profile, planTier } = useUser();
  const { customWorkouts, deleteWorkout } = useCustomWorkouts();

  useFocusEffect(
    useCallback(() => {
      allowScreenCaptureGuard();
    }, []),
  );

  const visible = getVisibleCuratedWorkouts(profile?.gender);
  const baseWorkouts = visible.filter((w) => !w.programId);
  const programGroups = groupWorkoutsByProgram(visible.filter((w) => w.programId));

  const recommended = profile ? getWorkoutsForGoal(profile.goal, profile.gender) : baseWorkouts;
  const recommendedIds = new Set(recommended.map((w) => w.id));
  const otherBase = baseWorkouts.filter((w) => !recommendedIds.has(w.id));
  const baseOrdered = [...recommended.filter((w) => !w.programId), ...otherBase];

  const programSections = programGroups.map((group, index, all) => {
    const isMale = group.programId.startsWith('masc-');
    const prevIsMale = index > 0 ? all[index - 1].programId.startsWith('masc-') : false;
    return {
      programId: group.programId,
      audience: isMale ? ('masculino' as const) : ('feminino' as const),
      showAudienceBanner: index === 0 || (isMale && !prevIsMale),
      isBaseSection: false,
      title: isMale
        ? t('workouts.maleProgram', { num: group.programId.replace('masc-', '') })
        : t('workouts.femaleProgram', { num: group.programId.replace('fem-', '') }),
      data: group.items,
    };
  });

  const baseSection =
    baseOrdered.length > 0
      ? [
          {
            programId: '__base__',
            audience: undefined as undefined,
            showAudienceBanner: true,
            isBaseSection: true,
            title: '',
            data: baseOrdered,
          },
        ]
      : [];

  const listSections = [...programSections, ...baseSection];

  const renderWorkoutCard = (item: WorkoutPlan) => {
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
              <Pill label={goalLabel(item.goal, t)} tone="primary" />
              <Pill label={levelLabel(item.level, t)} />
              <Pill label={`${item.durationMinutes} ${t('common.minutes')}`} />
            </View>
            <Text style={styles.exercisesCount}>
              {item.exercises.length} {t('common.exercises')}
            </Text>
          </View>
          <Ionicons
            name={locked ? 'lock-closed' : 'chevron-forward'}
            size={20}
            color={locked ? colors.gold : colors.textMuted}
          />
        </Card>
      </Pressable>
    );
  };

  const handleBuild = () => {
    if (planTier === 'pro') {
      navigation.navigate('WorkoutBuilder', undefined);
    } else {
      (navigation.getParent() as any)?.navigate('Perfil', { screen: 'Paywall' });
    }
  };

  const handleDeleteCustom = (workout: WorkoutPlan) => {
    Alert.alert(t('workouts.deleteTitle'), t('workouts.deleteMessage', { title: workout.title }), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('workouts.deleteConfirm'), style: 'destructive', onPress: () => deleteWorkout(workout.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <SectionList
        sections={listSections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <>
            <SectionTitle
              title={t('workouts.title')}
              subtitle={
                profile
                  ? t('workouts.recommendedFor', { goal: goalLabel(profile.goal, t) })
                  : t('workouts.chooseOne')
              }
            />

            <Pressable onPress={handleBuild}>
              <Card style={styles.buildBanner}>
                <View style={styles.buildIconWrap}>
                  <Ionicons name="construct" size={24} color="#0B1210" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.buildTitle}>{t('workouts.buildTitle')}</Text>
                  <Text style={styles.buildSubtitle}>{t('workouts.buildSubtitle')}</Text>
                </View>
                {planTier === 'pro' ? (
                  <Ionicons name="chevron-forward" size={20} color="#0B1210" />
                ) : (
                  <Ionicons name="lock-closed" size={20} color="#0B1210" />
                )}
              </Card>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('MuscleGroups')}
              style={({ pressed }) => [styles.menuImageBannerWrap, pressed && styles.menuImageBannerPressed]}
            >
              <ImageBackground
                source={require('../../assets/muscle-groups/banners/ombros.png')}
                style={styles.menuImageBannerImage}
                imageStyle={styles.menuImageBannerImageInner}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={['rgba(5,10,20,0.94)', 'rgba(5,10,20,0.72)', 'rgba(5,10,20,0.2)']}
                  locations={[0, 0.45, 1]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.menuImageBannerGradient}
                >
                  <View style={[styles.menuImageBannerAccent, { backgroundColor: colors.primary }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.menuImageBannerTitle}>{t('workouts.muscleGroupsTitle')}</Text>
                    <Text style={styles.menuImageBannerSubtitle}>{t('workouts.muscleGroupsSubtitle')}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </LinearGradient>
              </ImageBackground>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('TrainingMethods')}>
              <Card style={styles.muscleGroupsBanner}>
                <Ionicons name="flash-outline" size={22} color="#F97316" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.muscleGroupsTitle}>{t('workouts.methodsTitle')}</Text>
                  <Text style={styles.muscleGroupsSubtitle}>{t('workouts.methodsSubtitle')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Card>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('Powerlifting')}
              style={({ pressed }) => [styles.powerliftingBannerWrap, pressed && styles.powerliftingBannerPressed]}
            >
              <ImageBackground
                source={require('../../assets/powerlifting/menu-banner.jpg')}
                style={styles.powerliftingBannerImage}
                imageStyle={styles.powerliftingBannerImageInner}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={['rgba(5,10,20,0.94)', 'rgba(5,10,20,0.72)', 'rgba(5,10,20,0.2)']}
                  locations={[0, 0.45, 1]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.powerliftingBannerGradient}
                >
                  <View style={styles.powerliftingAccent} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.powerliftingTitle}>Powerlifting</Text>
                    <Text style={styles.powerliftingSubtitle}>
                      Básico, intermediário e avançado — agachamento, supino e terra
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </LinearGradient>
              </ImageBackground>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('BodyBiotypes')}>
              <Card style={styles.muscleGroupsBanner}>
                <Ionicons name="body-outline" size={22} color="#60A5FA" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.muscleGroupsTitle}>{t('workouts.biotypesTitle')}</Text>
                  <Text style={styles.muscleGroupsSubtitle}>{t('workouts.biotypesSubtitle')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </Card>
            </Pressable>

            {customWorkouts.length > 0 ? (
              <>
                <View style={{ height: spacing.md }} />
                <SectionTitle title={t('workouts.myWorkouts')} subtitle={t('workouts.myWorkoutsSubtitle')} />
                {customWorkouts.map((item) => (
                  <Pressable key={item.id} onPress={() => navigation.navigate('WorkoutDetail', { workoutId: item.id })}>
                    <Card style={[styles.card, { marginBottom: spacing.sm }]}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.titleRow}>
                          <Text style={styles.workoutTitle}>{item.title}</Text>
                          <ProBadge />
                        </View>
                        <View style={styles.pillRow}>
                          <Pill label={goalLabel(item.goal, t)} tone="primary" />
                          <Pill label={levelLabel(item.level, t)} />
                        </View>
                        <Text style={styles.exercisesCount}>{item.exercises.length} {t('common.exercises')}</Text>
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
          </>
        }
        renderSectionHeader={({ section }) => (
          <>
            {section.isBaseSection && section.showAudienceBanner ? (
              <>
                <View style={{ height: spacing.md }} />
                <SectionTitle
                  title={t('workouts.readyWorkouts')}
                  subtitle={t('workouts.readyWorkoutsSubtitle')}
                />
              </>
            ) : null}
            {!section.isBaseSection && section.showAudienceBanner ? (
              <>
                <View style={{ height: spacing.md }} />
                <SectionTitle
                  title={
                    section.audience === 'masculino'
                      ? t('workouts.maleProgramsTitle')
                      : t('workouts.femaleProgramsTitle')
                  }
                  subtitle={
                    section.audience === 'masculino'
                      ? t('workouts.maleProgramsSubtitle')
                      : t('workouts.femaleProgramsSubtitle')
                  }
                />
              </>
            ) : null}
            {!section.isBaseSection ? (
              <View style={styles.programHeader}>
                <Text style={styles.programTitle}>{section.title}</Text>
                <Text style={styles.programSubtitle}>
                  {section.audience === 'masculino'
                    ? t('workouts.maleProgramDays')
                    : t('workouts.femaleProgramDays')}
                </Text>
              </View>
            ) : null}
          </>
        )}
        renderItem={({ item }) => <View style={{ marginBottom: spacing.md }}>{renderWorkoutCard(item)}</View>}
        SectionSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={null}
      />
    </SafeAreaView>
  );
}

function goalLabel(goal: string, t: (key: import('../i18n/translations').TranslationKey) => string) {
  if (goal === 'perder_peso') return t('onboarding.goal.perder_peso');
  if (goal === 'ganhar_massa') return t('onboarding.goal.ganhar_massa');
  if (goal === 'condicionamento_fisico') return t('onboarding.goal.condicionamento_fisico');
  return t('onboarding.goal.manter_forma');
}

function levelLabel(level: string, t: (key: import('../i18n/translations').TranslationKey) => string) {
  if (level === 'iniciante') return t('level.beginner');
  if (level === 'intermediario') return t('level.intermediate');
  return t('level.advanced');
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, paddingBottom: spacing.xl },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  workoutTitle: { color: colors.text, fontSize: 16, fontWeight: '700', flexShrink: 1 },
  pillRow: { flexDirection: 'row', gap: 6, marginBottom: 6, flexWrap: 'wrap' },
  exercisesCount: { color: colors.textMuted, fontSize: 12 },
  programHeader: { marginTop: spacing.md, marginBottom: spacing.sm },
  programTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  programSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  muscleGroupsBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  menuImageBannerWrap: {
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.35)',
  },
  menuImageBannerPressed: { opacity: 0.92 },
  menuImageBannerImage: {
    width: '100%',
    aspectRatio: 1024 / 349,
    justifyContent: 'center',
  },
  menuImageBannerImageInner: {
    borderRadius: radius.lg,
  },
  menuImageBannerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 96,
  },
  menuImageBannerAccent: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 2,
    marginRight: spacing.md,
  },
  menuImageBannerTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  menuImageBannerSubtitle: {
    color: 'rgba(248,250,252,0.78)',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
    maxWidth: '78%',
  },
  powerliftingBannerWrap: {
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.35)',
  },
  powerliftingBannerPressed: { opacity: 0.92 },
  powerliftingBannerImage: {
    width: '100%',
    aspectRatio: 1024 / 349,
    justifyContent: 'center',
  },
  powerliftingBannerImageInner: {
    borderRadius: radius.lg,
  },
  powerliftingBannerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 96,
  },
  powerliftingAccent: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 2,
    backgroundColor: '#EF4444',
    marginRight: spacing.md,
  },
  powerliftingTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  powerliftingSubtitle: { color: 'rgba(248,250,252,0.78)', fontSize: 12, marginTop: 4, lineHeight: 17, maxWidth: '78%' },
  buildBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buildIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11,18,16,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buildTitle: { color: '#0B1210', fontWeight: '800', fontSize: 15 },
  buildSubtitle: { color: '#0B1210', fontSize: 12, marginTop: 2, opacity: 0.85 },
  muscleGroupsTitle: { color: colors.text, fontWeight: '700', fontSize: 14 },
  muscleGroupsSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  iconBtn: { padding: 6 },
});
