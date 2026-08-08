/**
 * Conteúdo da tela de anúncio / sobre — edite aqui para atualizar a promo.
 */

export const ABOUT_PROMO = {
  brand: 'FitPro',
  headline: 'Treino e alimentação no seu ritmo.',
  subheadline:
    'Para quem está começando ou quer retomar a rotina — com treinos em vídeo, dieta por objetivo e acompanhamento profissional.',
  heroVideo: require('../../assets/splash/splash-hero.mp4'),
  features: [
    {
      icon: 'barbell-outline' as const,
      title: 'Treinos para iniciantes',
      text: 'Fichas para emagrecer, ganhar massa ou manter a forma, com demonstrações em vídeo passo a passo.',
    },
    {
      icon: 'restaurant-outline' as const,
      title: 'Plano alimentar',
      text: 'Dietas alinhadas ao seu objetivo, com dicas práticas do dia a dia.',
    },
    {
      icon: 'trending-up-outline' as const,
      title: 'Acompanhe sua evolução',
      text: 'Registre treinos, fotos de progresso e veja sua consistência semana a semana.',
    },
    {
      icon: 'star-outline' as const,
      title: 'FitPro Pro',
      text: 'Biblioteca completa, treino guiado, montar fichas e suporte do educador físico.',
    },
    {
      icon: 'medal-outline' as const,
      title: 'Powerlifting Avançado',
      text: 'Complemento premium para competidores: 12 semanas periodizadas de agachamento, supino e terra.',
    },
  ],
  promoTagline: 'Comece grátis. Evolua no seu tempo.',
};

/** Textos prontos para a ficha da App Store — edite antes de publicar. */
export const APP_STORE_LISTING = {
  subtitle: 'Treino e dieta no seu ritmo',
  promotionalText:
    'Comece a treinar com planos para emagrecer, ganhar massa ou manter a forma. Vídeos, dieta e acompanhamento profissional — grátis para começar.',
  description: `FitPro — Treino e alimentação no seu ritmo.

O app para quem quer começar (ou voltar) a treinar com método, sem complicação.

PARA QUEM ESTÁ COMEÇANDO
• Cadastro com peso, altura, idade e objetivo
• Treinos básicos com demonstração em vídeo
• Planos alimentares por objetivo (emagrecer, ganhar massa, manter forma)
• Acompanhamento de evolução e consistência no app
• Comece grátis — evolua no seu tempo

FITPRO PRO
• Biblioteca completa de treinos
• Modo treino guiado com timer e registro de esforço
• Fotos de evolução e documentos de saúde
• Treino sob medida com educador físico (CREF)
• Material educacional para entender seus exames

PARA QUEM COMPETE (COMPLEMENTO PREMIUM)
• Programa Powerlifting Avançado — 12 semanas periodizadas
• Prescrição em % do 1RM com variações de competição
• Metodologia de educador físico com experiência em competição

Tudo no mesmo app: do primeiro treino à preparação avançada, quando você estiver pronto.`,
};
