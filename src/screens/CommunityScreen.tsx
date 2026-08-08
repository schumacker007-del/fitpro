import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import {
  formatMemberLocation,
  getInitials,
  searchCommunityMembers,
} from '../data/communityMembers';
import { CommunityStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';
import { CommunityMember } from '../types';

function MemberRow({
  member,
  onPress,
  goalLabel,
  gymLabel,
}: {
  member: CommunityMember;
  onPress: () => void;
  goalLabel: string;
  gymLabel: string;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
      <View style={[styles.avatar, { backgroundColor: member.avatarColor }]}>
        <Text style={styles.avatarText}>{getInitials(member.name)}</Text>
      </View>
      <View style={styles.rowBody}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberLocation}>{formatMemberLocation(member)}</Text>
        <Text style={styles.memberMeta}>
          <Text style={styles.metaLabel}>{goalLabel} </Text>
          {member.goalLabel}
        </Text>
        {member.gym ? (
          <Text style={styles.memberMeta}>
            <Text style={styles.metaLabel}>{gymLabel} </Text>
            {member.gym}
          </Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.primary} />
    </Pressable>
  );
}

export default function CommunityScreen() {
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<CommunityStackParamList, 'CommunityHome'>>();
  const [query, setQuery] = useState('');

  const members = useMemo(() => searchCommunityMembers(query), [query]);

  return (
    <View style={styles.safe}>
      <ImageBackground
        source={require('../../assets/community/community-bg.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(15,17,23,0.45)', 'rgba(15,17,23,0.85)', colors.background]}
          locations={[0, 0.4, 1]}
          style={styles.overlay}
        />
        <SafeAreaView style={styles.safeInner} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('community.title')}</Text>
        <Pressable
          style={styles.headerActionBtn}
          hitSlop={8}
          onPress={() => navigation.navigate('MessagesHub')}
          accessibilityLabel={t('more.menu.messages')}
        >
          <Ionicons name="chatbubbles-outline" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t('community.searchPlaceholder')}
          placeholderTextColor={colors.textMuted}
          style={styles.searchInput}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      <Pressable onPress={() => navigation.navigate('TrainingFeed')} style={styles.feedBannerWrap}>
        <Card style={styles.feedBanner}>
          <Ionicons name="barbell-outline" size={24} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.feedBannerTitle}>{t('community.feedTitle')}</Text>
            <Text style={styles.feedBannerSubtitle}>{t('community.feedSubtitle')}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </Card>
      </Pressable>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MemberRow
            member={item}
            goalLabel={t('community.goal')}
            gymLabel={t('community.gym')}
            onPress={() => navigation.navigate('CommunityMember', { memberId: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          query.trim() ? (
            <Text style={styles.empty}>Nenhum membro encontrado para &quot;{query}&quot;.</Text>
          ) : (
            <Card style={styles.emptyCard}>
              <Ionicons name="people-outline" size={40} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Comunidade em breve</Text>
              <Text style={styles.empty}>
                Aqui você vai encontrar outros atletas, trocar mensagens e compartilhar fotos. Os perfis
                aparecerão quando a comunidade estiver ativa.
              </Text>
            </Card>
          )
        }
      />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject },
  safeInner: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTitle: { ...typography.h2, color: colors.primary, fontSize: 22, fontWeight: '800' },
  headerActionBtn: {
    position: 'absolute',
    right: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: 15, paddingVertical: 0 },
  feedBannerWrap: { marginHorizontal: spacing.lg, marginBottom: spacing.md },
  feedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  feedBannerTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  feedBannerSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 2, lineHeight: 18 },
  list: { paddingBottom: spacing.xl, paddingHorizontal: spacing.lg, flexGrow: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  rowPressed: { backgroundColor: colors.surface },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFFFFF', fontWeight: '800', fontSize: 18 },
  rowBody: { flex: 1 },
  memberName: { color: colors.text, fontWeight: '800', fontSize: 16, marginBottom: 3 },
  memberLocation: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginBottom: 4 },
  memberMeta: { color: colors.primary, fontSize: 13, lineHeight: 18 },
  metaLabel: { color: colors.textMuted },
  separator: { height: 1, backgroundColor: colors.border, marginLeft: spacing.lg + 56 + spacing.md },
  emptyCard: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl, paddingVertical: spacing.xl },
  emptyTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  empty: { color: colors.textMuted, textAlign: 'center', fontSize: 14, lineHeight: 21 },
});
