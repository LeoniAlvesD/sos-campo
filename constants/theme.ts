export const theme = {
  colors: {
    // cores principais
    primary: '#1f7a3f',      // verde rural principal
    primaryLight: '#2e8b57',
    primarySoft: '#e8f5e9',
    primaryDark: '#145c2c',

    secondary: '#f4f6f8',    // fundo geral
    card: '#ffffff',

    // ações de destaque
    action: '#2563eb',
    actionSoft: '#eff6ff',
    actionDark: '#1d4ed8',

    emphasis: '#334155',
    emphasisSoft: '#f1f5f9',

    // texto
    text: '#1c1c1c',
    textSecondary: '#374151',
    muted: '#6b7280',
    placeholder: '#9ca3af',
    inverse: '#ffffff',

    // estrutura
    background: '#f2f4f7',
    border: '#e5e7eb',
    borderFocus: '#1f7a3f',
    divider: '#f1f5f9',

    // estados
    success: '#2e7d32',
    successBg: '#e8f5e9',
    successBorder: '#4caf50',

    warning: '#f59e0b',
    warningBg: '#fef3c7',
    warningBorder: '#fbbf24',

    danger: '#c62828',
    dangerBg: '#fef3f2',
    dangerBorder: '#ef5350',

    info: '#2563eb',
    infoBg: '#eff6ff',
    infoBorder: '#60a5fa',

    // overlay
    overlay: 'rgba(0,0,0,0.4)',
    scrim: 'rgba(0,0,0,0.12)',

    // IMC classificações
    sobrepeso: '#e67e22',
  },

  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 56,
  },

  radius: {
    xs: 4,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    full: 9999,
  },

  font: {
    tiny: 11,
    small: 13,
    body: 15,
    text: 16,
    md: 18,
    subtitle: 20,
    xl: 24,
    title: 28,
    display: 34,
  },

  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  lineHeights: {
    tight: 18,
    normal: 22,
    relaxed: 26,
  },

  shadow: {
    none: {},
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 2,
    },
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 4,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 14,
      elevation: 6,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.10,
      shadowRadius: 20,
      elevation: 8,
    },
  },

  /** Minimum interactive touch target size for accessibility (48 × 48 pt) */
  hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
  minTouchSize: 48,
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#1f7a3f',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#1f7a3f',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#2e8b57',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#2e8b57',
  },
};