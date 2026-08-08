import { NavigatorScreenParams } from '@react-navigation/native';
import { BodyBiotypeId, FoodCategoryId, MedicalRecordCategory, MessageContactId, MuscleGroupId, PowerliftingLevelId, SportsNutritionCategoryId, SupplementId, TrainingMethodCategoryId, TrainingMethodId } from '../types';
import { BodyMeasurementId } from '../data/bodyMeasurements';
import { NutritionGroupId } from '../data/nutrition/types';

export type HomeStackParamList = {
  HomeMain: undefined;
  TrainingVideos: undefined;
  TrainingVideoDetail: { videoId: string };
  AboutPromo: undefined;
};

export type DietStackParamList = {
  DietHome: undefined;
  FoodComposition: undefined;
  NutritionGroup: { groupId: NutritionGroupId };
  NutritionFoodDetail: { foodId: string };
  FoodCategoryDetail: { categoryId: FoodCategoryId };
  FoodRecipeDetail: { recipeId: string };
  FoodIngredientDetail: { recipeId: string; ingredientId: string };
  Supplements: undefined;
  SupplementDetail: { supplementId: SupplementId };
  SportsNutrition: { categoryId?: SportsNutritionCategoryId } | undefined;
  SportsNutritionProductDetail: { productId: string };
  Encyclopedia: undefined;
  EncyclopediaCategory: { categoryId: string };
  EncyclopediaArticle: { articleId: string };
  BonusRecipes: undefined;
};

export type WorkoutsStackParamList = {
  WorkoutsList: undefined;
  WorkoutDetail: { workoutId: string };
  ExerciseDetail: { workoutId: string; exerciseId: string };
  MuscleGroups: undefined;
  MuscleGroupDetail: { muscleGroupId: MuscleGroupId };
  ActiveWorkout: { workoutId: string };
  WorkoutBuilder: { workoutId?: string } | undefined;
  ExercisePicker: undefined;
  TrainingMethods: undefined;
  TrainingMethodCategory: { categoryId: TrainingMethodCategoryId };
  TrainingMethodDetail: { methodId: TrainingMethodId };
  BodyBiotypes: undefined;
  BodyBiotypeDetail: { biotypeId: BodyBiotypeId };
  BiotypeIdentification: undefined;
  Powerlifting: undefined;
  PowerliftingLevel: { levelId: PowerliftingLevelId };
  PowerliftingWeek: { levelId: PowerliftingLevelId; week: number };
  PowerliftingAdvancedPaywall: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Paywall: undefined;
  FeaturePromo: { variant: 'customPlan' | 'pro' };
  CustomPlan: undefined;
  ProgressPhotos: undefined;
  MedicalRecords: { category?: MedicalRecordCategory } | undefined;
  LanguageSettings: undefined;
  Settings: undefined;
  InjurySettings: undefined;
  ReminderSettings: undefined;
  AppleHealthSettings: undefined;
  BodyMetricsSettings: undefined;
  ProgressReport: undefined;
  Statistics: undefined;
  PrivacyPolicy: undefined;
  TermsOfUse: undefined;
  BodyMeasurements: undefined;
  BodyMeasurementDetail: { measurementId: BodyMeasurementId };
};

export type CommunityStackParamList = {
  CommunityHome: undefined;
  CommunityMember: { memberId: string };
  TrainingFeed: undefined;
  TrainingFeedCreate: undefined;
  TrainingFeedPost: { postId: string };
  MessagesHub: undefined;
  MessageConversation: { contactId: MessageContactId };
};

export type PremiumWorkoutsStackParamList = {
  PremiumHome: undefined;
  ExamAnalysis: undefined;
  ExamAnalysisReport: undefined;
};

export type HomeWorkoutsStackParamList = {
  HomeWorkoutsList: undefined;
  WorkoutDetail: { workoutId: string };
  ExerciseDetail: { workoutId: string; exerciseId: string };
  MuscleGroups: undefined;
  MuscleGroupDetail: { muscleGroupId: MuscleGroupId };
  ActiveWorkout: { workoutId: string };
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList> | undefined;
  Treinos: NavigatorScreenParams<WorkoutsStackParamList> | undefined;
  TreinoEmCasa: NavigatorScreenParams<HomeWorkoutsStackParamList> | undefined;
  TreinosPremium: NavigatorScreenParams<PremiumWorkoutsStackParamList> | undefined;
  Dieta: NavigatorScreenParams<DietStackParamList> | undefined;
  Comunidade: NavigatorScreenParams<CommunityStackParamList> | undefined;
  Perfil: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  GlobalSearch: undefined;
  PrivacyPolicy: undefined;
  TermsOfUse: undefined;
};
