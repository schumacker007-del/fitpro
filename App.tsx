import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomPlanProvider } from './src/context/CustomPlanContext';
import { CustomWorkoutProvider } from './src/context/CustomWorkoutContext';
import { ProgressPhotoProvider } from './src/context/ProgressPhotoContext';
import { TrainingLogProvider } from './src/context/TrainingLogContext';
import { UserProvider } from './src/context/UserContext';
import { WorkoutDraftProvider } from './src/context/WorkoutDraftContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <UserProvider>
          <TrainingLogProvider>
            <CustomPlanProvider>
              <CustomWorkoutProvider>
                <ProgressPhotoProvider>
                  <WorkoutDraftProvider>
                    <RootNavigator />
                    <StatusBar style="light" />
                  </WorkoutDraftProvider>
                </ProgressPhotoProvider>
              </CustomWorkoutProvider>
            </CustomPlanProvider>
          </TrainingLogProvider>
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
