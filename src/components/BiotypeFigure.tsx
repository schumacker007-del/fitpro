import React from 'react';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { BodyBiotypeId } from '../types';

interface Props {
  biotypeId: BodyBiotypeId;
  size?: number;
  color?: string;
}

type BodyShape = {
  shoulder: number;
  waist: number;
  hip: number;
  limb: number;
};

const SHAPES: Record<BodyBiotypeId, BodyShape> = {
  ectomorph: { shoulder: 14, waist: 10, hip: 11, limb: 1 },
  mesomorph: { shoulder: 20, waist: 12, hip: 14, limb: 1.05 },
  endomorph: { shoulder: 19, waist: 16, hip: 18, limb: 0.95 },
};

export default function BiotypeFigure({ biotypeId, size = 72, color = '#39FF14' }: Props) {
  const shape = SHAPES[biotypeId];
  const height = size * 1.35;

  return (
    <Svg width={size} height={height} viewBox="0 0 100 120">
      <Circle cx={50} cy={14} r={7} fill="none" stroke={color} strokeWidth={1.4} />
      <Line x1={50} y1={21} x2={50} y2={26} stroke={color} strokeWidth={1.2} />

      <Path
        d={`M ${50 - shape.shoulder} 28 Q ${50 - shape.waist} 45 50 50 Q ${50 + shape.waist} 45 ${50 + shape.shoulder} 28`}
        fill="none"
        stroke={color}
        strokeWidth={1.3}
      />

      <Path
        d={`M ${50 - shape.shoulder} 28 L ${50 - shape.shoulder - 7 * shape.limb} 48 L ${50 - shape.shoulder - 4 * shape.limb} 62`}
        fill="none"
        stroke={color}
        strokeWidth={1.1}
      />
      <Path
        d={`M ${50 + shape.shoulder} 28 L ${50 + shape.shoulder + 7 * shape.limb} 48 L ${50 + shape.shoulder + 4 * shape.limb} 62`}
        fill="none"
        stroke={color}
        strokeWidth={1.1}
      />

      <Path
        d={`M ${50 - shape.hip} 55 L ${50 - 9 * shape.limb} 72 L ${50 - 8 * shape.limb} 95 L ${50 - 12} 108`}
        fill="none"
        stroke={color}
        strokeWidth={1.1}
      />
      <Path
        d={`M ${50 + shape.hip} 55 L ${50 + 9 * shape.limb} 72 L ${50 + 8 * shape.limb} 95 L ${50 + 12} 108`}
        fill="none"
        stroke={color}
        strokeWidth={1.1}
      />
    </Svg>
  );
}
