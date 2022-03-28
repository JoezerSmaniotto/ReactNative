import React, {useState, useEffect, useContext} from 'react';
import ImageResizer from 'react-native-image-resizer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Button as buttonImage,
  Alert,
} from 'react-native';
import {FAB, Input, Button, Text} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import Modal from '../../components/modal';
import CardPet from '../../components/CardPet';
import {COLORS} from '../../assets/colors';
import {UserContext} from '../../context/UserProvider';
import {ApiContext} from '../../context/ApiProvider';
import {PetContext} from '../../context/PetProvider';

const Pets = ({navigation}) => {
  const {getApi} = useContext(ApiContext);
  const [visible, setVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [petsPesquisa, setPetsPesquisa] = useState([]);

  const [dadosPet, setDadosPet] = useState({
    raca: 'pitBull',
    sexo: 'femea',
    nome: '',
    infAdi: '',
    imagemPet: '',
    imagemPetParceial: '',
    latitude: '',
    longitude: '',
  });

  const {getUser, userE} = useContext(UserContext);
  const {savePet, deletePet, getPets, petsList} = useContext(PetContext);

  useEffect(() => {
    getApi(); // Obtem o Objeto de acesso a API REST (Do Firebase)
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getApi(); // Obtem o Objeto de acesso a API REST (Do Firebase)
    // eslint-disable-next-line
  }, [petsList]);

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

  const sendDados = async (urlImageParcialPet, urlCompletaPet) => {
    // console.log('--------------------SEND DADOS--------');
    // console.log('urlImageParcialPet: ', urlImageParcialPet);
    // console.log('urlCompletaPet: ', urlCompletaPet);
    // console.log('dadosPet: ', dadosPet);
    // console.log('userE: ', userE);
    await savePet(dadosPet, userE, urlImageParcialPet, urlCompletaPet, () => {
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
      imagemPetParceial: '',
      latitude: '',
      longitude: '',
    });
  };

  // const deletePet = async () => {
  //   console.log('sendDados: ', sendDados);
  //   await savePet(dadosPet, userE, () => {
  //     setVisible(true);
  //   });

  // };

  // const editar = useCallback(async () => {
  // }, [disabled, nome, email]);

  const openCard = dados => {
    setDadosPet({
      uid: dados.uid,
      nome: dados.nome,
      raca: dados.raca,
      sexo: dados.sexo,
      infAdi: dados.infAdi,
      imagemPet: dados.imagemPet,
      latitude: dados.latitude,
      longitude: dados.longitude,
    });
    setVisible(true);
  };

  const takePicker = () => {
    const options = {
      storageOptions: {
        title: 'Selecionar  uma imagem',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
      // includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.errorCode) {
        console.log('errorMessage-> ', response.errorMessage);
      } else if (response.didCancel) {
        console.log('User Cancel Photograph:');
      } else {
        const path = response?.assets[0]?.uri;
        setImageUri(path);
      }
    });
  };

  const selectImage = () => {
    const options = {
      storageOptions: {
        title: 'Tirar uma foto',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
      // includeBase64: true,
    };

    launchImageLibrary(options, response => {
      // Imagem
      // response.assets[0]?.uri;
      if (response.errorCode) {
        console.log('Image picker Error:', response.errorMessage);
      } else if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        const path = response.assets[0].uri;
        setImageUri(path);
      }
    });
  };

  async function sendImageDatabase(data) {
    let imageRefact = await ImageResizer.createResizedImage(
      imageUri,
      200,
      350,
      'PNG',
      100,
    );
    const urlImageParcialPet = `images/${userE.uid}/${userE.nome}/pets${dadosPet.nome}.jpeg`;
    // console.log('urlImageParcialPet: ', urlImageParcialPet);
    // setDadosPet({...dadosPet, imagemPetParceial: urlImageParcialPet});
    const task = storage().ref(urlImageParcialPet).putFile(imageRefact?.uri);
    await task.on('state_changed', taskSnapshot => {
      console.log(
        'Transf:\n' +
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task
      .then(async () => {
        // try {
        const urlCompletaPet = await storage()
          .ref(urlImageParcialPet)
          .getDownloadURL();
        // console.log('urlImageParcialPet: ', urlImageParcialPet);
        // console.log('urlCompletaPet: ', urlCompletaPet);
        sendDados(urlImageParcialPet, urlCompletaPet);
      })
      .catch(e => {
        console.log(' Catch  Task =>');
        Alert.alert('Erro !', 'Impossivel salvar seu post, tente mais tarde!!');
        // setDadosPet({...dadosPet, imagemPet: ''});
        console.error(e);
      });
  }

  const pesquisaPetPorNome = nome => {
    const filterNames = petsList.filter(pet => {
      return pet.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase());
    });
    setPetsPesquisa(filterNames);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%'}}>
        <Text h3 style={{textAlign: 'center'}}>
          Seus Pets
        </Text>

        <Input
          placeholder="Pequise por nome"
          onChangeText={t => pesquisaPetPorNome(t)}
          keyboardType="default"
          style={styles.input}
        />
      </View>
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
            {petsPesquisa.length === 0 &&
              petsList.map(item => {
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
            {petsPesquisa.length > 0 &&
              petsPesquisa.map(item => {
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
            <ScrollView style={{width: '100%'}}>
              <Image
                source={{
                  uri:
                    imageUri !== ''
                      ? imageUri
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXusGK_JYWv_WvhPl9PAVKb7g71ny6lRMiA&usqp=CAUss',
                }}
                style={{
                  alignSelf: 'center',
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: 'black',
                }}
              />
              <Button
                title={'Selecionar Imagem'}
                onPress={() => {
                  selectImage();
                }}
                buttonStyle={styles.button}
              />
              <Button
                title={'Tirar foto'}
                onPress={() => {
                  takePicker();
                }}
                buttonStyle={styles.button}
              />
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
              <Input
                label="Latitude"
                placeholder="Longitude em decimal"
                onChangeText={e => onchangeDados({latitude: e})}
                keyboardType="numeric"
                value={dadosPet.latitude}
                style={{width: '100%'}}
                // leftIcon={{type: 'font-awesome', name: 'envelope'}}
                // returnKeyType="next"
                // onEndEditing={() => this.passTextInput.focus()}
              />

              <Input
                label="Longitude"
                placeholder="Longitude em decimal"
                onChangeText={e => onchangeDados({longitude: e})}
                keyboardType="numeric"
                value={dadosPet.longitude}
                style={{width: '100%'}}
                // leftIcon={{type: 'font-awesome', name: 'envelope'}}
                // returnKeyType="next"
                // onEndEditing={() => this.passTextInput.focus()}
              />
              <Button
                title="Salvar"
                onPress={sendImageDatabase}
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
            </ScrollView>
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
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
});
