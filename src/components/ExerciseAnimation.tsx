import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Rect, Stop } from 'react-native-svg';
import { colors, radius } from '../theme';

type AnimationKind = 'squat' | 'pushup' | 'jump' | 'lunge' | 'plank' | 'row' | 'curl' | 'stretch';

interface Props {
  kind: AnimationKind;
  size?: number;
  /** Cor de destaque do músculo trabalhado (vem do grupo muscular do exercício). */
  highlightColor?: string;
}

const AnimatedG = Animated.createAnimatedComponent(G);

// --- Pontos de articulação (pose neutra, corpo de perfil olhando pra direita) ---
const SHOULDER = { x: 104, y: 64 };
const ELBOW = { x: 104, y: 112 };
const HIP_FRONT = { x: 98, y: 132 };
const KNEE_FRONT = { x: 98, y: 186 };
const HIP_BACK = { x: 80, y: 132 };
const KNEE_BACK = { x: 80, y: 186 };

type Range = [number, number];
interface JointConfig {
  shoulder?: Range;
  elbow?: Range;
  frontHip?: Range;
  frontKnee?: Range;
  backHip?: Range;
  backKnee?: Range;
  bodyY?: Range;
  wholeRotation?: number;
  torsoLean?: number;
  glowZone?: 'torso' | 'arm' | 'leg' | 'core' | 'none';
}

const JOINTS: Record<AnimationKind, JointConfig> = {
  squat: {
    shoulder: [0, -25],
    elbow: [0, 15],
    frontHip: [0, 48],
    frontKnee: [0, -78],
    backHip: [0, 44],
    backKnee: [0, -74],
    bodyY: [0, 26],
    glowZone: 'leg',
  },
  lunge: {
    shoulder: [0, -10],
    elbow: [0, 10],
    frontHip: [0, 38],
    frontKnee: [0, -75],
    backHip: [0, -22],
    backKnee: [0, -34],
    bodyY: [0, 14],
    glowZone: 'leg',
  },
  jump: {
    shoulder: [10, -155],
    elbow: [0, -10],
    frontHip: [0, -18],
    frontKnee: [0, 10],
    backHip: [0, 18],
    backKnee: [0, -10],
    bodyY: [0, -22],
    glowZone: 'leg',
  },
  pushup: {
    shoulder: [-6, -18],
    elbow: [-8, -68],
    frontHip: [0, -6],
    frontKnee: [0, 4],
    backHip: [0, -4],
    backKnee: [0, 4],
    wholeRotation: 90,
    glowZone: 'torso',
  },
  plank: {
    shoulder: [-4, 2],
    elbow: [-2, 4],
    frontHip: [0, 3],
    backHip: [0, -3],
    wholeRotation: 90,
    glowZone: 'core',
  },
  row: {
    shoulder: [10, -70],
    elbow: [20, -85],
    frontHip: [0, 6],
    backHip: [0, -4],
    torsoLean: 34,
    glowZone: 'torso',
  },
  curl: {
    shoulder: [6, -4],
    elbow: [0, -115],
    frontHip: [0, 2],
    backHip: [0, -2],
    glowZone: 'arm',
  },
  stretch: {
    shoulder: [-40, -70],
    elbow: [0, -15],
    frontHip: [0, 4],
    backHip: [0, -4],
    torsoLean: 0,
    glowZone: 'none',
  },
};

function lighten(hex: string) {
  // Clareia levemente uma cor hex pra criar um leve gradiente "3D" no preenchimento.
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 255) + 45);
  const g = Math.min(255, ((num >> 8) & 255) + 45);
  const b = Math.min(255, (num & 255) + 45);
  return `rgb(${r},${g},${b})`;
}

export default function ExerciseAnimation({ kind, size = 220, highlightColor }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const config = JOINTS[kind];
  const glowColor = highlightColor ?? colors.primary;

  useEffect(() => {
    progress.setValue(0);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 950,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 950,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [kind, progress]);

  const angle = (range?: Range) => (range ? progress.interpolate({ inputRange: [0, 1], outputRange: range }) : 0);
  const glowOpacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.7] });
  const glowScale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.15] });

  const bodyColor = '#C7CEDD';
  const bodyId = `body-${kind}`;

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Svg viewBox="0 0 200 240" width="100%" height="100%">
        <Defs>
          <LinearGradient id={bodyId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={lighten(bodyColor)} />
            <Stop offset="1" stopColor={bodyColor} />
          </LinearGradient>
        </Defs>

        <AnimatedG
          originX={95}
          originY={130}
          rotation={config.wholeRotation ?? 0}
          y={angle(config.bodyY) as unknown as number}
        >
          {/* Perna de trás */}
          <AnimatedG originX={HIP_BACK.x} originY={HIP_BACK.y} rotation={angle(config.backHip) as unknown as number}>
            <Rect x={HIP_BACK.x - 9} y={HIP_BACK.y} width={18} height={52} rx={9} fill={`url(#${bodyId})`} stroke={colors.background} strokeWidth={2.5} />
            <AnimatedG originX={KNEE_BACK.x} originY={KNEE_BACK.y} rotation={angle(config.backKnee) as unknown as number}>
              <Rect x={KNEE_BACK.x - 7} y={KNEE_BACK.y} width={14} height={46} rx={7} fill={`url(#${bodyId})`} stroke={colors.background} strokeWidth={2.5} />
              <Ellipse cx={KNEE_BACK.x} cy={KNEE_BACK.y + 50} rx={10} ry={6} fill={bodyColor} stroke={colors.background} strokeWidth={2.5} />
            </AnimatedG>
          </AnimatedG>

          {/* Tronco + cabeça + braço */}
          <G rotation={config.torsoLean ?? 0} originX={95} originY={130}>
            {config.glowZone === 'torso' || config.glowZone === 'core' ? (
              <AnimatedGlow cx={95} cy={95} rx={30} ry={42} color={glowColor} opacity={glowOpacity} scale={glowScale} />
            ) : null}

            <Rect x={72} y={56} width={46} height={80} rx={20} fill={`url(#${bodyId})`} stroke={colors.background} strokeWidth={2.5} />
            <Circle cx={98} cy={34} r={19} fill={`url(#${bodyId})`} stroke={colors.background} strokeWidth={2.5} />

            <AnimatedG originX={SHOULDER.x} originY={SHOULDER.y} rotation={angle(config.shoulder) as unknown as number}>
              {config.glowZone === 'arm' ? (
                <AnimatedGlow cx={SHOULDER.x} cy={SHOULDER.y + 24} rx={20} ry={26} color={glowColor} opacity={glowOpacity} scale={glowScale} />
              ) : null}
              <Rect x={SHOULDER.x - 8} y={SHOULDER.y} width={16} height={46} rx={8} fill={`url(#${bodyId})`} stroke={colors.background} strokeWidth={2.5} />
              <AnimatedG originX={ELBOW.x} originY={ELBOW.y} rotation={angle(config.elbow) as unknown as number}>
                <Rect x={ELBOW.x - 7} y={ELBOW.y} width={14} height={42} rx={7} fill={`url(#${bodyId})`} stroke={colors.background} strokeWidth={2.5} />
                <Circle cx={ELBOW.x} cy={ELBOW.y + 46} r={7} fill={bodyColor} stroke={colors.background} strokeWidth={2.5} />
              </AnimatedG>
            </AnimatedG>
          </G>

          {/* Perna da frente */}
          <AnimatedG originX={HIP_FRONT.x} originY={HIP_FRONT.y} rotation={angle(config.frontHip) as unknown as number}>
            {config.glowZone === 'leg' ? (
              <AnimatedGlow cx={HIP_FRONT.x} cy={HIP_FRONT.y + 30} rx={22} ry={34} color={glowColor} opacity={glowOpacity} scale={glowScale} />
            ) : null}
            <Rect x={HIP_FRONT.x - 10} y={HIP_FRONT.y} width={20} height={54} rx={10} fill={`url(#${bodyId})`} stroke={colors.background} strokeWidth={2.5} />
            <AnimatedG originX={KNEE_FRONT.x} originY={KNEE_FRONT.y} rotation={angle(config.frontKnee) as unknown as number}>
              <Rect x={KNEE_FRONT.x - 8} y={KNEE_FRONT.y} width={16} height={48} rx={8} fill={`url(#${bodyId})`} stroke={colors.background} strokeWidth={2.5} />
              <Ellipse cx={KNEE_FRONT.x + 6} cy={KNEE_FRONT.y + 50} rx={12} ry={7} fill={bodyColor} stroke={colors.background} strokeWidth={2.5} />
            </AnimatedG>
          </AnimatedG>
        </AnimatedG>
      </Svg>
    </View>
  );
}

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

function AnimatedGlow({
  cx,
  cy,
  rx,
  ry,
  color,
  opacity,
  scale,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  color: string;
  opacity: Animated.AnimatedInterpolation<number>;
  scale: Animated.AnimatedInterpolation<number>;
}) {
  return (
    <AnimatedEllipse
      cx={cx}
      cy={cy}
      rx={Animated.multiply(rx, scale) as unknown as number}
      ry={Animated.multiply(ry, scale) as unknown as number}
      fill={color}
      opacity={opacity as unknown as number}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
