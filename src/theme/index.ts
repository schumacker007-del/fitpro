export const colors = {
  background: '#0F1117',
  surface: '#181B24',
  surfaceAlt: '#20242F',
  primary: '#39FF14',
  primaryDark: '#2BD410',
  primaryMuted: 'rgba(57, 255, 20, 0.15)',
  primaryMutedLight: 'rgba(57, 255, 20, 0.08)',
  accent: '#39FF14',
  gold: '#F4B740',
  text: '#F5F6FA',
  textMuted: '#9BA1B0',
  border: '#2A2E3A',
  danger: '#FF5C5C',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '800' as const },
  h2: { fontSize: 22, fontWeight: '700' as const },
  h3: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  small: { fontSize: 13, fontWeight: '400' as const },
  label: { fontSize: 12, fontWeight: '600' as const },
};
