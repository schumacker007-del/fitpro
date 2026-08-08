import { nf } from './_helpers';

const G = 'proteins' as const;
const EGGS = 'eggs';

export const EGG_ITEMS = [
  nf('egg_whole_boiled', G, EGGS, 'Ovo de galinha inteiro cozido', 'Um dos alimentos mais completos do planeta. A clara fornece proteína pura de altíssimo valor biológico e a gema concentra vitaminas lipossolúveis e gorduras boas.', '1 unidade grande (Aprox. 50g)', 78, 6.6, 0.3, 0, [5.3, 1.6, 2.0, 0.7], 73),
  nf('egg_white', G, EGGS, 'Clara de ovo cozida / pasteurizada', 'Fonte proteica magra por excelência. Praticamente livre de gorduras e carboidratos, muito utilizada para volume muscular com controle severo de calorias.', '100g (Aprox. 3 claras ou 3 a 4 colheres de sopa)', 52, 11.2, 0.7, 0, [0.2, 0, 0, 0], 166),
  nf('egg_fried', G, EGGS, 'Ovo frito / mexido (com mínimo de azeite / spray)', 'Forma clássica e muito saborosa de consumo no café da manhã ou lanches. O valor calórico varia levemente de acordo com a quantidade de gordura usada na frigideira.', '100g (Aprox. 2 unidades grandes)', 196, 13.6, 0.8, 0, [15.3, 4.2, 6.8, 2.1], 162),
  nf('egg_quail', G, EGGS, 'Ovo de codorna cozido', 'Prático e muito utilizado em saladas e petiscos funcionais. Possui densidade nutricional muito semelhante à do ovo de galinha, com um leve incremento proporcional de ferro e B12.', '100g (Aprox. 10 unidades pequenas)', 158, 13.1, 0.4, 0, [11.1, 3.5, 4.3, 1.3], 141),
  nf('egg_omelet', G, EGGS, 'Omelete simples (apenas ovos batidos e cozidos na frigideira)', 'Base prática para adicionar vegetais, queijos magros ou temperos naturais. Excelente opção para saciedade e controle glicêmico.', '100g (Aprox. 2 ovos médios batidos)', 154, 12.8, 0.6, 0, [10.8, 3.3, 4.2, 1.5], 150),
];
