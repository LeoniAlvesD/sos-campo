import { acidentes } from '@/constants/acidentes';
import { router } from 'expo-router';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = (size: number) => (width / 375) * size;

export default function Acidentes() {
  return (
    <FlatList
      data={acidentes}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
          onPress={() => router.push(`/acidente/${item.id}`)}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {item.nome}
            </Text>

            <Text style={styles.description} numberOfLines={2}>
              {item.descricao}
            </Text>
          </View>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>›</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.05, // 👈 espaço bonito no topo
    paddingBottom: height * 0.06,
    backgroundColor: '#f2f4f7',
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: scale(22),
    paddingVertical: scale(22),
    paddingHorizontal: scale(20),
    marginBottom: scale(18),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },

  cardPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },

  textContainer: {
    flex: 1,
    paddingRight: scale(12),
  },

  title: {
    fontSize: scale(18),
    fontWeight: '700',
    marginBottom: scale(6),
    color: '#111827',
  },

  description: {
    fontSize: scale(14),
    color: '#6b7280',
    lineHeight: scale(20),
  },

  arrowContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#e8f0fe',
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrow: {
    fontSize: scale(22),
    color: '#0d47a1',
    fontWeight: 'bold',
  },

});