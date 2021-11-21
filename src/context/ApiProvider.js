import React, {createContext, useState} from 'react';
import {create} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {
  const [api, setApi] = useState(null);

  const getApi = () => {
    if (auth().currentUser) {
      // se o usuario já esta autenticado quero pegar o token, para usar no serviço de API
      auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          if (idToken) {
            const apiLocal = create({
              baseURL:
                'https://firestore.googleapis.com/v1/projects/projetoexemplo1-6b1be/databases/(default)/documents/',
              headers: {Authorization: 'Bearer ' + idToken},
            });
            console.log('apiLocal: ', apiLocal);
            // //utiliza o middleware para lançar um exceção (usa try-catch no consumidor)
            // apiLocal.addResponseTransform(response => {
            //   if (!response.ok) {
            //     throw response;
            //   }
            // });
            // //coloca no state
            // setApi(apiLocal);
          }
        })
        .catch(e => {
          console.error('ApiProvider, getApi useEffect: ' + e);
        });
    }
  };

  return (
    <ApiContext.Provider
      value={{
        api,
        getApi,
      }}>
      {children}
    </ApiContext.Provider>
  );
};
