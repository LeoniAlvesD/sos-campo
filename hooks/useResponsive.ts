import { useWindowDimensions } from 'react-native';
import { breakpoints } from '@/constants/breakpoints';

/** Base design width used for proportional scaling. */
const BASE_WIDTH = 390;

/**
 * Returns responsive helpers based on the current window dimensions.
 * Re-renders automatically when the screen rotates or window resizes.
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isSmall = width < breakpoints.small;
  const isMedium = width >= breakpoints.small && width < breakpoints.large;
  const isLarge = width >= breakpoints.large && width < breakpoints.tablet;
  const isTablet = width >= breakpoints.tablet;

  /**
   * Scales a size proportionally to the current screen width.
   * Uses the same BASE_WIDTH (390) as utils/responsive.ts for consistency.
   */
  const scale = (size: number): number => {
    return Math.round(size * (width / BASE_WIDTH));
  };

  /**
   * Returns a value based on whether this is a tablet or phone.
   */
  function responsiveValue<T>(phone: T, tablet: T): T {
    return isTablet ? tablet : phone;
  }

  return {
    width,
    height,
    isSmall,
    isMedium,
    isLarge,
    isTablet,
    scale,
    responsiveValue,
  };
}
