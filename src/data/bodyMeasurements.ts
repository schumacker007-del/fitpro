import { TranslationKey } from '../i18n/translations';

export const BODY_MEASUREMENT_IDS = [
  'left_biceps',
  'right_biceps',
  'left_forearm',
  'right_forearm',
  'wrist',
  'left_calf',
  'right_calf',
  'left_upper_thigh',
  'right_upper_thigh',
  'left_lower_thigh',
  'right_lower_thigh',
  'chest',
  'waist',
  'hips',
  'neck',
  'glutes',
  'shoulders',
  'abdomen',
] as const;

export type BodyMeasurementId = (typeof BODY_MEASUREMENT_IDS)[number];

export interface BodyMeasurementConfig {
  id: BodyMeasurementId;
  labelKey: TranslationKey;
  min: number;
  max: number;
  step: number;
}

export const BODY_MEASUREMENTS: BodyMeasurementConfig[] = [
  { id: 'left_biceps', labelKey: 'measurements.left_biceps', min: 15, max: 80, step: 0.5 },
  { id: 'right_biceps', labelKey: 'measurements.right_biceps', min: 15, max: 80, step: 0.5 },
  { id: 'left_forearm', labelKey: 'measurements.left_forearm', min: 15, max: 60, step: 0.5 },
  { id: 'right_forearm', labelKey: 'measurements.right_forearm', min: 15, max: 60, step: 0.5 },
  { id: 'wrist', labelKey: 'measurements.wrist', min: 10, max: 30, step: 0.5 },
  { id: 'left_calf', labelKey: 'measurements.left_calf', min: 20, max: 70, step: 0.5 },
  { id: 'right_calf', labelKey: 'measurements.right_calf', min: 20, max: 70, step: 0.5 },
  { id: 'left_upper_thigh', labelKey: 'measurements.left_upper_thigh', min: 30, max: 100, step: 0.5 },
  { id: 'right_upper_thigh', labelKey: 'measurements.right_upper_thigh', min: 30, max: 100, step: 0.5 },
  { id: 'left_lower_thigh', labelKey: 'measurements.left_lower_thigh', min: 25, max: 90, step: 0.5 },
  { id: 'right_lower_thigh', labelKey: 'measurements.right_lower_thigh', min: 25, max: 90, step: 0.5 },
  { id: 'chest', labelKey: 'measurements.chest', min: 50, max: 200, step: 0.5 },
  { id: 'waist', labelKey: 'measurements.waist', min: 40, max: 200, step: 0.5 },
  { id: 'hips', labelKey: 'measurements.hips', min: 50, max: 200, step: 0.5 },
  { id: 'neck', labelKey: 'measurements.neck', min: 20, max: 60, step: 0.5 },
  { id: 'glutes', labelKey: 'measurements.glutes', min: 50, max: 200, step: 0.5 },
  { id: 'shoulders', labelKey: 'measurements.shoulders', min: 50, max: 200, step: 0.5 },
  { id: 'abdomen', labelKey: 'measurements.abdomen', min: 40, max: 200, step: 0.5 },
];

export function getBodyMeasurementConfig(id: BodyMeasurementId): BodyMeasurementConfig {
  const config = BODY_MEASUREMENTS.find((item) => item.id === id);
  if (!config) throw new Error(`Unknown measurement: ${id}`);
  return config;
}

export function defaultMeasurementValue(config: BodyMeasurementConfig): number {
  return Math.round(((config.min + config.max) / 2) * 2) / 2;
}
