import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BodyMap from './BodyMap';
import { getMuscleGroup } from '../data/muscleGroups';
import { colors, radius, spacing } from '../theme';
import { MuscleGroupId } from '../types';

interface Props {
  muscle: MuscleGroupId;
  size?: number;
}

/** Caixa de "zoom" no músculo trabalhado, com nome — estilo callout de atlas anatômico. */
export default function MuscleZoomCard({ muscle, size = 96 }: Props) {
  const info = getMuscleGroup(muscle);
  return (
    <View style={[styles.card, { borderColor: `${info.color}55` }]}>
      <Text style={[styles.zoomTag, { color: info.color }]}>ZOOM</Text>
      <BodyMap highlighted={[muscle]} size={size} />
      <Text style={styles.label}>{info.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.sm,
    gap: 4,
  },
  zoomTag: { fontSize: 10, fontWeight: '800', letterSpacing: 1, alignSelf: 'flex-start' },
  label: { color: colors.text, fontSize: 12, fontWeight: '700' },
});
