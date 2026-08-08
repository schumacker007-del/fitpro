import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { PowerliftingAdvancedProgressClip } from '../data/powerlifting';
import { colors, radius, spacing } from '../theme';

type GalleryLayout = 'split' | 'stack' | 'carousel';

interface Props {
  clips: PowerliftingAdvancedProgressClip[];
  height: number;
  layout?: GalleryLayout;
  slideWidth?: number;
  showDots?: boolean;
  /** When true, shows poster until the user taps to play (safer on list screens). */
  staticPreview?: boolean;
  /** Auto-play the first clip when the screen is focused (split layout only). */
  autoPlayFirst?: boolean;
}

export default function PowerliftingAdvancedVideoGallery({
  clips,
  height,
  layout = 'split',
  slideWidth,
  showDots = true,
  staticPreview = false,
  autoPlayFirst = false,
}: Props) {
  const { width: windowWidth } = useWindowDimensions();
  const width = slideWidth ?? windowWidth - spacing.lg * 2;
  const [activeClipId, setActiveClipId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (autoPlayFirst && clips[0]) {
        setActiveClipId(clips[0].id);
      }
      return () => setActiveClipId(null);
    }, [autoPlayFirst, clips]),
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== carouselIndex && index >= 0 && index < clips.length) {
      setCarouselIndex(index);
      if (!staticPreview) {
        setActiveClipId(clips[index]?.id ?? null);
      }
    }
  };

  const toggleClip = (clipId: string) => {
    setActiveClipId((current) => (current === clipId ? null : clipId));
  };

  if (clips.length === 0) return null;

  if (layout === 'split') {
    return (
      <View style={styles.splitRow}>
        {clips.map((clip) => {
          const isPlaying = activeClipId === clip.id;
          return (
            <Pressable
              key={clip.id}
              style={[styles.splitItem, { height }]}
              onPress={() => toggleClip(clip.id)}
            >
              <ClipSlide
                clip={clip}
                height={height}
                rounded
                compact
                isPlaying={isPlaying}
                showPlayOverlay={!isPlaying}
              />
            </Pressable>
          );
        })}
      </View>
    );
  }

  if (layout === 'stack') {
    return (
      <View style={styles.stack}>
        {clips.map((clip) => (
          <Pressable key={clip.id} onPress={() => toggleClip(clip.id)} style={{ height, width: '100%' }}>
            <ClipSlide
              clip={clip}
              height={height}
              width={width}
              rounded
              isPlaying={activeClipId === clip.id}
              showPlayOverlay={staticPreview && activeClipId !== clip.id}
            />
          </Pressable>
        ))}
      </View>
    );
  }

  if (clips.length === 1) {
    return (
      <Pressable onPress={() => toggleClip(clips[0].id)} style={{ height }}>
        <ClipSlide
          clip={clips[0]}
          height={height}
          width={width}
          rounded
          isPlaying={activeClipId === clips[0].id}
          showPlayOverlay={staticPreview && activeClipId !== clips[0].id}
        />
      </Pressable>
    );
  }

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="start"
        style={{ width }}
      >
        {clips.map((clip) => (
          <Pressable key={clip.id} onPress={() => toggleClip(clip.id)} style={{ width, height }}>
            <ClipSlide
              clip={clip}
              height={height}
              width={width}
              rounded
              isPlaying={activeClipId === clip.id}
              showPlayOverlay={staticPreview && activeClipId !== clip.id}
            />
          </Pressable>
        ))}
      </ScrollView>
      {showDots ? (
        <View style={styles.dots}>
          {clips.map((clip, index) => (
            <View key={clip.id} style={[styles.dot, index === carouselIndex && styles.dotActive]} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

function ClipSlide({
  clip,
  height,
  width,
  rounded,
  compact,
  isPlaying,
  showPlayOverlay,
}: {
  clip: PowerliftingAdvancedProgressClip;
  height: number;
  width?: number;
  rounded?: boolean;
  compact?: boolean;
  isPlaying: boolean;
  showPlayOverlay?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <View
      style={[
        styles.slide,
        width != null ? { width, height } : { flex: 1, height },
        rounded && styles.slideRounded,
      ]}
    >
      {isPlaying && !failed ? (
        <Video
          source={clip.source}
          posterSource={clip.poster}
          usePoster
          style={StyleSheet.absoluteFill}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
          onError={() => setFailed(true)}
        />
      ) : (
        <Image source={clip.poster} style={StyleSheet.absoluteFill} resizeMode="cover" />
      )}
      {showPlayOverlay ? (
        <View style={styles.staticIconWrap} pointerEvents="none">
          <View style={styles.playBadge}>
            <Ionicons name="play" size={compact ? 14 : 18} color="#fff" />
          </View>
        </View>
      ) : null}
      <LinearGradient
        colors={['rgba(5,8,16,0.1)', 'rgba(5,8,16,0.45)', 'rgba(5,8,16,0.92)']}
        locations={[0.15, 0.55, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.copy} pointerEvents="none">
        <View style={styles.badge}>
          <Text style={[styles.badgeText, compact && styles.badgeTextCompact]}>{clip.highlight}</Text>
        </View>
        <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={compact ? 2 : 3}>
          {clip.title}
        </Text>
        {!compact ? <Text style={styles.subtitle}>{clip.subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splitRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    padding: spacing.xs,
  },
  splitItem: { flex: 1 },
  stack: { gap: spacing.sm },
  slide: {
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  slideRounded: {
    borderRadius: radius.md,
  },
  staticIconWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
  },
  copy: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(239,68,68,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
    marginBottom: 4,
  },
  badgeText: { color: '#fff', fontWeight: '900', fontSize: 13 },
  badgeTextCompact: { fontSize: 11 },
  title: { color: colors.text, fontWeight: '800', fontSize: 15 },
  titleCompact: { fontSize: 11, lineHeight: 14 },
  subtitle: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 4 },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 16,
  },
});
