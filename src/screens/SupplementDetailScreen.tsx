import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import { useLanguage } from '../context/LanguageContext';
import { getSupplement } from '../data/supplements';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function SupplementDetailScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'SupplementDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'SupplementDetail'>>();
  const supplement = getSupplement(route.params.supplementId);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('nutrition.labels.supplement')}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MedicalDisclaimerBanner />
        <View style={[styles.heroBadge, { backgroundColor: `${supplement.color}22` }]}>
          <Ionicons
            name={supplement.icon as keyof typeof Ionicons.glyphMap}
            size={36}
            color={supplement.color}
          />
        </View>

        <Text style={styles.title}>{supplement.name}</Text>

        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>{t('nutrition.labels.mainFunction')}</Text>
          <Text style={styles.body}>{supplement.mainFunction}</Text>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>{t('nutrition.labels.benefitsPurpose')}</Text>
          <Text style={styles.body}>{supplement.benefits}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 16 },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  heroBadge: {
    width: 80,
    height: 80,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 28,
  },
  section: { marginBottom: spacing.md },
  sectionLabel: { color: colors.primary, fontSize: 13, fontWeight: '700', marginBottom: spacing.sm },
  body: { color: colors.text, fontSize: 14, lineHeight: 22 },
});
