import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';
import { getMuscleGroup } from '../data/muscleGroups';
import { colors } from '../theme';
import { MuscleGroupId } from '../types';

interface Region {
  key: string;
  style: ViewStyle;
  circle?: boolean;
}

// Silhueta estilizada (não anatômica em detalhe) montada com blocos posicionados
// em percentual, pra funcionar em qualquer tamanho de tela sem precisar de imagens.
const OUTLINE_REGIONS: Region[] = [
  { key: 'head', circle: true, style: { left: '38%', top: '0%', width: '24%', height: '12%' } },
  { key: 'neck', style: { left: '43%', top: '11%', width: '14%', height: '5%', borderRadius: 6 } },
  { key: 'shoulder-l', style: { left: '14%', top: '15%', width: '22%', height: '11%', borderRadius: 12 } },
  { key: 'shoulder-r', style: { left: '64%', top: '15%', width: '22%', height: '11%', borderRadius: 12 } },
  { key: 'arm-l', style: { left: '4%', top: '17%', width: '15%', height: '24%', borderRadius: 10 } },
  { key: 'arm-r', style: { left: '81%', top: '17%', width: '15%', height: '24%', borderRadius: 10 } },
  { key: 'forearm-l', style: { left: '2%', top: '39%', width: '13%', height: '20%', borderRadius: 8 } },
  { key: 'forearm-r', style: { left: '85%', top: '39%', width: '13%', height: '20%', borderRadius: 8 } },
  { key: 'torso', style: { left: '28%', top: '17%', width: '44%', height: '20%', borderRadius: 14 } },
  { key: 'core', style: { left: '32%', top: '35%', width: '36%', height: '18%', borderRadius: 10 } },
  { key: 'hips', style: { left: '28%', top: '51%', width: '44%', height: '12%', borderRadius: 14 } },
  { key: 'thigh-l', style: { left: '29%', top: '62%', width: '18%', height: '24%', borderRadius: 10 } },
  { key: 'thigh-r', style: { left: '53%', top: '62%', width: '18%', height: '24%', borderRadius: 10 } },
  { key: 'calf-l', style: { left: '30%', top: '85%', width: '15%', height: '15%', borderRadius: 8 } },
  { key: 'calf-r', style: { left: '55%', top: '85%', width: '15%', height: '15%', borderRadius: 8 } },
];

const HIGHLIGHT_REGIONS: Partial<Record<MuscleGroupId, Region[]>> = {
  ombros: [
    { key: 'h-shoulder-l', style: { left: '14%', top: '15%', width: '22%', height: '11%', borderRadius: 12 } },
    { key: 'h-shoulder-r', style: { left: '64%', top: '15%', width: '22%', height: '11%', borderRadius: 12 } },
  ],
  peito: [{ key: 'h-chest', style: { left: '28%', top: '17%', width: '44%', height: '20%', borderRadius: 14 } }],
  costas: [{ key: 'h-back', style: { left: '28%', top: '17%', width: '44%', height: '20%', borderRadius: 14 } }],
  biceps: [
    { key: 'h-bicep-l', style: { left: '4%', top: '17%', width: '15%', height: '24%', borderRadius: 10 } },
    { key: 'h-bicep-r', style: { left: '81%', top: '17%', width: '15%', height: '24%', borderRadius: 10 } },
  ],
  triceps: [
    { key: 'h-tricep-l', style: { left: '4%', top: '17%', width: '15%', height: '24%', borderRadius: 10 } },
    { key: 'h-tricep-r', style: { left: '81%', top: '17%', width: '15%', height: '24%', borderRadius: 10 } },
  ],
  abdomen: [{ key: 'h-core', style: { left: '32%', top: '35%', width: '36%', height: '18%', borderRadius: 10 } }],
  gluteos: [{ key: 'h-hips', style: { left: '28%', top: '51%', width: '44%', height: '12%', borderRadius: 14 } }],
  pernas: [
    { key: 'h-thigh-l', style: { left: '29%', top: '62%', width: '18%', height: '24%', borderRadius: 10 } },
    { key: 'h-thigh-r', style: { left: '53%', top: '62%', width: '18%', height: '24%', borderRadius: 10 } },
  ],
};

interface Props {
  highlighted: MuscleGroupId[];
  size?: number;
}

export default function BodyMap({ highlighted, size = 140 }: Props) {
  const pulse = useRef(new Animated.Value(0)).current;
  const isIconOnly = highlighted.every((g) => g === 'cardio' || g === 'mobilidade');

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 900, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 1] });
  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });

  const primaryColor = highlighted.length ? getMuscleGroup(highlighted[0]).color : colors.primary;

  return (
    <View style={[styles.wrapper, { width: size, height: size * 1.9 }]}>
      {OUTLINE_REGIONS.map((region) => (
        <View
          key={region.key}
          style={[
            styles.outlinePiece,
            region.style,
            region.circle && styles.circlePiece,
          ]}
        />
      ))}

      {highlighted.flatMap((groupId) => {
        const regions = HIGHLIGHT_REGIONS[groupId];
        if (!regions) return [];
        const color = getMuscleGroup(groupId).color;
        return regions.map((region) => (
          <Animated.View
            key={region.key}
            style={[
              styles.highlightPiece,
              region.style,
              region.circle && styles.circlePiece,
              { backgroundColor: color, opacity, transform: [{ scale }] },
            ]}
          />
        ));
      })}

      {isIconOnly ? (
        <Animated.View style={[styles.iconBadge, { opacity, transform: [{ scale }], backgroundColor: primaryColor }]}>
          <Ionicons name={highlighted.includes('cardio') ? 'heart' : 'sparkles'} size={size * 0.16} color="#0B1210" />
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
  },
  outlinePiece: {
    position: 'absolute',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  highlightPiece: {
    position: 'absolute',
  },
  circlePiece: {
    borderRadius: 999,
    aspectRatio: 1,
  },
  iconBadge: {
    position: 'absolute',
    left: '50%',
    top: '42%',
    width: '30%',
    aspectRatio: 1,
    marginLeft: '-15%',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
