import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import {COLORS} from '../assets/colors';

import MeuButton from '../components/MeuButton';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Image, Text} from 'react-native-elements';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      if (pass === confirmPass) {
        auth()
          .createUserWithEmailAndPassword(email, pass)
          .then(() => {
            let userF = auth().currentUser;
            userF
              .sendEmailVerification()
              .then(() => {
                Alert.alert(
                  'Informação',
                  'Foi enciado um email para: ' + email + ' para verificação.',
                );
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
            // setEmail('');
            // setPass('');
          })
          .catch(e => {
            console.log('SignIn: erro em entrar: ' + e);
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
        Alert.alert('Erro', 'As senhas digitadas são diferentes.');
      }
    } else {
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
