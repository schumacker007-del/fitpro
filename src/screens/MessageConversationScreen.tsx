import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContactAvatar } from '../components/ContactAvatar';
import { useLanguage } from '../context/LanguageContext';
import { useMessages } from '../context/MessageContext';
import { getMessagingContact } from '../data/messagingContacts';
import { CommunityStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

function formatMessageDate(iso: string, locale: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MessageConversationScreen() {
  const route = useRoute<RouteProp<CommunityStackParamList, 'MessageConversation'>>();
  const navigation = useNavigation<NativeStackNavigationProp<CommunityStackParamList, 'MessageConversation'>>();
  const { t, locale } = useLanguage();
  const { getMessagesForContact, sendMessage } = useMessages();
  const contact = getMessagingContact(route.params.contactId);
  const messages = useMemo(
    () => getMessagesForContact(route.params.contactId),
    [getMessagesForContact, route.params.contactId]
  );

  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      await sendMessage(route.params.contactId, trimmed);
      setText('');
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.headerCenter}>
          <ContactAvatar initials={contact.initials} color={contact.avatarColor} size={36} />
          <View style={styles.headerText}>
            <Text style={styles.headerName} numberOfLines={1}>
              {contact.name}
            </Text>
            <Text style={styles.headerRole} numberOfLines={1}>
              {t(contact.roleKey)}
            </Text>
          </View>
        </View>
        <View style={{ width: 32 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}
      >
        <ScrollView
          contentContainerStyle={styles.thread}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="chatbubble-ellipses-outline" size={40} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>{t('messages.emptyThreadTitle')}</Text>
              <Text style={styles.emptyBody}>{t('messages.emptyThreadBody')}</Text>
            </View>
          ) : (
            messages.map((message) => (
              <View key={message.id} style={styles.bubbleWrap}>
                <View style={styles.bubble}>
                  <Text style={styles.bubbleText}>{message.body}</Text>
                  <Text style={styles.bubbleMeta}>{formatMessageDate(message.createdAtISO, locale)}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder={t('messages.inputPlaceholder')}
            placeholderTextColor={colors.textMuted}
            multiline
            maxLength={1000}
            editable={!sending}
          />
          <Pressable
            onPress={handleSend}
            disabled={!text.trim() || sending}
            style={({ pressed }) => [
              styles.sendBtn,
              (!text.trim() || sending) && styles.sendBtnDisabled,
              pressed && text.trim() && !sending ? styles.sendBtnPressed : null,
            ]}
            accessibilityRole="button"
            accessibilityLabel={t('messages.send')}
          >
            <Ionicons name="send" size={18} color="#0B1210" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  headerText: { flexShrink: 1 },
  headerName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '700',
  },
  headerRole: {
    ...typography.small,
    color: colors.textMuted,
  },
  thread: {
    flexGrow: 1,
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xl * 2,
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
  },
  emptyBody: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
  bubbleWrap: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '85%',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    borderBottomRightRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 4,
  },
  bubbleText: {
    ...typography.body,
    color: '#0B1210',
  },
  bubbleMeta: {
    ...typography.small,
    color: 'rgba(11,18,16,0.65)',
    alignSelf: 'flex-end',
    fontSize: 11,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    ...typography.body,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.45,
  },
  sendBtnPressed: {
    opacity: 0.85,
  },
});
