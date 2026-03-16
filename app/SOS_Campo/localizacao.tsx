import { createTable, deleteLocation, getLocations, insertLocation } from '@/hooks/useLocationDatabase';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LocalizacaoScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Inicializar banco de dados
  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      await createTable();
      loadLocations();
    } catch (error) {
      console.error('Erro ao inicializar banco:', error);
    }
  };

  // Carregar localizações salvas
  const loadLocations = async () => {
    try {
      const savedLocations = await getLocations();
      setLocations(savedLocations);
    } catch (error) {
      console.error('Erro ao carregar localizações:', error);
    }
  };

  // Obter localização atual
  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização foi negada');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);
      setErrorMsg(null);

      // Salvar no banco de dados
      await saveLocation(currentLocation);
      
    } catch (error) {
      setErrorMsg('Erro ao obter localização');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Salvar localização no banco
  const saveLocation = async (loc: Location.LocationObject) => {
    try {
      const timestamp = new Date().toISOString();
      await insertLocation(
        loc.coords.latitude,
        loc.coords.longitude,
        loc.coords.accuracy || 0,
        timestamp
      );
      loadLocations();
      Alert.alert('Sucesso', 'Localização salva com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a localização');
      console.error(error);
    }
  };

  // Deletar localização
  const deleteLocationRecord = async (id: number) => {
    try {
      await deleteLocation(id);
      loadLocations();
      Alert.alert('Sucesso', 'Localização removida!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a localização');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Localização de Emergência</Text>

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
            Latitude: {location.coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {location.coords.longitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Precisão: {location.coords.accuracy?.toFixed(2)}m
          </Text>
        </View>
      )}

      {/* Mensagem de erro */}
      {errorMsg && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
        </View>
      )}

      {/* Lista de localizações salvas */}
      <Text style={styles.subtitle}>📋 Histórico de Localizações:</Text>
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
                Precisão: {item.accuracy.toFixed(2)}m
              </Text>
              <Text style={styles.itemTime}>
                {new Date(item.timestamp).toLocaleString('pt-BR')}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => deleteLocationRecord(item.id)}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma localização salva ainda</Text>
        }
      />
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
    color: 'rgb(135, 14, 93)',
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
    backgroundColor: '#880959',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
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
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    marginVertical: 5,
    color: '#666',
    fontFamily: 'monospace',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  locationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
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
  deleteButton: {
    padding: 10,
    backgroundColor: '#ffebee',
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 14,
  },
});