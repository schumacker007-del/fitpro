import { TrainingMethodCategory, TrainingMethodCategoryId } from '../types';

export const TRAINING_METHOD_CATEGORIES: TrainingMethodCategory[] = [
  {
    id: 'intensification',
    title: 'Intensificação e volumetria',
    subtitle: 'Drop set, rest-pause, cluster e mais',
    description:
      'Técnicas para elevar o estresse metabólico, acumular volume e recrutar mais fibras musculares em menos tempo.',
    icon: 'flame-outline',
    color: '#F97316',
  },
  {
    id: 'load_variation',
    title: 'Variação de carga e repetições',
    subtitle: 'Pirâmides, onda e progressão',
    description:
      'Métodos que organizam séries alterando carga e repetições para preparar articulações, ganhar força ou combinar tensão e volume.',
    icon: 'stats-chart-outline',
    color: '#3B82F6',
  },
  {
    id: 'exercise_combos',
    title: 'Combinados de exercícios',
    subtitle: 'Bi-set, tri-set e série gigante',
    description:
      'Super séries que encadeiam dois ou mais exercícios com pouco ou nenhum descanso entre eles.',
    icon: 'layers-outline',
    color: '#A855F7',
  },
  {
    id: 'angle_amplitude',
    title: 'Ângulo e amplitude',
    subtitle: 'Método 21, parciais e isometria',
    description:
      'Técnicas que variam a amplitude do movimento ou o tempo sob tensão para gerar fadiga e pump em regiões específicas.',
    icon: 'resize-outline',
    color: '#34D399',
  },
];

export function getTrainingMethodCategory(id: TrainingMethodCategoryId): TrainingMethodCategory {
  const found = TRAINING_METHOD_CATEGORIES.find((c) => c.id === id);
  if (!found) throw new Error(`Categoria de método desconhecida: ${id}`);
  return found;
}
