import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BodyMap from '../components/BodyMap';
import { Card, SectionTitle } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import {
  MUSCLE_GROUP_BANNER_EXTRAS,
  MUSCLE_GROUP_BANNER_SECTIONS,
  MuscleGroupBanner,
} from '../data/muscleGroupMenu';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { getExercisesForMuscleGroup } from '../data/workouts';
import { WorkoutsStackParamList } from '../navigation/types';
import { MuscleGroupId } from '../types';
import { colors, radius, spacing } from '../theme';

function BannerCard({
  item,
  label,
  kicker,
  count,
  exercisesLabel,
  onPress,
}: {
  item: MuscleGroupBanner;
  label: string;
  kicker: string;
  count: number;
  exercisesLabel: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.bannerCard, pressed && styles.bannerPressed]}
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${count} ${exercisesLabel}`}
    >
      <ImageBackground
        source={item.image}
        style={[styles.bannerImage, { aspectRatio: item.aspectRatio }]}
        imageStyle={styles.bannerImageInner}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(5,10,20,0.92)', 'rgba(5,10,20,0.55)', 'transparent']}
          locations={[0, 0.45, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.bannerGradient}
        >
          <View style={styles.bannerAccent} />
          <View style={styles.bannerCopy}>
            <Text style={styles.bannerKicker}>{kicker}</Text>
            <Text style={styles.bannerTitle}>{label.toUpperCase()}</Text>
            <Text style={styles.bannerMeta}>
              {count} {exercisesLabel}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

export default function MuscleGroupsScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'MuscleGroups'>>();

  const openGroup = (muscleGroupId: MuscleGroupId) => {
    navigation.navigate('MuscleGroupDetail', { muscleGroupId });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation, 'WorkoutsList')} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('workouts.muscleGroupsTitle')}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title={t('workouts.muscleGroupsTitle')} subtitle={t('workouts.muscleGroupsSubtitle')} />

        {MUSCLE_GROUP_BANNER_SECTIONS.map((section) => (
          <View key={section.titleKey} style={styles.section}>
            <Text style={styles.sectionLabel}>{t(section.titleKey)}</Text>
            {section.items.map((item) => {
              const count = getExercisesForMuscleGroup(item.id).length;
              return (
                <BannerCard
                  key={item.id}
                  item={item}
                  label={t(item.labelKey)}
                  kicker={t('workouts.muscleBannerKicker')}
                  count={count}
                  exercisesLabel={t('common.exercises')}
                  onPress={() => openGroup(item.id)}
                />
              );
            })}
          </View>
        ))}

        {MUSCLE_GROUP_BANNER_EXTRAS.length > 0 ? (
          <View style={styles.section}>
            <Card style={styles.extraCard}>
              {MUSCLE_GROUP_BANNER_EXTRAS.map((item, index) => {
                const count = getExercisesForMuscleGroup(item.id).length;
                return (
                  <React.Fragment key={item.id}>
                    <Pressable
                      onPress={() => openGroup(item.id)}
                      style={({ pressed }) => [styles.extraRow, pressed && styles.extraRowPressed]}
                    >
                      <BodyMap highlighted={[item.id]} size={52} />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.extraTitle}>{t(item.labelKey)}</Text>
                        <Text style={styles.extraSubtitle}>
                          {count} {t('common.exercises')}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                    </Pressable>
                    {index < MUSCLE_GROUP_BANNER_EXTRAS.length - 1 ? <View style={styles.divider} /> : null}
                  </React.Fragment>
                );
              })}
            </Card>
          </View>
        ) : null}
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
  headerTitle: { color: colors.text, flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '800' },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  section: { marginBottom: spacing.md, gap: spacing.sm },
  sectionLabel: {
    color: '#8B9CB5',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 2,
    paddingHorizontal: spacing.xs,
  },
  bannerCard: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  bannerPressed: { opacity: 0.92 },
  bannerImage: {
    width: '100%',
    justifyContent: 'center',
  },
  bannerImageInner: {
    borderRadius: radius.lg,
  },
  bannerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 108,
  },
  bannerAccent: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  bannerCopy: { flex: 1, maxWidth: '58%' },
  bannerKicker: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  bannerTitle: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3,
    lineHeight: 26,
  },
  bannerMeta: {
    color: 'rgba(248,250,252,0.72)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  extraCard: { padding: 0, overflow: 'hidden' },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  extraRowPressed: { backgroundColor: colors.surfaceAlt },
  extraTitle: { color: colors.text, fontWeight: '700', fontSize: 15 },
  extraSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 52 + spacing.md,
  },
});
