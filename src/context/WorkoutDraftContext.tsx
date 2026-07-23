import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ExerciseStep, Goal, WorkoutPlan } from '../types';

export interface WorkoutDraft {
  id: string | null;
  name: string;
  goal: Goal;
  level: 'iniciante' | 'intermediario' | 'avancado';
  exercises: ExerciseStep[];
}

const EMPTY_DRAFT: WorkoutDraft = {
  id: null,
  name: '',
  goal: 'manter_forma',
  level: 'intermediario',
  exercises: [],
};

interface WorkoutDraftContextValue {
  draft: WorkoutDraft;
  initDraft: (existing?: WorkoutPlan) => void;
  setName: (name: string) => void;
  setGoal: (goal: Goal) => void;
  setLevel: (level: WorkoutDraft['level']) => void;
  addExercise: (exercise: ExerciseStep) => void;
  removeExercise: (exerciseId: string) => void;
  updateExercise: (exerciseId: string, patch: Partial<Pick<ExerciseStep, 'sets' | 'reps' | 'restSeconds'>>) => void;
  moveExercise: (exerciseId: string, direction: 'up' | 'down') => void;
  isSelected: (exerciseId: string) => boolean;
  clearDraft: () => void;
}

const WorkoutDraftContext = createContext<WorkoutDraftContextValue | undefined>(undefined);

export function WorkoutDraftProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<WorkoutDraft>(EMPTY_DRAFT);

  const initDraft = useCallback((existing?: WorkoutPlan) => {
    if (existing) {
      setDraft({
        id: existing.id,
        name: existing.title,
        goal: existing.goal,
        level: existing.level,
        exercises: existing.exercises.map((e) => ({ ...e })),
      });
    } else {
      setDraft({ ...EMPTY_DRAFT, exercises: [] });
    }
  }, []);

  const setName = useCallback((name: string) => setDraft((d) => ({ ...d, name })), []);
  const setGoal = useCallback((goal: Goal) => setDraft((d) => ({ ...d, goal })), []);
  const setLevel = useCallback((level: WorkoutDraft['level']) => setDraft((d) => ({ ...d, level })), []);

  const addExercise = useCallback((exercise: ExerciseStep) => {
    setDraft((d) => (d.exercises.some((e) => e.id === exercise.id) ? d : { ...d, exercises: [...d.exercises, { ...exercise }] }));
  }, []);

  const removeExercise = useCallback((exerciseId: string) => {
    setDraft((d) => ({ ...d, exercises: d.exercises.filter((e) => e.id !== exerciseId) }));
  }, []);

  const updateExercise = useCallback(
    (exerciseId: string, patch: Partial<Pick<ExerciseStep, 'sets' | 'reps' | 'restSeconds'>>) => {
      setDraft((d) => ({
        ...d,
        exercises: d.exercises.map((e) => (e.id === exerciseId ? { ...e, ...patch } : e)),
      }));
    },
    []
  );

  const moveExercise = useCallback((exerciseId: string, direction: 'up' | 'down') => {
    setDraft((d) => {
      const idx = d.exercises.findIndex((e) => e.id === exerciseId);
      if (idx < 0) return d;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= d.exercises.length) return d;
      const next = [...d.exercises];
      [next[idx], next[targetIdx]] = [next[targetIdx], next[idx]];
      return { ...d, exercises: next };
    });
  }, []);

  const isSelected = useCallback((exerciseId: string) => draft.exercises.some((e) => e.id === exerciseId), [draft.exercises]);

  const clearDraft = useCallback(() => setDraft(EMPTY_DRAFT), []);

  const value = useMemo<WorkoutDraftContextValue>(
    () => ({ draft, initDraft, setName, setGoal, setLevel, addExercise, removeExercise, updateExercise, moveExercise, isSelected, clearDraft }),
    [draft, initDraft, setName, setGoal, setLevel, addExercise, removeExercise, updateExercise, moveExercise, isSelected, clearDraft]
  );

  return <WorkoutDraftContext.Provider value={value}>{children}</WorkoutDraftContext.Provider>;
}

export function useWorkoutDraft() {
  const ctx = useContext(WorkoutDraftContext);
  if (!ctx) throw new Error('useWorkoutDraft must be used within a WorkoutDraftProvider');
  return ctx;
}
