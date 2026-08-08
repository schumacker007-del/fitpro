export interface HealthIntegrationSettings {
  saveWorkouts: boolean;
  syncBodyMetrics: boolean;
}

export const DEFAULT_HEALTH_INTEGRATION_SETTINGS: HealthIntegrationSettings = {
  saveWorkouts: false,
  syncBodyMetrics: false,
};

export type HealthAuthorizationStatus = 'authorized' | 'denied' | 'notDetermined' | 'unavailable';

export type HealthPlatform = 'ios' | 'android' | 'unavailable';
