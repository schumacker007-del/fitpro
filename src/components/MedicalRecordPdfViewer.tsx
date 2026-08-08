import { Ionicons } from '@expo/vector-icons';
import { File } from 'expo-file-system';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { PrimaryButton } from './ui';
import { colors, radius, spacing, typography } from '../theme';

interface Props {
  visible: boolean;
  uri: string;
  title: string;
  fileName?: string;
  onClose: () => void;
  onShare: () => void;
}

export default function MedicalRecordPdfViewer({
  visible,
  uri,
  title,
  fileName,
  onClose,
  onShare,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const pdfUri = useMemo(() => normalizeFileUri(uri), [uri]);

  const readAccessUrl = useMemo(() => {
    try {
      const file = new File(uri);
      const parent = file.parentDirectory;
      return parent?.uri ? normalizeFileUri(parent.uri) : undefined;
    } catch {
      return undefined;
    }
  }, [uri]);

  const webSource = useMemo(() => {
    if (Platform.OS === 'android') {
      // Android WebView não renderiza PDF local de forma confiável — usa HTML embed.
      const escaped = pdfUri.replace(/"/g, '&quot;');
      return {
        html: `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <style>
    html, body { margin: 0; padding: 0; height: 100%; background: #111; }
    embed, iframe { width: 100%; height: 100%; border: 0; }
    .msg { color: #ccc; font-family: -apple-system, sans-serif; padding: 24px; text-align: center; }
  </style>
</head>
<body>
  <embed src="${escaped}" type="application/pdf" width="100%" height="100%" />
</body>
</html>`,
      };
    }
    return { uri: pdfUri };
  }, [pdfUri]);

  const resetState = () => {
    setLoading(true);
    setFailed(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
      onShow={resetState}
    >
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.headerBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {title}
            </Text>
            {fileName ? (
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                {fileName}
              </Text>
            ) : null}
          </View>
          <Pressable onPress={onShare} style={styles.headerBtn} hitSlop={8}>
            <Ionicons name="share-outline" size={22} color={colors.primary} />
          </Pressable>
        </View>

        <View style={styles.viewer}>
          {!failed ? (
            <WebView
              key={pdfUri}
              source={webSource}
              style={styles.webview}
              originWhitelist={['*']}
              allowingReadAccessToURL={readAccessUrl}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setFailed(true);
              }}
              onHttpError={() => {
                setLoading(false);
                setFailed(true);
              }}
              startInLoadingState
              renderLoading={() => (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <Text style={styles.loadingText}>Carregando PDF…</Text>
                </View>
              )}
            />
          ) : (
            <View style={styles.fallback}>
              <Ionicons name="document-text-outline" size={48} color={colors.textMuted} />
              <Text style={styles.fallbackTitle}>Não foi possível abrir aqui</Text>
              <Text style={styles.fallbackText}>
                PDFs muito grandes podem precisar ser abertos em outro aplicativo do celular.
              </Text>
              <PrimaryButton label="Abrir / enviar PDF" icon="share-outline" onPress={onShare} />
            </View>
          )}

          {loading && !failed ? (
            <View style={styles.loadingOverlay} pointerEvents="none">
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Carregando PDF…</Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function normalizeFileUri(path: string) {
  if (path.startsWith('file://')) return path;
  return `file://${path}`;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  headerBtn: { padding: 4, width: 32 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { ...typography.h3, color: colors.text, fontSize: 16 },
  headerSubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  viewer: { flex: 1, backgroundColor: '#111' },
  webview: { flex: 1, backgroundColor: '#111' },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    gap: spacing.sm,
  },
  loadingText: { color: colors.textMuted, fontSize: 13 },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  fallbackTitle: { color: colors.text, fontWeight: '800', fontSize: 16, textAlign: 'center' },
  fallbackText: { color: colors.textMuted, fontSize: 13, textAlign: 'center', lineHeight: 19 },
});
