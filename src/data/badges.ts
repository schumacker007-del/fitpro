import { BadgeDefinition } from '../types/gamification';

export const BADGES: BadgeDefinition[] = [
  {
    id: 'first_workout',
    title: 'Primeiro passo',
    description: 'Concluiu o primeiro treino no app',
    icon: 'footsteps',
    color: '#34D399',
  },
  {
    id: 'streak_3',
    title: 'Em ritmo',
    description: '3 dias seguidos de treino',
    icon: 'flame',
    color: '#F97316',
  },
  {
    id: 'streak_7',
    title: 'Semana firme',
    description: '7 dias seguidos de treino',
    icon: 'flame',
    color: '#EF4444',
  },
  {
    id: 'streak_30',
    title: 'Imparável',
    description: '30 dias seguidos de treino',
    icon: 'trophy',
    color: '#F4B740',
  },
  {
    id: 'diet_streak_7',
    title: 'Dieta em dia',
    description: '7 dias seguidos registrando alimentação',
    icon: 'nutrition',
    color: '#60A5FA',
  },
  {
    id: 'combo_7',
    title: 'Duo perfeito',
    description: '7 dias com treino e dieta no mesmo dia',
    icon: 'star',
    color: '#A78BFA',
  },
  {
    id: 'ten_workouts',
    title: 'Veterano',
    description: '10 dias de treino registrados',
    icon: 'barbell',
    color: '#22D3EE',
  },
];

export function getBadge(id: string) {
  return BADGES.find((b) => b.id === id);
}
