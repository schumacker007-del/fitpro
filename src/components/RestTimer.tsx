import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, Vibration, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { colors, radius, spacing } from '../theme';

interface Props {
  seconds: number;
  onComplete: () => void;
  onSkip: () => void;
}

export default function RestTimer({ seconds, onComplete, onSkip }: Props) {
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState(seconds);
  const completedRef = useRef(false);

  useEffect(() => {
    setRemaining(seconds);
    completedRef.current = false;
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      if (!completedRef.current) {
        completedRef.current = true;
        Vibration.vibrate([0, 250, 100, 250]);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        onComplete();
      }
      return;
    }
    const timeout = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const mm = Math.floor(remaining / 60).toString().padStart(2, '0');
  const ss = Math.floor(remaining % 60)
    .toString()
    .padStart(2, '0');
  const progress = seconds > 0 ? 1 - remaining / seconds : 1;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{t('workout.rest.label')}</Text>
      <View style={styles.ring}>
        <Text style={styles.time}>
          {mm}:{ss}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.min(100, progress * 100)}%` }]} />
      </View>
      <Pressable
        style={styles.skipBtn}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          onSkip();
        }}
      >
        <Ionicons name="play-skip-forward" size={16} color={colors.text} />
        <Text style={styles.skipText}>{t('workout.rest.skip')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: spacing.lg },
  label: { color: colors.textMuted, fontWeight: '800', fontSize: 12, letterSpacing: 2, marginBottom: spacing.md },
  ring: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 6,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  time: { color: colors.text, fontSize: 40, fontWeight: '800' },
  progressTrack: {
    width: '80%',
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  progressFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 3 },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skipText: { color: colors.text, fontWeight: '700', fontSize: 13 },
});
