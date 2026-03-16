import ShareLocationModal from '@/components/ShareLocationModal';
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

  // Carregar localizações salvas
  const loadLocations = useCallback(async () => {
    try {
      const savedLocations = await getLocations();
      setLocations(savedLocations);
    } catch (error) {
      console.error('Erro ao carregar localizações:', error);
    }
  }, []);

  // Inicializar banco de dados
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

  // Obter localização atual
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

      // Salvar no banco de dados
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

  // Deletar localização
  const deleteLocationRecord = async (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja remover esta localização?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
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

  // Abrir modal de compartilhamento
  const handleOpenShareModal = (item: any) => {
    setSelectedLocation({
      latitude: item.latitude,
      longitude: item.longitude,
      accuracy: item.accuracy,
    });
    setShareModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Marcar Localização</Text>

      {/* Botão para obter localização */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={getCurrentLocation}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? '⏳ Obtendo localização...' : '🔍 Obter Minha Localização'}
        </Text>
      </TouchableOpacity>

      {/* Exibir localização atual */}
      {location && (
        <View style={styles.locationBox}>
          <Text style={styles.locationTitle}>📌 Sua Localização Atual:</Text>
          <Text style={styles.locationText}>
            <Text style={styles.label}>Latitude:</Text> {location.coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            <Text style={styles.label}>Longitude:</Text> {location.coords.longitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            <Text style={styles.label}>Precisão:</Text> {location.coords.accuracy?.toFixed(2)}m
          </Text>
        </View>
      )}

      {/* Lista de localizações salvas */}
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
              >
                <Text style={styles.shareButtonText}>📤</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteLocationRecord(item.id)}
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

      {/* Modal de Compartilhamento */}
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f7a3f',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
  },
  locationText: {
    fontSize: 14,
    marginVertical: 5,
    color: '#666',
    fontFamily: 'monospace',
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  locationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#0ea5e9',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    fontFamily: 'monospace',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  itemTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  shareButton: {
    padding: 10,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontSize: 14,
  },
});