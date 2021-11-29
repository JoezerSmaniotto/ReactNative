import React, {createContext, useState, useContext} from 'react';
import {ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';

import {ApiContext} from '../context/ApiProvider';

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const [userE, setUserE] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  //console.log(api);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getUser = async () => {
    try {
      const response = await api.get(`/users/${auth().currentUser.uid}`);
      console.log('Dados buscados via API');
      console.log(response.data);
      console.log(response.data.documents);
      let data = [];
      // response.data.documents.map(d => {
      // let k = data.name.split(
      //   'projects/projetoexemplo1-6b1be/databases/(default)/documents/users/',
      // );
      // console.log("K: ", K);
      // let id = k[1];
      //console.log(k[1]);
      //console.log(d.fields.nome.stringValue);
      //console.log(d.fields.tecnologias.stringValue);

      // let data = {
      //   nome: d.fields.nome.stringValue,
      //   email: d.fields.email.stringValue,
      //   uid: k[1],

      //   //   tecnologias: d.fields.tecnologias.stringValue,
      // };
      // });
      // O padrão do fireBase é devolver ordenado por chave, por este motivo irei ordenar
      // data.sort((a, b) => b.nome.localeCompare(a.nome));
      // let filtroUserLogado = data.find(user => {
      //   return user.uid === auth().currentUser.uid;
      // });
      // console.log('filtroUserLogado: ', filtroUserLogado);
      // setUserE(filtroUserLogado);
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar via API.');
      console.log(response);
    }
  };

  // const getUser = async () => {
  //   const unsubscribe = firestore()
  //     .collection('userE')
  //     .orderBy('nome')
  //     .onSnapshot(
  //       //inscrevendo um listener
  //       (querySnapshot) => {
  //         let d = [];
  //         querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           //console.log(doc.id, ' => ', doc.data());
  //           const val = {
  //             uid: doc.id,
  //             nome: doc.data().nome,
  //             tecnologias: doc.data().tecnologias,
  //           };
  //           d.push(val);
  //         });
  //         //console.log(d);
  //         setUserE(d);
  //       },
  //       (e) => {
  //         console.error('UserProvider, getUser: ' + e);
  //       },
  //     );
  //   return unsubscribe;
  // };

  const saveUser = async val => {
    try {
      await api.post('/users/', {
        fields: {
          nome: {stringValue: val.nome},
          tecnologias: {stringValue: val.tecnologias},
        },
      });
      showToast('Dados salvos.');
      getUser();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao saveUser via API.');
      console.log(response);
    }
  };

  // const saveUser = async (val) => {
  //   await firestore()
  //     .collection('userE')
  //     .doc(val.uid)
  //     .set(
  //       {
  //         nome: val.nome,
  //         tecnologias: val.tecnologias,
  //       },
  //       {merge: true},
  //     )
  //     .then(() => {
  //       showToast('Dados salvos.');
  //     })
  //     .catch((e) => {
  //       console.error('UserProvider, saveCourse: ' + e);
  //     });
  // };

  const updateUser = async val => {
    //console.log(val);
    try {
      await api.patch('/users/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          tecnologias: {stringValue: val.tecnologias},
        },
      });
      showToast('Dados salvos.');
      getUser();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao updateUser via API.');
      console.log(response);
    }
  };

  const deleteUser = async val => {
    try {
      await api.delete('/users/' + val);
      showToast('Empresa excluída.');
      getUser();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao deleteUser via API.');
      console.log(response);
    }
  };

  // const deleteUser = async (val) => {
  //   firestore()
  //     .collection('userE')
  //     .doc(val)
  //     .delete()
  //     .then(() => {
  //       showToast('Empresa excluída.');
  //     })
  //     .catch((e) => {
  //       console.error('UserProvider, deleteUser: ', e);
  //     });
  // };

  return (
    <UserContext.Provider
      value={{
        userE,
        getUser,
        saveUser,
        updateUser,
        deleteUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
