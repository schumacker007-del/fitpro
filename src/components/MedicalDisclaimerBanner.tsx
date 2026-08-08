import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface Props {
  compact?: boolean;
}

export default function MedicalDisclaimerBanner({ compact }: Props) {
  return (
    <View style={[styles.banner, compact && styles.bannerCompact]}>
      <Ionicons name="shield-checkmark-outline" size={18} color={colors.gold} />
      <Text style={styles.text}>
        {compact
          ? 'Conteúdo informativo. Não substitui diagnóstico ou prescrição médica.'
          : 'Atenção: exames, hormônios e suplementos neste app são apenas informativos. Não substituem consulta, diagnóstico ou prescrição de um profissional de saúde habilitado.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: 'rgba(244,183,64,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(244,183,64,0.35)',
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  bannerCompact: { marginBottom: spacing.sm },
  text: { flex: 1, color: colors.textMuted, fontSize: 12, lineHeight: 17 },
});
