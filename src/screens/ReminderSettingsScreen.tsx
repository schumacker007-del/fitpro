import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { useReminderSettings } from '../context/ReminderSettingsContext';
import { ProfileStackParamList } from '../navigation/types';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { formatReminderTime } from '../services/reminderNotifications';
import { colors, spacing } from '../theme';
import { ReminderSettings } from '../types/reminders';

function toDate(hour: number, minute: number) {
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
}

function fromDate(date: Date) {
  return { hour: date.getHours(), minute: date.getMinutes() };
}

type PickerTarget = 'workout' | 'diet' | null;

function ReminderRow({
  icon,
  title,
  hint,
  enabled,
  timeLabel,
  onToggle,
  onPressTime,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  hint: string;
  enabled: boolean;
  timeLabel: string;
  onToggle: (value: boolean) => void;
  onPressTime: () => void;
}) {
  return (
    <View style={styles.reminderBlock}>
      <View style={styles.reminderHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={18} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.reminderTitle}>{title}</Text>
          <Text style={styles.reminderHint}>{hint}</Text>
        </View>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View>
      {enabled ? (
        <Pressable onPress={onPressTime} style={styles.timeBtn}>
          <Ionicons name="time-outline" size={18} color={colors.textMuted} />
          <Text style={styles.timeLabel}>{timeLabel}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

export default function ReminderSettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'ReminderSettings'>>();
  const { t } = useLanguage();
  const { settings, saveSettings } = useReminderSettings();
  const [draft, setDraft] = useState<ReminderSettings>(settings);
  const [pickerTarget, setPickerTarget] = useState<PickerTarget>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const pickerDate =
    pickerTarget === 'workout'
      ? toDate(draft.workoutHour, draft.workoutMinute)
      : pickerTarget === 'diet'
        ? toDate(draft.dietHour, draft.dietMinute)
        : new Date();

  const handlePickerChange = (_event: unknown, date?: Date) => {
    if (Platform.OS === 'android') setPickerTarget(null);
    if (!date || !pickerTarget) return;
    const { hour, minute } = fromDate(date);
    if (pickerTarget === 'workout') {
      setDraft((prev) => ({ ...prev, workoutHour: hour, workoutMinute: minute }));
    } else {
      setDraft((prev) => ({ ...prev, dietHour: hour, dietMinute: minute }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const granted = await saveSettings(draft, {
        workoutTitle: t('reminders.workout.title'),
        workoutBody: t('reminders.workout.body'),
        dietTitle: t('reminders.diet.title'),
        dietBody: t('reminders.diet.body'),
      });

      if (!granted && (draft.workoutEnabled || draft.dietEnabled)) {
        Alert.alert(t('reminders.title'), t('reminders.permissionDenied'));
        return;
      }

      Alert.alert(t('reminders.title'), t('reminders.saved'));
      navigation.goBack();
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation)} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('reminders.title')}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('reminders.subtitle')}</Text>

        <Card style={styles.card}>
          <ReminderRow
            icon="barbell-outline"
            title={t('reminders.workout.label')}
            hint={t('reminders.workout.hint')}
            enabled={draft.workoutEnabled}
            timeLabel={formatReminderTime(draft.workoutHour, draft.workoutMinute)}
            onToggle={(value) => setDraft((prev) => ({ ...prev, workoutEnabled: value }))}
            onPressTime={() => setPickerTarget('workout')}
          />
          <View style={styles.divider} />
          <ReminderRow
            icon="nutrition-outline"
            title={t('reminders.diet.label')}
            hint={t('reminders.diet.hint')}
            enabled={draft.dietEnabled}
            timeLabel={formatReminderTime(draft.dietHour, draft.dietMinute)}
            onToggle={(value) => setDraft((prev) => ({ ...prev, dietEnabled: value }))}
            onPressTime={() => setPickerTarget('diet')}
          />
        </Card>

        <Text style={styles.note}>{t('reminders.note')}</Text>

        <PrimaryButton label={t('injurySettings.save')} onPress={handleSave} disabled={saving} />
      </ScrollView>

      {pickerTarget && Platform.OS === 'ios' ? (
        <View style={styles.iosPickerSheet}>
          <View style={styles.iosPickerHeader}>
            <Pressable onPress={() => setPickerTarget(null)}>
              <Text style={styles.iosPickerDone}>{t('common.finish')}</Text>
            </Pressable>
          </View>
          <DateTimePicker
            value={pickerDate}
            mode="time"
            display="spinner"
            onChange={handlePickerChange}
            textColor={colors.primary}
            accentColor={colors.primary}
            themeVariant="dark"
            style={styles.iosPicker}
          />
        </View>
      ) : null}

      {pickerTarget && Platform.OS === 'android' ? (
        <DateTimePicker
          value={pickerDate}
          mode="time"
          is24Hour
          display="default"
          onChange={handlePickerChange}
        />
      ) : null}
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
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: spacing.md },
  card: { padding: 0, overflow: 'hidden', marginBottom: spacing.md },
  reminderBlock: { padding: spacing.md },
  reminderHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  reminderHint: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 16 },
  timeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginLeft: 44,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
  },
  timeLabel: { flex: 1, color: colors.primary, fontSize: 22, fontWeight: '900', letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: colors.border, marginHorizontal: spacing.md },
  note: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginBottom: spacing.lg },
  iosPickerSheet: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: spacing.sm,
  },
  iosPickerHeader: {
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  iosPickerDone: { color: colors.primary, fontWeight: '800', fontSize: 16 },
  iosPicker: {
    height: 196,
  },
});
