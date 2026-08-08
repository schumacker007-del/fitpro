/** OAuth client IDs — configure via .env (EXPO_PUBLIC_*). See .env.example */
export const authConfig = {
  google: {
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '',
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? '',
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? '',
  },
  facebook: {
    appId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID ?? '',
  },
};

export function isGoogleAuthConfigured(): boolean {
  const { webClientId, iosClientId, androidClientId } = authConfig.google;
  return Boolean(webClientId || iosClientId || androidClientId);
}

export function isFacebookAuthConfigured(): boolean {
  return Boolean(authConfig.facebook.appId);
}
