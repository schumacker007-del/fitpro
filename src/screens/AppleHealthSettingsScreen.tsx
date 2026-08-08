import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useHealthIntegration } from '../context/HealthIntegrationContext';
import { useLanguage } from '../context/LanguageContext';
import { openHealthApp } from '../services/appleHealth';
import { ProfileStackParamList } from '../navigation/types';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { colors, spacing } from '../theme';

function HealthToggleRow({
  title,
  hint,
  enabled,
  disabled,
  onToggle,
}: {
  title: string;
  hint?: string;
  enabled: boolean;
  disabled?: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.toggleTitle}>{title}</Text>
        {hint ? <Text style={styles.toggleHint}>{hint}</Text> : null}
      </View>
      <Switch
        value={enabled}
        disabled={disabled}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

export default function AppleHealthSettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'AppleHealthSettings'>>();
  const { t } = useLanguage();
  const {
    settings,
    platform,
    isSupported,
    authorizationStatus,
    refreshAuthorizationStatus,
    setSaveWorkouts,
    setSyncBodyMetrics,
  } = useHealthIntegration();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void refreshAuthorizationStatus();
  }, [refreshAuthorizationStatus]);

  const isConnected = authorizationStatus === 'authorized';
  const showIosContent = platform === 'ios';
  const showAndroidPlaceholder = platform === 'android';

  const handleOpenHealth = useCallback(async () => {
    if (showAndroidPlaceholder) return;
    if (!isSupported) {
      Alert.alert(t('health.title'), t('health.unavailable'));
      return;
    }
    await openHealthApp();
    await refreshAuthorizationStatus();
  }, [isSupported, refreshAuthorizationStatus, showAndroidPlaceholder, t]);

  const handleToggleWorkouts = async (value: boolean) => {
    setBusy(true);
    try {
      const ok = await setSaveWorkouts(value);
      if (!ok && value) {
        Alert.alert(t('health.title'), t('health.permissionDenied'));
      }
    } finally {
      setBusy(false);
    }
  };

  const handleToggleBodyMetrics = async (value: boolean) => {
    setBusy(true);
    try {
      const ok = await setSyncBodyMetrics(value);
      if (!ok && value) {
        Alert.alert(t('health.title'), t('health.permissionDenied'));
      }
    } finally {
      setBusy(false);
    }
  };

  const handleHelp = useCallback(() => {
    Alert.alert(t('health.help.title'), t('health.help.body'));
  }, [t]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation)} style={styles.headerIconBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('health.title')}</Text>
        <Pressable onPress={handleHelp} style={styles.headerIconBtn} hitSlop={8} accessibilityLabel={t('health.help.button')}>
          <Ionicons name="help-circle-outline" size={22} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {showAndroidPlaceholder ? (
          <Card style={styles.statusCard}>
            <View style={styles.statusIconWrap}>
              <Ionicons name="fitness-outline" size={28} color="#FF2D55" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.statusTitle}>{t('health.androidTitle')}</Text>
              <Text style={styles.statusSubtitle}>{t('health.androidComingSoon')}</Text>
            </View>
          </Card>
        ) : (
          <Pressable onPress={() => void handleOpenHealth()}>
            <Card style={styles.statusCard}>
              <View style={styles.statusIconWrap}>
                <Ionicons name="heart" size={28} color="#FF2D55" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.statusTitle}>{t('health.cardTitle')}</Text>
                <Text style={styles.statusSubtitle}>{t('health.cardSubtitle')}</Text>
              </View>
              {isConnected ? (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              ) : (
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              )}
            </Card>
          </Pressable>
        )}

        {showIosContent ? (
          <>
            <Text style={styles.info}>{t('health.info')}</Text>

            {!isSupported ? (
              <Card style={styles.noteCard}>
                <Ionicons name="information-circle-outline" size={20} color={colors.gold} />
                <Text style={styles.noteText}>{t('health.unavailable')}</Text>
              </Card>
            ) : null}

            <Text style={styles.sectionLabel}>{t('health.section.workouts')}</Text>
            <Card style={styles.toggleCard}>
              <HealthToggleRow
                title={t('health.saveWorkouts')}
                hint={t('health.saveWorkoutsHint')}
                enabled={settings.saveWorkouts}
                disabled={!isSupported || busy}
                onToggle={(value) => void handleToggleWorkouts(value)}
              />
            </Card>

            <Text style={styles.sectionLabel}>{t('health.section.bodyComposition')}</Text>
            <Card style={styles.toggleCard}>
              <HealthToggleRow
                title={t('health.syncBodyMetrics')}
                hint={t('health.syncBodyMetricsHint')}
                enabled={settings.syncBodyMetrics}
                disabled={!isSupported || busy}
                onToggle={(value) => void handleToggleBodyMetrics(value)}
              />
            </Card>

            {Platform.OS === 'ios' && isSupported ? (
              <Text style={styles.footerNote}>{t('health.footerNote')}</Text>
            ) : null}
          </>
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
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: '800', flex: 1, textAlign: 'center' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  statusIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 45, 85, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: { color: colors.text, fontSize: 16, fontWeight: '800' },
  statusSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  info: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: spacing.lg },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  noteText: { color: colors.textMuted, fontSize: 12, lineHeight: 18, flex: 1 },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  toggleCard: { padding: 0, overflow: 'hidden', marginBottom: spacing.lg },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  toggleTitle: { color: colors.text, fontSize: 15, fontWeight: '700', lineHeight: 20 },
  toggleHint: { color: colors.textMuted, fontSize: 12, marginTop: 4, lineHeight: 17 },
  footerNote: { color: colors.textMuted, fontSize: 12, lineHeight: 18 },
});
