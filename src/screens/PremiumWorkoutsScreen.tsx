import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, SectionTitle } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { PREMIUM_PRODUCTS, PremiumProduct } from '../data/premiumWorkouts';
import { useStoreProductPrices } from '../hooks/useStoreProductPrices';
import { PremiumWorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

export default function PremiumWorkoutsScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<PremiumWorkoutsStackParamList, 'PremiumHome'>>();
  const { planTier, isPowerliftingAdvancedActive } = useUser();
  const { getPriceLabel } = useStoreProductPrices();

  const openProduct = (item: PremiumProduct) => {
    if (item.tab === 'TreinosPremium') {
      navigation.navigate(item.screen as 'ExamAnalysis');
      return;
    }
    const parent = navigation.getParent() as { navigate: (name: string, params?: object) => void } | undefined;
    if (item.tab === 'Treinos' && item.screen === 'Powerlifting') {
      parent?.navigate('Treinos', { screen: 'WorkoutsList' });
      parent?.navigate('Treinos', { screen: 'Powerlifting' });
      return;
    }
    parent?.navigate(item.tab, { screen: item.screen });
  };

  const renderProduct = (item: PremiumProduct) => {
    const priceLabel = getPriceLabel(item.id);
    const unlocked =
      (item.id === 'fitpro_pro' && planTier === 'pro') ||
      (item.id === 'powerlifting_advanced' && isPowerliftingAdvancedActive);

    if (item.bannerImage) {
      return (
        <Pressable
          onPress={() => openProduct(item)}
          style={({ pressed }) => [styles.bannerWrap, pressed && styles.bannerPressed]}
        >
          <ImageBackground
            source={item.bannerImage}
            style={styles.bannerImage}
            imageStyle={styles.bannerImageInner}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(5,10,20,0.94)', 'rgba(5,10,20,0.72)', 'rgba(5,10,20,0.2)']}
              locations={[0, 0.45, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.bannerGradient}
            >
              <View style={[styles.bannerAccent, { backgroundColor: item.color }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>{t(item.titleKey)}</Text>
                <Text style={styles.bannerSubtitle}>{t(item.subtitleKey)}</Text>
                <Text style={styles.bannerPrice}>{priceLabel}</Text>
              </View>
              {unlocked ? (
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              ) : (
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              )}
            </LinearGradient>
          </ImageBackground>
        </Pressable>
      );
    }

    return (
      <Pressable onPress={() => openProduct(item)}>
        <Card style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: `${item.color}22` }]}>
            <Ionicons name={item.icon} size={22} color={item.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{t(item.titleKey)}</Text>
            <Text style={styles.subtitle}>{t(item.subtitleKey)}</Text>
            <Text style={styles.price}>{priceLabel}</Text>
          </View>
          {unlocked ? (
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
          ) : (
            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
          )}
        </Card>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={PREMIUM_PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<SectionTitle title={t('premium.title')} subtitle={t('premium.subtitle')} />}
        renderItem={({ item }) => renderProduct(item)}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, paddingBottom: spacing.xl },
  card: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: colors.text, fontWeight: '800', fontSize: 15 },
  subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 17 },
  price: { color: colors.primary, fontWeight: '700', fontSize: 12, marginTop: 6 },
  bannerWrap: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.35)',
  },
  bannerPressed: { opacity: 0.92 },
  bannerImage: {
    width: '100%',
    aspectRatio: 1024 / 349,
    justifyContent: 'center',
  },
  bannerImageInner: {
    borderRadius: radius.lg,
  },
  bannerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 96,
  },
  bannerAccent: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 2,
    marginRight: spacing.md,
  },
  bannerTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  bannerSubtitle: { color: 'rgba(248,250,252,0.78)', fontSize: 12, marginTop: 4, lineHeight: 17, maxWidth: '78%' },
  bannerPrice: { color: colors.primary, fontWeight: '700', fontSize: 12, marginTop: 6 },
});
