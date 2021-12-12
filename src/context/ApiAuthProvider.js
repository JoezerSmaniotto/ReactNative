import React, {createContext, useState} from 'react';
import {create} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiAuthContext = createContext({});

export const ApiAuthProvider = ({children}) => {
  const [apiAuth, setApiAuth] = useState(null);

  const getAuthApi = () => {
    if (auth().currentUser) {
      // se o usuario já esta autenticado quero pegar o token, para usar no serviço de API
      auth()
        .currentUser.getIdToken()
        .then(idToken => {
          if (idToken) {
            const apiLocal = create({
              baseURL: 'https://identitytoolkit.googleapis.com/v1/',
              headers: {Authorization: 'Bearer' + idToken},
            });
            // console.log('apiLocal: ', apiLocal);
            //utiliza o middleware para lançar um exceção (usa try-catch no consumidor)
            // Com o middleware irei pegar a response e fazer uma transformação
            apiLocal.addResponseTransform(response => {
              if (!response.ok) {
                throw response;
              }
            });
            //coloca no state
            setApiAuth(apiLocal);
          }
        })
        .catch(e => {
          console.error('ApiProvider, getApi useEffect: ' + e);
        });
    }
  };

  return (
    <ApiAuthContext.Provider
      value={{
        apiAuth,
        getAuthApi,
      }}>
      {children}
    </ApiAuthContext.Provider>
  );
};
