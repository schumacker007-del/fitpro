import React from 'react';
import { Animated } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, Line, LinearGradient, Path, RadialGradient, Stop } from 'react-native-svg';

export type MuscleHighlight = 'chest' | 'shoulders' | 'arms' | 'core' | 'legs' | 'glutes';

interface Props {
  gender: 'male' | 'female';
  size?: number;
  rotation: Animated.AnimatedInterpolation<number>;
  highlight: MuscleHighlight;
  highlightOpacity: Animated.AnimatedInterpolation<number>;
}

const HIGHLIGHT_COLORS: Record<MuscleHighlight, string> = {
  chest: '#FF6B6B',
  shoulders: '#F4B740',
  arms: '#34D399',
  core: '#FF6B4A',
  legs: '#60A5FA',
  glutes: '#C084FC',
};

const HIGHLIGHT_REGIONS: Record<MuscleHighlight, { cx: number; cy: number; rx: number; ry: number }> = {
  chest: { cx: 50, cy: 38, rx: 14, ry: 10 },
  shoulders: { cx: 50, cy: 30, rx: 22, ry: 8 },
  arms: { cx: 50, cy: 48, rx: 26, ry: 12 },
  core: { cx: 50, cy: 52, rx: 11, ry: 10 },
  legs: { cx: 50, cy: 78, rx: 16, ry: 22 },
  glutes: { cx: 50, cy: 62, rx: 14, ry: 8 },
};

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

export default function WireframeFigure({ gender, size = 160, rotation, highlight, highlightOpacity }: Props) {
  const isFemale = gender === 'female';
  const waist = isFemale ? 11 : 13;
  const hip = isFemale ? 15 : 13;
  const shoulder = isFemale ? 17 : 20;
  const gradId = `bodyGrad-${gender}`;
  const glowId = `glow-${gender}-${highlight}`;

  return (
    <Animated.View
      style={{
        width: size,
        height: size * 1.35,
        transform: [{ scaleX: rotation }],
      }}
    >
      <Svg width="100%" height="100%" viewBox="0 0 100 120">
        <Defs>
          <LinearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.95" />
            <Stop offset="100%" stopColor="#22D3EE" stopOpacity="0.75" />
          </LinearGradient>
          <RadialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={HIGHLIGHT_COLORS[highlight]} stopOpacity="0.9" />
            <Stop offset="100%" stopColor={HIGHLIGHT_COLORS[highlight]} stopOpacity="0" />
          </RadialGradient>
        </Defs>

        <Ellipse cx={50} cy={112} rx={28} ry={5} fill="#22D3EE" opacity={0.2} />

        <Circle cx={50} cy={14} r={7} fill="none" stroke={`url(#${gradId})`} strokeWidth={1.2} />
        <Circle cx={50} cy={14} r={4.5} fill="#22D3EE" opacity={0.08} />

        <Line x1={50} y1={21} x2={50} y2={26} stroke="#22D3EE" strokeWidth={1.2} />

        <Path
          d={`M ${50 - shoulder} 28 Q ${50 - waist} 45 50 50 Q ${50 + waist} 45 ${50 + shoulder} 28`}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={1.1}
        />
        <Line x1={50 - shoulder} y1={28} x2={50 + shoulder} y2={28} stroke="#22D3EE" strokeWidth={0.8} opacity={0.6} />
        <Line x1={50 - waist} y1={45} x2={50 + waist} y2={45} stroke="#22D3EE" strokeWidth={0.7} opacity={0.5} />

        <Path
          d={`M ${50 - shoulder} 28 L ${50 - shoulder - 8} 48 L ${50 - shoulder - 5} 62`}
          fill="none"
          stroke="#22D3EE"
          strokeWidth={1}
        />
        <Path
          d={`M ${50 + shoulder} 28 L ${50 + shoulder + 8} 48 L ${50 + shoulder + 5} 62`}
          fill="none"
          stroke="#22D3EE"
          strokeWidth={1}
        />
        <Circle cx={50 - shoulder - 8} cy={48} r={2} fill="#5EEAD4" opacity={0.8} />
        <Circle cx={50 + shoulder + 8} cy={48} r={2} fill="#5EEAD4" opacity={0.8} />

        <Path
          d={`M ${50 - hip} 55 L ${50 - 9} 72 L ${50 - 8} 95 L ${50 - 12} 108`}
          fill="none"
          stroke="#22D3EE"
          strokeWidth={1}
        />
        <Path
          d={`M ${50 + hip} 55 L ${50 + 9} 72 L ${50 + 8} 95 L ${50 + 12} 108`}
          fill="none"
          stroke="#22D3EE"
          strokeWidth={1}
        />
        <Circle cx={50 - 9} cy={72} r={2.2} fill="#5EEAD4" opacity={0.7} />
        <Circle cx={50 + 9} cy={72} r={2.2} fill="#5EEAD4" opacity={0.7} />
        <Circle cx={50 - 8} cy={95} r={2} fill="#5EEAD4" opacity={0.6} />
        <Circle cx={50 + 8} cy={95} r={2} fill="#5EEAD4" opacity={0.6} />

        <Line x1={50} y1={28} x2={50} y2={55} stroke="#22D3EE" strokeWidth={0.5} opacity={0.35} />
        <Line x1={50 - 8} y1={35} x2={50 + 8} y2={35} stroke="#22D3EE" strokeWidth={0.4} opacity={0.3} />
        <Line x1={50 - 6} y1={48} x2={50 + 6} y2={48} stroke="#22D3EE" strokeWidth={0.4} opacity={0.3} />

        <AnimatedEllipse
          cx={HIGHLIGHT_REGIONS[highlight].cx}
          cy={HIGHLIGHT_REGIONS[highlight].cy}
          rx={HIGHLIGHT_REGIONS[highlight].rx}
          ry={HIGHLIGHT_REGIONS[highlight].ry}
          fill={`url(#${glowId})`}
          opacity={highlightOpacity as unknown as number}
        />
      </Svg>
    </Animated.View>
  );
}
