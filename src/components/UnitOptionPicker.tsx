import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

export interface UnitOption {
  id: string;
  label: string;
}

interface UnitOptionPickerProps {
  title: string;
  subtitle?: string;
  options: UnitOption[];
  value: string;
  onChange: (id: string) => void;
}

export default function UnitOptionPicker({ title, subtitle, options, value, onChange }: UnitOptionPickerProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.list}>
        {options.map((opt) => {
          const selected = opt.id === value;
          return (
            <Pressable
              key={opt.id}
              onPress={() => onChange(opt.id)}
              style={[styles.option, selected && styles.optionSelected]}
            >
              <Text style={styles.optionLabel}>{opt.label}</Text>
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected ? <Ionicons name="checkmark" size={14} color="#0B1210" /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  title: { color: colors.text, fontSize: 18, fontWeight: '800', marginBottom: 4 },
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 18, marginBottom: spacing.md },
  list: { gap: spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceAlt,
  },
  optionLabel: { color: colors.text, fontSize: 17, fontWeight: '800' },
  radio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
});
