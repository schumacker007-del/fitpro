import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { badgeDescriptionKey, badgeTitleKey } from '../i18n/muscleGroupLabel';
import { BADGES } from '../data/badges';
import { BadgeId } from '../types/gamification';
import { Card } from './ui';
import { colors, radius, spacing } from '../theme';

export default function BadgesSection() {
  const { snapshot } = useGamification();
  const { t } = useLanguage();
  const unlocked = new Set(snapshot.unlockedBadges);

  return (
    <Card>
      <Text style={styles.title}>{t('badges.title')}</Text>
      <Text style={styles.subtitle}>
        {t('badges.unlockedCount', { unlocked: snapshot.unlockedBadges.length, total: BADGES.length })}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {BADGES.map((badge) => (
          <BadgeChip key={badge.id} unlocked={unlocked.has(badge.id)} id={badge.id} lockedLabel={t('badges.locked')} t={t} />
        ))}
      </ScrollView>
    </Card>
  );
}

function BadgeChip({
  id,
  unlocked,
  lockedLabel,
  t,
}: {
  id: BadgeId;
  unlocked: boolean;
  lockedLabel: string;
  t: ReturnType<typeof useLanguage>['t'];
}) {
  const badge = BADGES.find((b) => b.id === id)!;
  return (
    <View style={[styles.chip, !unlocked && styles.chipLocked]}>
      <View style={[styles.iconWrap, { backgroundColor: unlocked ? `${badge.color}22` : colors.surfaceAlt }]}>
        <Ionicons
          name={badge.icon as keyof typeof Ionicons.glyphMap}
          size={22}
          color={unlocked ? badge.color : colors.textMuted}
        />
      </View>
      <Text style={[styles.chipTitle, !unlocked && styles.lockedText]} numberOfLines={2}>
        {t(badgeTitleKey(id))}
      </Text>
      <Text style={styles.chipDesc} numberOfLines={2}>
        {unlocked ? t(badgeDescriptionKey(id)) : lockedLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontWeight: '800', fontSize: 15 },
  subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2, marginBottom: spacing.md },
  row: { gap: spacing.sm, paddingRight: spacing.sm },
  chip: {
    width: 118,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipLocked: { opacity: 0.55 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  chipTitle: { color: colors.text, fontSize: 12, fontWeight: '800' },
  chipDesc: { color: colors.textMuted, fontSize: 10, marginTop: 3, lineHeight: 13 },
  lockedText: { color: colors.textMuted },
});
