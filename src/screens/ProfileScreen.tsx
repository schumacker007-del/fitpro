import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, PrimaryButton, SectionTitle } from '../components/ui';
import { useUser } from '../context/UserContext';
import { RESPONSIBLE_PROFESSIONAL } from '../data/professional';
import { ProfileStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'Profile'>>();
  const { profile, planTier, bmi, downgradeToFree, resetProfile } = useUser();

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
});
