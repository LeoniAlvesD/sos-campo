import ShareLocationModal from '@/components/ShareLocationModal';
import { theme } from '@/constants/theme';
import { createTable, deleteLocation, getLocations, insertLocation } from '@/hooks/useLocationDatabase';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LocalizacaoScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locations, setLocations] = useState<{ id: number; latitude: number; longitude: number; accuracy: number | null; timestamp: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number; accuracy?: number } | null>(null);

  const loadLocations = useCallback(async () => {
    try {
      const savedLocations = await getLocations();
      setLocations(savedLocations);
    } catch (error) {
      console.error('Erro ao carregar localizações:', error);
    }
  }, []);

  const initializeDatabase = useCallback(async () => {
    try {
      await createTable();
      await loadLocations();
    } catch (error) {
      console.error('Erro ao inicializar banco:', error);
    }
  }, [loadLocations]);

  useEffect(() => {
    initializeDatabase();
  }, [initializeDatabase]);

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Erro', 'Permissão para acessar localização foi negada');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);

      const { latitude, longitude, accuracy } = currentLocation.coords;
      const timestamp = new Date().toISOString();
      await insertLocation(latitude, longitude, accuracy || 0, timestamp);

      Alert.alert('Sucesso', 'Localização marcada e salva!');
      await loadLocations();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter sua localização');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLocationRecord = async (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja remover esta localização?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: async () => {
            try {
              await deleteLocation(id);
              Alert.alert('Sucesso', 'Localização removida!');
              await loadLocations();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível remover a localização');
              console.error(error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleOpenShareModal = (item: { latitude: number; longitude: number; accuracy?: number | null }) => {
    setSelectedLocation({
      latitude: item.latitude,
      longitude: item.longitude,
      accuracy: item.accuracy ?? undefined,
    });
    setShareModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Marcar Localização</Text>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={getCurrentLocation}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel={loading ? 'Obtendo localização' : 'Obter minha localização'}
        accessibilityState={{ busy: loading, disabled: loading }}
      >
        <Text style={styles.buttonText}>
          {loading ? '⏳ Obtendo localização...' : '🔍 Obter Minha Localização'}
        </Text>
      </TouchableOpacity>

      {location && (
        <View style={styles.locationBox}>
          <Text style={styles.locationTitle}>📌 Sua Localização Atual:</Text>
          <Text style={styles.locationText}>
            <Text style={styles.coordLabel}>Latitude:</Text>{' '}
            {location.coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            <Text style={styles.coordLabel}>Longitude:</Text>{' '}
            {location.coords.longitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            <Text style={styles.coordLabel}>Precisão:</Text>{' '}
            {location.coords.accuracy?.toFixed(2)}m
          </Text>
        </View>
      )}

      <Text style={styles.subtitle}>📋 Histórico ({locations.length}):</Text>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>
                📍 {item.latitude.toFixed(6)}, {item.longitude.toFixed(6)}
              </Text>
              <Text style={styles.itemSubtitle}>
                Precisão: {item.accuracy?.toFixed(2)}m
              </Text>
              <Text style={styles.itemTime}>
                {new Date(item.timestamp).toLocaleString('pt-BR')}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => handleOpenShareModal(item)}
                accessibilityRole="button"
                accessibilityLabel="Compartilhar localização"
              >
                <Text style={styles.shareButtonText}>📤</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteLocationRecord(item.id)}
                accessibilityRole="button"
                accessibilityLabel="Excluir localização"
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma localização salva ainda</Text>
        }
        scrollEnabled={true}
      />

      {selectedLocation && (
        <ShareLocationModal
          visible={shareModalVisible}
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
          accuracy={selectedLocation.accuracy}
          onClose={() => setShareModalVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },

  title: {
    fontSize: theme.font.xl,
    fontWeight: theme.fontWeights.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.primary,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: theme.font.text,
    fontWeight: theme.fontWeights.semibold,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },

  button: {
    backgroundColor: theme.colors.action,
    padding: theme.spacing.md - 1,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    minHeight: theme.minTouchSize,
    justifyContent: 'center',
    ...theme.shadow.sm,
  },

  buttonDisabled: {
    opacity: 0.55,
  },

  buttonText: {
    color: theme.colors.inverse,
    fontSize: theme.font.text,
    fontWeight: theme.fontWeights.bold,
  },

  locationBox: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.successBorder,
    ...theme.shadow.sm,
  },

  locationTitle: {
    fontSize: theme.font.text,
    fontWeight: theme.fontWeights.bold,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },

  locationText: {
    fontSize: theme.font.small,
    marginVertical: theme.spacing.xxs + 1,
    color: theme.colors.muted,
    fontFamily: 'monospace',
  },

  coordLabel: {
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.textSecondary,
  },

  locationItem: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm + 2,
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.info,
    ...theme.shadow.sm,
  },

  itemContent: {
    flex: 1,
  },

  itemTitle: {
    fontSize: theme.font.small,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,
    fontFamily: 'monospace',
  },

  itemSubtitle: {
    fontSize: theme.font.tiny,
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
  },

  itemTime: {
    fontSize: theme.font.tiny,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },

  shareButton: {
    padding: theme.spacing.sm + 2,
    backgroundColor: theme.colors.infoBg,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: theme.minTouchSize,
    minHeight: theme.minTouchSize,
  },

  shareButtonText: {
    fontSize: 16,
  },

  deleteButton: {
    padding: theme.spacing.sm + 2,
    backgroundColor: theme.colors.dangerBg,
    borderRadius: theme.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: theme.minTouchSize,
    minHeight: theme.minTouchSize,
  },

  deleteButtonText: {
    fontSize: 16,
  },

  emptyText: {
    textAlign: 'center',
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xl,
    fontSize: theme.font.small,
  },
});