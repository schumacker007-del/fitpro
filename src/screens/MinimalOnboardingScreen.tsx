import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

/**
 * Ultra-minimal onboarding — no SafeAreaView, icons, slider, images, or haptics.
 * Used on cold start to avoid native module init crashes (TestFlight build 14).
 */
export default function MinimalOnboardingScreen() {
  const { saveProfile } = useUser();
  const { session } = useAuth();

  const [name, setName] = useState(session?.name ?? '');
  const [weightText, setWeightText] = useState('72');
  const [heightText, setHeightText] = useState('170');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const weightKg = Number(weightText.replace(',', '.'));
    const heightCm = Number(heightText.replace(',', '.'));

    if (!trimmedName) {
      setError('Informe seu nome.');
      return;
    }
    if (!weightKg || weightKg < 30 || weightKg > 200) {
      setError('Peso inválido (30–200 kg).');
      return;
    }
    if (!heightCm || heightCm < 100 || heightCm > 220) {
      setError('Altura inválida (100–220 cm).');
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await saveProfile({
        name: trimmedName,
        gender: 'outro',
        weightKg,
        heightCm,
        age: 30,
        goal: 'manter_forma',
        activityLevel: 'moderado',
        fitnessLevel: 'iniciante',
        injuryAreas: ['nenhuma'],
        trainingMotivations: ['saude_melhor'],
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.logo}>FitPro</Text>
      <Text style={styles.title}>Complete seu perfil</Text>
      <Text style={styles.subtitle}>Só o essencial para começar. Você pode ajustar depois nas configurações.</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        placeholderTextColor="#6B7280"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="72"
        placeholderTextColor="#6B7280"
        value={weightText}
        onChangeText={setWeightText}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Altura (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="170"
        placeholderTextColor="#6B7280"
        value={heightText}
        onChangeText={setHeightText}
        keyboardType="number-pad"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed, submitting && styles.btnDisabled]}
        onPress={() => void handleSubmit()}
        disabled={submitting}
      >
        <Text style={styles.btnText}>{submitting ? 'Salvando…' : 'Completar perfil'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050810',
    padding: 32,
    paddingTop: 72,
    justifyContent: 'flex-start',
  },
  logo: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 24,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9BA1B0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 28,
  },
  label: {
    color: '#9BA1B0',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#181B24',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2E3A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#F5F6FA',
    fontSize: 15,
    marginBottom: 16,
  },
  error: {
    color: '#FF5C5C',
    fontWeight: '600',
    marginBottom: 12,
  },
  btn: {
    marginTop: 8,
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39FF14',
    paddingHorizontal: 24,
  },
  btnPressed: {
    opacity: 0.9,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: '#0B1210',
    fontWeight: '800',
    fontSize: 15,
  },
});
