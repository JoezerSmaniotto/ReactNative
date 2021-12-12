import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/routers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
// import {AuthUserContext} from '../context/AuthUserProvider';

import {SafeAreaView, ScrollView, View, StyleSheet, Alert} from 'react-native';
import MeuButton from '../../components/MeuButton';
import {COLORS} from '../../assets/colors';
import Loading from '../../components/Loading';
import {Input, Image, Text} from 'react-native-elements';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  // const {signIn} = useContext(AuthUserContext);

  const recuperarSenha = () => {
    navigation.navigate('ForgotPassWord');
  };

  // const entrar = async () => {
  //   if (email !== '' && password !== '') {
  //     setLoading(true);
  //     await signIn(email, password);
  //     setLoading(false);
  //   } else {
  //     Alert.alert('Erro', 'Por favor, digite email e senha.');
  //   }
  // };

  const storeUserCache = async value => {
    //  GUARDO EM CACHE OS DADOS
    try {
      value.pass = pass;
      console.log('storeUserCache => VALUE: ', value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue); // guarda em cache com a chave Users

      // Apos cachear os dados irá mandar para o rota quando logado
      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    } catch (e) {
      console.log('Sign: erro em storeUserCache : ' + e);
    }
  };

  const getUser = () => {
    // Vai buscar dos dados no Banco de dados de acordo com o uid d user logado
    firestore()
      .collection('users') // Entra na coleção users
      .doc(auth().currentUser.uid) // Pega o documento cujo o  id é do usuário que esta se logando na sessão
      .get() // Busca o documento
      .then(doc => {
        // trata a promisse
        if (doc.exists) {
          // Se estiver tudo certo GUARDO EM CACHE, passando os dados para a função storeUserCache
          storeUserCache(doc.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch(e => {
        console.log('Sign: erro em getUser : ' + e);
      });
  };

  const entrar = () => {
    // AÇÃO DISPARA QUANDO O USER VAI LOGAR NO SISTEMA COM EMAIL E SENHA
    if (email !== '' && pass !== '') {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          if (!auth().currentUser.emailVerified) {
            setLoading(false);
            // verifica se email foi validado
            Alert.alert(
              'Erro',
              'Verifique o email enviado cadastrado para prosseguir.',
            );
            return;
          }
          // SE TIVE TUDO CERTO, e com o email verificado,  CHAMA A FUNÇÃO getUser()
          getUser();
        })
        .catch(e => {
          setLoading(false);
          console.log('SignIn: erro em entrar: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
              break;
            case 'auth/wrong-password':
              Alert.alert('Erro', 'Erro na senha.');
              break;
            case 'auth/invalid-email':
              Alert.alert('Erro', 'Email inválido.');
              break;
            case 'auth/user-disabled':
              Alert.alert('Erro', 'Usuário desabilitado.');
              break;
          }
        });
    } else {
      Alert.alert('Erro', 'Por favor preencha os campos de email ou senha!');
    }
  };

  const cadastrar = () => {
    navigation.navigate('SignUp');
    // navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../../assets/images/logoIvet.png')}
            accessibilityLabel="logo do app"
          />
          {/* <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
            onEndEditing={() => this.passTextInput.focus()}
          />
          <TextInput
            ref={ref => {
              this.passTextInput = ref; // recebe a referencia
            }}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPass(t)}
          /> */}

          <Input
            label="Email"
            placeholder="teste@gmail.com"
            onChangeText={t => setEmail(t)}
            keyboardType="email-address"
            leftIcon={{type: 'font-awesome', name: 'envelope'}}
            returnKeyType="next"
            // onEndEditing={() => this.passTextInput.focus()}
          />

          <Input
            // ref={ref => {
            //   this.passTextInput = ref; // recebe a referencia
            // }}
            label="Senha"
            placeholder="Senha@123"
            onChangeText={t => setPass(t)}
            keyboardType="default"
            secureTextEntry={true}
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            returnKeyType="next"
            // onEndEditing={() => this.passTextInput.focus()}
          />

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
            <Text style={styles.textCadastrarSe} onPress={cadastrar}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>
      {loading && <Loading />}
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
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textEsqueceuSenha: {
    fontSize: 15,
    color: COLORS.primary,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    paddingRight: 8,
  },
  divOuHr: {
    width: '100%',
    height: 24,
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
    fontSize: 20,
    color: COLORS.grey,
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  textNormal: {
    fontSize: 16,
  },
  textCadastrarSe: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 5,
  },
});
