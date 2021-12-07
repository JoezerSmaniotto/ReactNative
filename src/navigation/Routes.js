import React, {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthUserContext} from '../context/AuthUserProvider';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {COLORS} from '../assets/colors';

export default function Routes() {
  // const {user, setUser} = useContext(AuthUserContext);

  // useEffect(() => {
  //   // NO login e logout e effect vai ser disparado
  //   // Assim irei obter o user                     Usuario que esta na sessão
  //   const unsubscriber = auth().onAuthStateChanged(authUser => {
  //     // Se estiver autenticado guarda o user, caso contrario salva NULL, ambos no context
  //     authUser ? setUser(authUser) : setUser(null);
  //   });
  //   // Ao desmontrar o component queremos desescrever, o ouvidor de eventos.
  //   return unsubscriber;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <NavigationContainer>
      {/* Aqui se tiver user ele vai mandar AppStack iniciando em home,Caso não
      tenha user ele vai mandar para o SigIn */}
      <AppStack />
    </NavigationContainer>
  );
}
