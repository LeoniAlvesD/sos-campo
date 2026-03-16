/**
 * Spacing scale used throughout the app.
 * Values follow a consistent 4-point grid.
 */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 56,
} as const;

export type SpacingKey = keyof typeof spacing;
