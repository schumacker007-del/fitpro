import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, SectionTitle } from '../components/ui';
import WaterIntakeCard from '../components/WaterIntakeCard';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { badgeTitleKey } from '../i18n/muscleGroupLabel';
import { DietStackParamList } from '../navigation/types';
import { calculateWaterLiters } from '../utils/nutritionTargets';
import { colors, spacing } from '../theme';

export default function DietScreen() {
  const { t } = useLanguage();
  const { profile } = useUser();
  const { dietDoneToday, recordDietDay } = useGamification();
  const navigation = useNavigation<NativeStackNavigationProp<DietStackParamList, 'DietHome'>>();
  const waterLiters = profile
    ? calculateWaterLiters(profile.weightKg, profile.activityLevel ?? 'moderado')
    : null;

  const handleDietCheckIn = async () => {
    if (dietDoneToday) return;
    const newBadges = await recordDietDay();
    if (newBadges.length > 0) {
      const lines = newBadges.map((id) => t(badgeTitleKey(id))).join('\n');
      Alert.alert(t('diet.achievementTitle'), lines);
    } else {
      Alert.alert(t('diet.registeredTitle'), t('diet.registeredMessage'));
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title={t('diet.title')} subtitle={t('diet.subtitle')} />

        <Card style={styles.checkInCard}>
          <Ionicons name={dietDoneToday ? 'checkmark-circle' : 'calendar-outline'} size={24} color={dietDoneToday ? colors.primary : colors.gold} />
          <View style={{ flex: 1 }}>
            <Text style={styles.checkInTitle}>{dietDoneToday ? t('diet.checkInDone') : t('diet.checkInPending')}</Text>
            <Text style={styles.checkInSubtitle}>
              {dietDoneToday ? t('diet.checkInDoneHint') : t('diet.checkInPendingHint')}
            </Text>
          </View>
          {!dietDoneToday ? (
            <Pressable onPress={handleDietCheckIn} style={styles.checkInBtn}>
              <Text style={styles.checkInBtnText}>{t('diet.register')}</Text>
            </Pressable>
          ) : null}
        </Card>

        {waterLiters != null && profile ? (
          <WaterIntakeCard liters={waterLiters} weightKg={profile.weightKg} />
        ) : null}

        <Pressable onPress={() => navigation.navigate('BonusRecipes')}>
          <Card style={styles.compositionBanner}>
            <Ionicons name="restaurant-outline" size={24} color="#F59E0B" />
            <View style={{ flex: 1 }}>
              <Text style={styles.compositionTitle}>{t('diet.bonusRecipesTitle')}</Text>
              <Text style={styles.compositionSubtitle}>{t('diet.bonusRecipesSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Card>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('FoodComposition')}>
          <Card style={styles.compositionBanner}>
            <Ionicons name="nutrition-outline" size={24} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.compositionTitle}>{t('diet.compositionTitle')}</Text>
              <Text style={styles.compositionSubtitle}>{t('diet.compositionSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Card>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Supplements')}>
          <Card style={styles.compositionBanner}>
            <Ionicons name="medkit-outline" size={24} color="#8B5CF6" />
            <View style={{ flex: 1 }}>
              <Text style={styles.compositionTitle}>{t('diet.supplementsTitle')}</Text>
              <Text style={styles.compositionSubtitle}>{t('diet.supplementsSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Card>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('SportsNutrition')}>
          <Card style={styles.compositionBanner}>
            <Ionicons name="fitness-outline" size={24} color="#EF4444" />
            <View style={{ flex: 1 }}>
              <Text style={styles.compositionTitle}>{t('diet.sportsNutritionTitle')}</Text>
              <Text style={styles.compositionSubtitle}>{t('diet.sportsNutritionSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Card>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Encyclopedia')}>
          <Card style={styles.compositionBanner}>
            <Ionicons name="book-outline" size={24} color="#0EA5E9" />
            <View style={{ flex: 1 }}>
              <Text style={styles.compositionTitle}>{t('diet.encyclopediaTitle')}</Text>
              <Text style={styles.compositionSubtitle}>{t('diet.encyclopediaSubtitle')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Card>
        </Pressable>

        <Text style={styles.disclaimer}>{t('diet.disclaimer')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  compositionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  compositionTitle: { color: colors.text, fontWeight: '800', fontSize: 14 },
  compositionSubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  disclaimer: { color: colors.textMuted, fontSize: 11, marginTop: spacing.lg, lineHeight: 16, textAlign: 'center' },
  checkInCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  checkInTitle: { color: colors.text, fontWeight: '800', fontSize: 14 },
  checkInSubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  checkInBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  checkInBtnText: { color: '#0B1210', fontWeight: '800', fontSize: 12 },
});
