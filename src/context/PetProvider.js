import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';
// import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const PetContext = createContext({});

export const PetProvider = ({children}) => {
  const [petsList, setPetsList] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getPets = async () => {
    const unsubscribe = firestore()
      .collection('pets')
      .orderBy('nome')
      .onSnapshot(
        //inscrevendo um listener
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, ' =>  ', doc.data());
            const pet = {
              uid: doc.id,
              nome: doc.data().nome,
              raca: doc.data().raca,
              sexo: doc.data().sexo,
              infAdi: doc.data().infAdi,
              donoPet: doc.data().donoPet,
              imagemPet: doc.data().imagemPet,
              imagemPetParceial: doc.data().imagemPetParceial,
              adotado: doc.data().adotado,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
            };
            d.push(pet);
          });
          // console.log(d);
          setPetsList(d);
        },
        e => {
          console.error('PetContext, getPets: ' + e);
        },
      );

    return unsubscribe;
  };

  const savePet = async (
    pet,
    user,
    urlImageParcialPet,
    urlCompletaPet,
    retorno,
  ) => {
    await firestore()
      .collection('pets')
      .doc(pet.uid)
      .set(
        {
          nome: pet.nome,
          raca: pet.raca,
          sexo: pet.sexo,
          infAdi: pet.infAdi,
          donoPet: user,
          imagemPet: urlCompletaPet,
          urlImageParcialPet: urlImageParcialPet,
          adotado: false,
          latitude: pet.latitude,
          longitude: pet.longitude,
        },
        {merge: true},
      )
      .then(() => {
        showToast('Dados salvos.');
        retorno();
        getPets();
      })
      .catch(e => {
        console.error('PetProvider, savePet: ' + e);
      });
  };

  const deletePet = async uid => {
    if (uid !== '' || uid !== null) {
      Alert.alert(
        'Aviso',
        'Deseja excluir o pet ?',
        [
          {
            text: 'Sim',
            onPress: async () => {
              await firestore()
                .collection('pets')
                .doc(uid)
                .delete()
                .then(() => {
                  showToast('Pet exclu??do.');
                })
                .catch(error => {
                  console.error('PetProvider, deletePet: ', error);
                });
            },
          },
          {text: 'N??o', onPress: () => {}},
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  return (
    <PetContext.Provider
      value={{
        savePet,
        deletePet,
        petsList,
        getPets,
      }}>
      {children}
    </PetContext.Provider>
  );
};
