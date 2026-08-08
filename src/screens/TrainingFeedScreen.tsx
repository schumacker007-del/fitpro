import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { formatLocaleDate } from '../utils/formatLocaleDate';
import { useTrainingFeed } from '../context/TrainingFeedContext';
import { CommunityStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';
import { TrainingFeedPost } from '../types';

function formatRelativeDate(iso: string, locale: import('../i18n/types').AppLocale) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return formatLocaleDate(locale, date, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function PostCard({
  post,
  locale,
  onPress,
}: {
  post: TrainingFeedPost;
  locale: import('../i18n/types').AppLocale;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.cardPressed]}>
      <Card style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{post.authorName.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.postMeta}>
            <Text style={styles.authorName}>{post.authorName}</Text>
            <Text style={styles.postDate}>{formatRelativeDate(post.createdAtISO, locale)}</Text>
          </View>
          {post.mediaType === 'video' ? (
            <Ionicons name="videocam" size={18} color={colors.textMuted} />
          ) : null}
        </View>

        <View style={styles.mediaWrap}>
          {post.mediaType === 'image' ? (
            <Image source={{ uri: post.mediaUri }} style={styles.media} resizeMode="cover" />
          ) : (
            <Video
              source={{ uri: post.mediaUri }}
              style={styles.media}
              resizeMode={ResizeMode.COVER}
              shouldPlay={false}
              isMuted
            />
          )}
          {post.mediaType === 'video' ? (
            <View style={styles.playOverlay}>
              <Ionicons name="play-circle" size={44} color="rgba(255,255,255,0.9)" />
            </View>
          ) : null}
        </View>

        {post.caption ? (
          <Text style={styles.caption} numberOfLines={2}>
            {post.caption}
          </Text>
        ) : null}

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="thumbs-up" size={16} color={colors.primary} />
            <Text style={styles.statText}>{post.likes}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="thumbs-down" size={16} color={colors.danger} />
            <Text style={styles.statText}>{post.dislikes}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="chatbubble-outline" size={16} color={colors.textMuted} />
            <Text style={styles.statText}>{post.comments.length}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

export default function TrainingFeedScreen() {
  const { t, locale } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<CommunityStackParamList, 'TrainingFeed'>>();
  const { posts, loading } = useTrainingFeed();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('community.feedTitle')}</Text>
        <Pressable
          onPress={() => navigation.navigate('TrainingFeedCreate')}
          style={styles.addBtn}
          hitSlop={8}
        >
          <Ionicons name="add" size={24} color={colors.primary} />
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PostCard post={item} locale={locale} onPress={() => navigation.navigate('TrainingFeedPost', { postId: item.id })} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <Card style={styles.emptyCard}>
              <Ionicons name="images-outline" size={40} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>{t('feed.emptyTitle')}</Text>
              <Text style={styles.emptyText}>{t('feed.emptySubtitle')}</Text>
              <Pressable
                onPress={() => navigation.navigate('TrainingFeedCreate')}
                style={styles.emptyBtn}
              >
                <Ionicons name="add-circle-outline" size={18} color="#0B1210" />
                <Text style={styles.emptyBtnText}>{t('feed.emptyCta')}</Text>
              </Pressable>
            </Card>
          }
        />
      )}
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
  backBtn: { padding: 4, width: 32 },
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center' },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  list: { padding: spacing.lg, paddingBottom: spacing.xl, flexGrow: 1 },
  separator: { height: spacing.md },
  cardPressed: { opacity: 0.92 },
  postCard: { gap: spacing.sm, padding: spacing.md },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#0B1210', fontWeight: '800', fontSize: 16 },
  postMeta: { flex: 1 },
  authorName: { color: colors.text, fontWeight: '800', fontSize: 15 },
  postDate: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  mediaWrap: {
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    aspectRatio: 4 / 5,
  },
  media: { width: '100%', height: '100%' },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  caption: { color: colors.text, fontSize: 14, lineHeight: 20 },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginTop: 2 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyCard: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl, paddingVertical: spacing.xl },
  emptyTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  emptyText: { color: colors.textMuted, textAlign: 'center', fontSize: 14, lineHeight: 21 },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
  },
  emptyBtnText: { color: '#0B1210', fontWeight: '700', fontSize: 14 },
});
