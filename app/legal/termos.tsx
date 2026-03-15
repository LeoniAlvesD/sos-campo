import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Termos() {

  const { width } = useWindowDimensions();
  const contentWidth = width > 900 ? 760 : width > 600 ? 640 : '100%';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Termos de Uso</Text>
          <Text style={styles.subtitle}>
            Condições para utilização deste aplicativo.
          </Text>
        </View>

        {/* BODY */}
        <View style={[styles.body, { maxWidth: contentWidth }]}>

          <Text style={styles.sectionTitle}>
            Finalidade do aplicativo
          </Text>

          <Text style={styles.text}>
            Este aplicativo possui finalidade exclusivamente educativa e informativa.
          </Text>

          <Text style={styles.text}>
            As orientações apresentadas não substituem avaliação, diagnóstico
            ou tratamento realizado por profissional de saúde devidamente habilitado.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            Em caso de emergência
          </Text>

          <Text style={styles.highlight}>
            SAMU — 192
          </Text>

          <Text style={styles.highlight}>
            Corpo de Bombeiros — 193
          </Text>

          <View style={styles.divider} />

          <Text style={styles.text}>
            O uso das informações disponibilizadas neste aplicativo
            é de responsabilidade exclusiva do usuário.
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
    fontSize:18,
    fontWeight:'600',
    color:'#1F4D3A',
    marginBottom:10
  },

  text:{
    fontSize:16,
    lineHeight:26,
    color:'#374151',
    marginBottom:18
  },

  highlight:{
    fontSize:17,
    fontWeight:'600',
    color:'#1F4D3A',
    marginBottom:10
  },

  divider:{
    height:1,
    backgroundColor:'#E5E7EB',
    marginVertical:24
  },

  footer:{
    marginTop:40,
    paddingHorizontal:28,
    paddingBottom:60
  },

  footerText:{
    fontSize:13,
    color:'#6B7280',
    marginBottom:4
  }

});