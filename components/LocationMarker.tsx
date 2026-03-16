import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '@/constants/theme';

interface LocationMarkerProps {
  location: string;
  onClick: () => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ location, onClick }) => {
  return (
    <View style={styles.marker}>
      <Text style={styles.title}>{location}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onClick}
        accessibilityRole="button"
        accessibilityLabel={`Ver localização: ${location}`}
      >
        <Text style={styles.buttonText}>Ver Localização</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    ...theme.shadow.sm,
  },
  title: {
    fontSize: theme.font.text,
    fontWeight: theme.fontWeights.bold,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.action,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.sm,
    minHeight: theme.minTouchSize,
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.inverse,
    fontWeight: theme.fontWeights.semibold,
    textAlign: 'center',
    fontSize: theme.font.small,
  },
});

export default LocationMarker;
