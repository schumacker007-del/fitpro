import React, { Suspense, lazy } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppErrorBoundary from './src/components/AppErrorBoundary';
import BootFallback from './src/components/BootFallback';

const AppRoot = lazy(() => import('./src/AppRoot'));

export default function App() {
  return (
    <AppErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0F1117' }}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#0F1117' }}>
          <Suspense fallback={<BootFallback />}>
            <AppRoot />
          </Suspense>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppErrorBoundary>
  );
}
