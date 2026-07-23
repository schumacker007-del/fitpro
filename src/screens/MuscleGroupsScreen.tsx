import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BodyMap from '../components/BodyMap';
import { SectionTitle } from '../components/ui';
import { MUSCLE_GROUPS } from '../data/muscleGroups';
import { getExercisesForMuscleGroup } from '../data/workouts';
import { WorkoutsStackParamList } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

export default function MuscleGroupsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutsStackParamList, 'MuscleGroups'>>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={MUSCLE_GROUPS}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ gap: spacing.sm }}
        ListHeaderComponent={
          <SectionTitle title="Grupos musculares" subtitle="Escolha um músculo pra ver os exercícios" />
        }
        renderItem={({ item }) => {
          const count = getExercisesForMuscleGroup(item.id).length;
          return (
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate('MuscleGroupDetail', { muscleGroupId: item.id })}
            >
              <BodyMap highlighted={[item.id]} size={64} />
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.count}>{count} exercícios</Text>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, paddingBottom: spacing.xl },
  card: {
    flex: 1 / 3,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: 4,
  },
  label: { color: colors.text, fontWeight: '700', fontSize: 12, marginTop: spacing.sm, textAlign: 'center' },
  count: { color: colors.textMuted, fontSize: 10, marginTop: 2, textAlign: 'center' },
});
