import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton, SectionTitle, SelectableChip } from '../components/ui';
import { useCustomPlan } from '../context/CustomPlanContext';
import { useUser } from '../context/UserContext';
import { RESPONSIBLE_PROFESSIONAL } from '../data/professional';
import { ProfileStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { CustomPlanStatus, Goal, PlanFrequency, TrainingPlace } from '../types';

const EQUIPMENT_OPTIONS = ['Peso do corpo', 'Halteres', 'Barra', 'Elásticos', 'Máquinas de academia', 'Cabo/Polia'];

export default function CustomPlanScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'CustomPlan'>>();
  const { profile } = useUser();
  const { latestRequest, createRequest } = useCustomPlan();

  const [frequency, setFrequency] = useState<PlanFrequency>('semanal');
  const [goal, setGoal] = useState<Goal>(profile?.goal ?? 'manter_forma');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [trainingPlace, setTrainingPlace] = useState<TrainingPlace>('academia');
  const [equipment, setEquipment] = useState<string[]>(['Peso do corpo']);
  const [restrictions, setRestrictions] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggleEquipment = (item: string) => {
    setEquipment((prev) => (prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const request = await createRequest({
        frequency,
        goal,
        daysPerWeek,
        trainingPlace,
        equipment,
        restrictions: restrictions.trim(),
        notes: notes.trim(),
      });

      const message = buildWhatsAppMessage({
        studentName: profile?.name ?? 'Aluno(a) FitPro',
        request,
      });
      const url = `https://wa.me/${RESPONSIBLE_PROFESSIONAL.whatsapp}?text=${encodeURIComponent(message)}`;

      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          'Solicitação registrada',
          'Não foi possível abrir o WhatsApp automaticamente, mas sua solicitação já foi salva no app.'
        );
      }
      navigation.goBack();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={[typography.h3, { color: colors.text }]}>Treino sob medida</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.introCard}>
          <View style={styles.proAvatar}>
            <Ionicons name="medal-outline" size={22} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.introTitle}>
              Peça pra {RESPONSIBLE_PROFESSIONAL.name.replace('Prof. ', '')} montar seu treino
            </Text>
            <Text style={styles.introSubtitle}>
              Conte suas preferências e receba uma ficha semanal ou mensal montada à mão pelo seu professor,
              em vez de um treino genérico.
            </Text>
          </View>
        </Card>

        {latestRequest ? (
          <Card style={[styles.statusCard, { borderColor: statusColor(latestRequest.status) }]}>
            <Ionicons name="time-outline" size={18} color={statusColor(latestRequest.status)} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.statusTitle, { color: statusColor(latestRequest.status) }]}>
                {statusLabel(latestRequest.status)}
              </Text>
              <Text style={styles.statusSubtitle}>
                Última solicitação: {formatDate(latestRequest.createdAtISO)} · Ficha {latestRequest.frequency}
              </Text>
            </View>
          </Card>
        ) : null}

        <SectionTitle title="Periodicidade da ficha" />
        <View style={styles.chipRow}>
          <SelectableChip label="Semanal" selected={frequency === 'semanal'} onPress={() => setFrequency('semanal')} />
          <SelectableChip label="Mensal" selected={frequency === 'mensal'} onPress={() => setFrequency('mensal')} />
        </View>

        <SectionTitle title="Objetivo principal" />
        <View style={styles.chipRow}>
          <SelectableChip label="Perder peso" selected={goal === 'perder_peso'} onPress={() => setGoal('perder_peso')} />
          <SelectableChip label="Ganhar massa" selected={goal === 'ganhar_massa'} onPress={() => setGoal('ganhar_massa')} />
          <SelectableChip label="Manter forma" selected={goal === 'manter_forma'} onPress={() => setGoal('manter_forma')} />
        </View>

        <SectionTitle title="Dias disponíveis por semana" />
        <View style={styles.stepperRow}>
          <Pressable
            style={styles.stepperBtn}
            onPress={() => setDaysPerWeek((d) => Math.max(1, d - 1))}
          >
            <Ionicons name="remove" size={18} color={colors.text} />
          </Pressable>
          <Text style={styles.stepperValue}>{daysPerWeek}x por semana</Text>
          <Pressable
            style={styles.stepperBtn}
            onPress={() => setDaysPerWeek((d) => Math.min(7, d + 1))}
          >
            <Ionicons name="add" size={18} color={colors.text} />
          </Pressable>
        </View>

        <SectionTitle title="Onde você treina" />
        <View style={styles.chipRow}>
          <SelectableChip label="Academia" selected={trainingPlace === 'academia'} onPress={() => setTrainingPlace('academia')} />
          <SelectableChip label="Casa" selected={trainingPlace === 'casa'} onPress={() => setTrainingPlace('casa')} />
          <SelectableChip label="Ambos" selected={trainingPlace === 'ambos'} onPress={() => setTrainingPlace('ambos')} />
        </View>

        <SectionTitle title="Equipamentos disponíveis" subtitle="Selecione todos que você tem acesso" />
        <View style={styles.chipRow}>
          {EQUIPMENT_OPTIONS.map((item) => (
            <SelectableChip key={item} label={item} selected={equipment.includes(item)} onPress={() => toggleEquipment(item)} />
          ))}
        </View>

        <SectionTitle title="Lesões ou restrições" subtitle="Opcional — ajuda seu professor a adaptar os exercícios" />
        <TextInput
          style={styles.input}
          placeholder="Ex.: dor no joelho direito, hérnia de disco, gestante..."
          placeholderTextColor={colors.textMuted}
          value={restrictions}
          onChangeText={setRestrictions}
          multiline
        />

        <SectionTitle title="Observações para o professor" />
        <TextInput
          style={styles.input}
          placeholder="Ex.: prefiro treinos mais curtos, foco em pernas, horário disponível..."
          placeholderTextColor={colors.textMuted}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <View style={{ marginTop: spacing.lg }}>
          <PrimaryButton
            label="Enviar solicitação ao professor"
            icon="paper-plane"
            onPress={handleSubmit}
            disabled={submitting}
          />
        </View>
        <Text style={styles.fine}>
          Sua solicitação é enviada por WhatsApp para {RESPONSIBLE_PROFESSIONAL.name} ({RESPONSIBLE_PROFESSIONAL.credential}),
          que monta sua ficha manualmente e te envia de volta pelo app ou pelo próprio WhatsApp.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function buildWhatsAppMessage({
  studentName,
  request,
}: {
  studentName: string;
  request: { frequency: PlanFrequency; goal: Goal; daysPerWeek: number; trainingPlace: TrainingPlace; equipment: string[]; restrictions: string; notes: string };
}) {
  const goalLabel =
    request.goal === 'perder_peso' ? 'Perder peso' : request.goal === 'ganhar_massa' ? 'Ganhar massa' : 'Manter a forma';
  const placeLabel =
    request.trainingPlace === 'academia' ? 'Academia' : request.trainingPlace === 'casa' ? 'Casa' : 'Casa e academia';

  const lines = [
    `Olá! Sou ${studentName}, aluno(a) do FitPro e gostaria de solicitar um treino sob medida.`,
    '',
    `📅 Periodicidade: ficha ${request.frequency}`,
    `🎯 Objetivo: ${goalLabel}`,
    `🗓️ Dias disponíveis: ${request.daysPerWeek}x por semana`,
    `📍 Local de treino: ${placeLabel}`,
    `🏋️ Equipamentos: ${request.equipment.length ? request.equipment.join(', ') : 'não informado'}`,
  ];
  if (request.restrictions) lines.push(`⚠️ Lesões/restrições: ${request.restrictions}`);
  if (request.notes) lines.push(`📝 Observações: ${request.notes}`);
  lines.push('', 'Pode montar minha ficha e me enviar por aqui? Obrigado(a)! 🙌');
  return lines.join('\n');
}

function statusLabel(status: CustomPlanStatus) {
  if (status === 'pendente') return 'Aguardando seu professor montar o treino';
  if (status === 'em_producao') return 'Seu professor está montando seu treino';
  return 'Treino entregue pelo professor';
}

function statusColor(status: CustomPlanStatus) {
  if (status === 'entregue') return colors.primary;
  if (status === 'em_producao') return colors.gold;
  return colors.textMuted;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR');
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
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  introCard: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center', marginBottom: spacing.md },
  proAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introTitle: { color: colors.text, fontWeight: '800', fontSize: 14, marginBottom: 4 },
  introSubtitle: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  statusCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md, borderWidth: 1 },
  statusTitle: { fontWeight: '800', fontSize: 13 },
  statusSubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: spacing.lg },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: { color: colors.text, fontWeight: '800', fontSize: 15, minWidth: 110, textAlign: 'center' },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    color: colors.text,
    fontSize: 13,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: spacing.lg,
  },
  fine: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: spacing.sm, lineHeight: 16 },
});
