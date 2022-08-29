import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';
// import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const RacaPetContext = createContext({});

export const RacaPetProvider = ({children}) => {
  const [racasList, setRacasList] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getRacaPets = async () => {
    const unsubscribe = firestore()
      .collection('species')
      .orderBy('nomeRacaPet')
      .onSnapshot(
        //inscrevendo um listener
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' =>  ', doc.data());
            const racas = {
              uid: doc.uid,
              nomeRacaPet: doc.data().nomeRacaPet,
              tipoPet: doc.data().tipoPet,
            };
            d.push(racas);
          });
          // console.log(d);

          setRacasList(d);
        },
        e => {
          console.error('PetContext, getPets: ' + e);
        },
      );

    return unsubscribe;
  };

  const saveRacaPets = async (racaPet, retorno) => {
    console.log('saveRacaPets racaPet: ', racaPet);
    await firestore()
      .collection('species')
      .doc(racaPet.uid)
      .set(
        {
          nomeRacaPet: racaPet.nomeRaca,
          tipoPet: racaPet.tipoPet,
        },
        {merge: true},
      )
      .then(() => {
        showToast('Dados salvos.');
        retorno();
        //getRacaPets //getPets(); --- ***** FAZER AQUI O getRacaPets Para atualizar a raças ****----
      })
      .catch(e => {
        console.error('RacaPetProvider, savePet: ' + e);
      });
  };

  const deleteRacaPets = async uid => {
    if (uid !== '' || uid !== null) {
      Alert.alert(
        'Aviso',
        'Deseja excluir a raça ?',
        [
          {
            text: 'Sim',
            onPress: async () => {
              await firestore()
                .collection('species')
                .doc(uid)
                .delete()
                .then(() => {
                  showToast('Raça excluída.');
                })
                .catch(error => {
                  console.error('RacaPetProvider, deleteRacaPets: ', error);
                });
            },
          },
          {text: 'Não', onPress: () => {}},
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  return (
    <RacaPetContext.Provider
      value={{
        getRacaPets,
        saveRacaPets,
        deleteRacaPets,
        racasList,
      }}>
      {children}
    </RacaPetContext.Provider>
  );
};
