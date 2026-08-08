import { Ionicons } from '@expo/vector-icons';
import { TranslationKey } from '../i18n/translations';

export interface ExamEducationTopic {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  titleKey: TranslationKey;
  summaryKey: TranslationKey;
  bulletKeys: [TranslationKey, TranslationKey, TranslationKey];
}

/** Conteúdo educacional em texto — sem imagens clínicas ou linguagem de diagnóstico. */
export const EXAM_EDUCATION_TOPICS: ExamEducationTopic[] = [
  {
    id: 'intro',
    icon: 'book-outline',
    titleKey: 'premium.examAnalysis.sectionIntro',
    summaryKey: 'premium.examAnalysis.guide.intro.summary',
    bulletKeys: [
      'premium.examAnalysis.guide.intro.bullet1',
      'premium.examAnalysis.guide.intro.bullet2',
      'premium.examAnalysis.guide.intro.bullet3',
    ],
  },
  {
    id: 'metabolic',
    icon: 'nutrition-outline',
    titleKey: 'premium.examAnalysis.sectionMetabolic',
    summaryKey: 'premium.examAnalysis.guide.metabolic.summary',
    bulletKeys: [
      'premium.examAnalysis.guide.metabolic.bullet1',
      'premium.examAnalysis.guide.metabolic.bullet2',
      'premium.examAnalysis.guide.metabolic.bullet3',
    ],
  },
  {
    id: 'organic',
    icon: 'fitness-outline',
    titleKey: 'premium.examAnalysis.sectionOrganic',
    summaryKey: 'premium.examAnalysis.guide.organic.summary',
    bulletKeys: [
      'premium.examAnalysis.guide.organic.bullet1',
      'premium.examAnalysis.guide.organic.bullet2',
      'premium.examAnalysis.guide.organic.bullet3',
    ],
  },
  {
    id: 'hormonal',
    icon: 'pulse-outline',
    titleKey: 'premium.examAnalysis.sectionHormonal',
    summaryKey: 'premium.examAnalysis.guide.hormonal.summary',
    bulletKeys: [
      'premium.examAnalysis.guide.hormonal.bullet1',
      'premium.examAnalysis.guide.hormonal.bullet2',
      'premium.examAnalysis.guide.hormonal.bullet3',
    ],
  },
  {
    id: 'inflammatory',
    icon: 'heart-outline',
    titleKey: 'premium.examAnalysis.sectionInflammatory',
    summaryKey: 'premium.examAnalysis.guide.inflammatory.summary',
    bulletKeys: [
      'premium.examAnalysis.guide.inflammatory.bullet1',
      'premium.examAnalysis.guide.inflammatory.bullet2',
      'premium.examAnalysis.guide.inflammatory.bullet3',
    ],
  },
  {
    id: 'imaging',
    icon: 'scan-outline',
    titleKey: 'premium.examAnalysis.sectionImaging',
    summaryKey: 'premium.examAnalysis.guide.imaging.summary',
    bulletKeys: [
      'premium.examAnalysis.guide.imaging.bullet1',
      'premium.examAnalysis.guide.imaging.bullet2',
      'premium.examAnalysis.guide.imaging.bullet3',
    ],
  },
  {
    id: 'practical',
    icon: 'checkmark-done-outline',
    titleKey: 'premium.examAnalysis.sectionPracticalTips',
    summaryKey: 'premium.examAnalysis.guide.practicalTips.summary',
    bulletKeys: [
      'premium.examAnalysis.guide.practicalTips.bullet1',
      'premium.examAnalysis.guide.practicalTips.bullet2',
      'premium.examAnalysis.guide.practicalTips.bullet3',
    ],
  },
];
