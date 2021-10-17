import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from 'react-native';
import MeuButton from '../components/MeuButton';
import {COLORS} from '../assets/colors';

const SignIn = props => {
  const recuperarSenha = () => {
    alert('Abrir modal recuperar senha');
  };

  const entrar = () => {
    alert('logar no sistema');
  };

  const cadastrar = () => {
    alert('Vai para a screen SignUp');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../assets/images/logo.png')}
            accessibilityLabel="logo do app"
          />
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>
            Esqueceu sua senha?
          </Text>
          <MeuButton texto="ENTRAR" onClick={entrar} />
        </View>

        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text style={styles.texCadastrarSe} onPress={cadastrar}>
              Cadastra-se
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 5,
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingBottom: 1,
  },
  textEsqueceuSenha: {
    fontSize: 15,
    color: COLORS.accentSecundary,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  divOuHr: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divHr: {
    width: '30%',
    height: 1,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
  },
  textOu: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 18,
    color: COLORS.grey,
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textNormal: {
    fontSize: 18,
  },
  texCadastrarSe: {
    fontSize: 16,
    color: COLORS.accentSecundary,
    marginLeft: 5,
  },
});
