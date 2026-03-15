import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Fontes() {

  const { width } = useWindowDimensions();
  const contentWidth = width > 900 ? 760 : width > 600 ? 640 : '100%';

  const abrirLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Fontes e Referências</Text>
          <Text style={styles.subtitle}>
            Materiais utilizados na elaboração das orientações apresentadas.
          </Text>
        </View>

        {/* BODY */}
        <View style={[styles.body, { maxWidth: contentWidth }]}>

          <Text style={styles.text}>
            As orientações apresentadas neste aplicativo foram baseadas
            em materiais educativos e documentos técnicos disponibilizados
            por órgãos oficiais de saúde pública do Brasil.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            Ministério da Saúde — Noções de Primeiros Socorros
          </Text>

          <Text
            style={styles.link}
            onPress={() =>
              abrirLink(
                'https://bvsms.saude.gov.br/bvs/publicacoes/nocoes_primeiros_socorros.pdf'
              )
            }
          >
            Acessar documento oficial
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            Ministério da Saúde — Informações sobre Animais Peçonhentos
          </Text>

          <Text
            style={styles.link}
            onPress={() =>
              abrirLink(
                'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/animais-peconhentos'
              )
            }
          >
            Página oficial
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            Manual de Diagnóstico e Tratamento de Acidentes
            por Animais Peçonhentos
          </Text>

          <Text
            style={styles.link}
            onPress={() =>
              abrirLink(
                'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/guias-e-manuais/manual-de-diagnostico-e-tratamento-de-acidentes-por-animais-peconhentos.pdf'
              )
            }
          >
            Acessar manual técnico
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            ANVISA — Disque Intoxicação (0800 722 6001)
          </Text>

          <Text
            style={styles.link}
            onPress={() =>
              abrirLink(
                'https://www.gov.br/anvisa/pt-br/assuntos/agrotoxicos/disque-intoxicacao'
              )
            }
          >
            Informações oficiais
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            Serviço de Atendimento Móvel de Urgência — SAMU
          </Text>

          <Text
            style={styles.link}
            onPress={() =>
              abrirLink(
                'https://www.gov.br/saude/pt-br/composicao/saes/samu-192'
              )
            }
          >
            Página institucional
          </Text>

        </View>

        {/* FOOTER */}
        <View style={styles.footer}>

          <Text style={styles.footerText}>
            Aplicativo com finalidade educativa e informativa.
          </Text>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#FFFFFF'
  },

  header:{
    backgroundColor:'#EEF3EF',
    paddingTop:50,
    paddingBottom:36,
    paddingHorizontal:28,
    borderBottomLeftRadius:22,
    borderBottomRightRadius:22
  },

  title:{
    fontSize:30,
    fontWeight:'700',
    color:'#1F4D3A'
  },

  subtitle:{
    marginTop:6,
    fontSize:15,
    color:'#6B7280'
  },

  body:{
    paddingHorizontal:28,
    paddingTop:36,
    alignSelf:'center'
  },

  sectionTitle:{
    fontSize:17,
    fontWeight:'600',
    color:'#1F4D3A',
    marginBottom:8
  },

  text:{
    fontSize:16,
    lineHeight:26,
    color:'#374151',
    marginBottom:18
  },

  link:{
    fontSize:16,
    color:'#2E7D5A',
    marginBottom:10
  },

  divider:{
    height:1,
    backgroundColor:'#E5E7EB',
    marginVertical:20
  },

  footer:{
    marginTop:40,
    paddingHorizontal:28,
    paddingBottom:60
  },

  footerText:{
    fontSize:13,
    color:'#6B7280'
  }

});