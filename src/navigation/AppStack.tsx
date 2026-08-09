import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
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

interface Props {
  initialRouteName: keyof RootStackParamList;
  navigationKey: string;
}

export default function AppStack({ initialRouteName, navigationKey }: Props) {
  return (
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
          getComponent={() => require('./MainEntry').default}
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
  );
}
