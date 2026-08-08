import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ExamAnalysisReportScreen from '../screens/ExamAnalysisReportScreen';
import ExamAnalysisScreen from '../screens/ExamAnalysisScreen';
import PremiumWorkoutsScreen from '../screens/PremiumWorkoutsScreen';
import { PremiumWorkoutsStackParamList } from './types';

const Stack = createNativeStackNavigator<PremiumWorkoutsStackParamList>();

export default function PremiumWorkoutsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PremiumHome" component={PremiumWorkoutsScreen} />
      <Stack.Screen name="ExamAnalysis" component={ExamAnalysisScreen} />
      <Stack.Screen name="ExamAnalysisReport" component={ExamAnalysisReportScreen} />
    </Stack.Navigator>
  );
}
