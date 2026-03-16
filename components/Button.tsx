import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { theme } from '@/constants/theme';

type ButtonVariant = 'primary' | 'danger' | 'secondary' | 'action' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** Button label */
  label: string;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show loading spinner instead of label */
  loading?: boolean;
  /** Extra style applied to the container */
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : theme.colors.inverse}
          size="small"
        />
      ) : (
        <Text style={[styles.label, styles[`labelVariant_${variant}`], styles[`labelSize_${size}`]]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.minTouchSize,
    ...theme.shadow.sm,
  },

  /* --- Variants --- */
  primary: {
    backgroundColor: theme.colors.primary,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  secondary: {
    backgroundColor: theme.colors.emphasis,
  },
  action: {
    backgroundColor: theme.colors.action,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  /* --- Sizes --- */
  size_sm: {
    paddingVertical: theme.spacing.xs + 2,
    paddingHorizontal: theme.spacing.md,
    minHeight: 36,
  },
  size_md: {
    paddingVertical: theme.spacing.sm + 4,
    paddingHorizontal: theme.spacing.lg,
  },
  size_lg: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },

  /* --- States --- */
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.45,
  },

  /* --- Labels --- */
  label: {
    fontWeight: theme.fontWeights.bold,
    letterSpacing: 0.2,
  },
  labelVariant_primary: { color: theme.colors.inverse },
  labelVariant_danger: { color: theme.colors.inverse },
  labelVariant_secondary: { color: theme.colors.inverse },
  labelVariant_action: { color: theme.colors.inverse },
  labelVariant_outline: { color: theme.colors.primary },
  labelVariant_ghost: { color: theme.colors.primary },

  labelSize_sm: { fontSize: theme.font.small },
  labelSize_md: { fontSize: theme.font.text },
  labelSize_lg: { fontSize: theme.font.md },
});
