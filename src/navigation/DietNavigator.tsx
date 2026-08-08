import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BonusRecipesScreen from '../screens/BonusRecipesScreen';
import DietScreen from '../screens/DietScreen';
import EncyclopediaArticleScreen from '../screens/EncyclopediaArticleScreen';
import EncyclopediaCategoryScreen from '../screens/EncyclopediaCategoryScreen';
import EncyclopediaScreen from '../screens/EncyclopediaScreen';
import FoodCategoryDetailScreen from '../screens/FoodCategoryDetailScreen';
import FoodCompositionScreen from '../screens/FoodCompositionScreen';
import FoodIngredientDetailScreen from '../screens/FoodIngredientDetailScreen';
import FoodRecipeDetailScreen from '../screens/FoodRecipeDetailScreen';
import NutritionFoodDetailScreen from '../screens/NutritionFoodDetailScreen';
import NutritionGroupScreen from '../screens/NutritionGroupScreen';
import SportsNutritionProductDetailScreen from '../screens/SportsNutritionProductDetailScreen';
import SportsNutritionScreen from '../screens/SportsNutritionScreen';
import SupplementDetailScreen from '../screens/SupplementDetailScreen';
import SupplementsScreen from '../screens/SupplementsScreen';
import { DietStackParamList } from './types';

const Stack = createNativeStackNavigator<DietStackParamList>();

export default function DietNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DietHome" component={DietScreen} />
      <Stack.Screen name="FoodComposition" component={FoodCompositionScreen} />
      <Stack.Screen name="FoodCategoryDetail" component={FoodCategoryDetailScreen} />
      <Stack.Screen name="NutritionGroup" component={NutritionGroupScreen} />
      <Stack.Screen name="NutritionFoodDetail" component={NutritionFoodDetailScreen} />
      <Stack.Screen name="FoodRecipeDetail" component={FoodRecipeDetailScreen} />
      <Stack.Screen name="FoodIngredientDetail" component={FoodIngredientDetailScreen} />
      <Stack.Screen name="BonusRecipes" component={BonusRecipesScreen} />
      <Stack.Screen name="Supplements" component={SupplementsScreen} />
      <Stack.Screen name="SupplementDetail" component={SupplementDetailScreen} />
      <Stack.Screen name="SportsNutrition" component={SportsNutritionScreen} />
      <Stack.Screen name="SportsNutritionProductDetail" component={SportsNutritionProductDetailScreen} />
      <Stack.Screen name="Encyclopedia" component={EncyclopediaScreen} />
      <Stack.Screen name="EncyclopediaCategory" component={EncyclopediaCategoryScreen} />
      <Stack.Screen name="EncyclopediaArticle" component={EncyclopediaArticleScreen} />
    </Stack.Navigator>
  );
}
