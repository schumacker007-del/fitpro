import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import {
  ActionSheetIOS,
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton, SectionTitle } from '../components/ui';
import { useProgressPhotos } from '../context/ProgressPhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { ProfileStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';
import { formatLocaleDate } from '../utils/formatLocaleDate';
import { ProgressPhoto } from '../types';

export default function ProgressPhotosScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'ProgressPhotos'>>();
  const { photos, addPhoto, deletePhoto } = useProgressPhotos();
  const { locale, t } = useLanguage();

  const [pendingUri, setPendingUri] = useState<string | null>(null);
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const [compareMode, setCompareMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [compareVisible, setCompareVisible] = useState(false);

  const pickImage = async (source: 'camera' | 'library') => {
    if (source === 'camera') {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(t('common.permissionTitle'), t('common.permissionCamera'));
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ quality: 0.7, allowsEditing: true, aspect: [3, 4] });
      if (!result.canceled && result.assets[0]) setPendingUri(result.assets[0].uri);
    } else {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert(t('common.permissionTitle'), t('common.permissionGallery'));
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, allowsEditing: true, aspect: [3, 4] });
      if (!result.canceled && result.assets[0]) setPendingUri(result.assets[0].uri);
    }
  };

  const openPickerOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: ['Cancelar', 'Tirar foto', 'Escolher da galeria'], cancelButtonIndex: 0 },
        (index) => {
          if (index === 1) pickImage('camera');
          if (index === 2) pickImage('library');
        }
      );
    } else {
      Alert.alert(t('progressPhotos.addPhoto'), undefined, [
        { text: t('progressPhotos.takePhoto'), onPress: () => pickImage('camera') },
        { text: t('progressPhotos.chooseGallery'), onPress: () => pickImage('library') },
        { text: t('common.cancel'), style: 'cancel' },
      ]);
    }
  };

  const handleConfirmSave = async () => {
    if (!pendingUri) return;
    setSaving(true);
    try {
      await addPhoto({
        pickedUri: pendingUri,
        weightKg: weight ? Number(weight.replace(',', '.')) : undefined,
        note: note.trim() || undefined,
      });
      setPendingUri(null);
      setWeight('');
      setNote('');
    } catch (e) {
      Alert.alert(t('common.saveFailed'));
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async (photo: ProgressPhoto) => {
    const available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert(t('common.shareUnavailable'));
      return;
    }
    await Sharing.shareAsync(photo.uri, {
      dialogTitle: 'Enviar foto de evolução para o professor',
    });
  };

  const handleDelete = (photo: ProgressPhoto) => {
    Alert.alert(t('progressPhotos.deleteTitle'), t('progressPhotos.deleteBody'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => deletePhoto(photo.id) },
    ]);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const comparePhotos = photos.filter((p) => selected.includes(p.id));
  const [first, second] = selected.map((id) => photos.find((p) => p.id === id)).filter(Boolean) as ProgressPhoto[];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]}>Fotos de evolução</Text>
        <Pressable
          onPress={() => {
            setCompareMode((v) => !v);
            setSelected([]);
          }}
          style={styles.backBtn}
        >
          <Ionicons name={compareMode ? 'close' : 'git-compare-outline'} size={20} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {pendingUri ? (
          <Card style={styles.pendingCard}>
            <Image source={{ uri: pendingUri }} style={styles.pendingImage} />
            <View style={{ flex: 1, gap: 8 }}>
              <Text style={styles.pendingLabel}>Peso atual (opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex.: 78.5"
                placeholderTextColor={colors.textMuted}
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />
              <Text style={styles.pendingLabel}>Observação (opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex.: 8 semanas de treino"
                placeholderTextColor={colors.textMuted}
                value={note}
                onChangeText={setNote}
              />
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
                <View style={{ flex: 1 }}>
                  <PrimaryButton
                    label="Salvar foto"
                    icon="checkmark"
                    onPress={handleConfirmSave}
                    disabled={saving}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <PrimaryButton label="Cancelar" variant="outline" onPress={() => setPendingUri(null)} />
                </View>
              </View>
            </View>
          </Card>
        ) : (
          <PrimaryButton label="Adicionar foto de evolução" icon="camera" onPress={openPickerOptions} />
        )}

        {compareMode ? (
          <Card style={styles.compareBanner}>
            <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
            <Text style={styles.compareBannerText}>
              Toque em até 2 fotos para comparar lado a lado ({selected.length}/2 selecionadas).
            </Text>
            {selected.length === 2 ? (
              <PrimaryButton label="Ver comparação" icon="eye" onPress={() => setCompareVisible(true)} />
            ) : null}
          </Card>
        ) : null}

        <SectionTitle title="Linha do tempo" subtitle={photos.length ? `${photos.length} foto(s) registrada(s)` : undefined} />

        {photos.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="images-outline" size={28} color={colors.textMuted} />
            <Text style={styles.emptyText}>
              Registre sua primeira foto de evolução para acompanhar sua transformação ao longo do tempo.
            </Text>
          </Card>
        ) : (
          photos.map((photo) => {
            const isSelected = selected.includes(photo.id);
            return (
              <Pressable
                key={photo.id}
                onPress={() => (compareMode ? toggleSelect(photo.id) : undefined)}
                style={({ pressed }) => [pressed && compareMode ? { opacity: 0.85 } : null]}
              >
                <Card style={[styles.photoCard, isSelected ? styles.photoCardSelected : null]}>
                  <Image source={{ uri: photo.uri }} style={styles.photoThumb} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.photoDate}>{formatLocaleDate(locale, photo.dateISO, { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                    {photo.weightKg ? <Text style={styles.photoMeta}>{photo.weightKg} kg</Text> : null}
                    {photo.note ? <Text style={styles.photoNote}>{photo.note}</Text> : null}
                    {!compareMode ? (
                      <View style={styles.photoActions}>
                        <Pressable onPress={() => handleShare(photo)} style={styles.iconBtn}>
                          <Ionicons name="share-outline" size={16} color={colors.primary} />
                        </Pressable>
                        <Pressable onPress={() => handleDelete(photo)} style={styles.iconBtn}>
                          <Ionicons name="trash-outline" size={16} color={colors.danger} />
                        </Pressable>
                      </View>
                    ) : null}
                  </View>
                  {compareMode ? (
                    <Ionicons
                      name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                      size={22}
                      color={isSelected ? colors.primary : colors.textMuted}
                    />
                  ) : null}
                </Card>
              </Pressable>
            );
          })
        )}
        <Text style={styles.fine}>
          Suas fotos ficam salvas apenas neste dispositivo. Use o botão de compartilhar para enviar uma foto ao seu
          professor, por exemplo pelo WhatsApp.
        </Text>
      </ScrollView>

      <Modal visible={compareVisible} animationType="slide" transparent onRequestClose={() => setCompareVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={[typography.h3, { color: colors.text }]}>Comparar evolução</Text>
              <Pressable onPress={() => setCompareVisible(false)}>
                <Ionicons name="close" size={22} color={colors.text} />
              </Pressable>
            </View>
            <View style={styles.compareRow}>
              {[first, second].map((photo, idx) =>
                photo ? (
                  <View key={photo.id} style={styles.compareCol}>
                    <Image source={{ uri: photo.uri }} style={styles.compareImage} />
                    <Text style={styles.compareDate}>{formatLocaleDate(locale, photo.dateISO, { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                    {photo.weightKg ? <Text style={styles.photoMeta}>{photo.weightKg} kg</Text> : null}
                  </View>
                ) : (
                  <View key={idx} style={styles.compareCol} />
                )
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  backBtn: { padding: 4 },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl, gap: spacing.md },
  pendingCard: { flexDirection: 'row', gap: spacing.sm },
  pendingImage: { width: 90, height: 120, borderRadius: radius.md, backgroundColor: colors.surfaceAlt },
  pendingLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: colors.text,
    fontSize: 13,
  },
  compareBanner: { gap: 8 },
  compareBannerText: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  emptyCard: { alignItems: 'center', gap: 8, paddingVertical: spacing.lg },
  emptyText: { color: colors.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 19 },
  photoCard: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  photoCardSelected: { borderColor: colors.primary, borderWidth: 2 },
  photoThumb: { width: 56, height: 72, borderRadius: radius.sm, backgroundColor: colors.surfaceAlt },
  photoDate: { color: colors.text, fontWeight: '800', fontSize: 13 },
  photoMeta: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 2 },
  photoNote: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  photoActions: { flexDirection: 'row', gap: 14, marginTop: 8 },
  iconBtn: { padding: 2 },
  fine: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: spacing.sm, lineHeight: 16 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  compareRow: { flexDirection: 'row', gap: spacing.sm },
  compareCol: { flex: 1, alignItems: 'center', gap: 4 },
  compareImage: { width: '100%', aspectRatio: 3 / 4, borderRadius: radius.md, backgroundColor: colors.surfaceAlt },
  compareDate: { color: colors.text, fontSize: 12, fontWeight: '700', marginTop: 4 },
});
