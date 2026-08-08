import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton } from '../components/ui';
import { INJURY_SETTING_OPTIONS } from '../data/injuryOptions';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { ProfileStackParamList } from '../navigation/types';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { colors, radius, spacing } from '../theme';
import { InjuryArea } from '../types';
import { normalizeInjuryAreas, toggleInjurySelection } from '../utils/injurySelection';

export default function InjurySettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList, 'InjurySettings'>>();
  const { t } = useLanguage();
  const { profile, saveProfile } = useUser();
  const [injuryAreas, setInjuryAreas] = useState<InjuryArea[]>(() =>
    normalizeInjuryAreas(profile?.injuryAreas)
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setInjuryAreas(normalizeInjuryAreas(profile?.injuryAreas));
  }, [profile?.injuryAreas]);

  const hasChanges = useMemo(() => {
    const current = normalizeInjuryAreas(profile?.injuryAreas);
    if (current.length !== injuryAreas.length) return true;
    return current.some((area) => !injuryAreas.includes(area));
  }, [injuryAreas, profile?.injuryAreas]);

  const handleSave = async () => {
    if (!profile) return;
    if (injuryAreas.length === 0) {
      Alert.alert(t('injurySettings.title'), t('injurySettings.errorEmpty'));
      return;
    }
    setSaving(true);
    try {
      await saveProfile({ ...profile, injuryAreas });
      Alert.alert(t('injurySettings.title'), t('injurySettings.saved'));
      navigation.goBack();
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation)} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('injurySettings.title')}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('injurySettings.subtitle')}</Text>

        <Card style={styles.chipCard}>
          <View style={styles.chipWrap}>
            {INJURY_SETTING_OPTIONS.map((option) => {
              const selected = injuryAreas.includes(option.id);
              return (
                <Pressable
                  key={option.id}
                  onPress={() => setInjuryAreas((prev) => toggleInjurySelection(prev, option.id))}
                  style={[styles.chip, selected && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{t(option.labelKey)}</Text>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Text style={styles.hint}>{t('onboarding.injuryHint')}</Text>

        <PrimaryButton
          label={t('injurySettings.save')}
          icon="checkmark"
          onPress={() => void handleSave()}
          disabled={!hasChanges || saving}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  chipCard: { padding: spacing.md },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primaryMutedLight,
    borderColor: colors.primary,
  },
  chipText: { color: colors.text, fontSize: 13, fontWeight: '700' },
  chipTextSelected: { color: colors.primary },
  hint: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
});
