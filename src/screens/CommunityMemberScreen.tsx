import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton } from '../components/ui';
import { formatMemberLocation, getCommunityMember, getInitials } from '../data/communityMembers';
import { CommunityStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function CommunityMemberScreen() {
  const route = useRoute<RouteProp<CommunityStackParamList, 'CommunityMember'>>();
  const navigation = useNavigation<NativeStackNavigationProp<CommunityStackParamList, 'CommunityMember'>>();
  const member = getCommunityMember(route.params.memberId);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Perfil
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.avatar, { backgroundColor: member.avatarColor }]}>
          <Text style={styles.avatarText}>{getInitials(member.name)}</Text>
        </View>

        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.location}>{formatMemberLocation(member)}</Text>

        <Card style={styles.infoCard}>
          <InfoRow label="Objetivo" value={member.goalLabel} />
          {member.gym ? <InfoRow label="Academia" value={member.gym} /> : null}
        </Card>

        {member.bio ? (
          <Card style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Sobre</Text>
            <Text style={styles.bio}>{member.bio}</Text>
          </Card>
        ) : null}

        <PrimaryButton
          label="Enviar mensagem"
          icon="chatbubble-outline"
          onPress={() =>
            Alert.alert('Em breve', 'Mensagens diretas serão liberadas na próxima etapa da comunidade.')
          }
        />

        <Card style={styles.postsCard}>
          <Text style={styles.sectionTitle}>Publicações</Text>
          <Text style={styles.placeholder}>
            Fotos e mensagens deste perfil aparecerão aqui quando a comunidade estiver conectada à nuvem.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
  content: { padding: spacing.lg, paddingBottom: spacing.xl, alignItems: 'center' },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: { color: '#FFFFFF', fontWeight: '800', fontSize: 32 },
  name: { color: colors.text, fontSize: 24, fontWeight: '800', textAlign: 'center' },
  location: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: 6, marginBottom: spacing.lg },
  infoCard: { width: '100%', marginBottom: spacing.md },
  infoRow: { marginBottom: spacing.sm },
  infoLabel: { color: colors.textMuted, fontSize: 12, marginBottom: 2 },
  infoValue: { color: colors.primary, fontSize: 15, fontWeight: '700' },
  sectionTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginBottom: spacing.sm },
  bio: { color: colors.text, fontSize: 14, lineHeight: 21 },
  postsCard: { width: '100%', marginTop: spacing.md },
  placeholder: { color: colors.textMuted, fontSize: 13, lineHeight: 20, fontStyle: 'italic' },
});
