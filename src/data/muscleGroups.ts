import { Ionicons } from '@expo/vector-icons';
import { MuscleGroupId } from '../types';

export interface MuscleGroupInfo {
  id: MuscleGroupId;
  label: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const MUSCLE_GROUPS: MuscleGroupInfo[] = [
  { id: 'peito', label: 'Peito', color: '#FF6B4A', icon: 'body-outline' },
  { id: 'costas', label: 'Costas', color: '#34D399', icon: 'body-outline' },
  { id: 'ombros', label: 'Ombros', color: '#F4B740', icon: 'body-outline' },
  { id: 'biceps', label: 'Bíceps', color: '#60A5FA', icon: 'barbell-outline' },
  { id: 'triceps', label: 'Tríceps', color: '#A78BFA', icon: 'barbell-outline' },
  { id: 'antebraco', label: 'Antebraço', color: '#C084FC', icon: 'barbell-outline' },
  { id: 'quadriceps', label: 'Quadríceps', color: '#38BDF8', icon: 'walk-outline' },
  { id: 'posterior_gluteos', label: 'Posterior & Glúteos', color: '#FB923C', icon: 'body-outline' },
  { id: 'panturrilha', label: 'Panturrilha', color: '#2DD4BF', icon: 'walk-outline' },
  { id: 'abdomen', label: 'Abdômen & Core', color: '#F472B6', icon: 'body-outline' },
  { id: 'funcional', label: 'Funcional', color: '#FACC15', icon: 'flash-outline' },
  { id: 'cardio', label: 'Cardio', color: '#F87171', icon: 'heart-outline' },
  { id: 'mobilidade', label: 'Mobilidade', color: '#94A3B8', icon: 'sparkles-outline' },
];

export function getMuscleGroup(id: MuscleGroupId): MuscleGroupInfo {
  return MUSCLE_GROUPS.find((m) => m.id === id) ?? MUSCLE_GROUPS[0];
}
