import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
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
import { useUser } from '../context/UserContext';
import { colors, radius, spacing, typography } from '../theme';
import { Goal } from '../types';
import { PrimaryButton } from '../components/ui';

const GOALS: { id: Goal; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'perder_peso', label: 'Perder peso', icon: 'flame-outline' },
  { id: 'ganhar_massa', label: 'Ganhar massa', icon: 'barbell-outline' },
  { id: 'manter_forma', label: 'Manter a forma', icon: 'fitness-outline' },
];

export default function OnboardingScreen() {
  const { saveProfile } = useUser();
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState<Goal | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const weightNum = Number(weight.replace(',', '.'));
    const heightNum = Number(height.replace(',', '.'));
    const ageNum = Number(age);

    if (!name.trim()) return setError('Digite seu nome.');
    if (!weightNum || weightNum <= 0 || weightNum > 400) return setError('Informe um peso válido em kg.');
    if (!heightNum || heightNum <= 0 || heightNum > 260) return setError('Informe uma altura válida em cm.');
    if (!ageNum || ageNum <= 0 || ageNum > 120) return setError('Informe uma idade válida.');
    if (!goal) return setError('Escolha seu objetivo principal.');

    setError(null);
    await saveProfile({
      name: name.trim(),
      gender: 'outro',
      weightKg: weightNum,
      heightCm: heightNum,
      age: ageNum,
      goal,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.logoRow}>
            <View style={styles.logoDot} />
            <Text style={styles.logoText}>FitPro</Text>
          </View>
          <Text style={[typography.h1, styles.title]}>Vamos montar seu perfil</Text>
          <Text style={styles.subtitle}>
            Com seus dados, criamos treinos e dietas personalizados para o seu objetivo.
          </Text>

          <Field label="Nome">
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
            />
          </Field>

          <View style={styles.row}>
            <Field label="Peso (kg)" flex>
              <TextInput
                style={styles.input}
                placeholder="Ex: 72"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </Field>
            <Field label="Altura (cm)" flex>
              <TextInput
                style={styles.input}
                placeholder="Ex: 170"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
              />
            </Field>
          </View>

          <Field label="Idade">
            <TextInput
              style={styles.input}
              placeholder="Ex: 28"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </Field>

          <Text style={styles.label}>Qual seu objetivo principal?</Text>
          <View style={{ gap: spacing.sm }}>
            {GOALS.map((g) => {
              const selected = goal === g.id;
              return (
                <Pressable
                  key={g.id}
                  onPress={() => setGoal(g.id)}
                  style={[styles.goalCard, selected && styles.goalCardSelected]}
                >
                  <Ionicons name={g.icon} size={22} color={selected ? colors.primary : colors.textMuted} />
                  <Text style={[styles.goalLabel, selected && { color: colors.text }]}>{g.label}</Text>
                  {selected ? <Ionicons name="checkmark-circle" size={20} color={colors.primary} /> : null}
                </Pressable>
              );
            })}
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={{ marginTop: spacing.lg }}>
            <PrimaryButton label="Começar" icon="arrow-forward" onPress={handleSubmit} />
          </View>

          <Text style={styles.disclaimer}>
            As orientações geradas são gerais e supervisionadas por profissional de Educação Física.
            Não substituem avaliação médica individual.
          </Text>
        </ScrollView>
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
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.lg },
  logoDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  logoText: { color: colors.text, fontWeight: '800', fontSize: 16, letterSpacing: 1 },
  title: { color: colors.text, marginBottom: 6 },
  subtitle: { color: colors.textMuted, marginBottom: spacing.lg, lineHeight: 20 },
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
    backgroundColor: 'rgba(52,211,153,0.08)',
  },
  goalLabel: { flex: 1, color: colors.textMuted, fontWeight: '700', fontSize: 15 },
  error: { color: colors.danger, marginTop: spacing.sm, fontWeight: '600' },
  disclaimer: { color: colors.textMuted, fontSize: 11, marginTop: spacing.lg, lineHeight: 16, textAlign: 'center' },
});
