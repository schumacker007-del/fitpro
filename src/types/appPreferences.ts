export type UnitSystem = 'metric' | 'imperial';

export interface AppPreferences {
  notificationsEnabled: boolean;
  unitSystem: UnitSystem;
}

export const DEFAULT_APP_PREFERENCES: AppPreferences = {
  notificationsEnabled: true,
  unitSystem: 'metric',
};
