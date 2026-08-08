import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AboutPromoScreen from '../screens/AboutPromoScreen';
import HomeScreen from '../screens/HomeScreen';
import TrainingVideoDetailScreen from '../screens/TrainingVideoDetailScreen';
import TrainingVideosScreen from '../screens/TrainingVideosScreen';
import { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="TrainingVideos" component={TrainingVideosScreen} />
      <Stack.Screen name="TrainingVideoDetail" component={TrainingVideoDetailScreen} />
      <Stack.Screen name="AboutPromo" component={AboutPromoScreen} />
    </Stack.Navigator>
  );
}
