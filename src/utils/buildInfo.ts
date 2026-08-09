import * as Application from 'expo-application';
import Constants from 'expo-constants';

export function resolveBuildNumber(): string {
  const manifest = (Constants as { manifest?: { ios?: { buildNumber?: string } } }).manifest;
  const manifest2 = (Constants as { manifest2?: { extra?: { eas?: { buildProfile?: string } } } })
    .manifest2;

  return (
    Application.nativeBuildVersion ??
    Constants.nativeBuildVersion ??
    Constants.expoConfig?.ios?.buildNumber ??
    manifest?.ios?.buildNumber ??
    manifest2?.extra?.eas?.buildProfile ??
    '?'
  );
}

export function resolveAppVersion(): string {
  return Constants.expoConfig?.version ?? Application.nativeApplicationVersion ?? '1.0.0';
}

export function getBuildLabel(): string {
  return `v${resolveAppVersion()} (${resolveBuildNumber()})`;
}
