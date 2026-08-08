import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius } from '../theme';

interface Props {
  source: number;
  title: string;
  subtitle?: string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}

export default function TrainingVideoClip({
  source,
  title,
  subtitle,
  width = 132,
  height = 176,
  fullWidth = false,
  style,
  onPress,
}: Props) {
  const content = (
    <View
      style={[
        styles.clip,
        fullWidth ? styles.fullWidth : { width },
        { height },
        style,
      ]}
    >
      <Video
        source={source}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />
      <LinearGradient
        colors={['transparent', 'rgba(5,8,16,0.55)', 'rgba(5,8,16,0.92)']}
        locations={[0.35, 0.72, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.labelWrap} pointerEvents="none">
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.88 : 1 }]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  clip: {
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fullWidth: { width: '100%', alignSelf: 'stretch' },
  labelWrap: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
  },
  subtitle: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 16,
  },
});
