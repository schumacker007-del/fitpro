import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { GamificationProvider } from './src/context/GamificationContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { AppPreferencesProvider } from './src/context/AppPreferencesContext';
import { CustomPlanProvider } from './src/context/CustomPlanContext';
import { CustomWorkoutProvider } from './src/context/CustomWorkoutContext';
import { MessageProvider } from './src/context/MessageContext';
import { MedicalRecordProvider } from './src/context/MedicalRecordContext';
import { ProgressPhotoProvider } from './src/context/ProgressPhotoContext';
import { TrainingFeedProvider } from './src/context/TrainingFeedContext';
import { TrainingLogProvider } from './src/context/TrainingLogContext';
import { UserProvider } from './src/context/UserContext';
import { PurchasesProvider } from './src/context/PurchasesContext';
import { ReminderSettingsProvider } from './src/context/ReminderSettingsContext';
import { HealthIntegrationProvider } from './src/context/HealthIntegrationContext';
import { BodyMeasurementsProvider } from './src/context/BodyMeasurementsContext';
import { WorkoutDraftProvider } from './src/context/WorkoutDraftContext';
import ReminderBootstrap from './src/components/ReminderBootstrap';
import AppErrorBoundary from './src/components/AppErrorBoundary';
import RootNavigator from './src/navigation/RootNavigator';

function AppDataProviders({ children }: { children: React.ReactNode }) {
  return (
    <GamificationProvider>
      <UserProvider>
        <PurchasesProvider>
          <TrainingLogProvider>
            <CustomPlanProvider>
              <CustomWorkoutProvider>
                <ProgressPhotoProvider>
                  <TrainingFeedProvider>
                    <MessageProvider>
                      <MedicalRecordProvider>
                        <ReminderSettingsProvider>
                          <HealthIntegrationProvider>
                            <BodyMeasurementsProvider>
                              <WorkoutDraftProvider>{children}</WorkoutDraftProvider>
                            </BodyMeasurementsProvider>
                          </HealthIntegrationProvider>
                        </ReminderSettingsProvider>
                      </MedicalRecordProvider>
                    </MessageProvider>
                  </TrainingFeedProvider>
                </ProgressPhotoProvider>
              </CustomWorkoutProvider>
            </CustomPlanProvider>
          </TrainingLogProvider>
        </PurchasesProvider>
      </UserProvider>
    </GamificationProvider>
  );
}

export default function App() {
  const [dataResetKey, setDataResetKey] = useState(0);

  return (
    <AppErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#050810' }}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#050810' }}>
          <LanguageProvider>
            <AppPreferencesProvider>
              <AuthProvider onAccountDeleted={() => setDataResetKey((key) => key + 1)}>
                <AppDataProviders key={dataResetKey}>
                  <ReminderBootstrap />
                  <RootNavigator />
                  <StatusBar style="light" />
                </AppDataProviders>
              </AuthProvider>
            </AppPreferencesProvider>
          </LanguageProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppErrorBoundary>
  );
}
