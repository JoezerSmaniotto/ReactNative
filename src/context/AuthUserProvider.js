import React, {useState, createContext} from 'react';
import RNRestart from 'react-native-restart';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// export const AuthUserContext = createContext({});

// export const AuthUserProvider = ({chidren}) => {
//   const [user, setUser] = useState(null);

//   return (
//     <AuthUserContext.Provider value={{user, setUser}}>
//       {chidren}
//     </AuthUserContext.Provider>
//   );
// };

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [user, setUser] = useState(null);
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
    <AuthUserContext.Provider
      value={{
        user,
        setUser,
        signOut,
      }}>
      {children}
    </AuthUserContext.Provider>
  );
};
