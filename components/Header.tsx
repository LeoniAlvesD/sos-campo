import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  /** Called when the back button is pressed; renders the back button if provided */
  onBack?: () => void;
  /** Render extra content in the right slot */
  right?: React.ReactNode;
}

export function Header({ title, subtitle, onBack, right }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + theme.spacing.sm }]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            hitSlop={theme.hitSlop}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
          ) : null}
        </View>

        <View style={styles.rightSlot}>
          {right ?? <View style={styles.placeholder} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    ...theme.shadow.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: theme.minTouchSize,
    height: theme.minTouchSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: theme.colors.inverse,
    lineHeight: 36,
    fontWeight: theme.fontWeights.bold,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.font.md,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.inverse,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: theme.font.small,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  rightSlot: {
    width: theme.minTouchSize,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: theme.minTouchSize,
  },
  pressed: {
    opacity: 0.7,
  },
});
