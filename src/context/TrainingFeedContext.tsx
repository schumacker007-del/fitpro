import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TrainingFeedComment, TrainingFeedMediaType, TrainingFeedPost, TrainingFeedReaction } from '../types';

const FEED_KEY = '@fitpro/training_feed';

const mediaDir = new Directory(Paths.document, 'training-feed-media');

function ensureDir() {
  if (!mediaDir.exists) {
    mediaDir.create({ intermediates: true, idempotent: true });
  }
}

function guessExtension(uri: string, mediaType: TrainingFeedMediaType) {
  const match = uri.match(/\.(\w+)(?:\?|$)/);
  if (match) return match[1];
  return mediaType === 'video' ? 'mp4' : 'jpg';
}

interface AddPostInput {
  pickedUri: string;
  mediaType: TrainingFeedMediaType;
  caption?: string;
  authorName: string;
}

interface TrainingFeedContextValue {
  posts: TrainingFeedPost[];
  loading: boolean;
  addPost: (input: AddPostInput) => Promise<TrainingFeedPost>;
  deletePost: (id: string) => Promise<void>;
  addComment: (postId: string, authorName: string, text: string) => Promise<void>;
  setReaction: (postId: string, reaction: TrainingFeedReaction | null) => Promise<void>;
  getPost: (id: string) => TrainingFeedPost | undefined;
}

const TrainingFeedContext = createContext<TrainingFeedContextValue | undefined>(undefined);

export function TrainingFeedProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<TrainingFeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        ensureDir();
        const raw = await AsyncStorage.getItem(FEED_KEY);
        if (raw) setPosts(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: TrainingFeedPost[]) => {
    const sorted = [...next].sort(
      (a, b) => new Date(b.createdAtISO).getTime() - new Date(a.createdAtISO).getTime()
    );
    setPosts(sorted);
    await AsyncStorage.setItem(FEED_KEY, JSON.stringify(sorted));
  }, []);

  const addPost = useCallback(
    async ({ pickedUri, mediaType, caption, authorName }: AddPostInput) => {
      ensureDir();
      const extension = guessExtension(pickedUri, mediaType);
      const fileName = `feed-${Date.now()}.${extension}`;
      const sourceFile = new File(pickedUri);
      const destFile = new File(mediaDir, fileName);
      sourceFile.copy(destFile);

      const newPost: TrainingFeedPost = {
        id: `feed-${Date.now()}`,
        authorName,
        mediaUri: destFile.uri,
        mediaType,
        caption: caption?.trim() || undefined,
        createdAtISO: new Date().toISOString(),
        comments: [],
        likes: 0,
        dislikes: 0,
        userReaction: null,
      };
      await persist([newPost, ...posts]);
      return newPost;
    },
    [posts, persist]
  );

  const deletePost = useCallback(
    async (id: string) => {
      const target = posts.find((p) => p.id === id);
      if (target) {
        try {
          const file = new File(target.mediaUri);
          if (file.exists) file.delete();
        } catch {
          // Arquivo já pode ter sido removido — ignora.
        }
      }
      await persist(posts.filter((p) => p.id !== id));
    },
    [posts, persist]
  );

  const addComment = useCallback(
    async (postId: string, authorName: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const comment: TrainingFeedComment = {
        id: `comment-${Date.now()}`,
        authorName,
        text: trimmed,
        createdAtISO: new Date().toISOString(),
      };
      const next = posts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
      );
      await persist(next);
    },
    [posts, persist]
  );

  const setReaction = useCallback(
    async (postId: string, reaction: TrainingFeedReaction | null) => {
      const next = posts.map((post) => {
        if (post.id !== postId) return post;
        let likes = post.likes;
        let dislikes = post.dislikes;
        const prev = post.userReaction;

        if (prev === 'like') likes -= 1;
        if (prev === 'dislike') dislikes -= 1;

        if (reaction === 'like') likes += 1;
        if (reaction === 'dislike') dislikes += 1;

        return {
          ...post,
          likes: Math.max(0, likes),
          dislikes: Math.max(0, dislikes),
          userReaction: reaction,
        };
      });
      await persist(next);
    },
    [posts, persist]
  );

  const getPost = useCallback((id: string) => posts.find((p) => p.id === id), [posts]);

  const value = useMemo<TrainingFeedContextValue>(
    () => ({ posts, loading, addPost, deletePost, addComment, setReaction, getPost }),
    [posts, loading, addPost, deletePost, addComment, setReaction, getPost]
  );

  return <TrainingFeedContext.Provider value={value}>{children}</TrainingFeedContext.Provider>;
}

export function useTrainingFeed() {
  const ctx = useContext(TrainingFeedContext);
  if (!ctx) throw new Error('useTrainingFeed must be used within a TrainingFeedProvider');
  return ctx;
}
