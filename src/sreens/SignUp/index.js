import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import {COLORS} from '../../assets/colors';

import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/routers';
import firestore from '@react-native-firebase/firestore';

import MeuButton from '../../components/MeuButton';
import Loading from '../../components/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      if (pass === confirmPass) {
        // CRIA USUÁRIO NO firebase com  createUserWithEmailAndPassword
        // como o nome diz com E-mail e Senha
        setLoading(true);
        auth()
          .createUserWithEmailAndPassword(email, pass)
          .then(() => {
            /*Quando crar usuário ele já loga na seção, Assim obtem o usuário logado na
            aplicação com o auth().currentUser, que vai poder disparar o email de vereficação*/
            let userF = auth().currentUser;
            let user = {};
            user.nome = nome;
            user.email = email;
            firestore()
              .collection('users') // Refêrencia da coleção
              .doc(userF.uid) // Chave do documentos IDENTICADOS UID.
              .set(user) // Valor do documentos, DADOS QUE SERAM PERSISITIDOS NO BANCO
              .then(() => {
                console.log('SignUp, cadastrar: Usuário adicionado');
                // Assim aguarda criar o registro do banco de dados, para só apos enviar o email de verificação
                userF
                  .sendEmailVerification()
                  .then(() => {
                    // dispara de email de verificação
                    console.log('VERIFICA EMAIL');
                    Alert.alert(
                      'Informação',
                      'Foi enviado um email para: ' +
                        email +
                        ' para verificação.',
                    );
                    // Apos ter enviado o email de verificação, redireciona para o SignIn
                    setLoading(false);
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: 'SignIn'}],
                      }),
                    );
                  })
                  .catch(e => {
                    console.log('SignUp, cadastrar: ', e);
                  });
              })
              .catch(e => {
                console.log('SignUp: erro em entrar: ' + e);
              });
          })
          .catch(e => {
            setLoading(false);
            console.log('SignUp: erro em entrar1: ' + e);
            switch (e.code) {
              case 'auth/email-already-in-use':
                Alert.alert('Erro', 'Email já esta em uso.');
                break;
              case 'auth/operation-not-allowed':
                Alert.alert('Erro', 'Problemas ao cadastrar  usuário.');
                break;
              case 'auth/invalid-email':
                Alert.alert('Erro', 'Email inválido.'); //ok
                break;
              case 'auth/weak-password':
                Alert.alert(
                  'Erro',
                  'Senha é fraca, favor digitar uma senha forte, contendo numeros, caracteres especiais. ',
                ); //ok
                break;
            }
          });
      } else {
        console.log('Senha não conferem');
        Alert.alert('Erro', 'As senhas digitadas são diferentes.');
      }
    } else {
      console.log('Faltam Dados a ser prenchidos');
      Alert.alert(
        'Erro',
        'Por favor preencha os campos de nome, email e  senha!',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Input
            // label="Nome Completo"
            placeholder="Nome Completo"
            onChangeText={t => setNome(t)}
            keyboardType="default"
            leftIcon={{type: 'font-awesome', name: 'user'}}
            // style={styles.input}
            // returnKeyType="next"
            // onEndEditing={() => this.emailTextInput.focus()}
          />

          <Input
            // ref={ref => {
            //   this.emailTextInput = ref;
            // }}
            // label="Email"
            placeholder="Email"
            onChangeText={t => setEmail(t)}
            keyboardType="email-address"
            leftIcon={{type: 'font-awesome', name: 'envelope'}}
            // style={styles.input}
            // returnKeyType="next"
            // onEndEditing={() => this.passTextInput.focus()}
          />
          <Input
            // ref={ref => {
            //   this.passTextInput = ref; // recebe a referencia
            // }}
            // label="Senha"
            placeholder="Senha"
            onChangeText={t => setPass(t)}
            keyboardType="default"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            // style={styles.input}
            // returnKeyType="next"
            // onEndEditing={() => this.confirPassTextInput.focus()}
          />
          <Input
            // ref={ref => {
            //   this.confirPassTextInput = ref; // recebe a referencia
            // }}
            // label="Confirma Senha"
            placeholder="Confirma Senha"
            onChangeText={t => setConfirmPass(t)}
            keyboardType="default"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            // style={styles.input}
            // returnKeyType="send"
            // onEndEditing={() => cadastrar()}
          />

          <MeuButton texto="ENTRAR" onClick={cadastrar} />
        </View>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: COLORS.white,
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
});
