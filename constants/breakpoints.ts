/**
 * Responsive breakpoints.
 * Based on common device widths in logical pixels.
 */
export const breakpoints = {
  small: 360,   // small phones
  medium: 390,  // standard phones (iPhone 14)
  large: 430,   // large phones (iPhone 14 Pro Max)
  tablet: 768,  // tablets
  desktop: 1024, // desktop / large tablets
} as const;

export type Breakpoint = keyof typeof breakpoints;
