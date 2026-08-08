import React, { useMemo, useState } from 'react';
import { ActivityIndicator, InteractionManager, StyleSheet, Text, View } from 'react-native';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import ColdStartGate from '../screens/ColdStartGate';
import SplashScreen from '../screens/SplashScreen';
import { colors } from '../theme';
import { RootStackParamList } from './types';

function getInitialRoute(isLoggedIn: boolean, isOnboarded: boolean): keyof RootStackParamList {
  if (!isLoggedIn) return 'Login';
  if (!isOnboarded) return 'Onboarding';
  return 'Main';
}

function BootstrapLoading() {
  return (
    <View style={styles.bootstrap}>
      <Text style={styles.bootstrapLogo}>FitPro</Text>
      <ActivityIndicator color={colors.primary} size="large" style={styles.bootstrapSpinner} />
      <Text style={styles.bootstrapHint}>Carregando…</Text>
    </View>
  );
}

export default function RootNavigator() {
  const { isOnboarded, loading: userLoading } = useUser();
  const { isLoggedIn, loading: authLoading } = useAuth();
  const { locale } = useLanguage();
  const [splashFinished, setSplashFinished] = useState(false);
  const [splashMounted, setSplashMounted] = useState(true);
  const [navReady, setNavReady] = useState(false);

  const appReady = !userLoading && !authLoading;
  const initialRouteName = useMemo(
    () => getInitialRoute(isLoggedIn, isOnboarded),
    [isLoggedIn, isOnboarded],
  );
  const navigationKey = useMemo(
    () => `${locale}-${isLoggedIn}-${isOnboarded}`,
    [locale, isLoggedIn, isOnboarded],
  );

  React.useEffect(() => {
    if (!splashFinished || !appReady || !isLoggedIn) {
      setNavReady(false);
      return;
    }
    const { enableScreens } = require('react-native-screens') as typeof import('react-native-screens');
    enableScreens(true);
    const task = InteractionManager.runAfterInteractions(() => {
      setNavReady(true);
    });
    return () => task.cancel();
  }, [splashFinished, appReady, isLoggedIn, navigationKey]);

  React.useEffect(() => {
    if (!splashFinished || !appReady || isLoggedIn) return;
    const task = InteractionManager.runAfterInteractions(() => {
      setSplashMounted(false);
    });
    return () => task.cancel();
  }, [splashFinished, appReady, isLoggedIn]);

  if (!splashFinished) {
    return <SplashScreen onFinish={() => setSplashFinished(true)} ready={appReady} />;
  }

  if (!appReady) {
    return (
      <View style={styles.root}>
        {splashMounted ? <SplashScreen onFinish={() => {}} ready frozen /> : null}
        <BootstrapLoading />
      </View>
    );
  }

  // Cold-start gate: no NavigationContainer, no native stack, no LoginScreen.
  if (!isLoggedIn) {
    return (
      <View style={styles.root}>
        {splashMounted ? (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <SplashScreen onFinish={() => {}} ready frozen />
          </View>
        ) : null}
        <ColdStartGate />
      </View>
    );
  }

  if (!navReady) {
    return <BootstrapLoading />;
  }

  const AppStack = require('./AppStack').default as React.ComponentType<{
    initialRouteName: keyof RootStackParamList;
    navigationKey: string;
  }>;

  return (
    <View style={styles.root}>
      <AppStack initialRouteName={initialRouteName} navigationKey={navigationKey} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bootstrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 32,
  },
  bootstrapLogo: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 24,
  },
  bootstrapSpinner: {
    marginBottom: 16,
  },
  bootstrapHint: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
});
