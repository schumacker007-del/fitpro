import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DirectMessage, MessageContactId } from '../types';

const MESSAGES_KEY = '@fitpro/direct_messages';

interface MessageContextValue {
  messages: DirectMessage[];
  loading: boolean;
  sendMessage: (contactId: MessageContactId, body: string) => Promise<DirectMessage>;
  getMessagesForContact: (contactId: MessageContactId) => DirectMessage[];
  getLastMessageForContact: (contactId: MessageContactId) => DirectMessage | null;
  clearMessages: () => Promise<void>;
}

const MessageContext = createContext<MessageContextValue | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(MESSAGES_KEY);
        if (raw) setMessages(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: DirectMessage[]) => {
    setMessages(next);
    await AsyncStorage.setItem(MESSAGES_KEY, JSON.stringify(next));
  }, []);

  const sendMessage = useCallback(
    async (contactId: MessageContactId, body: string) => {
      const trimmed = body.trim();
      if (!trimmed) throw new Error('Mensagem vazia');

      const newMessage: DirectMessage = {
        id: `msg-${Date.now()}`,
        contactId,
        body: trimmed,
        createdAtISO: new Date().toISOString(),
      };

      await persist([...messages, newMessage]);
      return newMessage;
    },
    [messages, persist]
  );

  const getMessagesForContact = useCallback(
    (contactId: MessageContactId) =>
      messages
        .filter((message) => message.contactId === contactId)
        .sort((a, b) => new Date(a.createdAtISO).getTime() - new Date(b.createdAtISO).getTime()),
    [messages]
  );

  const getLastMessageForContact = useCallback(
    (contactId: MessageContactId) => {
      const contactMessages = getMessagesForContact(contactId);
      return contactMessages[contactMessages.length - 1] ?? null;
    },
    [getMessagesForContact]
  );

  const clearMessages = useCallback(async () => {
    await persist([]);
  }, [persist]);

  const value = useMemo<MessageContextValue>(
    () => ({
      messages,
      loading,
      sendMessage,
      getMessagesForContact,
      getLastMessageForContact,
      clearMessages,
    }),
    [messages, loading, sendMessage, getMessagesForContact, getLastMessageForContact, clearMessages]
  );

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
}

export function useMessages() {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error('useMessages must be used within a MessageProvider');
  return ctx;
}
