import { ResizeMode, Video } from 'expo-av';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';
import { getExerciseVideoSource } from '../data/exerciseVideoSources';
import { colors, radius } from '../theme';
import { AnimationKind } from '../types';

interface Props {
  kind: AnimationKind;
  /** ID do exercício na biblioteca — usa vídeo GuiFit quando disponível. */
  exerciseId?: string;
  size?: number;
  /** Cor de destaque do músculo trabalhado (vem do grupo muscular do exercício). */
  highlightColor?: string;
  /** Mantido por compatibilidade. */
  freezeAt?: number;
}

// Pose "de trabalho" (contração / pico do movimento).
const POSE_WORK: Record<AnimationKind, any> = {
  squat: require('../../assets/poses/squat.jpg'),
  pushup: require('../../assets/poses/pushup.jpg'),
  jump: require('../../assets/poses/jump.jpg'),
  lunge: require('../../assets/poses/lunge.jpg'),
  plank: require('../../assets/poses/plank.jpg'),
  row: require('../../assets/poses/row.jpg'),
  curl: require('../../assets/poses/curl.jpg'),
  stretch: require('../../assets/poses/stretch.jpg'),
  chest_press: require('../../assets/poses/chest_press.jpg'),
  pulldown: require('../../assets/poses/pulldown.jpg'),
  hip_hinge: require('../../assets/poses/hip_hinge.jpg'),
  shoulder_press: require('../../assets/poses/shoulder_press.jpg'),
  lateral_raise: require('../../assets/poses/lateral_raise.jpg'),
  leg_curl: require('../../assets/poses/leg_curl.jpg'),
  hip_thrust: require('../../assets/poses/hip_thrust.jpg'),
  calf_raise: require('../../assets/poses/calf_raise.jpg'),
  crunch: require('../../assets/poses/crunch.jpg'),
  chest_fly: require('../../assets/poses/chest_fly.jpg'),
  front_raise: require('../../assets/poses/front_raise.jpg'),
  rear_delt_fly: require('../../assets/poses/rear_delt_fly.jpg'),
  shrug: require('../../assets/poses/shrug.jpg'),
  triceps_extension: require('../../assets/poses/triceps_extension.jpg'),
  pull_up: require('../../assets/poses/pull_up.jpg'),
  leg_extension: require('../../assets/poses/leg_extension.jpg'),
  hip_abduction: require('../../assets/poses/hip_abduction.jpg'),
  leg_raise: require('../../assets/poses/leg_raise.jpg'),
  chest_press_incline: require('../../assets/poses/chest_press_incline.jpg'),
  chest_press_decline: require('../../assets/poses/chest_press_decline.jpg'),
  curl_hammer: require('../../assets/poses/curl_hammer.jpg'),
  curl_scott: require('../../assets/poses/curl_scott.jpg'),
  curl_concentrated: require('../../assets/poses/curl_concentrated.jpg'),
  triceps_skullcrusher: require('../../assets/poses/triceps_skullcrusher.jpg'),
  triceps_overhead: require('../../assets/poses/triceps_overhead.jpg'),
  triceps_kickback: require('../../assets/poses/triceps_kickback.jpg'),
  seated_row: require('../../assets/poses/seated_row.jpg'),
  face_pull: require('../../assets/poses/face_pull.jpg'),
  leg_press: require('../../assets/poses/leg_press.jpg'),
  leg_curl_seated: require('../../assets/poses/leg_curl_seated.jpg'),
  calf_raise_seated: require('../../assets/poses/calf_raise_seated.jpg'),
  calf_raise_legpress: require('../../assets/poses/calf_raise_legpress.jpg'),
  crunch_oblique: require('../../assets/poses/crunch_oblique.jpg'),
  crunch_cable: require('../../assets/poses/crunch_cable.jpg'),
  pullover: require('../../assets/poses/pullover.jpg'),
  step_up: require('../../assets/poses/step_up.jpg'),
  plank_side: require('../../assets/poses/plank_side.jpg'),
  wrist_curl: require('../../assets/poses/wrist_curl.jpg'),
  wrist_roller: require('../../assets/poses/wrist_roller.jpg'),
  pistol_squat: require('../../assets/poses/pistol_squat.jpg'),
  burpee: require('../../assets/poses/burpee.jpg'),
  jumping_jack: require('../../assets/poses/jumping_jack.jpg'),
  mountain_climber: require('../../assets/poses/mountain_climber.jpg'),
  kb_swing: require('../../assets/poses/kb_swing.jpg'),
  treadmill: require('../../assets/poses/treadmill.jpg'),
  bike: require('../../assets/poses/bike.jpg'),
  elliptical: require('../../assets/poses/elliptical.jpg'),
  rowing_machine: require('../../assets/poses/rowing_machine.jpg'),
  stair_climber: require('../../assets/poses/stair_climber.jpg'),
  stretch_hamstring: require('../../assets/poses/stretch_hamstring.jpg'),
  stretch_quad: require('../../assets/poses/stretch_quad.jpg'),
  stretch_calf: require('../../assets/poses/stretch_calf.jpg'),
  stretch_chest: require('../../assets/poses/stretch_chest.jpg'),
  stretch_shoulder: require('../../assets/poses/stretch_shoulder.jpg'),
  stretch_triceps: require('../../assets/poses/stretch_triceps.jpg'),
  stretch_catcow: require('../../assets/poses/stretch_catcow.jpg'),
  stretch_glute: require('../../assets/poses/stretch_glute.jpg'),
  chest_press_db: require('../../assets/poses/chest_press_db.jpg'),
  chest_press_incline_db: require('../../assets/poses/chest_press_incline_db.jpg'),
  pec_deck_seated: require('../../assets/poses/pec_deck_seated.jpg'),
  cable_crossover_standing: require('../../assets/poses/cable_crossover_standing.jpg'),
  dip_chest: require('../../assets/poses/dip_chest.jpg'),
  chest_fly_flat_db: require('../../assets/poses/chest_fly_flat_db.jpg'),
  chest_fly_incline_db: require('../../assets/poses/chest_fly_incline_db.jpg'),
  chest_fly_decline_db: require('../../assets/poses/chest_fly_decline_db.jpg'),
  chest_fly_floor: require('../../assets/poses/chest_fly_floor.jpg'),
  pec_deck_unilateral: require('../../assets/poses/pec_deck_unilateral.jpg'),
  cable_fly_incline_bench: require('../../assets/poses/cable_fly_incline_bench.jpg'),
  cable_fly_decline_bench: require('../../assets/poses/cable_fly_decline_bench.jpg'),
  cable_fly_bent_over: require('../../assets/poses/cable_fly_bent_over.jpg'),
  pushup_knees: require('../../assets/poses/pushup_knees.jpg'),
  pushup_close: require('../../assets/poses/pushup_close.jpg'),
  pushup_wall: require('../../assets/poses/pushup_wall.jpg'),
  pushup_clap: require('../../assets/poses/pushup_clap.jpg'),
  pushup_bars: require('../../assets/poses/pushup_bars.jpg'),
  pushup_ball: require('../../assets/poses/pushup_ball.jpg'),
  pushup_band: require('../../assets/poses/pushup_band.jpg'),
  pushup_lateral_band: require('../../assets/poses/pushup_lateral_band.jpg'),
  chest_press_decline_db: require('../../assets/poses/chest_press_decline_db.jpg'),
  chest_press_machine: require('../../assets/poses/chest_press_machine.jpg'),
  chest_press_machine_incline: require('../../assets/poses/chest_press_machine_incline.jpg'),
  chest_press_floor: require('../../assets/poses/chest_press_floor.jpg'),
  chest_press_cable_standing: require('../../assets/poses/chest_press_cable_standing.jpg'),
  chest_press_cable_bench: require('../../assets/poses/chest_press_cable_bench.jpg'),
  chest_press_band: require('../../assets/poses/chest_press_band.jpg'),
  chest_press_unilateral_machine: require('../../assets/poses/chest_press_unilateral_machine.jpg'),
  chest_press_incline_rotation: require('../../assets/poses/chest_press_incline_rotation.jpg'),
  svend_press_db: require('../../assets/poses/svend_press_db.jpg'),
  svend_press_incline: require('../../assets/poses/svend_press_incline.jpg'),
  svend_standing_plate: require('../../assets/poses/svend_standing_plate.jpg'),
  svend_standing_bar: require('../../assets/poses/svend_standing_bar.jpg'),
  pullover_bar: require('../../assets/poses/pullover_bar.jpg'),
  pullover_machine: require('../../assets/poses/pullover_machine.jpg'),
  pullover_press_combo: require('../../assets/poses/pullover_press_combo.jpg'),
};

// Pose "de partida" (retorno / preparação). Isométricos (plank) não têm segunda pose.
const POSE_REST: Partial<Record<AnimationKind, any>> = {
  squat: require('../../assets/poses/squat_2.jpg'),
  pushup: require('../../assets/poses/pushup_2.jpg'),
  jump: require('../../assets/poses/jump_2.jpg'),
  lunge: require('../../assets/poses/lunge_2.jpg'),
  row: require('../../assets/poses/row_2.jpg'),
  curl: require('../../assets/poses/curl_2.jpg'),
  stretch: require('../../assets/poses/stretch_2.jpg'),
  chest_press: require('../../assets/poses/chest_press_2.jpg'),
  pulldown: require('../../assets/poses/pulldown_2.jpg'),
  hip_hinge: require('../../assets/poses/hip_hinge_2.jpg'),
  shoulder_press: require('../../assets/poses/shoulder_press_2.jpg'),
  lateral_raise: require('../../assets/poses/lateral_raise_2.jpg'),
  leg_curl: require('../../assets/poses/leg_curl_2.jpg'),
  hip_thrust: require('../../assets/poses/hip_thrust_2.jpg'),
  calf_raise: require('../../assets/poses/calf_raise_2.jpg'),
  crunch: require('../../assets/poses/crunch_2.jpg'),
  chest_fly: require('../../assets/poses/chest_fly_2.jpg'),
  front_raise: require('../../assets/poses/front_raise_2.jpg'),
  rear_delt_fly: require('../../assets/poses/rear_delt_fly_2.jpg'),
  shrug: require('../../assets/poses/shrug_2.jpg'),
  triceps_extension: require('../../assets/poses/triceps_extension_2.jpg'),
  pull_up: require('../../assets/poses/pull_up_2.jpg'),
  leg_extension: require('../../assets/poses/leg_extension_2.jpg'),
  hip_abduction: require('../../assets/poses/hip_abduction_2.jpg'),
  leg_raise: require('../../assets/poses/leg_raise_2.jpg'),
  chest_press_incline: require('../../assets/poses/chest_press_incline_2.jpg'),
  chest_press_decline: require('../../assets/poses/chest_press_decline_2.jpg'),
  curl_hammer: require('../../assets/poses/curl_hammer_2.jpg'),
  curl_scott: require('../../assets/poses/curl_scott_2.jpg'),
  curl_concentrated: require('../../assets/poses/curl_concentrated_2.jpg'),
  triceps_skullcrusher: require('../../assets/poses/triceps_skullcrusher_2.jpg'),
  triceps_overhead: require('../../assets/poses/triceps_overhead_2.jpg'),
  triceps_kickback: require('../../assets/poses/triceps_kickback_2.jpg'),
  seated_row: require('../../assets/poses/seated_row_2.jpg'),
  face_pull: require('../../assets/poses/face_pull_2.jpg'),
  leg_press: require('../../assets/poses/leg_press_2.jpg'),
  leg_curl_seated: require('../../assets/poses/leg_curl_seated_2.jpg'),
  calf_raise_seated: require('../../assets/poses/calf_raise_seated_2.jpg'),
  calf_raise_legpress: require('../../assets/poses/calf_raise_legpress_2.jpg'),
  crunch_oblique: require('../../assets/poses/crunch_oblique_2.jpg'),
  crunch_cable: require('../../assets/poses/crunch_cable_2.jpg'),
  pullover: require('../../assets/poses/pullover_2.jpg'),
  step_up: require('../../assets/poses/step_up_2.jpg'),
  wrist_curl: require('../../assets/poses/wrist_curl_2.jpg'),
  wrist_roller: require('../../assets/poses/wrist_roller_2.jpg'),
  pistol_squat: require('../../assets/poses/pistol_squat_2.jpg'),
  burpee: require('../../assets/poses/burpee_2.jpg'),
  jumping_jack: require('../../assets/poses/jumping_jack_2.jpg'),
  mountain_climber: require('../../assets/poses/mountain_climber_2.jpg'),
  kb_swing: require('../../assets/poses/kb_swing_2.jpg'),
  treadmill: require('../../assets/poses/treadmill_2.jpg'),
  bike: require('../../assets/poses/bike_2.jpg'),
  elliptical: require('../../assets/poses/elliptical_2.jpg'),
  rowing_machine: require('../../assets/poses/rowing_machine_2.jpg'),
  stair_climber: require('../../assets/poses/stair_climber_2.jpg'),
  chest_press_db: require('../../assets/poses/chest_press_db_2.jpg'),
  chest_press_incline_db: require('../../assets/poses/chest_press_incline_db_2.jpg'),
  pec_deck_seated: require('../../assets/poses/pec_deck_seated_2.jpg'),
  cable_crossover_standing: require('../../assets/poses/cable_crossover_standing_2.jpg'),
  dip_chest: require('../../assets/poses/dip_chest_2.jpg'),
  chest_fly_flat_db: require('../../assets/poses/chest_fly_flat_db_2.jpg'),
  chest_fly_incline_db: require('../../assets/poses/chest_fly_incline_db_2.jpg'),
  chest_fly_decline_db: require('../../assets/poses/chest_fly_decline_db_2.jpg'),
  chest_fly_floor: require('../../assets/poses/chest_fly_floor_2.jpg'),
  pec_deck_unilateral: require('../../assets/poses/pec_deck_unilateral_2.jpg'),
  cable_fly_incline_bench: require('../../assets/poses/cable_fly_incline_bench_2.jpg'),
  cable_fly_decline_bench: require('../../assets/poses/cable_fly_decline_bench_2.jpg'),
  cable_fly_bent_over: require('../../assets/poses/cable_fly_bent_over_2.jpg'),
  pushup_knees: require('../../assets/poses/pushup_knees_2.jpg'),
  pushup_close: require('../../assets/poses/pushup_close_2.jpg'),
  pushup_wall: require('../../assets/poses/pushup_wall_2.jpg'),
  pushup_clap: require('../../assets/poses/pushup_clap_2.jpg'),
  pushup_bars: require('../../assets/poses/pushup_bars_2.jpg'),
  pushup_ball: require('../../assets/poses/pushup_ball_2.jpg'),
  pushup_band: require('../../assets/poses/pushup_band_2.jpg'),
  pushup_lateral_band: require('../../assets/poses/pushup_lateral_band_2.jpg'),
  chest_press_decline_db: require('../../assets/poses/chest_press_decline_db_2.jpg'),
  chest_press_machine: require('../../assets/poses/chest_press_machine_2.jpg'),
  chest_press_machine_incline: require('../../assets/poses/chest_press_machine_incline_2.jpg'),
  chest_press_floor: require('../../assets/poses/chest_press_floor_2.jpg'),
  chest_press_cable_standing: require('../../assets/poses/chest_press_cable_standing_2.jpg'),
  chest_press_cable_bench: require('../../assets/poses/chest_press_cable_bench_2.jpg'),
  chest_press_band: require('../../assets/poses/chest_press_band_2.jpg'),
  chest_press_unilateral_machine: require('../../assets/poses/chest_press_unilateral_machine_2.jpg'),
  chest_press_incline_rotation: require('../../assets/poses/chest_press_incline_rotation_2.jpg'),
  svend_press_db: require('../../assets/poses/svend_press_db_2.jpg'),
  svend_press_incline: require('../../assets/poses/svend_press_incline_2.jpg'),
  svend_standing_plate: require('../../assets/poses/svend_standing_plate_2.jpg'),
  svend_standing_bar: require('../../assets/poses/svend_standing_bar_2.jpg'),
  pullover_bar: require('../../assets/poses/pullover_bar_2.jpg'),
  pullover_machine: require('../../assets/poses/pullover_machine_2.jpg'),
  pullover_press_combo: require('../../assets/poses/pullover_press_combo_2.jpg'),
  // plank_side é isométrico (sem segunda pose), como o plank comum.
};

// Região aproximada (fração 0-1 da imagem) do músculo em destaque em cada pose.
const GLOW_BOX: Record<AnimationKind, { x: number; y: number; w: number; h: number } | null> = {
  squat: { x: 0.12, y: 0.45, w: 0.48, h: 0.4 },
  pushup: { x: 0.4, y: 0.32, w: 0.32, h: 0.4 },
  jump: { x: 0.14, y: 0.5, w: 0.72, h: 0.42 },
  lunge: { x: 0.1, y: 0.42, w: 0.4, h: 0.36 },
  plank: { x: 0.34, y: 0.28, w: 0.32, h: 0.4 },
  row: { x: 0.28, y: 0.13, w: 0.42, h: 0.3 },
  curl: { x: 0.33, y: 0.14, w: 0.4, h: 0.24 },
  stretch: null,
  chest_press: { x: 0.3, y: 0.3, w: 0.4, h: 0.3 },
  pulldown: { x: 0.28, y: 0.18, w: 0.44, h: 0.32 },
  hip_hinge: { x: 0.16, y: 0.5, w: 0.5, h: 0.36 },
  shoulder_press: { x: 0.22, y: 0.06, w: 0.56, h: 0.34 },
  lateral_raise: { x: 0.06, y: 0.18, w: 0.88, h: 0.24 },
  leg_curl: { x: 0.4, y: 0.35, w: 0.4, h: 0.4 },
  hip_thrust: { x: 0.32, y: 0.4, w: 0.36, h: 0.34 },
  calf_raise: { x: 0.34, y: 0.65, w: 0.32, h: 0.3 },
  crunch: { x: 0.28, y: 0.4, w: 0.4, h: 0.35 },
  chest_fly: { x: 0.3, y: 0.24, w: 0.4, h: 0.3 },
  front_raise: { x: 0.24, y: 0.14, w: 0.5, h: 0.26 },
  rear_delt_fly: { x: 0.16, y: 0.14, w: 0.42, h: 0.28 },
  shrug: { x: 0.28, y: 0.1, w: 0.44, h: 0.22 },
  triceps_extension: { x: 0.14, y: 0.24, w: 0.36, h: 0.3 },
  pull_up: { x: 0.24, y: 0.14, w: 0.52, h: 0.4 },
  leg_extension: { x: 0.04, y: 0.35, w: 0.5, h: 0.32 },
  hip_abduction: { x: 0.18, y: 0.35, w: 0.62, h: 0.32 },
  leg_raise: { x: 0.04, y: 0.08, w: 0.36, h: 0.55 },
  chest_press_incline: { x: 0.28, y: 0.14, w: 0.44, h: 0.28 },
  chest_press_decline: { x: 0.28, y: 0.34, w: 0.44, h: 0.28 },
  curl_hammer: { x: 0.3, y: 0.16, w: 0.42, h: 0.26 },
  curl_scott: { x: 0.26, y: 0.32, w: 0.46, h: 0.28 },
  curl_concentrated: { x: 0.18, y: 0.4, w: 0.36, h: 0.3 },
  triceps_skullcrusher: { x: 0.3, y: 0.08, w: 0.4, h: 0.3 },
  triceps_overhead: { x: 0.26, y: 0.06, w: 0.46, h: 0.34 },
  triceps_kickback: { x: 0.5, y: 0.3, w: 0.36, h: 0.26 },
  seated_row: { x: 0.24, y: 0.2, w: 0.5, h: 0.3 },
  face_pull: { x: 0.2, y: 0.1, w: 0.58, h: 0.28 },
  leg_press: { x: 0.08, y: 0.4, w: 0.62, h: 0.4 },
  leg_curl_seated: { x: 0.3, y: 0.45, w: 0.4, h: 0.35 },
  calf_raise_seated: { x: 0.32, y: 0.68, w: 0.36, h: 0.28 },
  calf_raise_legpress: { x: 0.3, y: 0.6, w: 0.4, h: 0.3 },
  crunch_oblique: { x: 0.2, y: 0.36, w: 0.52, h: 0.32 },
  crunch_cable: { x: 0.28, y: 0.28, w: 0.44, h: 0.4 },
  pullover: { x: 0.28, y: 0.24, w: 0.44, h: 0.32 },
  step_up: { x: 0.06, y: 0.4, w: 0.5, h: 0.42 },
  plank_side: { x: 0.28, y: 0.28, w: 0.5, h: 0.34 },
  wrist_curl: { x: 0.32, y: 0.32, w: 0.36, h: 0.28 },
  wrist_roller: { x: 0.36, y: 0.28, w: 0.34, h: 0.24 },
  pistol_squat: { x: 0.1, y: 0.32, w: 0.6, h: 0.4 },
  burpee: { x: 0.1, y: 0.3, w: 0.7, h: 0.4 },
  jumping_jack: { x: 0.2, y: 0.1, w: 0.6, h: 0.7 },
  mountain_climber: { x: 0.1, y: 0.3, w: 0.7, h: 0.4 },
  kb_swing: { x: 0.24, y: 0.16, w: 0.5, h: 0.6 },
  treadmill: { x: 0.24, y: 0.3, w: 0.55, h: 0.5 },
  bike: { x: 0.14, y: 0.3, w: 0.5, h: 0.45 },
  elliptical: { x: 0.2, y: 0.35, w: 0.55, h: 0.45 },
  rowing_machine: { x: 0.06, y: 0.3, w: 0.55, h: 0.4 },
  stair_climber: { x: 0.28, y: 0.2, w: 0.5, h: 0.55 },
  stretch_hamstring: { x: 0.1, y: 0.45, w: 0.5, h: 0.35 },
  stretch_quad: { x: 0.42, y: 0.4, w: 0.4, h: 0.4 },
  stretch_calf: { x: 0.36, y: 0.55, w: 0.38, h: 0.35 },
  stretch_chest: { x: 0.24, y: 0.2, w: 0.5, h: 0.32 },
  stretch_shoulder: { x: 0.3, y: 0.14, w: 0.46, h: 0.3 },
  stretch_triceps: { x: 0.28, y: 0.08, w: 0.4, h: 0.34 },
  stretch_catcow: { x: 0.24, y: 0.22, w: 0.52, h: 0.4 },
  stretch_glute: { x: 0.2, y: 0.4, w: 0.5, h: 0.38 },
  chest_press_db: { x: 0.3, y: 0.28, w: 0.4, h: 0.32 },
  chest_press_incline_db: { x: 0.28, y: 0.16, w: 0.44, h: 0.32 },
  pec_deck_seated: { x: 0.2, y: 0.22, w: 0.5, h: 0.34 },
  cable_crossover_standing: { x: 0.24, y: 0.2, w: 0.5, h: 0.32 },
  dip_chest: { x: 0.26, y: 0.14, w: 0.4, h: 0.36 },
  chest_fly_flat_db: { x: 0.28, y: 0.26, w: 0.44, h: 0.32 },
  chest_fly_incline_db: { x: 0.26, y: 0.16, w: 0.48, h: 0.32 },
  chest_fly_decline_db: { x: 0.28, y: 0.32, w: 0.44, h: 0.3 },
  chest_fly_floor: { x: 0.28, y: 0.28, w: 0.44, h: 0.3 },
  pec_deck_unilateral: { x: 0.22, y: 0.2, w: 0.48, h: 0.34 },
  cable_fly_incline_bench: { x: 0.26, y: 0.16, w: 0.48, h: 0.32 },
  cable_fly_decline_bench: { x: 0.28, y: 0.3, w: 0.44, h: 0.3 },
  cable_fly_bent_over: { x: 0.24, y: 0.22, w: 0.5, h: 0.32 },
  pushup_knees: { x: 0.36, y: 0.28, w: 0.36, h: 0.36 },
  pushup_close: { x: 0.38, y: 0.3, w: 0.34, h: 0.38 },
  pushup_wall: { x: 0.28, y: 0.22, w: 0.36, h: 0.34 },
  pushup_clap: { x: 0.36, y: 0.28, w: 0.36, h: 0.36 },
  pushup_bars: { x: 0.36, y: 0.28, w: 0.36, h: 0.36 },
  pushup_ball: { x: 0.36, y: 0.28, w: 0.36, h: 0.36 },
  pushup_band: { x: 0.36, y: 0.26, w: 0.36, h: 0.36 },
  pushup_lateral_band: { x: 0.34, y: 0.26, w: 0.38, h: 0.36 },
  chest_press_decline_db: { x: 0.28, y: 0.32, w: 0.44, h: 0.3 },
  chest_press_machine: { x: 0.22, y: 0.2, w: 0.5, h: 0.34 },
  chest_press_machine_incline: { x: 0.22, y: 0.14, w: 0.5, h: 0.34 },
  chest_press_floor: { x: 0.28, y: 0.28, w: 0.44, h: 0.32 },
  chest_press_cable_standing: { x: 0.24, y: 0.2, w: 0.5, h: 0.32 },
  chest_press_cable_bench: { x: 0.28, y: 0.26, w: 0.44, h: 0.32 },
  chest_press_band: { x: 0.28, y: 0.26, w: 0.44, h: 0.32 },
  chest_press_unilateral_machine: { x: 0.22, y: 0.2, w: 0.5, h: 0.34 },
  chest_press_incline_rotation: { x: 0.26, y: 0.16, w: 0.48, h: 0.32 },
  svend_press_db: { x: 0.3, y: 0.28, w: 0.4, h: 0.32 },
  svend_press_incline: { x: 0.26, y: 0.16, w: 0.48, h: 0.32 },
  svend_standing_plate: { x: 0.28, y: 0.2, w: 0.44, h: 0.32 },
  svend_standing_bar: { x: 0.26, y: 0.18, w: 0.48, h: 0.34 },
  pullover_bar: { x: 0.28, y: 0.22, w: 0.44, h: 0.32 },
  pullover_machine: { x: 0.24, y: 0.16, w: 0.5, h: 0.36 },
  pullover_press_combo: { x: 0.28, y: 0.24, w: 0.44, h: 0.32 },
};

const VIDEO_MIN_SIZE = 140;

export default function ExerciseAnimation(props: Props) {
  const size = props.size ?? 220;
  const videoSource = getExerciseVideoSource(props.kind, props.exerciseId);
  // List thumbnails: avoid mounting multiple expo-av players (can hang/black-screen iOS).
  if (videoSource && size >= VIDEO_MIN_SIZE) {
    return <ExerciseAnimationVideo source={videoSource} size={size} />;
  }
  return <ExerciseAnimationPoses {...props} />;
}

function ExerciseAnimationVideo({ source, size }: { source: number; size: number }) {
  const isHero = size >= 140;
  const width = size;
  const height = isHero ? Math.round(size * 1.22) : size;

  return (
    <View style={[styles.wrapper, { width, height }]}>
      <Video
        source={source}
        style={styles.video}
        resizeMode={isHero ? ResizeMode.COVER : ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        isMuted
      />
    </View>
  );
}

function ExerciseAnimationPoses({ kind, size = 220, highlightColor }: Props) {
  const move = useRef(new Animated.Value(0)).current;
  const glowColor = highlightColor ?? colors.primary;
  const glowBox = GLOW_BOX[kind];
  const restImage = POSE_REST[kind];

  useEffect(() => {
    // Ciclo: pausa na posição de partida -> movimento até o pico -> pausa no pico -> volta.
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(280),
        Animated.timing(move, { toValue: 1, duration: 620, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
        Animated.delay(320),
        Animated.timing(move, { toValue: 0, duration: 620, easing: Easing.in(Easing.cubic), useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [kind, move]);

  const workOpacity = move; // 0 (pose de partida) -> 1 (pose de trabalho)
  const restOpacity = move.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const scale = move.interpolate({ inputRange: [0, 1], outputRange: [1, 1.035] });
  const glowOpacity = move.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.95] });

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Animated.View style={[styles.inner, { transform: [{ scale }] }]}>
        {restImage ? (
          <Animated.Image
            source={restImage}
            resizeMode="contain"
            style={[styles.image, styles.layered, { opacity: restOpacity }]}
          />
        ) : null}
        <Animated.Image
          source={POSE_WORK[kind]}
          resizeMode="contain"
          style={[styles.image, styles.layered, { opacity: restImage ? workOpacity : 1 }]}
        />
        {glowBox ? (
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 100" preserveAspectRatio="none">
            <Defs>
              <RadialGradient id="exGlow" cx="50%" cy="50%" r="55%">
                <Stop offset="0%" stopColor={glowColor} stopOpacity={0.85} />
                <Stop offset="65%" stopColor={glowColor} stopOpacity={0.4} />
                <Stop offset="100%" stopColor={glowColor} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <AnimatedGlow box={glowBox} opacity={glowOpacity} />
          </Svg>
        ) : null}
      </Animated.View>
    </View>
  );
}

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

function AnimatedGlow({
  box,
  opacity,
}: {
  box: { x: number; y: number; w: number; h: number };
  opacity: Animated.AnimatedInterpolation<number>;
}) {
  const cx = (box.x + box.w / 2) * 100;
  const cy = (box.y + box.h / 2) * 100;
  const rx = (box.w / 2) * 100 * 1.15;
  const ry = (box.h / 2) * 100 * 1.15;
  return <AnimatedEllipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#exGlow)" opacity={opacity as unknown as number} />;
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050810',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  inner: { width: '92%', height: '92%' },
  image: { width: '100%', height: '100%' },
  video: { width: '100%', height: '100%', backgroundColor: '#fff' },
  layered: { position: 'absolute', top: 0, left: 0 },
});
