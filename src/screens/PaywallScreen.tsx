import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton } from '../components/ui';
import { useUser } from '../context/UserContext';
import { ProfileStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

const FEATURES: { label: string; free: boolean; pro: boolean }[] = [
  { label: 'Cadastro de peso, altura, idade e objetivo', free: true, pro: true },
  { label: 'Treinos básicos com animação demonstrativa', free: true, pro: true },
  { label: 'Dieta geral por objetivo', free: true, pro: true },
  { label: 'Biblioteca completa de treinos (todos os níveis)', free: false, pro: true },
  { label: 'Plano alimentar semanal detalhado', free: false, pro: true },
  { label: 'Acompanhamento supervisionado por Educador Físico', free: false, pro: true },
  { label: 'Sem anúncios e novidades em primeira mão', free: false, pro: true },
];

const PLANS = [
  { id: 'monthly', label: 'Mensal', price: 'R$ 29,90/mês' },
  { id: 'yearly', label: 'Anual', price: 'R$ 199,90/ano', badge: 'Economize 44%' },
] as const;

export default function PaywallScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'Paywall'>>();
  const { upgradeToPro } = useUser();
  const [selected, setSelected] = useState<'monthly' | 'yearly'>('yearly');

  const handleSubscribe = async () => {
    // NOTE: aqui entraria a integração real de pagamento (StoreKit / RevenueCat / App Store).
    // Por enquanto simulamos a compra para fins de demonstração do produto.
    await upgradeToPro();
    Alert.alert('Bem-vindo(a) ao Pro! 🎉', 'Sua assinatura de demonstração foi ativada.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color={colors.text} />
          </Pressable>
        </View>

        <Ionicons name="star" size={40} color={colors.gold} style={{ alignSelf: 'center' }} />
        <Text style={[typography.h1, styles.title]}>FitPro Pro</Text>
        <Text style={styles.subtitle}>Treinos completos, dietas detalhadas e acompanhamento profissional.</Text>

        <Card style={{ marginTop: spacing.lg }}>
          {FEATURES.map((f, i) => (
            <View key={i} style={[styles.featureRow, i !== FEATURES.length - 1 && styles.featureRowBorder]}>
              <Text style={styles.featureLabel}>{f.label}</Text>
              <View style={styles.featureIcons}>
                <Ionicons name={f.free ? 'checkmark' : 'close'} size={16} color={f.free ? colors.primary : colors.textMuted} />
                <Ionicons name={f.pro ? 'checkmark-circle' : 'close'} size={16} color={f.pro ? colors.gold : colors.textMuted} />
              </View>
            </View>
          ))}
          <View style={styles.legendRow}>
            <Text style={styles.legendText}>Free</Text>
            <Text style={[styles.legendText, { color: colors.gold }]}>Pro</Text>
          </View>
        </Card>

        <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
          {PLANS.map((plan) => {
            const isSelected = selected === plan.id;
            return (
              <Pressable key={plan.id} onPress={() => setSelected(plan.id)}>
                <Card style={[styles.planCard, isSelected && styles.planCardSelected]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.planLabel}>{plan.label}</Text>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                  </View>
                  {'badge' in plan && plan.badge ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{plan.badge}</Text>
                    </View>
                  ) : null}
                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={isSelected ? colors.primary : colors.textMuted}
                  />
                </Card>
              </Pressable>
            );
          })}
        </View>

        <View style={{ marginTop: spacing.lg }}>
          <PrimaryButton label="Assinar agora" icon="star" variant="gold" onPress={handleSubscribe} />
        </View>
        <Text style={styles.fine}>
          Demonstração: nenhuma cobrança real será feita. Numa versão publicada, a assinatura seria processada
          via App Store (StoreKit / In-App Purchase).
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  headerRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  closeBtn: { padding: 4 },
  title: { color: colors.text, textAlign: 'center', marginTop: spacing.sm },
  subtitle: { color: colors.textMuted, textAlign: 'center', marginTop: 6, lineHeight: 20, paddingHorizontal: spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  featureRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  featureLabel: { color: colors.text, flex: 1, fontSize: 13, marginRight: 8 },
  featureIcons: { flexDirection: 'row', gap: 14, width: 50, justifyContent: 'space-between' },
  legendRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginTop: 8, paddingRight: 2 },
  legendText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  planCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  planCardSelected: { borderColor: colors.primary, backgroundColor: 'rgba(52,211,153,0.08)' },
  planLabel: { color: colors.text, fontWeight: '800', fontSize: 15 },
  planPrice: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  badge: { backgroundColor: colors.gold, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { color: '#0B1210', fontSize: 10, fontWeight: '800' },
  fine: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: spacing.md, lineHeight: 16 },
});
