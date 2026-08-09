import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getBuildLabel } from '../utils/buildInfo';

type BootMode = 'gate' | 'home' | 'tabs';

/**
 * TestFlight: avoid auto-mounting MainTabs (bottom tabs + Ionicons) on cold start.
 * Build 17 crashed natively when MainTabs loaded after "Carregando início…".
 */
export default function MainEntry() {
  const [mode, setMode] = useState<BootMode>('gate');

  if (mode === 'gate') {
    return (
      <View style={styles.gate}>
        <Text style={styles.logo}>FitPro</Text>
        <Text style={styles.title}>App pronto!</Text>
        <Text style={styles.subtitle}>Toque para ver a home. O menu com abas é opcional.</Text>
        <Text style={styles.build}>{getBuildLabel()}</Text>
        <Pressable
          style={({ pressed }) => [styles.btnPrimary, pressed && styles.pressed]}
          onPress={() => setMode('home')}
        >
          <Text style={styles.btnPrimaryText}>Ver início</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.btnSecondary, pressed && styles.pressed]}
          onPress={() => setMode('tabs')}
        >
          <Text style={styles.btnSecondaryText}>Menu completo (beta)</Text>
        </Pressable>
      </View>
    );
  }

  if (mode === 'home') {
    const HomeNavigator = require('./HomeNavigator').default as React.ComponentType;
    return <HomeNavigator />;
  }

  const MainTabs = require('./MainTabs').default as React.ComponentType;
  return <MainTabs />;
}

const styles = StyleSheet.create({
  gate: {
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
    marginBottom: 12,
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
    textAlign: 'center',
    marginBottom: 20,
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
  btnPrimary: {
    minHeight: 52,
    minWidth: 240,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39FF14',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  btnPrimaryText: {
    color: '#0B1210',
    fontWeight: '800',
    fontSize: 15,
  },
  btnSecondary: {
    minHeight: 44,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    color: '#9BA1B0',
    fontWeight: '700',
    fontSize: 13,
  },
  pressed: { opacity: 0.9 },
});
