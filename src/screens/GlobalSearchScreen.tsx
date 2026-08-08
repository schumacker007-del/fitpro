import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppSearchEntry, getSearchKindLabel, searchAppContent } from '../data/appSearchIndex';
import { useLanguage } from '../context/LanguageContext';
import { navigateFromGlobalSearch } from '../navigation/navigateFromSearch';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing } from '../theme';

function kindIcon(kind: AppSearchEntry['kind']): keyof typeof Ionicons.glyphMap {
  switch (kind) {
    case 'workout':
      return 'barbell-outline';
    case 'exercise':
      return 'fitness-outline';
    case 'sportsNutrition':
      return 'nutrition-outline';
    case 'supplement':
      return 'flask-outline';
    case 'encyclopedia':
      return 'book-outline';
    default:
      return 'compass-outline';
  }
}

export default function GlobalSearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'GlobalSearch'>>();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchAppContent(query), [query]);

  const handleSelect = (entry: AppSearchEntry) => {
    navigateFromGlobalSearch(navigation, entry.target);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Main')} style={styles.headerIconBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('search.title')}</Text>
        <View style={styles.headerIconBtn} />
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t('search.placeholder')}
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
          autoFocus
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      <Text style={styles.hint}>{query.trim() ? t('search.resultsHint') : t('search.emptyHint')}</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="search-outline" size={40} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>{t('search.emptyTitle')}</Text>
            <Text style={styles.emptyBody}>{t('search.emptyBody')}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => handleSelect(item)} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <View style={styles.iconWrap}>
              <Ionicons name={kindIcon(item.kind)} size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.kind}>{getSearchKindLabel(item.kind, t)}</Text>
              <Text style={styles.title}>{item.title}</Text>
              {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </Pressable>
        )}
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
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: { flex: 1, textAlign: 'center', color: colors.text, fontSize: 17, fontWeight: '800' },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: 16, paddingVertical: 0 },
  hint: {
    color: colors.textMuted,
    fontSize: 12,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowPressed: { opacity: 0.7 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kind: { color: colors.primary, fontSize: 11, fontWeight: '700', marginBottom: 2, textTransform: 'uppercase' },
  title: { color: colors.text, fontSize: 15, fontWeight: '700' },
  subtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  emptyWrap: { alignItems: 'center', paddingTop: spacing.xl, paddingHorizontal: spacing.lg },
  emptyTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: spacing.md },
  emptyBody: { color: colors.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 19, marginTop: spacing.sm },
});
