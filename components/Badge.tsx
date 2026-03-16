import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: theme.colors.primarySoft, text: theme.colors.primaryDark },
  success: { bg: theme.colors.successBg, text: theme.colors.success },
  warning: { bg: theme.colors.warningBg, text: '#92400e' },
  danger: { bg: theme.colors.dangerBg, text: theme.colors.danger },
  info: { bg: theme.colors.infoBg, text: theme.colors.info },
  muted: { bg: theme.colors.emphasisSoft, text: theme.colors.muted },
};

export function Badge({ label, variant = 'muted', style }: BadgeProps) {
  const colors = variantStyles[variant];

  return (
    <View
      style={[styles.badge, { backgroundColor: colors.bg }, style]}
      accessibilityRole="text"
    >
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xxs + 1,
    borderRadius: theme.radius.full,
  },
  label: {
    fontSize: theme.font.tiny,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: 0.3,
  },
});
