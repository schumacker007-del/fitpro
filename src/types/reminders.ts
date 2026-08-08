export interface ReminderSettings {
  workoutEnabled: boolean;
  workoutHour: number;
  workoutMinute: number;
  dietEnabled: boolean;
  dietHour: number;
  dietMinute: number;
}

export const DEFAULT_REMINDER_SETTINGS: ReminderSettings = {
  workoutEnabled: false,
  workoutHour: 7,
  workoutMinute: 0,
  dietEnabled: false,
  dietHour: 12,
  dietMinute: 30,
};
