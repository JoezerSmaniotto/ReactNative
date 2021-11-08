import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import {COLORS} from '../assets/colors';
import MeuButton from '../components/MeuButton';
import auth from '@react-native-firebase/auth';

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
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="go"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MeuButton texto="Recuperar" onClick={recover} />
    </View>
  );
};
export default ForgotPassWord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    marginTop: 40,
  },
});
