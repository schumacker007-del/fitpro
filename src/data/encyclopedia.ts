import {
  EncyclopediaArticle,
  EncyclopediaArticleId,
  EncyclopediaCategory,
  EncyclopediaCategoryId,
} from '../types';

export const ENCYCLOPEDIA_INTRO =
  'Textos explicativos organizados por tema. Os conteúdos serão adicionados aqui em breve.';

/**
 * Cadastre aqui as categorias (submenus) da enciclopédia.
 */
export const ENCYCLOPEDIA_CATEGORIES: EncyclopediaCategory[] = [
  {
    id: 'retencao-agua-perda-peso',
    title: 'Como a retenção de água afeta a perda de peso',
    subtitle: 'Água corporal, balança e definição',
    description:
      'Por que a balança oscila mesmo com dieta e treino — e o que a retenção hídrica tem a ver com isso.',
    icon: 'water-outline',
    color: '#0EA5E9',
  },
  {
    id: 'pesos-livres-ou-aparelhos',
    title: 'Pesos livres ou aparelhos são mais eficazes?',
    subtitle: 'Comparativo para hipertrofia e força',
    description:
      'Comparativo entre pesos livres e aparelhos — vantagens, limitações e como combinar os dois.',
    icon: 'barbell-outline',
    color: '#F97316',
  },
  {
    id: 'celulite',
    title: 'Celulite',
    subtitle: 'Aspecto da pele e composição corporal',
    description:
      'Entenda o que é celulite, fatores que influenciam sua aparência e estratégias realistas de abordagem.',
    icon: 'body-outline',
    color: '#EC4899',
    image: require('../../assets/encyclopedia/celulite.png'),
  },
  {
    id: 'imc',
    title: 'Como calcular o índice de massa corporal (IMC)?',
    subtitle: 'Peso, altura e classificação',
    description:
      'Aprenda a calcular o IMC, interpretar os resultados e entender suas limitações como indicador de saúde.',
    icon: 'calculator-outline',
    color: '#3B82F6',
    image: require('../../assets/encyclopedia/imc.png'),
  },
  {
    id: 'abdomen-perfeito',
    title: 'Como conquistar um abdômen perfeito?',
    subtitle: 'Treino, dieta e definição abdominal',
    description:
      'Desenvolvimento do reto abdominal, carga progressiva, dieta para reduzir gordura e frequência ideal de treino.',
    icon: 'fitness-outline',
    color: '#22C55E',
  },
  {
    id: 'gluteos-pernas',
    title: 'Como malhar os glúteos e não sobrecarregar as pernas?',
    subtitle: 'Proporção, técnica e dieta para pernas e quadris',
    description:
      'Proporções musculares, agachamento até 90°, máquina Smith, dieta e desenvolvimento equilibrado de quadríceps, glúteos e posteriores.',
    icon: 'walk-outline',
    color: '#A855F7',
  },
  {
    id: 'medicoes-corporais',
    title: 'Como realizar as medições corporais corretamente?',
    subtitle: 'Fita métrica, pontos de medida e acompanhamento',
    description:
      'Guia completo para medir circunferências corporais, acompanhar o progresso e ajustar treino e dieta com precisão.',
    icon: 'resize-outline',
    color: '#14B8A6',
  },
  {
    id: 'ganho-massa-muscular',
    title: 'Componentes cruciais no ganho de massa muscular',
    subtitle: 'Treino, dieta e descanso para hipertrofia',
    description:
      'Princípios de treino intensivo, exercícios básicos e de isolamento, divisão semanal, alimentação e sono para ganho de massa.',
    icon: 'trending-up-outline',
    color: '#EF4444',
  },
  {
    id: 'agua-no-treino',
    title: 'Devo beber água ao me exercitar?',
    subtitle: 'Hidratação, desempenho e recuperação',
    description:
      'Por que beber água durante o treino melhora o transporte de oxigênio, reduz o acúmulo de ácido lático e protege o desempenho.',
    icon: 'water-outline',
    color: '#0EA5E9',
  },
  {
    id: 'treinar-doente',
    title: 'Devo continuar me exercitando se estiver doente ou indisposto?',
    subtitle: 'Quando treinar, quando pausar e como ajustar a carga',
    description:
      'Regra do pescoço, sintomas que exigem repouso, como reduzir intensidade e quando consultar médico ou treinador.',
    icon: 'medkit-outline',
    color: '#8B5CF6',
  },
  {
    id: 'exercicio-jovem-saudavel',
    title: 'Devo praticar esportes e exercícios mesmo sendo jovem e saudável?',
    subtitle: 'Benefícios para saúde, corpo e bem-estar',
    description:
      'Nove razões para manter a atividade física mesmo sem doenças — do coração ao sono, passando por músculos, humor e recuperação.',
    icon: 'heart-outline',
    color: '#F43F5E',
  },
  {
    id: 'horario-treino',
    title: 'Em que horário do dia é melhor se exercitar?',
    subtitle: 'Manhã, tarde ou noite — o que importa?',
    description:
      'Ritmos biológicos, desempenho, jejum e regularidade — como escolher o melhor horário para treinar na sua rotina.',
    icon: 'time-outline',
    color: '#F59E0B',
  },
  {
    id: 'estagnacao-treino',
    title: 'Estagnação no treino e por que isso acontece',
    subtitle: 'Efeito platô, adaptação muscular e periodização',
    description:
      'Por que o progresso para após meses de treino repetido — e como quebrar o platô com sobrecarga, recuperação e mudança de programa.',
    icon: 'trending-flat-outline',
    color: '#6366F1',
  },
  {
    id: 'exercicios-basicos',
    title: 'Exercícios básicos',
    subtitle: 'Multiarticulares, pesos livres e fundamentos do treino',
    description:
      'O que são exercícios básicos, os movimentos clássicos e por que devem ser a base do programa — de iniciantes a avançados.',
    icon: 'barbell-outline',
    color: '#10B981',
  },
  {
    id: 'exercicios-isolados',
    title: 'Exercícios isolados',
    subtitle: 'Trabalho qualitativo de um músculo ou grupo',
    description:
      'O que são exercícios isolados, quando usá-los, suas limitações e exemplos clássicos para modelar músculos específicos.',
    icon: 'locate-outline',
    color: '#06B6D4',
  },
  {
    id: 'carga-axial',
    title: 'Exercícios com carga axial na espinha dorsal',
    subtitle: 'Coluna vertebral, exercícios e segurança',
    description:
      'Entenda o que é carga axial, quais exercícios sobrecarregam mais a coluna e como adaptar o treino com restrições nas costas.',
    icon: 'body-outline',
    color: '#78716C',
  },
  {
    id: 'fase-negativa',
    title: 'Fase negativa',
    subtitle: 'Repetições excêntricas, força e hipertrofia',
    description:
      'As três fases do movimento, o método de repetições negativas e como aplicá-lo com segurança para ganhar tamanho e força muscular.',
    icon: 'arrow-down-outline',
    color: '#DC2626',
  },
  {
    id: 'hipoxia',
    title: 'Hipóxia',
    subtitle: 'Oxigênio, altitude e desempenho atlético',
    description:
      'Falta de oxigênio nos tecidos durante o esforço físico ou em altitude — tipos, adaptação e treinamento hipóxico.',
    icon: 'pulse-outline',
    color: '#0891B2',
  },
  {
    id: 'intervalos-series',
    title: 'Intervalos entre séries',
    subtitle: 'Descanso, fisiologia muscular e tempo de treino',
    description:
      'Quanto descansar entre séries conforme repetições e carga — fibras rápidas e lentas, recomendações práticas e como otimizar o tempo de treino.',
    icon: 'timer-outline',
    color: '#84CC16',
  },
  {
    id: 'massagem-esportiva',
    title: 'Massagem esportiva',
    subtitle: 'Tipos, preparação e recuperação atlética',
    description:
      'Massagem de treinamento, preliminar e de recuperação — como preparar o atleta, reduzir lesões e acelerar a recuperação.',
    icon: 'hand-left-outline',
    color: '#0D9488',
  },
  {
    id: 'musculos-core',
    title: 'Músculos do core (núcleo)',
    subtitle: 'Estabilização, postura e equilíbrio',
    description:
      'O core reúne músculos profundos que estabilizam coluna e pelve — entenda sua composição, funções e como fortalecê-lo de forma equilibrada.',
    icon: 'shield-outline',
    color: '#7C3AED',
  },
  {
    id: 'super-series',
    title: 'O que são as super séries?',
    subtitle: 'Definição, intensidade e estrutura',
    description:
      'Dois exercícios consecutivos sem descanso — como montar super séries, aumentar a intensidade e quando usar mais de dois movimentos.',
    icon: 'layers-outline',
    color: '#D97706',
  },
  {
    id: 'carboidratos-simples-complexos',
    title: 'O que são carboidratos simples e carboidratos complexos?',
    subtitle: 'Rápidos e lentos — fontes, saciedade e metabolismo',
    description:
      'Entenda a diferença entre carboidratos simples e complexos, onde encontrá-los e como afetam açúcar no sangue, insulina e perda de peso.',
    icon: 'nutrition-outline',
    color: '#16A34A',
  },
  {
    id: 'esteroides-anabolizantes',
    title: 'O que são esteroides anabolizantes?',
    subtitle: 'Definição, mecanismo de ação e efeitos musculares',
    description:
      'Como os esteroides anabólicos imitam testosterona, aceleram a síntese de proteínas e por que seu uso sem indicação médica traz riscos graves.',
    icon: 'flask-outline',
    color: '#B45309',
  },
  {
    id: 'hormonios-androgenos',
    title: 'O que são hormônios andrógenos?',
    subtitle: 'Definição, efeitos metabólicos e principais tipos',
    description:
      'Entenda o que são os andrógenos, como afetam massa muscular, metabolismo e lipídios — e quais são os principais hormônios em homens e mulheres.',
    icon: 'male-female-outline',
    color: '#9333EA',
  },
  {
    id: 'anabolismo-catabolismo',
    title: 'O que é anabolismo, catabolismo e metabolismo?',
    subtitle: 'Síntese, degradação e equilíbrio metabólico',
    description:
      'Como o corpo constrói e degrada tecidos — anabolismo, catabolismo, hormônios envolvidos e o que fazer para manter um metabolismo equilibrado.',
    icon: 'swap-vertical-outline',
    color: '#059669',
  },
  {
    id: 'fisiculturismo',
    title: 'O que é fisiculturismo?',
    subtitle: 'Hipertrofia, definição muscular e treino de força',
    description:
      'O processo de modificar o corpo por meio de treino de força, dieta, suplementação e princípios de periodização — com foco em segurança e abordagem individualizada.',
    icon: 'trophy-outline',
    color: '#E11D48',
  },
  {
    id: 'frequencia-cardiaca',
    title: 'O que é frequência cardíaca e como calcular a sua zona alvo?',
    subtitle: 'FC máxima, zonas de treino e queima de gordura',
    description:
      'Fórmula 220 − idade, zonas de aquecimento a limite, exemplo prático de cálculo e como medir a frequência cardíaca em repouso.',
    icon: 'heart-circle-outline',
    color: '#EF4444',
  },
  {
    id: 'powerlifting',
    title: 'O que é levantamento de peso básico (powerlifting)?',
    subtitle: 'Triatlo de potência — agachamento, supino e terra',
    description:
      'O esporte de força em que o atleta vence a resistência do maior peso possível nos três movimentos clássicos de competição.',
    icon: 'barbell-outline',
    color: '#1D4ED8',
  },
  {
    id: 'whey-hipercalorico',
    title: 'O que é melhor tomar: whey ou hipercalórico?',
    subtitle: 'Proteína, carboidratos e ganho de massa muscular',
    description:
      'Comparativo entre whey protein e hipercalórico — quando usar cada um, vantagens, indicações e recomendações práticas de uso.',
    icon: 'nutrition-outline',
    color: '#CA8A04',
  },
  {
    id: 'pump',
    title: 'O que é o Pump?',
    subtitle: 'Inchaço muscular, fluxo sanguíneo e hipertrofia',
    description:
      'A sensação de pump durante o treino — o que causa o inchaço muscular, como usá-lo como marcador de estresse metabólico e como maximizá-lo na prática.',
    icon: 'fitness-outline',
    color: '#6366F1',
  },
  {
    id: 'drop-set',
    title: 'O que é um drop set?',
    subtitle: 'Séries com redução contínua de peso',
    description:
      'Técnica de intensificação em que se reduz a carga em 25% após a falha técnica e continua a série até não conseguir mais.',
    icon: 'barbell-outline',
    color: '#EA580C',
  },
  {
    id: 'obesidade-abdominal',
    title: 'Obesidade abdominal',
    subtitle: 'Gordura na cintura, riscos à saúde e medição',
    description:
      'Depósitos de gordura na região abdominal — causas, como detectar com fita métrica e riscos associados à saúde.',
    icon: 'body-outline',
    color: '#0D9488',
  },
  {
    id: 'osteopatia',
    title: 'Osteopatia',
    subtitle: 'Terapia manual esportiva e recuperação',
    description:
      'O que é osteopatia esportiva, técnicas empregadas, limitações científicas e como integrá-la à recuperação atlética com segurança.',
    icon: 'hand-left-outline',
    color: '#BE185D',
  },
];

/**
 * Cadastre aqui os artigos da enciclopédia.
 * Cada artigo pertence a uma categoria (categoryId) e pode ter várias seções de texto.
 */
export const ENCYCLOPEDIA_ARTICLES: EncyclopediaArticle[] = [
  {
    id: 'retencao-agua-perda-peso-texto',
    categoryId: 'retencao-agua-perda-peso',
    title: 'Como a retenção de água afeta a perda de peso?',
    shortDescription:
      'A perda de peso é frequentemente mascarada pela retenção de líquidos — flutuações de 1–2 kg por dia são comuns.',
    description:
      'A perda de peso é geralmente mascarada pela retenção de líquidos.\n\nA troca de água no corpo tem padrões variados, e flutua entre secreção e acúmulo. Isso pode resultar em diferenças de peso de 1–2 kg por dia.\n\nSeguem algumas situações em que o líquido pode ser retido, mascarando a perda de peso:',
    sections: [
      {
        label: 'Alimentos salgados e picantes',
        body:
          'Ingestão de grandes quantidades de alimentos salgados e picantes. O sal de cozinha (cloreto de sódio) está presente no corpo na forma de uma solução isotônica, com uma concentração aproximada de 0,9–1%. Ou seja, cada grama extra de sal, antes de deixar o corpo, retém 100 ml de água. Assim, 10 gramas de sal reterão um litro de água, o que garantirá um aumento de peso por quilograma.\n\nPara referência, 10 g de sal estão presentes em 200 g de peixe salgado e 100 g de peixe seco.',
      },
      {
        label: 'Consumo de álcool',
        body:
          'Álcool causa retenção de líquidos, assim como o sal. O álcool e seus produtos de decomposição requerem diluição em água para concentrações menos tóxicas.',
      },
      {
        label: 'Ciclo menstrual',
        body:
          'Muitas mulheres experimentam um aumento no acúmulo de água na segunda fase do ciclo menstrual, uma a duas semanas antes do próximo período mensal. Às vezes, as alterações de peso associadas ao ciclo são muito significativas e chegam a 3–5 kg.\n\nUm ponto interessante: o resultado de um curto período semanal de perda de peso muitas vezes depende da fase do ciclo em que essa perda de peso começou. É importante mensurar essa retenção de água imediatamente após o final da menstruação.',
      },
      {
        label: 'Treino intenso',
        body:
          'Retenção de água após um treino intenso. Nesse caso, também pode haver retenção de líquidos associada ao inchaço dos músculos sobrecarregados e não acostumados.',
      },
      {
        label: 'Conclusão',
        body:
          'Se você está seguindo uma dieta e um programa de exercícios, mas não vê como resultado a perda de peso esperada em alguns dias ou uma semana, não tire conclusões precipitadas sobre a ineficácia dos seus esforços.\n\n• Na maioria dos casos, isso não ocorre devido à falta de perda de tecido adiposo, mas sim à retenção temporária de líquidos no corpo.\n• Não foque apenas nos números diários na balança, mas também analise a dinâmica ao longo de uma ou duas semanas.\n• Também é útil monitorar as mudanças no volume corporal e no bem-estar.\n\nA perda de gordura é um processo gradual que nem sempre se reflete imediatamente na balança devido às flutuações naturais dos níveis de água no corpo.\n\nPaciência e consistência em relação à perda de peso são muito mais importantes do que a busca por resultados muito rápidos.',
      },
    ],
    icon: 'water-outline',
  },
  {
    id: 'pesos-livres-ou-aparelhos-texto',
    categoryId: 'pesos-livres-ou-aparelhos',
    title: 'Pesos livres ou aparelhos são mais eficazes?',
    shortDescription:
      'Pesos livres envolvem mais músculos; aparelhos isolam melhor — os dois têm lugar no treino.',
    description:
      'Pesos livres são equipamentos esportivos não fixados, como barra, kettlebell e halteres.\n\nAo usar pesos livres, seu corpo é forçado a manter o equilíbrio entre o equipamento e o corpo, e coordenar os movimentos com a ajuda dos músculos auxiliares.\n\nDo ponto de vista da biomecânica, os pesos livres são a trajetória mais natural e fisiológica do movimento do equipamento com a amplitude máxima.',
    sections: [
      {
        label: 'Vantagens dos pesos livres',
        body:
          'A vantagem no uso de pesos livres é o envolvimento de um grande número de músculos no movimento. Além de realmente trabalhar os músculos-alvo, os músculos auxiliares e os músculos estabilizadores são envolvidos.\n\nPor exemplo, no supino clássico, participam os músculos peitorais (alvo), tríceps e deltóides (auxiliares), assim como os músculos das costas, abdominais e pernas.\n\nQuanto mais fibras musculares estiverem envolvidas no trabalho de um movimento, mais pré-requisitos para o crescimento muscular haverá. A busca de massa e força muscular está diretamente associada ao uso de pesos livres na maioria dos programas de treino.',
      },
      {
        label: 'Aparelhos — eficácia e isolamento',
        body:
          'Aparelhos têm, essencialmente, a mesma eficácia de trabalho sobre os músculos que os pesos livres. No entanto, os músculos são trabalhados de maneira diferente.\n\nA principal vantagem dos aparelhos é o isolamento (permitem movimentos em que apenas os músculos-alvo trabalham, sem a participação dos auxiliares).\n\nÉ importante entender que existem alguns grupos musculares que são muito difíceis de se isolar utilizando pesos livres. Um exemplo nítido são os músculos da panturrilha. O aparelho para treinar os músculos das pernas é o modo mais eficaz de realizar levantamentos sustentando-se pelo antepé. Portanto, não despreze os aparelhos; vale a pena usá-los com competência e eficácia.',
      },
      {
        label: 'Articulações e segurança',
        body:
          'Os aparelhos são projetados para reduzir a carga sobre as articulações, porque, ao utilizá-los, a posição do corpo é fixa ao máximo. Eles são perfeitos para atletas que trabalham na forma dos músculos, bem como pessoas com traumas físicos ou idosos.\n\nUma carga moderadamente pesada associada a um grande número de repetições reduzirá a carga sobre a articulação enquanto estimula os músculos-alvo.\n\nMas, é importante mencionar que os aparelhos não evitam completamente a ocorrência de lesões, nem são 100% seguros.\n\nVale a pena prestar a mesma atenção à técnica de realização de exercícios em aparelhos e em exercícios com pesos livres. Infelizmente, você pode se lesionar executando os dois tipos de atividades.',
      },
      {
        label: 'Conclusão e recomendações',
        body:
          'Não existe uma única abordagem correta na escolha de um plano de treino. Escolha a abordagem mais inteligente na elaboração de seu programa de treino com base em seus objetivos.\n\nVale a pena combinar os dois métodos: treino com pesos livres e treino em aparelhos. Tire o melhor de cada método.\n\nPara fins de ganho de massa, desenvolvimento de força e perda de peso em qualquer idade e grau de condicionamento físico, dê preferência a pesos livres, complementando-os com exercícios em aparelhos.\n\nO erro dos iniciantes é focar nas máquinas. Você deve obter os principais incentivos de crescimento com exercícios multiarticulares pesados com pesos livres.',
      },
    ],
    icon: 'barbell-outline',
  },
  {
    id: 'celulite-texto',
    categoryId: 'celulite',
    title: 'Celulite',
    shortDescription:
      'A celulite é um dos mais comuns problemas femininos associados à aparência e à beleza.',
    description:
      'Celulite é uma alteração estrutural na camada de gordura subcutânea, resultando em distúrbios na microcirculação e no fluxo linfático, se manifestando externamente na forma de alterações na pele, semelhantes à "casca da laranja". Posteriormente, ocorre a degeneração do tecido adiposo e a doença se torna irreversível.',
    sections: [
      {
        label: 'Aspectos médicos',
        body:
          'Do ponto de vista médico, a celulite não é uma doença e é considerada uma variação da norma.\n\nA celulite é mais comum em mulheres em idade pós-puberal (ocorre em 90% dos casos), mas às vezes ocorre em homens (por exemplo, com falta de hormônios androgênicos).\n\nA região glútea, os quadris e o abdômen são atingidos com maior frequência.\n\nAtualmente, a patogênese e os mecanismos fisiológicos dessa condição não são totalmente conhecidos, portanto, o tratamento em muitos casos é ineficaz.',
      },
      {
        label: 'Causas da celulite',
        body:
          '• Antecedentes genéticos\n• Perturbação da microcirculação do tecido adiposo subcutâneo\n• Alterações hormonais no corpo\n• Hipoandrogenismo em homens\n• Hiperestrogenismo em mulheres\n• Desequilíbrio dos hormônios da glândula tireoide e da prolactina em mulheres\n• Estresse e altos níveis de catabolismo\n• Inflamação e desenvolvimento de infecção no tecido adiposo subcutâneo',
      },
      {
        label: 'Fatores predisponentes',
        body:
          '• Dieta errada\n• Obesidade\n• Baixa atividade física\n• Intoxicação do corpo (tabagismo, abuso de álcool, medicamentos)',
      },
      {
        label: 'Recomendações — medidas de prevenção',
        body:
          '• Uma dieta saudável\n• Perda de peso quando há sobrepeso\n• Atividades aeróbicas e de força\n• Abandono de hábitos viciosos, como tabagismo, álcool e drogas\n• Ingestão periódica de vitaminas, minerais e ômega 3\n• Massagem ativa de áreas problemáticas',
      },
    ],
    icon: 'body-outline',
  },
  {
    id: 'imc-texto',
    categoryId: 'imc',
    title: 'Como calcular o índice de massa corporal (IMC)?',
    shortDescription:
      'O índice de massa corporal é um valor que permite avaliar o grau de correspondência entre o peso e a altura de uma pessoa e, assim, verificar indiretamente se a massa é insuficiente, normal ou excessiva.',
    description:
      'IMC é a relação entre o peso corporal em quilogramas e o quadrado da altura expressa em metros (kg / m²).',
    sections: [
      {
        label: 'Cálculo do IMC',
        body:
          'Pese-se e meça sua altura (por exemplo, sua altura é de 1,56 metro).\n\nDivida seu peso (por exemplo, 58 kg) pela altura ao quadrado (1,56 × 1,56 = 2,4336) e obtenha o resultado:\n\n58 / 2,4336 = 23,83.',
      },
      {
        label: 'Interpretação dos resultados',
        body:
          'O número que obtemos é o índice de massa corporal (IMC).\n\n• 16 ou menos — déficit de massa corporal pronunciado\n• 16–18,4 — peso corporal insuficiente\n• A regra para mulheres é 18,7–23,8 e 20,1–25,0 para homens\n• 25–30 — excesso de peso (pré-obesidade)\n• 30–35 — obesidade de primeiro grau\n• 35–40 — obesidade de segundo grau\n• 40 ou mais — obesidade de terceiro grau',
      },
      {
        label: 'Importante',
        body:
          'Para pessoas que se exercitam regularmente e ganham massa muscular, calcular o IMC nem sempre é relevante, já que pode oferecer resultados distorcidos. Os músculos pesam significativamente mais do que a gordura, portanto, em um cenário com uma alta porcentagem de massa muscular, o IMC frequentemente indica excesso de peso ou até mesmo obesidade, apesar de uma excelente condição física.\n\nPara uma avaliação mais precisa da composição corporal nesse caso, a bioimpedância seria mais adequada.',
      },
      {
        label: 'Recomendações',
        body:
          '• Se o índice for menor que 18, o peso não é suficiente — você precisa comer para ganhar massa e evitar perder mais peso\n• Se o número estiver entre 18 e 25, seu peso está normal',
      },
    ],
    icon: 'calculator-outline',
  },
  {
    id: 'abdomen-perfeito-texto',
    categoryId: 'abdomen-perfeito',
    title: 'Como conquistar um abdômen perfeito?',
    shortDescription:
      'O abdômen responde a carga progressiva como qualquer músculo — mas a definição depende sobretudo da dieta e da redução de gordura corporal.',
    description:
      'O abdômen é um músculo plano do reto abdominal, que começa no tórax inferior e termina na cintura pélvica. A separação em "gomos" ocorre devido às constrições horizontais e verticais dos tendões.',
    sections: [
      {
        label: 'Desenvolvimento muscular',
        body:
          'Se você deseja desenvolver um abdômen robusto, os exercícios voltados para o seu desenvolvimento devem ser realizados com peso, adicionando carga constantemente.\n\nLevando em consideração o fato de que o músculo do reto abdominal não difere de outros músculos, o princípio de cargas cada vez maiores funciona muito bem com ele. O número recomendado de repetições do exercício é de 15 a 25.',
      },
      {
        label: 'Dieta e visibilidade',
        body:
          'Se o seu abdômen estiver bem desenvolvido, mas não visível devido à camada de gordura, provavelmente você não conseguirá fazê-lo aparecer fazendo um grande número de repetições e exercícios.\n\nÉ nesse cenário que sua dieta passa ao primeiro plano. A dieta é a parte mais importante para se livrar da camada de gordura no abdômen, para conseguir vê-lo. Afinal, por natureza, ele tem a forma de "gomos" — apenas estão escondidos debaixo da gordura.',
      },
      {
        label: 'Mitos sobre perda de gordura localizada',
        body:
          'O erro de muitas pessoas é acreditar que somente o exercício irá ajudá-las a perder gordura na região abdominal. Na verdade, não há queima de gordura apenas com o exercício.\n\nAlém disso, bambolê ou o uso de cremes ou cintas "queima de gorduras" também não ajudará.\n\nVocê pode se livrar da gordura subcutânea em todo o corpo, mas não em um único local específico.',
      },
      {
        label: 'Cardio, alimentação e biotipo',
        body:
          'Para visualizar o seu abdômen, você precisa fazer exercícios aeróbicos ou de cárdio, além de revisar e corrigir a alimentação. Isso inclui o aumento do consumo de proteína e a diminuição no consumo de carboidratos. Para alguns, apenas a implementação de exercícios aeróbicos será suficiente.\n\nO efeito e os métodos de queima de gordura dependem do biotipo e da quantidade de gordura. À medida que a camada de gordura sob a pele diminui, ela também diminui no abdômen, e o abdômen começa a ficar visível através da pele e da gordura remanescente.',
      },
      {
        label: 'Hipertrofia vs definição',
        body:
          'Somente a combinação de uma dieta balanceada e específica com um treinamento altamente intensivo permite que você perceba o que alcançou durante o ganho de massa ativo.\n\nDurante o treino de força e hipertrofia, os exercícios abdominais são realizados com pesos e o número de repetições não deve ser superior a 20–25.\n\nNo período de formação (ou no chamado período de "secagem"), exercícios que usam o peso do corpo podem ser suficientes, mas o número de repetições deve aumentar para 30–40.',
      },
      {
        label: 'Escolha dos exercícios',
        body:
          'As séries durante o desenvolvimento dos músculos abdominais são estritamente individuais. Cada atleta tem seus exercícios favoritos — aqueles considerados os mais benéficos no desenvolvimento de seu abdômen e, mais importante, os mais agradáveis.\n\nO conselho aqui é: escolha 2 ou 3 exercícios abdominais (para os músculos superior, inferior e oblíquo) e inclua-os em seus programas de treinamento.',
      },
      {
        label: 'Recomendações',
        body:
          'Você não deve treinar o abdômen com uma frequência maior do que 2 a 3 vezes por semana.',
      },
    ],
    icon: 'fitness-outline',
  },
  {
    id: 'gluteos-pernas-texto',
    categoryId: 'gluteos-pernas',
    title: 'Como malhar os glúteos e não sobrecarregar as pernas?',
    shortDescription:
      'Pernas e quadris bonitos dependem das proporções entre os músculos — e é impossível isolar completamente o trabalho dos glúteos.',
    description:
      'Pernas e quadris bonitos são formados, em primeiro lugar, pelas proporções de cada músculo da perna.\n\nÉ impossível exercitar os glúteos separadamente, uma vez que o movimento envolve vários grupos musculares. Portanto, exercitar as pernas ou as costas envolve o abdômen no processo; ou, ao fazer abdominais, as costas também são envolvidas no processo.\n\nAlém disso, ao exercitar os glúteos, você inclui todos os grupos musculares no exercício — alguns trabalham mais, outros menos.',
    sections: [
      {
        label: 'Agachamento e amplitude',
        body:
          'No agachamento abaixo de 90 graus, você sempre inclui o quadríceps no trabalho principal. Caso não queira quadríceps muito desenvolvidos, seja firme e não ultrapasse 90 graus ao agachar.\n\nVocê deve agachar até esse ponto ou parar pouco antes, mantendo as costas retas e transferindo toda a carga para a parte de trás das coxas e glúteos.',
      },
      {
        label: 'Máquina Smith',
        body:
          'A máquina Smith é ideal para esse fim. Nela, você pode facilmente controlar a posição das costas e das pernas.\n\nRecomenda-se dar um pequeno passo à frente, encostar-se na barra e realizar agachamentos até 90 graus.\n\nNão comece o exercício com muito peso. Aprenda a sentir os músculos das costas, coxas e glúteos.',
      },
      {
        label: 'Proporção entre quadríceps, glúteos e posteriores',
        body:
          'Se lhe parecer que seu quadríceps se desenvolve mais rápido do que, por exemplo, os glúteos ou isquiotibiais, preste atenção à sua dieta (o excesso de calorias leva ao crescimento de massa muscular e gordurosa) e também mude a técnica do treino que está usando, para trabalhar a parte de trás da coxa, não a parte da frente. Dessa forma, suas pernas serão desenvolvidas proporcionalmente.\n\nNo entanto, o volume dos seus músculos está diretamente relacionado à sua dieta.',
      },
      {
        label: 'Dieta, metabolismo e gordura nas pernas',
        body:
          'Se você reduz o consumo de carboidratos rápidos (açúcar, frutose) enquanto acrescenta mais atividade física, obterá uma camada de gordura mais fina.\n\nSe você não tem um metabolismo alto (como os ectomorfos têm), terá que reduzir o consumo de carboidratos.\n\nSe você não mantém um padrão de dieta e sono constante, seu peso aumentará, incluindo a camada de gordura das pernas. Além da energia não gasta dos carboidratos, que é direcionada aos depósitos de gordura, carboidratos rápidos (simples) retêm água no organismo, o que também resulta em remodelamento do corpo.',
      },
      {
        label: 'Repetições e progressão de carga',
        body:
          'Faça muitas repetições, concentre-se no trabalho dos músculos, aprenda como ativá-los no exercício. Depois de algumas semanas, você pode gradualmente aumentar o peso.\n\nConsidere todos esses fatores para atingir seu objetivo com a velocidade mais eficaz.',
      },
    ],
    icon: 'walk-outline',
  },
  {
    id: 'medicoes-corporais-texto',
    categoryId: 'medicoes-corporais',
    title: 'Como realizar as medições corporais corretamente?',
    shortDescription:
      'Medir o corpo com fita métrica ajuda a acompanhar mudanças que o espelho nem sempre mostra — e a ajustar treino e dieta a tempo.',
    description:
      'A determinação da circunferência de uma parte do corpo é chamada de medição.\n\nEssa é apenas uma pequena parte da antropometria humana completa. Conseguir medir o seu corpo é importante para o preparo físico e a musculação.\n\nAs medidas ajudam a acompanhar a dinâmica do seu progresso. Visualmente, nem sempre é possível determinar se a circunferência de parte do seu corpo mudou ou não e, graças à fita métrica, você pode descobrir qualquer mínima alteração. Se não houver alterações, você saberá que precisa ajustar seu plano de treino.',
    sections: [
      {
        label: 'Por que medir o corpo?',
        body:
          'Com base em todas as informações coletadas, você pode gerenciar seu processo de treino e ajustar seu programa.\n\nNo início esse processo parecerá monótono; porém, quando você se envolver e ver os primeiros resultados no espelho, isso começará a motivá-lo de forma concreta a caminhar em direção ao seu objetivo.',
      },
      {
        label: 'Pontos de medição — pernas e tronco',
        body:
          '1. Tornozelos (onde o pé e a perna inferior se conectam). Fique em pé com as duas pernas retas. Meça a parte mais fina, acima dos ossos do tornozelo. (Observação: este é um indicador da estrutura esquelética; quase nunca muda.)\n\n2. Panturrilha (músculo gastrocnêmio). Fique em pé com as duas pernas retas, com uma delas levantada na ponta do pé. Meça a circunferência da parte mais larga do músculo da panturrilha.\n\n3. Coxa. Fique em pé com as duas pernas retas, uma ligeiramente à frente da outra, com os músculos da coxa a ser medida tensionados. Meça a circunferência da parte mais larga (terço superior da coxa) sob o músculo glúteo.\n\n4. Nádegas. Fique em pé com os pés juntos. Passe a fita ao longo da linha horizontal mais saliente das nádegas.\n\n5. Cintura. Em uma expiração relaxada, sem encolher a barriga. Passe a fita ao longo da parte mais estreita (se sua cintura for definida) ou no nível do umbigo.',
      },
      {
        label: 'Pontos de medição — tronco superior e braços',
        body:
          '6. Peito. Em um estado calmo (não na inspiração ou expiração). Passe a fita ao longo da linha mais saliente dos músculos peitorais e das escápulas.\n\n7. Pescoço. Cabeça em uma posição neutra. Meça a circunferência na parte do meio, não na mais larga.\n\n8. Cintura escapular. Fique em pé, com os braços relaxados ao lado do corpo. Passe a fita ao redor da circunferência mais larga dos ombros, geralmente no nível dos deltoides médios.\n\n9. Bíceps. Feche a mão em punho, levante o cotovelo até a altura do ombro, dobre o braço o máximo possível e supine (gire para dentro, em sua direção) o punho. Meça a parte mais larga (o pico).\n\n10. Antebraços. Estique o braço à sua frente e tensione os músculos fechando o punho. Meça a parte mais larga, mais perto do cotovelo.\n\n11. Punho. Braço relaxado. Meça a parte mais fina, logo atrás do osso saliente. (Observação: este é um indicador da estrutura esquelética; quase nunca muda.)',
      },
      {
        label: 'Recomendações',
        body:
          '• Faça medições pela manhã, com o estômago vazio e, de preferência, no mesmo horário todos os dias. Assim, não haverá erros derivados das condições de medição.\n\n• As medições são feitas usando uma fita métrica. É muito importante colocar a fita ao longo do eixo do osso e não na diagonal, obliquamente ou transversalmente. Ela deve ficar rente à pele, mas sem apertá-la.\n\n• Faça medições nos mesmos locais, e várias vezes (2–3), para uma avaliação mais precisa.\n\n• Mantenha um diário de medição e um arquivo de fotos pessoais. Tire fotos (vista frontal, traseira e lateral) a cada 2–3 meses. Dessa forma, você pode monitorar o seu progresso não apenas com estatísticas, mas com uma avaliação visual. Esses resultados o inspirarão para continuar avançando.',
      },
    ],
    icon: 'resize-outline',
  },
  {
    id: 'ganho-massa-muscular-texto',
    categoryId: 'ganho-massa-muscular',
    title: 'Componentes cruciais no ganho de massa muscular',
    shortDescription:
      'Ganhar massa é um processo que depende de treino, dieta e descanso — com carga progressiva, técnica e consistência.',
    description:
      'O ganho de massa muscular se refere a um processo complexo de múltiplos aspectos, orientado não apenas pelo treino, mas também pela dieta e descanso.',
    sections: [
      {
        label: 'Treino intensivo — princípios gerais',
        body:
          'Os princípios de treino são diferentes para cada pessoa e dependem de muitos fatores, por exemplo:\n\n• o nível de treinamento do atleta\n• o tipo de composição corporal\n• o estado de saúde etc.\n\nPortanto, aqui propomos valores e recomendações médias que podem ser básicas, mas que precisam ser ajustadas.\n\nO crescimento do tecido muscular ocorre em resposta ao treino sistemático e à carga progressiva. Para o progresso, é necessário aumentar constantemente a carga e criar novos estímulos para os músculos.\n\nConcentração no treino, técnica e segurança são cruciais para o ganho de massa muscular. A duração do treino não deve exceder uma hora e meia — caso contrário, pode levar à fadiga e ao aumento do nível de catabolismo (destruição do tecido muscular).',
      },
      {
        label: 'Frequência, volume e exercícios',
        body:
          'Você deve treinar 3–4 vezes por semana. Pode treinar dois grupos musculares por dia. Ao ganhar massa, é aconselhável combinar o trabalho de grupos musculares grandes e pequenos.\n\nAo treinar músculos grandes, aumentamos a concentração de hormônio do crescimento no sangue.\n\nEntre 3 e 4 exercícios devem ser realizados para cada grupo muscular. Além disso, deve-se enfatizar movimentos multiarticulares básicos.\n\nNúmero de repetições: 6 a 12.\nNúmero de séries: 3 a 4.',
      },
      {
        label: 'Exercícios básicos e de isolamento',
        body:
          'Exemplos de exercícios que afetam grupos musculares grandes e pequenos de forma simultânea:\n\n• Supino reto/inclinado — exercício básico para os músculos peitorais\n• Puxar a barra através de diferentes alças — exercício básico para os músculos das costas\n• Agachamentos com barra — exercício básico para os músculos das coxas e nádegas\n\nTambém é aconselhável incluir exercícios de isolamento no treino. São exercícios nos quais, em regra, uma articulação está envolvida e apenas um músculo é carregado:\n\n• Unindo os braços / estendendo os braços para os lados na polia — exercício para os músculos peitorais\n• Flexão/extensão do joelho em simulador — exercícios de isolamento para os músculos das coxas\n• Retração dos braços com halteres para os lados — exercício de isolamento para os músculos deltoides',
      },
      {
        label: 'Exemplo de divisão de treino clássica',
        body:
          '• Segunda-feira: músculos do peito + bíceps e ombros\n• Quarta-feira: músculos das pernas e quadril + deltoides\n• Sexta-feira: músculos das costas + tríceps\n\nRecomenda-se realizar um exercício aeróbico por 20 a 25 minutos, 2 vezes por semana.',
      },
      {
        label: 'Alimentação para ganho de massa',
        body:
          'Para o crescimento muscular, o corpo necessita de muito alimento para o material de desenvolvimento. O alimento deve ser suficiente não apenas para as necessidades fisiológicas, mas para criar novas estruturas — muito mais do que uma pessoa média consome.\n\nO treino cria microtraumas, através dos quais a massa é construída; mas é o que comemos que produz o efeito de ganho de massa.\n\nO básico da alimentação para ganho de massa muscular ainda difere pouco dos fundamentos simples da alimentação saudável, e inclui:\n\n• Várias refeições ao dia\n• Quantidade suficiente de proteína\n• Quantidades reduzidas de alimentos com carboidratos à tarde\n\nO principal conselho aqui é comer muito. Muito mesmo. No entanto, o fato de você estar ganhando massa não significa que pode comer muito pizza ou hambúrgueres. Você terá de manter uma rotina e, às vezes, uma dieta disciplinada.',
      },
      {
        label: 'Principais fontes alimentares',
        body:
          'Carboidratos: mingau (arroz, trigo sarraceno, variedades duras de macarrão), pão integral, frutas (como carboidratos rápidos e não mais do que 20 a 30% da porção diária de carboidratos), legumes.\n\nProteínas: carne e aves (frango, carne bovina magra e outras carnes magras), peixe, clara de ovo, laticínios (queijo cottage, leite e outros).\n\nGorduras: nozes e sementes, abacate, óleos (oliva, gergelim, cânhamo, linhaça etc.), óleo de peixe.',
      },
      {
        label: 'Descanso e recuperação',
        body:
          'O crescimento do tecido muscular ocorre precisamente durante o descanso. Portanto, deve ser dada a devida atenção a isso.\n\nA duração de uma noite de sono deve ser de pelo menos 7 horas. Caso não seja possível, você deve tentar dormir durante o dia. É durante o sono que ocorre a secreção máxima do hormônio do crescimento.\n\nÉ necessário evitar situações estressantes que afetam negativamente a síntese de proteínas no organismo e promovem o catabolismo.',
      },
    ],
    icon: 'trending-up-outline',
  },
  {
    id: 'agua-no-treino-texto',
    categoryId: 'agua-no-treino',
    title: 'Devo beber água ao me exercitar?',
    shortDescription:
      'Sim — a perda de líquidos pelo suor precisa ser reposta para manter o volume sanguíneo, o oxigênio nos músculos e a remoção do ácido lático.',
    description:
      'Ao se exercitar, os músculos aquecem, a circulação sanguínea aumenta e a temperatura corporal é elevada.\n\nO corpo esfria através da eliminação do suor, e essa perda de líquido precisa ser reabastecida.',
    sections: [
      {
        label: 'Desidratação e desempenho',
        body:
          'Caso contrário, a desidratação causa uma diminuição do volume sanguíneo, reduzindo assim a sua capacidade de transportar oxigênio para os tecidos.\n\nPortanto, o desempenho dos músculos e, é claro, o resultado do treino, dependem do oxigênio.',
      },
      {
        label: 'Ácido lático e recuperação',
        body:
          'Quando os músculos trabalham, produtos de decomposição são formados, em particular o ácido lático. Água é necessária para a sua remoção.',
      },
      {
        label: 'Recomendações',
        body:
          'O acúmulo de ácido lático leva à dor muscular e reduz a eficácia do treino. É por esse motivo que você deve beber água durante o exercício.',
      },
    ],
    icon: 'water-outline',
  },
  {
    id: 'treinar-doente-texto',
    categoryId: 'treinar-doente',
    title: 'Devo continuar me exercitando se estiver doente ou indisposto?',
    shortDescription:
      'Treinar doente nem sempre é proibido — mas sintomas abaixo do pescoço, febre ou tosse exigem cautela e, muitas vezes, repouso.',
    description:
      'Quando estamos habituados à prática esportiva diária, as pausas em períodos de doença são muito difíceis para nós. Sobretudo se é apenas uma doença leve e parece que nada de terrível acontecerá se formos dar uma corrida ou ir à academia.\n\nÀs vezes, está tudo bem. Às vezes, isso é até bom. No entanto, às vezes pode causar consequências graves e uma pausa ainda maior para o retorno dos exercícios. Não obstante, há situações em que uma grande pausa no treino é bastante indesejável (por exemplo, antes de uma competição).',
    sections: [
      {
        label: 'Regra do pescoço',
        body:
          'Se os sintomas são acima do pescoço e leves — como coriza ou garganta levemente dorida — você pode se exercitar. Às vezes, um nariz levemente entupido pode até melhorar com a prática esportiva.\n\nSe os sintomas de resfriado estão abaixo do pescoço — tosse, falta de ar ou indigestão — é melhor pular o treino.\n\nAdicione dores musculares e febre à lista de motivos para pular o treino. Treinar doente pode ser contagioso para outros e pode agravar sua condição.',
      },
      {
        label: 'Exercício e resfriado',
        body:
          'Sim, exercícios físicos podem ajudar a se livrar da congestão nasal e a estimular o sistema imunológico por um tempo. No entanto, isso não significa que praticar esportes reduz a duração do resfriado.',
      },
      {
        label: 'Como ajustar o treino',
        body:
          'É necessário diminuir a intensidade do treino e cortar sua duração pela metade. Se durante os primeiros 5 a 10 minutos você sentir uma melhora no seu bem-estar, poderá aumentar um pouco a carga. Ao sentir um leve desconforto, é melhor parar de se exercitar e descansar.\n\nEm exercícios intensos, seu corpo produz certos hormônios que reduzem a imunidade e o tornam ainda mais suscetível a outras infecções.\n\nAlém disso, sob esforço físico intenso, uma leve tosse pode evoluir para bronquite ou pneumonia.',
      },
      {
        label: 'Recomendações',
        body:
          'Você deve treinar apenas se seus sintomas forem leves, como pequena coriza ou dor de garganta. E é melhor consultar seu médico ou treinador.',
      },
    ],
    icon: 'medkit-outline',
  },
  {
    id: 'exercicio-jovem-saudavel-texto',
    categoryId: 'exercicio-jovem-saudavel',
    title: 'Devo praticar esportes e exercícios mesmo sendo jovem e saudável?',
    shortDescription:
      'Sim — a atividade física regular protege o coração, oxigena os tecidos, fortalece músculos e melhora humor, sono e recuperação.',
    description:
      'Mesmo jovem e sem doenças, praticar esportes e exercícios traz benefícios que vão muito além da aparência — da saúde cardiovascular ao bem-estar mental.',
    sections: [
      {
        label: 'Saúde cardiovascular e circulação',
        body:
          '1. A razão mais importante para praticar atividade física é a necessidade de melhorar a saúde, fortalecer o sistema cardiovascular e controlar a pressão alta. A prática regular de exercícios reduz o risco de coágulos sanguíneos e doenças cardiovasculares, e retarda o processo de envelhecimento do corpo.\n\n2. Quando você se exercita ativamente, todos os órgãos e tecidos do corpo são ricamente oxigenados, o que melhora a condição da pele, a circulação e acelera os processos de regeneração. Com a atividade regular, a função dos capilares (pequenos vasos sanguíneos) melhora, o que afeta o funcionamento de todos os órgãos.',
      },
      {
        label: 'Músculos, peso e metabolismo',
        body:
          '3. O exercício tonifica os músculos, tornando-os fortes e resistentes. O corpo fica mais firme e você se torna mais tonificado, atraente e flexível. Todo o sistema musculoesquelético se torna significativamente mais funcional. O exercício ajuda a alcançar e manter um peso ideal.\n\n8. O exercício aumenta o gasto energético diário, melhora a saúde metabólica e ajuda a normalizar a motilidade intestinal. Pessoas que se exercitam regularmente conseguem parar de fumar com mais facilidade e lidar com cargas físicas maiores, já que o suprimento de oxigênio para os tecidos melhora — algo que certamente é prejudicado pelo fumo.',
      },
      {
        label: 'Energia, apetite e sono',
        body:
          '4. A atividade física ajuda a controlar o apetite porque aumenta a quantidade de endorfinas e dopamina liberadas pelo cérebro. Esses hormônios ajudam a reduzir a fome "emocional" até que o corpo realmente precise de uma "recarga".\n\n5. O exercício ajuda a combater a fadiga crônica, aumentando suas reservas de energia e os níveis gerais de energia. O exercício fornece ao cérebro uma quantidade adicional de oxigênio, fazendo com que você se sinta com mais energia ao longo do dia.\n\n6. A prática regular de exercícios promove um sono mais profundo e reparador porque estimula a produção de endorfinas, que ajudam a aliviar a tensão nervosa acumulada durante o dia (pessoas sedentárias muitas vezes se sentem esgotadas no final do dia de trabalho, enquanto pessoas ativas sentem um cansaço agradável).',
      },
      {
        label: 'Bem-estar mental',
        body:
          'O exercício pode ajudar a prevenir estados depressivos e insônia não apenas porque alivia a tensão nervosa, mas também porque reduz o excesso de adrenalina e outros hormônios que contribuem para o estresse no corpo.\n\n7. A atividade física fortalece sua autoconfiança e eleva sua autoestima: você sente que pode melhorar seu bem-estar e sua aparência, independentemente da idade ou da condição física.',
      },
      {
        label: 'Recuperação e conclusão',
        body:
          '9. Um bom condicionamento físico ajuda a se recuperar mais rápido após doenças graves, cirurgias, lesões ou parto, aumentando a resistência e promovendo alterações mitocondriais e capilares nos músculos esqueléticos. Essas alterações melhoram a entrega e a utilização de oxigênio, acelerando assim a recuperação dos tecidos e a recuperação funcional geral do corpo.\n\nAlém dessas razões, cada um pode ter suas próprias motivações para começar a se exercitar.',
      },
    ],
    icon: 'heart-outline',
  },
  {
    id: 'horario-treino-texto',
    categoryId: 'horario-treino',
    title: 'Em que horário do dia é melhor se exercitar?',
    shortDescription:
      'Não há grande diferença entre treinar de manhã, à tarde ou à noite — o que importa é a regularidade, os ritmos biológicos e a sua rotina.',
    description:
      'Não há muita diferença entre treinar de manhã, à tarde ou à noite. Nosso corpo responderá ao esforço de acordo, dependendo do tipo de atividade.',
    sections: [
      {
        label: 'Introdução',
        body:
          'Não há muita diferença entre treinar de manhã, à tarde ou à noite. Nosso corpo responderá ao esforço de acordo, dependendo do tipo de atividade.\n\nSe o seu objetivo é perder peso, você vai emagrecer tanto de manhã quanto à noite. O mesmo se aplica ao ganho de massa muscular: faça os exercícios adequados, alimente-se corretamente e o crescimento muscular ocorrerá independentemente de você treinar de manhã ou à noite.',
      },
      {
        label: 'Ritmos biológicos',
        body:
          'Também é importante considerar seus ritmos biológicos — específicos e, consequentemente, o momento do dia em que você se sente com mais energia e força.\n\nCom base nesses ritmos biológicos, as pessoas geralmente se dividem em "matutinos" e "notívagos".\n\n"Matutinos" são aqueles que têm muita energia e produtividade pela manhã.\n\n"Notívagos", por outro lado, são o tipo de pessoa que atinge seus picos de energia mais perto da noite.',
      },
      {
        label: 'Perda de peso e jejum',
        body:
          'Quando se trata de perder peso, o que importa não é a hora no relógio, mas a regularidade dos treinos e o déficit calórico geral na dieta.\n\nUm treino em jejum pode aumentar o uso de ácidos graxos como combustível durante a sessão, mas a taxa de redução de gordura é determinada pelo balanço energético total ao longo do dia e da semana.\n\nComer antes de um treino não "bloqueia" a queima de gordura: o corpo realoca as fontes de energia ao longo do dia, então escolha um horário que se encaixe na sua rotina pessoal.',
      },
      {
        label: 'Desempenho e horário',
        body:
          'Para muitos, o desempenho de força e alta intensidade é um pouco maior à tarde: isso é auxiliado por uma temperatura corporal mais alta, melhor prontidão neuromuscular e estoques de glicogênio parcialmente reabastecidos com uma nutrição adequada.\n\nNo entanto, a resposta é individual: alguns acham mais conveniente treinar pela manhã. Para resultados duradouros, é mais importante focar na regularidade dos treinos e no aumento gradual da carga.\n\nTreinos no final da noite são aceitáveis desde que não piorem a qualidade do sono. Na maioria dos casos, recomenda-se terminar as atividades intensas 2 a 3 horas antes de dormir.',
      },
      {
        label: 'Recomendações',
        body:
          'A prática mostra que o horário ideal para os treinos é determinado pelos seus ritmos biológicos e pela sua rotina diária.\n\nIdentifique um horário que funcione para você e, se possível, mantenha-se fiel a ele: isso facilita a manutenção de uma rotina, o planejamento da nutrição, da recuperação e a obtenção de um progresso constante.\n\nA regularidade e a qualidade do trabalho são mais importantes do que os ponteiros do relógio.',
      },
    ],
    icon: 'time-outline',
  },
  {
    id: 'estagnacao-treino-texto',
    categoryId: 'estagnacao-treino',
    title: 'Estagnação no treino e por que isso acontece',
    shortDescription:
      'O efeito platô ocorre quando o corpo se adapta ao mesmo estímulo — para continuar evoluindo, é preciso sobrecarga progressiva e mudanças no programa.',
    description:
      'O efeito platô é o estado em que o crescimento de parâmetros físicos — força, massa muscular, resistência — é interrompido pela adaptação muscular a exercícios repetidos.',
    sections: [
      {
        label: 'O efeito platô',
        body:
          'O efeito platô é o estado do organismo do atleta no qual o crescimento de certos parâmetros físicos (força, massa muscular, resistência, etc.) é interrompido devido à adaptação muscular a exercícios repetidos.\n\nJá foi claramente demonstrado que a hipertrofia muscular ocorre apenas se o fator estimulador for maior do que os músculos estão acostumados. Por "fator estimulador", entenda-se uma sobrecarga ou carga que exceda o nível anterior.\n\nPara criar uma sobrecarga na musculação, uma técnica simples é utilizada: aumento progressivo dos pesos a cada treino.',
      },
      {
        label: 'Mudança de programa',
        body:
          'O programa de treino em musculação e levantamento de peso básico (powerlifting) exige ajuste constante ao longo de um ano; caso contrário, o efeito platô ocorre após 6 meses de treino com o mesmo programa.\n\nSe você é novo em esportes de força, lembre-se da importante regra da malhação: não treine com o mesmo programa por mais de seis meses.',
      },
      {
        label: 'Recomendações',
        body:
          '• Aumente as calorias da dieta\n• Tome vitaminas e minerais\n• Crie uma sobrecarga (o princípio da excitação ou choque)\n• Dê aos músculos tempo suficiente para se recuperar (aumento do número de dias de descanso entre os treinos para um grupo de músculos)\n• Mude regularmente o programa de treinamento\n• Use um treino intensivo (sob condições de sobretreinamento ou overtraining [sub-recuperação], o aumento na intensidade do treino pode agravar ainda mais esse processo e interromper completamente o avanço do desportista ou resultar em lesões. Sob essas condições, o ciclo de carga é necessário como parte da periodização)\n• Ciclos de carga',
      },
    ],
    icon: 'trending-flat-outline',
  },
  {
    id: 'exercicios-basicos-texto',
    categoryId: 'exercicios-basicos',
    title: 'Exercícios básicos',
    shortDescription:
      'Exercícios multiarticulares com peso livre que envolvem vários grupos musculares — a base mais eficaz para força e hipertrofia.',
    description:
      'Exercícios básicos são um tipo de exercício que envolve vários músculos ou grupos musculares, e várias articulações podem ser usadas simultaneamente. Como regra, são exercícios difíceis que são realizados com peso livre.',
    sections: [
      {
        label: 'O que são exercícios básicos',
        body:
          'Exercícios básicos são um tipo de exercício que envolve vários músculos ou grupos musculares, e várias articulações podem ser usadas simultaneamente. Como regra, são exercícios difíceis que são realizados com peso livre.',
      },
      {
        label: 'Exercícios básicos clássicos',
        body:
          '• Supino\n• Levantamento terra (ou peso morto)\n• Agachamento com barra\n• Barra alta\n• Remada com barra\n• Desenvolvimento militar\n• Tríceps na barra paralela (dips)\n• Passada longa',
      },
      {
        label: 'Recomendações',
        body:
          'Os exercícios básicos são considerados os mais eficazes para a construção muscular e o aumento dos indicadores de força. Os iniciantes devem fazer seu programa de treino apenas com exercícios básicos. Recomenda-se também aos atletas avançados que incluam não mais que 20 a 30% de exercícios de isolamento no programa.',
      },
    ],
    icon: 'barbell-outline',
  },
  {
    id: 'exercicios-isolados-texto',
    categoryId: 'exercicios-isolados',
    title: 'Exercícios isolados',
    shortDescription:
      'Exercícios que trabalham qualitativamente um músculo ou grupo — úteis para modelar e corrigir desequilíbrios, mas não devem dominar o programa.',
    description:
      'Os exercícios isolados são aqueles cujo objetivo é o trabalho qualitativo de um grupo de músculos ou de um músculo. Como regra, apenas uma articulação de um lado do corpo participa da realização do exercício.',
    sections: [
      {
        label: 'O que são exercícios isolados',
        body:
          'Os exercícios isolados são aqueles cujo objetivo é o trabalho qualitativo de um grupo de músculos ou de um músculo. Como regra, apenas uma articulação de um lado do corpo participa da realização do exercício.\n\nUm exemplo óbvio de exercício isolado é a extensão das pernas em um aparelho de academia, que é direcionado apenas para o quadríceps. De modo oposto, agachamentos com barra são exercícios gerais que incluem os quadríceps, as nádegas e os músculos das costas.',
      },
      {
        label: 'Uso e limitações',
        body:
          'Os exercícios isolados não são os melhores para o desenvolvimento de força ou aumento de massa muscular. Eles são usados para modelar um músculo, ou para exercitar músculos mais fracos.\n\nPor exemplo, o músculo deltoide consiste em três fascículos. Se um deles é mais fraco, ele pode ser ativado em maior ou menor grau com a ajuda de exercícios isolados.\n\nOs iniciantes geralmente não devem usar exercícios isolados em seu programa, pois geralmente são menos eficazes. O programa de treino de profissionais não deve incluir mais de 20–30% de exercícios isolados.',
      },
      {
        label: 'Alguns exercícios isolados',
        body:
          '• Extensão dos braços com barra por trás da cabeça\n• Elevação lateral com halteres\n• Elevação frontal com halteres\n• Extensão de perna no aparelho\n• Mesa flexora',
      },
    ],
    icon: 'locate-outline',
  },
  {
    id: 'carga-axial-texto',
    categoryId: 'carga-axial',
    title: 'Exercícios com carga axial na espinha dorsal',
    shortDescription:
      'Exercícios em que o peso pressiona a coluna vertebral — classificados em carga axial forte, fraca ou estática.',
    description:
      'Exercícios com carga axial são exercícios em que o peso da carga (barras ou halteres) pressiona direta ou indiretamente a coluna vertebral (= no eixo do corpo), daí o nome — carga axial.\n\nPorém, a carga pode variar. Em outras palavras, existem exercícios com carga axial mais e menos pronunciada. Eles se dividem em 3 categorias: carga axial forte, carga axial fraca e carga axial estática.',
    sections: [
      {
        label: 'O que é carga axial',
        body:
          'Exercícios com carga axial são exercícios em que o peso da carga (barras ou halteres) pressiona direta ou indiretamente a coluna vertebral (= no eixo do corpo), daí o nome — carga axial.\n\nPorém, a carga pode variar. Em outras palavras, existem exercícios com carga axial mais e menos pronunciada. Eles se dividem em 3 categorias: carga axial forte, carga axial fraca e carga axial estática.',
      },
      {
        label: 'Carga axial forte',
        body:
          'São os exercícios em que o peso da barra está sobre seus ombros. Ou então, o peso está nas mãos, mas há uma forte flexão do corpo. Com essa posição, a barra pressiona forte e diretamente a coluna.\n\nTais exercícios incluem:\n\n• Agachamento com barra nos ombros (qualquer variedade)\n• Agachamento com barra no peito\n• Flexão lateral com barra\n• Levantamento terra com barra\n• Levantamento terra com halteres\n• Agachamentos na máquina\n• Passadas com barra\n\nEstes exercícios são os que sobrecarregam mais severamente a coluna vertebral. Além disso, devem ser realizados com o máximo cuidado mesmo por quem não tem problemas nas costas.',
      },
      {
        label: 'Carga axial fraca',
        body:
          'O peso da carga pressiona indiretamente a coluna vertebral. Ou seja, ela está nas mãos e não há inclinação significativa do corpo.\n\nTais exercícios incluem:\n\n• Desenvolvimento militar\n• Desenvolvimento frontal com barra\n• Desenvolvimento com halteres\n• Desenvolvimento com halteres em pé\n• Elevação de ombros com halteres e barras\n\nVale a pena notar que, se você fizer os três primeiros exercícios sentado e reclinado no encosto do banco, a carga axial será reduzida ao mínimo. Por isso, nesse caso, você pode ignorá-la.',
      },
      {
        label: 'Carga axial estática',
        body:
          'Quando o peso da barra pressiona a coluna mas o ângulo nas costas não muda. Ou seja, as costas estão em uma posição. Nesse caso, porém, há uma carga significativa nas costas, mas a falta de movimento nas costas (estática) compensa parte dessa carga.\n\nTais exercícios incluem:\n\n• Remada com halteres\n• Remada com barra\n• Remada com barra T',
      },
      {
        label: 'Restrições e conclusão',
        body:
          'Ademais, deve ser entendido que a força da carga axial também depende do peso e da amplitude do exercício. Suponha que o agachamento com barra livre exerça uma carga na coluna vertebral bem menor que 100 kg na remada com barra.\n\nCom restrição total de cargas axiais, todos esses exercícios devem ser completamente evitados. Com restrição parcial, como regra, apenas exercícios com uma carga axial forte são retirados. É possível ter quaisquer opções intermediárias.\n\nExercícios com carga axial não são apenas prejudiciais. Como regra, a maioria desses exercícios é básica e indispensável para treinar costas, pernas e nádegas.',
      },
    ],
    icon: 'body-outline',
  },
  {
    id: 'fase-negativa-texto',
    categoryId: 'fase-negativa',
    title: 'Fase negativa',
    shortDescription:
      'A fase excêntrica — quando o músculo se alonga sob carga — gera microlesões que estimulam o crescimento muscular e permite trabalhar com pesos mais pesados.',
    description:
      'Durante um exercício com peso, o corpo passa por três fases distintas: contração, alongamento sob carga e pausa isométrica. A segunda fase — a negativa — é especialmente eficaz para desenvolver tamanho e força muscular.',
    sections: [
      {
        label: 'As três fases do exercício',
        body:
          'Há três fases distintas durante um exercício.\n\nDurante a primeira fase, há um encurtamento, ou contração, dos músculos quando você levanta o peso — é a tensão muscular.\n\nDurante a segunda fase (negativa), um músculo se alonga sob a ação da carga retornando à posição inicial — a redução relativa.\n\nA terceira fase é uma pausa no ápice do exercício, ou tensão isométrica entre as duas primeiras fases.\n\nA segunda fase negativa, ou redução lenta do peso, causa muitas micro lesões no músculo, seguidas por um aumento no crescimento deste.',
      },
      {
        label: 'Método de fase negativa',
        body:
          'Para ficar claro, você fica mais forte quando abaixa o peso — funciona ainda melhor do que quando o eleva. Você pode trabalhar com pesos mais pesados abaixando-os — é melhor para fatigar os músculos.\n\nTudo isso é um método conhecido como a "fase negativa" (repetições negativas) — um método fantástico de desenvolver tamanho e força muscular.',
      },
      {
        label: 'Recomendações',
        body:
          'Como o método da "fase negativa" é muito intenso e requer muitos dias para se recuperar do treinamento, é melhor começar a aplicá-lo gradualmente, com um ou dois exercícios do programa de treino.\n\nCom a ajuda de um parceiro, escolha um peso com o qual você consegue fazer no máximo cinco repetições. Use exercícios compostos que envolvam o corpo inteiro — por exemplo, supino.\n\nExecute o exercício normalmente, mas abaixe o peso lentamente por 5–6 segundos. Com a ajuda do parceiro, empurre a barra de volta para cima. O objetivo final é fazer 2–3 repetições dessa técnica.',
      },
    ],
    icon: 'arrow-down-outline',
  },
  {
    id: 'hipoxia-texto',
    categoryId: 'hipoxia',
    title: 'Hipóxia',
    shortDescription:
      'A hipóxia é a falta de oxigênio nos tecidos — no esporte, os tipos relevantes são o esforço físico intenso e a altitude.',
    description:
      'O termo "hipóxia" refere-se a uma falta de oxigênio nos tecidos e órgãos do corpo.\n\nExistem vários tipos de hipóxia. No entanto, apenas dois são relevantes no esporte: hipóxia por esforço físico e hipóxia de altitude.',
    sections: [
      {
        label: 'O que é hipóxia',
        body:
          'O termo "hipóxia" refere-se a uma falta de oxigênio nos tecidos e órgãos do corpo.\n\nExistem vários tipos de hipóxia. No entanto, apenas dois são relevantes no esporte: hipóxia por esforço físico e hipóxia de altitude.\n\nO primeiro tipo ocorre quando, sob esforço, a intensidade dos processos metabólicos aumenta, e o corpo precisa consumir mais oxigênio para garantir o funcionamento normal de todos os sistemas. A primeira resposta é aumentar a frequência respiratória (FR), a fim de aumentar a quantidade de oxigênio consumido e a frequência cardíaca.',
      },
      {
        label: 'Adaptação e hipóxia de altitude',
        body:
          'Se começarmos a sujeitar nosso corpo a esses esforços intensos regularmente, mecanismos de adaptação serão ativados, resultando em melhor tolerância ao exercício.\n\nQuando exposto à hipóxia de altitude, que ocorre quando há falta de oxigênio no ar inalado, processos similares ocorrem no corpo.\n\nO treinamento hipóxico pode ser considerado em quatro casos:\n\n• para melhorar os resultados em esportes de alto desempenho\n• para recreação\n• reabilitação\n• aclimatação',
      },
      {
        label: 'Técnicas e benefícios',
        body:
          'Várias técnicas são usadas para melhorar o desempenho atlético:\n\n• treinamento hipóxico por intervalos\n• treinamento hipóxico regular\n• dormir em altas altitudes\n\nHá vários benefícios para esse tipo de treino:\n\n• Um aumento da hemoglobina até o nível "natural" máximo\n• Um aumento na afinidade da hemoglobina pelo oxigênio, o que significa que uma molécula de hemoglobina pode transportar mais oxigênio do que antes\n• Angiogênese, que é um aumento no número de vasos capilares, que permite um suprimento mais eficiente de oxigênio para órgãos e tecidos\n• Um aumento significativo no consumo máximo de oxigênio (CMO ou VO2max)\n\nAltitude acidifica o corpo, e, portanto, durante o treinamento hipóxico, a capacidade do corpo de tolerar um aumento no ácido lático nos músculos aumenta.\n\nA recuperação é muito mais intensa quando dormimos em altas altitudes.',
      },
    ],
    icon: 'pulse-outline',
  },
  {
    id: 'intervalos-series-texto',
    categoryId: 'intervalos-series',
    title: 'Intervalos entre séries',
    shortDescription:
      'O tempo de descanso entre séries depende do número de repetições e da carga — fibras rápidas exigem pausas mais longas, fibras lentas, pausas mais curtas.',
    description:
      'O tempo de descanso entre repetições é um fator importante que muitas vezes, no entanto, recebe pouca atenção.\n\nPara entender o seu sentido, voltemos à fisiologia dos exercícios.',
    sections: [
      {
        label: 'Fisiologia do descanso',
        body:
          'Quanto menor o número de repetições e maior o peso da carga, mais você precisa descansar entre as execuções. Por outro lado, quanto maior o número de repetições e menor o peso da carga, menos você precisa descansar entre as repetições.\n\nAo trabalhar com uma carga alta, você usa fibras musculares rápidas, das quais a sua força depende em primeiro lugar, mas que se cansam mais rapidamente e exigem uma pausa mais longa. Portanto, ao dar-lhes tempo suficiente para descansar, você fornece as condições necessárias para um treino eficaz a cada repetição.\n\nQuando você trabalha com uma carga baixa, você ativa as fibras musculares lentas, que não são apenas mais resistentes do que as rápidas, mas também exigem uma pausa mais curta. No final, mesmo após uma execução com um grande número de repetições, as fibras musculares lentas estarão prontas para a carga após um breve descanso.',
      },
      {
        label: 'Recomendações de tempo',
        body:
          'Você pode seguir as seguintes recomendações fundamentais:\n\n• Ao fazer de 1 a 3 repetições, descanse por 3–5 minutos.\n• Ao fazer de 4 a 7 repetições, descanse por 2–3 minutos.\n• Ao fazer de 8 a 12 repetições, descanse por 1–2 minutos.\n• Ao fazer 13 ou mais repetições, descanse por 1 minuto.\n\nEste é o segredo. Esses números indicam a duração do descanso, que é necessária para continuar trabalhando com o grupo muscular em questão.',
      },
      {
        label: 'Otimizando o tempo de treino',
        body:
          'Se você pensar estrategicamente, nesse intervalo você pode treinar outro grupo muscular em vez de esperar pelo tempo de descanso entre as repetições. Para fazer isso, você pode usar as técnicas de repetições alternativas e treinamento cíclico. Isso permitirá que você economize tempo sem prejuízo aos resultados. O princípio é simples: quando um grupo muscular funciona, o segundo descansa.',
      },
    ],
    icon: 'timer-outline',
  },
  {
    id: 'massagem-esportiva-texto',
    categoryId: 'massagem-esportiva',
    title: 'Massagem esportiva',
    shortDescription:
      'A massagem esportiva prepara o atleta para treinos e competições, acelera a recuperação e ajuda a prevenir lesões no sistema musculoesquelético.',
    description:
      'A massagem esportiva é uma ferramenta essencial nos esportes que pode preparar rapidamente um atleta para treinos e competições, restaurar a condição física após as competições e prevenir lesões no sistema musculoesquelético.\n\nA massagem esportiva divide-se em vários tipos.',
    sections: [
      {
        label: 'Introdução',
        body:
          'A massagem esportiva é uma ferramenta essencial nos esportes que pode preparar rapidamente um atleta para treinos e competições, restaurar a condição física após as competições e prevenir lesões no sistema musculoesquelético.\n\nA massagem esportiva divide-se em vários tipos.',
      },
      {
        label: 'Tipos de massagem esportiva',
        body:
          '1. Massagem de treinamento (usada durante o treinamento). A massagem de treinamento tem um subtipo chamado massagem para aprimoramento de habilidades. Este subtipo é usado quando um atleta ainda não está pronto para um treinamento intenso ou após lesões. Nesses casos, a carga de trabalho física é reduzida e compensada por uma massagem intensiva com foco nos grupos musculares e sistemas envolvidos no esporte específico.\n\n2. Massagem preliminar, subdivide-se em:\n\n• Massagem de aquecimento, que prepara o atleta para as cargas principais (por exemplo, para mergulho).\n\nÉ importante notar que, embora a massagem no fisiculturismo ajude a aquecer e preparar os músculos, ela não pode substituir completamente um aquecimento adequado com exercícios físicos.\n\nUm aquecimento completo é necessário para preparar o sistema cardiovascular, melhorar a coordenação e outros fatores essenciais que afetam a segurança e a eficácia do treinamento. Em alguns esportes, a massagem é, de fato, uma parte importante da preparação, mas geralmente complementa em vez de substituir as rotinas de aquecimento padrão.\n\n• Massagem de aquecimento, usada em clima frio ou enquanto se espera por uma competição.\n\n• Massagem para a "febre de largada", realizada se um atleta fica muito ansioso antes de competir. Neste caso, o objetivo do massagista é aliviar a tensão muscular. Se o atleta estiver se sentindo desanimado, a tarefa do massagista é deixá-lo "pronto para a batalha".\n\n• Massagem mobilizadora, realizada quando é necessária uma estimulação extra antes de uma competição. Sem exagero, esta massagem pode, em muitos casos, ser decisiva para ganhar uma medalha de ouro.\n\n3. Massagem de recuperação:\n\nRealizada após competições esportivas. Ela reduz a fadiga e o estresse. A massagem também é usada para lesões e traumas, e para prevenir distensões e luxações.',
      },
      {
        label: 'Benefícios e características',
        body:
          'Do ponto de vista prático, o tipo mais interessante de massagem esportiva é a massagem preliminar, que inclui a massagem de aquecimento (antes de treinos intensos) e a massagem de treinamento, ambas as quais aumentam a resistência.\n\nA massagem de recuperação, como regra, ajuda um atleta a recuperar rapidamente a força após um esforço físico intenso.\n\nA massagem esportiva tem uma série de características distintas em comparação com outros tipos de massagem. Principalmente, a técnica de massagem de drenagem linfática ("espremedura") é usada para melhorar a circulação sanguínea e o fluxo linfático. Os músculos, sob a influência da massagem esportiva, ficam enriquecidos com oxigênio e nutrientes. O metabolismo ativo permite que o corpo elimine rapidamente os subprodutos metabólicos, incluindo o ácido lático, que se acumula em grandes quantidades durante o treinamento.\n\nComo resultado, o desempenho do tecido muscular aumenta. O atleta para de sentir fadiga e se recupera rapidamente. Além disso, a massagem aumenta a elasticidade do aparelho ligamentar, o que reduz significativamente o risco de lesões durante competições esportivas e treinamentos.',
      },
    ],
    icon: 'hand-left-outline',
  },
  {
    id: 'musculos-core-texto',
    categoryId: 'musculos-core',
    title: 'Músculos do core (núcleo)',
    shortDescription:
      'O core é um grupo de músculos profundos que estabiliza coluna e pelve — o centro de gravidade e de atividade muscular do corpo.',
    description:
      'Os músculos do core são um grupo de músculos profundos que fornecem estabilização para a coluna e a pelve. Eles são o centro de gravidade e de atividade muscular do corpo humano.',
    sections: [
      {
        label: 'O que é o core',
        body:
          'Os músculos do core são um grupo de músculos profundos que fornecem estabilização para a coluna e a pelve. Eles são o centro de gravidade e de atividade muscular do corpo humano.\n\nO core é composto pelos seguintes músculos:\n\n• Costas — os extensores das costas e o quadrado lombar\n• Abdômen — os oblíquos, o reto abdominal e o transverso abdominal\n• Coxas — os adutores e os isquiotibiais\n• Pelve — os músculos glúteos e os músculos do assoalho pélvico',
      },
      {
        label: 'Funções do core',
        body:
          'A musculatura do core é responsável por:\n\n• Postura\n• Equilíbrio\n• Abdômen e nádegas bem definidos\n• Flexibilidade e força corporal\n• A saúde dos sistemas excretor, circulatório, digestivo e geniturinário (especialmente o feminino)\n• A saúde da coluna (especialmente importante para esportistas, a fim de evitar sobrecargas e lesões)\n• O trabalho coordenado dos outros músculos do corpo humano',
      },
      {
        label: 'Recomendações',
        body:
          'Para fortalecer os músculos do core (núcleo), você precisa:\n\n• Tomar cuidado com as costas, especialmente pessoas que trabalham sentadas\n• Descansar ativamente, andar de bicicleta, nadar ou andar\n• Desenvolver um programa e uma agenda de treinamento\n• Certificar-se de prestar atenção em toda a musculatura do core (núcleo) de forma igual, e não trabalhar apenas um músculo; caso contrário, você causará desequilíbrio do core e, consequentemente, desequilíbrio do corpo inteiro\n• Alongar-se com frequência. Isso é muito importante para os músculos e ligamentos\n• Contrair os músculos do estômago e das nádegas durante o dia',
      },
    ],
    icon: 'shield-outline',
  },
  {
    id: 'super-series-texto',
    categoryId: 'super-series',
    title: 'O que são as super séries?',
    shortDescription:
      'Dois exercícios consecutivos sem descanso — uma técnica que eleva a intensidade e a queima de gordura do treino.',
    description:
      'A super série combina dois conjuntos de exercícios diferentes em sequência, sem pausa entre eles — aumentando a intensidade e o volume de trabalho no mesmo tempo.',
    sections: [
      {
        label: 'Definição',
        body:
          'Uma super série é a execução de dois conjuntos de dois exercícios diferentes, de forma consecutiva e sem descanso entre eles.\n\nNormalmente, uma super série inclui um exercício básico e um exercício de isolamento para o mesmo grupo muscular.\n\nTodavia, é comum o uso de exercícios para grupos musculares diferentes e opostos, por exemplo: costas e tórax, quadríceps e membros posteriores, abdominais e lombar.',
      },
      {
        label: 'Intensidade e queima de gordura',
        body:
          'As super séries elevam a intensidade do treino. Ou seja, pela mesma quantidade de tempo você realiza mais repetições. No entanto, sabemos que, quanto maior a intensidade, mais pré-requisitos para a queima de tecido adiposo temos.\n\nOcorre que, independentemente da opção de super séries que você escolher, esse treino sempre queimará mais gordura do que o treino com exercícios separados. Isso ocorre devido ao aumento de intensidade do treino.',
      },
      {
        label: 'Estrutura e nível',
        body:
          'As super séries utilizadas com mais frequência consistem em dois exercícios. Às vezes, mais.\n\nLembre-se de que quanto mais exercícios você deseja fazer em uma super série, maior a resistência de força que você precisa.\n\nUma super série de três ou mais exercícios é apenas para atletas consideravelmente experientes.',
      },
    ],
    icon: 'layers-outline',
  },
  {
    id: 'carboidratos-simples-complexos-texto',
    categoryId: 'carboidratos-simples-complexos',
    title: 'O que são carboidratos simples e carboidratos complexos?',
    shortDescription:
      'Carboidratos são divididos em rápidos (simples) e lentos (complexos) conforme a velocidade em que o corpo absorve a energia.',
    description:
      'Carboidratos são uma das principais fontes de energia para o corpo. Além disso, pela velocidade em que o corpo recebe essa energia, os carboidratos são divididos em rápidos e lentos (ou simples e complexos).',
    sections: [
      {
        label: 'Introdução',
        body:
          'Carboidratos são uma das principais fontes de energia para o corpo. Além disso, pela velocidade em que o corpo recebe essa energia, os carboidratos são divididos em rápidos e lentos (ou simples e complexos).',
      },
      {
        label: 'Carboidratos complexos',
        body:
          'Carboidratos complexos incluem polissacarídeos, amido e celulose. Eles são encontrados em cereais, legumes e em alguns vegetais (beterraba, batata, cenoura, etc.), sementes e nozes. Eles promovem a digestão e proporcionam uma sensação de saciedade por um longo tempo.',
      },
      {
        label: 'Carboidratos simples',
        body:
          'Monossacarídeos e dissacarídeos são conhecidos como carboidratos simples. Sua base é a glicose e a frutose. Eles são encontrados no leite, frutas, confeitaria e alguns vegetais. Os carboidratos simples têm uma estrutura mais simples, por isso são processados rapidamente no corpo.\n\nA falta de atividade física e uma ingestão excessiva de carboidratos rápidos leva a um aumento do nível de açúcar no sangue, que então cai acentuadamente e causa uma sensação de fome. Por sua vez, carboidratos não gastos se transformam em gordura. Ao mesmo tempo, nos sentimos fatigados e sonolentos com a falta deles.',
      },
      {
        label: 'Insulina e metabolismo',
        body:
          'O mecanismo é simples. Quando o açúcar (um componente essencial dos carboidratos) entra no sangue, o nível de glicose no corpo aumenta e sentimos uma onda de energia. No entanto, com o seu nível cai, surge uma sensação de fome e inércia.\n\nOs carboidratos simples fazem com que o corpo gere o hormônio insulina, que por sua vez inicia os processos de desenvolvimento muscular do corpo; nesse momento, o processo de divisão é interrompido.\n\nEm outras palavras, enquanto a insulina está presente no sangue, não podemos decompor a gordura, mas apenas formar músculo.\n\nAo mesmo tempo, se o material de desenvolvimento não é consumido pelo corpo na forma de energia, ele é depositado na forma de depósitos de gordura. A insulina é por natureza anabólica ou, em outras palavras, um hormônio de desenvolvimento. Quando comemos doces, o corpo produz insulina. Isso leva à desaceleração dos processos de perda de peso e inicia o processo de desenvolvimento.',
      },
    ],
    icon: 'nutrition-outline',
  },
  {
    id: 'esteroides-anabolizantes-texto',
    categoryId: 'esteroides-anabolizantes',
    title: 'O que são esteroides anabolizantes?',
    shortDescription:
      'Esteroides anabólicos imitam testosterona e aceleram a síntese de proteínas — mas o uso sem indicação médica traz riscos que podem superar os benefícios.',
    description:
      'Esteroides anabólicos (anabolizantes) são fármacos que imitam a ação dos hormônios sexuais masculinos testosterona e di-hidrotestosterona.\n\nOs esteroides anabolizantes aceleram a síntese de proteínas dentro das células, levando a uma hipertrofia acentuada do tecido muscular (esse processo como um todo é chamado de anabolismo), razão pela qual eles se tornaram amplamente utilizados no fisiculturismo.',
    sections: [
      {
        label: 'Definição',
        body:
          'Esteroides anabólicos (anabolizantes) são fármacos que imitam a ação dos hormônios sexuais masculinos testosterona e di-hidrotestosterona.\n\nOs esteroides anabolizantes aceleram a síntese de proteínas dentro das células, levando a uma hipertrofia acentuada do tecido muscular (esse processo como um todo é chamado de anabolismo), razão pela qual eles se tornaram amplamente utilizados no fisiculturismo.',
      },
      {
        label: 'Mecanismo de ação',
        body:
          'O mecanismo de ação dos esteroides anabolizantes é diferente do dos hormônios peptídicos: uma vez na corrente sanguínea, as moléculas de esteroides são distribuídas por todo o corpo, onde interagem com as células dos músculos esqueléticos, glândulas sebáceas, folículos capilares, certas regiões do cérebro e algumas glândulas endócrinas.\n\nOs esteroides anabolizantes são solúveis em gorduras, o que lhes permite penetrar na membrana celular, que é composta de gorduras.\n\nDentro da célula, os esteroides anabolizantes interagem (se ligam) com os receptores androgênicos no núcleo e no citoplasma. Os receptores androgênicos ativados transmitem um sinal para o núcleo da célula, resultando em expressão gênica alterada ou na ativação de processos que enviam sinais para outras partes da célula. Isso estimula a síntese de todos os tipos de ácidos nucleicos e inicia a formação de novas moléculas de proteína.',
      },
      {
        label: 'Efeitos no crescimento muscular',
        body:
          'O efeito dos esteroides anabolizantes no crescimento da massa muscular se deve a:\n\n• aceleração da síntese de proteínas\n• redução do tempo de recuperação\n• diminuição da influência de hormônios catabólicos (cortisol, etc.)\n• desvio da diferenciação celular para células musculares, reduzindo a formação de células de gordura\n• aceleração das reações metabólicas, levando à quebra de gordura\n• memória muscular',
      },
      {
        label: 'Avisos e riscos',
        body:
          'A OMS não recomenda o uso de esteroides anabólicos sem indicação médica. A responsabilidade por todas as consequências do seu uso é inteiramente do indivíduo.\n\nOs potenciais efeitos negativos podem superar em muito os benefícios percebidos do aumento da massa muscular: distúrbios endócrinos e cardiovasculares graves, danos ao fígado, problemas de saúde mental e enfraquecimento da imunidade.\n\nAlém disso, na maioria dos países, a circulação de esteroides anabolizantes é estritamente regulamentada por lei, e a aquisição ilegal pode levar à responsabilidade administrativa ou criminal.',
      },
    ],
    icon: 'flask-outline',
  },
  {
    id: 'hormonios-androgenos-texto',
    categoryId: 'hormonios-androgenos',
    title: 'O que são hormônios andrógenos?',
    shortDescription:
      'Andrógenos são hormônios esteroides produzidos nas gônadas e no córtex adrenal — responsáveis por características sexuais masculinas e por diversos processos metabólicos.',
    description:
      'Andrógenos são um grupo de hormônios esteroides produzidos nas gônadas e no córtex adrenal. Eles são responsáveis pela formação, desenvolvimento e função dos órgãos sexuais masculinos e das características sexuais secundárias.\n\nAlém de influenciar a libido e o comportamento sexual, os andrógenos afetam muitos processos bioquímicos não relacionados à diferenciação sexual.',
    sections: [
      {
        label: 'Definição e função',
        body:
          'Andrógenos são um grupo de hormônios esteroides produzidos nas gônadas e no córtex adrenal. Eles são responsáveis pela formação, desenvolvimento e função dos órgãos sexuais masculinos e das características sexuais secundárias.\n\nAlém de influenciar a libido e o comportamento sexual, os andrógenos afetam muitos processos bioquímicos não relacionados à diferenciação sexual.',
      },
      {
        label: 'Efeitos dos andrógenos',
        body:
          '• efeito anabólico: aumentam a síntese de proteínas e inibem a quebra de proteínas\n• regulação metabólica: regulam o metabolismo dos carboidratos e sensibilidade à insulina\n• aumentam a massa muscular e a força\n• ajudam a reduzir a quantidade geral de gordura subcutânea e diminuem a massa gorda em relação à massa muscular\n• diminuem os níveis de lipoproteínas de alta densidade (HDL — colesterol "bom") e podem aumentar os níveis de lipoproteínas de baixa densidade (LDL — colesterol "ruim") e o colesterol total, aumentando a predisposição à aterosclerose, especialmente em homens\n• afetam a massa óssea e muscular',
      },
      {
        label: 'Principais andrógenos',
        body:
          'Os principais andrógenos nas mulheres incluem:\n\n• testosterona\n• androstenediona\n• sulfato de deidroepiandrosterona (DHEA-S)\n• deidroepiandrosterona (DHEA)\n\nNos homens:\n\n• testosterona\n• androstenediona\n• di-hidrotestosterona (DHT)',
      },
      {
        label: 'Andrógenos exógenos',
        body:
          'Andrógenos exógenos suprimem a secreção de LH e FSH de maneira dose-dependente, inibindo a função testicular: isso diminui a produção de testosterona endógena e reduz a produção de esperma, diminuindo assim a fertilidade.\n\nO uso prolongado de andrógenos exógenos pode levar a uma redução no volume testicular. A função testicular geralmente se recupera alguns meses após a interrupção, mas às vezes leva mais tempo. Mesmo doses terapêuticas de andrógenos aumentam o risco de eritrocitose, que aumenta significativamente em doses altas.\n\nO uso descontrolado de medicamentos hormonais é perigoso e só deve ser feito sob supervisão médica.',
      },
    ],
    icon: 'male-female-outline',
  },
  {
    id: 'anabolismo-catabolismo-texto',
    categoryId: 'anabolismo-catabolismo',
    title: 'O que é anabolismo, catabolismo e metabolismo?',
    shortDescription:
      'Anabolismo constrói tecidos, catabolismo os degrada — juntos formam o metabolismo, regulado por hormônios como insulina, cortisol e testosterona.',
    description:
      'Anabolismo é o conjunto de processos químicos no organismo com o objetivo de formar novos tecidos e células. Catabolismo é o oposto — a quebra de substâncias complexas. O metabolismo é a combinação de ambos.',
    sections: [
      {
        label: 'Anabolismo',
        body:
          'Anabolismo é o conjunto de processos químicos no organismo com o objetivo de formar novos tecidos e células.\n\nExemplos:\n\n• síntese de proteínas e hormônios\n• acúmulo de gordura\n• síntese de proteína muscular\n\nO anabolismo não se limita apenas ao crescimento da massa muscular. Também envolve síntese de glicogênio — forma como o corpo armazena carboidratos nos músculos e no fígado. A síntese de glicogênio em si não leva ao acúmulo de gordura.\n\nOs aminoácidos provenientes da proteína servem de material de "construção" para as células e tecidos musculares. No entanto, é essencial lembrar que a proteína não será benéfica se combinada com uma dieta de baixas calorias, pois o corpo não terá reservas de energia.\n\nPortanto, o cardápio de um atleta deve ser o mais equilibrado possível, levando em conta a regularidade, a intensidade e a quantidade de atividade física.',
      },
      {
        label: 'Reduzindo o catabolismo',
        body:
          'Para diminuir os processos catabólicos no corpo e aumentar o anabolismo, você precisa:\n\n• dormir o suficiente\n• manter um estilo de vida saudável\n• seguir um cronograma de alimentação adequado\n• evitar o excesso de esforço e situações estressantes\n• treinar de acordo com suas capacidades, não até a exaustão',
      },
      {
        label: 'Catabolismo',
        body:
          'Catabolismo é o oposto do anabolismo. Enquanto o anabolismo envolve a criação de novas células e fibras musculares, o catabolismo envolve a quebra de substâncias complexas em mais simples, bem como a degradação de partes antigas e a oxidação de substâncias.\n\nA taxa e a intensidade do catabolismo são influenciadas por hormônios. Por exemplo, os glicocorticoides aumentam a quebra de proteínas e aminoácidos, mas também aumentam os níveis de glicose. Enquanto isso, a insulina promove a utilização de glicose pelas células, mas inibe a quebra de proteínas.\n\nCertos hormônios bem conhecidos, como adrenalina e cortisol, também participam do catabolismo, impulsionando os processos catabólicos do corpo. Em contraste, a testosterona apoia a dominância do anabolismo no metabolismo do corpo.\n\nÉ crucial entender que o catabolismo não é necessariamente prejudicial. Ele não deve ser visto apenas como um processo que destrói a massa muscular conquistada com tanto esforço.\n\nO catabolismo também é uma fonte de energia necessária para treinos eficazes. Além disso, o catabolismo leva à degradação não apenas das fibras musculares, mas também dos depósitos de gordura (através da redução lipídica).',
      },
      {
        label: 'Metabolismo',
        body:
          'O anabolismo envolve os processos de síntese de novas substâncias. O catabolismo envolve a degradação de substâncias. O metabolismo é a combinação de ambos os processos — ou seja, a "troca de substâncias".\n\nAnabolismo e catabolismo são partes opostas, mas essenciais, do único processo chamado metabolismo.\n\nA combinação certa de anabolismo e catabolismo garante um metabolismo equilibrado e mantém a saúde do seu corpo.',
      },
    ],
    icon: 'swap-vertical-outline',
  },
  {
    id: 'fisiculturismo-texto',
    categoryId: 'fisiculturismo',
    title: 'O que é fisiculturismo?',
    shortDescription:
      'Modificação do corpo por hipertrofia muscular e redução de gordura — treino de força, dieta, suplementação e definição muscular.',
    description:
      'Fisiculturismo é o processo de modificação do corpo, principalmente através da hipertrofia muscular e da redução da gordura subcutânea.',
    sections: [
      {
        label: 'Definição',
        body:
          'Fisiculturismo é o processo de modificação do corpo, principalmente através da hipertrofia muscular e da redução da gordura subcutânea por meio de:\n\n• levantamento de peso ou treinamento de força\n• gerenciamento da ingestão calórica, com um superávit para ganho de massa (bulking) e um déficit para definição (cutting)\n• o uso de suplementos esportivos',
      },
      {
        label: 'Definição muscular',
        body:
          'Uma parte essencial do fisiculturismo é o desenvolvimento da definição muscular. Para alcançar isso, os programas de treinamento incluem:\n\n• treinamento aeróbico\n• controle e ajuste calórico, bem como gerenciamento da composição de macronutrientes da dieta\n• suplementos esportivos que podem indiretamente apoiar a queima de gordura e o metabolismo (cafeína, extratos de chá verde, L-carnitina)\n\nLembre-se: o uso de potentes queimadores de gordura, diuréticos ou anticatabólicos sem supervisão médica é perigoso e pode levar a graves consequências para a saúde.\n\nMedidas adicionais para aprimoramento do físico, como cremes, óleos, loções e procedimentos estéticos (por exemplo, massagem LPG) são usados apenas como ferramentas auxiliares de efeito externo e não afetam significativamente a composição corporal.',
      },
      {
        label: 'Princípios do treinamento de força',
        body:
          'Os princípios principais do treinamento de força no fisiculturismo incluem a manipulação:\n\n• do número de séries e repetições\n• do tempo (velocidade de execução)\n• da escolha dos exercícios\n• da magnitude da carga para alcançar as mudanças desejadas em força, resistência ou tamanho do grupo muscular alvo',
      },
      {
        label: 'Abordagem moderna',
        body:
          'O fisiculturismo moderno baseia-se nos princípios de uma abordagem abrangente, individualizada, segurança e periodização adequada das cargas de treinamento.',
      },
    ],
    icon: 'trophy-outline',
  },
  {
    id: 'frequencia-cardiaca-texto',
    categoryId: 'frequencia-cardiaca',
    title: 'O que é frequência cardíaca e como calcular a sua zona alvo de frequência cardíaca?',
    shortDescription:
      'Frequência cardíaca máxima (220 − idade), zonas de treino de 50% a 100% e como calcular sua zona alvo para queima de gordura.',
    description:
      'A frequência cardíaca indica quantas vezes o coração bate por minuto. Para treinar com eficiência, é importante conhecer sua frequência máxima e as zonas de intensidade correspondentes.',
    sections: [
      {
        label: 'Frequência cardíaca máxima',
        body:
          'Para determinar a frequência cardíaca máxima, existe uma fórmula geral simples: 220 menos a sua idade.',
      },
      {
        label: 'Zonas de treino',
        body:
          'A zona de aquecimento é um treino com frequência de pulso de 50–60% da máxima. Nessa zona, o corpo aquece, "acorda" ou se recupera após cargas intensas. Entre os benefícios estão a normalização da pressão arterial e a redução dos níveis de colesterol no sangue. O excesso de peso também pode diminuir com treinos regulares nessa faixa.\n\nQuando a frequência cardíaca atinge 60–70% da máxima, a zona é confortável em termos de carga e 85% das calorias queimadas durante esse tipo de treinamento provêm dos estoques de gordura.\n\nNa zona cardio-aeróbica, com frequência de pulso de 70–80% da máxima, o trabalho pulmonar ativo começa, à medida que o corpo passa a consumir mais oxigênio. Além do desenvolvimento dos sistemas respiratório e cardiovascular, essa zona também contribui para o aumento da força e do tamanho do coração. Mais calorias são queimadas do que na zona anterior, mas apenas 50% delas vêm de estoques de gordura.\n\nA zona cardio-anaeróbica utiliza 80–90% da frequência cardíaca máxima. Treinar nessa faixa ajuda a melhorar significativamente o condicionamento físico. Porém, apenas 15% das calorias queimadas nessa zona provêm de estoques de gordura.\n\nO nível limite corresponde a 90–100% da frequência cardíaca máxima e do volume de oxigênio consumido. Nessa zona, só é possível trabalhar por períodos muito curtos — e apenas atletas treinados suportam cargas tão intensas.',
      },
      {
        label: 'Exemplo de cálculo',
        body:
          'Vamos calcular para uma pessoa de 35 anos.\n\nFrequência cardíaca máxima: 220 − 35 = 185 batimentos por minuto.\n\nZona cardio selecionada: 60–70%.\n\nSegundo outras fontes, a queima ativa de gordura ocorre entre 65% e 75% da frequência máxima.\n\n185 × 0,6 = 111\n185 × 0,7 = 129,5\n\nOu seja, o objetivo é permanecer entre 111 e 130 batimentos por minuto. Essa é a sua zona alvo.',
      },
      {
        label: 'Recomendações',
        body:
          'A melhor forma de medir o pulso em repouso é pela manhã, deitado na cama logo após acordar. Como alternativa, permaneça em repouso total por pelo menos 10 minutos antes de medir.',
      },
    ],
    icon: 'heart-circle-outline',
  },
  {
    id: 'powerlifting-texto',
    categoryId: 'powerlifting',
    title: 'O que é levantamento de peso básico (powerlifting)?',
    shortDescription:
      'Esporte de força com três movimentos de competição — agachamento, supino e levantamento terra — que definem a qualificação do atleta.',
    description:
      'O powerlifting, também chamado de triatlo de potência, é um esporte de força cuja essência é o atleta vencer a resistência do peso mais pesado possível.',
    sections: [
      {
        label: 'Definição',
        body:
          'O powerlifting, também chamado de triatlo de potência, é um esporte de força cuja essência é o atleta vencer a resistência do peso mais pesado possível.\n\nO termo triatlo de potência vem do fato de a modalidade competitiva incluir três exercícios específicos:\n\n• agachamento livre — realizado com a barra apoiada nos ombros\n• supino reto\n• levantamento terra (peso morto)\n\nJuntos, determinam a qualificação do atleta.',
      },
      {
        label: 'Princípios básicos do treino de força',
        body:
          'Os princípios básicos do treino de força na musculação incluem:\n\n• alteração no número de séries e repetições de exercícios\n• o ritmo (velocidade de execução)\n• a escolha dos exercícios, a fim de obter as mudanças desejadas em força, resistência ou tamanho de um grupo muscular sobrecarregado\n\nCombinações específicas de repetições, séries de exercícios e peso dependem das metas individuais de cada atleta. Para obter maior tamanho e força, é necessário executar várias séries (mais de 4) com menos repetições e pesos mais elevados.',
      },
      {
        label: 'Exercícios fundamentais',
        body:
          'A escolha dos exercícios deve se limitar a exercícios fundamentais gerais com barra, como:\n\n• agachamentos\n• supino\n• levantamento terra (ou peso morto)\n• supino suspenso\n• supino inclinado',
      },
    ],
    icon: 'barbell-outline',
  },
  {
    id: 'whey-hipercalorico-texto',
    categoryId: 'whey-hipercalorico',
    title: 'O que é melhor tomar: whey ou hipercalórico?',
    shortDescription:
      'Whey protein ou hipercalórico (mass gainer) — qual escolher conforme metabolismo, objetivo e dificuldade em atingir macros pela dieta.',
    description:
      'A eficácia do treino é determinada pela razão entre ganho de massa muscular e perda de gordura. Suplementos concentrados em proteína e carboidrato podem ajudar quando a alimentação não cobre as necessidades.',
    sections: [
      {
        label: 'Introdução',
        body:
          'A eficácia do treino na academia é determinada pela razão entre o aumento da massa muscular e a perda do excesso de gordura.\n\nSe uma pessoa busca um resultado significativo e tem dificuldade em obter a quantidade certa de gordura, proteína e carboidrato da alimentação, os suplementos alimentares podem ser uma boa solução, contanto que contenham proteínas e carboidratos de forma concentrada.\n\nOs aditivos mais populares são o whey protein e o hipercalórico (ou mass gainer).',
      },
      {
        label: 'Proteína em pó e whey',
        body:
          'A proteína em pó é uma proteína pura, mais comumente obtida do leite, soro de leite, ovo em pó ou soja, purificada a partir de carboidratos e gorduras. Hoje em dia, também há muitos outros tipos de proteína em pó de origem animal e vegetal disponíveis. Sua ingestão proporciona um aumento significativo do músculo, já que a proteína é o material de construção do tecido muscular.\n\nAs principais vantagens do whey são:\n\n• possui alta digestibilidade\n• estabiliza o balanço de nitrogênio\n• promove o fortalecimento da imunidade\n• fornece ao corpo aminoácidos essenciais\n\nAs proteínas são de dois tipos — lenta e rápida. A proteína lenta é absorvida em ritmo lento, produz um pequeno aumento na massa muscular, mas tem um efeito a longo prazo. É boa para secar.\n\nA proteína rápida é absorvida rapidamente, atua por um curto período de tempo e proporciona o máximo ganho de peso. Portanto, no processo de construção muscular, é melhor começar com uma proteína rápida e mudar gradualmente para uma lenta.',
      },
      {
        label: 'Hipercalórico',
        body:
          'O hipercalórico é uma mistura seca de proteína e carboidrato que consiste, em média, de 10 a 20% de proteínas e 70 a 80% de carboidratos, estimulando o ganho de peso e restaurando as reservas de energia do corpo.\n\nEssa é a diferença entre esses suplementos. Existem diferentes misturas nas quais a proporção entre proteínas e carboidratos pode variar de 10% / 80% a 40% / 50%.\n\nVantagens do hipercalórico:\n\n• restaura as reservas de glicogênio\n• fornece a energia necessária\n• aumenta a eficiência\n• aumenta o crescimento de indicadores de força\n• promove a recuperação geral do corpo e a recuperação do tecido muscular durante o sono\n\nOs carboidratos que fazem parte do hipercalórico podem ser simples (com alto índice glicêmico) e complexos (com baixo índice glicêmico).',
      },
      {
        label: 'Para quem é indicado',
        body:
          'São mais indicados para:\n\n• pessoas com alto metabolismo\n• pessoas com um corpo magro (ectomorfos, astênicos)\n• pessoas envolvidas profissionalmente em esportes e, ao mesmo tempo, com um estilo de vida ativo\n• adolescentes\n• na ausência de uma dieta estabelecida\n\nLevando em consideração as diferenças entre o hipercalórico e o whey, o hipercalórico não é recomendado para pessoas propensas à obesidade e ao ganho acelerado de excesso de peso.\n\nPara um crescimento total da massa muscular, proteínas e carboidratos são igualmente necessários. Se os músculos não puderem reabastecer as reservas de glicogênio no intervalo entre os exercícios e se recuperar completamente, eles não crescerão, mesmo se não houver deficiência de proteína.\n\nO hipercalórico é um fornecedor de energia, permitindo aumentar a duração e a intensidade do treino. No entanto, se a quantidade de carboidratos introduzidos no corpo não for totalmente gasta, eles serão transformados em gordura subcutânea, o que afetará negativamente o alívio corporal.\n\nÉ por isso que esses coquetéis são mais adequados para pessoas magras com metabolismo acelerado, que não ganham peso facilmente. Ao contrário dos endomorfos, elas não correm o risco de ganhar peso devido ao tecido adiposo. Com a ingestão apenas de proteínas (whey), essas pessoas terão que esperar muito mais tempo pelo resultado.',
      },
      {
        label: 'Recomendações',
        body:
          'Com base no exposto, há duas opções:\n\n• tomar whey e um hipercalórico de baixa proteína em proporções iguais\n• tomar um hipercalórico com uma quantidade maior de proteína, cerca de 35% / 55% a favor dos carboidratos\n\nAntes de se exercitar (60 a 90 minutos antes), é melhor beber um hipercalórico com alto teor de carboidratos complexos e, depois de se exercitar (em 20 a 30 minutos), whey, carboidratos simples e um coquetel de glutamina.\n\nOs hipercalóricos são geralmente tomados antes das refeições, tanto nos dias de treino como nos de descanso.\n\nSe você acha que a sua massa corporal não é suficiente, comece a tomar hipercalóricos. Quando conseguir a massa desejada, mude para uma mistura desses suplementos, aumentando gradualmente a fração de peso da proteína.\n\nNo caso de excesso de peso, é melhor começar com o whey, tendo em mente a dose diária mínima de carboidratos.',
      },
    ],
    icon: 'nutrition-outline',
  },
  {
    id: 'pump-texto',
    categoryId: 'pump',
    title: 'O que é o Pump?',
    shortDescription:
      'Pump é a sensação subjetiva de inchaço e rigidez muscular durante o treino — marcador de estresse metabólico e estímulo para hipertrofia.',
    description:
      'Pump é uma sensação subjetiva de inchaço e rigidez nos músculos que ocorre durante ou após um treino. Fisiologicamente, isso se deve ao aumento do fluxo sanguíneo para o músculo em atividade e a um edema temporário das células musculares.',
    sections: [
      {
        label: 'O que é o pump',
        body:
          'Pump é uma sensação subjetiva de inchaço e rigidez nos músculos que ocorre durante ou após um treino. Fisiologicamente, isso se deve ao aumento do fluxo sanguíneo para o músculo em atividade e a um edema temporário das células musculares.\n\nEmbora o pump seja frequentemente usado para um efeito "estético" (por exemplo, antes de uma sessão de fotos), no processo de treino ele é um marcador e um estimulador de estresse metabólico, um dos fatores-chave para o crescimento muscular (hipertrofia).',
      },
      {
        label: 'Como conseguir o pump durante o treino',
        body:
          '• Alta faixa de repetições — trabalhe na faixa de 12-20+ repetições por série para garantir um longo tempo sob tensão.\n• Períodos de descanso curtos — descanse por não mais de 30-60 segundos entre as séries para manter o fluxo sanguíneo.\n• Tensão constante — realize os movimentos de forma suave, sem pausas completas no topo ou na base, mantendo o músculo sob tensão.\n• Técnicas de intensificação — use métodos como drop sets (reduzir o peso dentro de uma série) ou superséries (dois exercícios seguidos para o mesmo grupo muscular).',
      },
    ],
    icon: 'fitness-outline',
  },
  {
    id: 'drop-set-texto',
    categoryId: 'drop-set',
    title: 'O que é um drop set?',
    shortDescription:
      'Séries com redução contínua de peso — técnica de intensificação que prolonga o estímulo muscular após a falha técnica.',
    description:
      'Drop sets são séries com redução contínua de peso. Após atingir a falha técnica, reduz-se a carga em 25% e continua-se até não conseguir mais.',
    sections: [
      {
        label: 'O que é um drop set',
        body:
          'Drop sets são séries com redução contínua de peso.\n\nVocê inicia uma série com uma certa carga de peso (seja um peso livre ou uma carga em um simulador), leva a sua performance até o ponto em que seja impossível executar o movimento com uma atenção rigorosa à técnica, reduz a carga do peso em 25%, e, novamente, faz a série até não conseguir mais.\n\nA versão clássica do drop set implica em um intervalo mínimo entre as mini-séries; idealmente, as pausas são mínimas e o peso muda entre 2 e 3 segundos.',
      },
      {
        label: 'Drop set clássico na prática',
        body:
          'No entanto, na prática, o tempo necessário para reduzir o peso pode levar mais tempo e não há problemas significativos. Outras opções, em que o intervalo chega a algo entre 15 e 20 segundos, também são bastante aceitáveis e eficazes. Este é um drop set "clássico".',
      },
    ],
    icon: 'barbell-outline',
  },
  {
    id: 'obesidade-abdominal-texto',
    categoryId: 'obesidade-abdominal',
    title: 'Obesidade abdominal',
    shortDescription:
      'Obesidade abdominal é o acúmulo de gordura na cintura e na região abdominal — comum em homens, mas também em mulheres.',
    description:
      'Depósitos de gordura na cintura e abdômen podem ser detectados com fita métrica e estão associados a diversos riscos à saúde, incluindo diabetes, hipertensão e doenças cardiovasculares.',
    sections: [
      {
        label: 'O que é obesidade abdominal',
        body:
          'Obesidade abdominal é o aparecimento de depósitos de gordura nas regiões da cintura e abdominal.\n\nEsse tipo de obesidade é geralmente um problema masculino, embora também possa afetar as mulheres.\n\nÉ possível determinar a presença do problema com a ajuda de uma simples fita métrica. Nos casos em que a medida da circunferência da cintura é similar à circunferência do quadril, especialmente se a cintura é mais larga que a coxa, pode-se falar em obesidade abdominal.',
      },
      {
        label: 'Causas da obesidade abdominal',
        body:
          'Alguns fatores podem provocar obesidade abdominal:\n\n• primeiro, uma dieta desequilibrada e excessiva, com alta ingestão de calorias, bem como de muito fast food e doces, comer por estresse e jantares pesados. Se a atividade motora de uma pessoa é bastante reduzida, e ela não faz exercícios, isso pode ser um problema\n• além disso, o surgimento do problema pode estar associado a doenças metabólicas concomitantes, perturbações hormonais e problemas no trato digestivo',
      },
      {
        label: 'Possíveis inconveniências e riscos',
        body:
          'Obesidade é geralmente considerada feia e antiestética. Tal problema causa insegurança, interfere na vida pessoal. No entanto, pode haver muitas outras consequências terríveis que afetam diretamente a saúde.\n\nA obesidade abdominal também afeta os órgãos internos, atrapalhando seu funcionamento normal.\n\nEla causa o desenvolvimento de doenças muito perigosas como diabetes e hipertensão, e pode provocar ataque cardíaco e derrame.\n\nNas mulheres, essa patologia pode levar à infertilidade.',
      },
    ],
    icon: 'body-outline',
  },
  {
    id: 'osteopatia-texto',
    categoryId: 'osteopatia',
    title: 'Osteopatia',
    shortDescription:
      'A osteopatia esportiva é um ramo da terapia manual que usa técnicas para melhorar a função motora, amplitude de movimento e circulação nos atletas.',
    description:
      'A osteopatia esportiva é um ramo da terapia manual, na qual um especialista usa técnicas manuais para afetar os músculos, articulações e outras estruturas do sistema musculoesquelético de um atleta.',
    sections: [
      {
        label: 'O que é osteopatia esportiva',
        body:
          'A osteopatia esportiva é um ramo da terapia manual, na qual um especialista usa técnicas manuais para afetar os músculos, articulações e outras estruturas do sistema musculoesquelético de um atleta.\n\nO principal objetivo da abordagem osteopática é melhorar a função motora, aumentar a amplitude de movimento, aliviar a tensão muscular e restaurar a circulação sanguínea e o fluxo linfático em áreas específicas.',
      },
      {
        label: 'Técnicas e benefícios',
        body:
          'A osteopatia esportiva na maioria das vezes emprega técnicas semelhantes às usadas na massagem esportiva moderna, massagem terapêutica e certos métodos de terapia manual. Isso pode incluir:\n\n• massagem esportiva profunda e restauradora\n• elementos de acupressão ou massagem reflexológica\n• manipulação manual suave de músculos e articulações\n\nEsses métodos podem ajudar a aquecer os músculos, melhorar a circulação, reduzir a dor e a fadiga pós-esforço e ajudar a prevenir processos destrutivos no sistema musculoesquelético.',
      },
      {
        label: 'Base de evidências e limitações do método',
        body:
          'Ao contrário da massagem esportiva clássica e da fisioterapia, a eficácia da maioria das práticas osteopáticas permanece objeto de debate científico — não há evidências suficientes em revisões autorizadas e estudos sistemáticos que confirmem seu benefício e segurança para a saúde dos atletas.\n\nPortanto, os métodos osteopáticos devem ser aplicados com cautela, apenas por especialistas qualificados e como um componente suplementar, não como o principal meio de tratamento.',
      },
      {
        label: 'A abordagem ideal para a recuperação do atleta',
        body:
          'A medicina baseada em evidências moderna recomenda o uso principalmente de métodos comprovados: massagem terapêutica e esportiva, técnicas manuais apenas por profissionais com qualificações médicas, procedimentos de fisioterapia e programas personalizados de cinesioterapia.\n\nAs práticas osteopáticas podem ser usadas adicionalmente, mas não devem substituir o diagnóstico médico, a reabilitação ou os programas de recuperação individualizados.\n\nA osteopatia esportiva pode fazer parte do processo de recuperação, mas sua eficácia e papel devem ser determinados individualmente e sempre sob a supervisão de profissionais experientes.',
      },
      {
        label: 'Recomendações',
        body:
          'No caso de uma lesão grave, dor ou restrições de movimento persistentes, recomenda-se consultar um médico do esporte ou um especialista em reabilitação para escolher a estratégia de recuperação mais eficaz e segura.',
      },
    ],
    icon: 'hand-left-outline',
  },
];

export function getEncyclopediaCategory(id: EncyclopediaCategoryId): EncyclopediaCategory {
  const found = ENCYCLOPEDIA_CATEGORIES.find((category) => category.id === id);
  if (!found) throw new Error(`Categoria da enciclopédia desconhecida: ${id}`);
  return found;
}

export function getEncyclopediaArticlesForCategory(categoryId: EncyclopediaCategoryId) {
  return ENCYCLOPEDIA_ARTICLES.filter((article) => article.categoryId === categoryId);
}

export function getEncyclopediaArticle(id: EncyclopediaArticleId): EncyclopediaArticle {
  const found = ENCYCLOPEDIA_ARTICLES.find((article) => article.id === id);
  if (!found) throw new Error(`Artigo da enciclopédia desconhecido: ${id}`);
  return found;
}
