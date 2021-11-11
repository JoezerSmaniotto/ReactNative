import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import RNRestart from 'react-native-restart';

const LogoutButton = () => {
  const signOut = () => {
    //1- Remove o item do AsyncStorage "cache"
    AsyncStorage.removeItem('user')
      .then(() => {
        //2- Apos remover da cache aqui eu faço um signOut No firebase
        auth()
          .signOut(() => {})
          .then()
          .catch(e => {
            console.log(
              'LogoutButton: erro em signOut e na função auth : ' + e,
            );
          });
        //3- Apos o passo 1 e 2, faço o restart o APP.
        RNRestart.Restart();
      })
      .catch(e => {
        console.log(
          'LogoutButton: erro em signOut e na função removeItem : ' + e,
        );
      });
  };
  return (
    <Button
      // icon={{type: 'font-awesome', name: 'sign-out', style: {color: 'white'}}}
      icon={<Icon name="sign-out" size={25} color="white" />}
      buttonStyle={styles.button}
      iconContainerStyle={styles.iconContainerStyle}
      onPress={signOut}
      transparent
    />
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    // width: 50,
    // height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: 'white',
  },
  iconContainerStyle: {
    color: 'white',
  },
});
