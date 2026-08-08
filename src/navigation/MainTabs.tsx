import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import { useLanguage } from '../context/LanguageContext';
import { colors } from '../theme';
import CommunityNavigator from './CommunityNavigator';
import DietNavigator from './DietNavigator';
import HomeWorkoutsNavigator from './HomeWorkoutsNavigator';
import PremiumWorkoutsNavigator from './PremiumWorkoutsNavigator';
import ProfileNavigator from './ProfileNavigator';
import { MainTabParamList } from './types';
import WorkoutsNavigator from './WorkoutsNavigator';
import { createTabPopToHomeListener, TAB_HOME_SCREEN } from './navigateFromSearch';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home',
  Treinos: 'barbell',
  TreinoEmCasa: 'body',
  TreinosPremium: 'star',
  Dieta: 'restaurant',
  Comunidade: 'people',
  Perfil: 'person',
};

export default function MainTabs() {
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        lazy: true,
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={(focused ? ICONS[route.name] : (`${ICONS[route.name]}-outline` as keyof typeof Ionicons.glyphMap))}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{ title: t('tabs.home') }}
        listeners={createTabPopToHomeListener(TAB_HOME_SCREEN.Home)}
      />
      <Tab.Screen
        name="TreinosPremium"
        component={PremiumWorkoutsNavigator}
        options={{ title: t('tabs.premium') }}
        listeners={createTabPopToHomeListener(TAB_HOME_SCREEN.TreinosPremium)}
      />
      <Tab.Screen
        name="Treinos"
        component={WorkoutsNavigator}
        options={{ title: t('tabs.workouts') }}
        listeners={createTabPopToHomeListener(TAB_HOME_SCREEN.Treinos)}
      />
      <Tab.Screen
        name="TreinoEmCasa"
        component={HomeWorkoutsNavigator}
        options={{ title: t('tabs.homeWorkout') }}
        listeners={createTabPopToHomeListener(TAB_HOME_SCREEN.TreinoEmCasa)}
      />
      <Tab.Screen
        name="Dieta"
        component={DietNavigator}
        options={{ title: t('tabs.diet') }}
        listeners={createTabPopToHomeListener(TAB_HOME_SCREEN.Dieta)}
      />
      <Tab.Screen
        name="Comunidade"
        component={CommunityNavigator}
        options={{ title: t('tabs.community') }}
        listeners={createTabPopToHomeListener(TAB_HOME_SCREEN.Comunidade)}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileNavigator}
        options={{ title: t('tabs.profile') }}
        listeners={createTabPopToHomeListener(TAB_HOME_SCREEN.Perfil)}
      />
    </Tab.Navigator>
  );
}
