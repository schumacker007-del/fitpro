import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useRef } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { EXAM_EDUCATION_TOPICS, ExamEducationTopic } from '../data/examAnalysisEducation';
import { PremiumWorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function ExamAnalysisReportScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<PremiumWorkoutsStackParamList, 'ExamAnalysisReport'>>();
  const { t } = useLanguage();
  const listRef = useRef<FlatList<ExamEducationTopic>>(null);

  const scrollToTopic = useCallback((index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0 });
  }, []);

  const renderTopic = useCallback(
    ({ item }: { item: ExamEducationTopic }) => (
      <Card style={styles.topicCard}>
        <View style={styles.topicHeader}>
          <View style={styles.topicIcon}>
            <Ionicons name={item.icon} size={20} color={colors.primary} />
          </View>
          <Text style={styles.topicTitle}>{t(item.titleKey)}</Text>
        </View>
        <Text style={styles.topicSummary}>{t(item.summaryKey)}</Text>
        <View style={styles.bulletList}>
          {item.bulletKeys.map((key) => (
            <View key={key} style={styles.bulletRow}>
              <Ionicons name="ellipse" size={6} color={colors.primary} style={{ marginTop: 6 }} />
              <Text style={styles.bulletText}>{t(key)}</Text>
            </View>
          ))}
        </View>
      </Card>
    ),
    [t]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('premium.examAnalysis.demoReportTitle')}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        ref={listRef}
        data={EXAM_EDUCATION_TOPICS}
        keyExtractor={(item) => item.id}
        renderItem={renderTopic}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            listRef.current?.scrollToIndex({ index: info.index, animated: true });
          }, 100);
        }}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.headerSubtitle}>{t('premium.examAnalysis.demoSubtitle')}</Text>
            <MedicalDisclaimerBanner compact />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sectionRow}
            >
              {EXAM_EDUCATION_TOPICS.map((topic, index) => (
                <Pressable key={topic.id} onPress={() => scrollToTopic(index)} style={styles.sectionChip}>
                  <Text style={styles.sectionChipText}>{t(topic.titleKey)}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerNote}>{t('premium.examAnalysis.demoFooter')}</Text>
          </View>
        }
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
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 14 },
  listHeader: { gap: spacing.sm, marginBottom: spacing.sm },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    paddingHorizontal: spacing.xs,
  },
  sectionRow: { gap: spacing.xs, paddingVertical: spacing.xs },
  sectionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionChipText: { color: colors.text, fontSize: 12, fontWeight: '700' },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  topicCard: { gap: spacing.sm },
  topicHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  topicIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicTitle: { color: colors.text, fontSize: 16, fontWeight: '800', flex: 1 },
  topicSummary: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  bulletList: { gap: 8, marginTop: 2 },
  bulletRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  bulletText: { flex: 1, color: colors.text, fontSize: 13, lineHeight: 19 },
  footer: { marginTop: spacing.md },
  footerNote: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16 },
});
