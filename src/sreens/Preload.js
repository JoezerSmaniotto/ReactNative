import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, Alert} from 'react-native';
import {COLORS} from '../assets/colors';

import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/routers';
import {Image} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Preload = ({navigation}) => {
  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      // console.log(jsonValue);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Home: erro em getUserCache : ' + e);
    }
  };

  const loginUser = async () => {
    const user = await getUserCache();
    if (user) {
      auth() // NO CASO SE TIVER USER EM CACHE, TEM LOGAR O USER NO SISTEMA.
        .signInWithEmailAndPassword(user.email, user.pass)
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        })
        .catch(e => {
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
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    loginUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/logoIvet.png')}
        accessibilityLabel="logo do app"
      />
    </SafeAreaView>
  );
};

export default Preload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },

  image: {
    width: 150,
    height: 150,
  },
});
