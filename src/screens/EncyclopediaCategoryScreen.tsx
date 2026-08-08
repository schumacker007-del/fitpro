import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { getEncyclopediaArticlesForCategory, getEncyclopediaCategory } from '../data/encyclopedia';
import { DietStackParamList } from '../navigation/types';
import { EncyclopediaCategory } from '../types';
import { colors, radius, spacing, typography } from '../theme';

function getCategoryHeaderTitle(category: EncyclopediaCategory): string {
  if (!category.image) return category.title;
  if (category.id === 'imc') return 'IMC';
  if (category.title.length <= 20) return category.title;
  return category.subtitle;
}

export default function EncyclopediaCategoryScreen() {
  const { t } = useLanguage();
  const route = useRoute<RouteProp<DietStackParamList, 'EncyclopediaCategory'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<DietStackParamList, 'EncyclopediaCategory'>>();
  const category = getEncyclopediaCategory(route.params.categoryId);
  const articles = getEncyclopediaArticlesForCategory(category.id);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {getCategoryHeaderTitle(category)}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            {category.image ? (
              <View style={styles.heroWrap}>
                <ImageBackground source={category.image} style={styles.hero} imageStyle={styles.heroImage}>
                  <LinearGradient colors={['transparent', 'rgba(0,0,0,0.35)']} style={styles.heroGradient} />
                </ImageBackground>
              </View>
            ) : null}
            <Card style={styles.introCard}>
              {!category.image ? (
                <>
                  <View style={[styles.introIcon, { backgroundColor: `${category.color}22` }]}>
                    <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={28} color={category.color} />
                  </View>
                  <Text style={styles.introSubtitle}>{category.subtitle}</Text>
                </>
              ) : (
                <Text style={styles.introSubtitle}>{category.subtitle}</Text>
              )}
              <Text style={styles.introText}>{category.description}</Text>
            </Card>
          </>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('EncyclopediaArticle', { articleId: item.id })}>
            <Card style={styles.articleCard}>
              <View style={[styles.articleIcon, { backgroundColor: `${category.color}18` }]}>
                <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color={category.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.articleName}>{item.title}</Text>
                <Text style={styles.articleShort} numberOfLines={2}>
                  {item.shortDescription}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Card>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        ListEmptyComponent={
          <Card style={styles.emptyCard}>
            <Ionicons name="document-text-outline" size={36} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>{t('nutrition.labels.articlesBuildingTitle')}</Text>
            <Text style={styles.emptyText}>{t('nutrition.labels.articlesBuildingBody')}</Text>
          </Card>
        }
      />
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
  headerTitle: { ...typography.h3, color: colors.text, flex: 1, textAlign: 'center', fontSize: 15 },
  list: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xl, flexGrow: 1 },
  heroWrap: { marginBottom: spacing.md },
  hero: {
    aspectRatio: 3,
    borderRadius: radius.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroImage: { borderRadius: radius.lg },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  introCard: { marginBottom: spacing.md, gap: spacing.sm },
  introIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  introSubtitle: { color: colors.text, fontWeight: '700', fontSize: 13 },
  introText: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  articleCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  articleIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleName: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: 3 },
  articleShort: { color: colors.textMuted, fontSize: 12, lineHeight: 17 },
  emptyCard: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl, marginTop: spacing.sm },
  emptyTitle: { color: colors.text, fontWeight: '800', fontSize: 15, textAlign: 'center' },
  emptyText: { color: colors.textMuted, fontSize: 13, lineHeight: 20, textAlign: 'center' },
});
