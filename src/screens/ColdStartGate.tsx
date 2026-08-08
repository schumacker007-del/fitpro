import Constants from 'expo-constants';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

/**
 * Ultra-minimal cold-start gate — no SafeAreaView, navigation, gradients, or heavy components.
 * TestFlight build 12 crashed when LoginScreen mounted right after splash.
 */
export default function ColdStartGate() {
  const { loginWithSession } = useAuth();
  const build = Constants.nativeBuildVersion ?? '?';
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <View style={styles.root}>
      <Text style={styles.logo}>FitPro</Text>
      <Text style={styles.build}>v{version} ({build})</Text>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        onPress={() =>
          void loginWithSession({
            provider: 'apple',
            userId: `beta-${Date.now()}`,
            name: 'Beta Tester',
          })
        }
      >
        <Text style={styles.btnText}>Continuar no beta</Text>
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
    marginBottom: 12,
  },
  build: {
    color: '#39FF14',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 32,
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
