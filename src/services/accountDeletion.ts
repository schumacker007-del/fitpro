import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, Paths } from 'expo-file-system';
import { cancelAllReminders } from './reminderNotifications';

/** All AsyncStorage keys used by FitPro contexts. */
export const FITPRO_ASYNC_STORAGE_KEYS = [
  '@fitpro/auth_session',
  '@fitpro/profile',
  '@fitpro/plan',
  '@fitpro/powerlifting_advanced',
  '@fitpro/progress_photos',
  '@fitpro/medical_records',
  '@fitpro/training_feed',
  '@fitpro/direct_messages',
  '@fitpro/custom_plan_requests',
  '@fitpro/custom_workouts',
  '@fitpro/training_logs',
  '@fitpro/gamification_activities',
  '@fitpro/medical_disclaimer_ack',
  '@fitpro/locale',
  '@fitpro/reminder_settings',
  '@fitpro/promo_seen_custom_plan',
  '@fitpro/promo_seen_pro',
  '@fitpro/body_measurements',
  '@fitpro/health_integration',
  '@fitpro/app_preferences',
] as const;

/** Document-directory folders that store user media and files. */
export const FITPRO_USER_DATA_DIRS = ['medical-records', 'progress-photos', 'training-feed-media'] as const;

function deleteDirectoryIfExists(name: string): void {
  try {
    const dir = new Directory(Paths.document, name);
    if (dir.exists) {
      dir.delete();
    }
  } catch {
    // Directory may already be missing or partially removed.
  }
}

/** Removes all locally stored user data (AsyncStorage + file directories). */
export async function wipeAllUserData(): Promise<void> {
  await cancelAllReminders();
  await AsyncStorage.multiRemove([...FITPRO_ASYNC_STORAGE_KEYS]);

  for (const dirName of FITPRO_USER_DATA_DIRS) {
    deleteDirectoryIfExists(dirName);
  }
}
