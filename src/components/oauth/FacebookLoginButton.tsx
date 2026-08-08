import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { authConfig } from '../../config/auth';
import { AuthUserSession, useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import ProviderButton from './ProviderButton';

WebBrowser.maybeCompleteAuthSession();

async function fetchFacebookProfile(accessToken: string): Promise<Pick<AuthUserSession, 'email' | 'name'>> {
  const response = await fetch(
    `https://graph.facebook.com/me?fields=id,name,email&access_token=${encodeURIComponent(accessToken)}`,
  );
  if (!response.ok) return {};
  const data = (await response.json()) as { email?: string; name?: string };
  return { email: data.email, name: data.name };
}

export default function FacebookLoginButton({
  disabled,
  onBusyChange,
}: {
  disabled: boolean;
  onBusyChange: (busy: boolean) => void;
}) {
  const { t } = useLanguage();
  const { loginWithSession } = useAuth();
  const [, facebookResponse, promptFacebook] = Facebook.useAuthRequest({
    clientId: authConfig.facebook.appId,
  });

  useEffect(() => {
    if (!facebookResponse) return;
    void (async () => {
      try {
        if (facebookResponse.type === 'success') {
          const accessToken = facebookResponse.authentication?.accessToken;
          if (!accessToken) throw new Error('missing_token');
          const profile = await fetchFacebookProfile(accessToken);
          await loginWithSession({
            provider: 'facebook',
            userId: profile.email ?? accessToken.slice(0, 24),
            email: profile.email,
            name: profile.name,
          });
        } else if (facebookResponse.type === 'error') {
          Alert.alert(t('login.errorTitle'), t('login.errorProvider'));
        }
      } catch {
        Alert.alert(t('login.errorTitle'), t('login.errorProvider'));
      } finally {
        onBusyChange(false);
      }
    })();
  }, [facebookResponse, loginWithSession, onBusyChange, t]);

  const [busy, setBusy] = useState(false);

  return (
    <ProviderButton
      label={t('login.facebook')}
      icon="logo-facebook"
      bg="#1877F2"
      textColor="#FFFFFF"
      busy={busy}
      disabled={disabled}
      onPress={() => {
        setBusy(true);
        onBusyChange(true);
        void promptFacebook();
      }}
    />
  );
}
