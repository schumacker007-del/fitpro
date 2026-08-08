import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

const ACCENT = '#22D3EE';

interface MetricSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  formatValue?: (value: number) => string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function snapValue(raw: number, min: number, max: number, step: number) {
  const stepped = Math.round((raw - min) / step) * step + min;
  return clamp(Math.round(stepped * 10) / 10, min, max);
}

export default function MetricSlider({
  min,
  max,
  step,
  value,
  onChange,
  unit,
  formatValue,
}: MetricSliderProps) {
  const format = formatValue ?? ((v: number) => String(v));

  const setValue = useCallback(
    (next: number, withHaptic = false) => {
      const snapped = snapValue(next, min, max, step);
      if (snapped === value) return;
      if (withHaptic) void Haptics.selectionAsync();
      onChange(snapped);
    },
    [max, min, onChange, step, value]
  );

  const bump = (delta: number) => setValue(value + delta, true);

  return (
    <View style={styles.root}>
      <View style={styles.valueBlock}>
        <View style={styles.valueRow}>
          <Text style={styles.valueText}>{format(value)}</Text>
          <Text style={styles.unitText}>{unit}</Text>
        </View>
        <View style={styles.valueIndicator} />
      </View>

      <View style={styles.controls}>
        <Pressable onPress={() => bump(-step)} style={styles.stepBtn} hitSlop={8}>
          <Ionicons name="remove" size={24} color={colors.text} />
        </Pressable>

        <View style={styles.sliderWrap}>
          <Slider
            style={styles.slider}
            minimumValue={min}
            maximumValue={max}
            step={step}
            value={value}
            onValueChange={(next) => setValue(next)}
            onSlidingComplete={(next) => setValue(next, true)}
            minimumTrackTintColor={ACCENT}
            maximumTrackTintColor={colors.border}
            thumbTintColor={ACCENT}
          />
          <View style={styles.rangeRow}>
            <Text style={styles.rangeText}>{format(min)}</Text>
            <Text style={styles.rangeText}>{format(max)}</Text>
          </View>
        </View>

        <Pressable onPress={() => bump(step)} style={styles.stepBtn} hitSlop={8}>
          <Ionicons name="add" size={24} color={colors.text} />
        </Pressable>
      </View>

      <Text style={styles.hint}>Use o controle deslizante ou os botões + / −</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  valueBlock: {
    alignItems: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  valueText: {
    color: colors.text,
    fontSize: 56,
    fontWeight: '800',
    letterSpacing: -1,
  },
  unitText: {
    color: colors.textMuted,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  valueIndicator: {
    width: 120,
    height: 3,
    marginTop: spacing.sm,
    backgroundColor: ACCENT,
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderWrap: {
    flex: 1,
    gap: spacing.xs,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  rangeText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
  },
});
