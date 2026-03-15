import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Privacidade() {

  const { width } = useWindowDimensions();

  const contentWidth =
    width > 900 ? 760 :
    width > 600 ? 640 :
    '100%';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Política de Privacidade
          </Text>

          <Text style={styles.subtitle}>
            Informações sobre o tratamento de dados neste aplicativo.
          </Text>
        </View>

        {/* BODY */}
        <View
          style={[
            styles.body,
            { maxWidth: contentWidth }
          ]}
        >

          <Text style={styles.sectionTitle}>
            Coleta de dados
          </Text>

          <Text style={styles.text}>
            Este aplicativo não coleta, armazena ou compartilha
            dados pessoais dos usuários.
          </Text>

          <Text style={styles.text}>
            Nenhuma informação sensível é solicitada ou armazenada
            durante o uso das funcionalidades do aplicativo.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            Atualizações da política
          </Text>

          <Text style={styles.text}>
            Caso futuras versões do aplicativo passem a incluir
            coleta de dados ou novas funcionalidades que envolvam
            informações do usuário, esta política de privacidade
            será atualizada para refletir essas mudanças.
          </Text>

        </View>

        {/* FOOTER */}
        <View style={styles.footer}>

          <Text style={styles.footerText}>
            Última atualização: 2026
          </Text>

          <Text style={styles.footerText}>
            Aplicativo com finalidade educativa e informativa.
          </Text>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    backgroundColor: '#EEF3EF',
    paddingTop: 50,
    paddingBottom: 36,
    paddingHorizontal: 28,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1F4D3A',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },

  body: {
    paddingHorizontal: 28,
    paddingTop: 36,
    alignSelf: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F4D3A',
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    lineHeight: 26,
    color: '#374151',
    marginBottom: 18,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },

  footer: {
    marginTop: 40,
    paddingHorizontal: 28,
    paddingBottom: 60,
  },

  footerText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },

});