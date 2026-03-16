import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { theme } from '@/constants/theme';

interface InputProps extends TextInputProps {
  /** Visible label above the input */
  label?: string;
  /** Validation error message */
  error?: string;
  /** Hint text below the input */
  hint?: string;
  /** Wrapping container style */
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label,
  error,
  hint,
  containerStyle,
  style,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={styles.label} accessibilityRole="text">
          {label}
        </Text>
      ) : null}

      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          error ? styles.inputError : null,
          style,
        ]}
        placeholderTextColor={theme.colors.placeholder}
        accessibilityLabel={label}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        {...rest}
      />

      {error ? (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },

  label: {
    fontSize: theme.font.small,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    letterSpacing: 0.2,
  },

  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.font.text,
    color: theme.colors.text,
    minHeight: theme.minTouchSize,
    ...theme.shadow.sm,
  },

  inputFocused: {
    borderColor: theme.colors.borderFocus,
  },

  inputError: {
    borderColor: theme.colors.dangerBorder,
    backgroundColor: theme.colors.dangerBg,
  },

  errorText: {
    fontSize: theme.font.small,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },

  hint: {
    fontSize: theme.font.small,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
  },
});
