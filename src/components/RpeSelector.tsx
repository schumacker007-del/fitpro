import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { RpeScore } from '../types';

function rpeColor(value: number) {
  if (value <= 4) return colors.primary;
  if (value <= 7) return colors.gold;
  return colors.danger;
}

export default function RpeSelector({
  value,
  onSelect,
}: {
  value?: RpeScore | null;
  onSelect: (rpe: RpeScore) => void;
}) {
  return (
    <View>
      <View style={styles.grid}>
        {Array.from({ length: 10 }, (_, i) => (i + 1) as RpeScore).map((n) => {
          const selected = value === n;
          const color = rpeColor(n);
          return (
            <Pressable key={n} onPress={() => onSelect(n)} style={styles.cellWrap}>
              <View
                style={[
                  styles.cell,
                  { borderColor: color },
                  selected && { backgroundColor: color },
                ]}
              >
                <Text style={[styles.cellText, { color: selected ? '#0B1210' : color }]}>{n}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.legendRow}>
        <Text style={styles.legendText}>1 · Muito fácil</Text>
        <Text style={styles.legendText}>10 · Esforço máximo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  cellWrap: { width: '17%' },
  cell: {
    aspectRatio: 1,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: { fontWeight: '800', fontSize: 15 },
  legendRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm, paddingHorizontal: 2 },
  legendText: { color: colors.textMuted, fontSize: 11 },
});
