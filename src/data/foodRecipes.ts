import { BONUS_RECIPES } from './bonusRecipes';
import { FoodRecipe, FoodRecipeIngredient } from '../types';

const DAIRY_IMAGE = require('../../assets/food-categories/dairy.jpg');

function dairyStub(id: string, title: string, kcal: number): FoodRecipe {
  return {
    id,
    categoryId: 'dairy',
    title,
    prepTimeMinutes: 0,
    image: DAIRY_IMAGE,
    nutritionPer100g: { kcal, protein: 0, fat: 0, carbs: 0 },
    ingredients: [],
    toTaste: [],
    steps: [],
    comingSoon: true,
  };
}

export const FOOD_RECIPES: FoodRecipe[] = [
  {
    id: 'dairy_kofte_soft_cheese',
    categoryId: 'dairy',
    title: 'Almôndegas, com queijo macio, estilo turco',
    prepTimeMinutes: 30,
    image: require('../../assets/food-recipes/dairy_kofte_soft_cheese.jpg'),
    nutritionPer100g: {
      kcal: 147.1,
      protein: 12,
      fat: 9.3,
      carbs: 3.4,
    },
    ingredients: [
      { id: 'cottage_cheese', name: 'Queijo cottage, teor de gordura 1%', amountGrams: 80 },
      {
        id: 'olive_oil',
        name: 'Azeite de oliva',
        amountGrams: 7,
        description:
          'Ao cozinhar (frituras, cozidos, assados etc.) recomendamos usar óleo refinado ou ghee. Para molhos de saladas (ou ao adicionar óleo a um prato terminado/pronto para comer, óleo não refinado é melhor.',
      },
      {
        id: 'egg',
        name: 'Ovo de galinha, cru',
        amountGrams: 20,
        description: 'Pode ser substituído por qualquer outro tipo de ovo.',
      },
      { id: 'pumpkin', name: 'Abóbora cabotiá, crua', amountGrams: 10 },
      { id: 'garlic', name: 'Alho, cru', amountGrams: 2 },
    ],
    toTaste: [
      { id: 'salt', name: 'Sal', toTaste: true },
      { id: 'black_pepper', name: 'Pimenta do reino, em pó ou grãos', toTaste: true },
      { id: 'parsley', name: 'Salsinha', toTaste: true },
      { id: 'spinach', name: 'Espinafre, cru', toTaste: true },
      { id: 'tahiti_lime', name: 'Limão tahiti', toTaste: true },
    ],
    steps: [
      'Pique finamente a salsa e o alho.',
      'Ferva a abóbora por 10 minutos.',
      'Em uma tigela, misture o queijo macio, os ovos, a abóbora, o óleo, a salsa e o alho.',
      'Aqueça a frigideira. Enrole a massa formando almôndegas e frite-as por 5 minutos de cada lado.',
      'Sirva com limão e verduras a gosto.',
    ],
  },
  dairyStub('dairy_alpro_soy_yogurt', 'Alpro, iogurte de soja', 51),
  dairyStub('dairy_cocoa_powder_drink', 'Bebida de cacau, em pó', 357),
  dairyStub(
    'dairy_berry_drink_1pct',
    'Bebida de frutas/ frutas silvestres, teor de gordura de 1.0%',
    71,
  ),
  dairyStub('dairy_ryazhenka_1pct', 'Bebida de leite fermentado Ryazhenka, 1% de gordura', 40),
  dairyStub('dairy_ryazhenka_4pct', 'Bebida de leite fermentado Ryazhenka, 4% de gordura', 67),
  dairyStub('dairy_ryazhenka_6pct', 'Bebida de leite fermentado Ryazhenka, 6% de gordura', 85),
  {
    id: 'kousa_mahshi',
    categoryId: 'beef',
    title: 'Abobrinhas, recheadas, com carne bovina, estilo árabe (Kousa Mahshi)',
    prepTimeMinutes: 40,
    image: require('../../assets/food-recipes/kousa_mahshi.jpg'),
    nutritionPer100g: {
      kcal: 152,
      protein: 10.3,
      fat: 4.4,
      carbs: 17.6,
    },
    ingredients: [
      { id: 'zucchini', name: 'Abobrinhas, cruas', amountGrams: 52 },
      {
        id: 'ground_beef',
        name: 'Carne moída, 10% de gordura, crua',
        amountGrams: 40,
        description: 'Carne bovina moída com cerca de 10% de gordura, ideal para recheios.',
      },
      { id: 'onion', name: 'Cebola crua', amountGrams: 5 },
      { id: 'rice', name: 'Arroz branco, grão longo, cru', amountGrams: 16 },
      { id: 'tomato', name: 'Tomate, vermelho, cru', amountGrams: 8 },
      { id: 'water', name: 'Água', amountGrams: 20 },
      { id: 'garlic', name: 'Alho, cru', amountGrams: 3 },
      { id: 'mint', name: 'Hortelã, fresca', amountGrams: 2 },
      { id: 'cinnamon', name: 'Canela, em pó', amountGrams: 0.5 },
      { id: 'turmeric', name: 'Cúrcuma, em pó', amountGrams: 0.5 },
      { id: 'ginger', name: 'Gengibre, picado', amountGrams: 0.2 },
      { id: 'cumin', name: 'Cominho, sementes', amountGrams: 0.5 },
      { id: 'cloves', name: 'Cravos-da-Índia secos, inteiros', amountGrams: 1 },
    ],
    toTaste: [
      { id: 'nutmeg', name: 'Noz-moscada, em pó', toTaste: true },
      { id: 'salt', name: 'Sal', toTaste: true },
      { id: 'black_pepper', name: 'Pimenta do reino, em pó ou grãos', toTaste: true },
    ],
    steps: [
      'Lave as abobrinhas. Corte as extremidades. Remova a polpa (não será usada).',
      'Lave o arroz em água fria, depois escorra a água.',
      'Lave os tomates e despeje água fervente sobre eles. Deixe esfriar e descasque-os. Pique grosseiramente e faça um purê com um mixer de imersão.',
      'Descasque a cebola e o alho. Pique-os finamente.',
      'Lave a hortelã e pique-a com uma faca.',
      'Coloque o arroz lavado, a carne moída e a cebola em uma tigela funda. Despeje o óleo. Adicione a hortelã picada, sal e especiarias a gosto: canela, noz-moscada, cúrcuma, gengibre, cominho e pimenta. Mexa.',
      'Recheie as abobrinhas, deixando um pouco de espaço nas bordas para que o recheio não vaze durante o cozimento. Transfira para uma frigideira funda.',
      'Misture o purê de tomate com água, despeje sobre as abobrinhas, tempere com sal a gosto e adicione o alho picado. Coloque a frigideira em fogo médio e deixe ferver. Adicione mais água, se necessário.',
      'Adicione os cravos. Abaixe o fogo. Tampe e cozinhe por 45-50 minutos.',
      'Transfira as abobrinhas prontas para um prato. Adicione uma pequena quantidade de molho de tomate da panela por cima.',
    ],
  },
  ...BONUS_RECIPES,
];

export function getRecipesForCategory(categoryId: FoodRecipe['categoryId']): FoodRecipe[] {
  return FOOD_RECIPES.filter((r) => r.categoryId === categoryId && !r.isBonus);
}

export function getFoodRecipe(id: string): FoodRecipe {
  const found = FOOD_RECIPES.find((r) => r.id === id);
  if (!found) throw new Error(`Receita não encontrada: ${id}`);
  return found;
}

export function getRecipeIngredient(recipeId: string, ingredientId: string): FoodRecipeIngredient {
  const recipe = getFoodRecipe(recipeId);
  const found =
    recipe.ingredients.find((i) => i.id === ingredientId) ??
    recipe.toTaste.find((i) => i.id === ingredientId);
  if (!found) throw new Error(`Ingrediente não encontrado: ${ingredientId}`);
  return found;
}
