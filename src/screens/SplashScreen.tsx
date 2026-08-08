import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { colors, spacing } from '../theme';

const SPLASH_IMAGE = require('../../assets/splash/splash-hero.png');
const SPLASH_MAX_MS = 2500;
const SPLASH_MIN_MS = 600;
const SPLASH_EMERGENCY_MS = 10000;

interface Props {
  onFinish: () => void;
  /** Auth + profile loaded — splash can end after minimum display time. */
  ready?: boolean;
  /** Static frame — skip timers/animations while gate loads underneath. */
  frozen?: boolean;
}

export default function SplashScreen({ onFinish, ready = false, frozen = false }: Props) {
  const { t } = useLanguage();
  const opacity = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const [finished, setFinished] = useState(false);
  const readySince = useRef<number | null>(null);

  const finish = useCallback(() => {
    if (finished) return;
    setFinished(true);
    onFinish();
  }, [finished, onFinish]);

  useEffect(() => {
    if (frozen) return;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: SPLASH_MAX_MS,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  }, [opacity, progress]);

  useEffect(() => {
    if (frozen || !ready || finished) return;
    if (readySince.current == null) readySince.current = Date.now();
    const elapsed = Date.now() - readySince.current;
    const wait = Math.max(0, SPLASH_MIN_MS - elapsed);
    const timer = setTimeout(finish, wait);
    return () => clearTimeout(timer);
  }, [ready, finished, finish]);

  useEffect(() => {
    if (frozen || !ready || finished) return;
    const maxTimer = setTimeout(finish, SPLASH_MAX_MS);
    return () => clearTimeout(maxTimer);
  }, [ready, finished, finish]);

  useEffect(() => {
    if (frozen) return;
    const emergencyTimer = setTimeout(finish, SPLASH_EMERGENCY_MS);
    return () => clearTimeout(emergencyTimer);
  }, [finish, frozen]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Pressable
      style={styles.root}
      onPress={frozen ? undefined : finish}
      accessibilityRole="button"
      accessibilityLabel={t('splash.skip')}
      disabled={frozen}
    >
      <Animated.View style={[styles.hero, { opacity }]}>
        <Image source={SPLASH_IMAGE} style={StyleSheet.absoluteFill} resizeMode="cover" />
      </Animated.View>

      <LinearGradient
        colors={['transparent', 'rgba(5,8,16,0.35)', 'rgba(5,8,16,0.9)']}
        locations={[0.5, 0.78, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={styles.copy} pointerEvents="none">
        <Text style={styles.logo}>FitPro</Text>
        <Text style={styles.tagline}>{t('splash.tagline')}</Text>
      </View>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      <Text style={styles.skipHint}>{t('splash.skip')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#050810' },
  hero: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  copy: {
    position: 'absolute',
    bottom: 72,
    left: spacing.xl,
    right: spacing.xl,
  },
  logo: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  tagline: {
    color: 'rgba(248,250,252,0.78)',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    lineHeight: 20,
  },
  progressTrack: {
    position: 'absolute',
    bottom: 48,
    left: spacing.xl,
    right: spacing.xl,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  skipHint: {
    position: 'absolute',
    bottom: spacing.md,
    alignSelf: 'center',
    color: 'rgba(248,250,252,0.45)',
    fontSize: 11,
    fontWeight: '600',
  },
});
