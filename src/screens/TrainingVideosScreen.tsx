import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrainingVideoClip from '../components/TrainingVideoClip';
import { Card, Pill, SectionTitle } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import {
  getFeaturedTrainingVideo,
  getSortedTrainingVideos,
  TRAINING_VIDEO_CATEGORY_LABELS,
  TrainingVideoFeedItem,
} from '../data/trainingVideoFeed';
import { HomeStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { formatLocaleDate } from '../utils/formatLocaleDate';

function formatDate(iso: string, locale: import('../i18n/types').AppLocale) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return formatLocaleDate(locale, date, { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function TrainingVideosScreen() {
  const { locale, t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'TrainingVideos'>>();
  const featured = getFeaturedTrainingVideo();
  const videos = getSortedTrainingVideos().filter((item) => item.id !== featured?.id);

  const openVideo = (videoId: string) => navigation.navigate('TrainingVideoDetail', { videoId });

  const renderItem = ({ item }: { item: TrainingVideoFeedItem }) => (
    <Pressable onPress={() => openVideo(item.id)} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <TrainingVideoClip
        source={item.video}
        title={item.title}
        subtitle={TRAINING_VIDEO_CATEGORY_LABELS[item.category]}
        width={108}
        height={136}
      />
      <View style={styles.rowBody}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.rowDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.rowMeta}>
          <Pill label={TRAINING_VIDEO_CATEGORY_LABELS[item.category]} tone="primary" />
          {item.durationLabel ? <Text style={styles.duration}>{item.durationLabel}</Text> : null}
        </View>
        <Text style={styles.date}>{formatDate(item.publishedAt, locale)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Vídeos de treino</Text>
        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <SectionTitle
              title="Conteúdo do professor"
              subtitle="Vídeos atualizados com treinos reais, dicas e motivação"
            />

            {featured ? (
              <Card style={styles.featuredCard}>
                <Pressable onPress={() => openVideo(featured.id)}>
                  <TrainingVideoClip
                    source={featured.video}
                    title={featured.title}
                    subtitle="Em destaque"
                    fullWidth
                    height={200}
                    style={styles.featuredVideo}
                  />
                </Pressable>
                <View style={styles.featuredBody}>
                  <Text style={styles.featuredTitle}>{featured.title}</Text>
                  <Text style={styles.featuredDescription}>{featured.description}</Text>
                  <View style={styles.rowMeta}>
                    <Pill label={TRAINING_VIDEO_CATEGORY_LABELS[featured.category]} tone="primary" />
                    {featured.durationLabel ? <Text style={styles.duration}>{featured.durationLabel}</Text> : null}
                  </View>
                </View>
              </Card>
            ) : null}

            {videos.length > 0 ? <Text style={styles.listLabel}>{t('trainingVideos.moreLabel')}</Text> : null}
          </>
        }
        renderItem={renderItem}
        ListEmptyComponent={
          featured ? null : (
            <Card>
              <Text style={styles.emptyTitle}>{t('trainingVideos.emptyTitle')}</Text>
              <Text style={styles.emptyText}>{t('trainingVideos.emptyBody')}</Text>
            </Card>
          )
        }
      />
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
  headerTitle: { ...typography.h3, color: colors.text },
  list: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  featuredCard: { padding: 0, overflow: 'hidden', marginBottom: spacing.md },
  featuredVideo: { borderWidth: 0, borderRadius: 0 },
  featuredBody: { padding: spacing.md, gap: spacing.sm },
  featuredTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  featuredDescription: { color: colors.textMuted, fontSize: 14, lineHeight: 20 },
  listLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowPressed: { opacity: 0.88 },
  rowBody: { flex: 1, gap: 4 },
  rowTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  rowDescription: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  rowMeta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 2 },
  duration: { color: colors.textMuted, fontSize: 11 },
  date: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 4 },
  emptyText: { color: colors.textMuted, fontSize: 13 },
});
