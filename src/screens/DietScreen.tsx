import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, ProBadge, SectionTitle } from '../components/ui';
import { useUser } from '../context/UserContext';
import { getDietForGoal } from '../data/diets';
import { colors, spacing } from '../theme';

export default function DietScreen() {
  const { profile, planTier } = useUser();
  const navigation = useNavigation<any>();
  const goal = profile?.goal ?? 'manter_forma';

  const freeDiet = getDietForGoal(goal, 'free');
  const proDiet = getDietForGoal(goal, 'pro');
  const activeDiet = planTier === 'pro' ? proDiet ?? freeDiet : freeDiet;

  if (!activeDiet) return null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title="Dieta" subtitle="Sugestão de alimentação para o seu objetivo" />

        <Card>
          <View style={styles.titleRow}>
            <Text style={styles.dietTitle}>{activeDiet.title}</Text>
            {activeDiet.tier === 'pro' ? <ProBadge /> : null}
          </View>
          <Text style={styles.kcalTarget}>{activeDiet.dailyKcalTarget}</Text>
        </Card>

        <SectionTitle title="Refeições sugeridas" />
        {activeDiet.meals.map((meal, idx) => (
          <Card key={idx} style={{ marginBottom: spacing.sm }}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Pill label={`~${meal.kcal} kcal`} tone="primary" />
            </View>
            {meal.items.map((item, i) => (
              <View key={i} style={styles.itemRow}>
                <Ionicons name="checkmark-circle-outline" size={16} color={colors.primary} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </Card>
        ))}

        <SectionTitle title="Dicas" />
        <Card>
          {activeDiet.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </Card>

        {planTier === 'free' && proDiet ? (
          <Pressable
            onPress={() => navigation.getParent()?.navigate('Perfil', { screen: 'Paywall' })}
            style={{ marginTop: spacing.md }}
          >
            <Card style={styles.proBanner}>
              <Ionicons name="star" size={22} color="#0B1210" />
              <View style={{ flex: 1 }}>
                <Text style={styles.proBannerTitle}>Plano semanal completo no Pro</Text>
                <Text style={styles.proBannerSubtitle}>Cardápio detalhado dia a dia, calculado para seu perfil.</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#0B1210" />
            </Card>
          </Pressable>
        ) : null}

        <Text style={styles.disclaimer}>
          Sugestões nutricionais gerais revisadas por profissional de Educação Física. Para necessidades
          específicas, procure um nutricionista.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  dietTitle: { color: colors.text, fontSize: 17, fontWeight: '800', flex: 1, marginRight: 8 },
  kcalTarget: { color: colors.textMuted, fontSize: 13, lineHeight: 18 },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  mealName: { color: colors.text, fontWeight: '700', fontSize: 15 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  itemText: { color: colors.textMuted, fontSize: 13, flex: 1 },
  tipRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  tipBullet: { color: colors.primary, fontWeight: '800' },
  tipText: { color: colors.text, flex: 1, lineHeight: 19, fontSize: 13 },
  proBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.gold, borderColor: colors.gold },
  proBannerTitle: { color: '#0B1210', fontWeight: '800', fontSize: 14 },
  proBannerSubtitle: { color: '#0B1210', fontSize: 11, marginTop: 2 },
  disclaimer: { color: colors.textMuted, fontSize: 11, marginTop: spacing.lg, lineHeight: 16, textAlign: 'center' },
});
