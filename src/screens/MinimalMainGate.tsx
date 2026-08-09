import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useMainUnlock } from '../context/MainUnlockContext';
import { resolveAppVersion, resolveBuildNumber } from '../utils/buildInfo';

/**
 * Post-onboarding gate — RN primitives only. Defers AppDataProviders + AppStack
 * until the user explicitly taps to continue (TestFlight build 16).
 */
export default function MinimalMainGate() {
  const { unlockMain } = useMainUnlock();
  const build = resolveBuildNumber();
  const version = resolveAppVersion();

  return (
    <View style={styles.root}>
      <Text style={styles.logo}>FitPro</Text>
      <Text style={styles.title}>Perfil salvo!</Text>
      <Text style={styles.subtitle}>Toque abaixo para abrir o app.</Text>
      <Text style={styles.build}>v{version} ({build})</Text>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        onPress={unlockMain}
      >
        <Text style={styles.btnText}>Abrir app</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050810',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  logo: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 16,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9BA1B0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  build: {
    color: '#39FF14',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 28,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#39FF14',
    backgroundColor: 'rgba(57, 255, 20, 0.12)',
  },
  btn: {
    minHeight: 52,
    minWidth: 220,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39FF14',
    paddingHorizontal: 24,
  },
  btnPressed: {
    opacity: 0.9,
  },
  btnText: {
    color: '#0B1210',
    fontWeight: '800',
    fontSize: 15,
  },
});
