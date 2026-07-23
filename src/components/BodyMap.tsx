import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';
import Svg, { Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';
import { getMuscleGroup } from '../data/muscleGroups';
import { colors, radius } from '../theme';
import { MuscleGroupId } from '../types';

const FRONT_IMAGE = require('../../assets/body/front.png');
const BACK_IMAGE = require('../../assets/body/back.png');
// Dimensões reais dos PNGs gerados — usadas como espaço de coordenadas pras regiões abaixo.
const IMG_W = 1024;
const IMG_H = 1536;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Region {
  muscle: MuscleGroupId;
  boxes: Box[];
}

// Coordenadas estimadas visualmente sobre a ilustração gerada (frente/costas).
const FRONT_REGIONS: Region[] = [
  { muscle: 'ombros', boxes: [{ x: 164, y: 238, w: 205, h: 169 }, { x: 655, y: 238, w: 205, h: 169 }] },
  { muscle: 'peito', boxes: [{ x: 300, y: 284, w: 200, h: 223 }, { x: 524, y: 284, w: 200, h: 223 }] },
  { muscle: 'biceps', boxes: [{ x: 70, y: 292, w: 195, h: 300 }, { x: 759, y: 292, w: 195, h: 300 }] },
  { muscle: 'abdomen', boxes: [{ x: 348, y: 484, w: 328, h: 223 }] },
  { muscle: 'quadriceps', boxes: [{ x: 287, y: 707, w: 205, h: 308 }, { x: 532, y: 707, w: 205, h: 308 }] },
  { muscle: 'panturrilha', boxes: [{ x: 287, y: 1015, w: 205, h: 252 }, { x: 532, y: 1015, w: 205, h: 252 }] },
];

const BACK_REGIONS: Region[] = [
  { muscle: 'costas', boxes: [{ x: 164, y: 184, w: 696, h: 460 }] },
  { muscle: 'ombros', boxes: [{ x: 164, y: 238, w: 205, h: 169 }, { x: 655, y: 238, w: 205, h: 169 }] },
  { muscle: 'triceps', boxes: [{ x: 70, y: 292, w: 195, h: 300 }, { x: 759, y: 292, w: 195, h: 300 }] },
  { muscle: 'posterior_gluteos', boxes: [{ x: 287, y: 590, w: 450, h: 190 }, { x: 287, y: 707, w: 205, h: 308 }, { x: 532, y: 707, w: 205, h: 308 }] },
  { muscle: 'panturrilha', boxes: [{ x: 287, y: 1015, w: 205, h: 252 }, { x: 532, y: 1015, w: 205, h: 252 }] },
];

function coverage(regions: Region[], groups: MuscleGroupId[]) {
  return groups.filter((g) => regions.some((r) => r.muscle === g)).length;
}

function unionBox(boxes: Box[]) {
  return boxes.reduce(
    (acc, b) => ({
      minX: Math.min(acc.minX, b.x),
      minY: Math.min(acc.minY, b.y),
      maxX: Math.max(acc.maxX, b.x + b.w),
      maxY: Math.max(acc.maxY, b.y + b.h),
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  );
}

const FULL_BOX = { minX: 0, minY: 0, maxX: IMG_W, maxY: IMG_H };
const ZOOM_PADDING = 70;
const TARGET_ASPECT = 1; // crops de destaque ficam quadrados (como os cards de referência)

function normalizeAspect(box: { minX: number; minY: number; maxX: number; maxY: number }) {
  const w = box.maxX - box.minX;
  const h = box.maxY - box.minY;
  const cx = (box.minX + box.maxX) / 2;
  const cy = (box.minY + box.maxY) / 2;
  if (h / w < TARGET_ASPECT) {
    const newH = w * TARGET_ASPECT;
    return { minX: box.minX, maxX: box.maxX, minY: cy - newH / 2, maxY: cy + newH / 2 };
  }
  const newW = h / TARGET_ASPECT;
  return { minX: cx - newW / 2, maxX: cx + newW / 2, minY: box.minY, maxY: box.maxY };
}

interface Props {
  highlighted: MuscleGroupId[];
  size?: number;
  view?: 'front' | 'back';
  /** Se true (padrão), enquadra (zoom) na região do músculo destacado. */
  zoom?: boolean;
}

export default function BodyMap({ highlighted, size = 140, view, zoom = true }: Props) {
  const pulse = useRef(new Animated.Value(0)).current;
  const isIconOnly = highlighted.length > 0 && highlighted.every((g) => g === 'cardio' || g === 'mobilidade');
  const resolvedView =
    view ?? (coverage(BACK_REGIONS, highlighted) > coverage(FRONT_REGIONS, highlighted) ? 'back' : 'front');
  const regions = resolvedView === 'back' ? BACK_REGIONS : FRONT_REGIONS;
  const image = resolvedView === 'back' ? BACK_IMAGE : FRONT_IMAGE;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 900, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const glowOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0.95] });
  const primaryColor = highlighted.length ? getMuscleGroup(highlighted[0]).color : colors.primary;

  const matchedRegions = regions.filter((r) => highlighted.includes(r.muscle));
  const useZoom = zoom && !isIconOnly && matchedRegions.length > 0;

  let box = FULL_BOX;
  if (useZoom) {
    const raw = unionBox(matchedRegions.flatMap((r) => r.boxes));
    box = normalizeAspect({
      minX: Math.max(0, raw.minX - ZOOM_PADDING),
      minY: Math.max(0, raw.minY - ZOOM_PADDING),
      maxX: Math.min(IMG_W, raw.maxX + ZOOM_PADDING),
      maxY: Math.min(IMG_H, raw.maxY + ZOOM_PADDING),
    });
  }
  const boxW = box.maxX - box.minX;
  const boxH = box.maxY - box.minY;
  const scale = size / boxW;

  return (
    <View style={[styles.wrapper, { width: size, height: size * (boxH / boxW) }]}>
      <Image
        source={image}
        resizeMode="stretch"
        style={{
          position: 'absolute',
          left: -box.minX * scale,
          top: -box.minY * scale,
          width: IMG_W * scale,
          height: IMG_H * scale,
        }}
      />

      <Svg style={StyleSheet.absoluteFill} viewBox={`${box.minX} ${box.minY} ${boxW} ${boxH}`}>
        <Defs>
          {matchedRegions.map((region) => {
            const color = getMuscleGroup(region.muscle).color;
            return (
              <RadialGradient key={`grad-${region.muscle}`} id={`glow-${region.muscle}`} cx="50%" cy="50%" r="55%">
                <Stop offset="0%" stopColor={color} stopOpacity={0.95} />
                <Stop offset="65%" stopColor={color} stopOpacity={0.55} />
                <Stop offset="100%" stopColor={color} stopOpacity={0} />
              </RadialGradient>
            );
          })}
        </Defs>
        {matchedRegions.flatMap((region) =>
          region.boxes.map((b, i) => (
            <AnimatedGlowEllipse
              key={`${region.muscle}-${i}`}
              cx={b.x + b.w / 2}
              cy={b.y + b.h / 2}
              rx={(b.w / 2) * 1.25}
              ry={(b.h / 2) * 1.25}
              fill={`url(#glow-${region.muscle})`}
              opacity={glowOpacity}
            />
          ))
        )}
      </Svg>

      {isIconOnly ? (
        <Animated.View style={[styles.iconBadge, { opacity: glowOpacity, backgroundColor: primaryColor }]}>
          <Ionicons name={highlighted.includes('cardio') ? 'heart' : 'sparkles'} size={size * 0.16} color="#0B1210" />
        </Animated.View>
      ) : null}
    </View>
  );
}

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

function AnimatedGlowEllipse({
  cx,
  cy,
  rx,
  ry,
  fill,
  opacity,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill: string;
  opacity: Animated.AnimatedInterpolation<number>;
}) {
  return <AnimatedEllipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} opacity={opacity as unknown as number} />;
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: radius.md,
    backgroundColor: '#050810',
  },
  iconBadge: {
    position: 'absolute',
    left: '50%',
    top: '38%',
    width: '30%',
    aspectRatio: 1,
    marginLeft: '-15%',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
