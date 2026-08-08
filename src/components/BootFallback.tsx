import Constants from 'expo-constants';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function BootFallback() {
  const build = Constants.nativeBuildVersion ?? '?';
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <View style={styles.wrap}>
      <Text style={styles.logo}>FitPro</Text>
      <ActivityIndicator color="#39FF14" size="large" style={styles.spinner} />
      <Text style={styles.hint}>Iniciando v{version} ({build})…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#0F1117',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  logo: {
    color: '#39FF14',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 24,
  },
  spinner: {
    marginBottom: 16,
  },
  hint: {
    color: '#F5F6FA',
    fontSize: 14,
    fontWeight: '600',
  },
});
