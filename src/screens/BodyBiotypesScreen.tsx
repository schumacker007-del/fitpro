import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BiotypeFigure from '../components/BiotypeFigure';
import { Card, PrimaryButton, SectionTitle } from '../components/ui';
import { BIOTYPE_INTRO, BODY_BIOTYPES } from '../data/bodyBiotypes';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function BodyBiotypesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'BodyBiotypes'>>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Biotipos corporais</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={BODY_BIOTYPES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <SectionTitle
              title="Os 3 biotipos"
              subtitle="Ectomorfo, mesomorfo e endomorfo — entenda o seu perfil"
            />
            <Card style={styles.introCard}>
              <Text style={styles.introText}>{BIOTYPE_INTRO}</Text>
            </Card>
          </>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('BodyBiotypeDetail', { biotypeId: item.id })}>
            <Card style={styles.biotypeCard}>
              <View style={[styles.iconWrap, { backgroundColor: `${item.color}22` }]}>
                <BiotypeFigure biotypeId={item.id} size={44} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.biotypeName}>{item.name}</Text>
                <Text style={[styles.biotypeNick, { color: item.color }]}>{item.nickname}</Text>
                <Text style={styles.biotypeShort} numberOfLines={2}>
                  {item.characteristics}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Card>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListFooterComponent={
          <View style={styles.footer}>
            <PrimaryButton
              label="Como identificar o seu biotipo"
              icon="help-circle-outline"
              variant="outline"
              onPress={() => navigation.navigate('BiotypeIdentification')}
            />
          </View>
        }
      />
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
  list: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  introCard: { marginBottom: spacing.md },
  introText: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  biotypeCard: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  biotypeName: { color: colors.text, fontWeight: '800', fontSize: 16 },
  biotypeNick: { fontSize: 12, fontWeight: '600', marginTop: 2, marginBottom: 4 },
  biotypeShort: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  footer: { marginTop: spacing.lg },
});
