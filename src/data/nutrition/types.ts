export type NutritionGroupId =
  | 'proteins'
  | 'dairy'
  | 'legumes_seeds'
  | 'cereals'
  | 'fruits'
  | 'vegetables'
  | 'healthy_fats'
  | 'breads_processed'
  | 'beverages'
  | 'seasonings'
  | 'sweets_fits';

export interface NutritionFatBreakdown {
  total: number;
  saturated: number;
  monounsaturated: number;
  polyunsaturated: number;
}

export interface NutritionFoodItem {
  id: string;
  groupId: NutritionGroupId;
  subcategoryId: string;
  name: string;
  highlight: string;
  /** Ex.: "100g (Aprox. 4 colheres de sopa cheias)" ou "200 ml (1 copo)" */
  portionLabel: string;
  kcal: number;
  protein: number;
  carbs: number;
  fiber: number;
  fats: NutritionFatBreakdown;
  sodiumMg: number;
  carbsNote?: string;
  image?: number;
}

export interface NutritionSubcategory {
  id: string;
  label: string;
}

export interface NutritionGroupInfo {
  id: NutritionGroupId;
  label: string;
  description: string;
  image: number;
  searchTerms: string[];
  subcategories: NutritionSubcategory[];
  /** Categorias de receitas legadas ligadas a este grupo (se houver). */
  recipeCategoryIds?: import('../../types').FoodCategoryId[];
}
