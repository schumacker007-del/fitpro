import { BadgeId, DayActivity, GamificationSnapshot } from '../types/gamification';

export function toDateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function parseDate(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function daysBetween(a: string, b: string): number {
  const ms = parseDate(b).getTime() - parseDate(a).getTime();
  return Math.round(ms / 86400000);
}

function streakFromDates(dates: string[]): number {
  if (dates.length === 0) return 0;
  const unique = [...new Set(dates)].sort((a, b) => (a < b ? 1 : -1));
  const today = toDateKey();
  const yesterday = toDateKey(new Date(Date.now() - 86400000));
  if (unique[0] !== today && unique[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    if (daysBetween(unique[i], unique[i - 1]) === 1) streak++;
    else break;
  }
  return streak;
}

function longestStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const sorted = [...new Set(dates)].sort();
  let best = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (daysBetween(sorted[i - 1], sorted[i]) === 1) {
      current++;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }
  return best;
}

function comboDates(activities: DayActivity[]): string[] {
  return activities.filter((a) => a.workout && a.diet).map((a) => a.date);
}

export function evaluateBadges(activities: DayActivity[]): BadgeId[] {
  const workoutDates = activities.filter((a) => a.workout).map((a) => a.date);
  const dietDates = activities.filter((a) => a.diet).map((a) => a.date);
  const workoutStreak = streakFromDates(workoutDates);
  const dietStreak = streakFromDates(dietDates);
  const comboStreak = streakFromDates(comboDates(activities));

  const unlocked: BadgeId[] = [];
  if (workoutDates.length >= 1) unlocked.push('first_workout');
  if (workoutDates.length >= 10) unlocked.push('ten_workouts');
  if (workoutStreak >= 3) unlocked.push('streak_3');
  if (workoutStreak >= 7) unlocked.push('streak_7');
  if (workoutStreak >= 30) unlocked.push('streak_30');
  if (dietStreak >= 7) unlocked.push('diet_streak_7');
  if (comboStreak >= 7) unlocked.push('combo_7');
  return unlocked;
}

export function buildSnapshot(activities: DayActivity[]): GamificationSnapshot {
  const workoutDates = activities.filter((a) => a.workout).map((a) => a.date);
  const dietDates = activities.filter((a) => a.diet).map((a) => a.date);

  return {
    workoutStreak: streakFromDates(workoutDates),
    dietStreak: streakFromDates(dietDates),
    comboStreak: streakFromDates(comboDates(activities)),
    bestWorkoutStreak: longestStreak(workoutDates),
    totalWorkoutDays: workoutDates.length,
    totalDietDays: dietDates.length,
    unlockedBadges: evaluateBadges(activities),
  };
}

export function upsertActivity(activities: DayActivity[], patch: Partial<DayActivity> & { date: string }): DayActivity[] {
  const idx = activities.findIndex((a) => a.date === patch.date);
  if (idx === -1) {
    return [{ date: patch.date, workout: !!patch.workout, diet: !!patch.diet }, ...activities];
  }
  const next = [...activities];
  next[idx] = {
    ...next[idx],
    workout: patch.workout ?? next[idx].workout,
    diet: patch.diet ?? next[idx].diet,
  };
  return next;
}

export function isDoneToday(activities: DayActivity[], field: 'workout' | 'diet'): boolean {
  const today = activities.find((a) => a.date === toDateKey());
  return !!today?.[field];
}
