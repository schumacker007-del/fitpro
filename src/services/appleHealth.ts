import { Linking, Platform } from 'react-native';
import { BodyMeasurementId } from '../data/bodyMeasurements';
import { HealthAuthorizationStatus, HealthPlatform } from '../types/healthIntegration';

// HealthKit native module disabled for TestFlight build 16 — autolink removed from package.json.
// All entry points return unavailable/false without touching native code.

export function getHealthPlatform(): HealthPlatform {
  if (Platform.OS === 'ios') return 'ios';
  if (Platform.OS === 'android') return 'android';
  return 'unavailable';
}

export function isHealthKitSupported(): boolean {
  return false;
}

export async function getHealthAuthorizationStatus(): Promise<HealthAuthorizationStatus> {
  return 'unavailable';
}

export async function requestHealthAuthorization(
  _options: { workouts?: boolean; bodyMetrics?: boolean } = {},
): Promise<boolean> {
  return false;
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

export async function saveWorkoutToHealth(_params: SaveWorkoutParams): Promise<boolean> {
  return false;
}

export async function saveWeightToHealth(_weightKg: number): Promise<boolean> {
  return false;
}

export async function saveHeightToHealth(_heightCm: number): Promise<boolean> {
  return false;
}

export async function saveBodyMeasurementToHealth(_id: BodyMeasurementId, _valueCm: number): Promise<boolean> {
  return false;
}
