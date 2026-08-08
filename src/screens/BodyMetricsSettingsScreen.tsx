import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MetricSlider from '../components/MetricSlider';
import UnitOptionPicker from '../components/UnitOptionPicker';
import WaterIntakeCard from '../components/WaterIntakeCard';
import { Card, PrimaryButton } from '../components/ui';
import { useAppPreferences } from '../context/AppPreferencesContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useHealthIntegration } from '../context/HealthIntegrationContext';
import { ProfileStackParamList } from '../navigation/types';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { colors, spacing } from '../theme';
import { Gender } from '../types';
import { calculateNutritionTargets, calculateWaterLiters } from '../utils/nutritionTargets';
import { cmToIn, inToCm, kgToLb, lbToKg } from '../utils/units';

export default function BodyMetricsSettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'BodyMetricsSettings'>>();
  const { t } = useLanguage();
  const { preferences, setUnitSystem } = useAppPreferences();
  const { profile, saveProfile, bmi } = useUser();
  const { syncProfileBodyMetrics } = useHealthIntegration();
  const [weightKg, setWeightKg] = useState(profile?.weightKg ?? 70);
  const [heightCm, setHeightCm] = useState(profile?.heightCm ?? 170);
  const [age, setAge] = useState(profile?.age ?? 25);
  const [gender, setGender] = useState<Gender>(profile?.gender ?? 'outro');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setWeightKg(profile.weightKg);
    setHeightCm(profile.heightCm);
    setAge(profile.age);
    setGender(profile.gender);
  }, [profile]);

  const previewProfile = useMemo(() => {
    if (!profile) return null;
    return { ...profile, weightKg, heightCm, age, gender };
  }, [profile, weightKg, heightCm, age, gender]);

  const previewBmi = useMemo(() => {
    const heightM = heightCm / 100;
    if (heightM <= 0) return null;
    return weightKg / (heightM * heightM);
  }, [weightKg, heightCm]);

  const waterLiters = calculateWaterLiters(weightKg, profile?.activityLevel ?? 'moderado');
  const nutritionPreview = previewProfile ? calculateNutritionTargets(previewProfile) : null;

  const handleSave = async () => {
    if (!profile) return;
    if (weightKg < 30 || weightKg > 200) {
      Alert.alert(t('bodyMetrics.title'), t('onboarding.error.weight'));
      return;
    }
    if (heightCm < 100 || heightCm > 220) {
      Alert.alert(t('bodyMetrics.title'), t('onboarding.error.height'));
      return;
    }
    if (age <= 0 || age > 120) {
      Alert.alert(t('bodyMetrics.title'), t('onboarding.error.age'));
      return;
    }

    setSaving(true);
    try {
      await saveProfile({ ...profile, weightKg, heightCm, age, gender });
      await syncProfileBodyMetrics(weightKg, heightCm);
      Alert.alert(t('bodyMetrics.title'), t('bodyMetrics.saved'));
      navigation.goBack();
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return null;

  const isImperial = preferences.unitSystem === 'imperial';
  const weightLb = Math.round(kgToLb(weightKg));
  const heightIn = Math.round(cmToIn(heightCm));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation)} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('bodyMetrics.title')}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('bodyMetrics.subtitle')}</Text>

        <UnitOptionPicker
          title={t('onboarding.genderTitle')}
          subtitle={t('onboarding.genderSubtitle')}
          options={[
            { id: 'feminino', label: t('onboarding.gender.feminino') },
            { id: 'masculino', label: t('onboarding.gender.masculino') },
          ]}
          value={gender === 'masculino' ? 'masculino' : 'feminino'}
          onChange={(id) => setGender(id === 'masculino' ? 'masculino' : 'feminino')}
        />

        <UnitOptionPicker
          title={t('bodyMetrics.weightUnitTitle')}
          subtitle={t('bodyMetrics.weightUnitSubtitle')}
          options={[
            { id: 'metric', label: t('bodyMetrics.unitKg') },
            { id: 'imperial', label: t('bodyMetrics.unitLb') },
          ]}
          value={preferences.unitSystem}
          onChange={(id) => void setUnitSystem(id === 'imperial' ? 'imperial' : 'metric')}
        />

        <Text style={styles.fieldLabel}>{t('bodyMetrics.weightLabel')}</Text>
        {isImperial ? (
          <MetricSlider
            min={66}
            max={441}
            step={1}
            value={weightLb}
            onChange={(lb) => setWeightKg(lbToKg(lb))}
            unit={t('bodyMetrics.unitLb')}
            formatValue={(v) => String(Math.round(v))}
          />
        ) : (
          <MetricSlider
            min={30}
            max={200}
            step={0.5}
            value={weightKg}
            onChange={setWeightKg}
            unit={t('bodyMetrics.unitKg')}
            formatValue={(v) => v.toFixed(1)}
          />
        )}

        <Text style={[styles.fieldLabel, { marginTop: spacing.lg }]}>{t('bodyMetrics.heightLabel')}</Text>
        {isImperial ? (
          <MetricSlider
            min={39}
            max={87}
            step={1}
            value={heightIn}
            onChange={(inches) => setHeightCm(inToCm(inches))}
            unit={t('bodyMetrics.unitIn')}
            formatValue={(v) => String(Math.round(v))}
          />
        ) : (
          <MetricSlider
            min={100}
            max={220}
            step={1}
            value={heightCm}
            onChange={setHeightCm}
            unit={t('bodyMetrics.unitCm')}
          />
        )}

        <Text style={[styles.fieldLabel, { marginTop: spacing.lg }]}>{t('bodyMetrics.ageLabel')}</Text>
        <MetricSlider
          min={10}
          max={120}
          step={1}
          value={age}
          onChange={setAge}
          unit={t('common.years')}
          formatValue={(v) => String(Math.round(v))}
        />

        <Card style={styles.previewCard}>
          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>{t('profile.bmi')}</Text>
            <Text style={styles.previewValue}>{(previewBmi ?? bmi)?.toFixed(1) ?? '--'}</Text>
          </View>
          {nutritionPreview ? (
            <>
              <View style={styles.previewDivider} />
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>{t('profile.nutrition.water')}</Text>
                <Text style={styles.previewValue}>{nutritionPreview.waterLiters.toFixed(1)} L</Text>
              </View>
              <View style={styles.previewRow}>
                <Text style={styles.previewLabel}>{t('profile.nutrition.protein')}</Text>
                <Text style={styles.previewValue}>{nutritionPreview.proteinG} g</Text>
              </View>
            </>
          ) : null}
        </Card>

        <WaterIntakeCard liters={waterLiters} weightKg={weightKg} compact />

        <PrimaryButton label={t('injurySettings.save')} onPress={handleSave} disabled={saving} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: spacing.lg },
  fieldLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  previewCard: { marginTop: spacing.lg, marginBottom: spacing.md, gap: spacing.sm },
  previewRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  previewLabel: { color: colors.textMuted, fontSize: 14, fontWeight: '600' },
  previewValue: { color: colors.primary, fontSize: 16, fontWeight: '800' },
  previewDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
});
