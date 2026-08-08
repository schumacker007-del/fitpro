import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressChart from '../components/ProgressChart';
import BadgesSection from '../components/BadgesSection';
import StreakCard from '../components/StreakCard';
import { Card, Pill, PrimaryButton, SectionTitle } from '../components/ui';
import LegalFooter from '../components/LegalFooter';
import { useCustomPlan } from '../context/CustomPlanContext';
import { useLanguage } from '../context/LanguageContext';
import { useMedicalRecords } from '../context/MedicalRecordContext';
import { useProgressPhotos } from '../context/ProgressPhotoContext';
import { useTrainingLog } from '../context/TrainingLogContext';
import { useUser } from '../context/UserContext';
import { usePurchases } from '../context/PurchasesContext';
import { useAppPreferences } from '../context/AppPreferencesContext';
import { useBodyMeasurements } from '../context/BodyMeasurementsContext';
import { RESPONSIBLE_PROFESSIONAL } from '../data/professional';
import {
  POWERLIFTING_ADVANCED_PROFILE_LOCKED,
  POWERLIFTING_ADVANCED_PROFILE_UNLOCKED,
} from '../data/powerlifting';
import { useStoreProductPrices } from '../hooks/useStoreProductPrices';
import { AppLocale, BCP47_LOCALE } from '../i18n/types';
import { calculateNutritionTargets } from '../utils/nutritionTargets';
import { formatInjurySummary } from '../utils/injurySelection';
import { formatWeight, formatHeight } from '../utils/units';
import { hasSeenFeaturePromo } from '../services/featurePromo';
import { ProfileStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

function formatExpiryDate(expiresAt: string, locale: AppLocale): string {
  return new Intl.DateTimeFormat(BCP47_LOCALE[locale], { dateStyle: 'medium' }).format(new Date(expiresAt));
}

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'Profile'>>();
  const { t, locale } = useLanguage();
  const { preferences } = useAppPreferences();
  const { filledCount, totalCount } = useBodyMeasurements();
  const { profile, planTier, isPowerliftingAdvancedActive, powerliftingAdvancedExpiresAt, bmi, resetProfile } =
    useUser();
  const { openManageSubscriptions: openSubscriptions } = usePurchases();
  const { powerliftingPrice } = useStoreProductPrices();
  const { logs, getSuggestion } = useTrainingLog();
  const { latestRequest } = useCustomPlan();
  const { photos } = useProgressPhotos();
  const { records } = useMedicalRecords();
  const photoCount = photos.length;
  const medicalCount = records.length;

  const openFeaturePromo = (variant: 'customPlan' | 'pro') => {
    void (async () => {
      const seen = await hasSeenFeaturePromo(variant);
      if (seen) {
        navigation.navigate(variant === 'pro' ? 'Paywall' : 'CustomPlan');
        return;
      }
      navigation.navigate('FeaturePromo', { variant });
    })();
  };

  const recentExerciseIds = Array.from(new Set(logs.map((l) => l.exerciseId))).slice(0, 3);
  const nutritionTargets = profile ? calculateNutritionTargets(profile) : null;
  const injurySummary = formatInjurySummary(profile?.injuryAreas, t, t('profile.injuriesNone'));

  return (
    <View style={styles.safe}>
      <ImageBackground
        source={require('../../assets/profile/profile-bg.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(15,17,23,0.45)', 'rgba(15,17,23,0.85)', colors.background]}
          locations={[0, 0.4, 1]}
          style={styles.overlay}
        />
        <SafeAreaView style={styles.safeInner} edges={['top']}>
          <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeaderRow}>
          <View style={{ flex: 1 }}>
            <SectionTitle title={t('profile.title')} />
          </View>
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsGearBtn}
            hitSlop={8}
            accessibilityLabel={t('settings.title')}
          >
            <Ionicons name="settings-outline" size={22} color={colors.text} />
          </Pressable>
        </View>

        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={colors.background} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{profile?.name ?? t('profile.athlete')}</Text>
            <Text style={styles.goal}>{goalLabel(profile?.goal, t)}</Text>
          </View>
          <Pill label={planTier === 'pro' ? 'PRO' : 'FREE'} tone={planTier === 'pro' ? 'gold' : 'default'} />
        </Card>

        <View style={styles.statsRow}>
          <StatBox
            label={t('profile.weight')}
            value={profile ? formatWeight(profile.weightKg, preferences.unitSystem) : '--'}
          />
          <StatBox
            label={t('profile.height')}
            value={profile ? formatHeight(profile.heightCm, preferences.unitSystem) : '--'}
          />
          <StatBox label={t('profile.age')} value={profile ? `${profile.age} ${t('common.years')}` : '--'} />
          <StatBox label={t('profile.bmi')} value={bmi ? bmi.toFixed(1) : '--'} />
        </View>

        <Card style={styles.bodyMetricsCard}>
          <Text style={styles.bodyMetricsHint}>{t('profile.bodyMetricsSubtitle')}</Text>
          <PrimaryButton
            label={t('profile.editBodyMetrics')}
            icon="create-outline"
            variant="outline"
            onPress={() => navigation.navigate('BodyMetricsSettings')}
          />
        </Card>

        <SectionTitle title={t('profile.injuriesTitle')} subtitle={t('profile.injuriesSubtitle')} />
        <Card style={styles.injuryCard}>
          <View style={styles.injuryRow}>
            <View style={styles.settingsIcon}>
              <Ionicons name="bandage-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.injuryValue}>{injurySummary}</Text>
            </View>
          </View>
          <PrimaryButton
            label={t('profile.editInjuries')}
            icon="create-outline"
            variant="outline"
            onPress={() => navigation.navigate('InjurySettings')}
          />
        </Card>

        {nutritionTargets ? (
          <>
            <SectionTitle title={t('profile.nutritionTitle')} subtitle={t('profile.nutritionSubtitle')} />
            <Card style={styles.nutritionCard}>
              <NutritionStat icon="water-outline" label={t('profile.nutrition.water')} value={`${nutritionTargets.waterLiters.toFixed(1)} L`} />
              <NutritionStat icon="fish-outline" label={t('profile.nutrition.protein')} value={`${nutritionTargets.proteinG} g`} />
              <NutritionStat icon="nutrition-outline" label={t('profile.nutrition.carbs')} value={`${nutritionTargets.carbsG} g`} />
              <NutritionStat icon="ellipse-outline" label={t('profile.nutrition.fat')} value={`${nutritionTargets.fatG} g`} />
              <Text style={styles.nutritionDisclaimer}>{t('profile.nutritionDisclaimer')}</Text>
            </Card>
          </>
        ) : null}

        <SectionTitle title={t('profile.offensiveTitle')} subtitle={t('profile.offensiveSubtitle')} />
        <StreakCard />

        <View style={{ marginTop: spacing.md }}>
          <BadgesSection />
        </View>

        <SectionTitle title={t('profile.subscription')} />
        <Card>
          <Text style={styles.planTitle}>
            {t('profile.currentPlan')}{' '}
            <Text style={{ color: planTier === 'pro' ? colors.gold : colors.text }}>
              {planTier === 'pro' ? t('profile.planPro') : t('profile.planFree')}
            </Text>
          </Text>
          <Text style={styles.planDesc}>
            {planTier === 'pro' ? t('profile.proDesc') : t('profile.freeDesc')}
            {planTier === 'pro' ? `\n${t('iap.manageSubscriptionHint')}` : ''}
          </Text>
          <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
            {planTier === 'free' ? (
              <PrimaryButton label={t('profile.subscribePro')} icon="star" variant="gold" onPress={() => openFeaturePromo('pro')} />
            ) : (
              <PrimaryButton
                label={t('profile.manageSubscription')}
                icon="settings-outline"
                variant="outline"
                onPress={openSubscriptions}
              />
            )}
          </View>
        </Card>

        <SectionTitle title={t('powerlifting.advanced.sectionTitle')} subtitle={t('powerlifting.advanced.sectionSubtitle')} />
        <Card>
          <View style={styles.addonRow}>
            <Ionicons name="trophy-outline" size={22} color="#EF4444" />
            <View style={{ flex: 1 }}>
              <Text style={styles.addonTitle}>{t('powerlifting.advanced.title')}</Text>
              <Text style={styles.addonDesc}>
                {isPowerliftingAdvancedActive
                  ? `${POWERLIFTING_ADVANCED_PROFILE_UNLOCKED} · ${t('powerlifting.advanced.expiresOn', {
                      date: formatExpiryDate(powerliftingAdvancedExpiresAt!, locale),
                    })}`
                  : powerliftingAdvancedExpiresAt
                    ? t('powerlifting.advanced.expiredOn', {
                        date: formatExpiryDate(powerliftingAdvancedExpiresAt, locale),
                      })
                    : `${POWERLIFTING_ADVANCED_PROFILE_LOCKED} · ${powerliftingPrice}`}
              </Text>
            </View>
            <Pill
              label={
                isPowerliftingAdvancedActive
                  ? t('powerlifting.advanced.statusActive')
                  : powerliftingAdvancedExpiresAt
                    ? t('powerlifting.advanced.statusExpired')
                    : t('powerlifting.advanced.statusLocked')
              }
              tone={isPowerliftingAdvancedActive ? 'primary' : 'gold'}
            />
          </View>
          {!isPowerliftingAdvancedActive ? (
            <View style={{ marginTop: spacing.md }}>
              <PrimaryButton
                label={
                  powerliftingAdvancedExpiresAt
                    ? t('powerlifting.advanced.renew')
                    : t('powerlifting.advanced.accessProgram')
                }
                icon="lock-open"
                variant="gold"
                onPress={() =>
                  (navigation.getParent() as any)?.navigate('Treinos', { screen: 'PowerliftingAdvancedPaywall' })
                }
              />
            </View>
          ) : null}
        </Card>

        <SectionTitle title={t('profile.progress')} subtitle={t('profile.progressSubtitle')} />
        <Card style={styles.settingsCard}>
          <Pressable style={styles.settingsRow} onPress={() => navigation.navigate('Settings')}>
            <View style={styles.settingsIcon}>
              <Ionicons name="settings-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>{t('settings.title')}</Text>
              <Text style={styles.settingsHint}>{t('settings.section.preferences')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
          <View style={styles.settingsDivider} />
          <Pressable style={styles.settingsRow} onPress={() => navigation.navigate('Statistics')}>
            <View style={styles.settingsIcon}>
              <Ionicons name="stats-chart-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>{t('profile.statistics')}</Text>
              <Text style={styles.settingsHint}>{t('profile.statisticsSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
          <View style={styles.settingsDivider} />
          <Pressable style={styles.settingsRow} onPress={() => navigation.navigate('BodyMeasurements')}>
            <View style={styles.settingsIcon}>
              <Ionicons name="resize-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>{t('more.menu.measurements')}</Text>
              <Text style={styles.settingsHint}>
                {filledCount}/{totalCount} {t('profile.measurementsFilled')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        </Card>

        {planTier === 'pro' ? (
          <Card>
            <ProgressChart logs={logs} />
            {recentExerciseIds.length > 0 ? (
              <View style={{ marginTop: spacing.md, gap: 8 }}>
                {recentExerciseIds.map((exerciseId) => {
                  const log = logs.find((l) => l.exerciseId === exerciseId);
                  const suggestion = getSuggestion(exerciseId);
                  if (!log || !suggestion || suggestion.suggestion === 'maintain') return null;
                  const isIncrease = suggestion.suggestion === 'increase_load';
                  return (
                    <View key={exerciseId} style={styles.suggestionRow}>
                      <Ionicons
                        name={isIncrease ? 'trending-up' : 'alert-circle'}
                        size={16}
                        color={isIncrease ? colors.primary : colors.danger}
                      />
                      <Text style={styles.suggestionRowText}>
                        <Text style={{ fontWeight: '800' }}>{log.exerciseName}: </Text>
                        {isIncrease ? t('profile.suggestionIncrease') : t('profile.suggestionRest')}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </Card>
        ) : (
          <Card style={styles.teaserCard}>
            <Ionicons name="lock-closed" size={20} color={colors.gold} />
            <Text style={styles.teaserTitle}>{t('profile.progressTeaserTitle')}</Text>
            <Text style={styles.teaserSubtitle}>{t('profile.progressTeaserSubtitle')}</Text>
            <PrimaryButton label={t('common.viewProPlan')} icon="star" variant="gold" onPress={() => openFeaturePromo('pro')} />
          </Card>
        )}

        <SectionTitle title={t('profile.customPlan')} subtitle={t('profile.customPlanSubtitle')} />
        {planTier === 'pro' ? (
          <Card>
            {latestRequest ? (
              <View style={styles.customPlanStatusRow}>
                <Ionicons name="time-outline" size={16} color={statusColor(latestRequest.status)} />
                <Text style={[styles.customPlanStatusText, { color: statusColor(latestRequest.status) }]}>
                  {statusLabel(latestRequest.status, t)}
                </Text>
              </View>
            ) : (
              <Text style={styles.planDesc}>
                {t('profile.customPlanIntro', {
                  coach: RESPONSIBLE_PROFESSIONAL.name.replace('Prof. ', ''),
                })}
              </Text>
            )}
            <View style={{ marginTop: spacing.md }}>
              <PrimaryButton
                label={latestRequest ? t('profile.customPlanRequestNew') : t('profile.customPlanRequest')}
                icon="paper-plane"
                variant="outline"
                onPress={() => openFeaturePromo('customPlan')}
              />
            </View>
          </Card>
        ) : (
          <Card style={styles.teaserCard}>
            <Ionicons name="lock-closed" size={20} color={colors.gold} />
            <Text style={styles.teaserTitle}>{t('profile.customPlanTeaserTitle')}</Text>
            <Text style={styles.teaserSubtitle}>{t('profile.customPlanTeaserSubtitle')}</Text>
            <PrimaryButton label={t('common.viewProPlan')} icon="star" variant="gold" onPress={() => openFeaturePromo('pro')} />
          </Card>
        )}

        <SectionTitle title={t('profile.healthDocs')} subtitle={t('profile.healthDocsSubtitle')} />
        {planTier === 'pro' ? (
          <Card>
            <Text style={styles.planDesc}>
              {medicalCount > 0
                ? t('common.savedCount', { count: medicalCount })
                : t('profile.healthDocsEmpty')}
            </Text>
            <View style={{ marginTop: spacing.md }}>
              <PrimaryButton
                label={medicalCount > 0 ? t('profile.healthDocsOpen') : t('profile.healthDocsAddFirst')}
                icon="document-text-outline"
                variant="outline"
                onPress={() => navigation.navigate('MedicalRecords')}
              />
            </View>
          </Card>
        ) : (
          <Card style={styles.teaserCard}>
            <Ionicons name="lock-closed" size={20} color={colors.gold} />
            <Text style={styles.teaserTitle}>{t('profile.healthDocsTeaserTitle')}</Text>
            <Text style={styles.teaserSubtitle}>{t('profile.healthDocsTeaserSubtitle')}</Text>
            <PrimaryButton label={t('common.viewProPlan')} icon="star" variant="gold" onPress={() => openFeaturePromo('pro')} />
          </Card>
        )}

        <SectionTitle title={t('profile.evolutionPhotos')} subtitle={t('profile.evolutionPhotosSubtitle')} />
        {planTier === 'pro' ? (
          <Card>
            <Text style={styles.planDesc}>
              {photoCount > 0 ? t('common.photosCount', { count: photoCount }) : t('profile.photosEmpty')}
            </Text>
            <View style={{ marginTop: spacing.md }}>
              <PrimaryButton
                label={photoCount > 0 ? t('profile.photosView') : t('profile.photosAddFirst')}
                icon="camera-outline"
                variant="outline"
                onPress={() => navigation.navigate('ProgressPhotos')}
              />
            </View>
          </Card>
        ) : (
          <Card style={styles.teaserCard}>
            <Ionicons name="lock-closed" size={20} color={colors.gold} />
            <Text style={styles.teaserTitle}>{t('profile.photosTeaserTitle')}</Text>
            <Text style={styles.teaserSubtitle}>{t('profile.photosTeaserSubtitle')}</Text>
            <PrimaryButton label={t('common.viewProPlan')} icon="star" variant="gold" onPress={() => openFeaturePromo('pro')} />
          </Card>
        )}

        <SectionTitle title={t('profile.pdfReport')} subtitle={t('profile.pdfReportSubtitle')} />
        {planTier === 'pro' ? (
          <Card>
            <Text style={styles.planDesc}>{t('profile.pdfDescription')}</Text>
            <View style={{ marginTop: spacing.md }}>
              <PrimaryButton
                label={t('profile.pdfGenerate')}
                icon="document-attach-outline"
                variant="outline"
                onPress={() => navigation.navigate('ProgressReport')}
              />
            </View>
          </Card>
        ) : (
          <Card style={styles.teaserCard}>
            <Ionicons name="lock-closed" size={20} color={colors.gold} />
            <Text style={styles.teaserTitle}>{t('profile.pdfTeaserTitle')}</Text>
            <Text style={styles.teaserSubtitle}>{t('profile.pdfTeaserSubtitle')}</Text>
            <PrimaryButton label={t('common.viewProPlan')} icon="star" variant="gold" onPress={() => openFeaturePromo('pro')} />
          </Card>
        )}

        <SectionTitle title={t('profile.professional')} />
        <Card>
          <View style={styles.proRow}>
            <View style={styles.proAvatar}>
              <Ionicons name="medal-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.proName}>{RESPONSIBLE_PROFESSIONAL.name}</Text>
              <Text style={styles.proRole}>{RESPONSIBLE_PROFESSIONAL.role}</Text>
              <Text style={styles.proCredential}>{RESPONSIBLE_PROFESSIONAL.credential}</Text>
            </View>
          </View>
          <Text style={styles.proBio}>{RESPONSIBLE_PROFESSIONAL.bio}</Text>
          <Text style={styles.disclaimer}>{RESPONSIBLE_PROFESSIONAL.disclaimer}</Text>
        </Card>

        <View style={{ marginTop: spacing.lg }}>
          <PrimaryButton
            label={t('profile.editProfile')}
            icon="create-outline"
            variant="outline"
            onPress={() =>
              Alert.alert(t('profile.resetTitle'), t('profile.resetMessage'), [
                { text: t('common.cancel'), style: 'cancel' },
                { text: t('profile.resetConfirm'), style: 'destructive', onPress: resetProfile },
              ])
            }
          />
        </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

function NutritionStat({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.nutritionRow}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.nutritionLabel}>{label}</Text>
      <Text style={styles.nutritionValue}>{value}</Text>
    </View>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <Card style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

function statusLabel(status: string, t: (key: import('../i18n/translations').TranslationKey) => string) {
  if (status === 'pendente') return t('profile.customPlanStatus.pending');
  if (status === 'em_producao') return t('profile.customPlanStatus.inProgress');
  return t('profile.customPlanStatus.delivered');
}

function statusColor(status: string) {
  if (status === 'entregue') return colors.primary;
  if (status === 'em_producao') return colors.gold;
  return colors.textMuted;
}

function goalLabel(goal: string | undefined, t: (key: import('../i18n/translations').TranslationKey) => string) {
  if (goal === 'perder_peso') return t('goal.loseWeight');
  if (goal === 'ganhar_massa') return t('goal.gainMass');
  if (goal === 'condicionamento_fisico') return t('goal.conditioning');
  if (goal === 'manter_forma') return t('goal.maintain');
  return t('goal.undefined');
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject },
  safeInner: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { color: colors.text, fontSize: 17, fontWeight: '800' },
  goal: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm },
  nutritionCard: { gap: spacing.sm },
  nutritionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  nutritionLabel: { flex: 1, color: colors.text, fontSize: 14, fontWeight: '600' },
  nutritionValue: { color: colors.primary, fontWeight: '800', fontSize: 15 },
  nutritionDisclaimer: { color: colors.textMuted, fontSize: 11, lineHeight: 16, marginTop: spacing.xs },
  statValue: { color: colors.text, fontWeight: '800', fontSize: 15 },
  statLabel: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  planTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: 6 },
  planDesc: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  addonRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  addonTitle: { color: colors.text, fontWeight: '800', fontSize: 14 },
  addonDesc: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 17 },
  customPlanStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  customPlanStatusText: { fontWeight: '700', fontSize: 13, flex: 1 },
  proRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  proAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proName: { color: colors.text, fontWeight: '800', fontSize: 14 },
  proRole: { color: colors.textMuted, fontSize: 12, marginTop: 1 },
  proCredential: { color: colors.primary, fontSize: 11, marginTop: 1, fontWeight: '700' },
  proBio: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginBottom: 8 },
  disclaimer: { color: colors.textMuted, fontSize: 11, lineHeight: 16, fontStyle: 'italic' },
  suggestionRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  suggestionRowText: { color: colors.textMuted, flex: 1, fontSize: 12, lineHeight: 17 },
  teaserCard: { alignItems: 'center', gap: 6 },
  teaserTitle: { color: colors.text, fontWeight: '800', fontSize: 14, textAlign: 'center', marginTop: 4 },
  teaserSubtitle: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: spacing.sm },
  injuryCard: { gap: spacing.md },
  bodyMetricsCard: { marginBottom: spacing.md, gap: spacing.md },
  bodyMetricsHint: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  injuryRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  injuryValue: { color: colors.text, fontSize: 14, fontWeight: '600', lineHeight: 20 },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  settingsGearBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.xs,
  },
  settingsCard: { padding: 0, overflow: 'hidden' },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  settingsDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 40 + spacing.md,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsTitle: { color: colors.text, fontWeight: '800', fontSize: 14 },
  settingsHint: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
});
