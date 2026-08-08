import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import StreakCard from '../components/StreakCard';
import { Card, Pill, PrimaryButton, SectionTitle } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { getFeaturedTrainingVideo } from '../data/trainingVideoFeed';
import { getWorkoutsForGoal } from '../data/workouts';
import { HomeStackParamList } from '../navigation/types';
import { useRootNavigation } from '../navigation/useRootNavigation';
import { colors, spacing, typography } from '../theme';

export default function HomeScreen() {
  const { t } = useLanguage();
  const { profile, planTier, bmi } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>>();
  const rootNavigation = useRootNavigation();
  const featuredVideo = getFeaturedTrainingVideo();
  const insets = useSafeAreaInsets();

  const goal = profile?.goal ?? 'manter_forma';
  const suggestedWorkout = getWorkoutsForGoal(goal, profile?.gender)[0];

  return (
    <View style={styles.safe}>
      <ImageBackground
        source={require('../../assets/home/home-hero-bg.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(15,17,23,0.35)', 'rgba(15,17,23,0.82)', colors.background]}
          locations={[0, 0.45, 1]}
          style={styles.overlay}
        />
        <SafeAreaView style={styles.safeInner} edges={['top']}>
          <ScrollView contentContainerStyle={[styles.content, { paddingBottom: spacing.xl + insets.bottom }]} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>{t('home.greeting', { name: profile?.name ?? t('profile.athlete').toLowerCase() })}</Text>
            <Text style={styles.subGreeting}>{goalLabel(goal, t)}</Text>
          </View>
          <Pill label={planTier === 'pro' ? 'PRO' : 'FREE'} tone={planTier === 'pro' ? 'gold' : 'default'} />
        </View>

        <Pressable onPress={() => rootNavigation.navigate('GlobalSearch')} style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <Text style={styles.searchPlaceholder}>{t('search.placeholder')}</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('AboutPromo')}>
          <GlassCard style={styles.promoBanner}>
            <View style={styles.promoIcon}>
              <Ionicons name="sparkles" size={22} color={colors.gold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.promoTitle}>{t('home.aboutTitle')}</Text>
              <Text style={styles.promoSubtitle}>{t('home.aboutSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </GlassCard>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('TrainingVideos')}>
          <GlassCard style={styles.videoBanner}>
            <View style={styles.videoIcon}>
              <Ionicons name="play-circle" size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.videoTitle}>{t('home.videosTitle')}</Text>
              <Text style={styles.videoSubtitle}>
                {featuredVideo
                  ? t('home.videosNew', { title: featuredVideo.title })
                  : t('home.videosSubtitle')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </GlassCard>
        </Pressable>

        <SectionTitle title={t('home.streakTitle')} subtitle={t('home.streakSubtitle')} />
        <StreakCard />

        <View style={styles.statsRow}>
          <StatCard label={t('profile.weight')} value={profile ? `${profile.weightKg} kg` : '--'} icon="scale-outline" />
          <StatCard label={t('profile.height')} value={profile ? `${profile.heightCm} cm` : '--'} icon="resize-outline" />
          <StatCard label={t('profile.age')} value={profile ? `${profile.age} ${t('common.years')}` : '--'} icon="calendar-outline" />
        </View>

        <GlassCard style={styles.bmiCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionLabel}>{t('home.bmiTitle')}</Text>
            <Text style={styles.bmiValue}>{bmi ? bmi.toFixed(1) : '--'}</Text>
            <Text style={styles.bmiHint}>{bmi ? bmiHint(bmi, t) : t('home.bmiCompleteProfile')}</Text>
          </View>
          <Ionicons name="pulse-outline" size={32} color={colors.primary} />
        </GlassCard>

        {suggestedWorkout ? (
          <>
            <SectionTitle title={t('home.todayWorkout')} subtitle={t('home.workoutBasedOnGoal')} />
            <GlassCard>
              <Text style={styles.workoutTitle}>{suggestedWorkout.title}</Text>
              <View style={styles.pillRow}>
                <Pill label={`${suggestedWorkout.durationMinutes} ${t('common.minutes')}`} />
                <Pill label={`${suggestedWorkout.exercises.length} ${t('home.exercises')}`} />
              </View>
              <View style={{ marginTop: spacing.md }}>
                <PrimaryButton
                  label={t('home.viewWorkout')}
                  icon="play"
                  onPress={() =>
                    (navigation.getParent() as any)?.navigate('Treinos', {
                      screen: 'WorkoutDetail',
                      params: { workoutId: suggestedWorkout.id },
                    })
                  }
                />
              </View>
            </GlassCard>
          </>
        ) : null}

        {planTier === 'free' ? (
          <Pressable onPress={() => (navigation.getParent() as any)?.navigate('Perfil', { screen: 'Paywall' })}>
            <Card style={styles.proBanner}>
              <Ionicons name="star" size={26} color="#0B1210" />
              <View style={{ flex: 1 }}>
                <Text style={styles.proBannerTitle}>{t('home.unlockPro')}</Text>
                <Text style={styles.proBannerSubtitle}>{t('home.unlockProDesc')}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#0B1210" />
            </Card>
          </Pressable>
        ) : null}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <GlassCard style={styles.statCard}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </GlassCard>
  );
}

function goalLabel(goal: string, t: (key: import('../i18n/translations').TranslationKey) => string) {
  if (goal === 'perder_peso') return t('goal.loseWeight');
  if (goal === 'ganhar_massa') return t('goal.gainMass');
  if (goal === 'condicionamento_fisico') return t('goal.conditioning');
  return t('goal.maintain');
}

function bmiHint(bmi: number, t: (key: import('../i18n/translations').TranslationKey) => string) {
  if (bmi < 18.5) return t('home.bmi.underweight');
  if (bmi < 25) return t('home.bmi.healthy');
  if (bmi < 30) return t('home.bmi.overweight');
  return t('home.bmi.obese');
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject },
  safeInner: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchPlaceholder: { color: colors.textMuted, fontSize: 15, flex: 1 },
  greeting: { ...typography.h2, color: colors.primary },
  subGreeting: { color: colors.textMuted, marginTop: 2 },
  promoBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  promoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  promoSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 17 },
  videoBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  videoIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  videoSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 17 },
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
