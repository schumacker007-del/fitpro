import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * RN-only placeholder while MainTabs and tab icons load (TestFlight build 16).
 */
export default function MinimalHomeScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.logo}>FitPro</Text>
      <Text style={styles.hint}>Carregando início…</Text>
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
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
  },
  hint: {
    color: '#9BA1B0',
    fontSize: 14,
    fontWeight: '600',
  },
});
