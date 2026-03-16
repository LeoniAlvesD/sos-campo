import { Dimensions, PixelRatio } from 'react-native';
import { breakpoints } from '@/constants/breakpoints';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Base design width (iPhone 14 / standard phone).
 */
const BASE_WIDTH = 390;

/**
 * Scales a size proportionally to the current screen width.
 * Use for font sizes, padding, margin, border radius, etc.
 */
export function scale(size: number): number {
  const ratio = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(PixelRatio.roundToNearestPixel(size * ratio));
}

/**
 * Scales a size proportionally to screen height.
 * Use sparingly – prefer scale() for most values.
 */
export function verticalScale(size: number): number {
  const ratio = SCREEN_HEIGHT / 844; // iPhone 14 height
  return Math.round(PixelRatio.roundToNearestPixel(size * ratio));
}

/**
 * Returns a value between original size and scaled size
 * by a given factor (0 = original, 1 = fully scaled).
 * Useful for font sizes where extreme scaling feels wrong.
 */
export function moderateScale(size: number, factor = 0.5): number {
  return size + (scale(size) - size) * factor;
}

/**
 * Returns the current screen width.
 */
export function getScreenWidth(): number {
  return Dimensions.get('window').width;
}

/**
 * Returns the current screen height.
 */
export function getScreenHeight(): number {
  return Dimensions.get('window').height;
}

/**
 * Returns true if the screen width is at least the given breakpoint.
 */
export function isBreakpoint(bp: keyof typeof breakpoints): boolean {
  return Dimensions.get('window').width >= breakpoints[bp];
}

/**
 * Returns true if the current device is a tablet (>= tablet breakpoint).
 */
export function isTablet(): boolean {
  return isBreakpoint('tablet');
}

/**
 * Returns a value depending on whether the device is a tablet or not.
 * Convenient for two-value responsive decisions.
 */
export function responsiveValue<T>(phone: T, tablet: T): T {
  return isTablet() ? tablet : phone;
}
