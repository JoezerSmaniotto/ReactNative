import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {FAB, Input, Button, Text} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {View} from 'react-native';

import Modal from '../../components/modal';
import CardPet from '../../components/CardPet';
import {COLORS} from '../../assets/colors';
import {UserContext} from '../../context/UserProvider';
import {ApiContext} from '../../context/ApiProvider';
import {PetContext} from '../../context/PetProvider';

const Pets = ({navigation}) => {
  const {getApi} = useContext(ApiContext);
  const [visible, setVisible] = useState(false);
  const [dadosPet, setDadosPet] = useState({
    raca: 'pitBull',
    sexo: 'femea',
    nome: '',
    infAdi: '',
    imagemPet: '',
  });

  const {getUser, userE} = useContext(UserContext);
  const {savePet, deletePet, getPets, petsList} = useContext(PetContext);

  useEffect(() => {
    getApi(); // Obtem o Objeto de acesso a API REST (Do Firebase)
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    await getUser();
  };

  useEffect(() => {
    getPets();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const onchangeDados = novosDados => {
    setDadosPet(prevState => ({
      ...prevState,
      ...novosDados,
    }));
  };

  const sendDados = async () => {
    console.log('sendDados: ', dadosPet);
    await savePet(dadosPet, userE, () => {
      clearDadosForm();
      setVisible(false);
    });
  };

  const clearDadosForm = () => {
    setDadosPet({
      raca: 'pitBull',
      sexo: 'femea',
      nome: '',
      infAdi: '',
      imagemPet: '',
    });
  };

  // const deletePet = async () => {
  //   console.log('sendDados: ', sendDados);
  //   await savePet(dadosPet, userE, () => {
  //     setVisible(true);
  //   });

  // };

  // const editar = useCallback(async () => {
  //   // console.log('-- -- -- EDITAR -- -- --');
  //   // console.log('NOME => ', nome);
  //   // console.log('email => ', email);
  //   // console.log('----------');
  //   setDisabled(!disabled);
  //   if (userE.nome !== nome) {
  //     let userUpdate = {
  //       uid: userE.uid,
  //       nome: nome,
  //       email: userE.email,
  //     };
  //     if (!disabled) {
  //       await updateUser(userUpdate);
  //     }
  //   }
  // }, [disabled, nome, email]);

  const openCard = dados => {
    setDadosPet({
      uid: dados.uid,
      nome: dados.nome,
      raca: dados.raca,
      sexo: dados.sexo,
      infAdi: dados.infAdi,
      imagemPet: dados.imagemPet,
    });
    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <FAB
        visible={true}
        icon={{name: 'add', color: 'white'}}
        color={COLORS.primary}
        style={{position: 'absolute', bottom: 8, right: 8, zIndex: 100}}
        onPress={() => {
          setVisible(true);
        }}
      />

      <ScrollView style={{width: '100%'}}>
        <>
          <View>
            {petsList.map(item => {
              return (
                <CardPet
                  deletePet={() => {
                    deletePet(item.uid);
                  }}
                  dados={item}
                  open={() => openCard(item)}
                  key={item.uid}
                />
              );
            })}
          </View>

          <Modal
            title={'Crição/Edição'}
            visible={visible}
            setVisible={setVisible}>
            <Input
              label="Nome"
              // placeholder="teste@gmail.com"
              onChangeText={e => onchangeDados({nome: e})}
              keyboardType="default"
              value={dadosPet.nome}
              style={{width: '100%'}}
              // leftIcon={{type: 'font-awesome', name: 'envelope'}}
              // returnKeyType="next"
              // onEndEditing={() => this.passTextInput.focus()}
            />
            <Text>Raça</Text>
            <Picker
              selectedValue={dadosPet.raca}
              onValueChange={(itemValue, itemIndex) =>
                onchangeDados({raca: itemValue})
              }>
              <Picker.Item label="PitBull" value="pitBull" />
              <Picker.Item label="Vira-Lata" value="viraLata" />
              <Picker.Item label="Poodle" value="poodle" />
              <Picker.Item label="Buldogue" value="buldogue" />
              <Picker.Item label="Golden Retriever" value="goldenRetriever" />
            </Picker>

            <Text>Sexo</Text>
            <Picker
              selectedValue={dadosPet.sexo}
              onValueChange={(itemValue, itemIndex) =>
                onchangeDados({sexo: itemValue})
              }>
              <Picker.Item label="Fêmea" value="femea" />
              <Picker.Item label="Macho" value="macho" />
            </Picker>
            <Input
              label="Informações Adicionais"
              placeholder="Informe o que você jugla relegante saber"
              onChangeText={e => onchangeDados({infAdi: e})}
              keyboardType="default"
              value={dadosPet.infAdi}
              style={{width: '100%'}}
              // leftIcon={{type: 'font-awesome', name: 'envelope'}}
              // returnKeyType="next"
              // onEndEditing={() => this.passTextInput.focus()}
            />

            <Button
              title="Salvar"
              onPress={sendDados}
              buttonStyle={styles.button}
            />
            <Button
              title="Cancelar"
              onPress={() => {
                clearDadosForm();
                setVisible(false);
              }}
              buttonStyle={styles.button}
            />
          </Modal>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divSuperior: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'blue',
  },
  texto: {
    color: COLORS.primary,
    textAlign: 'center',
  },
  button: {
    margin: 5,
  },
  textInput: {
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
