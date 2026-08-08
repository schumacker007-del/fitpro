import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton } from '../components/ui';
import { useBodyMeasurements } from '../context/BodyMeasurementsContext';
import { useLanguage } from '../context/LanguageContext';
import { getBodyMeasurementConfig } from '../data/bodyMeasurements';
import { AppLocale } from '../i18n/types';
import { ProfileStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';
import { BODY_MEASUREMENT_GROUPS } from '../utils/bodyMeasurementsHelpers';
import { formatLocaleDate } from '../utils/formatLocaleDate';

function formatShortDate(iso: string, locale: AppLocale) {
  return formatLocaleDate(locale, new Date(iso), { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function BodyMeasurementsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'BodyMeasurements'>>();
  const { t, locale } = useLanguage();
  const {
    measurements,
    updatedAt,
    filledCount,
    totalCount,
    completionPercent,
    nextPendingId,
    lastUpdatedAt,
  } = useBodyMeasurements();

  const isComplete = filledCount === totalCount;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('measurements.title')}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.progressLabel}>{t('measurements.progressTitle')}</Text>
              <Text style={styles.progressValue}>
                {t('measurements.progressCount', { filled: filledCount, total: totalCount })}
              </Text>
            </View>
            <Text style={styles.progressPercent}>{completionPercent}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${completionPercent}%` }]} />
          </View>
          {lastUpdatedAt ? (
            <Text style={styles.progressMeta}>
              {t('measurements.lastUpdate', { date: formatShortDate(lastUpdatedAt, locale) })}
            </Text>
          ) : (
            <Text style={styles.progressMeta}>{t('measurements.noneYet')}</Text>
          )}
          {isComplete ? (
            <View style={styles.completeBadge}>
              <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
              <Text style={styles.completeText}>{t('measurements.complete')}</Text>
            </View>
          ) : nextPendingId ? (
            <View style={{ marginTop: spacing.md }}>
              <PrimaryButton
                label={t('measurements.continuePending')}
                icon="arrow-forward"
                onPress={() => navigation.navigate('BodyMeasurementDetail', { measurementId: nextPendingId })}
              />
            </View>
          ) : null}
        </Card>

        {BODY_MEASUREMENT_GROUPS.map((group) => (
          <View key={group.id} style={styles.group}>
            <Text style={styles.groupTitle}>{t(group.titleKey)}</Text>
            <Card style={styles.listCard}>
              {group.items.map((itemId, index) => {
                const item = getBodyMeasurementConfig(itemId);
                const value = measurements[item.id];
                const itemUpdatedAt = updatedAt[item.id];
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => navigation.navigate('BodyMeasurementDetail', { measurementId: item.id })}
                    style={[styles.row, index < group.items.length - 1 && styles.rowBorder]}
                  >
                    <View style={styles.rowMain}>
                      <View style={styles.rowTitleLine}>
                        {value != null ? (
                          <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                        ) : (
                          <View style={styles.pendingDot} />
                        )}
                        <Text style={styles.label}>{t(item.labelKey)}</Text>
                      </View>
                      {itemUpdatedAt ? (
                        <Text style={styles.rowDate}>{formatShortDate(itemUpdatedAt, locale)}</Text>
                      ) : null}
                    </View>
                    <Text style={[styles.value, value == null && styles.valueEmpty]}>
                      {value != null ? `${value.toFixed(1)} cm` : '—'}
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                  </Pressable>
                );
              })}
            </Card>
          </View>
        ))}

        <Text style={styles.hint}>{t('measurements.hint')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  progressCard: { marginBottom: spacing.lg },
  progressTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing.sm },
  progressLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.4 },
  progressValue: { color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 4 },
  progressPercent: { color: colors.primary, fontSize: 28, fontWeight: '900' },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  progressMeta: { color: colors.textMuted, fontSize: 12, marginTop: spacing.sm },
  completeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  completeText: { color: colors.primary, fontWeight: '800', fontSize: 14 },
  group: { marginBottom: spacing.md },
  groupTitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  listCard: { padding: 0, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    minHeight: 52,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowMain: { flex: 1 },
  rowTitleLine: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  pendingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.textMuted,
  },
  label: { color: colors.text, fontSize: 16, fontWeight: '600', flex: 1 },
  rowDate: { color: colors.textMuted, fontSize: 11, marginTop: 3, marginLeft: 26 },
  value: { color: colors.primary, fontSize: 15, fontWeight: '700', minWidth: 72, textAlign: 'right' },
  valueEmpty: { color: colors.textMuted, fontWeight: '600' },
  hint: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: spacing.sm, textAlign: 'center' },
});
