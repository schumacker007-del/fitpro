import { CommunityMember } from '../types';

/** Lista vazia — perfis reais virão quando a comunidade estiver conectada à nuvem. */
export const COMMUNITY_MEMBERS: CommunityMember[] = [];

export function getCommunityMember(id: string): CommunityMember {
  const found = COMMUNITY_MEMBERS.find((m) => m.id === id);
  if (!found) throw new Error(`Membro não encontrado: ${id}`);
  return found;
}

export function searchCommunityMembers(query: string): CommunityMember[] {
  const q = query.trim().toLowerCase();
  if (!q) return COMMUNITY_MEMBERS;
  return COMMUNITY_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.city.toLowerCase().includes(q) ||
      m.state.toLowerCase().includes(q) ||
      m.goalLabel.toLowerCase().includes(q) ||
      (m.gym?.toLowerCase().includes(q) ?? false)
  );
}

export function formatMemberLocation(member: CommunityMember) {
  const location = `${member.city}, ${member.state}, ${member.country}`;
  return member.age != null ? `${member.age} anos, ${location}` : location;
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function profileToCommunityMember(profile: {
  name: string;
  age: number;
  goal: string;
  city?: string;
  state?: string;
  gym?: string;
}): CommunityMember {
  const goalLabels: Record<string, string> = {
    perder_peso: 'Emagrecimento',
    ganhar_massa: 'Ganhar massa',
    manter_forma: 'Manter forma',
    condicionamento_fisico: 'Condicionamento físico',
  };
  return {
    id: 'me',
    name: profile.name,
    age: profile.age,
    city: profile.city ?? '—',
    state: profile.state ?? '—',
    country: 'Brasil',
    goalLabel: goalLabels[profile.goal] ?? profile.goal,
    gym: profile.gym,
    avatarColor: '#34D399',
  };
}
