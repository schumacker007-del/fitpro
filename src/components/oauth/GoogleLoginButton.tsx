import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { authConfig } from '../../config/auth';
import { AuthUserSession, useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import ProviderButton from './ProviderButton';

WebBrowser.maybeCompleteAuthSession();

async function fetchGoogleProfile(accessToken: string): Promise<Pick<AuthUserSession, 'email' | 'name'>> {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return {};
  const data = (await response.json()) as { email?: string; name?: string };
  return { email: data.email, name: data.name };
}

export default function GoogleLoginButton({
  disabled,
  onBusyChange,
}: {
  disabled: boolean;
  onBusyChange: (busy: boolean) => void;
}) {
  const { t } = useLanguage();
  const { loginWithSession } = useAuth();
  const [, googleResponse, promptGoogle] = Google.useAuthRequest({
    webClientId: authConfig.google.webClientId,
    iosClientId: authConfig.google.iosClientId,
    androidClientId: authConfig.google.androidClientId,
  });

  useEffect(() => {
    if (!googleResponse) return;
    void (async () => {
      try {
        if (googleResponse.type === 'success') {
          const accessToken = googleResponse.authentication?.accessToken;
          if (!accessToken) throw new Error('missing_token');
          const profile = await fetchGoogleProfile(accessToken);
          await loginWithSession({
            provider: 'google',
            userId: profile.email ?? accessToken.slice(0, 24),
            email: profile.email,
            name: profile.name,
          });
        } else if (googleResponse.type === 'error') {
          Alert.alert(t('login.errorTitle'), t('login.errorProvider'));
        }
      } catch {
        Alert.alert(t('login.errorTitle'), t('login.errorProvider'));
      } finally {
        onBusyChange(false);
      }
    })();
  }, [googleResponse, loginWithSession, onBusyChange, t]);

  const [busy, setBusy] = useState(false);

  return (
    <ProviderButton
      label={t('login.google')}
      icon="logo-google"
      bg="#FFFFFF"
      textColor="#111827"
      busy={busy}
      disabled={disabled}
      onPress={() => {
        setBusy(true);
        onBusyChange(true);
        void promptGoogle();
      }}
    />
  );
}
