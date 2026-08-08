import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { waterCupsFromLiters } from '../utils/nutritionTargets';
import { Card } from './ui';
import { colors, spacing } from '../theme';

export default function WaterIntakeCard({
  liters,
  weightKg,
  compact = false,
}: {
  liters: number;
  weightKg: number;
  compact?: boolean;
}) {
  const { t } = useLanguage();
  const cups = waterCupsFromLiters(liters);

  return (
    <Card style={[styles.card, compact && styles.cardCompact]}>
      <View style={styles.iconWrap}>
        <Ionicons name="water-outline" size={compact ? 20 : 24} color="#38BDF8" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, compact && styles.titleCompact]}>{t('nutrition.water.dailyGoal')}</Text>
        <Text style={styles.value}>{liters.toFixed(1)} L</Text>
        <Text style={styles.hint}>{t('nutrition.water.basedOnProfile', { weight: weightKg })}</Text>
        <Text style={styles.cups}>{t('nutrition.water.cupsHint', { count: cups })}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  cardCompact: {
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(56,189,248,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 },
  titleCompact: { fontSize: 11 },
  value: { color: colors.text, fontSize: 28, fontWeight: '900', marginTop: 2 },
  hint: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 4 },
  cups: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 6 },
});
