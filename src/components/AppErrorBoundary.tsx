import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.wrap}>
          <Text style={styles.title}>FitPro</Text>
          <Text style={styles.message}>Algo falhou ao abrir o app.</Text>
          <Text style={styles.detail} selectable>
            {this.state.error.message}
          </Text>
          <Pressable
            onPress={() => this.setState({ error: null })}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Tentar novamente</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  title: { color: colors.text, fontSize: 24, fontWeight: '900', marginBottom: spacing.md },
  message: { color: colors.textMuted, fontSize: 15, marginBottom: spacing.sm },
  detail: { color: colors.textMuted, fontSize: 12, marginBottom: spacing.lg },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#0B1210', fontWeight: '800' },
});
