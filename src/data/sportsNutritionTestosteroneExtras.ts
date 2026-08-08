import { SportsNutritionProduct } from '../types';

export const TESTOSTERONE_DISPLAY_ORDER: string[] = [
  'impulsionadores-testosterona',
  'testosterona-adaptogenos',
  'fito-ashwagandha',
  'fito-feno-grego',
  'fito-longjack',
  'fito-mucuna',
  'testosterona-libido',
  'fito-maca-peruana',
  'fito-tribulus',
  'fito-marapuama-catuaba',
  'testosterona-micronutrientes',
  'micro-zinco-t',
  'micro-vitamina-d3-t',
  'micro-magnesio-t',
];

export const TESTOSTERONE_EXTRA_PRODUCTS: SportsNutritionProduct[] = [
  {
    id: 'testosterona-adaptogenos',
    name: 'Fitoterápicos adaptógenos e moduladores',
    categoryId: 'produtos-especiais',
    parentId: 'impulsionadores-testosterona',
    shortDescription:
      'Plantas com evidência clínica para estresse, eixo hormonal e testosterona livre.',
    description:
      'Esta seção reúne fitoterápicos frequentemente usados para modular o eixo hipotálamo-hipófise-gonadal indiretamente — muitas vezes via redução de cortisol, modulação de SHBG ou suporte à disponibilidade hormonal.\n\nNão são “testosterona em cápsula”. Funcionam melhor quando há estresse elevado, sono ruim ou deficiências nutricionais corrigidas.',
    benefits: [
      'Ashwagandha: redução de cortisol com evidência clínica.',
      'Feno-grego: pode modular SHBG e testosterona livre.',
      'Longjack e mucuna: suporte sob estresse físico e mental.',
    ],
    icon: 'leaf-outline',
    color: '#D97706',
  },
  {
    id: 'fito-ashwagandha',
    name: 'Ashwagandha (Withania somnifera)',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-adaptogenos',
    shortDescription:
      'Adaptógeno com evidência para redução de cortisol e suporte ao eixo hormonal.',
    description:
      'A Ashwagandha é uma das poucas plantas com evidência clínica sólida em humanos. Atua reduzindo drasticamente os níveis de cortisol — hormônio do estresse que, quando cronicamente elevado, inibe o eixo hormonal e reduz a síntese de testosterona.\n\nAo diminuir o estresse biológico, favorece indiretamente a produção androgênica em homens e mulheres. Estudos também mostram melhora de força, composição corporal e qualidade do sono em algumas populações.',
    benefits: [
      'Redução de cortisol com respaldo clínico.',
      'Suporte indireto à síntese de testosterona.',
      'Pode melhorar sono, humor e recuperação.',
      'Escolher extratos padronizados (ex.: withanolídeos).',
    ],
    whenToTake: 'Geralmente à noite ou conforme rótulo — 300–600 mg de extrato/dia em estudos.',
    usage: 'Cápsulas de extrato padronizado; evitar em gestação sem orientação médica.',
    icon: 'leaf-outline',
    color: '#D97706',
  },
  {
    id: 'fito-feno-grego',
    name: 'Feno-grego (Trigonella foenum-graecum)',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-adaptogenos',
    shortDescription:
      'Saponinas que podem modular SHBG e aumentar testosterona livre.',
    description:
      'O feno-grego contém saponinas esteroidais que ajudam a modular enzimas e reduzir a SHBG (globulina ligadora de hormônios sexuais). Com menos hormônio “preso” à proteína transportadora, mais testosterona fica na fração livre — biologicamente ativa.\n\nEstudos sugerem aumento da testosterona livre, força e vitalidade em homens com ingestão regular de extrato padronizado. Também é usado para controle glicêmico em algumas populações.',
    benefits: [
      'Pode reduzir SHBG e aumentar testosterona livre.',
      'Estudos em força e composição corporal.',
      'Auxilia saciedade e controle glicêmico em alguns perfis.',
      'Pode causar odor corporal característico em doses altas.',
    ],
    whenToTake: 'Com refeições, conforme rótulo do extrato.',
    usage: 'Cápsulas ou sementes; preferir extrato padronizado em saponinas.',
    icon: 'leaf-outline',
    color: '#D97706',
  },
  {
    id: 'fito-longjack',
    name: 'Longjack (Eurycoma longifolia / Tongkat Ali)',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-adaptogenos',
    shortDescription:
      'Planta tradicional para fadiga e disponibilidade de testosterona livre.',
    description:
      'O Longjack, também chamado Tongkat Ali, é tradicionalmente usado no Sudeste Asiático para combater fadiga e apoiar vitalidade masculina. Estudos modernos investigam seu potencial para reduzir cortisol, melhorar humor e favorecer a disponibilidade de testosterona livre — especialmente em homens sob estresse físico ou mental intenso.\n\nQualidade do extrato varia muito; buscar produtos padronizados em eurycomanona.',
    benefits: [
      'Pode reduzir fadiga e estresse.',
      'Estudos em testosterona livre sob estresse.',
      'Suporte a humor e disposição.',
      'Extrato padronizado é essencial.',
    ],
    whenToTake: 'Conforme rótulo — geralmente 1–2x ao dia.',
    usage: 'Cápsulas de extrato; evitar em doenças hepáticas sem orientação.',
    icon: 'leaf-outline',
    color: '#D97706',
  },
  {
    id: 'fito-mucuna',
    name: 'Mucuna pruriens',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-adaptogenos',
    shortDescription:
      'Fonte natural de L-DOPA — modula dopamina, prolactina e eixo hormonal.',
    description:
      'A Mucuna pruriens é uma leguminosa rica em L-DOPA, precursor da dopamina. Ao elevar dopamina, pode ajudar a modular prolactina e estimular sutilmente o LH (hormônio luteinizante), que regula a síntese hormonal.\n\nÉ usada em fórmulas “booster” de testosterona. Interage com medicamentos para Parkinson e antidepressivos — exige cautela médica.',
    benefits: [
      'L-DOPA natural — suporte à dopamina.',
      'Pode modular prolactina e LH.',
      'Interações medicamentosas relevantes.',
      'Usar extratos padronizados em L-DOPA.',
    ],
    whenToTake: 'Conforme rótulo; evitar à noite se causar agitação.',
    usage: 'Cápsulas; não combinar com levodopa sem orientação médica.',
    icon: 'leaf-outline',
    color: '#D97706',
  },
  {
    id: 'testosterona-libido',
    name: 'Libido (sem alterar hormônio)',
    categoryId: 'produtos-especiais',
    parentId: 'impulsionadores-testosterona',
    shortDescription:
      'Afrodisíacos naturais que melhoram desejo sem elevar testosterona sérica.',
    description:
      'É comum confundir aumento de libido com aumento de testosterona. As plantas desta seção são afrodisíacos eficazes em relatos e alguns estudos, mas revisões científicas mostram que muitas não alteram concentrações séricas de testosterona ou estrogênio em humanos saudáveis.\n\nAtuam mais por vascularização, sistema nervoso central ou bem-estar subjetivo.',
    benefits: [
      'Maca: libido e energia sem mudar hormônios séricos.',
      'Tribulus: vasodilatação — sem aumento de testosterona comprovado.',
      'Marapuama e catuaba: fluxo sanguíneo e SNC.',
    ],
    icon: 'heart-outline',
    color: '#D97706',
  },
  {
    id: 'fito-maca-peruana',
    name: 'Maca peruana (Lepidium meyenii)',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-libido',
    shortDescription:
      'Excelente para libido, energia e fertilidade — sem alterar testosterona sérica.',
    description:
      'A maca peruana é um tubérculo andino tradicionalmente usado para energia, humor e desejo sexual. Estudos em homens e mulheres mostram melhora subjetiva de libido e bem-estar, sem modificar concentrações séricas de testosterona ou estrogênio.\n\nÉ uma opção interessante para quem busca disposição e vida sexual sem mexer diretamente no eixo hormonal. Tipos disponíveis: amarela, vermelha e preta — com perfis ligeiramente diferentes.',
    benefits: [
      'Melhora libido e energia em estudos.',
      'Não altera testosterona ou estrogênio séricos.',
      'Pode apoiar fertilidade masculina em algumas populações.',
      'Boa tolerabilidade geral.',
    ],
    whenToTake: 'Diariamente, com ou sem refeições — 1,5–3 g/dia em estudos.',
    usage: 'Pó em smoothies ou cápsulas; gelatinizada facilita digestão.',
    icon: 'heart-outline',
    color: '#D97706',
  },
  {
    id: 'fito-tribulus',
    name: 'Tribulus terrestris',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-libido',
    shortDescription:
      'Melhora vasodilatação e comportamento sexual — sem aumentar testosterona.',
    description:
      'O Tribulus terrestris é popular em fórmulas “test booster”. Melhora vias de óxido nítrico e comportamento sexual em alguns estudos, mas revisões consolidadas mostram que não aumenta testosterona em humanos saudáveis.\n\nAinda pode ser útil para libido e sensação de pump no treino por efeito vascular — não por elevação hormonal direta.',
    benefits: [
      'Possível melhora de vasodilatação (NO).',
      'Efeito em libido em alguns estudos.',
      'Sem aumento comprovado de testosterona.',
      'Qualidade do extrato (saponinas) importa.',
    ],
    whenToTake: 'Conforme rótulo — geralmente antes do treino ou à noite.',
    usage: 'Cápsulas de extrato padronizado.',
    icon: 'heart-outline',
    color: '#D97706',
  },
  {
    id: 'fito-marapuama-catuaba',
    name: 'Marapuama e catuaba',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-libido',
    shortDescription:
      'Ervas amazônicas para fluxo sanguíneo, função erétil e sistema nervoso.',
    description:
      'Marapuama (Ptychopetalum olacoides) e catuaba (Trichilia catigua) são tradicionalmente usadas no Brasil como tonicos e afrodisíacos. Atuam mais na vascularização e no sistema nervoso central do que no eixo endócrino.\n\nEstudos científicos são limitados comparados a ashwagandha ou maca. Uso tradicional para disposição sexual e energia.',
    benefits: [
      'Suporte a fluxo sanguíneo e função erétil.',
      'Ação mais vascular/SNC que endócrina.',
      'Uso tradicional brasileiro.',
      'Evidência clínica ainda limitada.',
    ],
    whenToTake: 'Conforme rótulo da fórmula ou chá/tradicional.',
    usage: 'Cápsulas, extratos ou preparações tradicionais.',
    icon: 'heart-outline',
    color: '#D97706',
  },
  {
    id: 'testosterona-micronutrientes',
    name: 'Micronutrientes essenciais (a base)',
    categoryId: 'produtos-especiais',
    parentId: 'impulsionadores-testosterona',
    shortDescription:
      'Sem zinco, vitamina D e magnésio, o corpo não sintetiza hormônios adequadamente.',
    description:
      'Fitoterápicos não funcionam se o corpo carece dos “blocos de construção” para sintetizar hormônios. Deficiência de zinco, vitamina D ou magnésio pode limitar a produção fisiológica de testosterona — independentemente de boosters.\n\nCorrigir deficiências com exame e orientação profissional costuma ser mais eficaz que fórmulas complexas sem base nutricional.\n\n📌 Visão prática: sono profundo (pico de liberação hormonal), treino de força e percentual de gordura controlado continuam sendo os estimulantes endógenos mais potentes.',
    benefits: [
      'Zinco: enzimas de síntese de testosterona nas células de Leydig.',
      'Vitamina D3: atua como pró-hormônio — deficiência associa-se a baixa testosterona.',
      'Magnésio: pode aumentar fração livre ao reduzir ligação a proteínas.',
      'Priorize dieta, sono e treino antes de fórmulas.',
    ],
    icon: 'nutrition-outline',
    color: '#D97706',
  },
  {
    id: 'micro-zinco-t',
    name: 'Zinco',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-micronutrientes',
    shortDescription:
      'Mineral indispensável para enzimas que sintetizam testosterona.',
    description:
      'O zinco participa de centenas de reações enzimáticas, incluindo as envolvidas na síntese de testosterona nas células de Leydig. Deficiência — comum em atletas com alto suor e dieta restrita — pode comprometer o eixo hormonal.\n\nSuplementar sem deficiência comprovada tem benefício limitado. Doses altas crônicas podem reduzir cobre e imunidade.',
    benefits: [
      'Cofator em síntese de testosterona.',
      'Deficiência prejudica eixo hormonal.',
      'Atletas com sudorese intensa: maior perda.',
      'Exame orienta necessidade real de suplementação.',
    ],
    whenToTake: 'Com refeição para reduzir náusea; longe de cálcio em alta dose.',
    usage: 'Bisglicinato, picolinato ou citrato — 15–30 mg elementar/dia se deficiente.',
    icon: 'nutrition-outline',
    color: '#D97706',
  },
  {
    id: 'micro-vitamina-d3-t',
    name: 'Vitamina D3',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-micronutrientes',
    shortDescription:
      'Pró-hormônio — corrigir deficiência frequentemente normaliza testosterona baixa.',
    description:
      'A vitamina D funciona mais como pró-hormônio do que vitamina clássica. Receptores de vitamina D existem nas células de Leydig. Estudos associam deficiência de vitamina D a testosterona mais baixa; corrigir níveis séricos (25-OH-D) muitas vezes melhora o perfil hormonal em homens deficientes.\n\nExpor-se ao sol e manter níveis entre 30–60 ng/mL (com orientação médica) é estratégia base antes de boosters.',
    benefits: [
      'Deficiência ligada a testosterona mais baixa.',
      'Correção pode normalizar níveis em deficientes.',
      'Também importante para ossos e imunidade.',
      'Dosar 25-OH-D antes de megadoses.',
    ],
    whenToTake: 'Com refeição contendo gordura para absorção.',
    usage: 'Cápsulas em óleo; dose individualizada conforme exame.',
    icon: 'nutrition-outline',
    color: '#D97706',
  },
  {
    id: 'micro-magnesio-t',
    name: 'Magnésio',
    categoryId: 'produtos-especiais',
    parentId: 'testosterona-micronutrientes',
    shortDescription:
      'Pode aumentar testosterona livre ao reduzir ligação a proteínas transportadoras.',
    description:
      'O magnésio participa de mais de 300 reações enzimáticas, incluindo síntese proteica, sono e função muscular. Alguns estudos sugerem que níveis adequados de magnésio estão associados a maior fração de testosterona livre — possivelmente por reduzir a ligação a SHBG e albumina.\n\nAtletas com dieta processada, estresse e sudorese podem ter ingestão insuficiente. Formas como glicinato e treonato são bem toleradas.',
    benefits: [
      'Suporte a sono, recuperação e função muscular.',
      'Possível aumento da fração livre de testosterona.',
      'Deficiência comum em atletas.',
      'Glicinato/treonato: boa tolerância digestiva.',
    ],
    whenToTake: 'À noite pode auxiliar relaxamento e sono.',
    usage: '200–400 mg elementar/dia conforme dieta e exame.',
    icon: 'nutrition-outline',
    color: '#D97706',
  },
];
