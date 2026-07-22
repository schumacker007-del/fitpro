import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { colors, radius } from '../theme';

type AnimationKind = 'squat' | 'pushup' | 'jump' | 'lunge' | 'plank' | 'row' | 'curl' | 'stretch';

interface Props {
  kind: AnimationKind;
  size?: number;
}

/**
 * Demonstração animada leve e 100% vetorial (sem vídeo/gif externo) que ilustra
 * o padrão de movimento de cada exercício usando um "boneco" simplificado.
 */
export default function ExerciseAnimation({ kind, size = 220 }: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [kind, progress]);

  const bodyTranslateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, kind === 'squat' || kind === 'lunge' ? 34 : kind === 'jump' ? -30 : 0],
  });

  const armRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      '0deg',
      kind === 'pushup' ? '-18deg' : kind === 'row' ? '35deg' : kind === 'curl' ? '70deg' : kind === 'jump' ? '160deg' : '0deg',
    ],
  });

  const legRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      '0deg',
      kind === 'jump' ? '25deg' : kind === 'lunge' ? '30deg' : '0deg',
    ],
  });

  const torsoRotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      '0deg',
      kind === 'pushup' || kind === 'plank' ? '-6deg' : kind === 'row' ? '18deg' : kind === 'stretch' ? '-10deg' : '0deg',
    ],
  });

  const isHorizontal = kind === 'pushup' || kind === 'plank';

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <View style={styles.groundLine} />
      <Animated.View
        style={[
          styles.figure,
          isHorizontal && styles.figureHorizontal,
          {
            transform: [
              { translateY: bodyTranslateY },
              { rotate: isHorizontal ? '0deg' : ('0deg' as unknown as string) },
            ],
          },
        ]}
      >
        <View style={styles.head} />
        <Animated.View style={[styles.torso, { transform: [{ rotate: torsoRotate }] }]} />
        <View style={styles.limbRow}>
          <Animated.View style={[styles.arm, { transform: [{ rotate: armRotate }] }]} />
          <Animated.View
            style={[
              styles.leg,
              { transform: [{ rotate: legRotate as unknown as string }] },
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  groundLine: {
    position: 'absolute',
    bottom: 28,
    width: '70%',
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.border,
  },
  figure: {
    alignItems: 'center',
  },
  figureHorizontal: {
    transform: [{ rotate: '90deg' }],
  },
  head: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    marginBottom: 4,
  },
  torso: {
    width: 12,
    height: 54,
    borderRadius: 6,
    backgroundColor: colors.gold,
  },
  limbRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70,
    marginTop: -10,
  },
  arm: {
    width: 8,
    height: 42,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  leg: {
    width: 10,
    height: 46,
    borderRadius: 5,
    backgroundColor: colors.primaryDark,
  },
});
