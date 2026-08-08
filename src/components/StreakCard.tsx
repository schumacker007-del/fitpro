import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { GlassCard } from './GlassCard';
import { colors, spacing } from '../theme';

export default function StreakCard() {
  const { snapshot } = useGamification();
  const { t } = useLanguage();

  return (
    <GlassCard style={styles.card}>
      <View style={styles.row}>
        <StreakItem icon="flame" color="#F97316" label={t('streak.workout')} value={snapshot.workoutStreak} suffix={t('streak.days')} />
        <View style={styles.divider} />
        <StreakItem icon="nutrition" color="#60A5FA" label={t('streak.diet')} value={snapshot.dietStreak} suffix={t('streak.days')} />
        <View style={styles.divider} />
        <StreakItem icon="star" color="#A78BFA" label={t('streak.combo')} value={snapshot.comboStreak} suffix={t('streak.days')} />
      </View>
      {snapshot.bestWorkoutStreak > snapshot.workoutStreak ? (
        <Text style={styles.hint}>{t('streak.personalBest', { days: snapshot.bestWorkoutStreak })}</Text>
      ) : null}
    </GlassCard>
  );
}

function StreakItem({
  icon,
  color,
  label,
  value,
  suffix,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <View style={styles.item}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.suffix}>{suffix}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingVertical: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' },
  item: { flex: 1, alignItems: 'center', gap: 2 },
  value: { color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 2 },
  label: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  suffix: { color: colors.textMuted, fontSize: 10 },
  divider: { width: 1, height: 48, backgroundColor: colors.border },
  hint: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: spacing.sm },
});
