import { SportsNutritionCategory, SportsNutritionProduct, SportsNutritionProductId } from '../types';
import { PEPTIDE_DISPLAY_ORDER, PEPTIDE_EXTRA_PRODUCTS } from './sportsNutritionPeptideExtras';
import { TESTOSTERONE_DISPLAY_ORDER, TESTOSTERONE_EXTRA_PRODUCTS } from './sportsNutritionTestosteroneExtras';

function sortProductsByDisplayOrder(
  products: SportsNutritionProduct[],
  order: string[],
): SportsNutritionProduct[] {
  const indexMap = new Map(order.map((id, index) => [id, index]));
  return [...products].sort((a, b) => {
    const aIndex = indexMap.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = indexMap.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    if (aIndex !== bIndex) return aIndex - bIndex;
    return a.name.localeCompare(b.name, 'pt-BR');
  });
}

export const SPORTS_NUTRITION_INTRO =
  'Produtos voltados para performance, recuperação e suporte ao treino de força. Cada item com benefícios explicados de forma clara para você escolher com consciência.';

const TOP_LEVEL_CATEGORY_ORDER: SportsNutritionCategory['id'][] = [
  'proteinas',
  'performance',
  'aminoacidos',
  'peptideos',
  'hipercaloricos',
  'energia',
  'recuperacao',
  'vitaminas',
  'perda-peso',
  'produtos-especiais',
  'outros',
];

export const SPORTS_NUTRITION_CATEGORIES: SportsNutritionCategory[] = [
  {
    id: 'proteinas',
    title: 'Proteínas',
    subtitle: 'Síntese muscular e recuperação',
    icon: 'barbell-outline',
    color: '#EF4444',
    image: require('../../assets/sports-nutrition/whey-protein.png'),
  },
  {
    id: 'hipercaloricos',
    title: 'Hipercalóricos',
    subtitle: 'Ganho de massa e superávit calórico',
    icon: 'trending-up-outline',
    color: '#84CC16',
    image: require('../../assets/sports-nutrition/mass-gainer.png'),
  },
  {
    id: 'performance',
    title: 'Performance',
    subtitle: 'Força, volume e rendimento',
    icon: 'flash-outline',
    color: '#F59E0B',
    image: require('../../assets/sports-nutrition/creatina.png'),
  },
  {
    id: 'perda-peso',
    title: 'Perda de peso',
    subtitle: 'Suporte à definição e controle de peso',
    icon: 'trending-down-outline',
    color: '#EC4899',
    image: require('../../assets/sports-nutrition/perda-de-peso.png'),
  },
  {
    id: 'aminoacidos',
    title: 'Aminoácidos',
    subtitle: 'BCAAs, EAAs e suporte à recuperação',
    icon: 'fitness-outline',
    color: '#A3E635',
    image: require('../../assets/sports-nutrition/aminoacidos.png'),
  },
  {
    id: 'recuperacao',
    title: 'Recuperação',
    subtitle: 'Pós-treino e reparo muscular',
    icon: 'refresh-outline',
    color: '#10B981',
    image: require('../../assets/sports-nutrition/articulacoes-ligamentos.png'),
  },
  {
    id: 'energia',
    title: 'Energia',
    subtitle: 'Pré-treino e foco',
    icon: 'battery-charging-outline',
    color: '#3B82F6',
    image: require('../../assets/sports-nutrition/l-carnitina.png'),
  },
  {
    id: 'vitaminas',
    title: 'Vitaminas e minerais',
    subtitle: 'Suporte metabólico ao atleta',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/vitaminas-minerais.png'),
  },
  {
    id: 'peptideos',
    title: 'Peptídeos',
    subtitle: 'Como funcionam e para que servem',
    icon: 'git-network-outline',
    color: '#06B6D4',
    image: require('../../assets/sports-nutrition/aminoacidos.png'),
  },
  {
    id: 'produtos-especiais',
    title: 'Produtos especiais',
    subtitle: 'Fórmulas e complementos diferenciados',
    icon: 'star-outline',
    color: '#D97706',
    image: require('../../assets/sports-nutrition/produtos-especiais.png'),
  },
  {
    id: 'outros',
    title: 'Outros',
    subtitle: 'Complementos esportivos',
    icon: 'cube-outline',
    color: '#64748B',
  },
];

/**
 * Cadastre aqui os produtos de nutrição esportiva.
 * Formato sugerido por produto:
 * - name, categoryId, shortDescription, benefits[], usage?, whenToTake?, icon, color
 */
export const SPORTS_NUTRITION_PRODUCTS: SportsNutritionProduct[] = [
  {
    id: 'whey-protein',
    name: 'Whey Protein',
    categoryId: 'proteinas',
    shortDescription:
      'Mistura concentrada de proteínas do soro de leite — referência para crescimento muscular e definição corporal.',
    description:
      'Whey protein (proteína) é uma mistura concentrada de proteínas globulares obtidas a partir de soro de leite. O whey deve ser entendido como uma composição líquida formada durante a coagulação do leite — um subproduto da fabricação de queijos. Atualmente é considerada uma das melhores proteínas, tanto para o crescimento muscular quanto para a queima de gordura.',
    benefits: [
      'Proteína de rápida absorção com alto valor para hipertrofia.',
      'Excelente perfil de aminoácidos essenciais e BCAAs.',
      'Subproduto do soro de leite com ampla evidência no esporte.',
      'Linha completa: isolado, complexo, caseína, carne, ovo, soja e mais.',
    ],
    whenToTake: 'Geralmente após o treino ou entre refeições — cada variação pode ter indicação específica.',
    usage: 'Consulte a variação desejada nesta linha para modo de uso e dosagem.',
    icon: 'nutrition-outline',
    color: '#EF4444',
    image: require('../../assets/sports-nutrition/whey-protein-hub.png'),
  },
  {
    id: 'whey-protein-isolado',
    name: 'Whey Protein Isolado',
    categoryId: 'proteinas',
    parentId: 'whey-protein',
    shortDescription:
      'A fonte de proteína mais qualitativa possível — cerca de 90% de whey, com mínimo de lactose.',
    description:
      'O whey protein isolado é uma proteína isolada de soro de leite e representa a fonte proteica mais qualitativa possível. É obtido a partir de produtos de soro de leite: um pó formado quando o soro é seco, composto por cerca de 90% de proteína de whey. Embora a proteína possa vir de laticínios, peixe, carne, frutos do mar, ovos, soja e feijão, o isolado se destaca pelo número de aminoácidos e pelo equilíbrio — especialmente para atletas. Todos os atletas sabem que o isolado fornece ao corpo o material de construção para os músculos. Ao contrário do whey convencional, praticamente não contém lactose, sendo indispensável para quem tem intolerância. Permite ganho de massa muscular de qualidade e manutenção muscular na preparação para competições ou na secagem. Pode ser usado em dietas hipocalóricas para fornecer proteína de qualidade sem excesso de gordura, com saciedade duradoura e teor calórico relativamente baixo — útil também para cabelos, unhas e saúde em processos de emagrecimento.',
    benefits: [
      'Composição com cerca de 90% de proteína de soro de leite (whey).',
      'Melhor equilíbrio de aminoácidos entre as fontes proteicas para atletas.',
      'Fornece material de construção para os músculos.',
      'Praticamente sem lactose — ideal para intolerância à lactose.',
      'Ganho de massa muscular de qualidade e manutenção na secagem ou pré-competição.',
      'Proteína de qualidade em dieta hipocalórica, sem excesso de gordura.',
      'Saciedade duradoura com baixo teor calórico.',
      'Suporte a cabelos, unhas e saúde em dietas rigorosas.',
    ],
    whenToTake: 'Após o treino, entre refeições ou conforme orientação do nutricionista para atingir a meta diária de proteína.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em 200–300 ml de água ou leite. Ajuste a quantidade com acompanhamento profissional.',
    icon: 'nutrition-outline',
    color: '#EF4444',
    image: require('../../assets/sports-nutrition/whey-protein-isolado.png'),
  },
  {
    id: 'complexo-proteico',
    name: 'Complexo Proteico',
    categoryId: 'proteinas',
    parentId: 'whey-protein',
    shortDescription: 'Blend de proteínas para liberação prolongada e suporte muscular ao longo do dia.',
    benefits: [
      'Combina fontes proteicas com ritmos de absorção diferentes.',
      'Ajuda a manter o aporte de aminoácidos por mais tempo.',
      'Indicado para complementar a meta diária de proteína do atleta.',
      'Pode ser usado entre refeições ou em horários estratégicos do dia.',
    ],
    whenToTake: 'Entre refeições, antes de dormir ou conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo) em 200–300 ml de água ou leite.',
    icon: 'nutrition-outline',
    color: '#EF4444',
    image: require('../../assets/sports-nutrition/complexo-proteico.png'),
  },
  {
    id: 'matriz-proteica',
    name: 'Matriz Proteica',
    categoryId: 'proteinas',
    parentId: 'whey-protein',
    shortDescription:
      'Proteína matrix com ação vasodilatadora — suporte ao fluxo sanguíneo, desempenho e recuperação muscular.',
    description:
      'A proteína Matrix atua como um vasodilatador muscular contínuo, favorecendo o fluxo sanguíneo nos músculos em exercício e melhorando o desempenho, independentemente do tipo de atividade esportiva. Também melhora a oferta de oxigênio e o consumo de oxigênio pelo tecido muscular, contribuindo para a função do sistema cardiovascular. Fórmulas especiais do aditivo ajudam a manter o relaxamento da parede vascular, permitindo que mais nutrientes entrem nos músculos e penetrem com mais facilidade nas células musculares. Reduz a fadiga durante o treino e torna a recuperação mais rápida e eficaz.',
    benefits: [
      'Suporta altos níveis de óxido nítrico.',
      'Cria um longo bombeamento muscular.',
      'Aumenta a força muscular, a energia e a resistência durante o exercício.',
      'Proporciona ganho de massa muscular seca.',
      'Melhora a aptidão física geral.',
      'Promove recuperação mais rápida e desempenho aprimorado.',
      'Aumenta o volume das células musculares.',
      'Melhora a função erétil.',
      'Fortalece a saúde.',
    ],
    whenToTake: 'Conforme orientação do nutricionista — geralmente antes ou após o treino, dependendo do objetivo.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em 200–300 ml de água ou leite.',
    icon: 'nutrition-outline',
    color: '#EF4444',
    image: require('../../assets/sports-nutrition/matriz-proteica.png'),
  },
  {
    id: 'proteina-da-carne',
    name: 'Proteína da Carne',
    categoryId: 'proteinas',
    parentId: 'whey-protein',
    shortDescription:
      'Proteína de carne bovina ultra-concentrada — alta biodisponibilidade, com creatina natural e sem lactose.',
    description:
      'A proteína da carne é um suplemento esportivo à base de proteína bovina obtida pelo método de ultra-concentração, com remoção da maior parte da gordura e do colesterol. Em termos de biodisponibilidade, composição de aminoácidos e taxa de assimilação, é uma das melhores fontes para atletas — comparável ao whey protein isolado. Ainda é enriquecida com creatina natural, presente na carne, e não contém lactose nem glúten.',
    benefits: [
      'Ultra-concentração com redução de gordura e colesterol.',
      'Alta biodisponibilidade e excelente perfil de aminoácidos.',
      'Taxa de assimilação comparável ao whey protein isolado.',
      'Contém creatina natural da carne bovina.',
      'Não contém lactose — indicada para intolerantes.',
      'Não contém glúten.',
      'Fonte proteica de qualidade para ganho e manutenção muscular.',
    ],
    whenToTake: 'Após o treino ou entre refeições, conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em 200–300 ml de água ou leite vegetal.',
    icon: 'nutrition-outline',
    color: '#EF4444',
    image: require('../../assets/sports-nutrition/proteina-da-carne.png'),
  },
  {
    id: 'proteina-caseina',
    name: 'Proteína de Caseína',
    categoryId: 'proteinas',
    parentId: 'whey-protein',
    shortDescription:
      'Proteína de digestão lenta — liberação prolongada de aminoácidos, ideal para períodos longos sem refeição.',
    description:
      'O caseinato de cálcio, ou caseína, é uma proteína complexa resultante da fermentação do leite e um dos tipos mais utilizados por praticantes de musculação. Ao ser ingerida, forma um coágulo no estômago que é digerido lentamente, fornecendo aminoácidos ao corpo por um período prolongado. Em comparação com o whey, a caseína se decompõe mais devagar, retarda a digestão de outras proteínas, possui menor valor biológico, suprime o apetite e apresenta efeito anabólico menos pronunciado. A caseína micelar tem ganhado popularidade por melhor assimilação, solubilidade e qualidades de sabor.',
    benefits: [
      'Liberação lenta e prolongada de aminoácidos.',
      'Forma coágulo no estômago com digestão estendida.',
      'Indicada para períodos longos sem ingestão de proteína.',
      'Ajuda a suprimir o apetite.',
      'Caseína micelar com melhor assimilação e sabor.',
      'Boa solubilidade nas versões micelares atuais.',
      'Complemento estratégico à proteína de rápida absorção (whey).',
    ],
    whenToTake: 'Ideal antes de dormir ou em longos intervalos entre refeições, conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em 200–300 ml de água ou leite.',
    icon: 'nutrition-outline',
    color: '#EF4444',
    image: require('../../assets/sports-nutrition/proteina-caseina.png'),
  },
  {
    id: 'proteina-de-ovo',
    name: 'Proteína de Ovo',
    categoryId: 'proteinas',
    parentId: 'whey-protein',
    shortDescription:
      'Proteína da clara do ovo — alta pureza, sem gordura e excelente perfil de aminoácidos essenciais.',
    description:
      'A proteína do ovo é obtida a partir da clara do ovo. Não contém gordura, possui grande concentração proteica e é considerada uma fonte ideal pela composição completa de aminoácidos essenciais, aminoácidos de cadeia ramificada (BCAAs) e ácido glutâmico. Uma vez ingerida, é totalmente absorvida pelo organismo. Em análises de qualidade e eficácia, a proteína do ovo figura entre as melhores e serve como referência padrão para comparações.',
    benefits: [
      'Obtida da clara do ovo — sem gordura.',
      'Alto teor proteico com excelente perfil aminoácido.',
      'Rica em aminoácidos essenciais e BCAAs.',
      'Contém ácido glutâmico em quantidade relevante.',
      'Absorção completa pelo organismo.',
      'Considerada padrão de referência em qualidade proteica.',
      'Alternativa para quem busca proteína sem lactose.',
    ],
    whenToTake: 'Após o treino ou entre refeições, conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em 200–300 ml de água ou leite.',
    icon: 'nutrition-outline',
    color: '#EF4444',
    image: require('../../assets/sports-nutrition/proteina-de-ovo.png'),
  },
  {
    id: 'proteina-de-soja',
    name: 'Proteína de Soja',
    categoryId: 'proteinas',
    parentId: 'whey-protein',
    shortDescription:
      'Proteína vegetal de alto valor — espectro completo de aminoácidos, baixa em gordura e carboidratos.',
    description:
      'A proteína de soja é uma das fontes de aminoácidos mais respeitadas pelos atletas. Contém percentual elevado (cerca de 35%) de glutamina, lisina e aminoácidos de cadeia ramificada em relação a algumas proteínas animais, além de ser rica em arginina, que favorece o fortalecimento da função imunológica. Historicamente, a metionina era limitante na soja, mas a maioria dos produtores atuais enriquece a fórmula com metionina — tornando o valor biológico comparável ao leite e à proteína do ovo. Com praticamente nenhuma gordura ou carboidrato, tornou-se popular entre vegetarianos e atletas em fase de secagem. Muitas mulheres também preferem a soja como suporte proteico em períodos de cargas aeróbicas.',
    benefits: [
      'Espectro completo de aminoácidos, comparável à clara de ovo.',
      'Alto teor de glutamina, lisina e BCAAs.',
      'Rica em arginina para suporte imunológico.',
      'Fórmulas enriquecidas com metionina — valor biológico elevado.',
      'Origem vegetal — opção para vegetarianos.',
      'Baixo teor de gordura e carboidratos.',
      'Indicada para secagem e treinos aeróbicos.',
      'Fornece proteína necessária ao suporte muscular.',
    ],
    whenToTake: 'Após o treino, entre refeições ou conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em 200–300 ml de água ou leite vegetal.',
    icon: 'nutrition-outline',
    color: '#EF4444',
    image: require('../../assets/sports-nutrition/proteina-de-soja.png'),
  },
  {
    id: 'mass-gainer',
    name: 'Mass Gainer (Hipercalórico)',
    categoryId: 'hipercaloricos',
    shortDescription:
      'Mistura de proteínas e carboidratos para ganho de peso e reposição rápida de energia.',
    description:
      'O gainer (hipercalórico) é uma classe de nutrição esportiva, que é uma mistura de proteínas e carboidratos. Às vezes, os fabricantes adicionam creatina, vitaminas, microelementos, aminoácidos e outros ingredientes. Além disso, o gainer geralmente contém uma pequena quantidade de gordura. A principal função do gainer é o ganho de peso e a reposição rápida de energia.\n\nO gainer consiste em carboidratos lentos e rápidos (cerca de 50–70% da composição total), proteína (geralmente na forma de caseinato de cálcio, leite e proteína de soro de leite [whey protein]) e outros nutrientes, como vitaminas e minerais. A diferença entre os gainers e os produtos convencionais é que o suplemento contém carboidratos de diferentes níveis de complexidade e um certo índice glicêmico, que geralmente é ideal para as necessidades do organismo em treinamento. O gainer reabastece as reservas de energia e ajuda a saturar rapidamente a reserva de glicogênio nos músculos.',
    benefits: [
      'Mistura de proteínas e carboidratos — cerca de 50–70% carboidratos na composição.',
      'Pode incluir creatina, vitaminas, minerais, aminoácidos e pequena quantidade de gordura.',
      'Proteína geralmente de caseinato de cálcio, leite e whey protein.',
      'Carboidratos de diferentes complexidades com índice glicêmico adequado ao treino.',
      'Reposição rápida de energia e saturação do glicogênio muscular.',
      'Principal função: ganho de peso e suporte calórico em fases de volume.',
    ],
    whenToTake: 'Geralmente após o treino ou entre refeições — conforme orientação do nutricionista.',
    usage: 'Consulte a variação desejada nesta linha para modo de uso e dosagem.',
    icon: 'nutrition-outline',
    color: '#84CC16',
    image: require('../../assets/sports-nutrition/mass-gainer.png'),
  },
  {
    id: 'creatina',
    name: 'Creatina',
    categoryId: 'performance',
    shortDescription:
      'Suplemento para força, potência e desempenho em treinos de alta intensidade.',
    description:
      'A creatina é um dos suplementos mais estudados na nutrição esportiva. Conteúdo completo será adicionado em breve.',
    benefits: [
      'Suporte à força e potência muscular.',
      'Ampla evidência científica no esporte.',
      'Linha de produtos com variações de composição e forma.',
    ],
    whenToTake: 'Conforme orientação do nutricionista e da variação escolhida.',
    usage: 'Consulte a variação desejada nesta linha para modo de uso e dosagem.',
    icon: 'flash-outline',
    color: '#22C55E',
    image: require('../../assets/sports-nutrition/creatina.png'),
  },
  {
    id: 'creatina-monohidratada',
    name: 'Creatina Monohidratada',
    categoryId: 'performance',
    parentId: 'creatina',
    shortDescription:
      'Forma mais eficaz e popular de creatina — para massa muscular, força e resistência.',
    description:
      'A creatina monohidratada é a forma mais eficaz e popular de creatina usada pelos atletas para aumentar a massa muscular, a força e a resistência.\n\nQuimicamente, essa forma é uma molécula de creatina e água.\n\nA creatina monohidratada é produzida como um suplemento esportivo na forma de pó, pílulas e cápsulas, geralmente faz parte de complexos pré-treino e outros suplementos atléticos complexos projetados para aumentar a força e aumentar a massa muscular.',
    benefits: [
      'Forma mais eficaz e popular de creatina entre atletas.',
      'Suporte ao aumento de massa muscular, força e resistência.',
      'Composição química: uma molécula de creatina ligada à água.',
      'Disponível em pó, pílulas e cápsulas.',
      'Presente em complexos pré-treino e fórmulas atléticas combinadas.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em água ou bebida de sua preferência.',
    icon: 'flash-outline',
    color: '#22C55E',
    image: require('../../assets/sports-nutrition/creatina-monohidratada.png'),
  },
  {
    id: 'creatina-transporte',
    name: 'Sistema de Transporte de Creatina',
    categoryId: 'performance',
    parentId: 'creatina',
    shortDescription:
      'Creatina combinada com substâncias que melhoram a absorção e aceleram o transporte aos músculos.',
    description:
      'O sistema de transporte de creatina é um tipo de nutrição esportiva que combina creatina e substâncias que melhoram a absorção de creatina e aceleram seu transporte para os músculos.\n\nAlém da função de transporte, os sistemas de transporte podem ter efeitos individuais (efeito anabólico, melhora da nutrição muscular etc.). A maioria dos sistemas de transporte de creatina (suplementos esportivos) faz parte do grupo de complexos pré-treino.\n\nMais frequentemente, vale a pena usar os aditivos do sistema de transporte de creatina apenas em dias de treino. Os suplementos do sistema de transporte de creatina praticamente não apresentam desvantagens, exceto pelo custo mais alto. Mas, mais importante, eles são seguramente eficazes. No momento, não há uma escolha melhor de suplemento de creatina no mercado de nutrição esportiva do que o sistema de transporte de creatina.',
    benefits: [
      'Combina creatina com substâncias que melhoram absorção e transporte muscular.',
      'Pode oferecer efeitos adicionais: anabólico e melhora da nutrição muscular.',
      'Geralmente integrado a complexos pré-treino.',
      'Uso mais indicado em dias de treino.',
      'Alta eficácia com poucas desvantagens — principalmente custo mais elevado.',
      'Considerada uma das melhores opções de creatina no mercado esportivo.',
    ],
    whenToTake: 'Mais frequentemente em dias de treino — conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em água ou bebida de sua preferência, preferencialmente antes do treino.',
    icon: 'flash-outline',
    color: '#22C55E',
    image: require('../../assets/sports-nutrition/creatina-transporte.png'),
  },
  {
    id: 'l-carnitina',
    name: 'L-Carnitina',
    categoryId: 'energia',
    shortDescription:
      'Substância natural envolvida no processamento de gorduras em energia.',
    description:
      'A L-carnitina é uma substância produzida no corpo humano (no fígado) e também é encontrada em alguns produtos alimentícios: carne, aves, peixe, leite e produtos lácteos. Trata-se de um componente natural para nossos corpos.\n\nA L-carnitina está envolvida no processo de processamento de gorduras em energia. Em outras palavras, a L-carnitina é um componente necessário para o consumo de gorduras (processando-as em energia).',
    benefits: [
      'Fornece o processamento de gorduras e a obtenção de energia a partir delas.',
      'Ajuda a reduzir o excesso de gordura.',
      'Aumenta a resistência e reduz a fadiga.',
      'Acelera a recuperação do corpo e dos músculos após exercícios físicos.',
      'Melhora o metabolismo.',
      'Produzida no fígado e presente em carnes, aves, peixe e laticínios.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em cápsulas ou líquido antes do treino.',
    icon: 'battery-charging-outline',
    color: '#3B82F6',
    image: require('../../assets/sports-nutrition/l-carnitina.png'),
  },
  {
    id: 'aminoacidos',
    name: 'Aminoácidos',
    categoryId: 'aminoacidos',
    shortDescription:
      'Blocos construtores das proteínas — essenciais para recuperação, síntese muscular e desempenho.',
    description:
      'Os aminoácidos são a base das proteínas e desempenham papel central na nutrição esportiva. Conteúdo completo será adicionado em breve.',
    benefits: [
      'Fundamento da síntese proteica e recuperação muscular.',
      'Linha com BCAAs, EAAs e outras variações.',
      'Uso conforme objetivo de treino e orientação profissional.',
    ],
    whenToTake: 'Conforme orientação do nutricionista e da variação escolhida.',
    usage: 'Consulte a variação desejada nesta linha para modo de uso e dosagem.',
    icon: 'fitness-outline',
    color: '#A3E635',
    image: require('../../assets/sports-nutrition/aminoacidos.png'),
  },
  {
    id: 'bcaa',
    name: 'Aminoácidos BCAA',
    categoryId: 'aminoacidos',
    parentId: 'aminoacidos',
    shortDescription:
      'Complexo de três aminoácidos essenciais — leucina, isoleucina e valina.',
    description:
      'O BCAA é um complexo composto por três aminoácidos.\n\nEles são um componente importante da proteína. A diferença entre o BCAA e outros aminoácidos é que o corpo não os sintetiza. Três aminoácidos são combinados em um complexo porque sua ação ocorre simultaneamente e eles se complementam.\n\nOs aminoácidos BCAA liberam energia nas fibras musculares, resultando no aumento do crescimento. Além disso, o efeito dos aminoácidos continua ao longo do tempo de sua administração.\n\nAo praticar exercícios físicos, você reduz o nível de aminoácidos nos músculos; dessa forma, sua ingestão também é pensada para restaurar o nível de BCAA.\n\nÉ necessário tomar um complexo completo de aminoácidos para a rápida recuperação do tecido muscular após um treino de força pesado.\n\nOs níveis hormonais aumentam no corpo logo após o treino, o que contribui não apenas para a recuperação dos músculos, mas também para o seu crescimento.',
    benefits: [
      'Complexo de três aminoácidos essenciais que o corpo não sintetiza.',
      'Ação simultânea e complementar entre leucina, isoleucina e valina.',
      'Libera energia nas fibras musculares e favorece o crescimento.',
      'Efeito prolongado ao longo do tempo de administração.',
      'Restaura os níveis de BCAA reduzidos durante o exercício.',
      'Recuperação rápida do tecido muscular após treino de força pesado.',
      'Contribui para recuperação e crescimento muscular via resposta hormonal pós-treino.',
    ],
    whenToTake: 'Após treinos de força ou conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em água ou bebida de sua preferência.',
    icon: 'fitness-outline',
    color: '#A3E635',
    image: require('../../assets/sports-nutrition/bcaa.png'),
  },
  {
    id: 'arginina',
    name: 'Arginina',
    categoryId: 'aminoacidos',
    parentId: 'aminoacidos',
    shortDescription:
      'L-arginina — substância natural relacionada às vitaminas do grupo B, muito usada na musculação.',
    description:
      'A arginina (ou L-arginina) é uma substância natural que, em suas propriedades, está relacionada às vitaminas do grupo B. O corpo pode reproduzi-lo por conta própria, assim a L-arginina também é chamada de substância vitamínica.\n\nA L-arginina é um dos aditivos mais utilizados na musculação, que é produzido tanto como uma substância livremente disponível como na composição de complexos de aminoácidos. A arginina estimula os músculos após o treino, desencadeia processos regenerativos, participa da divisão das células musculares, remove toxinas do corpo, melhora a passagem de oxigênio para o tecido muscular, bem como o transporte de creatina para os músculos.',
    benefits: [
      'Substância natural relacionada às vitaminas do grupo B.',
      'O corpo pode produzi-la — também chamada de substância vitamínica.',
      'Um dos aditivos mais utilizados na musculação.',
      'Disponível isolada ou em complexos de aminoácidos.',
      'Estimula os músculos após o treino e processos regenerativos.',
      'Participa da divisão das células musculares e remoção de toxinas.',
      'Melhora a passagem de oxigênio ao tecido muscular.',
      'Facilita o transporte de creatina para os músculos.',
    ],
    whenToTake: 'Após o treino ou conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em cápsulas ou pó, isolado ou em complexo de aminoácidos.',
    icon: 'fitness-outline',
    color: '#A3E635',
    image: require('../../assets/sports-nutrition/arginina.png'),
  },
  {
    id: 'citrulina',
    name: 'Citrulina',
    categoryId: 'aminoacidos',
    parentId: 'aminoacidos',
    shortDescription:
      'Aminoácido com múltiplos efeitos fisiológicos — circulação, metabolismo e recuperação muscular.',
    description:
      'A citrulina é um aminoácido que não faz parte das proteínas de construção, mas tem um grande número de efeitos fisiológicos; a citrulina está envolvida no metabolismo da ureia, ela é um metabólito intermediário na utilização de uma substância tóxica — a amônia, que danifica as células do fígado.\n\nA citrulina desempenha várias funções fisiológicas no organismo e é encontrada no fígado, na pele humana, membranas nervosas e cabelos.',
    benefits: [
      'Melhora a circulação periférica nos tecidos do corpo.',
      'Promove a normalização do metabolismo.',
      'Ativa fatores de proteção não específicos do corpo.',
      'Produz arginina naturalmente — ajuda a bombear músculos com nutrientes, sangue, oxigênio e hormônios.',
      'Estimula o sistema imunológico.',
      'Remove ácido lático e amônia; restaura reservas de ATP e fosfocreatina após o exercício.',
      'Mantém o equilíbrio de nitrogênio e favorece o crescimento muscular.',
      'Envolvida no metabolismo da ureia e na neutralização da amônia.',
    ],
    whenToTake: 'Antes ou após o treino — conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em pó ou cápsulas.',
    icon: 'fitness-outline',
    color: '#A3E635',
    image: require('../../assets/sports-nutrition/citrulina.png'),
  },
  {
    id: 'glutamina',
    name: 'Glutamina',
    categoryId: 'aminoacidos',
    parentId: 'aminoacidos',
    shortDescription:
      'Aminoácido dispensável abundante nos músculos — crescimento celular e suporte imunológico.',
    description:
      'A glutamina é um aminoácido dispensável, presente em abundância nas células musculares e no sangue. É produzido nas células musculares a partir de outros aminoácidos (ácido glutâmico, valina e isoleucina).\n\nA glutamina é necessária para o crescimento celular e também serve como combustível para o sistema imunológico. Durante um período de exercícios intensos ou estresse, o nível de glutamina no sangue diminui, o que enfraquece o sistema imunológico e aumenta o risco de infecção. O nível de glutamina também cai nos músculos, o que leva à perda de tecido muscular, apesar do treinamento contínuo.\n\nA glutamina é o aminoácido mais abundante no organismo, compondo 60% dos músculos, o que explica sua ampla aplicação na musculação e nutrição esportiva.',
    benefits: [
      'Aminoácido dispensável abundante nas células musculares e no sangue.',
      'Produzido a partir de ácido glutâmico, valina e isoleucina.',
      'Necessária para o crescimento celular.',
      'Combustível para o sistema imunológico.',
      'Níveis caem com exercício intenso ou estresse — risco de infecção.',
      'Queda muscular nos músculos mesmo com treinamento contínuo.',
      'Composição de cerca de 60% dos aminoácidos musculares.',
      'Ampla aplicação na musculação e nutrição esportiva.',
    ],
    whenToTake: 'Pós-treino ou em períodos de estresse — conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em pó ou cápsulas.',
    icon: 'fitness-outline',
    color: '#A3E635',
    image: require('../../assets/sports-nutrition/glutamina.png'),
  },
  {
    id: 'aakg',
    name: 'Arginina Alfa Cetoglutarato',
    categoryId: 'aminoacidos',
    parentId: 'aminoacidos',
    shortDescription:
      'AAKG — sal de arginina e ácido alfa-cetoglutárico, popular para pump na musculação.',
    description:
      'A arginina alfa cetoglutarato (AAKG) é um sal do aminoácido arginina e do ácido alfa-cetoglutárico. Ela adquiriu popularidade como um suplemento para o bombeamento na musculação. O mecanismo de ação proposto é a síntese de óxido nítrico a partir dos produtos intermediários da decomposição da arginina.\n\nA principal função da arginina é a de doador de óxido nítrico, ela tem um efeito vasodilatador, melhora o fluxo sanguíneo e a entrega de nutrientes e, consequentemente, aumenta a resistência e promove o bombeamento. O princípio de ação é que a arginina fornece ao sistema enzimático as substâncias necessárias que, por sua vez, começam a produzir óxido de nitrogênio (NO). O principal objetivo do NO é a regulação da pressão arterial; se o corpo não tiver óxido de nitrogênio, a pressão pode aumentar.\n\nO segundo benefício importante do alfa-cetoglutarato de arginina é que ele promove a produção do hormônio do crescimento. Muitas pessoas já conhecem seus efeitos: fortalecimento dos tecidos conjuntivos, ganho de massa muscular, queima de gordura, rejuvenescimento e assim por diante.',
    benefits: [
      'Sal de arginina e ácido alfa-cetoglutárico (AAKG).',
      'Popular como suplemento para bombeamento muscular.',
      'Síntese de óxido nítrico a partir da decomposição da arginina.',
      'Efeito vasodilatador — melhora fluxo sanguíneo e entrega de nutrientes.',
      'Aumenta resistência e promove o pump.',
      'Regulação da pressão arterial via óxido de nitrogênio (NO).',
      'Promove produção do hormônio do crescimento.',
      'Efeitos associados: tecidos conjuntivos, massa muscular, queima de gordura e rejuvenescimento.',
    ],
    whenToTake: 'Antes do treino — conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em pó ou cápsulas antes do treino.',
    icon: 'fitness-outline',
    color: '#A3E635',
    image: require('../../assets/sports-nutrition/aakg.png'),
  },
  {
    id: 'vitaminas-minerais',
    name: 'Vitaminas e Minerais',
    categoryId: 'vitaminas',
    shortDescription:
      'Micronutrientes essenciais para metabolismo, imunidade e desempenho do atleta.',
    description:
      'Vitaminas e minerais são fundamentais na nutrição esportiva para suporte metabólico, recuperação e saúde geral do atleta. Conteúdo completo será adicionado em breve.',
    benefits: [
      'Suporte metabólico e imunológico ao atleta.',
      'Linha com multivitamínicos, minerais e complexos específicos.',
      'Uso conforme objetivo de treino e orientação profissional.',
    ],
    whenToTake: 'Conforme orientação do nutricionista e da variação escolhida.',
    usage: 'Consulte a variação desejada nesta linha para modo de uso e dosagem.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/vitaminas-minerais.png'),
  },
  {
    id: 'antioxidantes',
    name: 'Antioxidantes',
    categoryId: 'vitaminas',
    parentId: 'vitaminas-minerais',
    shortDescription:
      'Amplo grupo de compostos — vitaminas, minerais e carotenoides — que protegem as células.',
    description:
      'Os antioxidantes são um amplo grupo de compostos que inclui vitaminas, minerais e carotenoides. Os antioxidantes são altamente valorizados, pois protegem as células do corpo humano contra danos e envelhecimento.',
    benefits: [
      'Grupo amplo que inclui vitaminas, minerais e carotenoides.',
      'Protegem as células do corpo humano contra danos.',
      'Suporte contra o envelhecimento celular.',
      'Altamente valorizados na nutrição esportiva e saúde geral.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em cápsulas ou comprimidos.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/antioxidantes.png'),
  },
  {
    id: 'minerais',
    name: 'Minerais',
    categoryId: 'vitaminas',
    parentId: 'vitaminas-minerais',
    shortDescription:
      'Substâncias inorgânicas essenciais — condução nervosa, contração muscular e equilíbrio eletrolítico.',
    description:
      'Os minerais são substâncias de origem inorgânica, o que significa que não são produzidos por animais e plantas. Mas eles podem ser encontrados em alimentos. Os minerais são essenciais para o bom funcionamento do corpo. Eles fornecem condução nervosa, contração muscular, equilíbrio eletrolítico de água e produção de energia, que são muito importantes na musculação.\n\nMuitos minerais também atuam como blocos de construção dos tecidos do corpo humano. Por exemplo, o cálcio e o fósforo fazem parte do tecido ósseo, e o zinco está envolvido na síntese da testosterona.\n\nOs tecidos do nosso corpo contêm líquido tanto dentro das células (líquido intracelular) quanto no espaço intercelular (líquido extracelular). Os minerais (eletrólitos), minerais carregados eletricamente ou íons são dissolvidos em ambos os líquidos.\n\nOs minerais trabalham em conjunto, regulando o balanço da água em ambos os lados das membranas celulares. Os minerais também contribuem para a contração muscular, garantindo a transmissão de sinais através das membranas celulares do tecido nervoso. O equilíbrio eletrolítico é necessário para manter a saúde normal e alcançar o desempenho atlético ideal. O sódio e o potássio são dois eletrólitos principais. O sódio regula o equilíbrio intercelular dos líquidos e o potássio regula o equilíbrio do líquido dentro das células.',
    benefits: [
      'Origem inorgânica — essenciais e presentes nos alimentos.',
      'Condução nervosa, contração muscular e produção de energia.',
      'Equilíbrio eletrolítico da água — fundamental na musculação.',
      'Cálcio e fósforo: componentes do tecido ósseo.',
      'Zinco envolvido na síntese da testosterona.',
      'Eletrólitos (íons) dissolvidos no líquido intra e extracelular.',
      'Regulam o balanço hídrico nas membranas celulares.',
      'Sódio e potássio: principais eletrólitos para desempenho atlético.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em cápsulas ou comprimidos.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/minerais.png'),
  },
  {
    id: 'multivitaminicos',
    name: 'Multivitamínicos',
    categoryId: 'vitaminas',
    parentId: 'vitaminas-minerais',
    shortDescription:
      'Complexos vitamínicos-minerais para suprir vitaminas, minerais e outros nutrientes essenciais.',
    description:
      'Os complexos vitamínicos-minerais (multivitamínicos) são suplementos destinados a fornecer ao corpo vitaminas, minerais e outros nutrientes.\n\nEsses suplementos estão disponíveis na forma de comprimidos, cápsulas, pastilhas, pó, líquido e soluções para injeção. Os complexos vitamínicos-minerais modernos são criados levando em consideração as características de idade, sexo e atividade humana — como, por exemplo, multivitamínicos para mulheres grávidas, crianças, idosos, atletas, homens e mulheres. Os complexos vitamínicos-minerais não contêm substâncias hormonais e nocivas, não são perigosos para a saúde e, pelo contrário, visam seu fortalecimento, bem como a ativação de processos metabólicos.\n\nA prática mostra que é impossível obter bons resultados na musculação, no preparo físico, no levantamento de peso básico (powerlifting) ou outras práticas esportivas se você não usar de forma adicional complexos vitamínicos-minerais. Os atletas geralmente enfrentam o problema de um platô de treino (tanto durante o ganho de massa muscular quanto na perda de gordura), mesmo com nutrição adequada e treinamento sistemático. A insuficiência de vitaminas e minerais pode ser a razão disso.\n\nO problema é que nem sempre as necessidades do corpo são satisfeitas completamente a partir de fontes alimentares, especialmente na musculação, onde é necessária uma grande quantidade de alimentos ricos em calorias, que geralmente contêm poucas vitaminas e minerais. Os fisiculturistas não podem simplesmente incluir frutas suficientes e outras fontes de vitaminas na dieta, pois isso levará a distúrbios digestivos. Ao mesmo tempo, os atletas têm necessidades corporais muito maiores de vitaminas e minerais do que as pessoas comuns. Isso exige a ingestão de complexos vitamínicos.\n\nSabendo disso, os fisiculturistas iniciantes enfrentam o seguinte problema: escolher o complexo ideal. Existem centenas de multivitamínicos no mercado que, de acordo com a descrição do fabricante, são as melhores; mas, na realidade, não há tantos complexos bons. Como observado acima, a qualidade de um complexo vitamínico-mineral é determinada por suas matrizes que permitem a liberação de substâncias a uma determinada taxa e em determinadas combinações, proporcionando o melhor efeito de assimilação. Além disso, ao praticar esportes (em particular a musculação), as necessidades do organismo mudam: algumas vitaminas são necessárias em 20% a mais, outras em 100%. É por isso que recomenda-se aos atletas que comprem complexos vitamínicos-minerais especializados, elaborados levando em consideração as necessidades específicas do organismo em condições de treinamento. Por fim, os complexos vitamínicos e minerais do esporte são divididos de acordo com a finalidade de gênero: para homens e mulheres, nos quais as características fisiológicas de ambos os sexos são levadas em consideração.',
    benefits: [
      'Fornece vitaminas, minerais e outros nutrientes ao corpo.',
      'Disponível em comprimidos, cápsulas, pó, líquido e outras formas.',
      'Fórmulas por idade, sexo e atividade — atletas, gestantes, idosos e mais.',
      'Sem hormônios ou substâncias nocivas — fortalece e ativa o metabolismo.',
      'Essencial para resultados em musculação, powerlifting e outras modalidades.',
      'Platô de treino pode estar ligado à falta de vitaminas e minerais.',
      'Dietas hipercalóricas costumam ter poucos micronutrientes.',
      'Complexos esportivos especializados com dosagens ajustadas ao treino.',
      'Versões específicas para homens e mulheres.',
    ],
    whenToTake:
      'Durante ganho de massa muscular, aumento de força, definição muscular e perda de peso — conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — prefira complexos especializados para atletas.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/multivitaminicos.png'),
  },
  {
    id: 'melatonina',
    name: 'Para Dormir (Melatonina)',
    categoryId: 'vitaminas',
    parentId: 'vitaminas-minerais',
    shortDescription:
      'Hormônio natural que regula o sono, o descanso e o ritmo dia-noite do atleta.',
    description:
      'A melatonina é um hormônio produzido naturalmente no corpo, ajuda no descanso e equilibra o ritmo diário. O nível de melatonina é baixo durante o dia, mas muito mais alto à noite, agindo sistemática e diretamente na sonolência à noite, quando está escuro.\n\nHorário de sono desregulado, baixa qualidade e recuperação do sono — esses indicadores são os piores inimigos de qualquer atleta ou fisiculturista sério. Ao tomar melatonina natural, você obterá qualidade do sono e recuperação rápida quando elas forem mais necessárias.',
    benefits: [
      'Regula o sono.',
      'Promove relaxamento.',
      'Combate os radicais livres no cérebro.',
      'Ajuda a curar insônia.',
      'Normaliza o ritmo dia-noite.',
      'Suporte à recuperação do atleta com sono de qualidade.',
    ],
    whenToTake: 'À noite, antes de dormir — conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em comprimidos ou gotas.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/melatonina.png'),
  },
  {
    id: 'vitamina-c',
    name: 'Vitamina C',
    categoryId: 'vitaminas',
    parentId: 'vitaminas-minerais',
    shortDescription:
      'Um dos antioxidantes mais eficazes — protege as células dos radicais livres.',
    description:
      'A vitamina C é um dos antioxidantes mais eficazes; ela protege as células do corpo dos efeitos nocivos dos radicais livres.\n\nO ácido ascórbico é um participante no processo de biossíntese do colágeno e de seus precursores — isto é, as substâncias necessárias para a formação do osso e tecido conjuntivo. Ela é necessária para a hematopoiese normal e para a produção de catecolaminas e compostos esteroides no organismo. A vitamina C é capaz de regular a coagulação sanguínea e normaliza a permeabilidade das paredes dos pequenos vasos sanguíneos. Ela pode impedir o desenvolvimento de reações de hipersensibilidade (alergias) e reduzir a gravidade do processo inflamatório.\n\nO ácido ascórbico é necessário para uma pessoa proteger seu corpo das consequências negativas dos fatores de estresse. Foi estabelecido que a concentração de sais de ácido ascórbico nos "hormônios do estresse" secretados pelas glândulas supra-renais é muito alta.\n\nO sistema imunológico é fortalecido e os processos de recuperação são ativados sob a influência dessa vitamina.\n\nO ácido ascórbico acelera o processo de remoção de metais pesados e seus compostos do corpo, evita a oxidação do colesterol e sua deposição nas paredes vasculares, proporcionando um efeito antiaterosclerótico. Seu conteúdo suficiente aumenta a estabilidade de outras vitaminas — compostos dos grupos A, E e B.',
    benefits: [
      'Um dos antioxidantes mais eficazes contra radicais livres.',
      'Biossíntese de colágeno, osso e tecido conjuntivo.',
      'Hematopoiese normal e produção de catecolaminas e esteroides.',
      'Regula coagulação sanguínea e permeabilidade dos vasos.',
      'Reduz alergias e gravidade de processos inflamatórios.',
      'Proteção contra fatores de estresse — alta concentração nas glândulas supra-renais.',
      'Fortalece o sistema imunológico e ativa a recuperação.',
      'Remove metais pesados e efeito antiaterosclerótico.',
      'Estabiliza vitaminas dos grupos A, E e B.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — comprimidos, cápsulas ou pó efervescente.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/vitamina-c.png'),
  },
  {
    id: 'vitaminas-a-e',
    name: 'Vitaminas A e E',
    categoryId: 'vitaminas',
    parentId: 'vitaminas-minerais',
    shortDescription:
      'Vitaminas lipossolúveis — imunidade, visão, pele e proteção antioxidante.',
    description:
      'A vitamina A é responsável pelo metabolismo normal do corpo, bem como pelo bom funcionamento do sistema imunológico, o que ajuda a prevenir muitas doenças virais e infecciosas. Ela apoia o trabalho do sistema nervoso e cardiovascular. A vitamina A é um dos primeiros auxiliares dos seus olhos. E vale a pena mencionar os efeitos benéficos na pele, cabelos, ossos e dentes. Além disso, os cientistas provaram que a vitamina A interfere no desenvolvimento de células cancerígenas no corpo humano.\n\nO principal efeito da vitamina E é manter o nível de antioxidantes em todo o corpo, o que impede o envelhecimento da pele. Assim como a vitamina A, a vitamina E contribui para a imunidade, protegendo contra gripes e resfriados. Além disso, ela participa ativamente da nutrição das células e do fortalecimento das paredes dos vasos sanguíneos. A vitamina E é indispensável para a beleza e saúde dos cabelos e da pele.\n\nRecomenda-se que se tome as vitaminas A e E juntas por um motivo. O ponto é que a vitamina E impede a destruição da vitamina A, mantendo o equilíbrio vitamínico no corpo.',
    benefits: [
      'Vitamina A: metabolismo, imunidade e prevenção de doenças virais e infecciosas.',
      'Vitamina A: suporte aos sistemas nervoso e cardiovascular.',
      'Vitamina A: saúde dos olhos, pele, cabelos, ossos e dentes.',
      'Vitamina A: interfere no desenvolvimento de células cancerígenas.',
      'Vitamina E: mantém nível de antioxidantes e retarda envelhecimento da pele.',
      'Vitamina E: imunidade — proteção contra gripes e resfriados.',
      'Vitamina E: nutrição celular e fortalecimento dos vasos sanguíneos.',
      'Tomadas juntas: vitamina E protege a vitamina A do corpo.',
    ],
    whenToTake: 'Recomenda-se tomar A e E juntas — conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente com refeição que contenha gordura.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/vitaminas-a-e.png'),
  },
  {
    id: 'complexo-b',
    name: 'Vitaminas do Complexo B',
    categoryId: 'vitaminas',
    parentId: 'vitaminas-minerais',
    shortDescription:
      'Participantes ativos do metabolismo celular — energia, nervos, sangue e imunidade.',
    description:
      'As vitaminas do complexo B são conhecidas pela medicina como participantes ativos nos processos do metabolismo celular, por isso seu uso é muito popular na normalização do trabalho do corpo.\n\nAcredita-se que as vitaminas do complexo B sejam úteis sobretudo para o sistema nervoso, mas isso não é inteiramente verdade. O complexo B ajuda a regular o metabolismo energético, convertendo carboidratos, gorduras e proteínas em energia.\n\nA falta de vitamina B1, que participa desse processo, pode causar não apenas depressão, mas também uma fraqueza geral e apatia. Riboflavina — a vitamina B2 — fornece funções visuais e promove a síntese de hemoglobina. A vitamina B5 promove a formação do chamado colesterol saudável, e a vitamina B9 participa da gravidez, desenvolvendo o feto e melhora a divisão celular.\n\nO estereótipo de que as vitaminas B ajudam apenas no tratamento de patologias nervosas foi criado por causa das duas vitaminas desse grupo — B6 e B12. Elas realmente participam da atividade do sistema nervoso, ou seja, o regulam. Mas a B6 também sintetiza a hemoglobina, regenera os glóbulos vermelhos e cria anticorpos, o que demonstra a importância da vitamina para o sistema imunológico. Ao mesmo tempo, a vitamina B12 também ajuda a sintetizar eritrócitos.',
    benefits: [
      'Participantes ativos do metabolismo celular.',
      'Regula metabolismo energético — converte carboidratos, gorduras e proteínas em energia.',
      'B1: falta pode causar depressão, fraqueza geral e apatia.',
      'B2 (riboflavina): funções visuais e síntese de hemoglobina.',
      'B5: formação de colesterol saudável.',
      'B9: gravidez, desenvolvimento fetal e divisão celular.',
      'B6 e B12: regulam o sistema nervoso.',
      'B6: hemoglobina, glóbulos vermelhos e anticorpos — suporte imunológico.',
      'B12: síntese de eritrócitos.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em comprimidos ou cápsulas.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/complexo-b.png'),
  },
  {
    id: 'acidos-graxos-omega',
    name: 'Ácidos Graxos Ômega',
    categoryId: 'vitaminas',
    parentId: 'vitaminas-minerais',
    shortDescription:
      'Ômega-3, ômega-6 e ômega-9 — gorduras essenciais para membranas celulares e inflamação.',
    description:
      'Os ácidos graxos desempenham vários papéis importantes em nosso corpo. Além de ser o principal componente dos depósitos de gordura, eles também servem como um elemento importante das membranas celulares e regulam os processos inflamatórios.\n\nExistem dois tipos principais de ácidos graxos: os saturados e os insaturados. As gorduras saturadas são encontradas em animais e plantas tropicais e, à temperatura ambiente, tendem a permanecer sólidas. As gorduras insaturadas são encontradas em vegetais, cereais e óleo de peixe. Elas permanecem líquidas à temperatura ambiente. As gorduras insaturadas são divididas em gorduras poliinsaturadas (PUFAs), que incluem ácidos graxos ômega-3 e ômega-6, e gorduras monoinsaturadas (MUFAs), que incluem ácidos graxos ômega-9.\n\nO que são ácidos graxos ômega-3?\nOs ácidos graxos ômega-3 mais importantes são o ácido alfa-linolênico (ALA), o ácido eicosapentaenóico (EPA) e ácido docosahexaenóico (DHA). O ácido alfa-linolênico é um ácido graxo essencial. Isso significa que ele deve estar presente nos alimentos e em vários suplementos. Nosso corpo pode converter ALA em EPA e DHA. No entanto, a conversão é muito ineficiente. Portanto, a ingestão alimentar de EPA e DHA é importante. O EPA e o DHA desempenham um papel crucial no desenvolvimento do cérebro e do sistema nervoso central. Eles também têm propriedades anti-inflamatórias potentes.\n\nComo os ácidos graxos ômega-3 são muito importantes para o desenvolvimento neurológico, teoriza-se que a suplementação possa auxiliar no tratamento de distúrbios neurológicos. Além disso, as propriedades anti-inflamatórias dos ácidos graxos ômega-3 podem levar a melhorias em algumas doenças inflamatórias. Infelizmente, em ambos os casos, os testes mostraram que esses suplementos oferecem resultados diferentes: nenhum benefício, exceto em um caso. O uso diário de EPA e DHA pode ajudar no tratamento da artrite. Em alguns casos, os pacientes conseguiram descartar completamente os medicamentos.\n\nO que são ácidos graxos ômega-6?\nOs ácidos graxos ômega-6 essenciais, ou PUFAs, são encontrados em alimentos que contêm ácido linoléico (LA). O ácido linoléico é o principal ácido graxo que é convertido em outro tipo de ômega-6 PUFA, isto é, ácido araquidônico (AA). O ácido araquidônico e o EPA servem como protótipos para um grupo importante de moléculas conhecidas como eicosanoides.\n\nOs eicosanóides derivados do AA aumentam a inflamação e podem aumentar a duração e a dor durante a febre. Os eicosanóides derivados do EPA são PUFAs ômega-3 e possuem propriedades anti-inflamatórias. O equilíbrio correto desses dois tipos de eicosanóides desempenha um papel importante no caso de processos inflamatórios do corpo. A inflamação aumenta à medida que a proporção de ômega-6 para ômega-3 FA aumenta em sua dieta.\n\nO que são ácidos graxos ômega-9?\nÔmega-9 MUFA são componentes de gordura animal e óleo vegetal. O principal tipo de ômega-9 FA é o ácido oleico, encontrado nas azeitonas, nozes, sementes e gorduras animais. Como os ácidos graxos ômega-9 não são essenciais, a suplementação não é necessária.',
    benefits: [
      'Componente das membranas celulares e regulador de processos inflamatórios.',
      'Gorduras saturadas vs. insaturadas — PUFAs (ômega-3, ômega-6) e MUFAs (ômega-9).',
      'Ômega-3: ALA, EPA e DHA — essenciais para cérebro e sistema nervoso.',
      'EPA e DHA: propriedades anti-inflamatórias potentes.',
      'Uso diário de EPA e DHA pode ajudar no tratamento da artrite.',
      'Ômega-6: ácido linoléico convertido em ácido araquidônico (AA).',
      'Equilíbrio entre eicosanóides de AA (pró-inflamatórios) e EPA (anti-inflamatórios).',
      'Inflamação aumenta quando a proporção ômega-6/ômega-3 na dieta sobe.',
      'Ômega-9 (ácido oleico): não essencial — suplementação geralmente desnecessária.',
    ],
    whenToTake: 'Uso diário de EPA e DHA — conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em cápsulas de óleo de peixe ou linhaça.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
    image: require('../../assets/sports-nutrition/omega.png'),
  },
  {
    id: 'perda-de-peso',
    name: 'Produtos para Perda de Peso',
    categoryId: 'perda-peso',
    shortDescription:
      'Suplementos voltados ao suporte na definição corporal e controle de peso.',
    description:
      'Os produtos para perda de peso são uma linha de nutrição esportiva com fórmulas voltadas ao suporte metabólico, controle de apetite e definição corporal. Conteúdo completo será adicionado em breve.',
    benefits: [
      'Linha de produtos para fases de definição e controle de peso.',
      'Fórmulas com diferentes mecanismos de ação.',
      'Uso com acompanhamento de nutricionista recomendado.',
    ],
    whenToTake: 'Conforme orientação do nutricionista e da variação escolhida.',
    usage: 'Consulte a variação desejada nesta linha para modo de uso e dosagem.',
    icon: 'trending-down-outline',
    color: '#EC4899',
    image: require('../../assets/sports-nutrition/perda-de-peso.png'),
  },
  {
    id: 'medicamentos-perda-de-peso',
    name: 'Medicamentos para Perda de Peso',
    categoryId: 'perda-peso',
    parentId: 'perda-de-peso',
    shortDescription:
      'Supressores de apetite (anorexígenos e anoréticos) que ajudam a reduzir o peso corporal.',
    description:
      'Os supressores de apetite, também conhecidos como anorexígenos e anoréticos, são uma grande classe de nutrição esportiva, agentes farmacológicos e medicamentos que suprimem o apetite e, assim, ajudam a reduzir o peso corporal. Os supressores de apetite têm diferentes mecanismos de ação, que visam principalmente suprimir o centro da fome e ativar o centro da saciedade, o que acaba contribuindo para a perda de peso.\n\nNa nutrição esportiva, os anoréticos são usados com frequência em queimadores de gordura complexos. Praticamente todos os termogênicos também são supressores de apetite.',
    benefits: [
      'Supressores de apetite — também chamados anorexígenos e anoréticos.',
      'Diferentes mecanismos de ação para redução do peso corporal.',
      'Atuam suprimindo o centro da fome e ativando o centro da saciedade.',
      'Usados em queimadores de gordura complexos na nutrição esportiva.',
      'A maioria dos termogênicos também funciona como supressor de apetite.',
    ],
    whenToTake: 'Conforme orientação médica e do nutricionista.',
    usage: 'Siga rigorosamente a orientação profissional e o rótulo do produto.',
    icon: 'trending-down-outline',
    color: '#EC4899',
  },
  {
    id: 'produtos-especiais',
    name: 'Produtos Especiais',
    categoryId: 'produtos-especiais',
    shortDescription:
      'Linha de suplementos e fórmulas diferenciadas para objetivos específicos do atleta.',
    description:
      'Os produtos especiais reúnem suplementos e fórmulas com composições diferenciadas na nutrição esportiva. Conteúdo completo será adicionado em breve.',
    benefits: [
      'Fórmulas para objetivos específicos de treino e composição corporal.',
      'Linha com variações e produtos diferenciados.',
      'Uso conforme orientação profissional.',
    ],
    whenToTake: 'Conforme orientação do nutricionista e da variação escolhida.',
    usage: 'Consulte a variação desejada nesta linha para modo de uso e dosagem.',
    icon: 'star-outline',
    color: '#D97706',
    image: require('../../assets/sports-nutrition/produtos-especiais.png'),
  },
  {
    id: 'complexos-pre-treino',
    name: 'Complexos Pré-Treino',
    categoryId: 'produtos-especiais',
    parentId: 'produtos-especiais',
    shortDescription:
      'Fórmulas combinadas para treino mais produtivo, recuperação e crescimento muscular.',
    description:
      'Os complexos pré-treino são um tipo de nutrição esportiva usada na musculação, que contêm em sua composição vários componentes que tornam o treino mais produtivo e também promovem uma rápida recuperação e crescimento muscular.\n\nOs complexos pré-treino (pré-treino) são suplementos que, em proporções especiais, contêm substâncias concebidas para ajudá-lo a tirar o máximo proveito dos seus treinos. Basicamente, trata-se de uma combinação de creatina, cafeína, aminoácidos, carboidratos e outros componentes que podem levar seu treino a um novo nível.',
    benefits: [
      'Torna o treino mais produtivo.',
      'Promove recuperação rápida e crescimento muscular.',
      'Combinação em proporções especiais de ativos.',
      'Creatina, cafeína, aminoácidos e carboidratos.',
      'Outros componentes para elevar o desempenho no treino.',
    ],
    whenToTake: '30–45 minutos antes do treino — conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em água.',
    icon: 'star-outline',
    color: '#D97706',
    image: require('../../assets/sports-nutrition/pre-treino.png'),
  },
  {
    id: 'complexos-pos-treino',
    name: 'Complexos Pós-Treino',
    categoryId: 'produtos-especiais',
    parentId: 'produtos-especiais',
    shortDescription:
      'Fase anabólica pós-treino — proteínas, carboidratos e síntese muscular acelerada.',
    description:
      'O período pós-treino é a etapa mais importante na formação da massa muscular. Esse período também é chamado de fase anabólica. Ele inclui o seguinte: comer, descansar e dormir. O consumo de grandes quantidades de produtos com proteínas é o mais importante nesse período.\n\nHá dois fatores que contribuem para a síntese acelerada de glicogênio após o treino:\n- Garantir a ingestão de uma certa quantidade de carboidratos;\n- Estimulação da insulina (hormônio anabólico);\n\nOs complexos pós-treino permitem criar uma reação anabólica sinérgica. Aumentando a síntese de proteínas, esse produto permite maximizar o processo de crescimento muscular.',
    benefits: [
      'Período pós-treino: etapa mais importante para formação de massa muscular.',
      'Fase anabólica — comer, descansar e dormir.',
      'Alto consumo de proteínas é fundamental nesse período.',
      'Carboidratos aceleram a síntese de glicogênio pós-treino.',
      'Estimulação da insulina — hormônio anabólico.',
      'Reação anabólica sinérgica com complexos pós-treino.',
      'Maximiza síntese proteica e crescimento muscular.',
    ],
    whenToTake: 'Logo após o treino — conforme orientação do nutricionista.',
    usage: 'Misture 1 dose (conforme rótulo do produto) em água ou leite.',
    icon: 'star-outline',
    color: '#D97706',
    image: require('../../assets/sports-nutrition/pos-treino.png'),
  },
  {
    id: 'impulsionadores-testosterona',
    name: 'Impulsionadores de Testosterona / Hormônio do Crescimento',
    categoryId: 'produtos-especiais',
    parentId: 'produtos-especiais',
    shortDescription:
      'Fitoterápicos, libido e micronutrientes — guia educativo sobre suporte hormonal natural.',
    description:
      'Esta seção organiza opções frequentemente usadas para suporte ao eixo hormonal — sem confundir marketing com evidência científica.\n\nA testosterona é o principal hormônio anabólico endógeno, mas suplementos “booster” raramente funcionam como esteroides. A maioria atua indiretamente: reduzindo cortisol, corrigindo deficiências nutricionais ou melhorando libido sem alterar hormônios séricos.\n\nExplore as subseções:\n\n1. Fitoterápicos adaptógenos (ashwagandha, feno-grego, longjack, mucuna)\n2. Libido sem alterar hormônio (maca, tribulus, marapuama/catuaba)\n3. Micronutrientes essenciais (zinco, vitamina D, magnésio)\n\n📌 Visão prática: sono profundo, treino de força e percentual de gordura controlado continuam sendo os estimulantes endógenos mais potentes — para homens e mulheres.',
    benefits: [
      'Organizado por mecanismo: adaptógenos, libido e micronutrientes.',
      'Diferencia o que altera testosterona sérica do que só melhora libido.',
      'Prioriza evidência clínica (ex.: ashwagandha, maca).',
      'Micronutrientes corrigem deficiências antes de fórmulas complexas.',
      'Conteúdo educativo — não substitui exame hormonal e consulta médica.',
    ],
    whenToTake: 'Conforme orientação do nutricionista ou médico.',
    usage:
      'Para bom efeito, combine com dieta hipercalórica adequada, treino sistemático de força e nutrição esportiva adicional. Siga o rótulo do produto.',
    icon: 'star-outline',
    color: '#D97706',
    image: require('../../assets/sports-nutrition/testosterona-booster.png'),
  },
  {
    id: 'recuperacao-pos-treino',
    name: 'Recuperação Pós-Treino',
    categoryId: 'produtos-especiais',
    parentId: 'produtos-especiais',
    shortDescription:
      'Reposição de energia e proteína — carboidratos e proteínas rápidas após o treino.',
    description:
      'Sabe-se que, depois de praticar exercícios, o corpo precisa de uma restauração das perdas de energia e proteína. Portanto, após o treino, são necessários não apenas proteínas, mas também carboidratos. O significado deste último não é menor. Além disso, a assimilação de proteínas é simplesmente impossível se o corpo não tiver energia. Afinal, digestão e maior assimilação são processos que consomem muita energia! E isso significa que, recebendo apenas proteína após o treino, o corpo primeiro a "queima" para obter energia e só então começa a assimilar a proteína. Os agentes de recuperação são os produtos que têm tudo o que você precisa: carboidratos e proteínas rápidos e até aminoácidos.',
    benefits: [
      'Restaura perdas de energia e proteína após o exercício.',
      'Carboidratos e proteínas são necessários juntos no pós-treino.',
      'Assimilação proteica exige energia — digestão consome calorias.',
      'Só proteína pós-treino: o corpo queima antes de assimilar.',
      'Agentes de recuperação: carboidratos e proteínas de rápida absorção.',
      'Podem incluir aminoácidos na composição.',
    ],
    whenToTake: 'Logo após o treino — conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em pó, cápsulas ou líquido.',
    icon: 'star-outline',
    color: '#D97706',
    image: require('../../assets/sports-nutrition/recuperacao-pos-treino.png'),
  },
  {
    id: 'articulacoes-ligamentos',
    name: 'Produtos para Articulações e Ligamentos',
    categoryId: 'recuperacao',
    shortDescription:
      'Suplementos para suporte à saúde das articulações, ligamentos e cartilagens.',
    description:
      'Os produtos para articulações e ligamentos são formulados para proteger e fortalecer o sistema articular do atleta. Conteúdo completo será adicionado em breve.',
    benefits: [
      'Suporte à saúde articular e dos ligamentos.',
      'Proteção em treinos de alta carga e impacto.',
      'Linha com colágeno, glucosamina, condroitina e outros ativos.',
    ],
    whenToTake: 'Conforme orientação do nutricionista e da variação escolhida.',
    usage: 'Consulte a variação desejada nesta linha para modo de uso e dosagem.',
    icon: 'refresh-outline',
    color: '#10B981',
    image: require('../../assets/sports-nutrition/articulacoes-ligamentos.png'),
  },
  {
    id: 'colageno-hidrolisado',
    name: 'Colágeno Hidrolisado',
    categoryId: 'recuperacao',
    parentId: 'articulacoes-ligamentos',
    shortDescription:
      'Proteína estrutural — cerca de 6% do peso corporal, presente em ossos, cartilagens e ligamentos.',
    description:
      'O colágeno é uma das proteínas mais comuns no corpo humano, sua fração de massa é de 6% do peso corporal. O colágeno está presente em quase todos os tecidos corporais, é a principal proteína estrutural que forma o tecido do corpo e fornece a força dos tecidos; na realidade, ele mantém ou une as células.\n\nA maior parte do colágeno é encontrada nos tecidos conjuntivos que desempenham uma função mecânica: ossos, cartilagens e ligamentos.\n\nA gelatina nutricional é colágeno hidrolisado. A gelatina é obtida a partir da destruição parcial do colágeno animal por enzimas e é praticamente indistinguível em suas propriedades biológicas, pois é destruída da mesma maneira que os oligopeptídeos no trato gastrointestinal.',
    benefits: [
      'Representa cerca de 6% do peso corporal — proteína estrutural principal.',
      'Presente em ossos, cartilagens e ligamentos.',
      'Fortalecimento da cartilagem.',
      'Fortalecimento dos ligamentos.',
      'Fortalecimento dos ossos.',
      'Melhora da nutrição muscular — aminoácidos construtores do músculo.',
      'Arginina (~8%) contribui para melhor fluxo sanguíneo nos músculos.',
      'Melhora das propriedades da pele.',
      'Gelatina nutricional = colágeno hidrolisado de fácil absorção.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em pó, cápsulas ou gelatina nutricional.',
    icon: 'refresh-outline',
    color: '#10B981',
    image: require('../../assets/sports-nutrition/colageno-hidrolisado.png'),
  },
  {
    id: 'glucosamina-condroitina-msm',
    name: 'Complexo de Glucosamina, Condroitina e Metilsulfonilmetano',
    categoryId: 'recuperacao',
    parentId: 'articulacoes-ligamentos',
    shortDescription:
      'Nutrientes populares e eficazes para manter a saúde das articulações.',
    description:
      'O Complexo MSM de Glucosamina e Condroitina em um suplemento nutricional combina os nutrientes mais populares e eficazes para manter a saúde de suas articulações. Os sulfatos de glucosamina e condroitina promovem a síntese de fluidos que lubrificam os tecidos das articulações, e o MSM, como a mais rica fonte de enxofre, é um antioxidante e um componente importante dos tecidos estruturais do corpo.',
    benefits: [
      'Combina os nutrientes mais populares e eficazes para articulações.',
      'Sulfatos de glucosamina e condroitina lubrificam os tecidos articulares.',
      'Promovem síntese de fluidos que protegem as articulações.',
      'MSM: rica fonte de enxofre.',
      'MSM atua como antioxidante.',
      'MSM é componente importante dos tecidos estruturais do corpo.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em cápsulas ou comprimidos.',
    icon: 'refresh-outline',
    color: '#10B981',
    image: require('../../assets/sports-nutrition/glucosamina-condroitina-msm.png'),
  },
  {
    id: 'metilsulfonilmetano',
    name: 'Metilsulfonilmetano',
    categoryId: 'recuperacao',
    parentId: 'articulacoes-ligamentos',
    shortDescription:
      'MSM — composto de enxofre biodisponível para sistema músculoesquelético e recuperação.',
    description:
      'O metilsulfonilmetano (MSM) é um dos compostos de enxofre biodisponível que participa da síntese de várias substâncias necessárias à saúde do sistema músculoesquelético e de todo o organismo. O estudo mais recente mostrou que essa substância contribui para uma recuperação mais rápida após o treino e ajuda a impedir a ruptura dos músculos.\n\nO uso desse suplemento pode reduzir a dor nas articulações e ligamentos, com risco mínimo de efeitos colaterais. Isso faz do metilsulfonilmetano uma ferramenta atraente para a musculação e o levantamento de peso básico (powerlifting). O uso combinado de MSM e glucosamina aumenta a eficácia no combate à osteoartrite.\n\nO metilsulfonilmetano participa da renovação das células; os nutrientes começam a passar melhor pelas membranas. No caso de deficiência de MSM, as paredes das células se tornam pouco permeáveis aos nutrientes.\n\nNosso corpo precisa de elementos contendo enxofre para a síntese de novas proteínas e outros elementos. O enxofre é uma parte das proteínas que formam os músculos, ligamentos e ossos. Ele é o quarto mineral mais comum no corpo humano.\n\nEsse mineral é necessário para garantir uma vida normal. Para que o enxofre seja melhor absorvido, ele é tomado em uma forma orgânica especial, uma das quais é o metilsulfonilmetano. O MSM contém 34% de enxofre biodisponível, o que faz dele uma das melhores fontes desse elemento.',
    benefits: [
      'Composto de enxofre biodisponível para saúde músculoesquelética.',
      'Recuperação mais rápida pós-treino e prevenção de ruptura muscular.',
      'Reduz dor em articulações e ligamentos — baixo risco de efeitos colaterais.',
      'Útil na musculação e powerlifting.',
      'Combinado com glucosamina: maior eficácia contra osteoartrite.',
      'Renovação celular e melhor passagem de nutrientes pelas membranas.',
      'Enxofre essencial para músculos, ligamentos e ossos.',
      'Quarto mineral mais comum no corpo humano.',
      '34% de enxofre biodisponível — uma das melhores fontes.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em cápsulas ou pó. Pode ser combinado com glucosamina.',
    icon: 'refresh-outline',
    color: '#10B981',
    image: require('../../assets/sports-nutrition/msm.png'),
  },
  {
    id: 'sulfato-condroitina',
    name: 'Sulfato de Condroitina',
    categoryId: 'recuperacao',
    parentId: 'articulacoes-ligamentos',
    shortDescription:
      'Componente estrutural da cartilagem e do fluido sinovial — elasticidade e lubrificação articular.',
    description:
      'A condroitina é um componente estrutural importante do tecido e dos ligamentos cartilaginosos, que aumenta sua força sob contração e alongamento. O sulfato de condroitina é formado no corpo pelo tecido cartilaginoso e faz parte do fluido sinovial das articulações, que desempenha uma função lubrificante.\n\nOs suplementos são feitos pela extração da substância ativa da traqueia de bovinos, porcos e cartilagens de tubarões.',
    benefits: [
      'Faz parte da cartilagem — elasticidade e amortecimento pela retenção de água no tecido.',
      'Perda de condroitina na cartilagem: principal causa de osteoartrite.',
      'Fortalecimento do tecido conjuntivo ligamentar — eficaz na musculação e powerlifting.',
      'Suprime enzimas que destroem o tecido conjuntivo (elastases, peptidases etc.).',
      'Reduz ou elimina dor articular crônica em processos inflamatórios e degenerativos.',
      'Regeneração de cartilagem — útil em musculação e esportes pesados.',
      'Componente do fluido sinovial — deslizamento e nutrição da cartilagem.',
      'Melhora das propriedades da pele.',
      'Extraída de traqueia bovina, suína e cartilagem de tubarão.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em cápsulas ou comprimidos.',
    icon: 'refresh-outline',
    color: '#10B981',
    image: require('../../assets/sports-nutrition/sulfato-condroitina.png'),
  },
  {
    id: 'sulfato-glucosamina',
    name: 'Sulfato de Glucosamina',
    categoryId: 'recuperacao',
    parentId: 'articulacoes-ligamentos',
    shortDescription:
      'Principal componente do tecido cartilaginoso — amortecimento e lubrificação articular.',
    description:
      'A glucosamina é o principal componente do tecido cartilaginoso, que serve como um importante material de amortecimento e absorção de choque para as articulações. É também uma das substâncias básicas do líquido sinovial, que lubrifica e fornece nutrientes aos tecidos articulares. Os suplementos são feitos a partir de conchas de caranguejos, lagostas e camarões.\n\nOs suplementos de glucosamina podem ajudar a fortalecer os tendões, cartilagens e ligamentos, além de reparar cartilagens danificadas. Com a idade, as cartilagens perdem suas propriedades de elasticidade e amortecimento, o que pode levar à rigidez, imobilidade e dor nas articulações. Atletas e pessoas que se exercitam regularmente às vezes sofrem lesões na cartilagem como resultado de muitos anos de movimentos repetidos e carga excessiva nas articulações. A glucosamina, aparentemente, tem a propriedade de estimular células cartilaginosas a produzir proteoglicanos (blocos de construção), que restauram os tecidos da articulação. Assim, os suplementos podem ajudar a restaurar a funcionalidade e a mobilidade das articulações.',
    benefits: [
      'Principal componente do tecido cartilaginoso — amortecimento e absorção de choque.',
      'Substância básica do líquido sinovial — lubrificação e nutrição articular.',
      'Fortalece tendões, cartilagens e ligamentos.',
      'Repara cartilagens danificadas.',
      'Combate perda de elasticidade e amortecimento com a idade.',
      'Útil para atletas com lesões por movimentos repetidos e carga excessiva.',
      'Estimula produção de proteoglicanos pelas células cartilaginosas.',
      'Restaura funcionalidade e mobilidade das articulações.',
      'Extraída de conchas de caranguejos, lagostas e camarões.',
    ],
    whenToTake: 'Conforme orientação do nutricionista.',
    usage: 'Siga o rótulo do produto — geralmente em cápsulas ou comprimidos.',
    icon: 'refresh-outline',
    color: '#10B981',
    image: require('../../assets/sports-nutrition/sulfato-glucosamina.png'),
  },
  {
    id: 'peptideos',
    name: 'Peptídeos',
    categoryId: 'peptideos',
    shortDescription:
      'Cadeias curtas de aminoácidos com funções específicas no corpo — da recuperação ao suporte hormonal.',
    description:
      'Peptídeos são moléculas formadas por poucos aminoácidos ligados em sequência (geralmente de 2 a 50). Enquanto as proteínas são grandes e precisam ser digeridas, muitos peptídeos são menores e podem interagir com receptores de forma mais direcionada.\n\nNo contexto esportivo, eles aparecem em duas frentes principais:\n\n• Peptídeos alimentares (ex.: colágeno hidrolisado) — suplementos comuns, com foco em pele, articulações e tecido conjuntivo.\n• Peptídeos bioativos de pesquisa — estudados por efeitos em recuperação, inflamação e eixo hormonal, mas com regulação rigorosa e uso apenas sob prescrição e acompanhamento médico em muitos países.\n\nEste guia é educativo: não substitui consulta com médico, nutricionista ou endocrinologista. A legalidade, pureza e segurança variam muito conforme o produto e o país.',
    benefits: [
      'Explicam funções biológicas de forma mais específica que proteínas inteiras.',
      'Peptídeos de colágeno: suporte a articulações, tendões e pele.',
      'Alguns peptídeos são estudados para recuperação e reparo tecidual.',
      'Secretagogos de GH: estimulam liberação natural de hormônio do crescimento (uso médico).',
      'Peptídeos para sono e agonistas GLP-1: temas com prescrição e acompanhamento médico.',
      'Exigem orientação profissional — dosagem, pureza e interações importam.',
    ],
    whenToTake: 'Varia conforme o peptídeo e o objetivo — somente com orientação profissional.',
    usage: 'Formas comuns: pó, cápsulas ou injetáveis (este último apenas em contexto médico).',
    icon: 'git-network-outline',
    color: '#06B6D4',
    image: require('../../assets/sports-nutrition/aminoacidos.png'),
  },
  {
    id: 'peptideos-colageno',
    name: 'Peptídeos de colágeno',
    categoryId: 'peptideos',
    parentId: 'peptideos',
    shortDescription:
      'Colágeno hidrolisado — aminoácidos prontos para absorção, com foco em articulações, tendões e pele.',
    description:
      'Os peptídeos de colágeno são obtidos pela hidrólise do colágeno animal (bovino, suíno ou marinho), quebrando a proteína em fragmentos menores. Isso facilita a digestão e a absorção de aminoácidos como glicina, prolina e hidroxiprolina — blocos importantes para tecido conjuntivo.\n\nNa prática esportiva, são usados para apoiar a saúde de articulações, tendões e ligamentos, especialmente em atletas com alto volume de treino ou histórico de sobrecarga articular. Também há interesse estético (pele e unhas), mas o benefício principal no fitness é o suporte estrutural ao longo do tempo — não é um efeito imediato como um pré-treino.\n\nFunciona melhor como estratégia de longo prazo, combinada com treino progressivo, sono adequado e dieta com proteína suficiente.',
    benefits: [
      'Absorção facilitada por hidrólise (colágeno quebrado em peptídeos).',
      'Rico em glicina, prolina e hidroxiprolina para tecido conjuntivo.',
      'Suporte a articulações, tendões e ligamentos em atletas.',
      'Pode complementar estratégias de recuperação e prevenção de lesões.',
      'Uso contínuo — efeitos estruturais aparecem ao longo de semanas.',
    ],
    whenToTake: 'Geralmente 1x ao dia, com ou sem refeição — siga o rótulo.',
    usage: 'Pó dissolvido em água, suco ou shake; também em cápsulas.',
    icon: 'fitness-outline',
    color: '#06B6D4',
  },
  {
    id: 'peptideo-bpc-157',
    name: 'BPC-157',
    categoryId: 'peptideos',
    parentId: 'peptideos-regeneracao',
    shortDescription:
      'Peptídeo derivado de proteína gástrica — estudado por efeitos em recuperação e tecido conjuntivo.',
    description:
      'O BPC-157 (Body Protection Compound) é um peptídeo sintético derivado de uma proteína encontrada no suco gástrico. Em estudos pré-clínicos e relatos na literatura, aparece associado a processos de reparo tecidual, modulação inflamatória e suporte a tendões, ligamentos e mucosa intestinal.\n\nNo mundo fitness, ganhou atenção por relatos de recuperação mais rápida de lesões musculares e articulares. Porém, a evidência em humanos ainda é limitada comparada a suplementos clássicos (creatina, proteína, ômega-3). Além disso, muitos produtos vendidos online não passam por controle rigoroso de qualidade.\n\nImportante: em diversos países, incluindo o Brasil, peptídeos como o BPC-157 não são aprovados como suplemento alimentar de venda livre. O uso deve ser discutido exclusivamente com médico habilitado — este conteúdo é apenas informativo.',
    benefits: [
      'Estudado por papel em reparo tecidual e modulação inflamatória.',
      'Interesse em tendões, ligamentos e integridade da mucosa intestinal.',
      'Relatos de recuperação mais rápida — evidência humana ainda limitada.',
      'Exige atenção à qualidade, dosagem e legalidade do produto.',
      'Somente com acompanhamento médico — não é suplemento de prateleira.',
    ],
    whenToTake: 'Somente conforme prescrição médica — não há posologia segura de venda livre.',
    usage: 'Formas estudadas incluem oral e injetável — uso médico supervisionado.',
    icon: 'medkit-outline',
    color: '#06B6D4',
  },
  {
    id: 'peptideo-tb-500',
    name: 'TB-500 (Thymosin Beta-4)',
    categoryId: 'peptideos',
    parentId: 'peptideos-regeneracao',
    shortDescription:
      'Fragmento do Thymosin Beta-4 — associado a migração celular e reparo de tecidos.',
    description:
      'O TB-500 é um peptídeo sintético correspondente a uma região ativa da proteína Thymosin Beta-4, presente naturalmente no organismo. Em modelos experimentais, está ligado a processos de migração celular, angiogênese (formação de vasos) e reparo de tecidos lesionados.\n\nAtletas e fisiculturistas mencionam o TB-500 em contextos de recuperação de lesões, flexibilidade e redução de inflamação. A base científica em humanos, porém, ainda é preliminar — muitos estudos são em animais ou in vitro.\n\nAssim como outros peptídeos bioativos, a venda e o uso fora de prescrição médica enfrentam restrições regulatórias. Pureza, dosagem e risco de contaminação são preocupações reais em produtos não regulados.',
    benefits: [
      'Associado a migração celular e reparo tecidual em estudos experimentais.',
      'Interesse em recuperação de lesões e flexibilidade.',
      'Pode modular processos inflamatórios locais.',
      'Evidência clínica em humanos ainda limitada.',
      'Uso apenas sob orientação e prescrição médica.',
    ],
    whenToTake: 'Somente conforme prescrição médica.',
    usage: 'Geralmente injetável em contextos médicos — não recomendado como autossuplementação.',
    icon: 'pulse-outline',
    color: '#06B6D4',
  },
  {
    id: 'secretagogos-gh',
    name: 'Secretagogos de hormônio do crescimento',
    categoryId: 'peptideos',
    parentId: 'peptideos',
    shortDescription:
      'Peptídeos que estimulam a liberação natural de GH — ipamorelin, CJC-1295 e similares.',
    description:
      'Secretagogos de GH são peptídeos que sinalizam a hipófise para liberar hormônio do crescimento (GH) de forma pulsátil — imitando parcialmente o ritmo natural do corpo, diferente da GH exógena injetável.\n\nExemplos frequentemente citados na literatura e na prática médica:\n\n• Ipamorelin — seletivo, com perfil considerado mais “limpo” em relação a outros secretagogos.\n• CJC-1295 (com ou sem DAC) — prolonga o pico de GH; a versão com DAC tem meia-vida mais longa.\n• GHRP-6 / GHRP-2 — mais antigos, com maior risco de fome e efeitos colaterais.\n\nEm contexto clínico, podem ser avaliados para deficiência de GH, composição corporal, recuperação e qualidade do sono — sempre com exames e acompanhamento endocrinológico. Fora disso, o uso recreativo traz riscos: alterações metabólicas, retenção hídrica, resistência insulínica e questões legais.\n\nNão substitui treino, dieta e sono. E não deve ser usado sem supervisão médica.',
    benefits: [
      'Estimulam liberação pulsátil de GH — ritmo mais fisiológico que GH exógena.',
      'Estudados em contexto de deficiência de GH e composição corporal.',
      'Ipamorelin: perfil mais seletivo entre os secretagogos.',
      'Podem influenciar recuperação, sono e reparo tecidual (com acompanhamento).',
      'Exigem exames hormonais e acompanhamento endocrinológico.',
    ],
    whenToTake: 'Horários e ciclos definidos exclusivamente pelo médico — geralmente à noite ou em jejum.',
    usage: 'Injetável subcutâneo em contexto médico — dosagem individualizada.',
    icon: 'trending-up-outline',
    color: '#06B6D4',
  },
  {
    id: 'peptideos-sono',
    name: 'Peptídeos para sono e recuperação',
    categoryId: 'peptideos',
    parentId: 'peptideos',
    shortDescription:
      'Sono de qualidade é base da recuperação — peptídeos e hormônios estudados para ritmo circadiano e descanso profundo.',
    description:
      'O sono é quando o corpo repara músculos, regula hormônios e consolida a adaptação ao treino. Atletas com sono ruim perdem performance, ganham gordura com mais facilidade e recuperam pior — independentemente da dieta ou dos suplementos.\n\nNesta seção reunimos opções frequentemente discutidas no contexto esportivo:\n\n• Melatonina — hormônio do sono (já disponível na categoria Vitaminas e minerais deste guia).\n• DSIP (Delta Sleep-Inducing Peptide) — peptídeo estudado por efeitos no sono profundo.\n• Epitalon — associado a ritmo circadiano e envelhecimento celular em estudos.\n\nNenhum substitui higiene do sono: horário fixo, quarto escuro, menos telas à noite, cafeína controlada e treino bem distribuído. Peptídeos de sono fora de prescrição médica têm regulação restrita e evidência limitada em humanos.',
    benefits: [
      'Sono adequado melhora recuperação muscular e performance.',
      'Melatonina: opção mais acessível e estudada para ritmo circadiano.',
      'DSIP e Epitalon: interesse em sono profundo e regulação circadiana.',
      'Combinar com higiene do sono — efeito maior que qualquer suplemento isolado.',
      'Uso de peptídeos bioativos apenas com orientação médica.',
    ],
    whenToTake: 'Varia por substância — melatonina geralmente 30–60 min antes de dormir (siga o rótulo).',
    usage: 'Melatonina em cápsulas/gotas; DSIP e Epitalon somente em contexto médico.',
    icon: 'moon-outline',
    color: '#6366F1',
  },
  {
    id: 'peptideo-dsip',
    name: 'DSIP (Delta Sleep-Inducing Peptide)',
    categoryId: 'peptideos',
    parentId: 'peptideos-sono',
    shortDescription:
      'Peptídeo de nove aminoácidos — estudado por indução de sono profundo e redução de estresse.',
    description:
      'O DSIP (Delta Sleep-Inducing Peptide) foi isolado originalmente do líquido cefalorraquidiano e descrito por efeitos na indução do sono delta (sono profundo, reparador). Em estudos experimentais, aparece associado à modulação do eixo stress-sono e à normalização de padrões de sono perturbados.\n\nAtletas com rotina intensa, jet lag ou dificuldade para “desligar” após treinos noturnos às vezes buscam o DSIP na expectativa de melhorar a qualidade do sono sem sedação pesada. Porém, a evidência clínica robusta em humanos ainda é escassa, e produtos vendidos sem regulação apresentam risco de impureza e dosagem incorreta.\n\nNo Brasil, não é suplemento de venda livre. Qualquer uso deve ser avaliado por médico do sono ou endocrinologista — especialmente se você já usa melatonina, ansiolíticos ou outros medicamentos.',
    benefits: [
      'Estudado por indução de sono delta (fase reparadora).',
      'Pode modular resposta ao estresse e ansiedade leve.',
      'Interesse em atletas com sono fragmentado ou jet lag.',
      'Evidência humana ainda limitada — não é primeira linha de tratamento.',
      'Somente com prescrição e acompanhamento médico.',
    ],
    whenToTake: 'Somente conforme prescrição médica — horários variam.',
    usage: 'Geralmente injetável ou nasal em contextos clínicos — não autoadministrar.',
    icon: 'moon-outline',
    color: '#6366F1',
  },
  {
    id: 'peptideo-epitalon',
    name: 'Epitalon (Epithalon)',
    categoryId: 'peptideos',
    parentId: 'peptideos-sono',
    shortDescription:
      'Tetrapeptídeo sintético — associado a ritmo circadiano, telômeros e envelhecimento celular em estudos.',
    description:
      'O Epitalon (também escrito Epithalon) é um tetrapeptídeo sintético inspirado no Epithalamin, extrato da glândula pineal. Em pesquisas russas e estudos posteriores, foi associado à regulação do ritmo circadiano, possível efeito na telomerase e modulação da produção de melatonina pela pineal.\n\nNo universo fitness e longevidade, circula como “peptídeo anti-aging” com expectativa de melhor sono, mais energia e recuperação. Os estudos em humanos são poucos e muitas vezes de baixa qualidade metodológica. A ANVISA e agências internacionais não aprovam o Epitalon como suplemento ou medicamento de rotina.\n\nPara atletas, a prioridade continua sendo sono consistente, nutrição adequada e periodização do treino. Se houver insônia persistente, procure médico — não experimente peptídeos não regulados.',
    benefits: [
      'Associado a regulação do ritmo circadiano em estudos experimentais.',
      'Interesse em longevidade e função da glândula pineal.',
      'Possível influência na produção de melatonina endógena.',
      'Evidência clínica fraca — tratado como composto de pesquisa.',
      'Não aprovado como suplemento — uso médico supervisionado apenas.',
    ],
    whenToTake: 'Somente conforme protocolo médico — ciclos curtos em estudos clínicos.',
    usage: 'Injetável subcutâneo em contextos de pesquisa/prescrição — não disponível legalmente como suplemento.',
    icon: 'time-outline',
    color: '#6366F1',
  },
  {
    id: 'agonistas-glp1',
    name: 'Agonistas GLP-1 (semaglutida, tirzepatida)',
    categoryId: 'peptideos',
    parentId: 'peptideos',
    shortDescription:
      'Medicamentos peptídicos para diabetes e obesidade — impacto em apetite, peso e saúde metabólica.',
    description:
      'Os agonistas do GLP-1 (peptídeo semelhante ao glucagon tipo 1) são medicamentos — não suplementos. Eles imitam uma hormônio intestinal que aumenta a saciedade, retarda o esvaziamento gástrico e melhora o controle glicêmico.\n\nOs mais conhecidos no momento:\n\n• Semaglutida (Ozempic®, Wegovy®) — aplicação semanal; aprovada para diabetes tipo 2 e obesidade.\n• Tirzepatida (Mounjaro®, Zepbound®) — agonista duplo GIP + GLP-1; forte efeito em peso e glicemia.\n• Liraglutida (Saxenda®, Victoza®) — aplicação diária; precursora na classe.\n\nNo fitness, ganharam fama por perda de peso acelerada e redução de apetite. Porém são medicamentos com efeitos colaterais reais (náusea, constipação, perda de massa muscular se a proteína/treino não forem mantidos, risco de pancreatite em casos raros). Uso sem prescrição é ilegal e perigoso.\n\nPara atletas, o foco deve ser preservar massa magra com treino de força e proteína alta durante qualquer protocolo de emagrecimento — com ou sem medicação.',
    benefits: [
      'Redução significativa de peso em estudos clínicos (com dieta e estilo de vida).',
      'Melhora do controle glicêmico em diabetes tipo 2.',
      'Redução de apetite e maior saciedade — facilita déficit calórico.',
      'Possível benefício cardiovascular em populações de risco (estudos com semaglutida).',
      'Exigem prescrição, acompanhamento médico e monitoramento contínuo.',
    ],
    whenToTake: 'Conforme prescrição médica — geralmente 1x por semana (semaglutida/tirzepatida) ou diário (liraglutida).',
    usage: 'Caneta injetável subcutânea — aplicação em abdômen, coxa ou braço; refrigerar conforme bula.',
    icon: 'medical-outline',
    color: '#8B5CF6',
  },
  {
    id: 'semaglutida',
    name: 'Semaglutida',
    categoryId: 'peptideos',
    parentId: 'agonistas-glp1',
    shortDescription:
      'Análogo do GLP-1 — Ozempic® (diabetes) e Wegovy® (obesidade); aplicação semanal.',
    description:
      'A semaglutida é um análogo do GLP-1 com meia-vida longa, permitindo aplicação semanal. Foi aprovada pela ANVISA e FDA para diabetes tipo 2 (Ozempic®) e, em dose maior, para obesidade e sobrepeso com comorbidades (Wegovy®).\n\nMecanismo: estimula liberação de insulina dependente de glicose, reduz glucagon, retarda o esvaziamento gástrico e atua em centros de saciedade no cérebro. O resultado é menor fome, menor ingestão calórica e perda de peso progressiva — em média 10–15% do peso corporal em estudos de 68 semanas (Wegovy), quando combinada com dieta e exercício.\n\nPara praticantes de musculação e powerlifting, o risco principal é perder massa magra junto com a gordura se o treino de força e a ingestão de proteína (1,6–2,2 g/kg) não forem mantidos. Náusea e desconforto gastrointestinal são comuns nas primeiras semanas.\n\nMedicamento de prescrição — nunca use versões “de laboratório” ou sem receita.',
    benefits: [
      'Perda de peso clinicamente significativa em estudos controlados.',
      'Melhora de HbA1c e controle glicêmico no diabetes tipo 2.',
      'Redução de eventos cardiovasculares em pacientes com diabetes (SELECT trial).',
      'Aplicação semanal — maior adesão que opções diárias.',
      'Preservar massa magra com treino de força + proteína adequada.',
    ],
    whenToTake: 'Mesmo dia da semana, com ou sem alimentos — siga a bula e o médico.',
    usage: 'Caneta pré-preenchida; iniciar com dose baixa e titular gradualmente.',
    icon: 'medical-outline',
    color: '#8B5CF6',
  },
  {
    id: 'tirzepatida',
    name: 'Tirzepatida',
    categoryId: 'peptideos',
    parentId: 'agonistas-glp1',
    shortDescription:
      'Agonista duplo GIP + GLP-1 — Mounjaro® (diabetes) e Zepbound® (obesidade); aplicação semanal.',
    description:
      'A tirzepatida é o primeiro agonista duplo que ativa receptores de GIP (polipeptídeo insulinotrópico dependente de glicose) e GLP-1. Essa combinação produz efeitos sinérgicos em saciedade, controle glicêmico e perda de peso — em alguns estudos superando a semaglutida em magnitude de emagrecimento.\n\nAprovada para diabetes tipo 2 (Mounjaro®) e obesidade (Zepbound®). Nos estudos SURMOUNT, participantes perderam em média até 20% do peso corporal na dose mais alta, ao longo de 72 semanas, com suporte dietético.\n\nEfeitos colaterais similares aos de outros agonistas GLP-1: náusea, vômito, diarreia, constipação — geralmente diminuem com o tempo e titulação lenta. Atenção especial à massa muscular: atletas devem monitorar força e composição corporal durante o tratamento.\n\nMedicamento de prescrição exclusiva — avaliação médica obrigatória antes de iniciar.',
    benefits: [
      'Perda de peso potencialmente superior a agonistas GLP-1 simples em estudos.',
      'Melhora robusta de HbA1c no diabetes tipo 2.',
      'Ação dupla GIP + GLP-1 — mecanismo inovador na classe.',
      'Aplicação semanal com caneta pré-preenchida.',
      'Requer acompanhamento médico e dieta com proteína suficiente.',
    ],
    whenToTake: 'Mesmo dia da semana — titulação gradual conforme protocolo médico.',
    usage: 'Injeção subcutânea semanal; refrigerar; não compartilhar canetas.',
    icon: 'medical-outline',
    color: '#8B5CF6',
  },
  {
    id: 'liraglutida',
    name: 'Liraglutida',
    categoryId: 'peptideos',
    parentId: 'agonistas-glp1',
    shortDescription:
      'Análogo do GLP-1 de aplicação diária — Saxenda® (obesidade) e Victoza® (diabetes).',
    description:
      'A liraglutida foi um dos primeiros agonistas GLP-1 de uso clínico amplo. Diferente da semaglutida e tirzepatida (semanais), exige aplicação diária — o que pode reduzir a adesão, mas oferece controle mais fino da dose em alguns protocolos.\n\nSaxenda® é indicada para obesidade (IMC ≥ 30 ou ≥ 27 com comorbidades); Victoza® para diabetes tipo 2. Os mecanismos são os mesmos da classe: saciedade, retardo gástrico, melhora glicêmica.\n\nEm estudos, a perda de peso com liraglutida (Saxenda) fica em torno de 5–10% do peso corporal — menor que semaglutida e tirzepatida em comparações diretas recentes, mas com longo histórico de segurança e eficácia comprovada.\n\nPara atletas em cutting ou recomposição corporal, pode ser ferramenta médica quando há indicação clínica real (obesidade, diabetes) — não como atalho estético. Treino de força e proteína alta são essenciais para preservar performance.',
    benefits: [
      'Perda de peso moderada e sustentada em estudos clínicos.',
      'Histórico longo de uso — perfil de segurança bem documentado.',
      'Controle glicêmico no diabetes tipo 2 (Victoza).',
      'Dose diária ajustável — titulação flexível.',
      'Medicamento de prescrição — indicação médica necessária.',
    ],
    whenToTake: 'Mesmo horário todos os dias, com ou sem alimentos.',
    usage: 'Caneta injetável diária; iniciar 0,6 mg e titular até dose alvo.',
    icon: 'medical-outline',
    color: '#8B5CF6',
  },
  ...PEPTIDE_EXTRA_PRODUCTS,
  ...TESTOSTERONE_EXTRA_PRODUCTS,
];

export function getSportsNutritionProduct(id: SportsNutritionProductId): SportsNutritionProduct {
  const found = SPORTS_NUTRITION_PRODUCTS.find((product) => product.id === id);
  if (!found) throw new Error(`Produto de nutrição esportiva desconhecido: ${id}`);
  return found;
}

export function getSportsNutritionCategory(categoryId: SportsNutritionCategory['id']) {
  const found = SPORTS_NUTRITION_CATEGORIES.find((category) => category.id === categoryId);
  if (!found) throw new Error(`Categoria de nutrição esportiva desconhecida: ${categoryId}`);
  return found;
}

export function getSportsNutritionProductsByCategory(categoryId: SportsNutritionCategory['id']) {
  const inCategory = SPORTS_NUTRITION_PRODUCTS.filter((product) => product.categoryId === categoryId);
  if (categoryId === 'peptideos') {
    return sortProductsByDisplayOrder(inCategory, PEPTIDE_DISPLAY_ORDER);
  }
  return inCategory.sort((a, b) => {
    const aTop = a.parentId ? 1 : 0;
    const bTop = b.parentId ? 1 : 0;
    if (aTop !== bTop) return aTop - bTop;
    return a.name.localeCompare(b.name, 'pt-BR');
  });
}

export function getTopLevelSportsNutritionProducts() {
  const products = SPORTS_NUTRITION_PRODUCTS.filter((product) => !product.parentId);
  return products.sort((a, b) => {
    const aIndex = TOP_LEVEL_CATEGORY_ORDER.indexOf(a.categoryId);
    const bIndex = TOP_LEVEL_CATEGORY_ORDER.indexOf(b.categoryId);
    const safeA = aIndex === -1 ? TOP_LEVEL_CATEGORY_ORDER.length : aIndex;
    const safeB = bIndex === -1 ? TOP_LEVEL_CATEGORY_ORDER.length : bIndex;
    if (safeA !== safeB) return safeA - safeB;
    return a.name.localeCompare(b.name, 'pt-BR');
  });
}

export function getSportsNutritionCategoryProductCount(categoryId: SportsNutritionCategory['id']) {
  return SPORTS_NUTRITION_PRODUCTS.filter((product) => product.categoryId === categoryId).length;
}

export function getSportsNutritionChildProducts(parentId: SportsNutritionProductId) {
  const children = SPORTS_NUTRITION_PRODUCTS.filter((product) => product.parentId === parentId);
  if (PEPTIDE_DISPLAY_ORDER.includes(parentId)) {
    return sortProductsByDisplayOrder(children, PEPTIDE_DISPLAY_ORDER);
  }
  if (TESTOSTERONE_DISPLAY_ORDER.includes(parentId)) {
    return sortProductsByDisplayOrder(children, TESTOSTERONE_DISPLAY_ORDER);
  }
  return children.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
}
