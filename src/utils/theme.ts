export const Colors = {
  // Primary palette
  primary: '#6C63FF',
  primaryLight: '#9D97FF',
  primaryDark: '#4B44CC',

  // Backgrounds
  background: '#0F0F1A',
  surface: '#1A1A2E',
  surfaceElevated: '#252540',
  card: '#1E1E35',

  // Borders
  border: '#2E2E50',
  borderLight: '#3E3E65',

  // Text
  textPrimary: '#F0EFFF',
  textSecondary: '#9A99C0',
  textMuted: '#5A5980',

  // Status
  success: '#4ADE80',
  successBg: '#0D2F1A',
  warning: '#FBBF24',
  error: '#F87171',
  errorBg: '#2F0D0D',

  // Accents
  accent: '#FF6B9D',
  accentBlue: '#38BDF8',

  // Misc
  white: '#FFFFFF',
  overlay: 'rgba(0,0,0,0.6)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};
