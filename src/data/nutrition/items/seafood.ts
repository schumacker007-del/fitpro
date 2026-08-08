import { nf } from './_helpers';

const G = 'proteins' as const;
const SEAFOOD = 'seafood';

export const SEAFOOD_ITEMS = [
  nf('fish_tilapia', G, SEAFOOD, 'Filé de tilápia', 'Um dos peixes mais consumidos no meio fitness pelo sabor suave, baixo custo e facilidade de preparo. É ultra magro e entrega alta quantidade de proteína com pouquíssimas calorias.', '100g (Aprox. 1 filé médio)', 128, 26.2, 0, 0, [2.7, 0.9, 1.0, 0.6], 56),
  nf('fish_salmon', G, SEAFOOD, 'Salmão grelhado (com pele)', 'Referência em gorduras saudáveis. É uma das maiores fontes alimentares de ácidos graxos ômega-3 (EPA/DHA), além de fornecer astaxantina e vitamina D.', '100g (Aprox. 1 posta ou filé pequeno)', 206, 22.1, 0, 0, [12.3, 2.5, 4.4, 4.1], 60),
  nf('fish_tuna_fresh', G, SEAFOOD, 'Atum fresco grelhado', 'Proteína densa de altíssima pureza. A versão fresca do atum entrega mais proteína por grama do que a maioria das carnes vermelhas, com quantidade residual de gordura.', '100g (Aprox. 1 posta média)', 130, 28.3, 0, 0, [1.2, 0.3, 0.3, 0.4], 47),
  nf('fish_tuna_canned_water', G, SEAFOOD, 'Atum em conserva (em água)', 'O "curinga" da praticidade fitness. Excelente opção proteica pronta para consumo para lanches rápidos, patês funcionais e saladas.', '100g (Aprox. 1 lata drenada)', 116, 25.5, 0, 0, [0.8, 0.2, 0.2, 0.3], 340),
  nf('fish_tuna_canned_oil', G, SEAFOOD, 'Atum em conserva (em óleo)', 'Mesmo drenado, conserva o óleo vegetal da lata, o que eleva consideravelmente o teor calórico em relação à versão em água.', '100g (Aprox. 1 lata drenada)', 198, 26.1, 0, 0, [10.2, 1.5, 5.8, 2.3], 350),
  nf('seafood_shrimp', G, SEAFOOD, 'Camarão cozido / grelhado', 'Uma das fontes proteicas mais magras da natureza (menos de 100 kcal por 100g). É riquíssimo em iodo, selênio e astaxantina.', '100g (Aprox. 10 a 12 camarões médios)', 99, 23.8, 0.2, 0, [0.3, 0.1, 0.1, 0.1], 112),
  nf('fish_cod', G, SEAFOOD, 'Bacalhau cozido / grelhado (dessalgado)', 'Peixe de águas frias, magro e altamente proteico. Oferece boa quantidade de B12 e fósforo. Atenção ao processo de dessalgue para controlar o sódio.', '100g (Aprox. 1 posta ou lombo médio)', 105, 23.2, 0, 0, [0.9, 0.2, 0.1, 0.4], 320),
  nf('fish_sardine', G, SEAFOOD, 'Sardinha assada / grelhada fresca', 'Um dos melhores superalimentos do oceano. Possui uma das maiores concentrações de ômega-3, cálcio e vitamina D.', '100g (Aprox. 2 a 3 unidades médias)', 208, 24.6, 0, 0, [11.5, 3.0, 3.8, 4.1], 90),
  nf('fish_hake', G, SEAFOOD, 'Merluza / pescada branca grelhada', 'Peixe branco de sabor muito suave e textura leve. Extremamente magro e de altíssima digestibilidade, ideal para refeições noturnas.', '100g (Aprox. 1 filé médio)', 110, 23.5, 0, 0, [1.4, 0.3, 0.4, 0.5], 72),
  nf('seafood_squid', G, SEAFOOD, 'Lula cozida / grelhada', 'Fruto do mar leve e versátil. Possui baixíssima densidade calórica e fornece boas doses de cobre, B12 e zinco.', '100g (Aprox. 1 xícara de anéis de lula)', 92, 18.0, 3.1, 0, [1.4, 0.4, 0.2, 0.6], 260),
  nf('seafood_octopus', G, SEAFOOD, 'Polvo cozido / grelhado', 'Sofisticado e proteico. Surpreende pela quantidade de proteína por porção e por ser uma fonte fantástica de vitamina B12, ferro e potássio.', '100g (Aprox. 1 a 2 tentáculos médios)', 164, 29.8, 4.4, 0, [2.1, 0.5, 0.3, 0.7], 460),
  nf('seafood_mussel', G, SEAFOOD, 'Mexilhão / marisco cozido', 'Fonte densa de minerais trace como manganês, selênio e zinco, além de ferro. Apresenta uma pequena cota natural de carboidratos.', '100g (Aprox. 10 a 12 unidades sem concha)', 172, 23.8, 7.4, 0, [4.5, 0.9, 1.0, 1.8], 286),
];
