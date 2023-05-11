import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {COLORS} from '../../assets/colors';
import MeuButton from '../../components/MeuButton';
import auth from '@react-native-firebase/auth';
import {Input, Image, Text} from 'react-native-elements';

const ForgotPassWord = ({navigation}) => {
  const [email, setEmail] = useState('');

  const recover = () => {
    if (email !== '') {
      // sendPasswordResetEmail usada para RESETAR O EMAIL
      auth()
        .sendPasswordResetEmail(email)
        .then(r => {
          Alert.alert(
            'Atenção',
            'Enviamos um email de recuperação para: ' + email,
            [{text: 'OK', onPress: () => navigation.goBack()}],
          );
        })
        .catch(e => {
          console.log('ForgotPassWord, recover: ' + e);
          switch (e.code) {
            case 'auth/user-not-found':
              Alert.alert('Erro', 'Usuário não cadastrado.');
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
      Alert.alert('Erro', 'Por favor, digite um email cadastrado.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.div}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logoIvet.png')}
          accessibilityLabel="logo do app"
        />
        <Text h3 style={{marginTop: 30}}>
          Recuperação de Senha
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Informe o e-mail"
          keyboardType="email-address"
          returnKeyType="go"
          onChangeText={t => setEmail(t)}
          autoFocus={true}
        />
        <MeuButton
          texto="Recuperar senha"
          onClick={recover}
          style={{display: 'block', marginTop: 30}}
        />
      </View>
    </View>
  );
};
export default ForgotPassWord;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  div: {
    marginTop: 30,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    marginTop: 60,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 5,
  },
});
