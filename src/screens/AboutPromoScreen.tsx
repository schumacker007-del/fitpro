import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton } from '../components/ui';
import { useUser } from '../context/UserContext';
import { ABOUT_PROMO } from '../data/aboutPromo';
import { RESPONSIBLE_PROFESSIONAL } from '../data/professional';
import { HomeStackParamList } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';

export default function AboutPromoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'AboutPromo'>>();
  const { planTier } = useUser();

  const openWhatsApp = () => {
    const url = `https://wa.me/${RESPONSIBLE_PROFESSIONAL.whatsapp}`;
    Linking.openURL(url).catch(() => undefined);
  };

  const openPro = () => {
    (navigation.getParent() as any)?.navigate('Perfil', { screen: 'Paywall' });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Sobre o FitPro</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroWrap}>
          <Video
            source={ABOUT_PROMO.heroVideo}
            style={StyleSheet.absoluteFill}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
          />
          <LinearGradient
            colors={['rgba(5,8,16,0.15)', 'rgba(5,8,16,0.55)', 'rgba(5,8,16,0.95)']}
            locations={[0.2, 0.55, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroCopy}>
            <Text style={styles.brand}>{ABOUT_PROMO.brand}</Text>
            <Text style={styles.headline}>{ABOUT_PROMO.headline}</Text>
            <Text style={styles.subheadline}>{ABOUT_PROMO.subheadline}</Text>
          </View>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>O que você encontra aqui</Text>
          <View style={styles.featureList}>
            {ABOUT_PROMO.features.map((feature) => (
              <View key={feature.title} style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon} size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        <Card>
          <View style={styles.proRow}>
            <View style={styles.proAvatar}>
              <Ionicons name="medal-outline" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.proName}>{RESPONSIBLE_PROFESSIONAL.name}</Text>
              <Text style={styles.proRole}>{RESPONSIBLE_PROFESSIONAL.role}</Text>
              <Text style={styles.proCredential}>{RESPONSIBLE_PROFESSIONAL.credential}</Text>
            </View>
          </View>
          <Text style={styles.proBio}>{RESPONSIBLE_PROFESSIONAL.bio}</Text>
        </Card>

        <Text style={styles.promoTagline}>{ABOUT_PROMO.promoTagline}</Text>

        <PrimaryButton
          label="Ver vídeos de treino"
          icon="play-circle-outline"
          variant="outline"
          onPress={() => navigation.navigate('TrainingVideos')}
        />

        {planTier === 'free' ? (
          <PrimaryButton label="Assinar FitPro Pro" icon="star" variant="gold" onPress={openPro} />
        ) : null}

        <PrimaryButton label="Falar com o professor" icon="logo-whatsapp" onPress={openWhatsApp} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: { ...typography.h3, color: colors.text },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, gap: spacing.md },
  heroWrap: {
    height: 280,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroCopy: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
  },
  brand: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headline: { color: colors.text, fontSize: 26, fontWeight: '800', lineHeight: 30 },
  subheadline: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: 8 },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginBottom: spacing.md },
  featureList: { gap: spacing.md },
  featureRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: { color: colors.text, fontSize: 15, fontWeight: '700', marginBottom: 2 },
  featureText: { color: colors.textMuted, fontSize: 13, lineHeight: 18 },
  proRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  proAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proName: { color: colors.text, fontSize: 16, fontWeight: '800' },
  proRole: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  proCredential: { color: colors.primary, fontSize: 11, fontWeight: '700', marginTop: 2 },
  proBio: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  promoTagline: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
});
