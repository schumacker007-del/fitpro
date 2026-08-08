import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { isFacebookAuthConfigured, isGoogleAuthConfigured } from '../config/auth';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { TranslationKey } from '../i18n/translations';
import ProviderButton from './oauth/ProviderButton';
import { colors, spacing } from '../theme';

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
    if (Platform.OS !== 'ios') return;
    void import('expo-apple-authentication')
      .then((AppleAuthentication) => AppleAuthentication.isAvailableAsync())
      .then(setAppleAvailable)
      .catch(() => setAppleAvailable(false));
  }, []);

  const handleApple = async () => {
    if (Platform.OS !== 'ios' || !appleAvailable) {
      Alert.alert(t('login.errorTitle'), t('login.appleUnavailable'));
      return;
    }
    setBusy(true);
    try {
      const AppleAuthentication = await import('expo-apple-authentication');
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

  const GoogleLoginButton = googleConfigured
    ? (require('./oauth/GoogleLoginButton').default as React.ComponentType<{
        disabled: boolean;
        onBusyChange: (busy: boolean) => void;
      }>)
    : null;

  const FacebookLoginButton = facebookConfigured
    ? (require('./oauth/FacebookLoginButton').default as React.ComponentType<{
        disabled: boolean;
        onBusyChange: (busy: boolean) => void;
      }>)
    : null;

  return (
    <View style={styles.providers}>
      {GoogleLoginButton ? (
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

      {FacebookLoginButton ? (
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
  providerPressed: { opacity: 0.9 },
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
