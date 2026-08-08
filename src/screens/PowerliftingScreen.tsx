import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Pill, SectionTitle } from '../components/ui';
import PowerliftingAdvancedVideoGallery from '../components/PowerliftingAdvancedVideoGallery';
import { useUser } from '../context/UserContext';
import {
  getPowerliftingWorkoutCount,
  isPowerliftingAdvancedLocked,
  POWERLIFTING_ADVANCED_PROGRESS_VIDEOS,
  POWERLIFTING_INTRO,
  POWERLIFTING_LEVELS,
  POWERLIFTING_TAGLINE,
} from '../data/powerlifting';
import { WorkoutsStackParamList } from '../navigation/types';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { allowScreenCaptureGuard } from '../hooks/usePreventScreenCapture';
import { PowerliftingLevelId } from '../types';
import { colors, radius, spacing, typography } from '../theme';

export default function PowerliftingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'Powerlifting'>>();
  const { isPowerliftingAdvancedActive } = useUser();

  useFocusEffect(
    useCallback(() => {
      allowScreenCaptureGuard();
    }, []),
  );

  const openLevel = (levelId: PowerliftingLevelId) => {
    if (isPowerliftingAdvancedLocked(levelId, isPowerliftingAdvancedActive)) {
      navigation.navigate('PowerliftingAdvancedPaywall');
      return;
    }
    navigation.navigate('PowerliftingLevel', { levelId });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigateBackOrHome(navigation, 'WorkoutsList')}
          style={styles.backBtn}
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Powerlifting</Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={POWERLIFTING_LEVELS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <SectionTitle title="Programas de força" subtitle={POWERLIFTING_TAGLINE} />
            <Card style={styles.introCard}>
              <View style={styles.introRow}>
                <View style={styles.introIcon}>
                  <Ionicons name="barbell" size={24} color={colors.primary} />
                </View>
                <Text style={styles.introText}>{POWERLIFTING_INTRO}</Text>
              </View>
            </Card>
          </>
        }
        renderItem={({ item }) => {
          const count = getPowerliftingWorkoutCount(item.id);
          const locked = isPowerliftingAdvancedLocked(item.id, isPowerliftingAdvancedActive);
          const isAdvanced = item.id === 'avancado';

          if (isAdvanced) {
            return (
              <Card style={[styles.levelCardAdvanced, locked && styles.levelCardLocked]}>
                <PowerliftingAdvancedVideoGallery
                  clips={POWERLIFTING_ADVANCED_PROGRESS_VIDEOS}
                  height={148}
                  layout="split"
                  autoPlayFirst
                />
                <Pressable onPress={() => openLevel(item.id)}>
                  <View style={styles.levelCardBody}>
                    <View style={styles.levelCardTop}>
                      <View style={[styles.iconWrap, { backgroundColor: `${item.color}22` }]}>
                        <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={26} color={item.color} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={styles.titleRow}>
                          <Text style={styles.levelTitle}>{item.title}</Text>
                          {locked ? <Ionicons name="lock-closed" size={16} color={colors.gold} /> : null}
                        </View>
                        <Text style={[styles.levelSubtitle, { color: item.color }]}>{item.subtitle}</Text>
                      </View>
                      <View style={styles.rightCol}>
                        <View style={[styles.countBadge, { backgroundColor: `${item.color}22` }]}>
                          <Text style={[styles.countText, { color: item.color }]}>{count}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                      </View>
                    </View>
                    <Text style={styles.levelDescription}>{item.description}</Text>
                    <Text style={styles.levelFocus}>{item.focus}</Text>
                    {locked && item.premiumPrice ? (
                      <Pill label={`${item.premiumPrice} · ${item.premiumLabel ?? '3 meses de acesso'}`} tone="gold" />
                    ) : null}
                  </View>
                </Pressable>
              </Card>
            );
          }

          return (
            <Pressable onPress={() => openLevel(item.id)}>
              <Card style={[styles.levelCard, locked && styles.levelCardLocked]}>
                <View style={[styles.iconWrap, { backgroundColor: `${item.color}22` }]}>
                  <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={26} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={styles.levelTitle}>{item.title}</Text>
                    {locked ? <Ionicons name="lock-closed" size={16} color={colors.gold} /> : null}
                  </View>
                  <Text style={[styles.levelSubtitle, { color: item.color }]}>{item.subtitle}</Text>
                  <Text style={styles.levelDescription} numberOfLines={3}>
                    {item.description}
                  </Text>
                  <Text style={styles.levelFocus}>{item.focus}</Text>
                  {locked && item.premiumPrice ? (
                    <Pill label={`${item.premiumPrice} · ${item.premiumLabel ?? '3 meses de acesso'}`} tone="gold" />
                  ) : null}
                </View>
                <View style={styles.rightCol}>
                  <View style={[styles.countBadge, { backgroundColor: `${item.color}22` }]}>
                    <Text style={[styles.countText, { color: item.color }]}>{count}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </View>
              </Card>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
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
  introRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  introIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introText: { flex: 1, color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  levelCard: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  levelCardAdvanced: { padding: 0, overflow: 'hidden' },
  levelCardBody: { padding: spacing.md, gap: 4 },
  levelCardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  levelCardLocked: { borderColor: 'rgba(245,158,11,0.35)' },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  levelTitle: { color: colors.text, fontWeight: '800', fontSize: 17 },
  levelSubtitle: { fontSize: 12, fontWeight: '700', marginTop: 2, marginBottom: 6 },
  levelDescription: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  levelFocus: { color: colors.text, fontSize: 11, fontWeight: '600', marginTop: 8, opacity: 0.7 },
  rightCol: { alignItems: 'center', gap: spacing.sm, paddingTop: 4 },
  countBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countText: { fontWeight: '800', fontSize: 13 },
});
