import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BodyMeasurementDetailScreen from '../screens/BodyMeasurementDetailScreen';
import BodyMeasurementsScreen from '../screens/BodyMeasurementsScreen';
import BodyMetricsSettingsScreen from '../screens/BodyMetricsSettingsScreen';
import CustomPlanScreen from '../screens/CustomPlanScreen';
import FeaturePromoScreen from '../screens/FeaturePromoScreen';
import InjurySettingsScreen from '../screens/InjurySettingsScreen';
import ReminderSettingsScreen from '../screens/ReminderSettingsScreen';
import AppleHealthSettingsScreen from '../screens/AppleHealthSettingsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LanguageSettingsScreen from '../screens/LanguageSettingsScreen';
import MedicalRecordsScreen from '../screens/MedicalRecordsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';
import ProgressPhotosScreen from '../screens/ProgressPhotosScreen';
import ProgressReportScreen from '../screens/ProgressReportScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import { ProfileStackParamList } from './types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="FeaturePromo" component={FeaturePromoScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen
        name="Paywall"
        getComponent={() => require('../screens/PaywallScreen').default}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="CustomPlan" component={CustomPlanScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="ProgressPhotos" component={ProgressPhotosScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="MedicalRecords" component={MedicalRecordsScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
      <Stack.Screen name="InjurySettings" component={InjurySettingsScreen} />
      <Stack.Screen name="ReminderSettings" component={ReminderSettingsScreen} />
      <Stack.Screen name="AppleHealthSettings" component={AppleHealthSettingsScreen} />
      <Stack.Screen name="BodyMetricsSettings" component={BodyMetricsSettingsScreen} />
      <Stack.Screen name="ProgressReport" component={ProgressReportScreen} />
      <Stack.Screen name="Statistics" component={StatisticsScreen} />
      <Stack.Screen name="BodyMeasurements" component={BodyMeasurementsScreen} />
      <Stack.Screen name="BodyMeasurementDetail" component={BodyMeasurementDetailScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
