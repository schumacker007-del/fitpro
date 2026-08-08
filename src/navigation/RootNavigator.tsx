import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, InteractionManager, StyleSheet, Text, View } from 'react-native';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import { colors } from '../theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.border,
    primary: colors.primary,
    text: colors.text,
  },
};

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
  const [splashDone, setSplashDone] = useState(false);
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
    if (!splashDone || !appReady || !isLoggedIn) {
      setNavReady(false);
      return;
    }
    const task = InteractionManager.runAfterInteractions(() => {
      setNavReady(true);
    });
    return () => task.cancel();
  }, [splashDone, appReady, isLoggedIn, navigationKey]);

  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} ready={appReady} />;
  }

  if (!appReady) {
    return <BootstrapLoading />;
  }

  // Cold-start login gate: avoid NavigationContainer + native stack on first paint.
  // TestFlight build 11 crashed when mounting the stack right after splash.
  if (!isLoggedIn) {
    return (
      <View style={styles.root}>
        <LoginScreen standalone />
      </View>
    );
  }

  if (!navReady) {
    return <BootstrapLoading />;
  }

  return (
    <View style={styles.root}>
      <NavigationContainer key={navigationKey} theme={navTheme}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="Login" getComponent={() => require('../screens/LoginScreen').default} />
          <Stack.Screen name="Onboarding" getComponent={() => require('../screens/OnboardingScreen').default} />
          <Stack.Screen
            name="Main"
            getComponent={() => require('./MainTabs').default}
            options={{ presentation: 'card', animation: 'none' }}
          />
          <Stack.Screen
            name="GlobalSearch"
            getComponent={() => require('../screens/GlobalSearchScreen').default}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            getComponent={() => require('../screens/PrivacyPolicyScreen').default}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen
            name="TermsOfUse"
            getComponent={() => require('../screens/TermsOfUseScreen').default}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
