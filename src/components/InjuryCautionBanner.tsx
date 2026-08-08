import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { INJURY_LABEL_KEYS, ActiveInjuryArea } from '../data/injuryMuscleMap';
import { colors, radius, spacing } from '../theme';

interface InjuryCautionBannerProps {
  injuries: ActiveInjuryArea[];
  compact?: boolean;
}

export default function InjuryCautionBanner({ injuries, compact }: InjuryCautionBannerProps) {
  const { t } = useLanguage();

  if (!injuries.length) return null;

  const areaLabels = injuries.map((injury) => t(INJURY_LABEL_KEYS[injury])).join(', ');

  return (
    <View style={[styles.wrap, compact && styles.wrapCompact]}>
      <Ionicons name="warning-outline" size={compact ? 14 : 16} color={colors.gold} />
      <View style={{ flex: 1 }}>
        {!compact ? <Text style={styles.title}>{t('injury.cautionTitle')}</Text> : null}
        <Text style={[styles.message, compact && styles.messageCompact]}>
          {compact
            ? t('injury.cautionShort', { areas: areaLabels })
            : t('injury.cautionMessage', { areas: areaLabels })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: 'rgba(244,183,64,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(244,183,64,0.35)',
  },
  wrapCompact: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  title: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 2,
  },
  message: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 17,
  },
  messageCompact: {
    fontSize: 11,
    lineHeight: 15,
  },
});
