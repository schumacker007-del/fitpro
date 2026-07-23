import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';
import Svg, { Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';
import { colors, radius } from '../theme';

type AnimationKind = 'squat' | 'pushup' | 'jump' | 'lunge' | 'plank' | 'row' | 'curl' | 'stretch';

interface Props {
  kind: AnimationKind;
  size?: number;
  /** Cor de destaque do músculo trabalhado (vem do grupo muscular do exercício). */
  highlightColor?: string;
  /** Mantido por compatibilidade. */
  freezeAt?: number;
}

// Pose "de trabalho" (contração / pico do movimento).
const POSE_WORK: Record<AnimationKind, any> = {
  squat: require('../../assets/poses/squat.png'),
  pushup: require('../../assets/poses/pushup.png'),
  jump: require('../../assets/poses/jump.png'),
  lunge: require('../../assets/poses/lunge.png'),
  plank: require('../../assets/poses/plank.png'),
  row: require('../../assets/poses/row.png'),
  curl: require('../../assets/poses/curl.png'),
  stretch: require('../../assets/poses/stretch.png'),
};

// Pose "de partida" (retorno / preparação). Isométricos (plank) não têm segunda pose.
const POSE_REST: Partial<Record<AnimationKind, any>> = {
  squat: require('../../assets/poses/squat_2.png'),
  pushup: require('../../assets/poses/pushup_2.png'),
  jump: require('../../assets/poses/jump_2.png'),
  lunge: require('../../assets/poses/lunge_2.png'),
  row: require('../../assets/poses/row_2.png'),
  curl: require('../../assets/poses/curl_2.png'),
  stretch: require('../../assets/poses/stretch_2.png'),
};

// Região aproximada (fração 0-1 da imagem) do músculo em destaque em cada pose.
const GLOW_BOX: Record<AnimationKind, { x: number; y: number; w: number; h: number } | null> = {
  squat: { x: 0.12, y: 0.45, w: 0.48, h: 0.4 },
  pushup: { x: 0.4, y: 0.32, w: 0.32, h: 0.4 },
  jump: { x: 0.14, y: 0.5, w: 0.72, h: 0.42 },
  lunge: { x: 0.1, y: 0.42, w: 0.4, h: 0.36 },
  plank: { x: 0.34, y: 0.28, w: 0.32, h: 0.4 },
  row: { x: 0.28, y: 0.13, w: 0.42, h: 0.3 },
  curl: { x: 0.33, y: 0.14, w: 0.4, h: 0.24 },
  stretch: null,
};

export default function ExerciseAnimation({ kind, size = 220, highlightColor }: Props) {
  const move = useRef(new Animated.Value(0)).current;
  const glowColor = highlightColor ?? colors.primary;
  const glowBox = GLOW_BOX[kind];
  const restImage = POSE_REST[kind];

  useEffect(() => {
    // Ciclo: pausa na posição de partida -> movimento até o pico -> pausa no pico -> volta.
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(280),
        Animated.timing(move, { toValue: 1, duration: 620, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
        Animated.delay(320),
        Animated.timing(move, { toValue: 0, duration: 620, easing: Easing.in(Easing.cubic), useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [kind, move]);

  const workOpacity = move; // 0 (pose de partida) -> 1 (pose de trabalho)
  const restOpacity = move.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const scale = move.interpolate({ inputRange: [0, 1], outputRange: [1, 1.035] });
  const glowOpacity = move.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.95] });

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Animated.View style={[styles.inner, { transform: [{ scale }] }]}>
        {restImage ? (
          <Animated.Image
            source={restImage}
            resizeMode="contain"
            style={[styles.image, styles.layered, { opacity: restOpacity }]}
          />
        ) : null}
        <Animated.Image
          source={POSE_WORK[kind]}
          resizeMode="contain"
          style={[styles.image, styles.layered, { opacity: restImage ? workOpacity : 1 }]}
        />
        {glowBox ? (
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 100" preserveAspectRatio="none">
            <Defs>
              <RadialGradient id="exGlow" cx="50%" cy="50%" r="55%">
                <Stop offset="0%" stopColor={glowColor} stopOpacity={0.85} />
                <Stop offset="65%" stopColor={glowColor} stopOpacity={0.4} />
                <Stop offset="100%" stopColor={glowColor} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <AnimatedGlow box={glowBox} opacity={glowOpacity} />
          </Svg>
        ) : null}
      </Animated.View>
    </View>
  );
}

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

function AnimatedGlow({
  box,
  opacity,
}: {
  box: { x: number; y: number; w: number; h: number };
  opacity: Animated.AnimatedInterpolation<number>;
}) {
  const cx = (box.x + box.w / 2) * 100;
  const cy = (box.y + box.h / 2) * 100;
  const rx = (box.w / 2) * 100 * 1.15;
  const ry = (box.h / 2) * 100 * 1.15;
  return <AnimatedEllipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#exGlow)" opacity={opacity as unknown as number} />;
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050810',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  inner: { width: '92%', height: '92%' },
  image: { width: '100%', height: '100%' },
  layered: { position: 'absolute', top: 0, left: 0 },
});
