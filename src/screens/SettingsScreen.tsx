import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useAppPreferences } from '../context/AppPreferencesContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { usePurchases } from '../context/PurchasesContext';
import { useReminderSettings } from '../context/ReminderSettingsContext';
import { useHealthIntegration } from '../context/HealthIntegrationContext';
import { UnitSystem } from '../types/appPreferences';
import { ProfileStackParamList } from '../navigation/types';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { cancelAllReminders, applyReminderSchedule, formatReminderTime } from '../services/reminderNotifications';
import { colors, spacing } from '../theme';

function ToggleRow({
  title,
  hint,
  enabled,
  onToggle,
}: {
  title: string;
  hint?: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        {hint ? <Text style={styles.rowHint}>{hint}</Text> : null}
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

function NavRow({
  title,
  hint,
  icon,
  iconColor = colors.primary,
  danger,
  onPress,
}: {
  title: string;
  hint?: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  danger?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={[styles.iconWrap, { backgroundColor: `${danger ? colors.danger : iconColor}22` }]}>
        <Ionicons name={icon} size={20} color={danger ? colors.danger : iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowTitle, danger && { color: colors.danger }]}>{title}</Text>
        {hint ? <Text style={styles.rowHint}>{hint}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'Settings'>>();
  const { t, languageLabel } = useLanguage();
  const { preferences, setNotificationsEnabled, setUnitSystem } = useAppPreferences();
  const { settings: reminderSettings } = useReminderSettings();
  const { settings: healthSettings, authorizationStatus: healthAuthStatus } = useHealthIntegration();
  const { restore, isRestoring } = usePurchases();
  const { logout, deleteAccount } = useAuth();

  const remindersHint = (() => {
    const parts: string[] = [];
    if (reminderSettings.workoutEnabled) {
      parts.push(
        `${t('reminders.workout.label')} ${formatReminderTime(reminderSettings.workoutHour, reminderSettings.workoutMinute)}`,
      );
    }
    if (reminderSettings.dietEnabled) {
      parts.push(
        `${t('reminders.diet.label')} ${formatReminderTime(reminderSettings.dietHour, reminderSettings.dietMinute)}`,
      );
    }
    return parts.length ? parts.join(' · ') : t('reminders.disabled');
  })();

  const healthHint = (() => {
    if (healthAuthStatus === 'authorized') {
      const parts: string[] = [];
      if (healthSettings.saveWorkouts) parts.push(t('health.saveWorkoutsShort'));
      if (healthSettings.syncBodyMetrics) parts.push(t('health.syncBodyMetricsShort'));
      return parts.length ? parts.join(' · ') : t('health.connected');
    }
    if (healthAuthStatus === 'denied') return t('health.notConnected');
    return t('settings.appleHealthHint');
  })();

  const unitLabel =
    preferences.unitSystem === 'imperial' ? t('settings.unitsImperial') : t('settings.unitsMetric');

  const handleNotificationsToggle = useCallback(
    async (value: boolean) => {
      await setNotificationsEnabled(value);
      if (!value) {
        await cancelAllReminders();
        return;
      }
      await applyReminderSchedule(reminderSettings, {
        workoutTitle: t('reminders.workout.title'),
        workoutBody: t('reminders.workout.body'),
        dietTitle: t('reminders.diet.title'),
        dietBody: t('reminders.diet.body'),
      });
    },
    [reminderSettings, setNotificationsEnabled, t],
  );

  const handleUnits = useCallback(() => {
    Alert.alert(t('settings.units'), t('settings.unitsHint'), [
      { text: t('settings.unitsMetric'), onPress: () => void setUnitSystem('metric' satisfies UnitSystem) },
      { text: t('settings.unitsImperial'), onPress: () => void setUnitSystem('imperial' satisfies UnitSystem) },
      { text: t('common.cancel'), style: 'cancel' },
    ]);
  }, [setUnitSystem, t]);

  const handleRestorePurchases = () => {
    void (async () => {
      try {
        await restore();
        Alert.alert(t('iap.restorePurchases'), t('iap.restoreSuccess'));
      } catch (error) {
        Alert.alert(t('iap.purchaseError'), error instanceof Error ? error.message : t('iap.purchaseError'));
      }
    })();
  };

  const handleDeleteAccount = () => {
    Alert.alert(t('accountDeletion.warnTitle'), t('accountDeletion.warnMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('accountDeletion.continue'),
        style: 'destructive',
        onPress: () => {
          Alert.alert(t('accountDeletion.confirmTitle'), t('accountDeletion.confirmMessage'), [
            { text: t('common.cancel'), style: 'cancel' },
            {
              text: t('accountDeletion.confirm'),
              style: 'destructive',
              onPress: () => void deleteAccount(),
            },
          ]);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation)} style={styles.headerBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('settings.title')}</Text>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>{t('settings.section.preferences')}</Text>
        <Card style={styles.card}>
          <NavRow
            title={t('settings.language')}
            hint={languageLabel}
            icon="language-outline"
            onPress={() => navigation.navigate('LanguageSettings')}
          />
          <View style={styles.divider} />
          <NavRow
            title={t('settings.reminders')}
            hint={remindersHint}
            icon="time-outline"
            onPress={() => navigation.navigate('ReminderSettings')}
          />
          <View style={styles.divider} />
          <ToggleRow
            title={t('settings.notificationsEnabled')}
            hint={t('settings.notificationsEnabledHint')}
            enabled={preferences.notificationsEnabled}
            onToggle={(value) => void handleNotificationsToggle(value)}
          />
          <View style={styles.divider} />
          <NavRow
            title={t('settings.units')}
            hint={unitLabel}
            icon="scale-outline"
            onPress={handleUnits}
          />
        </Card>

        <Text style={styles.sectionLabel}>{t('settings.section.integrations')}</Text>
        <Card style={styles.card}>
          <NavRow
            title={t('settings.appleHealth')}
            hint={healthHint}
            icon="heart"
            iconColor="#FF2D55"
            onPress={() => navigation.navigate('AppleHealthSettings')}
          />
        </Card>

        <Text style={styles.sectionLabel}>{t('settings.section.account')}</Text>
        <Card style={styles.card}>
          <NavRow
            title={t('iap.restorePurchases')}
            hint={isRestoring ? t('iap.restoring') : t('iap.manageSubscriptionHint')}
            icon="refresh-outline"
            onPress={handleRestorePurchases}
          />
          <View style={styles.divider} />
          <NavRow
            title={t('legal.privacyPolicy')}
            hint={t('legal.privacyHint')}
            icon="shield-checkmark-outline"
            onPress={() => navigation.navigate('PrivacyPolicy')}
          />
          <View style={styles.divider} />
          <NavRow
            title={t('legal.termsOfUse')}
            hint={t('legal.termsHint')}
            icon="document-text-outline"
            onPress={() => navigation.navigate('TermsOfUse')}
          />
          <View style={styles.divider} />
          <NavRow
            title={t('login.logout')}
            hint={t('login.logoutHint')}
            icon="log-out-outline"
            onPress={() =>
              Alert.alert(t('login.logoutTitle'), t('login.logoutMessage'), [
                { text: t('common.cancel'), style: 'cancel' },
                { text: t('login.logoutConfirm'), style: 'destructive', onPress: logout },
              ])
            }
          />
          <View style={styles.divider} />
          <NavRow
            title={t('accountDeletion.button')}
            hint={t('accountDeletion.buttonHint')}
            icon="trash-outline"
            danger
            onPress={handleDeleteAccount}
          />
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
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  headerBtn: {
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
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  card: { padding: 0, overflow: 'hidden', marginBottom: spacing.lg },
  divider: { height: 1, backgroundColor: colors.border, marginHorizontal: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { color: colors.text, fontSize: 15, fontWeight: '700', lineHeight: 20 },
  rowHint: { color: colors.textMuted, fontSize: 12, marginTop: 4, lineHeight: 17 },
});
