import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, SectionTitle } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { SUPPLEMENT_STACKS, SUPPLEMENTS } from '../data/supplements';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function SupplementsScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'Supplements'>>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('diet.supplementsTitle')}</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={SUPPLEMENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <SectionTitle
            title={t('nutrition.labels.supplementsListTitle')}
            subtitle={t('nutrition.labels.supplementsListSubtitle')}
          />
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('SupplementDetail', { supplementId: item.id })}>
            <Card style={styles.itemCard}>
              <View style={[styles.iconWrap, { backgroundColor: `${item.color}22` }]}>
                <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={22} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemShort} numberOfLines={2}>
                  {item.shortDescription}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Card>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>{t('nutrition.labels.stacksTitle')}</Text>
            {SUPPLEMENT_STACKS.map((stack) => (
              <Card key={stack.title} style={styles.stackCard}>
                <View style={[styles.stackDot, { backgroundColor: stack.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.stackTitle}>{stack.title}</Text>
                  <Text style={styles.stackItems}>{stack.items.join(' + ')}</Text>
                </View>
              </Card>
            ))}
            <Text style={styles.disclaimer}>{t('nutrition.labels.supplementsDisclaimer')}</Text>
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
  itemCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: { color: colors.text, fontWeight: '800', fontSize: 14, marginBottom: 3 },
  itemShort: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  footer: { marginTop: spacing.lg },
  footerTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: spacing.sm },
  stackCard: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginBottom: spacing.sm },
  stackDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  stackTitle: { color: colors.text, fontWeight: '700', fontSize: 13, marginBottom: 2 },
  stackItems: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  disclaimer: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
