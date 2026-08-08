import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { ReminderSettings } from '../types/reminders';

export const WORKOUT_REMINDER_ID = 'fitpro-daily-workout';
export const DIET_REMINDER_ID = 'fitpro-daily-diet';

const ANDROID_CHANNEL_ID = 'fitpro-reminders';

export interface ReminderCopy {
  workoutTitle: string;
  workoutBody: string;
  dietTitle: string;
  dietBody: string;
}

let notificationHandlerReady = false;

export function ensureNotificationHandler(): void {
  if (notificationHandlerReady) return;
  notificationHandlerReady = true;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function ensureNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
      name: 'Lembretes FitPro',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function cancelAllReminders() {
  await Notifications.cancelScheduledNotificationAsync(WORKOUT_REMINDER_ID).catch(() => {});
  await Notifications.cancelScheduledNotificationAsync(DIET_REMINDER_ID).catch(() => {});
}

async function scheduleDaily(
  identifier: string,
  hour: number,
  minute: number,
  title: string,
  body: string,
) {
  await Notifications.scheduleNotificationAsync({
    identifier,
    content: {
      title,
      body,
      sound: true,
      ...(Platform.OS === 'android' ? { channelId: ANDROID_CHANNEL_ID } : {}),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function applyReminderSchedule(settings: ReminderSettings, copy: ReminderCopy) {
  await cancelAllReminders();

  const hasAny = settings.workoutEnabled || settings.dietEnabled;
  if (!hasAny) return true;

  const granted = await ensureNotificationPermissions();
  if (!granted) return false;

  if (settings.workoutEnabled) {
    await scheduleDaily(
      WORKOUT_REMINDER_ID,
      settings.workoutHour,
      settings.workoutMinute,
      copy.workoutTitle,
      copy.workoutBody,
    );
  }

  if (settings.dietEnabled) {
    await scheduleDaily(
      DIET_REMINDER_ID,
      settings.dietHour,
      settings.dietMinute,
      copy.dietTitle,
      copy.dietBody,
    );
  }

  return true;
}

export function formatReminderTime(hour: number, minute: number) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
