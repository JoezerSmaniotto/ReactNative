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
        //2- Apos remover da cache aqui eu faço um signOutn No firebase
        auth()
          .signOut(() => {})
          .then()
          .catch(e => {
            console.log(
              'LogoutButton: erro em signOut e na função auth : ' + e,
            );
          });
        //3- Apos o passo 1 e 2 restart o APP.
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
      icon={<Icon name="arrow-right" size={15} color="white" />}
      title="Button with icon component"
      // buttonStyle={styles.button}
      onPress={signOut}
    />
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    width: 50,
    // height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
