import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Location from 'expo-location';
import { theme } from '@/constants/theme';

interface Coords {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

interface LocationShareProps {
  /** Label shown above the component. Defaults to "Compartilhar Localização". */
  title?: string;
}

export default function LocationShare({ title = 'Compartilhar Localização' }: LocationShareProps) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapsUrl = coords
    ? `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`
    : null;

  const coordsText = coords
    ? `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`
    : null;

  const getLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permissão de localização negada.');
        return;
      }
      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCoords({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
        accuracy: result.coords.accuracy,
      });
    } catch {
      setError('Não foi possível obter a localização.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!coords || !coordsText) return;
    await Clipboard.setStringAsync(coordsText);
    Alert.alert('Copiado!', `Coordenadas copiadas:\n${coordsText}`);
  };

  const shareLocation = async () => {
    if (!coords || !mapsUrl || !coordsText) return;
    const message = `Minha localização atual:\n${coordsText}\n\nAbrir no Google Maps:\n${mapsUrl}`;
    try {
      await Share.share({ message, url: mapsUrl });
    } catch {
      Alert.alert('Erro', 'Não foi possível compartilhar a localização.');
    }
  };

  const openMaps = () => {
    if (!mapsUrl) return;
    Linking.openURL(mapsUrl).catch(() =>
      Alert.alert('Erro', 'Não foi possível abrir o Google Maps.')
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {error && (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      )}

      {coords && (
        <View style={styles.coordsBox}>
          <Text style={styles.coordsLabel}>Coordenadas:</Text>
          <Text style={styles.coordsText}>{coordsText}</Text>
          {coords.accuracy != null && (
            <Text style={styles.accuracyText}>
              Precisão: {coords.accuracy.toFixed(0)} m
            </Text>
          )}
          <TouchableOpacity
            onPress={openMaps}
            activeOpacity={0.8}
            accessibilityRole="link"
            accessibilityLabel="Abrir no Google Maps"
          >
            <Text style={styles.mapsLink}>{mapsUrl}</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, styles.buttonPrimary, loading && styles.buttonDisabled]}
        onPress={getLocation}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel={coords ? 'Atualizar localização' : 'Obter localização'}
        accessibilityState={{ busy: loading, disabled: loading }}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.inverse} />
        ) : (
          <Text style={styles.buttonText}>
            {coords ? 'Atualizar Localização' : 'Obter Localização'}
          </Text>
        )}
      </TouchableOpacity>

      {coords && (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary, styles.actionButton]}
            onPress={copyToClipboard}
            accessibilityRole="button"
            accessibilityLabel="Copiar coordenadas"
          >
            <Text style={styles.buttonText}>Copiar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonGreen, styles.actionButton]}
            onPress={shareLocation}
            accessibilityRole="button"
            accessibilityLabel="Compartilhar localização"
          >
            <Text style={styles.buttonText}>Compartilhar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonMaps, styles.actionButton]}
            onPress={openMaps}
            accessibilityRole="button"
            accessibilityLabel="Abrir no Maps"
          >
            <Text style={styles.buttonText}>Maps</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    ...theme.shadow.card,
  },

  title: {
    fontSize: theme.font.text,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },

  errorText: {
    color: theme.colors.danger,
    fontSize: theme.font.small,
    marginBottom: theme.spacing.sm,
  },

  coordsBox: {
    backgroundColor: theme.colors.infoBg,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.infoBorder,
  },

  coordsLabel: {
    fontSize: theme.font.tiny,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.info,
    marginBottom: theme.spacing.xs,
  },

  coordsText: {
    fontSize: theme.font.small,
    color: theme.colors.text,
    fontFamily: 'monospace',
    marginBottom: theme.spacing.xs,
  },

  accuracyText: {
    fontSize: theme.font.tiny,
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },

  mapsLink: {
    fontSize: theme.font.tiny,
    color: theme.colors.info,
    textDecorationLine: 'underline',
  },

  button: {
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.minTouchSize,
  },

  buttonPrimary: {
    backgroundColor: theme.colors.action,
    marginBottom: theme.spacing.sm,
  },

  buttonSecondary: {
    backgroundColor: theme.colors.emphasis,
  },

  buttonGreen: {
    backgroundColor: theme.colors.success,
  },

  buttonMaps: {
    backgroundColor: '#e65100',
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: theme.colors.inverse,
    fontSize: theme.font.small,
    fontWeight: theme.fontWeights.semibold,
  },

  actionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  actionButton: {
    flex: 1,
  },
});
