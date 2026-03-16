import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { theme } from '@/constants/theme';

interface LoadingProps {
  /** Message shown below the spinner */
  message?: string;
  /** When true the loading overlay covers the full screen */
  fullScreen?: boolean;
}

export function Loading({ message, fullScreen = false }: LoadingProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.container, fullScreen && styles.fullScreen, { opacity }]}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        {message ? (
          <Text style={styles.message}>{message}</Text>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay,
    zIndex: 999,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadow.lg,
  },
  message: {
    marginTop: theme.spacing.md,
    fontSize: theme.font.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
