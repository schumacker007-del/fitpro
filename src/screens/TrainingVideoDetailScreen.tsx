import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { getTrainingVideoById, TRAINING_VIDEO_CATEGORY_LABELS } from '../data/trainingVideoFeed';
import { HomeStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { formatLocaleDate } from '../utils/formatLocaleDate';

function formatDate(iso: string, locale: import('../i18n/types').AppLocale) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return formatLocaleDate(locale, date, { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function TrainingVideoDetailScreen() {
  const { locale } = useLanguage();
  const route = useRoute<RouteProp<HomeStackParamList, 'TrainingVideoDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'TrainingVideoDetail'>>();
  const video = getTrainingVideoById(route.params.videoId);

  if (!video) return null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {video.title}
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.playerWrap}>
          <Video
            source={video.video}
            style={styles.player}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            useNativeControls
            isLooping={false}
          />
        </View>

        <Card>
          <View style={styles.metaRow}>
            <Pill label={TRAINING_VIDEO_CATEGORY_LABELS[video.category]} tone="primary" />
            {video.durationLabel ? <Text style={styles.duration}>{video.durationLabel}</Text> : null}
          </View>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.date}>Publicado em {formatDate(video.publishedAt, locale)}</Text>
          <Text style={styles.description}>{video.description}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', marginHorizontal: spacing.sm },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  playerWrap: {
    aspectRatio: 16 / 9,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: colors.border,
  },
  player: { width: '100%', height: '100%' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  duration: { color: colors.textMuted, fontSize: 12 },
  title: { color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  date: { color: colors.textMuted, fontSize: 12, marginBottom: spacing.md },
  description: { color: colors.text, fontSize: 15, lineHeight: 22 },
});
