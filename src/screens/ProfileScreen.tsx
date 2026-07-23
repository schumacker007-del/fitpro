import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressChart from '../components/ProgressChart';
import { Card, Pill, PrimaryButton, SectionTitle } from '../components/ui';
import { useCustomPlan } from '../context/CustomPlanContext';
import { useProgressPhotos } from '../context/ProgressPhotoContext';
import { useTrainingLog } from '../context/TrainingLogContext';
import { useUser } from '../context/UserContext';
import { RESPONSIBLE_PROFESSIONAL } from '../data/professional';
import { ProfileStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'Profile'>>();
  const { profile, planTier, bmi, downgradeToFree, resetProfile } = useUser();
  const { logs, getSuggestion } = useTrainingLog();
  const { latestRequest } = useCustomPlan();
  const { photos } = useProgressPhotos();
  const photoCount = photos.length;

  const recentExerciseIds = Array.from(new Set(logs.map((l) => l.exerciseId))).slice(0, 3);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title="Perfil" />

        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={colors.background} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{profile?.name ?? 'Atleta'}</Text>
            <Text style={styles.goal}>{goalLabel(profile?.goal)}</Text>
          </View>
          <Pill label={planTier === 'pro' ? 'PRO' : 'FREE'} tone={planTier === 'pro' ? 'gold' : 'default'} />
        </Card>

        <View style={styles.statsRow}>
          <StatBox label="Peso" value={profile ? `${profile.weightKg} kg` : '--'} />
          <StatBox label="Altura" value={profile ? `${profile.heightCm} cm` : '--'} />
          <StatBox label="Idade" value={profile ? `${profile.age} anos` : '--'} />
          <StatBox label="IMC" value={bmi ? bmi.toFixed(1) : '--'} />
        </View>

        <SectionTitle title="Assinatura" />
        <Card>
          <Text style={styles.planTitle}>
            Plano atual: <Text style={{ color: planTier === 'pro' ? colors.gold : colors.text }}>{planTier === 'pro' ? 'Pro' : 'Free'}</Text>
          </Text>
          <Text style={styles.planDesc}>
            {planTier === 'pro'
              ? 'Você tem acesso completo a treinos, dietas detalhadas e novidades do app.'
              : 'Você está no plano gratuito, com acesso a treinos básicos e dieta geral.'}
          </Text>
          <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
            {planTier === 'free' ? (
              <PrimaryButton label="Assinar FitPro Pro" icon="star" variant="gold" onPress={() => navigation.navigate('Paywall')} />
            ) : (
              <PrimaryButton
                label="Gerenciar assinatura"
                icon="settings-outline"
                variant="outline"
                onPress={() =>
                  Alert.alert('Assinatura Pro', 'Deseja cancelar e voltar para o plano gratuito?', [
                    { text: 'Manter Pro', style: 'cancel' },
                    { text: 'Cancelar Pro', style: 'destructive', onPress: downgradeToFree },
                  ])
                }
              />
            )}
          </View>
        </Card>

        <SectionTitle title="Meu progresso" subtitle="Esforço percebido (RPE) registrado no Modo Treino Ativo" />
        {planTier === 'pro' ? (
          <Card>
            <ProgressChart logs={logs} />
            {recentExerciseIds.length > 0 ? (
              <View style={{ marginTop: spacing.md, gap: 8 }}>
                {recentExerciseIds.map((exerciseId) => {
                  const log = logs.find((l) => l.exerciseId === exerciseId);
                  const suggestion = getSuggestion(exerciseId);
                  if (!log || !suggestion || suggestion.suggestion === 'maintain') return null;
                  const isIncrease = suggestion.suggestion === 'increase_load';
                  return (
                    <View key={exerciseId} style={styles.suggestionRow}>
                      <Ionicons
                        name={isIncrease ? 'trending-up' : 'alert-circle'}
                        size={16}
                        color={isIncrease ? colors.primary : colors.danger}
                      />
                      <Text style={styles.suggestionRowText}>
                        <Text style={{ fontWeight: '800' }}>{log.exerciseName}: </Text>
                        {isIncrease ? 'considere aumentar a carga.' : 'considere descansar mais.'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </Card>
        ) : (
          <Card style={styles.teaserCard}>
            <Ionicons name="lock-closed" size={20} color={colors.gold} />
            <Text style={styles.teaserTitle}>Acompanhamento de esforço e progressão no Pro</Text>
            <Text style={styles.teaserSubtitle}>
              Registre o RPE dos seus treinos no Modo Treino Ativo e receba sugestões automáticas de carga.
            </Text>
            <PrimaryButton label="Ver plano Pro" icon="star" variant="gold" onPress={() => navigation.navigate('Paywall')} />
          </Card>
        )}

        <SectionTitle title="Treino sob medida" subtitle="Ficha semanal ou mensal montada à mão pelo seu professor" />
        {planTier === 'pro' ? (
          <Card>
            {latestRequest ? (
              <View style={styles.customPlanStatusRow}>
                <Ionicons name="time-outline" size={16} color={statusColor(latestRequest.status)} />
                <Text style={[styles.customPlanStatusText, { color: statusColor(latestRequest.status) }]}>
                  {statusLabel(latestRequest.status)}
                </Text>
              </View>
            ) : (
              <Text style={styles.planDesc}>
                Conte seus dias disponíveis, objetivo e restrições — {RESPONSIBLE_PROFESSIONAL.name.replace('Prof. ', '')}{' '}
                monta sua ficha e te envia de volta.
              </Text>
            )}
            <View style={{ marginTop: spacing.md }}>
              <PrimaryButton
                label={latestRequest ? 'Solicitar nova ficha' : 'Solicitar treino personalizado'}
                icon="paper-plane"
                variant="outline"
                onPress={() => navigation.navigate('CustomPlan')}
              />
            </View>
          </Card>
        ) : (
          <Card style={styles.teaserCard}>
            <Ionicons name="lock-closed" size={20} color={colors.gold} />
            <Text style={styles.teaserTitle}>Treino sob medida no Pro</Text>
            <Text style={styles.teaserSubtitle}>
              Peça uma ficha semanal ou mensal montada manualmente pelo seu professor, em vez de um treino genérico.
            </Text>
            <PrimaryButton label="Ver plano Pro" icon="star" variant="gold" onPress={() => navigation.navigate('Paywall')} />
          </Card>
        )}

        <SectionTitle title="Fotos de evolução" subtitle="Registre fotos periódicas e compare sua transformação" />
        {planTier === 'pro' ? (
          <Card>
            <Text style={styles.planDesc}>
              {photoCount > 0
                ? `${photoCount} foto(s) registrada(s). Compare lado a lado ou envie para seu professor.`
                : 'Tire uma foto agora para começar a acompanhar sua evolução física.'}
            </Text>
            <View style={{ marginTop: spacing.md }}>
              <PrimaryButton
                label={photoCount > 0 ? 'Ver minhas fotos' : 'Registrar primeira foto'}
                icon="camera-outline"
                variant="outline"
                onPress={() => navigation.navigate('ProgressPhotos')}
              />
            </View>
          </Card>
        ) : (
          <Card style={styles.teaserCard}>
            <Ionicons name="lock-closed" size={20} color={colors.gold} />
            <Text style={styles.teaserTitle}>Fotos de evolução no Pro</Text>
            <Text style={styles.teaserSubtitle}>
              Registre fotos periódicas, compare antes/depois e envie diretamente para seu professor.
            </Text>
            <PrimaryButton label="Ver plano Pro" icon="star" variant="gold" onPress={() => navigation.navigate('Paywall')} />
          </Card>
        )}

        <SectionTitle title="Responsável técnico" />
        <Card>
          <View style={styles.proRow}>
            <View style={styles.proAvatar}>
              <Ionicons name="medal-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.proName}>{RESPONSIBLE_PROFESSIONAL.name}</Text>
              <Text style={styles.proRole}>{RESPONSIBLE_PROFESSIONAL.role}</Text>
              <Text style={styles.proCredential}>{RESPONSIBLE_PROFESSIONAL.credential}</Text>
            </View>
          </View>
          <Text style={styles.proBio}>{RESPONSIBLE_PROFESSIONAL.bio}</Text>
          <Text style={styles.disclaimer}>{RESPONSIBLE_PROFESSIONAL.disclaimer}</Text>
        </Card>

        <View style={{ marginTop: spacing.lg }}>
          <PrimaryButton
            label="Editar / refazer perfil"
            icon="create-outline"
            variant="outline"
            onPress={() =>
              Alert.alert('Refazer perfil', 'Isso vai limpar seus dados salvos e abrir o cadastro novamente.', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Refazer', style: 'destructive', onPress: resetProfile },
              ])
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <Card style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

function statusLabel(status: string) {
  if (status === 'pendente') return 'Aguardando seu professor montar o treino';
  if (status === 'em_producao') return 'Seu professor está montando seu treino';
  return 'Treino entregue pelo professor';
}

function statusColor(status: string) {
  if (status === 'entregue') return colors.primary;
  if (status === 'em_producao') return colors.gold;
  return colors.textMuted;
}

function goalLabel(goal?: string) {
  if (goal === 'perder_peso') return 'Objetivo: perder peso';
  if (goal === 'ganhar_massa') return 'Objetivo: ganhar massa';
  if (goal === 'manter_forma') return 'Objetivo: manter a forma';
  return 'Objetivo não definido';
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { color: colors.text, fontSize: 17, fontWeight: '800' },
  goal: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.md },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm },
  statValue: { color: colors.text, fontWeight: '800', fontSize: 15 },
  statLabel: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  planTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: 6 },
  planDesc: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  customPlanStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  customPlanStatusText: { fontWeight: '700', fontSize: 13, flex: 1 },
  proRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  proAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proName: { color: colors.text, fontWeight: '800', fontSize: 14 },
  proRole: { color: colors.textMuted, fontSize: 12, marginTop: 1 },
  proCredential: { color: colors.primary, fontSize: 11, marginTop: 1, fontWeight: '700' },
  proBio: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginBottom: 8 },
  disclaimer: { color: colors.textMuted, fontSize: 11, lineHeight: 16, fontStyle: 'italic' },
  suggestionRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  suggestionRowText: { color: colors.textMuted, flex: 1, fontSize: 12, lineHeight: 17 },
  teaserCard: { alignItems: 'center', gap: 6 },
  teaserTitle: { color: colors.text, fontWeight: '800', fontSize: 14, textAlign: 'center', marginTop: 4 },
  teaserSubtitle: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: spacing.sm },
});
