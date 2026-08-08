import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BiotypeFigure from '../components/BiotypeFigure';
import { Card } from '../components/ui';
import { getBodyBiotype } from '../data/bodyBiotypes';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function BodyBiotypeDetailScreen() {
  const route = useRoute<RouteProp<WorkoutsStackParamList, 'BodyBiotypeDetail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'BodyBiotypeDetail'>>();
  const biotype = getBodyBiotype(route.params.biotypeId);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {biotype.name}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroBadge, { backgroundColor: `${biotype.color}22` }]}>
          <BiotypeFigure biotypeId={biotype.id} size={96} color={biotype.color} />
        </View>

        <Text style={styles.title}>{biotype.name}</Text>
        <Text style={[styles.nickname, { color: biotype.color }]}>{biotype.nickname}</Text>

        <InfoSection title="Estrutura" body={biotype.structure} icon="body-outline" />
        <InfoSection title="Metabolismo" body={biotype.metabolism} icon="speedometer-outline" />
        <InfoSection title="Características" body={biotype.characteristics} icon="person-outline" />
        <InfoSection title="Tendência no treino" body={biotype.trainingTendency} icon="barbell-outline" />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoSection({ title, body, icon }: { title: string; body: string; icon: string }) {
  return (
    <Card style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={18} color={colors.primary} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.body}>{body}</Text>
    </Card>
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
  title: { color: colors.text, fontSize: 24, fontWeight: '800', textAlign: 'center' },
  nickname: { fontSize: 14, fontWeight: '600', textAlign: 'center', marginTop: 4, marginBottom: spacing.lg },
  section: { marginBottom: spacing.md },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  body: { color: colors.text, fontSize: 14, lineHeight: 22 },
});
