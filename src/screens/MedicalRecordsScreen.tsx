import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useMemo, useState } from 'react';
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
import MedicalRecordPdfViewer from '../components/MedicalRecordPdfViewer';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { useMedicalRecords } from '../context/MedicalRecordContext';
import { getMedicalCategoryInfo, MEDICAL_RECORD_CATEGORIES } from '../data/medicalRecordCategories';
import { ProfileStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';
import { formatLocaleDate } from '../utils/formatLocaleDate';
import { MedicalRecord, MedicalRecordCategory } from '../types';

type PendingMedia = {
  uri: string;
  mediaType: 'photo' | 'video' | 'pdf';
  fileName?: string;
};

export default function MedicalRecordsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'MedicalRecords'>>();
  const route = useRoute<RouteProp<ProfileStackParamList, 'MedicalRecords'>>();
  const initialCategory = route.params?.category;

  const { records, addRecord, deleteRecord, countByCategory } = useMedicalRecords();
  const { locale } = useLanguage();
  const { medicalDisclaimerAcknowledged, acknowledgeMedicalDisclaimer } = useGamification();

  const [activeCategory, setActiveCategory] = useState<MedicalRecordCategory | 'all'>(
    initialCategory ?? 'all'
  );
  const [pending, setPending] = useState<PendingMedia | null>(null);
  const [pendingCategory, setPendingCategory] = useState<MedicalRecordCategory>(
    initialCategory ?? 'analise_laboratorial'
  );
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [previewRecord, setPreviewRecord] = useState<MedicalRecord | null>(null);
  const [pdfRecord, setPdfRecord] = useState<MedicalRecord | null>(null);

  useEffect(() => {
    if (!medicalDisclaimerAcknowledged) {
      Alert.alert(
        'Aviso importante',
        'Exames, hormônios e documentos de saúde neste app são apenas informativos. Não substituem consulta, diagnóstico ou prescrição de um profissional de saúde habilitado.',
        [{ text: 'Entendi', onPress: () => acknowledgeMedicalDisclaimer() }]
      );
    }
  }, [medicalDisclaimerAcknowledged, acknowledgeMedicalDisclaimer]);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return records;
    return records.filter((r) => r.category === activeCategory);
  }, [records, activeCategory]);

  const openAddFlow = (category: MedicalRecordCategory) => {
    setPendingCategory(category);
    openMediaPicker(category);
  };

  const openMediaPicker = (category: MedicalRecordCategory) => {
    const categoryLabel = getMedicalCategoryInfo(category).shortLabel;
    const options = ['Cancelar', 'Tirar foto', 'Gravar vídeo', 'Escolher da galeria', 'Importar PDF'];

    const handlePick = async (index: number) => {
      if (index === 1) await pickMedia('camera', 'photo', category);
      if (index === 2) await pickMedia('camera', 'video', category);
      if (index === 3) await pickMedia('library', 'any', category);
      if (index === 4) await pickPdf(category);
    };

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { title: `Adicionar — ${categoryLabel}`, options, cancelButtonIndex: 0 },
        handlePick
      );
    } else {
      Alert.alert(`Adicionar — ${categoryLabel}`, undefined, [
        { text: 'Tirar foto', onPress: () => pickMedia('camera', 'photo', category) },
        { text: 'Gravar vídeo', onPress: () => pickMedia('camera', 'video', category) },
        { text: 'Escolher da galeria', onPress: () => pickMedia('library', 'any', category) },
        { text: 'Importar PDF', onPress: () => pickPdf(category) },
        { text: 'Cancelar', style: 'cancel' },
      ]);
    }
  };

  const pickPdf = async (category: MedicalRecordCategory) => {
    setPendingCategory(category);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      const sizeMb = asset.size ? asset.size / (1024 * 1024) : 0;
      if (sizeMb > 100) {
        Alert.alert(
          'Arquivo muito grande',
          `Este PDF tem ${sizeMb.toFixed(0)} MB. O app pode demorar para salvar. Deseja continuar?`,
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Continuar',
              onPress: () => {
                setPending({ uri: asset.uri, mediaType: 'pdf', fileName: asset.name });
                setTitle(suggestTitleFromFileName(asset.name));
                setNote('');
              },
            },
          ]
        );
        return;
      }

      setPending({ uri: asset.uri, mediaType: 'pdf', fileName: asset.name });
      setTitle(suggestTitleFromFileName(asset.name));
      setNote('');
    } catch {
      Alert.alert('Não foi possível importar', 'Tente selecionar o PDF novamente.');
    }
  };

  const pickMedia = async (
    source: 'camera' | 'library',
    kind: 'photo' | 'video' | 'any',
    category: MedicalRecordCategory
  ) => {
    setPendingCategory(category);

    if (source === 'camera') {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Permissão necessária', 'Autorize o acesso à câmera para registrar o documento.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.8,
        mediaTypes:
          kind === 'video'
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images,
        videoMaxDuration: 120,
      });
      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setPending({
          uri: asset.uri,
          mediaType: asset.type === 'video' ? 'video' : 'photo',
        });
        setTitle('');
        setNote('');
      }
    } else {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Permissão necessária', 'Autorize o acesso à galeria para anexar o documento.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.8,
        mediaTypes:
          kind === 'any'
            ? ImagePicker.MediaTypeOptions.All
            : kind === 'video'
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images,
        videoMaxDuration: 120,
      });
      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setPending({
          uri: asset.uri,
          mediaType: asset.type === 'video' ? 'video' : 'photo',
        });
        setTitle('');
        setNote('');
      }
    }
  };

  const handleConfirmSave = async () => {
    if (!pending) return;
    if (!title.trim()) {
      Alert.alert('Título obrigatório', 'Dê um nome para identificar este documento (ex.: Hemograma mar/2026).');
      return;
    }
    setSaving(true);
    try {
      await addRecord({
        pickedUri: pending.uri,
        mediaType: pending.mediaType,
        category: pendingCategory,
        title: title.trim(),
        note: note.trim() || undefined,
        fileName: pending.fileName,
      });
      setPending(null);
      setTitle('');
      setNote('');
      setActiveCategory(pendingCategory);
    } catch {
      Alert.alert('Não foi possível salvar', 'Tente novamente em instantes.');
    } finally {
      setSaving(false);
    }
  };

  const handleOpen = async (record: MedicalRecord) => {
    if (record.mediaType === 'photo') {
      setPreviewRecord(record);
      return;
    }
    if (record.mediaType === 'pdf') {
      setPdfRecord(record);
      return;
    }
    await handleShare(record);
  };

  const handleShare = async (record: MedicalRecord) => {
    const available = await Sharing.isAvailableAsync();
    if (!available) {
      Alert.alert('Compartilhamento indisponível', 'Seu dispositivo não suporta compartilhamento de arquivos.');
      return;
    }
    const mimeType = record.mediaType === 'pdf' ? 'application/pdf' : undefined;
    await Sharing.shareAsync(record.uri, {
      dialogTitle: `Enviar ${record.title}`,
      mimeType,
      UTI: record.mediaType === 'pdf' ? 'com.adobe.pdf' : undefined,
    });
  };

  const handleDelete = (record: MedicalRecord) => {
    Alert.alert('Remover documento', 'Este arquivo será apagado permanentemente do app. Deseja continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => deleteRecord(record.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]}>Documentos de saúde</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <MedicalDisclaimerBanner />
        <Text style={styles.intro}>
          Fotografe, filme ou importe PDFs de exames, prescrições e avaliações. Tudo fica salvo no seu celular
          para consultar ou enviar ao professor.
        </Text>

        <SectionTitle title="O que deseja registrar?" />
        <View style={styles.categoryGrid}>
          {MEDICAL_RECORD_CATEGORIES.map((cat) => {
            const count = countByCategory(cat.id);
            return (
              <Pressable
                key={cat.id}
                onPress={() => {
                  setActiveCategory(cat.id);
                  openAddFlow(cat.id);
                }}
                style={({ pressed }) => [styles.categoryCard, pressed && { opacity: 0.9 }]}
              >
                <View style={[styles.categoryIconWrap, { backgroundColor: `${cat.color}22` }]}>
                  <Ionicons name={cat.icon} size={26} color={cat.color} />
                </View>
                <Text style={styles.categoryLabel}>{cat.shortLabel}</Text>
                <Text style={styles.categoryDesc} numberOfLines={2}>
                  {cat.description}
                </Text>
                {count > 0 ? (
                  <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                    <Text style={styles.countBadgeText}>{count}</Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        <View style={styles.filterRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            <FilterChip
              label="Todos"
              selected={activeCategory === 'all'}
              onPress={() => setActiveCategory('all')}
            />
            {MEDICAL_RECORD_CATEGORIES.map((cat) => (
              <FilterChip
                key={cat.id}
                label={cat.shortLabel}
                selected={activeCategory === cat.id}
                onPress={() => setActiveCategory(cat.id)}
                color={cat.color}
              />
            ))}
          </ScrollView>
        </View>

        <SectionTitle
          title="Meus documentos"
          subtitle={filtered.length ? `${filtered.length} arquivo(s)` : 'Nenhum documento nesta categoria'}
        />

        {filtered.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="folder-open-outline" size={28} color={colors.textMuted} />
            <Text style={styles.emptyText}>
              Toque em uma categoria acima para tirar foto, gravar vídeo, importar PDF ou anexar da galeria.
            </Text>
          </Card>
        ) : (
          filtered.map((record) => {
            const cat = getMedicalCategoryInfo(record.category);
            return (
              <Card key={record.id} style={styles.recordCard}>
                <Pressable onPress={() => handleOpen(record)} style={styles.recordThumbWrap}>
                  {record.mediaType === 'photo' ? (
                    <Image source={{ uri: record.uri }} style={styles.recordThumb} />
                  ) : (
                    <View style={[styles.recordThumb, styles.videoThumb]}>
                      <Ionicons
                        name={record.mediaType === 'pdf' ? 'document-text' : 'videocam'}
                        size={28}
                        color={record.mediaType === 'pdf' ? '#38BDF8' : colors.primary}
                      />
                    </View>
                  )}
                </Pressable>
                <View style={{ flex: 1 }}>
                  <View style={styles.recordMetaRow}>
                    <View style={[styles.catPill, { backgroundColor: `${cat.color}22` }]}>
                      <Text style={[styles.catPillText, { color: cat.color }]}>{cat.shortLabel}</Text>
                    </View>
                    <Text style={styles.recordType}>
                      {record.mediaType === 'photo' ? 'Foto' : record.mediaType === 'video' ? 'Vídeo' : 'PDF'}
                    </Text>
                  </View>
                  <Text style={styles.recordTitle}>{record.title}</Text>
                  {record.fileName && record.mediaType === 'pdf' ? (
                    <Text style={styles.recordFileName} numberOfLines={1}>{record.fileName}</Text>
                  ) : null}
                  <Text style={styles.recordDate}>{formatLocaleDate(locale, record.dateISO, { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                  {record.note ? <Text style={styles.recordNote} numberOfLines={2}>{record.note}</Text> : null}
                  <View style={styles.recordActions}>
                    {record.mediaType === 'pdf' ? (
                      <Pressable onPress={() => setPdfRecord(record)} style={styles.iconBtn}>
                        <Ionicons name="eye-outline" size={16} color={colors.primary} />
                        <Text style={styles.iconBtnText}>Visualizar</Text>
                      </Pressable>
                    ) : null}
                    <Pressable onPress={() => handleShare(record)} style={styles.iconBtn}>
                      <Ionicons name="share-outline" size={16} color={colors.primary} />
                      <Text style={styles.iconBtnText}>Enviar</Text>
                    </Pressable>
                    <Pressable onPress={() => handleDelete(record)} style={styles.iconBtn}>
                      <Ionicons name="trash-outline" size={16} color={colors.danger} />
                      <Text style={[styles.iconBtnText, { color: colors.danger }]}>Apagar</Text>
                    </Pressable>
                  </View>
                </View>
              </Card>
            );
          })
        )}

        <Text style={styles.fine}>
          Seus documentos ficam salvos apenas neste dispositivo. Use &quot;Enviar&quot; para compartilhar com seu
          professor ou médico (ex.: WhatsApp). O FitPro não substitui orientação médica profissional.
        </Text>
      </ScrollView>

      {/* Modal — confirmar salvamento */}
      <Modal visible={!!pending} animationType="slide" transparent onRequestClose={() => setPending(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={[typography.h3, { color: colors.text }]}>Salvar documento</Text>
              <Pressable onPress={() => setPending(null)}>
                <Ionicons name="close" size={22} color={colors.text} />
              </Pressable>
            </View>

            {pending ? (
              pending.mediaType === 'photo' ? (
                <Image source={{ uri: pending.uri }} style={styles.pendingPreview} />
              ) : pending.mediaType === 'pdf' ? (
                <View style={[styles.pendingPreview, styles.videoThumb]}>
                  <Ionicons name="document-text" size={40} color="#38BDF8" />
                  <Text style={styles.videoLabel} numberOfLines={2}>
                    {pending.fileName ?? 'PDF selecionado'}
                  </Text>
                </View>
              ) : (
                <View style={[styles.pendingPreview, styles.videoThumb]}>
                  <Ionicons name="videocam" size={40} color={colors.primary} />
                  <Text style={styles.videoLabel}>Vídeo selecionado</Text>
                </View>
              )
            ) : null}

            <Text style={styles.fieldLabel}>Categoria</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
              {MEDICAL_RECORD_CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  onPress={() => setPendingCategory(cat.id)}
                  style={[
                    styles.catSelectChip,
                    pendingCategory === cat.id && { borderColor: cat.color, backgroundColor: `${cat.color}18` },
                  ]}
                >
                  <Ionicons
                    name={cat.icon}
                    size={14}
                    color={pendingCategory === cat.id ? cat.color : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.catSelectText,
                      pendingCategory === cat.id && { color: cat.color },
                    ]}
                  >
                    {cat.shortLabel}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={styles.fieldLabel}>Título *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Hemograma completo — mar/2026"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.fieldLabel}>Observação (opcional)</Text>
            <TextInput
              style={[styles.input, { minHeight: 64 }]}
              placeholder="Ex.: Solicitado pelo endocrinologista"
              placeholderTextColor={colors.textMuted}
              value={note}
              onChangeText={setNote}
              multiline
            />

            <View style={{ gap: 8, marginTop: 8 }}>
              <PrimaryButton label="Salvar documento" icon="checkmark" onPress={handleConfirmSave} disabled={saving} />
              <PrimaryButton label="Cancelar" variant="outline" onPress={() => setPending(null)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal — visualizar foto */}
      <Modal visible={!!previewRecord && previewRecord.mediaType === 'photo'} animationType="fade" transparent onRequestClose={() => setPreviewRecord(null)}>
        <View style={styles.previewBackdrop}>
          <Pressable style={styles.previewClose} onPress={() => setPreviewRecord(null)}>
            <Ionicons name="close" size={28} color="#fff" />
          </Pressable>
          {previewRecord?.mediaType === 'photo' ? (
            <Image source={{ uri: previewRecord.uri }} style={styles.fullPreview} resizeMode="contain" />
          ) : null}
          {previewRecord ? (
            <View style={styles.previewCaption}>
              <Text style={styles.previewTitle}>{previewRecord.title}</Text>
              <Text style={styles.previewDate}>{formatLocaleDate(locale, previewRecord.dateISO, { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
            </View>
          ) : null}
        </View>
      </Modal>

      <MedicalRecordPdfViewer
        visible={!!pdfRecord}
        uri={pdfRecord?.uri ?? ''}
        title={pdfRecord?.title ?? 'PDF'}
        fileName={pdfRecord?.fileName}
        onClose={() => setPdfRecord(null)}
        onShare={() => {
          if (pdfRecord) handleShare(pdfRecord);
        }}
      />
    </SafeAreaView>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
  color,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  color?: string;
}) {
  const accent = color ?? colors.primary;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.filterChip,
        selected && { borderColor: accent, backgroundColor: `${accent}18` },
      ]}
    >
      <Text style={[styles.filterChipText, selected && { color: accent, fontWeight: '800' }]}>{label}</Text>
    </Pressable>
  );
}

function suggestTitleFromFileName(name: string) {
  return name
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
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
  headerBtn: { width: 32, padding: 4 },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl, gap: spacing.md },
  intro: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  categoryCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: 6,
    position: 'relative',
  },
  categoryIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  categoryLabel: { color: colors.text, fontWeight: '800', fontSize: 14 },
  categoryDesc: { color: colors.textMuted, fontSize: 11, lineHeight: 15 },
  countBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countBadgeText: { color: '#0B1210', fontSize: 11, fontWeight: '800' },
  filterRow: { marginTop: spacing.xs },
  filterScroll: { gap: 8, paddingVertical: 4 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filterChipText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  emptyCard: { alignItems: 'center', gap: 8, paddingVertical: spacing.lg },
  emptyText: { color: colors.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 19 },
  recordCard: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  recordThumbWrap: { borderRadius: radius.sm, overflow: 'hidden' },
  recordThumb: { width: 64, height: 84, borderRadius: radius.sm, backgroundColor: colors.surfaceAlt },
  videoThumb: { alignItems: 'center', justifyContent: 'center', gap: 4 },
  recordMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  catPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  catPillText: { fontSize: 10, fontWeight: '800' },
  recordType: { color: colors.textMuted, fontSize: 10, fontWeight: '600' },
  recordTitle: { color: colors.text, fontWeight: '800', fontSize: 14 },
  recordFileName: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  recordDate: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  recordNote: { color: colors.textMuted, fontSize: 12, marginTop: 4, lineHeight: 16 },
  recordActions: { flexDirection: 'row', gap: 16, marginTop: 10 },
  iconBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconBtnText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  fine: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16, marginTop: spacing.sm },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: '90%',
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  pendingPreview: {
    width: '100%',
    height: 160,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    marginBottom: spacing.md,
  },
  videoLabel: { color: colors.textMuted, fontSize: 12 },
  fieldLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', marginBottom: 6 },
  input: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 14,
    marginBottom: 10,
  },
  catSelectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    backgroundColor: colors.surfaceAlt,
  },
  catSelectText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  previewBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center' },
  previewClose: { position: 'absolute', top: 56, right: 20, zIndex: 2, padding: 8 },
  fullPreview: { width: '100%', height: '70%' },
  previewCaption: { padding: spacing.lg, alignItems: 'center' },
  previewTitle: { color: '#fff', fontWeight: '800', fontSize: 16, textAlign: 'center' },
  previewDate: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 },
});
