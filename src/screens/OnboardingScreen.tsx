import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../components/ui';
import WaterIntakeCard from '../components/WaterIntakeCard';
import MetricSlider from '../components/MetricSlider';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { TranslationKey } from '../i18n/translations';
import { colors, radius, spacing, typography } from '../theme';
import { INJURY_ONBOARDING_OPTIONS } from '../data/injuryOptions';
import { toggleInjurySelection } from '../utils/injurySelection';
import { calculateWaterLiters } from '../utils/nutritionTargets';
import { ActivityLevel, FitnessLevel, Gender, Goal, InjuryArea, TrainingMotivation } from '../types';

type Step = 'dados' | 'peso' | 'altura' | 'genero' | 'frequencia' | 'nivel' | 'lesoes' | 'motivacao' | 'objetivo';

const ONBOARDING_STEPS: Step[] = ['dados', 'peso', 'altura', 'genero', 'frequencia', 'nivel', 'lesoes', 'motivacao', 'objetivo'];

export default function OnboardingScreen() {
  const { t } = useLanguage();
  const { saveProfile } = useUser();
  const { session } = useAuth();

  const goals = useMemo(
    () =>
      [
        { id: 'perder_peso' as Goal, labelKey: 'onboarding.goal.perder_peso' as TranslationKey, icon: 'flame-outline' as const },
        { id: 'ganhar_massa' as Goal, labelKey: 'onboarding.goal.ganhar_massa' as TranslationKey, icon: 'barbell-outline' as const },
        { id: 'manter_forma' as Goal, labelKey: 'onboarding.goal.manter_forma' as TranslationKey, icon: 'fitness-outline' as const },
        { id: 'condicionamento_fisico' as Goal, labelKey: 'onboarding.goal.condicionamento_fisico' as TranslationKey, icon: 'pulse-outline' as const },
      ],
    []
  );

  const genderOptions = useMemo(
    () =>
      [
        {
          id: 'feminino' as Gender,
          labelKey: 'onboarding.gender.feminino' as TranslationKey,
          image: require('../../assets/onboarding/gender/feminino.jpg'),
        },
        {
          id: 'masculino' as Gender,
          labelKey: 'onboarding.gender.masculino' as TranslationKey,
          image: require('../../assets/onboarding/gender/masculino.jpg'),
        },
      ],
    []
  );

  const activityLevels = useMemo(
    () =>
      [
        { id: 'sedentario' as ActivityLevel, labelKey: 'onboarding.activity.sedentario' as TranslationKey, icon: 'bed-outline' as const },
        { id: 'moderado' as ActivityLevel, labelKey: 'onboarding.activity.moderado' as TranslationKey, icon: 'walk-outline' as const },
        { id: 'ativo' as ActivityLevel, labelKey: 'onboarding.activity.ativo' as TranslationKey, icon: 'fitness-outline' as const },
      ],
    []
  );

  const fitnessLevels = useMemo(
    () =>
      [
        {
          id: 'iniciante' as FitnessLevel,
          titleKey: 'onboarding.fitness.iniciante.title' as TranslationKey,
          descKey: 'onboarding.fitness.iniciante.desc' as TranslationKey,
        },
        {
          id: 'intermediario' as FitnessLevel,
          titleKey: 'onboarding.fitness.intermediario.title' as TranslationKey,
          descKey: 'onboarding.fitness.intermediario.desc' as TranslationKey,
        },
        {
          id: 'avancado' as FitnessLevel,
          titleKey: 'onboarding.fitness.avancado.title' as TranslationKey,
          descKey: 'onboarding.fitness.avancado.desc' as TranslationKey,
        },
      ],
    []
  );

  const injuryOptions = INJURY_ONBOARDING_OPTIONS;

  const motivationOptions = useMemo(
    () =>
      [
        { id: 'saude_melhor' as TrainingMotivation, labelKey: 'onboarding.motivation.saude_melhor' as TranslationKey, icon: 'pulse-outline' as const },
        { id: 'imunidade' as TrainingMotivation, labelKey: 'onboarding.motivation.imunidade' as TranslationKey, icon: 'shield-checkmark-outline' as const },
        { id: 'aparencia' as TrainingMotivation, labelKey: 'onboarding.motivation.aparencia' as TranslationKey, icon: 'sparkles-outline' as const },
        { id: 'forca_resistencia' as TrainingMotivation, labelKey: 'onboarding.motivation.forca_resistencia' as TranslationKey, icon: 'barbell-outline' as const },
        { id: 'desejo_sexual' as TrainingMotivation, labelKey: 'onboarding.motivation.desejo_sexual' as TranslationKey, icon: 'heart-circle-outline' as const },
      ],
    []
  );
  const [step, setStep] = useState<Step>('dados');
  const [name, setName] = useState(session?.name ?? '');
  const [weightKg, setWeightKg] = useState(72);
  const [heightCm, setHeightCm] = useState(170);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | null>(null);
  const [fitnessLevel, setFitnessLevel] = useState<FitnessLevel | null>(null);
  const [injuryAreas, setInjuryAreas] = useState<InjuryArea[]>(['nenhuma']);
  const [trainingMotivations, setTrainingMotivations] = useState<TrainingMotivation[]>([]);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateDados = () => {
    const ageNum = Number(age);

    if (!name.trim()) return setError(t('onboarding.error.name'));
    if (!ageNum || ageNum <= 0 || ageNum > 120) return setError(t('onboarding.error.age'));
    setError(null);
    return true;
  };

  const handleNextFromDados = () => {
    if (validateDados()) setStep('peso');
  };

  const handleNextFromPeso = () => {
    if (weightKg < 30 || weightKg > 200) return setError(t('onboarding.error.weight'));
    setError(null);
    setStep('altura');
  };

  const handleNextFromAltura = () => {
    if (heightCm < 100 || heightCm > 220) return setError(t('onboarding.error.height'));
    setError(null);
    setStep('genero');
  };

  const handleNextFromGenero = () => {
    if (!gender) return setError(t('onboarding.error.gender'));
    setError(null);
    setStep('frequencia');
  };

  const handleNextFromFrequencia = () => {
    if (!activityLevel) return setError(t('onboarding.error.activity'));
    setError(null);
    setStep('nivel');
  };

  const handleNextFromNivel = () => {
    if (!fitnessLevel) return setError(t('onboarding.error.fitness'));
    setError(null);
    setStep('lesoes');
  };

  const toggleInjury = (area: InjuryArea) => {
    setError(null);
    setInjuryAreas((prev) => toggleInjurySelection(prev, area));
  };

  const handleNextFromLesoes = () => {
    if (injuryAreas.length === 0) return setError(t('onboarding.error.injury'));
    setError(null);
    setStep('motivacao');
  };

  const toggleMotivation = (motivation: TrainingMotivation) => {
    setError(null);
    setTrainingMotivations((prev) =>
      prev.includes(motivation) ? prev.filter((item) => item !== motivation) : [...prev, motivation]
    );
  };

  const handleNextFromMotivacao = () => {
    if (trainingMotivations.length === 0) return setError(t('onboarding.error.motivation'));
    setError(null);
    setStep('objetivo');
  };

  const handleSubmit = async () => {
    if (!goal) return setError(t('onboarding.error.goal'));
    if (!activityLevel) return setError(t('onboarding.error.activity'));
    if (!fitnessLevel) return setError(t('onboarding.error.fitness'));
    if (injuryAreas.length === 0) return setError(t('onboarding.error.injury'));
    if (trainingMotivations.length === 0) return setError(t('onboarding.error.motivation'));

    const ageNum = Number(age);

    setError(null);
    await saveProfile({
      name: name.trim(),
      gender: gender ?? 'outro',
      weightKg,
      heightCm,
      age: ageNum,
      goal,
      activityLevel,
      fitnessLevel,
      injuryAreas,
      trainingMotivations,
    });
  };

  const goBack = () => {
    setError(null);
    if (step === 'peso') setStep('dados');
    if (step === 'altura') setStep('peso');
    if (step === 'genero') setStep('altura');
    if (step === 'frequencia') setStep('genero');
    if (step === 'nivel') setStep('frequencia');
    if (step === 'lesoes') setStep('nivel');
    if (step === 'motivacao') setStep('lesoes');
    if (step === 'objetivo') setStep('motivacao');
  };

  const isMetricStep = step === 'peso' || step === 'altura';
  const waterPreviewLiters =
    activityLevel != null ? calculateWaterLiters(weightKg, activityLevel) : calculateWaterLiters(weightKg);

  const stepIndex = ONBOARDING_STEPS.indexOf(step);
  const stepContent = (
    <>
          {step !== 'dados' ? (
            <View style={styles.topBar}>
              <Pressable onPress={goBack} style={styles.backBtn} hitSlop={8}>
                <Ionicons name="chevron-back" size={22} color={colors.text} />
              </Pressable>
              <Text style={styles.stepProgress}>
                {t('onboarding.stepProgress', { current: stepIndex + 1, total: ONBOARDING_STEPS.length })}
              </Text>
            </View>
          ) : null}

          {step === 'dados' ? (
            <>
              <View style={styles.logoRow}>
                <View style={styles.logoDot} />
                <Text style={styles.logoText}>FitPro</Text>
              </View>
              <Text style={[typography.h1, styles.title]}>{t('onboarding.profileTitle')}</Text>
              <Text style={styles.subtitle}>{t('onboarding.profileSubtitle')}</Text>

              <Field label={t('onboarding.field.name')}>
                <TextInput
                  style={styles.input}
                  placeholder={t('onboarding.placeholder.name')}
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                />
              </Field>

              <Field label={t('onboarding.field.age')}>
                <TextInput
                  style={styles.input}
                  placeholder={t('onboarding.placeholder.age')}
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                />
              </Field>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <View style={{ marginTop: spacing.lg }}>
                <PrimaryButton label={t('onboarding.continue')} icon="arrow-forward" onPress={handleNextFromDados} />
              </View>
            </>
          ) : null}

          {step === 'peso' ? (
            <>
              <Text style={styles.rulerTitle}>{t('onboarding.weightTitle')}</Text>
              <MetricSlider
                min={30}
                max={200}
                step={1}
                value={weightKg}
                onChange={setWeightKg}
                unit="kg"
                formatValue={(v) => v.toFixed(1)}
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <WaterIntakeCard liters={waterPreviewLiters} weightKg={weightKg} compact />
              <View style={{ marginTop: spacing.xl }}>
                <PrimaryButton label={t('onboarding.continue')} icon="arrow-forward" onPress={handleNextFromPeso} />
              </View>
            </>
          ) : null}

          {step === 'altura' ? (
            <>
              <Text style={styles.rulerTitle}>{t('onboarding.heightTitle')}</Text>
              <Text style={styles.rulerSubtitle}>{t('onboarding.heightSubtitle')}</Text>
              <MetricSlider
                min={100}
                max={220}
                step={1}
                value={heightCm}
                onChange={setHeightCm}
                unit="cm"
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <View style={{ marginTop: spacing.xl }}>
                <PrimaryButton label={t('onboarding.continue')} icon="arrow-forward" onPress={handleNextFromAltura} />
              </View>
            </>
          ) : null}

          {step === 'genero' ? (
            <>
              <Text style={styles.frequencyTitle}>{t('onboarding.genderTitle')}</Text>
              <Text style={styles.subtitle}>{t('onboarding.genderSubtitle')}</Text>
              <View style={styles.frequencyList}>
                {genderOptions.map((option) => {
                  const selected = gender === option.id;
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => {
                        setGender(option.id);
                        setError(null);
                      }}
                      style={[styles.genderCard, selected && styles.injuryCardSelected]}
                      accessibilityRole="button"
                      accessibilityLabel={t(option.labelKey)}
                      accessibilityState={{ selected }}
                    >
                      <Image source={option.image} style={styles.injuryCardImage} resizeMode="cover" />
                      <View style={styles.injuryLabelWrap} pointerEvents="none">
                        <Text style={styles.injuryLabel}>{t(option.labelKey)}</Text>
                      </View>
                      {selected ? <View style={styles.injurySelectedOverlay} /> : null}
                    </Pressable>
                  );
                })}
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <View style={{ marginTop: spacing.lg }}>
                <PrimaryButton label={t('onboarding.continue')} icon="arrow-forward" onPress={handleNextFromGenero} />
              </View>
            </>
          ) : null}

          {step === 'frequencia' ? (
            <>
              <Text style={styles.frequencyTitle}>{t('onboarding.frequencyTitle')}</Text>
              <View style={styles.frequencyList}>
                {activityLevels.map((level) => {
                  const selected = activityLevel === level.id;
                  return (
                    <Pressable
                      key={level.id}
                      onPress={() => {
                        setActivityLevel(level.id);
                        setError(null);
                      }}
                      style={[styles.frequencyCard, selected && styles.frequencyCardSelected]}
                    >
                      <View style={styles.frequencyIconWrap}>
                        <Ionicons name={level.icon} size={22} color={colors.text} />
                      </View>
                      <Text style={styles.frequencyLabel}>{t(level.labelKey)}</Text>
                    </Pressable>
                  );
                })}
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <View style={{ marginTop: spacing.lg }}>
                <PrimaryButton label={t('onboarding.continue')} icon="arrow-forward" onPress={handleNextFromFrequencia} />
              </View>
            </>
          ) : null}

          {step === 'nivel' ? (
            <>
              <Text style={styles.frequencyTitle}>{t('onboarding.levelTitle')}</Text>
              <View style={styles.frequencyList}>
                {fitnessLevels.map((level) => {
                  const selected = fitnessLevel === level.id;
                  return (
                    <Pressable
                      key={level.id}
                      onPress={() => {
                        setFitnessLevel(level.id);
                        setError(null);
                      }}
                      style={[styles.levelCard, selected && styles.levelCardSelected]}
                    >
                      <View style={[styles.frequencyIconWrap, selected && styles.levelIconWrapSelected]}>
                        <Ionicons name="layers-outline" size={22} color={selected ? '#FFFFFF' : colors.text} />
                      </View>
                      <View style={styles.levelTextWrap}>
                        <Text style={[styles.levelTitle, selected && styles.levelTitleSelected]}>{t(level.titleKey)}</Text>
                        <Text style={[styles.levelDescription, selected && styles.levelDescriptionSelected]}>
                          {t(level.descKey)}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <View style={{ marginTop: spacing.lg }}>
                <PrimaryButton label={t('onboarding.continue')} icon="arrow-forward" onPress={handleNextFromNivel} />
              </View>
            </>
          ) : null}

          {step === 'lesoes' ? (
            <>
              <Text style={styles.frequencyTitle}>{t('onboarding.injuryTitle')}</Text>
              <Text style={styles.injuryHint}>{t('onboarding.injuryHint')}</Text>
              <View style={styles.frequencyList}>
                {injuryOptions.map((option) => {
                  const selected = injuryAreas.includes(option.id);
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => toggleInjury(option.id)}
                      style={[styles.injuryCard, selected && styles.injuryCardSelected]}
                      accessibilityRole="button"
                      accessibilityLabel={t(option.labelKey)}
                      accessibilityState={{ selected }}
                    >
                      <Image source={option.image} style={styles.injuryCardImage} resizeMode="cover" />
                      <View style={styles.injuryLabelWrap} pointerEvents="none">
                        <Text style={styles.injuryLabel}>{t(option.labelKey)}</Text>
                      </View>
                      {selected ? <View style={styles.injurySelectedOverlay} /> : null}
                    </Pressable>
                  );
                })}
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <View style={{ marginTop: spacing.lg }}>
                <PrimaryButton label={t('onboarding.continue')} icon="arrow-forward" onPress={handleNextFromLesoes} />
              </View>
            </>
          ) : null}

          {step === 'motivacao' ? (
            <>
              <Text style={styles.frequencyTitle}>{t('onboarding.motivationTitle')}</Text>
              <Text style={styles.injuryHint}>{t('onboarding.motivationHint')}</Text>
              <View style={styles.frequencyList}>
                {motivationOptions.map((option) => {
                  const selected = trainingMotivations.includes(option.id);
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => toggleMotivation(option.id)}
                      style={[styles.frequencyCard, selected && styles.frequencyCardSelected]}
                    >
                      <View style={styles.frequencyIconWrap}>
                        <Ionicons name={option.icon} size={22} color={colors.text} />
                      </View>
                      <Text style={styles.frequencyLabel}>{t(option.labelKey)}</Text>
                    </Pressable>
                  );
                })}
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <View style={{ marginTop: spacing.lg }}>
                <PrimaryButton label={t('onboarding.continue')} icon="arrow-forward" onPress={handleNextFromMotivacao} />
              </View>
            </>
          ) : null}

          {step === 'objetivo' ? (
            <>
              <Text style={[typography.h1, styles.title]}>{t('onboarding.goalTitle')}</Text>
              <Text style={styles.subtitle}>{t('onboarding.goalSubtitle')}</Text>

              <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
                {goals.map((g) => {
                  const selected = goal === g.id;
                  return (
                    <Pressable
                      key={g.id}
                      onPress={() => setGoal(g.id)}
                      style={[styles.goalCard, selected && styles.goalCardSelected]}
                    >
                      <Ionicons name={g.icon} size={22} color={selected ? colors.primary : colors.textMuted} />
                      <Text style={[styles.goalLabel, selected && { color: colors.text }]}>{t(g.labelKey)}</Text>
                      {selected ? <Ionicons name="checkmark-circle" size={20} color={colors.primary} /> : null}
                    </Pressable>
                  );
                })}
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <Text style={styles.waterPreviewTitle}>{t('onboarding.waterPreviewTitle')}</Text>
              <WaterIntakeCard liters={waterPreviewLiters} weightKg={weightKg} />

              <View style={{ marginTop: spacing.lg }}>
                <PrimaryButton label={t('onboarding.start')} icon="arrow-forward" onPress={handleSubmit} />
              </View>
            </>
          ) : null}

          <Text style={styles.disclaimer}>{t('onboarding.disclaimer')}</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        {isMetricStep ? (
          <View style={[styles.container, styles.containerRuler]}>{stepContent}</View>
        ) : (
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            {stepContent}
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, children, flex }: { label: string; children: React.ReactNode; flex?: boolean }) {
  return (
    <View style={[{ marginBottom: spacing.md }, flex && { flex: 1 }]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xl },
  containerRuler: { flexGrow: 1, justifyContent: 'space-between' },
  backBtn: { alignSelf: 'flex-start' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  stepProgress: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.lg },
  logoDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  logoText: { color: colors.text, fontWeight: '800', fontSize: 16, letterSpacing: 1 },
  title: { color: colors.text, marginBottom: 6 },
  subtitle: { color: colors.textMuted, marginBottom: spacing.lg, lineHeight: 20 },
  frequencyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    letterSpacing: 0.3,
    marginBottom: spacing.xl,
    marginTop: spacing.md,
  },
  rulerTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    letterSpacing: 0.2,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    textTransform: 'uppercase',
  },
  rulerSubtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  frequencyList: { gap: spacing.md },
  frequencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    minHeight: 88,
  },
  frequencyCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMutedLight,
  },
  frequencyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frequencyLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    minHeight: 96,
  },
  levelCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#2563EB',
  },
  levelIconWrapSelected: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  levelTextWrap: { flex: 1, gap: 4 },
  levelTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  levelTitleSelected: { color: '#FFFFFF' },
  levelDescription: { color: colors.textMuted, fontSize: 14, lineHeight: 19 },
  levelDescriptionSelected: { color: 'rgba(255,255,255,0.88)' },
  injuryHint: { color: colors.textMuted, fontSize: 13, marginTop: -spacing.md, marginBottom: spacing.lg, lineHeight: 18 },
  genderCard: {
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    aspectRatio: 1024 / 349,
    backgroundColor: colors.surface,
  },
  injuryCard: {
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    aspectRatio: 1024 / 437,
    backgroundColor: colors.surface,
  },
  injuryCardSelected: {
    borderColor: '#2563EB',
  },
  injuryCardImage: {
    width: '100%',
    height: '100%',
  },
  injuryLabelWrap: {
    position: 'absolute',
    left: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    maxWidth: '42%',
  },
  injuryLabel: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  injurySelectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37,99,235,0.18)',
  },
  label: { color: colors.textMuted, fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 15,
  },
  row: { flexDirection: 'row', gap: spacing.md },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  goalCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMutedLight,
  },
  goalLabel: { flex: 1, color: colors.textMuted, fontWeight: '700', fontSize: 15 },
  error: { color: colors.danger, marginTop: spacing.sm, fontWeight: '600' },
  disclaimer: { color: colors.textMuted, fontSize: 11, marginTop: spacing.lg, lineHeight: 16, textAlign: 'center' },
  waterPreviewTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
});
