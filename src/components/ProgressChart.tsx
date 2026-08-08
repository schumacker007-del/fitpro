import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { colors, spacing } from '../theme';
import { TrainingLogEntry } from '../types';

function rpeColor(value: number) {
  if (value <= 4) return colors.primary;
  if (value <= 7) return colors.gold;
  return colors.danger;
}

/** Gráfico de barras simples (sem lib externa) mostrando a evolução do RPE ao longo das últimas sessões. */
export default function ProgressChart({ logs }: { logs: TrainingLogEntry[] }) {
  const { t } = useLanguage();
  const recent = [...logs].reverse().slice(-10); // mais antigo -> mais recente, últimos 10

  if (recent.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>{t('progressChart.empty')}</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.chartRow}>
        {recent.map((log, i) => (
          <View key={log.id + i} style={styles.barWrap}>
            <View style={[styles.bar, { height: `${log.rpe * 10}%`, backgroundColor: rpeColor(log.rpe) }]} />
            <Text style={styles.barLabel}>{log.rpe}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.axisLabel}>{t('progressChart.axisLabel')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 90,
    gap: 4,
  },
  barWrap: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%' },
  bar: { width: '70%', borderRadius: 4, minHeight: 4 },
  barLabel: { color: colors.textMuted, fontSize: 9, marginTop: 4, fontWeight: '700' },
  axisLabel: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: spacing.sm },
  emptyWrap: { paddingVertical: spacing.md },
  emptyText: { color: colors.textMuted, fontSize: 12, textAlign: 'center', lineHeight: 18 },
});
