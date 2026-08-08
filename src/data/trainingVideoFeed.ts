/**
 * Catálogo de vídeos de treino — atualize aqui quando quiser publicar conteúdo novo.
 *
 * Como adicionar um vídeo:
 * 1. Coloque o arquivo .mp4 em assets/videos/feed/
 * 2. Adicione uma entrada no array TRAINING_VIDEO_FEED (mais recente no topo)
 * 3. Recarregue o app no Expo
 */

export type TrainingVideoCategory = 'treino' | 'dica' | 'nutricao' | 'motivacao';

export interface TrainingVideoFeedItem {
  id: string;
  title: string;
  description: string;
  category: TrainingVideoCategory;
  /** Data de publicação (ISO) — usada para ordenar o feed */
  publishedAt: string;
  durationLabel?: string;
  featured?: boolean;
  video: number;
}

export const TRAINING_VIDEO_FEED: TrainingVideoFeedItem[] = [
  {
    id: 'treino-preview-2026-07-28',
    title: 'Preview — exercício em vídeo',
    description: 'Teste de vídeo de exercício para avaliar qualidade, enquadramento e loop no app.',
    category: 'treino',
    publishedAt: '2026-07-28',
    featured: true,
    video: require('../../assets/videos/feed/treino-preview-2026-07-28.mp4'),
  },
  {
    id: 'treino-elevacao-pelvica',
    title: 'Elevação pélvica (hip thrust)',
    description:
      'Execução da elevação pélvica com foco em ativação dos glúteos, alinhamento do tronco e controle na subida e descida.',
    category: 'treino',
    publishedAt: '2026-07-26',
    featured: false,
    video: require('../../assets/videos/feed/elevacao-pelvica.mp4'),
  },
  {
    id: 'treino-2026-07-24',
    title: 'Treino em vídeo — julho 2026',
    description: 'Novo conteúdo de treino publicado pelo professor. Assista e aplique no seu dia.',
    category: 'treino',
    publishedAt: '2026-07-24',
    featured: false,
    video: require('../../assets/videos/feed/treino-2026-07-24.mp4'),
  },
  {
    id: 'treino-peito-supino',
    title: 'Treino de peito — supino reto',
    description: 'Execução do supino reto com foco em postura, amplitude e controle da descida.',
    category: 'treino',
    publishedAt: '2026-07-24',
    durationLabel: '~1 min',
    video: require('../../assets/videos/feed/treino-peito-supino.mp4'),
  },
  {
    id: 'bem-vindo-fitpro',
    title: 'Bem-vindo ao FitPro',
    description: 'Conheça o app e comece sua jornada de treino com acompanhamento profissional.',
    category: 'motivacao',
    publishedAt: '2026-07-23',
    durationLabel: '~8 s',
    video: require('../../assets/videos/feed/bem-vindo.mp4'),
  },
];

export const TRAINING_VIDEO_CATEGORY_LABELS: Record<TrainingVideoCategory, string> = {
  treino: 'Treino',
  dica: 'Dica',
  nutricao: 'Nutrição',
  motivacao: 'Motivação',
};

export function getTrainingVideoById(id: string) {
  return TRAINING_VIDEO_FEED.find((item) => item.id === id);
}

export function getFeaturedTrainingVideo() {
  return TRAINING_VIDEO_FEED.find((item) => item.featured) ?? TRAINING_VIDEO_FEED[0];
}

export function getSortedTrainingVideos() {
  return [...TRAINING_VIDEO_FEED].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
