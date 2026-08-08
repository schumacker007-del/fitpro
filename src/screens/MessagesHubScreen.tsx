import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContactAvatar } from '../components/ContactAvatar';
import { Card } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';
import { useMessages } from '../context/MessageContext';
import { MESSAGING_CONTACTS } from '../data/messagingContacts';
import { CommunityStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

function formatPreviewDate(iso: string, locale: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MessagesHubScreen() {
  const { t, locale } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<CommunityStackParamList, 'MessagesHub'>>();
  const { getLastMessageForContact } = useMessages();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{t('messages.title')}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>{t('messages.subtitle')}</Text>

        <Card style={styles.groupCard}>
          {MESSAGING_CONTACTS.map((contact, index) => {
            const lastMessage = getLastMessageForContact(contact.id);
            return (
              <React.Fragment key={contact.id}>
                <Pressable
                  onPress={() => navigation.navigate('MessageConversation', { contactId: contact.id })}
                  style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                  accessibilityRole="button"
                >
                  <ContactAvatar initials={contact.initials} color={contact.avatarColor} />
                  <View style={styles.rowBody}>
                    <View style={styles.rowTop}>
                      <Text style={styles.name}>{contact.name}</Text>
                      {lastMessage ? (
                        <Text style={styles.date}>{formatPreviewDate(lastMessage.createdAtISO, locale)}</Text>
                      ) : null}
                    </View>
                    <Text style={styles.role}>{t(contact.roleKey)}</Text>
                    <Text style={styles.preview} numberOfLines={1}>
                      {lastMessage ? lastMessage.body : t('messages.emptyPreview')}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                </Pressable>
                {index < MESSAGING_CONTACTS.length - 1 ? <View style={styles.divider} /> : null}
              </React.Fragment>
            );
          })}
        </Card>

        <Text style={styles.hint}>{t('messages.localHint')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
  groupCard: { padding: 0, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    minHeight: 72,
  },
  rowPressed: { backgroundColor: colors.surfaceAlt },
  rowBody: { flex: 1, gap: 2 },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  name: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
    flex: 1,
  },
  date: {
    ...typography.small,
    color: colors.textMuted,
  },
  role: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '600',
  },
  preview: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.md + 44 + spacing.md,
  },
  hint: {
    ...typography.small,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});
