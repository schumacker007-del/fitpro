import { Ionicons } from '@expo/vector-icons';
import { MedicalRecordCategory } from '../types';

export interface MedicalRecordCategoryInfo {
  id: MedicalRecordCategory;
  label: string;
  shortLabel: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export const MEDICAL_RECORD_CATEGORIES: MedicalRecordCategoryInfo[] = [
  {
    id: 'analise_laboratorial',
    label: 'Análise laboratorial',
    shortLabel: 'Laboratorial',
    description: 'Hemograma, glicemia, hormônios e laudos — foto, vídeo ou PDF.',
    icon: 'flask-outline',
    color: '#38BDF8',
  },
  {
    id: 'exame_medico',
    label: 'Exame médico',
    shortLabel: 'Exame',
    description: 'Raio-X, ressonância, ultrassom, eletrocardiograma e laudos.',
    icon: 'scan-outline',
    color: '#34D399',
  },
  {
    id: 'prescricao',
    label: 'Prescrição médica',
    shortLabel: 'Prescrição',
    description: 'Receitas, medicamentos e orientações prescritas pelo médico.',
    icon: 'medical-outline',
    color: '#F472B6',
  },
  {
    id: 'avaliacao_medica',
    label: 'Avaliação médica',
    shortLabel: 'Avaliação',
    description: 'Atestados, relatórios de avaliação física e pareceres clínicos.',
    icon: 'clipboard-outline',
    color: '#FBBF24',
  },
];

export function getMedicalCategoryInfo(id: MedicalRecordCategory) {
  return MEDICAL_RECORD_CATEGORIES.find((c) => c.id === id)!;
}
