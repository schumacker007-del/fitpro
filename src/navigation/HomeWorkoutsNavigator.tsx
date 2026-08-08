import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ActiveWorkoutScreen from '../screens/ActiveWorkoutScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import MuscleGroupDetailScreen from '../screens/MuscleGroupDetailScreen';
import MuscleGroupsScreen from '../screens/MuscleGroupsScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import HomeWorkoutsScreen from '../screens/HomeWorkoutsScreen';
import { HomeWorkoutsStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeWorkoutsStackParamList>();

export default function HomeWorkoutsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeWorkoutsList" component={HomeWorkoutsScreen} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
      <Stack.Screen name="MuscleGroups" component={MuscleGroupsScreen} />
      <Stack.Screen name="MuscleGroupDetail" component={MuscleGroupDetailScreen} />
      <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} options={{ presentation: 'fullScreenModal' }} />
    </Stack.Navigator>
  );
}
