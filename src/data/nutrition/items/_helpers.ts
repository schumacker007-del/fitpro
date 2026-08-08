import { NutritionFoodItem, NutritionGroupId } from '../types';

type FatInput = [total: number, saturated: number, mono: number, poly: number];

export function nf(
  id: string,
  groupId: NutritionGroupId,
  subcategoryId: string,
  name: string,
  highlight: string,
  portionLabel: string,
  kcal: number,
  protein: number,
  carbs: number,
  fiber: number,
  fats: FatInput,
  sodiumMg: number,
  carbsNote?: string,
): NutritionFoodItem {
  return {
    id,
    groupId,
    subcategoryId,
    name,
    highlight,
    portionLabel,
    kcal,
    protein,
    carbs,
    fiber,
    fats: {
      total: fats[0],
      saturated: fats[1],
      monounsaturated: fats[2],
      polyunsaturated: fats[3],
    },
    sodiumMg,
    carbsNote,
  };
}
