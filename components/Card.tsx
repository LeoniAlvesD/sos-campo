import { theme } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

export function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    marginVertical: theme.spacing.sm,
    elevation: 3,
  },
});
