import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import { WorkoutsStackParamList } from './types';

const Stack = createNativeStackNavigator<WorkoutsStackParamList>();

export default function WorkoutsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutsList" component={WorkoutsScreen} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
    </Stack.Navigator>
  );
}
