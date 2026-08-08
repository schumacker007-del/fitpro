import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, spacing } from '../../theme';

export default function ProviderButton({
  label,
  icon,
  bg,
  textColor,
  busy,
  disabled,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  textColor: string;
  busy?: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.providerBtn, { backgroundColor: bg }, pressed && styles.providerPressed]}
    >
      {busy ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          <Ionicons name={icon} size={20} color={textColor} />
          <Text style={[styles.providerLabel, { color: textColor }]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  providerBtn: {
    minHeight: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  providerPressed: { opacity: 0.9 },
  providerLabel: { fontWeight: '700', fontSize: 15 },
});
