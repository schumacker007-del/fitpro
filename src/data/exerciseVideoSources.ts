import { AnimationKind } from '../types';
import { GUIFIT_VIDEO_SOURCES } from './guifitVideoSources';

/**
 * Vídeos de demonstração (extraídos do material enviado).
 * Quando existir entrada aqui, ExerciseAnimation usa vídeo em loop;
 * caso contrário, cai no crossfade PNG.
 */
export const EXERCISE_VIDEO_SOURCES: Partial<Record<AnimationKind, number>> = {
  chest_press: require('../../assets/videos/chest/chest_press.mp4'),
  chest_press_incline: require('../../assets/videos/chest/chest_press_incline.mp4'),
  chest_press_decline: require('../../assets/videos/chest/chest_press_decline.mp4'),
  chest_press_decline_db: require('../../assets/videos/chest/chest_press_decline_db.mp4'),
  chest_press_incline_db: require('../../assets/videos/chest/chest_press_incline_db.mp4'),
  chest_press_floor: require('../../assets/videos/chest/chest_press_floor.mp4'),
  chest_press_unilateral_machine: require('../../assets/videos/chest/chest_press_unilateral_machine.mp4'),
  cable_crossover_standing: require('../../assets/videos/chest/cable_crossover_standing.mp4'),
  cable_fly_decline_bench: require('../../assets/videos/chest/cable_fly_decline_bench.mp4'),
  pec_deck_seated: require('../../assets/videos/chest/pec_deck_seated.mp4'),
  dip_chest: require('../../assets/videos/chest/dip_chest.mp4'),
  pullover: require('../../assets/videos/chest/pullover.mp4'),
  pullover_bar: require('../../assets/videos/chest/pullover_bar.mp4'),
  pushup_knees: require('../../assets/videos/chest/pushup_knees.mp4'),
  pushup_band: require('../../assets/videos/chest/pushup_band.mp4'),
  pushup_ball: require('../../assets/videos/chest/pushup_ball.mp4'),
  pushup_wall: require('../../assets/videos/chest/pushup_wall.mp4'),
};

export function getExerciseVideoSource(
  kind: AnimationKind,
  exerciseId?: string,
): number | undefined {
  if (exerciseId && GUIFIT_VIDEO_SOURCES[exerciseId]) {
    return GUIFIT_VIDEO_SOURCES[exerciseId];
  }
  return EXERCISE_VIDEO_SOURCES[kind];
}
