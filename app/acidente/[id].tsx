import { acidentes } from '@/constants/acidentes';
import { useLocalSearchParams } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetalheAcidente() {
  const { id } = useLocalSearchParams();

  const acidente = acidentes.find((item) => item.id === id);

  if (!acidente) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Informação não encontrada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* AVISO LEGAL SUPERIOR */}
        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            Conteúdo informativo. Não substitui avaliação ou atendimento por profissional de saúde.
            Em caso de emergência, acione 192 (SAMU) ou 193 (Bombeiros).
          </Text>
        </View>

        <Image
          source={acidente.imagem}
          style={styles.image}
        />

        <View style={styles.content}>

          <Text style={styles.title}>
            {acidente.nome}
          </Text>

          <Text style={styles.description}>
            {acidente.descricao}
          </Text>

          <Text style={styles.sectionTitle}>
            O que fazer:
          </Text>

          {acidente.passos.map((passo, index) => (
            <Text key={index} style={styles.step}>
              • {passo}
            </Text>
          ))}

          <Text style={styles.sectionTitle}>
            Não fazer:
          </Text>

          {acidente.naoFazer.map((item, index) => (
            <Text key={index} style={styles.danger}>
              ✖ {item}
            </Text>
          ))}

          {/* AVISO FINAL */}
          <View style={styles.footerWarning}>
            <Text style={styles.footerText}>
              Procure atendimento médico sempre que possível.
              Estas orientações são iniciais e não substituem avaliação profissional.
            </Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  disclaimerBox: {
    backgroundColor: '#fff3cd',
    padding: 14,
    margin: 16,
    borderRadius: 10,
  },

  disclaimerText: {
    fontSize: 12,
    color: '#856404',
    textAlign: 'center',
  },

  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
  },

  step: {
    fontSize: 14,
    marginBottom: 4,
    color: '#374151',
    lineHeight: 20,
  },

  danger: {
    fontSize: 14,
    marginBottom: 4,
    color: '#c62828',
    lineHeight: 20,
  },

  footerWarning: {
    marginTop: 20,
    padding: 14,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
  },

  footerText: {
    fontSize: 13,
    color: '#0d47a1',
    textAlign: 'center',
  },

});