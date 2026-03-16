import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { theme } from '@/constants/theme';

interface CardComponentProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  /** Extra style for the card container */
  style?: StyleProp<ViewStyle>;
  /** When true the card has no interactive press feedback */
  static?: boolean;
}

export function CardComponent({
  children,
  style,
  static: isStatic = false,
  ...rest
}: CardComponentProps) {
  if (isStatic) {
    return (
      <View style={[styles.card, style]}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadow.card,
  },
  cardPressed: {
    transform: [{ scale: 0.975 }],
    opacity: 0.92,
  },
});
