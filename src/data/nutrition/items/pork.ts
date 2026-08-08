import { nf } from './_helpers';

const G = 'proteins' as const;
const PORK = 'pork';

export const PORK_ITEMS = [
  nf('pork_tenderloin', G, PORK, 'Filé mignon suíno grelhado', 'O corte mais magro da carne suína. Possui menos gordura que o peito de frango sem pele, entregando alta densidade de proteína e maciez extrema.', '100g (Aprox. 1 bife/medalhão médio)', 143, 29.8, 0, 0, [2.1, 0.7, 0.8, 0.3], 55),
  nf('pork_loin', G, PORK, 'Lombo suíno assado / grelhado', 'Clássico da alimentação saudável. Altamente proteico e de baixíssima gordura, ideal para variar o cardápio mantendo o déficit calórico.', '100g (Aprox. 1 bife ou 2 fatias)', 170, 30.1, 0, 0, [4.8, 1.6, 2.1, 0.6], 58),
  nf('pork_leg_trimmed', G, PORK, 'Pernil suíno assado (sem capa de gordura)', 'Muito saboroso e versátil. Quando limpo da gordura externa, torna-se um corte intermediário magro perfeito para assados e recheios desfiados.', '100g (Aprox. 1 bife médio ou fatias)', 210, 28.5, 0, 0, [9.8, 3.4, 4.2, 1.1], 62),
  nf('pork_chop', G, PORK, 'Bisteca suína grelhada (sem gordura de borda)', 'Corte do lombo com osso. É suculento, fácil de preparar no dia a dia e apresenta boa densidade proteica quando aparada a gordura externa.', '100g (Aprox. 1 unidade média desossada)', 206, 27.2, 0, 0, [10.1, 3.6, 4.4, 1.1], 60),
  nf('pork_ribs', G, PORK, 'Costelinha suína assada', 'Um dos cortes mais apreciados pelo sabor e textura. Possui maior teor lipídico e calórico, exigindo moderação e bom encaixe nos macronutrientes do dia.', '100g (Aprox. 2 a 3 ripas pequenas desossadas)', 290, 24.0, 0, 0, [21.3, 7.8, 9.4, 2.3], 78),
  nf('pork_coppa', G, PORK, 'Copa lombo suíno assado', 'Localizado na região do pescoço/ombro, apresenta marmoreio de gordura que deixa a carne extremamente macia. Ideal para grelhados e churrascos.', '100g (Aprox. 1 bife ou fatias)', 245, 25.8, 0, 0, [15.2, 5.5, 6.8, 1.8], 65),
  nf('pork_belly', G, PORK, 'Barriga de porco / panceta assada', 'Corte rico em gordura e pele. Apresenta alta densidade calórica e sabor intenso, sendo consumido comumente como aperitivo ou em dietas low carb.', '100g (Aprox. 3 a 4 tiras/tornos)', 398, 18.2, 0, 0, [35.6, 13.1, 15.8, 4.1], 70),
  nf('pork_bacon', G, PORK, 'Bacon suíno frito / grelhado', 'Derivado defumado e curado. Por ser desidratado no preparo, ganha concentração de proteína por grama, mas apresenta altíssimo teor de gordura e sódio.', '100g (Aprox. 6 a 8 fatias finas grelhadas)', 541, 37.0, 1.4, 0, [41.8, 13.8, 18.5, 5.1], 1717),
  nf('pork_sausage_loin', G, PORK, 'Linguiça de lombo suíno grelhada', 'Opção mais magra do que a linguiça toscana tradicional, pois utiliza predominantemente o lombo suíno. Mantém boa quantidade de proteína com teor de gordura reduzido.', '100g (Aprox. 1 gomo médio)', 225, 22.0, 1.2, 0, [14.5, 5.2, 6.4, 1.8], 720),
  nf('pork_rinds', G, PORK, 'Torresmo pururucado (assado na airfryer/forno)', 'Feito a partir da pele suína desidratada e pururucada. Surpreende pela quantidade maciça de proteína, sendo um aperitivo denso e bastante calórico.', '100g (Aprox. 1 xícara de pedaços)', 544, 61.3, 0, 0, [31.3, 11.2, 14.1, 3.8], 850),
];
