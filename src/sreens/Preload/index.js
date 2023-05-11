import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/routers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiContext} from '../../context/ApiProvider';
import {ApiAuthContext} from '../../context/ApiAuthProvider';

import {StyleSheet, SafeAreaView} from 'react-native';
import {Image} from 'react-native-elements';
import {COLORS} from '../../assets/colors';

const Preload = ({navigation}) => {
  const {getApi} = useContext(ApiContext);
  const {getAuthApi} = useContext(ApiAuthContext);

  const getUserCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      // console.log('getUserCache => jsonValue', jsonValue);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Home: erro em getUserCache : ' + e);
    }
  };

  const loginUser = async () => {
    try {
      const user = await getUserCache();
      // console.log('loginUser => user : ');
      // console.log(user);

      if (user) {
        await auth().signInWithEmailAndPassword(user.email, user.pass);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );
      } else {
        // Caso não tenha usuário
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          }),
        );
      }
    } catch (e) {
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
    }
  };

  useEffect(() => {
    loginUser();
    getApi();
    getAuthApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/logoIvet.png')}
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
    backgroundColor: '#F5F5F5',
  },

  image: {
    width: 150,
    height: 150,
  },
});
