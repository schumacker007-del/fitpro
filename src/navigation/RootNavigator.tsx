import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import SplashScreen from '../screens/SplashScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';
import { colors } from '../theme';
import MainTabs from './MainTabs';
import GlobalSearchScreen from '../screens/GlobalSearchScreen';
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

export default function RootNavigator() {
  const { isOnboarded, loading: userLoading } = useUser();
  const { isLoggedIn, loading: authLoading } = useAuth();
  const { locale } = useLanguage();
  const [splashDone, setSplashDone] = useState(false);

  const appReady = !userLoading && !authLoading;

  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} ready={appReady} />;
  }

  if (!appReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer key={locale} theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : !isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ presentation: 'card', animation: 'none' }}
            />
            <Stack.Screen
              name="GlobalSearch"
              component={GlobalSearchScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
          </>
        )}
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
