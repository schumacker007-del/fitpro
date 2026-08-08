import { FoodNutritionPer100g } from '../types';

export interface NutrientRow {
  label: string;
  value: number;
}

export interface NutrientIndex {
  label: string;
  displayValue: string;
  level: string;
  /** Posição do marcador na barra (0 = esquerda, 1 = direita). */
  markerPosition: number;
}

export interface FoodIngredientDetail {
  ingredientId: string;
  image: number;
  nutritionPer100g: FoodNutritionPer100g;
  extraNutrients: NutrientRow[];
  glycemicIndex?: NutrientIndex;
  caloricDensityIndex?: NutrientIndex;
  inflammatoryFactor?: NutrientIndex;
  antioxidantIndex?: NutrientIndex;
}

const COTTAGE_CHEESE: FoodIngredientDetail = {
  ingredientId: 'cottage_cheese',
  image: require('../../assets/food-ingredients/cottage_cheese.jpg'),
  nutritionPer100g: {
    kcal: 72,
    protein: 12.4,
    fat: 1,
    carbs: 2.7,
  },
  extraNutrients: [
    { label: 'Gorduras monoinsaturadas', value: 0.284 },
    { label: 'Gorduras saturadas', value: 0.632 },
    { label: 'Gorduras poliinsaturadas', value: 0.031 },
    { label: 'Betacaroteno', value: 0.003 },
    { label: 'Vitamina A', value: 40 },
    { label: 'Vitamina B12', value: 0.001 },
    { label: 'Vitamina B6', value: 0.07 },
    { label: 'Vitamina D', value: 0 },
    { label: 'Vitamina E', value: 0.015 },
    { label: 'Vitamina C', value: 0 },
    { label: 'Riboflavina', value: 0.16 },
    { label: 'Ferro', value: 0.14 },
    { label: 'Potássio', value: 86 },
    { label: 'Cálcio', value: 61 },
    { label: 'Magnésio', value: 5 },
    { label: 'Cobre', value: 0.028 },
    { label: 'Sódio', value: 0.013 },
    { label: 'Fósforo', value: 134 },
    { label: 'Zinco', value: 0.38 },
    { label: 'Celulose', value: 0 },
    { label: 'Colesterol', value: 4 },
  ],
  glycemicIndex: {
    label: 'Índice glicêmico',
    displayValue: '100',
    level: 'Alto',
    markerPosition: 0.98,
  },
  caloricDensityIndex: {
    label: 'Índice de densidade calórica',
    displayValue: '0,72',
    level: 'baixo',
    markerPosition: 0.08,
  },
  inflammatoryFactor: {
    label: 'Fator inflamatório',
    displayValue: '-28',
    level: 'Médio',
    markerPosition: 0.42,
  },
};

const OLIVE_OIL: FoodIngredientDetail = {
  ingredientId: 'olive_oil',
  image: require('../../assets/food-ingredients/olive_oil.jpg'),
  nutritionPer100g: {
    kcal: 898,
    protein: 0,
    fat: 99.8,
    carbs: 0,
  },
  extraNutrients: [
    { label: 'Gorduras saturadas', value: 16.8 },
    { label: 'Gorduras poliinsaturadas', value: 13.2 },
    { label: 'Betacaroteno', value: 0 },
    { label: 'Vitamina A', value: 0 },
    { label: 'Riboflavina', value: 0 },
    { label: 'Ferro', value: 0.4 },
    { label: 'Potássio', value: 0 },
    { label: 'Cálcio', value: 2 },
    { label: 'Magnésio', value: 0 },
    { label: 'Sódio', value: 0 },
    { label: 'Fósforo', value: 2 },
    { label: 'Celulose', value: 0 },
  ],
  caloricDensityIndex: {
    label: 'Índice de densidade calórica',
    displayValue: '8,98',
    level: 'Super alto',
    markerPosition: 0.98,
  },
  inflammatoryFactor: {
    label: 'Fator inflamatório',
    displayValue: '0',
    level: 'Médio',
    markerPosition: 0.5,
  },
};

const EGG: FoodIngredientDetail = {
  ingredientId: 'egg',
  image: require('../../assets/food-ingredients/egg.jpg'),
  nutritionPer100g: {
    kcal: 157,
    protein: 12.7,
    fat: 11.5,
    carbs: 0.7,
  },
  extraNutrients: [
    { label: 'Gorduras saturadas', value: 3 },
    { label: 'Betacaroteno', value: 0.06 },
    { label: 'Vitamina A', value: 833.333 },
    { label: 'Vitamina C', value: 0 },
    { label: 'Riboflavina', value: 0.44 },
    { label: 'Ferro', value: 2.5 },
    { label: 'Potássio', value: 140 },
    { label: 'Cálcio', value: 55 },
    { label: 'Magnésio', value: 12 },
    { label: 'Sódio', value: 0.134 },
    { label: 'Fósforo', value: 192 },
    { label: 'Celulose', value: 0 },
    { label: 'Colesterol', value: 570 },
  ],
  caloricDensityIndex: {
    label: 'Índice de densidade calórica',
    displayValue: '1,57',
    level: 'Médio',
    markerPosition: 0.25,
  },
  inflammatoryFactor: {
    label: 'Fator inflamatório',
    displayValue: '0',
    level: 'Médio',
    markerPosition: 0.5,
  },
};

const PUMPKIN: FoodIngredientDetail = {
  ingredientId: 'pumpkin',
  image: require('../../assets/food-ingredients/pumpkin.jpg'),
  nutritionPer100g: {
    kcal: 34,
    protein: 0.9,
    fat: 0.1,
    carbs: 8.6,
  },
  extraNutrients: [
    { label: 'Vitamina A', value: 1370 },
    { label: 'Vitamina B6', value: 0.156 },
    { label: 'Vitamina C', value: 12.3 },
    { label: 'Riboflavina', value: 0.062 },
    { label: 'Ferro', value: 0.58 },
    { label: 'Potássio', value: 350 },
    { label: 'Cálcio', value: 28 },
    { label: 'Magnésio', value: 14 },
    { label: 'Sódio', value: 0.004 },
    { label: 'Fósforo', value: 23 },
    { label: 'Zinco', value: 0.21 },
    { label: 'Celulose', value: 1.5 },
    { label: 'Colesterol', value: 0 },
  ],
};

const GARLIC: FoodIngredientDetail = {
  ingredientId: 'garlic',
  image: require('../../assets/food-ingredients/garlic.jpg'),
  nutritionPer100g: {
    kcal: 149,
    protein: 6.4,
    fat: 0.5,
    carbs: 29.9,
  },
  extraNutrients: [
    { label: 'Gorduras monoinsaturadas', value: 0.011 },
    { label: 'Gorduras saturadas', value: 0.089 },
    { label: 'Gorduras poliinsaturadas', value: 0.249 },
    { label: 'Betacaroteno', value: 0.005 },
    { label: 'Vitamina A', value: 9 },
    { label: 'Vitamina B12', value: 0 },
    { label: 'Vitamina B6', value: 1.235 },
    { label: 'Vitamina D', value: 0 },
    { label: 'Vitamina E', value: 0.12 },
    { label: 'Vitamina C', value: 31.2 },
    { label: 'Riboflavina', value: 0.11 },
    { label: 'Ferro', value: 1.7 },
    { label: 'Potássio', value: 401 },
    { label: 'Cálcio', value: 181 },
    { label: 'Magnésio', value: 25 },
    { label: 'Cobre', value: 0.299 },
    { label: 'Sódio', value: 0.017 },
    { label: 'Fósforo', value: 153 },
    { label: 'Zinco', value: 1.16 },
    { label: 'Celulose', value: 2.1 },
    { label: 'Colesterol', value: 0 },
  ],
  glycemicIndex: {
    label: 'Índice glicêmico',
    displayValue: '49',
    level: 'baixo',
    markerPosition: 0.49,
  },
  caloricDensityIndex: {
    label: 'Índice de densidade calórica',
    displayValue: '1,49',
    level: 'Médio',
    markerPosition: 0.25,
  },
  inflammatoryFactor: {
    label: 'Fator inflamatório',
    displayValue: '4.863',
    level: 'Alto',
    markerPosition: 0.98,
  },
  antioxidantIndex: {
    label: 'Antioxidante',
    displayValue: '5.708',
    level: 'Médio',
    markerPosition: 0.68,
  },
};

const SALT: FoodIngredientDetail = {
  ingredientId: 'salt',
  image: require('../../assets/food-ingredients/salt.jpg'),
  nutritionPer100g: {
    kcal: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  },
  extraNutrients: [
    { label: 'Gorduras saturadas', value: 0 },
    { label: 'Betacaroteno', value: 0 },
    { label: 'Vitamina A', value: 0 },
    { label: 'Vitamina C', value: 0 },
    { label: 'Riboflavina', value: 0 },
    { label: 'Ferro', value: 2.9 },
    { label: 'Potássio', value: 9 },
    { label: 'Cálcio', value: 368 },
    { label: 'Magnésio', value: 22 },
    { label: 'Sódio', value: 0.387 },
    { label: 'Fósforo', value: 75 },
    { label: 'Celulose', value: 0 },
    { label: 'Colesterol', value: 0 },
  ],
  caloricDensityIndex: {
    label: 'Índice de densidade calórica',
    displayValue: '0',
    level: 'Super baixo',
    markerPosition: 0.02,
  },
  inflammatoryFactor: {
    label: 'Fator inflamatório',
    displayValue: '0',
    level: 'Médio',
    markerPosition: 0.5,
  },
};

const BLACK_PEPPER: FoodIngredientDetail = {
  ingredientId: 'black_pepper',
  image: require('../../assets/food-ingredients/black_pepper.jpg'),
  nutritionPer100g: {
    kcal: 255,
    protein: 10.9,
    fat: 3.3,
    carbs: 64.8,
  },
  extraNutrients: [
    { label: 'Gorduras monoinsaturadas', value: 1.01 },
    { label: 'Gorduras saturadas', value: 0.98 },
    { label: 'Gorduras poliinsaturadas', value: 1.13 },
    { label: 'Betacaroteno', value: 0.156 },
    { label: 'Vitamina A', value: 299 },
    { label: 'Vitamina B12', value: 0 },
    { label: 'Vitamina B6', value: 0.34 },
    { label: 'Vitamina D', value: 0 },
    { label: 'Vitamina E', value: 1.08 },
    { label: 'Vitamina C', value: 21 },
    { label: 'Riboflavina', value: 0.24 },
    { label: 'Ferro', value: 28.86 },
    { label: 'Potássio', value: 1259 },
    { label: 'Cálcio', value: 437 },
    { label: 'Magnésio', value: 194 },
    { label: 'Cobre', value: 1.127 },
    { label: 'Sódio', value: 0.044 },
    { label: 'Fósforo', value: 173 },
    { label: 'Zinco', value: 1.42 },
    { label: 'Celulose', value: 26.5 },
    { label: 'Colesterol', value: 0 },
  ],
  glycemicIndex: {
    label: 'Índice glicêmico',
    displayValue: '25',
    level: 'baixo',
    markerPosition: 0.02,
  },
  caloricDensityIndex: {
    label: 'Índice de densidade calórica',
    displayValue: '2,55',
    level: 'Alto',
    markerPosition: 0.67,
  },
  inflammatoryFactor: {
    label: 'Fator inflamatório',
    displayValue: '-5',
    level: 'Médio',
    markerPosition: 0.52,
  },
  antioxidantIndex: {
    label: 'Antioxidante',
    displayValue: '34.053',
    level: 'Alto',
    markerPosition: 0.98,
  },
};

const PARSLEY: FoodIngredientDetail = {
  ingredientId: 'parsley',
  image: require('../../assets/food-ingredients/parsley.jpg'),
  nutritionPer100g: {
    kcal: 49,
    protein: 3.7,
    fat: 0.4,
    carbs: 7.6,
  },
  extraNutrients: [
    { label: 'Gorduras saturadas', value: 0.1 },
    { label: 'Betacaroteno', value: 5.7 },
    { label: 'Vitamina A', value: 0 },
    { label: 'Vitamina C', value: 150 },
    { label: 'Riboflavina', value: 0.05 },
    { label: 'Ferro', value: 1.9 },
    { label: 'Potássio', value: 800 },
    { label: 'Cálcio', value: 245 },
    { label: 'Magnésio', value: 85 },
    { label: 'Sódio', value: 0.034 },
    { label: 'Fósforo', value: 95 },
    { label: 'Celulose', value: 2.1 },
    { label: 'Colesterol', value: 0 },
  ],
  caloricDensityIndex: {
    label: 'Índice de densidade calórica',
    displayValue: '0,49',
    level: 'Super baixo',
    markerPosition: 0.05,
  },
  inflammatoryFactor: {
    label: 'Fator inflamatório',
    displayValue: '0',
    level: 'Médio',
    markerPosition: 0.55,
  },
};

const SPINACH: FoodIngredientDetail = {
  ingredientId: 'spinach',
  image: require('../../assets/food-ingredients/spinach.jpg'),
  nutritionPer100g: {
    kcal: 23,
    protein: 2.9,
    fat: 0.4,
    carbs: 3.6,
  },
  extraNutrients: [
    { label: 'Gorduras monoinsaturadas', value: 0.01 },
    { label: 'Gorduras saturadas', value: 0.063 },
    { label: 'Gorduras poliinsaturadas', value: 0.165 },
    { label: 'Betacaroteno', value: 5.626 },
    { label: 'Vitamina A', value: 9377 },
    { label: 'Vitamina B12', value: 0 },
    { label: 'Vitamina B6', value: 0.195 },
    { label: 'Vitamina D', value: 0 },
    { label: 'Vitamina E', value: 3.045 },
    { label: 'Vitamina C', value: 28.1 },
    { label: 'Riboflavina', value: 0.189 },
    { label: 'Ferro', value: 2.71 },
    { label: 'Potássio', value: 558 },
    { label: 'Cálcio', value: 99 },
    { label: 'Magnésio', value: 79 },
    { label: 'Cobre', value: 0.13 },
    { label: 'Sódio', value: 0.079 },
    { label: 'Fósforo', value: 49 },
    { label: 'Zinco', value: 0.53 },
    { label: 'Celulose', value: 2.2 },
    { label: 'Colesterol', value: 0 },
  ],
  glycemicIndex: {
    label: 'Índice glicêmico',
    displayValue: '0',
    level: 'baixo',
    markerPosition: 0.02,
  },
  caloricDensityIndex: {
    label: 'Índice de densidade calórica',
    displayValue: '0,23',
    level: 'Super baixo',
    markerPosition: 0.02,
  },
  inflammatoryFactor: {
    label: 'Fator inflamatório',
    displayValue: '78',
    level: 'Médio',
    markerPosition: 0.62,
  },
  antioxidantIndex: {
    label: 'Antioxidante',
    displayValue: '1.513',
    level: 'Médio',
    markerPosition: 0.15,
  },
};

const TAHITI_LIME: FoodIngredientDetail = {
  ingredientId: 'tahiti_lime',
  image: require('../../assets/food-ingredients/tahiti_lime.jpg'),
  nutritionPer100g: {
    kcal: 30,
    protein: 0.7,
    fat: 0.2,
    carbs: 10.5,
  },
  extraNutrients: [
    { label: 'Gorduras monoinsaturadas', value: 0.019 },
    { label: 'Gorduras saturadas', value: 0.022 },
    { label: 'Gorduras poliinsaturadas', value: 0.055 },
    { label: 'Betacaroteno', value: 0.03 },
    { label: 'Vitamina A', value: 50 },
    { label: 'Vitamina B12', value: 0 },
    { label: 'Vitamina B6', value: 0.043 },
    { label: 'Vitamina D', value: 0 },
    { label: 'Vitamina E', value: 0.33 },
    { label: 'Vitamina C', value: 29.1 },
    { label: 'Riboflavina', value: 0.02 },
    { label: 'Ferro', value: 0.6 },
    { label: 'Potássio', value: 102 },
    { label: 'Cálcio', value: 33 },
    { label: 'Magnésio', value: 6 },
    { label: 'Cobre', value: 0.065 },
    { label: 'Sódio', value: 0.002 },
    { label: 'Fósforo', value: 18 },
    { label: 'Zinco', value: 0.11 },
    { label: 'Celulose', value: 2.8 },
    { label: 'Colesterol', value: 0 },
  ],
  glycemicIndex: {
    label: 'Índice glicêmico',
    displayValue: '14',
    level: 'baixo',
    markerPosition: 0.14,
  },
  caloricDensityIndex: {
    label: 'Índice de densidade calórica',
    displayValue: '0,3',
    level: 'Super baixo',
    markerPosition: 0.03,
  },
  inflammatoryFactor: {
    label: 'Fator inflamatório',
    displayValue: '2',
    level: 'Médio',
    markerPosition: 0.5,
  },
  antioxidantIndex: {
    label: 'Antioxidante',
    displayValue: '82',
    level: 'baixo',
    markerPosition: 0.12,
  },
};

const INGREDIENT_DETAILS: Record<string, FoodIngredientDetail> = {
  cottage_cheese: COTTAGE_CHEESE,
  olive_oil: OLIVE_OIL,
  egg: EGG,
  pumpkin: PUMPKIN,
  garlic: GARLIC,
  salt: SALT,
  black_pepper: BLACK_PEPPER,
  parsley: PARSLEY,
  spinach: SPINACH,
  tahiti_lime: TAHITI_LIME,
};

export function getFoodIngredientDetail(ingredientId: string): FoodIngredientDetail | undefined {
  return INGREDIENT_DETAILS[ingredientId];
}
