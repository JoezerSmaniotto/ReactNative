import React from 'react';
import {View, StyleSheet, Text, Image, TextInput} from 'react-native';
import MeuButton from '../components/MeuButton';
import {COLORS} from '../assets/colors';

const SignIn = props => {
  const recuperarSenha = () => {
    alert('Abrir modal recuperar senha');
  };

  const entrar = () => {
    alert('logar no sistema');
  };

  return (
    <View style={styles.container}>
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
        <View>
          <Text>Não tem uma conta?</Text>
        </View>
        <Text>Não tem uma conta?</Text>
        <Text>Cadastra-se</Text>
      </View>
    </View>
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
    backgroundColor: '#0f0',
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
});
