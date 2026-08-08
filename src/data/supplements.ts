import { Supplement, SupplementId, SupplementStack } from '../types';

export const SUPPLEMENTS: Supplement[] = [
  {
    id: 'coq10',
    name: 'Coenzima Q10 (CoQ10)',
    shortDescription: 'Energia celular e proteção cardíaca.',
    mainFunction: 'Energia celular e proteção cardíaca.',
    benefits:
      'Atua diretamente nas mitocôndrias (as "usinas de energia" das células) para produzir ATP. É um poderoso antioxidante que protege o coração, melhora o rendimento físico e combate a fadiga.',
    icon: 'flash-outline',
    color: '#F59E0B',
  },
  {
    id: 'nac',
    name: 'NAC (N-Acetilcisteína)',
    shortDescription: 'Desintoxicação e saúde respiratória.',
    mainFunction: 'Desintoxicação e saúde respiratória.',
    benefits:
      'É o precursor direto da glutationa, o antioxidante mais potente produzido pelo próprio corpo. Ajuda na proteção do fígado, neutraliza radicais livres e tem ação fluidificante (ajuda a eliminar muco/catarro).',
    icon: 'shield-checkmark-outline',
    color: '#10B981',
  },
  {
    id: 'omega3',
    name: 'Ômega 3 (EPA / DHA)',
    shortDescription: 'Anti-inflamatório e saúde cardiovascular/cerebral.',
    mainFunction: 'Ação anti-inflamatória e saúde cardiovascular/cerebral.',
    benefits:
      'O EPA reduz a inflamação sistêmica (ótimo para articulações e recuperação pós-treino) e protege o coração. O DHA é fundamental para a saúde do cérebro, foco, memória e visão.',
    icon: 'fish-outline',
    color: '#3B82F6',
  },
  {
    id: 'magnesium',
    name: 'Magnésio',
    shortDescription: 'Relaxamento muscular, sistema nervoso e energia.',
    mainFunction: 'Relaxamento muscular, sistema nervoso e energia.',
    benefits:
      'Participa de mais de 300 reações metabólicas. Ajuda a prevenir cãibras, melhora a qualidade do sono, reduz a ansiedade e é vital para a síntese de proteínas e fixação do cálcio nos ossos.',
    icon: 'moon-outline',
    color: '#8B5CF6',
  },
  {
    id: 'zinc',
    name: 'Zinco',
    shortDescription: 'Imunidade e suporte hormonal.',
    mainFunction: 'Imunidade e suporte hormonal.',
    benefits:
      'É essencial para a defesa do organismo contra vírus e bactérias. Também desempenha papel crucial no processo de cicatrização, na síntese de proteínas e na manutenção de níveis saudáveis de testosterona.',
    icon: 'medkit-outline',
    color: '#6366F1',
  },
  {
    id: 'vitamin_c',
    name: 'Vitamina C',
    shortDescription: 'Antioxidante e síntese de colágeno.',
    mainFunction: 'Antioxidante e síntese de colágeno.',
    benefits:
      'Fortalece o sistema imunológico, combate os danos celulares causados pelos radicais livres e é indispensável para que o corpo consiga sintetizar colágeno naturalmente.',
    icon: 'sunny-outline',
    color: '#F97316',
  },
  {
    id: 'vitamin_d3',
    name: 'Vitamina D3',
    shortDescription: 'Saúde óssea, força muscular e imunidade.',
    mainFunction: 'Saúde óssea, força muscular e imunidade.',
    benefits:
      'Funciona quase como um hormônio no corpo. Modula o sistema imunológico, melhora a absorção do cálcio e do fósforo e influencia diretamente a força muscular e a recuperação.',
    icon: 'sunny-outline',
    color: '#EAB308',
  },
  {
    id: 'collagen_type2',
    name: 'Colágeno Tipo 2 (Não Desnaturado)',
    shortDescription: 'Saúde das articulações e cartilagem.',
    mainFunction: 'Saúde das articulações e cartilagem.',
    benefits:
      'Atua especificamente na cartilagem das articulações (joelhos, ombros, quadris). Reduz o desgaste, combate a inflamação articular e ajuda a aliviar dores resultantes do impacto do treino ou do desgaste natural.',
    icon: 'body-outline',
    color: '#14B8A6',
  },
];

export const SUPPLEMENT_STACKS: SupplementStack[] = [
  {
    title: 'Articulações e estrutura',
    items: ['Colágeno Tipo 2', 'Ômega 3', 'Vitamina D3'],
    color: '#14B8A6',
  },
  {
    title: 'Recuperação e energia',
    items: ['CoQ10', 'Magnésio', 'NAC'],
    color: '#F59E0B',
  },
  {
    title: 'Imunidade e proteção antioxidante',
    items: ['Vitamina C', 'Zinco', 'NAC'],
    color: '#10B981',
  },
];

export function getSupplement(id: SupplementId): Supplement {
  const found = SUPPLEMENTS.find((s) => s.id === id);
  if (!found) throw new Error(`Suplemento desconhecido: ${id}`);
  return found;
}
