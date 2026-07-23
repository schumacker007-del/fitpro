import { MuscleGroupId } from '../types';

export type WorkoutsStackParamList = {
  WorkoutsList: undefined;
  WorkoutDetail: { workoutId: string };
  ExerciseDetail: { workoutId: string; exerciseId: string };
  MuscleGroups: undefined;
  MuscleGroupDetail: { muscleGroupId: MuscleGroupId };
  ActiveWorkout: { workoutId: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Paywall: undefined;
  CustomPlan: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Treinos: undefined;
  Dieta: undefined;
  Perfil: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};
