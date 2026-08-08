import { DietPlan } from '../types';

export const DIETS: DietPlan[] = [
  {
    id: 'd-free-perder',
    goal: 'perder_peso',
    title: 'Dieta Básica — Emagrecimento',
    tier: 'free',
    dailyKcalTarget: 'Déficit calórico moderado (~300-500 kcal abaixo da manutenção)',
    meals: [
      { name: 'Café da manhã', items: ['Ovos ou iogurte natural', 'Fruta', 'Café ou chá sem açúcar'], kcal: 350 },
      { name: 'Almoço', items: ['Proteína magra (frango/peixe)', 'Vegetais variados', 'Porção pequena de carboidrato'], kcal: 550 },
      { name: 'Jantar', items: ['Proteína magra', 'Salada generosa', 'Legumes'], kcal: 450 },
    ],
    tips: [
      'Beba pelo menos 2L de água por dia.',
      'Priorize alimentos in natura e evite ultraprocessados.',
      'Durma de 7 a 8h por noite — o sono afeta diretamente o emagrecimento.',
    ],
  },
  {
    id: 'd-free-ganhar',
    goal: 'ganhar_massa',
    title: 'Dieta Básica — Ganho de Massa',
    tier: 'free',
    dailyKcalTarget: 'Superávit calórico moderado (~250-400 kcal acima da manutenção)',
    meals: [
      { name: 'Café da manhã', items: ['Ovos', 'Aveia com fruta', 'Pasta de amendoim'], kcal: 550 },
      { name: 'Almoço', items: ['Arroz e feijão', 'Proteína (carne/frango/peixe)', 'Vegetais'], kcal: 750 },
      { name: 'Jantar', items: ['Batata doce ou arroz', 'Proteína magra', 'Salada'], kcal: 650 },
    ],
    tips: [
      'Distribua proteína ao longo do dia (~1,6-2,2g/kg de peso).',
      'Não pule refeições — consistência é mais importante que perfeição.',
      'Combine a dieta com treino de força regular.',
    ],
  },
  {
    id: 'd-free-manter',
    goal: 'manter_forma',
    title: 'Dieta Básica — Manutenção',
    tier: 'free',
    dailyKcalTarget: 'Calorias de manutenção, equilíbrio entre grupos alimentares',
    meals: [
      { name: 'Café da manhã', items: ['Fruta', 'Ovos ou iogurte', 'Pão integral'], kcal: 400 },
      { name: 'Almoço', items: ['Proteína', 'Carboidrato integral', 'Vegetais'], kcal: 600 },
      { name: 'Jantar', items: ['Proteína magra', 'Salada', 'Legumes'], kcal: 500 },
    ],
    tips: [
      'Mantenha rotina de refeições regulares.',
      'Combine com atividade física 3-4x por semana.',
    ],
  },

  // ---------- PRO: plano semanal detalhado ----------
  {
    id: 'd-pro-perder',
    goal: 'perder_peso',
    title: 'Plano Semanal Completo — Emagrecimento',
    tier: 'pro',
    dailyKcalTarget: 'Déficit calculado conforme peso, altura, idade e atividade (TDEE - 20%)',
    meals: [
      { name: 'Café da manhã', items: ['Omelete de 3 ovos + espinafre', '1 fatia de pão integral', 'Café sem açúcar'], kcal: 380 },
      { name: 'Lanche da manhã', items: ['Iogurte natural', '1 fruta', 'Castanhas (porção pequena)'], kcal: 200 },
      { name: 'Almoço', items: ['150g frango grelhado', 'Arroz integral (4 col)', 'Salada + brócolis'], kcal: 520 },
      { name: 'Lanche da tarde', items: ['Whey ou cottage', '1 fruta'], kcal: 180 },
      { name: 'Jantar', items: ['150g peixe ou tofu', 'Legumes no vapor', 'Salada verde'], kcal: 420 },
    ],
    tips: [
      'Ajuste as porções conforme seu peso e evolução semanal.',
      'Registre o peso 1x por semana, sempre no mesmo horário.',
      'Priorize fibras e proteína para saciedade.',
      'Evite bebidas açucaradas e álcool em excesso.',
    ],
  },
  {
    id: 'd-pro-ganhar',
    goal: 'ganhar_massa',
    title: 'Plano Semanal Completo — Ganho de Massa',
    tier: 'pro',
    dailyKcalTarget: 'Superávit calculado conforme peso, altura, idade e atividade (TDEE + 15%)',
    meals: [
      { name: 'Café da manhã', items: ['4 ovos', 'Aveia com banana e mel', 'Pasta de amendoim'], kcal: 650 },
      { name: 'Lanche da manhã', items: ['Shake de proteína', 'Aveia', 'Fruta'], kcal: 350 },
      { name: 'Almoço', items: ['200g carne/frango', 'Arroz + feijão', 'Vegetais + azeite'], kcal: 780 },
      { name: 'Pré-treino', items: ['Banana', 'Pão integral com mel'], kcal: 250 },
      { name: 'Pós-treino', items: ['Whey protein', 'Fruta'], kcal: 250 },
      { name: 'Jantar', items: ['200g proteína', 'Batata doce', 'Salada'], kcal: 650 },
    ],
    tips: [
      'Distribua as calorias em 5-6 refeições para facilitar a ingestão total.',
      'Priorize sono e recuperação — é quando o músculo cresce.',
      'Aumente cargas progressivamente no treino (sobrecarga progressiva).',
    ],
  },
  {
    id: 'd-pro-manter',
    goal: 'manter_forma',
    title: 'Plano Semanal Completo — Manutenção',
    tier: 'pro',
    dailyKcalTarget: 'Calorias de manutenção (TDEE), foco em qualidade nutricional',
    meals: [
      { name: 'Café da manhã', items: ['Ovos', 'Fruta', 'Pão integral'], kcal: 420 },
      { name: 'Almoço', items: ['Proteína', 'Carboidrato integral', 'Vegetais variados'], kcal: 650 },
      { name: 'Lanche', items: ['Iogurte', 'Castanhas'], kcal: 200 },
      { name: 'Jantar', items: ['Proteína magra', 'Legumes', 'Salada'], kcal: 550 },
    ],
    tips: [
      'Mantenha variedade de cores no prato para garantir micronutrientes.',
      'Revise seu plano a cada 4-6 semanas com base na evolução.',
    ],
  },
];

export function getDietForGoal(goal: string, tier: 'free' | 'pro') {
  const resolvedGoal = goal === 'condicionamento_fisico' ? 'manter_forma' : goal;
  return DIETS.find((d) => d.goal === resolvedGoal && d.tier === tier);
}
