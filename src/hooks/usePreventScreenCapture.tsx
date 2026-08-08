import { useIsFocused } from '@react-navigation/native';
import { usePreventScreenCapture as useExpoPreventScreenCapture } from 'expo-screen-capture';
import * as ScreenCapture from 'expo-screen-capture';
import React, { useEffect } from 'react';
import { WorkoutPlan } from '../types';

export const CAPTURE_GUARD_KEY = 'fitpro-powerlifting-advanced';

/** Treinos do macrociclo pago de powerlifting (ids pl-adv-*). */
export function isPowerliftingAdvancedWorkout(workout: WorkoutPlan | undefined): boolean {
  if (!workout) return false;
  return workout.level === 'avancado' || workout.id.startsWith('pl-adv-');
}

/** Bloqueia captura de tela apenas no Powerlifting Avançado desbloqueado. */
export function shouldPreventScreenCapture(
  workout: WorkoutPlan | undefined,
  isPowerliftingAdvancedActive: boolean,
): boolean {
  return isPowerliftingAdvancedWorkout(workout) && isPowerliftingAdvancedActive;
}

/** Libera captura se o overlay do iOS ficou preso após voltar na navegação. */
export function allowScreenCaptureGuard() {
  void ScreenCapture.allowScreenCaptureAsync(CAPTURE_GUARD_KEY);
}

function CaptureGuard() {
  useExpoPreventScreenCapture(CAPTURE_GUARD_KEY);
  return null;
}

/**
 * Bloqueia captura só na tela em foco. O hook do Expo libera ao desmontar
 * (evita overlay preto ao voltar na navegação).
 */
export function PreventScreenCapture({ active }: { active: boolean }) {
  const isFocused = useIsFocused();
  const shouldBlock = active && isFocused;

  useEffect(() => {
    if (!shouldBlock) {
      allowScreenCaptureGuard();
    }
    return () => {
      allowScreenCaptureGuard();
    };
  }, [shouldBlock]);

  if (!shouldBlock) return null;
  return <CaptureGuard />;
}
