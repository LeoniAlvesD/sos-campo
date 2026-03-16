/**
 * Typography system for the app.
 * Defines font sizes, weights, line heights and letter spacing.
 */
export const typography = {
  fontSizes: {
    tiny: 11,
    small: 13,
    body: 15,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 28,
    xxxl: 34,
  },

  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  lineHeights: {
    tight: 16,
    normal: 22,
    relaxed: 26,
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
} as const;
