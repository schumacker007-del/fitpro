import { SportsNutritionProduct } from '../types';

/** Ordem de exibição na categoria Peptídeos (hub → seções → itens). */
export const PEPTIDE_DISPLAY_ORDER: string[] = [
  'peptideos',
  'peptideos-colageno',
  'peptideos-regeneracao',
  'peptideo-bpc-157',
  'peptideo-tb-500',
  'secretagogos-gh',
  'peptideos-sono',
  'peptideo-dsip',
  'peptideo-epitalon',
  'peptideos-cognicao',
  'peptideo-selank',
  'peptideo-dihexa',
  'agonistas-glp1',
  'semaglutida',
  'tirzepatida',
  'liraglutida',
  'peptideo-aod-9604',
];

export const PEPTIDE_EXTRA_PRODUCTS: SportsNutritionProduct[] = [
  {
    id: 'peptideos-regeneracao',
    name: 'Regeneração tecidual e articular',
    categoryId: 'peptideos',
    parentId: 'peptideos',
    shortDescription:
      'Peptídeos estudados por reparo de tendões, ligamentos, músculos e mucosa intestinal.',
    description:
      'Esta seção reúne peptídeos frequentemente citados no contexto de recuperação de lesões e reparo tecidual — especialmente tendões, ligamentos e tecidos moles.\n\nO interesse no fitness vem de relatos de recuperação mais rápida após sobrecarga ou lesões. Porém, a evidência em humanos ainda é limitada, a regulação é restrita em vários países e a qualidade dos produtos vendidos online é altamente variável.\n\nConteúdo educativo: não substitui avaliação médica, fisioterapia ou diagnóstico de lesão.',
    benefits: [
      'Foco em reparo tecidual e modulação inflamatória.',
      'Interesse em tendões, ligamentos e integridade intestinal.',
      'Evidência humana ainda preliminar.',
      'Uso apenas com orientação médica.',
    ],
    icon: 'medkit-outline',
    color: '#06B6D4',
  },
  {
    id: 'peptideos-cognicao',
    name: 'Cognição, foco e ansiedade',
    categoryId: 'peptideos',
    parentId: 'peptideos',
    shortDescription:
      'Peptídeos nootrópicos e ansiolíticos estudados — foco, humor e neuroproteção.',
    description:
      'Alguns peptídeos são discutidos por efeitos em cognição, redução de ansiedade e neuroproteção. São temas de nicho, com base científica ainda em desenvolvimento e uso restrito fora de contexto clínico.\n\nNão substituem sono adequado, gestão de estresse, terapia ou tratamento psiquiátrico quando necessário.',
    benefits: [
      'Selank: interesse em foco e redução de ansiedade.',
      'Dihexa: estudado em neuroproteção e sinapses.',
      'Evidência clínica limitada.',
      'Somente com acompanhamento médico.',
    ],
    icon: 'bulb-outline',
    color: '#06B6D4',
  },
  {
    id: 'peptideo-selank',
    name: 'Selank',
    categoryId: 'peptideos',
    parentId: 'peptideos-cognicao',
    shortDescription:
      'Peptídeo nootrópico com perfil ansiolítico — estudado para foco e regulação imune.',
    description:
      'O Selank é um peptídeo sintético derivado da tuftsina, com estudos principalmente na Rússia sobre efeitos ansiolíticos (redução de ansiedade) e modulação cognitiva. É descrito como auxiliar no foco e na redução do estresse sem sedação pesada, com possível efeito complementar ao Semax em alguns protocolos de pesquisa.\n\nA evidência em humanos fora de contextos específicos ainda é limitada. Não é suplemento de venda livre no Brasil. Uso recreativo traz riscos de impureza, dosagem incorreta e interações com medicamentos psicotrópicos.',
    benefits: [
      'Estudado por efeitos ansiolíticos e cognitivos.',
      'Pode modular resposta imune em pesquisas.',
      'Não substitui tratamento para ansiedade ou TDAH.',
      'Uso apenas sob prescrição e supervisão médica.',
    ],
    whenToTake: 'Somente conforme protocolo médico.',
    usage: 'Formas estudadas incluem nasal ou injetável — contexto clínico.',
    icon: 'bulb-outline',
    color: '#06B6D4',
  },
  {
    id: 'peptideo-dihexa',
    name: 'Dihexa',
    categoryId: 'peptideos',
    parentId: 'peptideos-cognicao',
    shortDescription:
      'Composto estudado em neuroproteção — estimulação de novas conexões sinápticas.',
    description:
      'O Dihexa (PNB-0408) é um oligopeptídeo estudado em modelos de neurodegeneração por potencial estimulador de formação de sinapses e fatores de crescimento neuronal, como o HGF (fator de crescimento de hepatócitos).\n\nNo universo fitness e biohacking, aparece como “nootrópico avançado”. Porém, os estudos em humanos são escassos, a segurança a longo prazo é desconhecida e não há aprovação regulatória para uso amplo. Risco significativo em autoadministração.',
    benefits: [
      'Estudado em neuroproteção e plasticidade sináptica.',
      'Evidência humana muito preliminar.',
      'Não aprovado como suplemento ou medicamento de rotina.',
      'Exige avaliação médica especializada.',
    ],
    whenToTake: 'Somente em contexto de pesquisa ou prescrição médica.',
    usage: 'Não recomendado como autossuplementação.',
    icon: 'bulb-outline',
    color: '#06B6D4',
  },
  {
    id: 'peptideo-aod-9604',
    name: 'AOD-9604',
    categoryId: 'peptideos',
    parentId: 'agonistas-glp1',
    shortDescription:
      'Fragmento do hormônio do crescimento — estudado para lipólise sem impacto glicêmico.',
    description:
      'O AOD-9604 é um fragmento sintético da região C-terminal do hormônio do crescimento humano (hGH), desenvolvido com o objetivo de estimular a lipólise (quebra de gordura) sem os efeitos glicêmicos ou de crescimento associados ao hGH completo.\n\nFoi estudado em ensaios clínicos para obesidade, mas não obteve aprovação ampla como medicamento em diversas agências. No mercado paralelo, é vendido como “peptídeo emagrecedor” — com os mesmos riscos de qualidade, legalidade e falta de evidência robusta dos demais peptídeos bioativos.\n\nPara perda de gordura, déficit calórico, treino de força e proteína adequada continuam sendo a base — com ou sem medicação prescrita.',
    benefits: [
      'Estudado para lipólise sem elevar glicemia.',
      'Fragmento do hGH — mecanismo distinto do GH completo.',
      'Sem aprovação ampla como medicamento de rotina.',
      'Não substitui dieta, treino e orientação médica.',
    ],
    whenToTake: 'Somente se prescrito em contexto clínico experimental.',
    usage: 'Injetável em estudos — não disponível legalmente como suplemento.',
    icon: 'medical-outline',
    color: '#8B5CF6',
  },
];
