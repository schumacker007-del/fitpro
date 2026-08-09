import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import { resolveAppVersion, resolveBuildNumber } from '../utils/buildInfo';

export default function BuildBadge() {
  const build = resolveBuildNumber();
  const version = resolveAppVersion();

  return (
    <View style={styles.wrap} pointerEvents="none">
      <Text style={styles.text}>v{version} ({build})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 9999,
    backgroundColor: 'rgba(57, 255, 20, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },
});
