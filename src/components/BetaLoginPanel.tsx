import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { colors, spacing } from '../theme';

/** TestFlight-safe login — zero OAuth / Apple native modules. */
export default function BetaLoginPanel() {
  const { t } = useLanguage();
  const { loginWithSession } = useAuth();

  return (
    <View style={styles.providers}>
      <Pressable
        onPress={() =>
          void loginWithSession({
            provider: 'apple',
            userId: `beta-${Date.now()}`,
            name: 'Beta Tester',
          })
        }
        style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
      >
        <Text style={styles.primaryBtnText}>{t('login.betaContinue')}</Text>
      </Pressable>

      <Pressable
        onPress={() =>
          void AsyncStorage.clear().then(() => {
            Alert.alert(t('login.resetDoneTitle'), t('login.resetDoneBody'));
          })
        }
        style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
      >
        <Text style={styles.secondaryBtnText}>{t('login.resetAppData')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  providers: { gap: spacing.sm },
  primaryBtn: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primaryBtnText: { color: '#0B1210', fontWeight: '800', fontSize: 15 },
  secondaryBtn: {
    minHeight: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  secondaryBtnText: { color: colors.textMuted, fontWeight: '600', fontSize: 12 },
  pressed: { opacity: 0.9 },
});
