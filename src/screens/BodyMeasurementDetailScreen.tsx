import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MetricSlider from '../components/MetricSlider';
import { Card, PrimaryButton } from '../components/ui';
import { useBodyMeasurements } from '../context/BodyMeasurementsContext';
import { useHealthIntegration } from '../context/HealthIntegrationContext';
import { useLanguage } from '../context/LanguageContext';
import { defaultMeasurementValue, getBodyMeasurementConfig } from '../data/bodyMeasurements';
import { AppLocale } from '../i18n/types';
import { ProfileStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';
import { findNextPendingMeasurement } from '../utils/bodyMeasurementsHelpers';
import { formatLocaleDate } from '../utils/formatLocaleDate';

function formatShortDate(iso: string, locale: AppLocale) {
  return formatLocaleDate(locale, new Date(iso), { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function BodyMeasurementDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'BodyMeasurementDetail'>>();
  const route = useRoute<RouteProp<ProfileStackParamList, 'BodyMeasurementDetail'>>();
  const { t, locale } = useLanguage();
  const { measurements, saveMeasurement, getHistoryFor } = useBodyMeasurements();
  const { syncBodyMeasurement } = useHealthIntegration();

  const config = getBodyMeasurementConfig(route.params.measurementId);
  const savedValue = measurements[config.id];
  const history = getHistoryFor(config.id);
  const previousEntry = history[0];
  const [value, setValue] = useState(savedValue ?? defaultMeasurementValue(config));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValue(savedValue ?? defaultMeasurementValue(config));
  }, [config, savedValue]);

  const deltaLabel = useMemo(() => {
    if (savedValue == null || value === savedValue) return null;
    const diff = value - savedValue;
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(1)} cm`;
  }, [savedValue, value]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveMeasurement(config.id, value);
      await syncBodyMeasurement(config.id, value);

      const nextDraft = { ...measurements, [config.id]: value };
      const nextId = findNextPendingMeasurement(nextDraft);

      if (nextId) {
        Alert.alert(t('measurements.title'), t('measurements.savedContinue'), [
          {
            text: t('measurements.continuePending'),
            onPress: () => navigation.replace('BodyMeasurementDetail', { measurementId: nextId }),
          },
          { text: t('common.finish'), style: 'cancel', onPress: () => navigation.goBack() },
        ]);
        return;
      }

      Alert.alert(t('measurements.title'), t('measurements.allComplete'));
      navigation.goBack();
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    Alert.alert(t('measurements.clearTitle'), t('measurements.clearMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('measurements.clearConfirm'),
        style: 'destructive',
        onPress: () => {
          void (async () => {
            await saveMeasurement(config.id, null);
            navigation.goBack();
          })();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t(config.labelKey)}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('measurements.detailSubtitle')}</Text>

        {previousEntry ? (
          <Card style={styles.metaCard}>
            <Text style={styles.metaLabel}>{t('measurements.currentValue')}</Text>
            <Text style={styles.metaValue}>
              {previousEntry.valueCm.toFixed(1)} cm · {formatShortDate(previousEntry.recordedAt, locale)}
            </Text>
            {deltaLabel ? <Text style={styles.metaDelta}>{t('measurements.change', { delta: deltaLabel })}</Text> : null}
          </Card>
        ) : null}

        <MetricSlider
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={setValue}
          unit="cm"
          formatValue={(v) => v.toFixed(1)}
        />

        <PrimaryButton label={t('injurySettings.save')} onPress={handleSave} disabled={saving} />

        {history.length > 1 ? (
          <View style={styles.historyBlock}>
            <Text style={styles.historyTitle}>{t('measurements.historyTitle')}</Text>
            {history.slice(1, 6).map((entry) => (
              <View key={entry.recordedAt} style={styles.historyRow}>
                <Text style={styles.historyDate}>{formatShortDate(entry.recordedAt, locale)}</Text>
                <Text style={styles.historyValue}>{entry.valueCm.toFixed(1)} cm</Text>
              </View>
            ))}
          </View>
        ) : null}

        {savedValue != null ? (
          <Pressable onPress={handleClear} style={styles.clearBtn}>
            <Text style={styles.clearText}>{t('measurements.clear')}</Text>
          </Pressable>
        ) : null}
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
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: '800', flex: 1, textAlign: 'center' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, flexGrow: 1 },
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: spacing.lg, textAlign: 'center' },
  metaCard: { marginBottom: spacing.lg },
  metaLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  metaValue: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 4 },
  metaDelta: { color: colors.primary, fontSize: 13, fontWeight: '700', marginTop: 6 },
  historyBlock: { marginTop: spacing.lg },
  historyTitle: { color: colors.textMuted, fontSize: 12, fontWeight: '800', textTransform: 'uppercase', marginBottom: spacing.sm },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  historyDate: { color: colors.textMuted, fontSize: 13 },
  historyValue: { color: colors.text, fontSize: 13, fontWeight: '700' },
  clearBtn: { alignItems: 'center', paddingVertical: spacing.md, marginTop: spacing.sm },
  clearText: { color: colors.danger, fontSize: 14, fontWeight: '700' },
});
