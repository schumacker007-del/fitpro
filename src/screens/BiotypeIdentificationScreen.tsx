import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { BIOTYPE_TESTS, getBodyBiotype } from '../data/bodyBiotypes';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function BiotypeIdentificationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'BiotypeIdentification'>>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Identifique seu biotipo</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>
          Use os testes abaixo para descobrir qual biotipo parece mais com o seu perfil. A maioria das pessoas é uma
          mistura — o importante é identificar o tipo dominante.
        </Text>

        {BIOTYPE_TESTS.map((test, index) => (
          <Card key={test.id} style={styles.testCard}>
            <View style={styles.testBadge}>
              <Text style={styles.testNumber}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.testTitle}>{test.title}</Text>
              <Text style={styles.testInstructions}>{test.instructions}</Text>
              {test.results.map((result) => {
                const biotype = getBodyBiotype(result.biotypeId);
                return (
                  <View key={result.biotypeId} style={styles.resultRow}>
                    <View style={[styles.resultDot, { backgroundColor: biotype.color }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.resultLabel, { color: biotype.color }]}>{biotype.name}</Text>
                      <Text style={styles.resultText}>{result.label}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Card>
        ))}
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
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 15 },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  intro: { color: colors.textMuted, fontSize: 13, lineHeight: 20, marginBottom: spacing.lg },
  testCard: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md, alignItems: 'flex-start' },
  testBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  testNumber: { color: colors.primary, fontWeight: '800', fontSize: 14 },
  testTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: 6 },
  testInstructions: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: spacing.sm },
  resultRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  resultDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  resultLabel: { fontWeight: '700', fontSize: 12, marginBottom: 2 },
  resultText: { color: colors.text, fontSize: 13, lineHeight: 18 },
});
