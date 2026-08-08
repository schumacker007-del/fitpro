import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode, Video } from 'expo-av';
import React, { useState } from 'react';
import {
  ActionSheetIOS,
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
import { Card, PrimaryButton } from '../components/ui';
import { useTrainingFeed } from '../context/TrainingFeedContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { CommunityStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';
import { TrainingFeedMediaType } from '../types';

export default function TrainingFeedCreatePostScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<CommunityStackParamList, 'TrainingFeedCreate'>>();
  const { t } = useLanguage();
  const { profile } = useUser();
  const { addPost } = useTrainingFeed();

  const [pickedUri, setPickedUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<TrainingFeedMediaType | null>(null);
  const [caption, setCaption] = useState('');
  const [saving, setSaving] = useState(false);

  const authorName = profile?.name?.trim() || 'Atleta';

  const pickMedia = async (source: 'camera' | 'library', type: TrainingFeedMediaType) => {
    if (source === 'camera') {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(t('common.permissionTitle'), t('common.permissionCamera'));
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: type === 'video' ? ['videos'] : ['images'],
        quality: 0.7,
        allowsEditing: type === 'image',
        aspect: type === 'image' ? [4, 5] : undefined,
        videoMaxDuration: 60,
      });
      if (!result.canceled && result.assets[0]) {
        setPickedUri(result.assets[0].uri);
        setMediaType(type);
      }
    } else {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(t('common.permissionTitle'), t('common.permissionGallery'));
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: type === 'video' ? ['videos'] : ['images'],
        quality: 0.7,
        allowsEditing: type === 'image',
        aspect: type === 'image' ? [4, 5] : undefined,
        videoMaxDuration: 60,
      });
      if (!result.canceled && result.assets[0]) {
        setPickedUri(result.assets[0].uri);
        setMediaType(type);
      }
    }
  };

  const openPickerOptions = () => {
    const options = ['Cancelar', 'Tirar foto', 'Gravar vídeo', 'Foto da galeria', 'Vídeo da galeria'];
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options, cancelButtonIndex: 0 },
        (index) => {
          if (index === 1) pickMedia('camera', 'image');
          if (index === 2) pickMedia('camera', 'video');
          if (index === 3) pickMedia('library', 'image');
          if (index === 4) pickMedia('library', 'video');
        }
      );
    } else {
      Alert.alert(t('feed.addMedia'), undefined, [
        { text: t('feed.takePhoto'), onPress: () => pickMedia('camera', 'image') },
        { text: t('feed.recordVideo'), onPress: () => pickMedia('camera', 'video') },
        { text: t('feed.photoFromGallery'), onPress: () => pickMedia('library', 'image') },
        { text: t('feed.videoFromGallery'), onPress: () => pickMedia('library', 'video') },
        { text: t('common.cancel'), style: 'cancel' },
      ]);
    }
  };

  const handlePublish = async () => {
    if (!pickedUri || !mediaType) {
      Alert.alert(t('feed.mediaRequired'));
      return;
    }
    setSaving(true);
    try {
      const post = await addPost({
        pickedUri,
        mediaType,
        caption,
        authorName,
      });
      navigation.replace('TrainingFeedPost', { postId: post.id });
    } catch {
      Alert.alert(t('feed.publishFailed'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Nova publicação</Text>
        <View style={{ width: 32 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable onPress={openPickerOptions}>
            <Card style={styles.mediaCard}>
              {pickedUri && mediaType ? (
                <>
                  {mediaType === 'image' ? (
                    <Image source={{ uri: pickedUri }} style={styles.preview} resizeMode="cover" />
                  ) : (
                    <Video
                      source={{ uri: pickedUri }}
                      style={styles.preview}
                      resizeMode={ResizeMode.COVER}
                      useNativeControls
                      shouldPlay={false}
                    />
                  )}
                  <View style={styles.changeMediaBtn}>
                    <Ionicons name="refresh" size={16} color={colors.text} />
                    <Text style={styles.changeMediaText}>Trocar mídia</Text>
                  </View>
                </>
              ) : (
                <View style={styles.placeholder}>
                  <Ionicons name="camera-outline" size={40} color={colors.textMuted} />
                  <Text style={styles.placeholderTitle}>Adicionar foto ou vídeo</Text>
                  <Text style={styles.placeholderHint}>Toque para escolher da câmera ou galeria</Text>
                </View>
              )}
            </Card>
          </Pressable>

          <Card>
            <Text style={styles.label}>Legenda (opcional)</Text>
            <TextInput
              value={caption}
              onChangeText={setCaption}
              placeholder="Como foi o treino hoje?"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              multiline
              maxLength={500}
            />
            <Text style={styles.authorHint}>Publicando como {authorName}</Text>
          </Card>

          <PrimaryButton
            label={saving ? 'Publicando...' : 'Publicar no feed'}
            icon="send"
            onPress={handlePublish}
            disabled={saving || !pickedUri}
          />
        </ScrollView>
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
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  mediaCard: { padding: 0, overflow: 'hidden' },
  preview: { width: '100%', aspectRatio: 4 / 5, backgroundColor: colors.surfaceAlt },
  changeMediaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  changeMediaText: { color: colors.text, fontWeight: '600', fontSize: 14 },
  placeholder: {
    aspectRatio: 4 / 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
  },
  placeholderTitle: { color: colors.text, fontWeight: '700', fontSize: 16 },
  placeholderHint: { color: colors.textMuted, fontSize: 13, textAlign: 'center' },
  label: { color: colors.textMuted, fontSize: 12, fontWeight: '600', marginBottom: spacing.sm },
  input: {
    color: colors.text,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: 'top',
    lineHeight: 21,
  },
  authorHint: { color: colors.textMuted, fontSize: 12, marginTop: spacing.sm },
});
