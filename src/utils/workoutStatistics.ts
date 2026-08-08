import { ProgressPhoto, TrainingLogEntry, UserProfile, WorkoutPlan } from '../types';
import { GamificationSnapshot } from '../types/gamification';

export interface WorkoutStatistics {
  workoutCount: number;
  totalGymMinutes: number;
  totalWeightLiftedKg: number;
  totalReps: number;
  avgSetsPerExercise: number;
  avgRepsPerSet: number;
  best1RmKg: number;
  bestExerciseVolumeKg: number;
}

export interface WeightStatistics {
  avgKg: number | null;
  maxKg: number | null;
  minKg: number | null;
}

export interface AppStatistics {
  workouts: WorkoutStatistics;
  weight: WeightStatistics;
}

function parseAverageReps(reps: string): number {
  const range = reps.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (range) return (Number(range[1]) + Number(range[2])) / 2;
  const single = reps.match(/(\d+)/);
  if (single) return Number(single[1]);
  return 0;
}

function sessionKey(log: TrainingLogEntry): string {
  return `${log.workoutId}:${log.dateISO.slice(0, 10)}`;
}

function sessionDurationMinutes(logs: TrainingLogEntry[], workout?: WorkoutPlan): number {
  if (logs.length === 0) return 0;
  const times = logs.map((log) => new Date(log.dateISO).getTime()).filter((t) => !Number.isNaN(t));
  if (times.length >= 2) {
    const diffMs = Math.max(...times) - Math.min(...times);
    const minutes = Math.round(diffMs / 60000);
    if (minutes > 0) return minutes;
  }
  return workout?.durationMinutes ?? 0;
}

export function computeWorkoutStatistics(
  logs: TrainingLogEntry[],
  workouts: WorkoutPlan[],
  gamification: GamificationSnapshot,
): WorkoutStatistics {
  const workoutById = new Map(workouts.map((workout) => [workout.id, workout]));
  const sessions = new Map<string, TrainingLogEntry[]>();

  for (const log of logs) {
    const key = sessionKey(log);
    const group = sessions.get(key) ?? [];
    group.push(log);
    sessions.set(key, group);
  }

  let totalGymMinutes = 0;
  let totalSets = 0;
  let totalReps = 0;
  let exerciseCount = 0;

  for (const sessionLogs of sessions.values()) {
    const workout = workoutById.get(sessionLogs[0].workoutId);
    totalGymMinutes += sessionDurationMinutes(sessionLogs, workout);

    for (const log of sessionLogs) {
      const exercise = workout?.exercises.find((item) => item.id === log.exerciseId);
      if (!exercise) continue;
      exerciseCount += 1;
      totalSets += exercise.sets;
      totalReps += exercise.sets * parseAverageReps(exercise.reps);
    }
  }

  const workoutCount = sessions.size > 0 ? sessions.size : gamification.totalWorkoutDays;

  return {
    workoutCount,
    totalGymMinutes,
    totalWeightLiftedKg: 0,
    totalReps: Math.round(totalReps),
    avgSetsPerExercise: exerciseCount > 0 ? Math.round((totalSets / exerciseCount) * 10) / 10 : 0,
    avgRepsPerSet: totalSets > 0 ? Math.round((totalReps / totalSets) * 10) / 10 : 0,
    best1RmKg: 0,
    bestExerciseVolumeKg: 0,
  };
}

export function computeWeightStatistics(
  profile: UserProfile | null,
  photos: ProgressPhoto[],
): WeightStatistics {
  const weights = [
    ...(profile?.weightKg != null ? [profile.weightKg] : []),
    ...photos.map((photo) => photo.weightKg).filter((value): value is number => typeof value === 'number'),
  ];

  if (weights.length === 0) {
    return { avgKg: null, maxKg: null, minKg: null };
  }

  const sum = weights.reduce((acc, value) => acc + value, 0);
  return {
    avgKg: Math.round((sum / weights.length) * 10) / 10,
    maxKg: Math.max(...weights),
    minKg: Math.min(...weights),
  };
}

export function computeAppStatistics(input: {
  logs: TrainingLogEntry[];
  workouts: WorkoutPlan[];
  gamification: GamificationSnapshot;
  profile: UserProfile | null;
  photos: ProgressPhoto[];
}): AppStatistics {
  return {
    workouts: computeWorkoutStatistics(input.logs, input.workouts, input.gamification),
    weight: computeWeightStatistics(input.profile, input.photos),
  };
}

export function formatMinutes(totalMinutes: number): string {
  if (totalMinutes <= 0) return '0min';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}

export function formatKg(value: number | null, fallback = '0 kg'): string {
  if (value == null) return fallback;
  return `${value} kg`;
}
