import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomPlanProvider } from './src/context/CustomPlanContext';
import { TrainingLogProvider } from './src/context/TrainingLogContext';
import { UserProvider } from './src/context/UserContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <UserProvider>
          <TrainingLogProvider>
            <CustomPlanProvider>
              <RootNavigator />
              <StatusBar style="light" />
            </CustomPlanProvider>
          </TrainingLogProvider>
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
