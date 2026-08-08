import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { authConfig, isFacebookAuthConfigured, isGoogleAuthConfigured } from '../config/auth';
import { AuthUserSession, useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { TranslationKey } from '../i18n/translations';
import { colors, spacing } from '../theme';

WebBrowser.maybeCompleteAuthSession();

async function fetchGoogleProfile(accessToken: string): Promise<Pick<AuthUserSession, 'email' | 'name'>> {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return {};
  const data = (await response.json()) as { email?: string; name?: string };
  return { email: data.email, name: data.name };
}

async function fetchFacebookProfile(accessToken: string): Promise<Pick<AuthUserSession, 'email' | 'name'>> {
  const response = await fetch(
    `https://graph.facebook.com/me?fields=id,name,email&access_token=${encodeURIComponent(accessToken)}`,
  );
  if (!response.ok) return {};
  const data = (await response.json()) as { email?: string; name?: string };
  return { email: data.email, name: data.name };
}

function ProviderButton({
  label,
  icon,
  bg,
  textColor,
  busy,
  disabled,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  textColor: string;
  busy?: boolean;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.providerBtn, { backgroundColor: bg }, pressed && styles.providerPressed]}
    >
      {busy ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          <Ionicons name={icon} size={20} color={textColor} />
          <Text style={[styles.providerLabel, { color: textColor }]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

function GoogleLoginButton({
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

function FacebookLoginButton({
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

function UnconfiguredProviderButton({
  labelKey,
  icon,
  bg,
  textColor,
  setupMessageKey,
}: {
  labelKey: TranslationKey;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  textColor: string;
  setupMessageKey: TranslationKey;
}) {
  const { t } = useLanguage();
  return (
    <ProviderButton
      label={t(labelKey)}
      icon={icon}
      bg={bg}
      textColor={textColor}
      onPress={() => Alert.alert(t('login.setupTitle'), t(setupMessageKey))}
    />
  );
}

export default function SocialLoginPanel() {
  const { t } = useLanguage();
  const { loginWithSession } = useAuth();
  const [busy, setBusy] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);

  const googleConfigured = isGoogleAuthConfigured();
  const facebookConfigured = isFacebookAuthConfigured();

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setAppleAvailable);
  }, []);

  const handleApple = async () => {
    if (Platform.OS !== 'ios' || !appleAvailable) {
      Alert.alert(t('login.errorTitle'), t('login.appleUnavailable'));
      return;
    }
    setBusy(true);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const fullName = [credential.fullName?.givenName, credential.fullName?.familyName]
        .filter(Boolean)
        .join(' ');
      await loginWithSession({
        provider: 'apple',
        userId: credential.user,
        email: credential.email ?? undefined,
        name: fullName || undefined,
      });
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert(t('login.errorTitle'), t('login.errorProvider'));
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.providers}>
      {googleConfigured ? (
        <GoogleLoginButton disabled={busy} onBusyChange={setBusy} />
      ) : (
        <UnconfiguredProviderButton
          labelKey="login.google"
          icon="logo-google"
          bg="#FFFFFF"
          textColor="#111827"
          setupMessageKey="login.setupGoogle"
        />
      )}

      {Platform.OS === 'ios' && appleAvailable ? (
        <ProviderButton
          label={t('login.apple')}
          icon="logo-apple"
          bg="#111827"
          textColor="#FFFFFF"
          busy={busy}
          disabled={busy}
          onPress={() => void handleApple()}
        />
      ) : null}

      {facebookConfigured ? (
        <FacebookLoginButton disabled={busy} onBusyChange={setBusy} />
      ) : (
        <UnconfiguredProviderButton
          labelKey="login.facebook"
          icon="logo-facebook"
          bg="#1877F2"
          textColor="#FFFFFF"
          setupMessageKey="login.setupFacebook"
        />
      )}

      {__DEV__ ? (
        <Pressable
          onPress={() =>
            void loginWithSession({
              provider: 'apple',
              userId: 'dev-test-user',
              name: 'Atleta Teste',
              email: 'teste@fitpro.app',
            })
          }
          style={({ pressed }) => [styles.devBtn, pressed && styles.providerPressed]}
        >
          <Text style={styles.devBtnText}>{t('login.devContinue')}</Text>
        </Pressable>
      ) : !googleConfigured && !facebookConfigured ? (
        <>
          <Pressable
            onPress={() =>
              void loginWithSession({
                provider: 'apple',
                userId: `beta-${Date.now()}`,
                name: 'Beta Tester',
              })
            }
            style={({ pressed }) => [styles.devBtn, pressed && styles.providerPressed]}
          >
            <Text style={styles.devBtnText}>{t('login.betaContinue')}</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              void AsyncStorage.clear().then(() => {
                Alert.alert(t('login.resetDoneTitle'), t('login.resetDoneBody'));
              })
            }
            style={({ pressed }) => [styles.resetBtn, pressed && styles.providerPressed]}
          >
            <Text style={styles.resetBtnText}>{t('login.resetAppData')}</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  providers: { gap: spacing.sm },
  providerBtn: {
    minHeight: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  providerPressed: { opacity: 0.9 },
  providerLabel: { fontWeight: '700', fontSize: 15 },
  devBtn: {
    minHeight: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
  },
  devBtnText: { color: colors.textMuted, fontWeight: '600', fontSize: 13 },
  resetBtn: {
    minHeight: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  resetBtnText: { color: colors.textMuted, fontWeight: '600', fontSize: 12 },
});
