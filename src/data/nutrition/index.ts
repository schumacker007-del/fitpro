import { RED_MEAT_ITEMS } from './items/redMeat';
import { POULTRY_ITEMS } from './items/poultry';
import { PORK_ITEMS } from './items/pork';
import { SEAFOOD_ITEMS } from './items/seafood';
import { EGG_ITEMS } from './items/eggs';
import { DAIRY_ITEMS } from './items/dairy';
import { NutritionFoodItem, NutritionGroupId, NutritionGroupInfo } from './types';

export type { NutritionFoodItem, NutritionGroupId, NutritionGroupInfo } from './types';

export const NUTRITION_GROUPS: NutritionGroupInfo[] = [
  {
    id: 'proteins',
    label: 'Proteínas',
    description:
      'Carnes vermelhas, aves, peixes, frutos do mar, ovos e suínos. Valores consideram preparo grelhado/assado sem adição de óleo, salvo indicação.',
    image: require('../../../assets/food-categories/beef.jpg'),
    searchTerms: ['carne', 'frango', 'peixe', 'ovo', 'porco', 'proteína', 'atum', 'salmão'],
    subcategories: [
      { id: 'red_meat', label: 'Carnes vermelhas' },
      { id: 'poultry', label: 'Aves' },
      { id: 'pork', label: 'Suínos' },
      { id: 'seafood', label: 'Peixes e frutos do mar' },
      { id: 'eggs', label: 'Ovos' },
    ],
    recipeCategoryIds: ['beef', 'poultry', 'pork', 'seafood', 'eggs_cheese'],
  },
  {
    id: 'dairy',
    label: 'Leite e derivados',
    description:
      'Laticínios e alternativas veganas. Fontes de cálcio, proteínas de rápida/lenta absorção e gorduras.',
    image: require('../../../assets/food-categories/dairy.jpg'),
    searchTerms: ['leite', 'iogurte', 'queijo', 'cottage', 'laticínio', 'soja', 'aveia'],
    subcategories: [
      { id: 'milk', label: 'Leites' },
      { id: 'vegan', label: 'Alternativas veganas' },
      { id: 'derivatives', label: 'Derivados' },
    ],
    recipeCategoryIds: ['dairy'],
  },
  {
    id: 'legumes_seeds',
    label: 'Leguminosas, grãos e sementes',
    description: 'Fontes de carboidratos complexos, fibras, proteínas vegetais e micronutrientes.',
    image: require('../../../assets/food-categories/legumes.jpg'),
    searchTerms: ['feijão', 'lentilha', 'chia', 'linhaça', 'grão-de-bico'],
    subcategories: [],
  },
  {
    id: 'cereals',
    label: 'Cereais, tubérculos e farinhas',
    description: 'Base de energia para o treino: arroz, aveia, batata-doce, mandioca e farinhas.',
    image: require('../../../assets/food-categories/cereals.jpg'),
    searchTerms: ['arroz', 'aveia', 'batata', 'mandioca', 'tapioca', 'macarrão'],
    subcategories: [],
  },
  {
    id: 'fruits',
    label: 'Frutas',
    description: 'Fontes primárias de frutose, fibras, vitaminas e hidratação.',
    image: require('../../../assets/food-categories/fruits.jpg'),
    searchTerms: ['banana', 'maçã', 'morango', 'abacaxi', 'uva', 'mamão'],
    subcategories: [],
  },
  {
    id: 'vegetables',
    label: 'Verduras e legumes',
    description: 'Densidade nutritiva, saciedade e controle calórico.',
    image: require('../../../assets/food-categories/vegetables.jpg'),
    searchTerms: ['brócolis', 'espinafre', 'couve', 'cenoura', 'tomate', 'abobrinha'],
    subcategories: [],
  },
  {
    id: 'healthy_fats',
    label: 'Gorduras boas e oleaginosas',
    description: 'Energia densa, ácidos graxos essenciais e saúde hormonal.',
    image: require('../../../assets/food-categories/nuts_seeds.jpg'),
    searchTerms: ['abacate', 'azeite', 'castanha', 'amêndoa', 'nozes', 'amendoim'],
    subcategories: [],
  },
  {
    id: 'breads_processed',
    label: 'Pães, massas e industrializados',
    description: 'Alimentos do dia a dia que o usuário fitness costuma encaixar com moderação.',
    image: require('../../../assets/food-categories/flour_pasta.jpg'),
    searchTerms: ['pão', 'integral', 'tortilla', 'biscoito', 'pão de queijo'],
    subcategories: [],
  },
  {
    id: 'beverages',
    label: 'Bebidas e infusões',
    description: 'Impacto calórico e nutricional do que bebemos ao longo do dia.',
    image: require('../../../assets/food-categories/juices.jpg'),
    searchTerms: ['café', 'chá', 'suco', 'água de coco', 'kombucha'],
    subcategories: [],
  },
  {
    id: 'seasonings',
    label: 'Temperos, condimentos e molhos',
    description: 'Calorias "escondidas" na preparação dos alimentos.',
    image: require('../../../assets/food-categories/seasonings.jpg'),
    searchTerms: ['azeite', 'molho', 'shoyu', 'mostarda', 'ketchup', 'alho'],
    subcategories: [],
  },
  {
    id: 'sweets_fits',
    label: 'Doces, sobremesas e fits',
    description: 'Opções para matar a vontade de doce ou encaixar na refeição livre.',
    image: require('../../../assets/food-categories/sweets.jpg'),
    searchTerms: ['cacau', 'chocolate', 'mel', 'eritritol', 'stévia', 'doce'],
    subcategories: [],
  },
];

const ALL_ITEMS: NutritionFoodItem[] = [
  ...RED_MEAT_ITEMS,
  ...POULTRY_ITEMS,
  ...PORK_ITEMS,
  ...SEAFOOD_ITEMS,
  ...EGG_ITEMS,
  ...DAIRY_ITEMS,
];

const ITEM_BY_ID = new Map(ALL_ITEMS.map((item) => [item.id, item]));

export function getNutritionGroup(id: NutritionGroupId): NutritionGroupInfo {
  const found = NUTRITION_GROUPS.find((g) => g.id === id);
  if (!found) throw new Error(`Grupo nutricional desconhecido: ${id}`);
  return found;
}

export function getNutritionFood(id: string): NutritionFoodItem {
  const found = ITEM_BY_ID.get(id);
  if (!found) throw new Error(`Alimento não encontrado: ${id}`);
  return found;
}

export function getFoodsForGroup(groupId: NutritionGroupId): NutritionFoodItem[] {
  return ALL_ITEMS.filter((item) => item.groupId === groupId);
}

export function getFoodsForSubcategory(groupId: NutritionGroupId, subcategoryId: string): NutritionFoodItem[] {
  return ALL_ITEMS.filter((item) => item.groupId === groupId && item.subcategoryId === subcategoryId);
}

export function searchNutritionGroups(query: string): NutritionGroupInfo[] {
  const q = query.trim().toLowerCase();
  if (!q) return NUTRITION_GROUPS;
  return NUTRITION_GROUPS.filter(
    (g) =>
      g.label.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.searchTerms.some((t) => t.toLowerCase().includes(q)),
  );
}

export function searchNutritionFoods(query: string): NutritionFoodItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.highlight.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q),
  );
}

export function getNutritionFoodCount(): number {
  return ALL_ITEMS.length;
}
