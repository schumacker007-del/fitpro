import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ActiveWorkoutScreen from '../screens/ActiveWorkoutScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import ExercisePickerScreen from '../screens/ExercisePickerScreen';
import MuscleGroupDetailScreen from '../screens/MuscleGroupDetailScreen';
import MuscleGroupsScreen from '../screens/MuscleGroupsScreen';
import BiotypeIdentificationScreen from '../screens/BiotypeIdentificationScreen';
import BodyBiotypeDetailScreen from '../screens/BodyBiotypeDetailScreen';
import BodyBiotypesScreen from '../screens/BodyBiotypesScreen';
import PowerliftingAdvancedPaywallScreen from '../screens/PowerliftingAdvancedPaywallScreen';
import PowerliftingLevelScreen from '../screens/PowerliftingLevelScreen';
import PowerliftingScreen from '../screens/PowerliftingScreen';
import PowerliftingWeekScreen from '../screens/PowerliftingWeekScreen';
import TrainingMethodCategoryScreen from '../screens/TrainingMethodCategoryScreen';
import TrainingMethodDetailScreen from '../screens/TrainingMethodDetailScreen';
import TrainingMethodsScreen from '../screens/TrainingMethodsScreen';
import WorkoutBuilderScreen from '../screens/WorkoutBuilderScreen';
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
      <Stack.Screen name="MuscleGroups" component={MuscleGroupsScreen} />
      <Stack.Screen name="MuscleGroupDetail" component={MuscleGroupDetailScreen} />
      <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="WorkoutBuilder" component={WorkoutBuilderScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="ExercisePicker" component={ExercisePickerScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="TrainingMethods" component={TrainingMethodsScreen} />
      <Stack.Screen name="TrainingMethodCategory" component={TrainingMethodCategoryScreen} />
      <Stack.Screen name="TrainingMethodDetail" component={TrainingMethodDetailScreen} />
      <Stack.Screen name="BodyBiotypes" component={BodyBiotypesScreen} />
      <Stack.Screen name="BodyBiotypeDetail" component={BodyBiotypeDetailScreen} />
      <Stack.Screen name="BiotypeIdentification" component={BiotypeIdentificationScreen} />
      <Stack.Screen name="Powerlifting" component={PowerliftingScreen} />
      <Stack.Screen name="PowerliftingLevel" component={PowerliftingLevelScreen} />
      <Stack.Screen name="PowerliftingWeek" component={PowerliftingWeekScreen} />
      <Stack.Screen
        name="PowerliftingAdvancedPaywall"
        component={PowerliftingAdvancedPaywallScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
