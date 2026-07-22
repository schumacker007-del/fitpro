import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryButton({
  label,
  onPress,
  icon,
  variant = 'primary',
  disabled,
}: {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'outline' | 'gold' | 'danger';
  disabled?: boolean;
}) {
  const bg =
    variant === 'primary'
      ? colors.primary
      : variant === 'gold'
      ? colors.gold
      : variant === 'danger'
      ? colors.danger
      : 'transparent';
  const textColor = variant === 'outline' ? colors.text : '#0B1210';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.85 : 1 },
        variant === 'outline' && styles.buttonOutline,
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={variant === 'outline' ? colors.text : textColor} /> : null}
      <Text style={[styles.buttonText, { color: variant === 'outline' ? colors.text : textColor }]}>{label}</Text>
    </Pressable>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={{ marginBottom: spacing.sm }}>
      <Text style={[typography.h2, { color: colors.text }]}>{title}</Text>
      {subtitle ? <Text style={[typography.body, { color: colors.textMuted, marginTop: 2 }]}>{subtitle}</Text> : null}
    </View>
  );
}

export function ProBadge() {
  return (
    <View style={styles.proBadge}>
      <Ionicons name="star" size={11} color="#0B1210" />
      <Text style={styles.proBadgeText}>PRO</Text>
    </View>
  );
}

export function Pill({ label, tone = 'default' }: { label: string; tone?: 'default' | 'primary' | 'gold' }) {
  const bg = tone === 'primary' ? 'rgba(52,211,153,0.15)' : tone === 'gold' ? 'rgba(244,183,64,0.15)' : colors.surfaceAlt;
  const color = tone === 'primary' ? colors.primary : tone === 'gold' ? colors.gold : colors.textMuted;
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  proBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B1210',
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
