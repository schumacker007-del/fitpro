import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import MedicalDisclaimerBanner from '../components/MedicalDisclaimerBanner';
import { useLanguage } from '../context/LanguageContext';
import { getSportsNutritionCategory, getSportsNutritionChildProducts, getSportsNutritionProduct } from '../data/sportsNutrition';
import { navigateBackOrHome } from '../navigation/navigateFromSearch';
import { DietStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function SportsNutritionProductDetailScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'SportsNutritionProductDetail'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<DietStackParamList, 'SportsNutritionProductDetail'>>();
  const product = getSportsNutritionProduct(route.params.productId);
  const category = getSportsNutritionCategory(product.categoryId);
  const childProducts = getSportsNutritionChildProducts(product.id);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigateBackOrHome(navigation, 'DietHome')} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {t('diet.sportsNutritionTitle')}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <MedicalDisclaimerBanner />
        {product.image ? (
          <View style={styles.heroImageWrap}>
            <Image source={product.image} style={styles.heroImage} resizeMode="contain" />
          </View>
        ) : (
          <View style={[styles.heroBadge, { backgroundColor: `${product.color}22` }]}>
            <Ionicons name={product.icon as keyof typeof Ionicons.glyphMap} size={36} color={product.color} />
          </View>
        )}

        <Text style={[styles.category, { color: category.color }]}>{category.title}</Text>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.lead}>{product.shortDescription}</Text>

        {product.description ? (
          <Card style={styles.section}>
            <Text style={styles.sectionLabel}>{t('nutrition.labels.aboutProduct')}</Text>
            <Text style={styles.body}>{product.description}</Text>
          </Card>
        ) : null}

        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>{t('nutrition.labels.benefits')}</Text>
          {product.benefits.map((benefit, index) => (
            <View key={`${product.id}-benefit-${index}`} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.body}>{benefit}</Text>
            </View>
          ))}
        </Card>

        {product.whenToTake ? (
          <Card style={styles.section}>
            <Text style={styles.sectionLabel}>{t('nutrition.labels.whenToUse')}</Text>
            <Text style={styles.body}>{product.whenToTake}</Text>
          </Card>
        ) : null}

        {product.usage ? (
          <Card style={styles.section}>
            <Text style={styles.sectionLabel}>{t('nutrition.labels.usage')}</Text>
            <Text style={styles.body}>{product.usage}</Text>
          </Card>
        ) : null}

        {childProducts.length > 0 ? (
          <View style={styles.childrenWrap}>
            <Text style={styles.childrenTitle}>{t('nutrition.labels.productLine')}</Text>
            <Text style={styles.childrenSubtitle}>{t('nutrition.labels.productLineHint')}</Text>
            {childProducts.map((child) => (
              <Pressable
                key={child.id}
                onPress={() => navigation.push('SportsNutritionProductDetail', { productId: child.id })}
              >
                <Card style={styles.childCard}>
                  {child.image ? (
                    <Image source={child.image} style={styles.childImage} resizeMode="contain" />
                  ) : (
                    <View style={[styles.childIcon, { backgroundColor: `${child.color}22` }]}>
                      <Ionicons
                        name={child.icon as keyof typeof Ionicons.glyphMap}
                        size={20}
                        color={child.color}
                      />
                    </View>
                  )}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.childName}>{child.name}</Text>
                    <Text style={styles.childShort} numberOfLines={2}>
                      {child.shortDescription}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </Card>
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 16 },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl },
  heroImageWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImage: {
    width: '100%',
    height: 120,
  },
  heroBadge: {
    width: 80,
    height: 80,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  category: { textAlign: 'center', fontSize: 12, fontWeight: '800', marginBottom: 6 },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  lead: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  section: { marginBottom: spacing.md },
  sectionLabel: { color: colors.primary, fontSize: 13, fontWeight: '700', marginBottom: spacing.sm },
  bulletRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginBottom: 6 },
  bullet: { color: colors.primary, fontWeight: '800', lineHeight: 22 },
  body: { flex: 1, color: colors.text, fontSize: 14, lineHeight: 22 },
  childrenWrap: { marginTop: spacing.sm, gap: spacing.sm },
  childrenTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  childrenSubtitle: { color: colors.textMuted, fontSize: 12, marginBottom: spacing.sm },
  childCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  childImage: {
    width: 64,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: '#FFFFFF',
  },
  childIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childName: { color: colors.text, fontWeight: '800', fontSize: 14, marginBottom: 3 },
  childShort: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
});
