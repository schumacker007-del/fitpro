import { getInitials } from './communityMembers';
import { RESPONSIBLE_PROFESSIONAL } from './professional';
import { MessageContactId } from '../types';

export interface MessagingContact {
  id: MessageContactId;
  name: string;
  roleKey: 'messages.contact.creatorRole' | 'messages.contact.instructorRole';
  initials: string;
  avatarColor: string;
}

export const MESSAGING_CONTACTS: MessagingContact[] = [
  {
    id: 'creator',
    name: 'Equipe FitPro',
    roleKey: 'messages.contact.creatorRole',
    initials: 'FP',
    avatarColor: '#3B82F6',
  },
  {
    id: 'instructor',
    name: RESPONSIBLE_PROFESSIONAL.name,
    roleKey: 'messages.contact.instructorRole',
    initials: getInitials(RESPONSIBLE_PROFESSIONAL.name),
    avatarColor: '#34D399',
  },
];

export function getMessagingContact(id: MessageContactId): MessagingContact {
  const contact = MESSAGING_CONTACTS.find((c) => c.id === id);
  if (!contact) throw new Error(`Contato não encontrado: ${id}`);
  return contact;
}
