import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton, SectionTitle } from '../components/ui';
import { useCustomPlan } from '../context/CustomPlanContext';
import { useGamification } from '../context/GamificationContext';
import { useMedicalRecords } from '../context/MedicalRecordContext';
import { useProgressPhotos } from '../context/ProgressPhotoContext';
import { useTrainingLog } from '../context/TrainingLogContext';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { getDietForGoal } from '../data/diets';
import { ProfileStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';
import {
  DEFAULT_REPORT_SECTIONS,
  generateProgressReportPdf,
  goalLabelFromGoal,
  ReportSections,
  shareProgressReportPdf,
} from '../utils/progressReportPdf';

type SectionKey = keyof ReportSections;

const SECTION_OPTIONS: { key: SectionKey; label: string; hint: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'profile', label: 'Dados do atleta', hint: 'Peso, altura, IMC e objetivo', icon: 'person-outline' },
  { key: 'consistency', label: 'Consistência', hint: 'Sequências de treino e dieta', icon: 'flame-outline' },
  { key: 'training', label: 'Treinos e RPE', hint: 'Registros recentes de esforço', icon: 'barbell-outline' },
  { key: 'diet', label: 'Plano alimentar', hint: 'Refeições e orientações do plano ativo', icon: 'nutrition-outline' },
  { key: 'medical', label: 'Documentos de saúde', hint: 'Lista de exames e prescrições', icon: 'document-text-outline' },
  { key: 'photos', label: 'Fotos de evolução', hint: 'Datas e peso registrados', icon: 'images-outline' },
  { key: 'badges', label: 'Conquistas', hint: 'Badges desbloqueados no app', icon: 'trophy-outline' },
];

function customPlanStatusLabel(status: string) {
  if (status === 'pendente') return 'Aguardando montagem da ficha';
  if (status === 'em_producao') return 'Ficha em produção';
  return 'Ficha entregue';
}

export default function ProgressReportScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'ProgressReport'>>();
  const { profile, planTier, bmi } = useUser();
  const { locale, t } = useLanguage();
  const { snapshot } = useGamification();
  const { logs } = useTrainingLog();
  const { records } = useMedicalRecords();
  const { photos } = useProgressPhotos();
  const { latestRequest } = useCustomPlan();
  const [sections, setSections] = useState<ReportSections>(DEFAULT_REPORT_SECTIONS);
  const [exporting, setExporting] = useState(false);

  const goal = profile?.goal ?? 'manter_forma';
  const activeDiet = useMemo(() => {
    const proDiet = getDietForGoal(goal, 'pro');
    const freeDiet = getDietForGoal(goal, 'free');
    return planTier === 'pro' ? proDiet ?? freeDiet : freeDiet;
  }, [goal, planTier]);

  const selectedCount = Object.values(sections).filter(Boolean).length;

  const toggleSection = (key: SectionKey) => {
    setSections((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const enabled = Object.values(next).filter(Boolean).length;
      if (enabled === 0) return prev;
      return next;
    });
  };

  const handleExport = async () => {
    if (!profile) {
      Alert.alert(t('progressReport.profileIncomplete'), t('progressReport.profileIncompleteBody'));
      return;
    }

    setExporting(true);
    try {
      const uri = await generateProgressReportPdf(
        {
          profile,
          bmi,
          planTier,
          goalLabel: goalLabelFromGoal(profile.goal),
          gamification: snapshot,
          trainingLogs: logs,
          diet: activeDiet ?? null,
          medicalRecords: records,
          progressPhotos: photos,
          customPlanStatus: latestRequest ? customPlanStatusLabel(latestRequest.status) : undefined,
          locale,
        },
        sections
      );
      await shareProgressReportPdf(uri);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Não foi possível gerar o PDF.';
      Alert.alert(t('progressReport.exportError'), message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Relatório PDF</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          title="Exportar para professor ou médico"
          subtitle="Monte um PDF com seus dados de treino, dieta, exames e evolução para compartilhar."
        />

        <Card style={styles.summaryCard}>
          <Ionicons name="document-attach-outline" size={22} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>{profile?.name ?? 'Atleta'}</Text>
            <Text style={styles.summaryMeta}>
              {selectedCount} seção(ões) · {logs.length} registro(s) de RPE · {records.length} documento(s) · {photos.length}{' '}
              foto(s)
            </Text>
          </View>
        </Card>

        <Text style={styles.sectionLabel}>Incluir no relatório</Text>
        <Card style={styles.listCard}>
          {SECTION_OPTIONS.map((option, index) => {
            const enabled = sections[option.key];
            return (
              <Pressable
                key={option.key}
                onPress={() => toggleSection(option.key)}
                style={[styles.row, index < SECTION_OPTIONS.length - 1 && styles.rowBorder]}
              >
                <View style={[styles.check, enabled && styles.checkOn]}>
                  {enabled ? <Ionicons name="checkmark" size={14} color={colors.background} /> : null}
                </View>
                <Ionicons name={option.icon} size={18} color={enabled ? colors.primary : colors.textMuted} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.rowTitle, !enabled && styles.rowTitleOff]}>{option.label}</Text>
                  <Text style={styles.rowHint}>{option.hint}</Text>
                </View>
              </Pressable>
            );
          })}
        </Card>

        <Card style={styles.noteCard}>
          <Ionicons name="information-circle-outline" size={18} color={colors.gold} />
          <Text style={styles.noteText}>
            O PDF inclui um aviso legal. Documentos e fotos aparecem apenas como resumo — os arquivos originais continuam no app.
          </Text>
        </Card>

        <PrimaryButton
          label={exporting ? 'Gerando PDF...' : 'Gerar e compartilhar PDF'}
          icon="share-outline"
          onPress={handleExport}
          disabled={exporting}
        />

        {exporting ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>Preparando relatório...</Text>
          </View>
        ) : null}
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
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  content: { padding: spacing.md, paddingBottom: spacing.xl, gap: spacing.md },
  summaryCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  summaryTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  summaryMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  sectionLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.6 },
  listCard: { paddingVertical: 0, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md, paddingHorizontal: spacing.md },
  rowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  check: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  rowTitle: { color: colors.text, fontSize: 15, fontWeight: '600' },
  rowTitleOff: { color: colors.textMuted },
  rowHint: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  noteCard: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  noteText: { flex: 1, color: colors.textMuted, fontSize: 13, lineHeight: 18 },
  loadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  loadingText: { color: colors.textMuted, fontSize: 13 },
});
