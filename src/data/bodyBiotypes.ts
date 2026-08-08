import { BiotypeIdentificationTest, BodyBiotype, BodyBiotypeId } from '../types';

export const BODY_BIOTYPES: BodyBiotype[] = [
  {
    id: 'ectomorph',
    name: 'Ectomorfo',
    nickname: 'O "Magro Natural"',
    structure: 'Ossos finos, articulações pequenas, ombros e quadris estreitos, caixa torácica estreita.',
    metabolism: 'Extremamente acelerado. Queima calorias muito rápido.',
    characteristics:
      'Dificuldade para ganhar peso (tanto massa muscular quanto gordura). Visual magro e longilíneo.',
    trainingTendency:
      'Responde melhor a treinos mais curtos, intensos e com foco em cargas progressivas (hipertrofia pura), sem excesso de aeróbico para não gastar as calorias necessárias para construir músculo.',
    color: '#60A5FA',
    icon: 'resize-outline',
  },
  {
    id: 'mesomorph',
    name: 'Mesomorfo',
    nickname: 'O "Atleta Natural"',
    structure:
      'Ossos médios a largos, estrutura em formato de "V" (ombros largos e cintura fina), boa densidade muscular natural.',
    metabolism: 'Eficiente e bem regulado.',
    characteristics:
      'Ganha massa muscular com facilidade e consegue perder gordura de forma relativamente rápida quando ajusta a dieta.',
    trainingTendency:
      'Responde muito bem a praticamente qualquer estímulo (força, hipertrofia, resistência, métodos avançados) e tolera volumes de treino mais altos.',
    color: '#34D399',
    icon: 'barbell-outline',
  },
  {
    id: 'endomorph',
    name: 'Endomorfo',
    nickname: 'O "Forte/Largo Natural"',
    structure: 'Estrutura óssea larga, articulações grossas, cintura e quadris mais largos, tórax denso.',
    metabolism: 'Lento e muito eficiente em armazenar energia.',
    characteristics:
      'Grande facilidade em ganhar força e massa muscular, mas com forte tendência a acumular gordura corporal.',
    trainingTendency:
      'Precisa de maior controle calórico na dieta e se beneficia de volume de treino elevado e atividades regulares de queima calórica (aeróbico/cardio) para manter o percentual de gordura controlado.',
    color: '#F97316',
    icon: 'shield-outline',
  },
];

export const BIOTYPE_INTRO =
  'A teoria dos biotipos (ectomorfo, mesomorfo e endomorfo) classifica a estrutura corporal. A maioria das pessoas é uma mistura (ex.: meso-endomorfo), mas identificar o tipo dominante ajuda a ajustar volume de treino e estratégia alimentar.';

export const BIOTYPE_TESTS: BiotypeIdentificationTest[] = [
  {
    id: 'wrist_test',
    title: 'Teste do pulso (estrutura óssea)',
    instructions:
      'Envolva o pulso esquerdo com o polegar e o dedo médio da mão direita, logo acima do osso do pulso.',
    results: [
      { biotypeId: 'ectomorph', label: 'Os dedos se sobrepõem com facilidade (sobra espaço).' },
      { biotypeId: 'mesomorph', label: 'Os dedos se tocam ponta com ponta.' },
      { biotypeId: 'endomorph', label: 'Os dedos não se tocam (fica um espaço entre eles).' },
    ],
  },
  {
    id: 'weight_history',
    title: 'Histórico de ganho e perda de peso',
    instructions:
      'Pense em como seu corpo reagia na infância e adolescência, antes de treinar de forma estruturada.',
    results: [
      { biotypeId: 'ectomorph', label: '"Comia de tudo e nunca engordava uma grama."' },
      { biotypeId: 'mesomorph', label: '"Sempre fui atlético, forte ou com boa definição, sem fazer muito esforço."' },
      { biotypeId: 'endomorph', label: '"Qualquer deslize na alimentação já me fazia ganhar barriga/peso rápido."' },
    ],
  },
  {
    id: 'shoulder_hip_ratio',
    title: 'Proporção ombros × quadril',
    instructions:
      'Olhe-se de frente no espelho e compare a largura dos ombros com a largura do quadril.',
    results: [
      { biotypeId: 'ectomorph', label: 'Ombros e quadris com largura parecida, visual mais retilíneo.' },
      { biotypeId: 'mesomorph', label: 'Ombros visivelmente mais largos que o quadril (formato em V).' },
      { biotypeId: 'endomorph', label: 'Quadris largos, cintura mais espessa, estrutura mais arredondada.' },
    ],
  },
];

export function getBodyBiotype(id: BodyBiotypeId): BodyBiotype {
  const found = BODY_BIOTYPES.find((b) => b.id === id);
  if (!found) throw new Error(`Biotipo desconhecido: ${id}`);
  return found;
}
