import { TranslationKey } from '../i18n/translations';
import { BodyMeasurementId } from '../data/bodyMeasurements';

export type BodyMeasurementGroupId = 'arms' | 'legs' | 'torso';

export interface BodyMeasurementGroup {
  id: BodyMeasurementGroupId;
  titleKey: TranslationKey;
  items: BodyMeasurementId[];
}

export const BODY_MEASUREMENT_GROUPS: BodyMeasurementGroup[] = [
  {
    id: 'arms',
    titleKey: 'measurements.group.arms',
    items: ['left_biceps', 'right_biceps', 'left_forearm', 'right_forearm', 'wrist'],
  },
  {
    id: 'legs',
    titleKey: 'measurements.group.legs',
    items: [
      'left_calf',
      'right_calf',
      'left_upper_thigh',
      'right_upper_thigh',
      'left_lower_thigh',
      'right_lower_thigh',
    ],
  },
  {
    id: 'torso',
    titleKey: 'measurements.group.torso',
    items: ['chest', 'waist', 'hips', 'neck', 'glutes', 'shoulders', 'abdomen'],
  },
];

export function countFilledMeasurements(current: Partial<Record<BodyMeasurementId, number>>): number {
  return BODY_MEASUREMENT_GROUPS.reduce(
    (total, group) => total + group.items.filter((id) => current[id] != null).length,
    0,
  );
}

export function totalMeasurementCount(): number {
  return BODY_MEASUREMENT_GROUPS.reduce((total, group) => total + group.items.length, 0);
}

export function findNextPendingMeasurement(
  current: Partial<Record<BodyMeasurementId, number>>,
): BodyMeasurementId | null {
  for (const group of BODY_MEASUREMENT_GROUPS) {
    for (const id of group.items) {
      if (current[id] == null) return id;
    }
  }
  return null;
}

export function getLatestMeasurementUpdate(
  updatedAt: Partial<Record<BodyMeasurementId, string>>,
): string | null {
  const dates = Object.values(updatedAt).filter(Boolean) as string[];
  if (!dates.length) return null;
  return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
}
