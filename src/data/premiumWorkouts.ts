import { Ionicons } from '@expo/vector-icons';
import { TranslationKey } from '../i18n/translations';

export type PremiumProductId = 'fitpro_pro' | 'powerlifting_advanced' | 'custom_plan' | 'exam_analysis';

export interface PremiumProduct {
  id: PremiumProductId;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  tab: 'Perfil' | 'Treinos' | 'TreinosPremium';
  screen: string;
  bannerImage?: number;
}

export const PREMIUM_PRODUCTS: PremiumProduct[] = [
  {
    id: 'fitpro_pro',
    titleKey: 'premium.products.proTitle',
    subtitleKey: 'premium.products.proSubtitle',
    icon: 'star',
    color: '#F4B740',
    tab: 'Perfil',
    screen: 'Paywall',
  },
  {
    id: 'custom_plan',
    titleKey: 'premium.products.customPlanTitle',
    subtitleKey: 'premium.products.customPlanSubtitle',
    icon: 'create-outline',
    color: '#60A5FA',
    tab: 'Perfil',
    screen: 'CustomPlan',
  },
  {
    id: 'exam_analysis',
    titleKey: 'premium.products.examAnalysisTitle',
    subtitleKey: 'premium.products.examAnalysisSubtitle',
    icon: 'analytics-outline',
    color: '#A78BFA',
    tab: 'TreinosPremium',
    screen: 'ExamAnalysis',
  },
  {
    id: 'powerlifting_advanced',
    titleKey: 'premium.products.powerliftingTitle',
    subtitleKey: 'premium.products.powerliftingSubtitle',
    icon: 'barbell',
    color: '#EF4444',
    tab: 'Treinos',
    screen: 'Powerlifting',
    bannerImage: require('../../assets/powerlifting/menu-banner.jpg'),
  },
];
