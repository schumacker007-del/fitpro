import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CustomPlanScreen from '../screens/CustomPlanScreen';
import PaywallScreen from '../screens/PaywallScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProgressPhotosScreen from '../screens/ProgressPhotosScreen';
import { ProfileStackParamList } from './types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Paywall" component={PaywallScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="CustomPlan" component={CustomPlanScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="ProgressPhotos" component={ProgressPhotosScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
