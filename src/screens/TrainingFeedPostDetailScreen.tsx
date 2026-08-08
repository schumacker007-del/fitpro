import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResizeMode, Video } from 'expo-av';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useTrainingFeed } from '../context/TrainingFeedContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { CommunityStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';
import { TrainingFeedReaction } from '../types';
import { formatLocaleDate } from '../utils/formatLocaleDate';

function formatDate(iso: string, locale: import('../i18n/types').AppLocale) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return formatLocaleDate(locale, date, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function TrainingFeedPostDetailScreen() {
  const { locale, t } = useLanguage();
  const route = useRoute<RouteProp<CommunityStackParamList, 'TrainingFeedPost'>>();
  const navigation = useNavigation<NativeStackNavigationProp<CommunityStackParamList, 'TrainingFeedPost'>>();
  const { profile } = useUser();
  const { getPost, addComment, setReaction, deletePost } = useTrainingFeed();
  const post = getPost(route.params.postId);

  const [commentText, setCommentText] = useState('');
  const [sending, setSending] = useState(false);

  const authorName = profile?.name?.trim() || 'Atleta';

  if (!post) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Publicação</Text>
          <View style={{ width: 32 }} />
        </View>
        <View style={styles.centered}>
          <Text style={styles.missingText}>Publicação não encontrada.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleReaction = async (reaction: TrainingFeedReaction) => {
    const next = post.userReaction === reaction ? null : reaction;
    await setReaction(post.id, next);
  };

  const handleSendComment = async () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    setSending(true);
    try {
      await addComment(post.id, authorName, trimmed);
      setCommentText('');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(t('feed.deletePostTitle'), t('feed.deletePostBody'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          await deletePost(post.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Publicação
        </Text>
        <Pressable onPress={handleDelete} style={styles.deleteBtn} hitSlop={8}>
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Card style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{post.authorName.charAt(0).toUpperCase()}</Text>
              </View>
              <View style={styles.postMeta}>
                <Text style={styles.authorName}>{post.authorName}</Text>
                <Text style={styles.postDate}>{formatDate(post.createdAtISO, locale)}</Text>
              </View>
            </View>

            <View style={styles.mediaWrap}>
              {post.mediaType === 'image' ? (
                <Image source={{ uri: post.mediaUri }} style={styles.media} resizeMode="cover" />
              ) : (
                <Video
                  source={{ uri: post.mediaUri }}
                  style={styles.media}
                  resizeMode={ResizeMode.CONTAIN}
                  useNativeControls
                  shouldPlay={false}
                />
              )}
            </View>

            {post.caption ? <Text style={styles.caption}>{post.caption}</Text> : null}

            <View style={styles.reactionsRow}>
              <Pressable
                onPress={() => handleReaction('like')}
                style={[styles.reactionBtn, post.userReaction === 'like' && styles.reactionBtnActive]}
              >
                <Ionicons
                  name={post.userReaction === 'like' ? 'thumbs-up' : 'thumbs-up-outline'}
                  size={20}
                  color={post.userReaction === 'like' ? colors.primary : colors.textMuted}
                />
                <Text
                  style={[
                    styles.reactionCount,
                    post.userReaction === 'like' && { color: colors.primary },
                  ]}
                >
                  {post.likes}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleReaction('dislike')}
                style={[styles.reactionBtn, post.userReaction === 'dislike' && styles.reactionBtnDislike]}
              >
                <Ionicons
                  name={post.userReaction === 'dislike' ? 'thumbs-down' : 'thumbs-down-outline'}
                  size={20}
                  color={post.userReaction === 'dislike' ? colors.danger : colors.textMuted}
                />
                <Text
                  style={[
                    styles.reactionCount,
                    post.userReaction === 'dislike' && { color: colors.danger },
                  ]}
                >
                  {post.dislikes}
                </Text>
              </Pressable>
            </View>
          </Card>

          <Text style={styles.commentsTitle}>
            Comentários ({post.comments.length})
          </Text>

          {post.comments.length === 0 ? (
            <Text style={styles.noComments}>Seja o primeiro a comentar nesta publicação.</Text>
          ) : (
            post.comments.map((comment) => (
              <Card key={comment.id} style={styles.commentCard}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthor}>{comment.authorName}</Text>
                  <Text style={styles.commentDate}>{formatDate(comment.createdAtISO, locale)}</Text>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
              </Card>
            ))
          )}
        </ScrollView>

        <View style={styles.composer}>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Escreva um comentário..."
            placeholderTextColor={colors.textMuted}
            style={styles.composerInput}
            multiline
            maxLength={500}
          />
          <Pressable
            onPress={handleSendComment}
            disabled={sending || !commentText.trim()}
            style={[styles.sendBtn, (!commentText.trim() || sending) && styles.sendBtnDisabled]}
          >
            <Ionicons name="send" size={18} color="#0B1210" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  deleteBtn: { width: 32, alignItems: 'flex-end' },
  content: { padding: spacing.lg, paddingBottom: spacing.md, gap: spacing.sm },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missingText: { color: colors.textMuted },
  postCard: { gap: spacing.md },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#0B1210', fontWeight: '800', fontSize: 18 },
  postMeta: { flex: 1 },
  authorName: { color: colors.text, fontWeight: '800', fontSize: 16 },
  postDate: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  mediaWrap: {
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  media: { width: '100%', aspectRatio: 4 / 5 },
  caption: { color: colors.text, fontSize: 15, lineHeight: 22 },
  reactionsRow: { flexDirection: 'row', gap: spacing.sm },
  reactionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reactionBtnActive: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  reactionBtnDislike: {
    backgroundColor: 'rgba(255,92,92,0.12)',
    borderColor: colors.danger,
  },
  reactionCount: { color: colors.textMuted, fontWeight: '700', fontSize: 14 },
  commentsTitle: { ...typography.h3, color: colors.text, marginTop: spacing.sm, marginBottom: 4 },
  noComments: { color: colors.textMuted, fontSize: 14, marginBottom: spacing.sm },
  commentCard: { gap: 4 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  commentAuthor: { color: colors.text, fontWeight: '700', fontSize: 14 },
  commentDate: { color: colors.textMuted, fontSize: 11 },
  commentText: { color: colors.text, fontSize: 14, lineHeight: 20 },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  composerInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.45 },
});
