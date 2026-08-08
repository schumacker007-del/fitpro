import { FoodRecipe } from '../types';

const SWEETS_IMAGE = require('../../assets/food-categories/sweets.jpg');
const FAST_FOOD_IMAGE = require('../../assets/food-categories/fast_food.jpg');

/** Fase 1 — receitas do e-book bônus (amostra; mais serão adicionadas pós-lançamento). */
export const BONUS_RECIPES: FoodRecipe[] = [
  {
    id: 'bonus_brownie_proteico',
    categoryId: 'sweets',
    title: 'Brownie proteico',
    chapter: 'Doces fit',
    isBonus: true,
    prepTimeMinutes: 15,
    image: SWEETS_IMAGE,
    nutritionPer100g: { kcal: 305, protein: 23, fat: 10, carbs: 22 },
    nutritionPerServing: { kcal: 305, protein: 23, fat: 10, carbs: 22 },
    nutritionLabel: 'por porção',
    ingredients: [
      { id: 'egg_white', name: 'Claras de ovo' },
      { id: 'chocolate_70', name: 'Chocolate 70%' },
      { id: 'cocoa', name: 'Cacau em pó' },
      { id: 'whey_chocolate', name: 'Whey protein sabor chocolate' },
    ],
    toTaste: [],
    steps: [
      'Bata as claras até ficarem levemente firmes.',
      'Misture o chocolate, o cacau e o whey às claras até formar uma massa homogênea.',
      'Despeje em forma pequena untada e asse em forno médio por cerca de 10 minutos.',
      'Deixe esfriar um pouco antes de servir.',
    ],
  },
  {
    id: 'bonus_panqueca_banana',
    categoryId: 'sweets',
    title: 'Panqueca proteica de banana',
    chapter: 'Doces fit',
    isBonus: true,
    prepTimeMinutes: 15,
    image: SWEETS_IMAGE,
    nutritionPer100g: { kcal: 360, protein: 34, fat: 12, carbs: 28 },
    nutritionPerServing: { kcal: 360, protein: 34, fat: 12, carbs: 28 },
    nutritionLabel: 'por porção',
    ingredients: [
      { id: 'whey_cookies', name: 'Whey protein sabor cookies' },
      { id: 'egg', name: 'Ovo' },
      { id: 'banana', name: 'Banana' },
      { id: 'milk_powder', name: 'Leite em pó' },
      { id: 'cinnamon', name: 'Canela' },
    ],
    toTaste: [],
    steps: [
      'Amasse a banana até formar um purê.',
      'Misture o ovo, o whey, o leite em pó e a canela.',
      'Aqueça uma frigideira antiaderente e faça as panquecas em porções pequenas.',
      'Vire quando dourar de um lado e finalize do outro.',
    ],
  },
  {
    id: 'bonus_bolo_caneca',
    categoryId: 'sweets',
    title: 'Bolo de caneca proteico',
    chapter: 'Doces fit',
    isBonus: true,
    prepTimeMinutes: 5,
    image: SWEETS_IMAGE,
    nutritionPer100g: { kcal: 280, protein: 26, fat: 2, carbs: 40 },
    nutritionPerServing: { kcal: 280, protein: 26, fat: 2, carbs: 40 },
    nutritionLabel: 'por porção',
    ingredients: [
      { id: 'oats', name: 'Aveia' },
      { id: 'banana', name: 'Banana' },
      { id: 'egg_white', name: 'Clara de ovo' },
      { id: 'whey', name: 'Whey protein' },
      { id: 'cinnamon', name: 'Canela' },
    ],
    toTaste: [],
    steps: [
      'Misture todos os ingredientes em uma caneca grande até formar uma massa homogênea.',
      'Leve ao micro-ondas por 1 a 2 minutos, até firmar.',
      'Deixe esfriar um pouco antes de comer.',
    ],
  },
  {
    id: 'bonus_brigadeiro_whey',
    categoryId: 'sweets',
    title: 'Brigadeiro de whey',
    chapter: 'Doces fit',
    isBonus: true,
    prepTimeMinutes: 20,
    image: SWEETS_IMAGE,
    nutritionPer100g: { kcal: 520, protein: 48, fat: 24, carbs: 25 },
    nutritionPerServing: { kcal: 520, protein: 48, fat: 24, carbs: 25 },
    nutritionLabel: 'por porção',
    ingredients: [
      { id: 'water', name: 'Água' },
      { id: 'cocoa', name: 'Cacau em pó' },
      { id: 'milk_powder', name: 'Leite em pó' },
      { id: 'light_margarine', name: 'Margarina light' },
      { id: 'whey', name: 'Whey protein' },
    ],
    toTaste: [],
    steps: [
      'Misture água, cacau, leite em pó, margarina e whey em uma panela.',
      'Cozinhe em fogo baixo, mexendo sempre, até desgrudar do fundo.',
      'Deixe esfriar, enrole os brigadeiros e passe no granulado, se desejar.',
    ],
  },
  {
    id: 'bonus_croquete_carne',
    categoryId: 'fast_food',
    title: 'Croquetes de carne com batata',
    chapter: 'Salgados fit',
    isBonus: true,
    prepTimeMinutes: 25,
    image: FAST_FOOD_IMAGE,
    nutritionPer100g: { kcal: 536, protein: 44, fat: 24, carbs: 50 },
    nutritionPerServing: { kcal: 536, protein: 44, fat: 24, carbs: 50 },
    nutritionLabel: 'por porção',
    ingredients: [
      { id: 'potato', name: 'Batata cozida' },
      { id: 'lean_beef', name: 'Carne moída magra' },
    ],
    toTaste: [
      { id: 'salt', name: 'Sal', toTaste: true },
      { id: 'pepper', name: 'Pimenta', toTaste: true },
    ],
    steps: [
      'Amasse a batata cozida e misture com a carne moída já refogada e temperada.',
      'Modele croquetes alongados.',
      'Leve à air fryer a 180 °C por cerca de 12 minutos, virando na metade do tempo.',
    ],
  },
];

export function getBonusRecipes(): FoodRecipe[] {
  return BONUS_RECIPES;
}
