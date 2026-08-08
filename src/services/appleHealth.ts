import Constants from 'expo-constants';
import { Linking, Platform } from 'react-native';
import type { QuantityTypeIdentifierWriteable, SampleTypeIdentifierWriteable } from '@kingstinct/react-native-healthkit';
import { BodyMeasurementId } from '../data/bodyMeasurements';
import { HealthAuthorizationStatus, HealthPlatform } from '../types/healthIntegration';

type HealthKitModule = typeof import('@kingstinct/react-native-healthkit');

const WORKOUT_SHARE_TYPES = ['HKWorkoutTypeIdentifier'] as const satisfies readonly SampleTypeIdentifierWriteable[];
const BODY_SHARE_TYPES = [
  'HKQuantityTypeIdentifierBodyMass',
  'HKQuantityTypeIdentifierHeight',
  'HKQuantityTypeIdentifierWaistCircumference',
] as const satisfies readonly QuantityTypeIdentifierWriteable[];

const ALL_SHARE_TYPES = [...WORKOUT_SHARE_TYPES, ...BODY_SHARE_TYPES] as const satisfies readonly SampleTypeIdentifierWriteable[];

let healthKitModule: HealthKitModule | null | undefined;

function isExpoGo(): boolean {
  return Constants.appOwnership === 'expo';
}

function getHealthKitModule(): HealthKitModule | null {
  if (Platform.OS !== 'ios' || isExpoGo()) {
    if (healthKitModule === undefined) healthKitModule = null;
    return null;
  }
  if (healthKitModule !== undefined) return healthKitModule;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    healthKitModule = require('@kingstinct/react-native-healthkit') as HealthKitModule;
    return healthKitModule;
  } catch {
    healthKitModule = null;
    return null;
  }
}

export function getHealthPlatform(): HealthPlatform {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  return 'unavailable';
}

export function isHealthKitSupported(): boolean {
  return getHealthKitModule() != null;
}

export async function getHealthAuthorizationStatus(): Promise<HealthAuthorizationStatus> {
  const hk = getHealthKitModule();
  if (!hk) return 'unavailable';

  try {
    const status = await hk.getRequestStatusForAuthorization({ toShare: [...ALL_SHARE_TYPES] });
    if (status === hk.AuthorizationRequestStatus.unnecessary) return 'authorized';
    if (status === hk.AuthorizationRequestStatus.shouldRequest) return 'notDetermined';
    return 'denied';
  } catch {
    return 'unavailable';
  }
}

export async function requestHealthAuthorization(
  options: { workouts?: boolean; bodyMetrics?: boolean } = { workouts: true, bodyMetrics: true },
): Promise<boolean> {
  const hk = getHealthKitModule();
  if (!hk) return false;

  const toShare = [
    ...(options.workouts ? WORKOUT_SHARE_TYPES : []),
    ...(options.bodyMetrics ? BODY_SHARE_TYPES : []),
  ] as SampleTypeIdentifierWriteable[];
  if (toShare.length === 0) return false;

  try {
    await hk.requestAuthorization({ toShare });
    const status = await getHealthAuthorizationStatus();
    return status === 'authorized';
  } catch {
    return false;
  }
}

export async function openHealthApp(): Promise<void> {
  const url = 'x-apple-health://';
  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
    return;
  }
  await Linking.openSettings();
}

export interface SaveWorkoutParams {
  title: string;
  startDate: Date;
  endDate: Date;
}

export async function saveWorkoutToHealth(params: SaveWorkoutParams): Promise<boolean> {
  const hk = getHealthKitModule();
  if (!hk) return false;

  const status = await getHealthAuthorizationStatus();
  if (status !== 'authorized') return false;

  try {
    await hk.saveWorkoutSample(
      hk.WorkoutActivityType.traditionalStrengthTraining,
      [],
      params.startDate,
      params.endDate,
      undefined,
      {
        HKMetadataKeyWorkoutBrandName: 'FitPro',
      },
    );
    return true;
  } catch {
    return false;
  }
}

async function saveQuantitySample(
  identifier: 'HKQuantityTypeIdentifierBodyMass',
  unit: 'kg',
  value: number,
): Promise<boolean>;
async function saveQuantitySample(
  identifier: 'HKQuantityTypeIdentifierHeight' | 'HKQuantityTypeIdentifierWaistCircumference',
  unit: 'cm',
  value: number,
): Promise<boolean>;
async function saveQuantitySample(
  identifier:
    | 'HKQuantityTypeIdentifierBodyMass'
    | 'HKQuantityTypeIdentifierHeight'
    | 'HKQuantityTypeIdentifierWaistCircumference',
  unit: 'kg' | 'cm',
  value: number,
): Promise<boolean> {
  const hk = getHealthKitModule();
  if (!hk) return false;

  const status = await getHealthAuthorizationStatus();
  if (status !== 'authorized') return false;

  const now = new Date();
  try {
    if (identifier === 'HKQuantityTypeIdentifierBodyMass') {
      await hk.saveQuantitySample(identifier, unit as 'kg', value, now, now);
    } else {
      await hk.saveQuantitySample(identifier, unit as 'cm', value, now, now);
    }
    return true;
  } catch {
    return false;
  }
}

export async function saveWeightToHealth(weightKg: number): Promise<boolean> {
  return saveQuantitySample('HKQuantityTypeIdentifierBodyMass', 'kg', weightKg);
}

export async function saveHeightToHealth(heightCm: number): Promise<boolean> {
  return saveQuantitySample('HKQuantityTypeIdentifierHeight', 'cm', heightCm);
}

export async function saveBodyMeasurementToHealth(id: BodyMeasurementId, valueCm: number): Promise<boolean> {
  if (id !== 'waist') return false;
  return saveQuantitySample('HKQuantityTypeIdentifierWaistCircumference', 'cm', valueCm);
}
