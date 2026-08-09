import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, InteractionManager, StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GamificationProvider } from './context/GamificationContext';
import { LanguageProvider } from './context/LanguageContext';
import { AppPreferencesProvider } from './context/AppPreferencesContext';
import { CustomPlanProvider } from './context/CustomPlanContext';
import { CustomWorkoutProvider } from './context/CustomWorkoutContext';
import { MessageProvider } from './context/MessageContext';
import { MedicalRecordProvider } from './context/MedicalRecordContext';
import { ProgressPhotoProvider } from './context/ProgressPhotoContext';
import { TrainingFeedProvider } from './context/TrainingFeedContext';
import { TrainingLogProvider } from './context/TrainingLogContext';
import { UserProvider, useUser } from './context/UserContext';
import { ReminderSettingsProvider } from './context/ReminderSettingsContext';
import { HealthIntegrationProvider } from './context/HealthIntegrationContext';
import { BodyMeasurementsProvider } from './context/BodyMeasurementsContext';
import { WorkoutDraftProvider } from './context/WorkoutDraftContext';
import { MainUnlockProvider, useMainUnlock } from './context/MainUnlockContext';
import ReminderBootstrap from './components/ReminderBootstrap';
import RootNavigator from './navigation/RootNavigator';
import { colors } from './theme';

const DEFERRED_PROVIDERS_DELAY_MS = 500;

function LazyPurchasesProvider({ children }: { children: React.ReactNode }) {
  const Provider = React.useMemo(
    () =>
      require('./context/PurchasesContext').PurchasesProvider as React.ComponentType<{
        children: React.ReactNode;
      }>,
    [],
  );
  return <Provider>{children}</Provider>;
}

function DeferredAppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CustomPlanProvider>
      <CustomWorkoutProvider>
        <ProgressPhotoProvider>
          <TrainingFeedProvider>
            <MessageProvider>
              <MedicalRecordProvider>
                <ReminderSettingsProvider>
                  <HealthIntegrationProvider>
                    <BodyMeasurementsProvider>
                      <WorkoutDraftProvider>
                        <LazyPurchasesProvider>{children}</LazyPurchasesProvider>
                      </WorkoutDraftProvider>
                    </BodyMeasurementsProvider>
                  </HealthIntegrationProvider>
                </ReminderSettingsProvider>
              </MedicalRecordProvider>
            </MessageProvider>
          </TrainingFeedProvider>
        </ProgressPhotoProvider>
      </CustomWorkoutProvider>
    </CustomPlanProvider>
  );
}

function CoreAppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GamificationProvider>
      <TrainingLogProvider>{children}</TrainingLogProvider>
    </GamificationProvider>
  );
}

function AppDataProviders({ children }: { children: React.ReactNode }) {
  const [deferredReady, setDeferredReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDeferredReady(true), DEFERRED_PROVIDERS_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CoreAppProviders>
      {deferredReady ? <DeferredAppProviders>{children}</DeferredAppProviders> : children}
    </CoreAppProviders>
  );
}

function HeavyBootstrap() {
  return (
    <View style={styles.heavyBootstrap}>
      <Text style={styles.heavyLogo}>FitPro</Text>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text style={styles.heavyHint}>Preparando treinos…</Text>
    </View>
  );
}

function AppShell() {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const { isOnboarded, loading: userLoading } = useUser();
  const { mainUnlocked } = useMainUnlock();
  const [heavyReady, setHeavyReady] = useState(false);

  const authReady = !authLoading && !userLoading;
  const needsHeavyProviders = isLoggedIn && isOnboarded && mainUnlocked;

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => setHeavyReady(true));
    return () => task.cancel();
  }, []);

  if (!authReady) {
    return <HeavyBootstrap />;
  }

  if (needsHeavyProviders && !heavyReady) {
    return <HeavyBootstrap />;
  }

  const navigator = <RootNavigator />;

  if (!isLoggedIn || !isOnboarded || !mainUnlocked) {
    return (
      <>
        {navigator}
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <>
      <AppDataProviders>
        <ReminderBootstrap />
        {navigator}
      </AppDataProviders>
      <StatusBar style="light" />
    </>
  );
}

export default function AppRoot() {
  const [dataResetKey, setDataResetKey] = useState(0);

  return (
    <LanguageProvider>
      <AppPreferencesProvider>
        <AuthProvider onAccountDeleted={() => setDataResetKey((key) => key + 1)}>
          <UserProvider key={dataResetKey}>
            <MainUnlockProvider>
              <AppShell />
            </MainUnlockProvider>
          </UserProvider>
        </AuthProvider>
      </AppPreferencesProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  heavyBootstrap: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  heavyLogo: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 24,
  },
  heavyHint: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },
});
