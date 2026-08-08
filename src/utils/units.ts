import { UnitSystem } from '../types/appPreferences';

export const LB_PER_KG = 2.2046226218;
export const CM_PER_IN = 2.54;

export function kgToLb(kg: number): number {
  return kg * LB_PER_KG;
}

export function lbToKg(lb: number): number {
  return lb / LB_PER_KG;
}

export function cmToIn(cm: number): number {
  return cm / CM_PER_IN;
}

export function inToCm(inches: number): number {
  return inches * CM_PER_IN;
}

export function formatWeight(kg: number, unitSystem: UnitSystem): string {
  if (unitSystem === 'imperial') {
    return `${Math.round(kgToLb(kg))} lb`;
  }
  return `${kg} kg`;
}

export function formatHeight(cm: number, unitSystem: UnitSystem): string {
  if (unitSystem === 'imperial') {
    const totalInches = cmToIn(cm);
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
  }
  return `${cm} cm`;
}
