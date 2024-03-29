/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import ImageResizer from 'react-native-image-resizer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Alert,
} from 'react-native';
import {Text as Texto} from './styles';
import {
  FAB,
  Input,
  Button,
  Text,
  ButtonGroup,
  useTheme,
} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';

import Modal from '../../components/modal';
import ModalSelect from '../../components/ModalSelect';
import ModalMapa from '../../components/ModalMapa';
import CardPet from '../../components/CardPet';
import {COLORS} from '../../assets/colors';
import {UserContext} from '../../context/UserProvider';
import {ApiContext} from '../../context/ApiProvider';
import {PetContext} from '../../context/PetProvider';

const MyPets = ({navigation}) => {
  const {getApi} = useContext(ApiContext);
  const [visible, setVisible] = useState(false);
  const [openModalSelect, setOpenModalSelect] = useState(false);
  const [openModalMapa, setOpenModaMapa] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [petsListUser, setPetsListUser] = useState([]);
  const [petsPesquisa, setPetsPesquisa] = useState([]);
  const {theme} = useTheme();
  const [dadosPet, setDadosPet] = useState({
    raca: '',
    sexo: 0,
    tipo: 0,
    nome: '',
    infAdi: '',
    imagemPet: '',
    imagemPetParceial: '',
    latitude: '',
    longitude: '',
    favorite: [],
  });
  const [disabledSalveModal, setDisabledSalveModal] = useState(false);
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

  useEffect(() => {
    if (petsList && userE) {
      let petsFilteredUserLogged = petsList.filter(
        item => item.donoPet.uid === userE.uid,
      );
      setPetsListUser(petsFilteredUserLogged);
    }
  }, [petsList, userE]);

  const fetchData = async () => {
    await getUser();
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getPets();
    }
    return () => {
      // when component unmounts, set isMounted to false
      isMounted = false;
    };
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
    let dadosNulos = false;
    let campoNull = '';
    for (var item in dadosPet) {
      if (dadosPet[item] === '' || dadosPet[item] === null) {
        if (item !== 'imagemPet' && item !== 'imagemPetParceial') {
          dadosNulos = true;
          campoNull = item;
        }
      }
    }
    if (!dadosNulos) {
      setDisabledSalveModal(true);
      await savePet(dadosPet, userE, urlImageParcialPet, urlCompletaPet, () => {
        clearDadosForm();
        setVisible(false);
      });
    } else {
      if (campoNull === 'latitude' || campoNull === 'longitude') {
        Alert.alert('Aviso !', 'Preencha a localização do Pet para salvar.');
      } else {
        Alert.alert(
          'Aviso !',
          `Preencha o campo ${campoNull} do Pet para salvar.`,
        );
      }
    }
  };

  const clearDadosForm = isModal => {
    setDadosPet({
      raca: '',
      sexo: 0,
      tipo: 0,
      nome: '',
      infAdi: '',
      imagemPet: '',
      imagemPetParceial: '',
      latitude: '',
      longitude: '',
      favorite: [],
    });
    setDisabledSalveModal(false);
    setImageUri('');
    if (isModal) {
      setVisible(false);
    }
  };

  const openCard = dados => {
    setDadosPet({
      uid: dados.uid,
      nome: dados.nome,
      raca: dados.raca,
      sexo: dados.sexo,
      tipo: dados.tipo,
      infAdi: dados.infAdi,
      imagemPet: dados.imagemPet,
      latitude: dados.latitude,
      longitude: dados.longitude,
      favorite: dados.uid ? dados.favorite : [],
    });
    setImageUri(dados.imagemPet);
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
    if (imageUri !== '') {
      let imageRefact = await ImageResizer.createResizedImage(
        imageUri,
        200,
        350,
        'PNG',
        100,
      );
      const urlImageParcialPet = `images/${userE.uid}/${userE.nome}/pets${dadosPet.nome}.jpeg`;
      //console.log('urlImageParcialPet: ', urlImageParcialPet);
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
          Alert.alert(
            'Erro !',
            'Impossivel salvar seu post, tente mais tarde!!',
          );
          // setDadosPet({...dadosPet, imagemPet: ''});
          console.error(e);
        });
    } else {
      Alert.alert('Erro !', 'Selecione ou tire um foto do seu Pet');
    }
  }

  const pesquisaPetPorNome = nome => {
    const filterNames = petsListUser.filter(pet => {
      return pet.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase());
    });
    setPetsPesquisa(filterNames);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.superior}>
        <Text
          h4
          style={{textAlign: 'center'}}
          h4Style={{color: theme.colors.black}}>
          MEUS PETS
        </Text>
      </View>
      <View style={{width: '100%'}}>
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
          <View style={{flex: 1}}>
            {petsPesquisa.length === 0 &&
              petsListUser.map(item => {
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
          <ModalSelect
            title={'Teste'}
            visible={openModalSelect}
            setVisible={setOpenModalSelect}
            tipoPet={dadosPet.tipo}
            racaDoPet={dadosPet.raca}
            trocaRacaPet={onchangeDados}
          />
          <Modal
            title={'Criação/Edição'}
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
                type={'outline'}
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
              <ButtonGroup
                buttons={[
                  <FontAwesome5
                    name="dog"
                    color={theme.colors.black}
                    size={25}
                  />,
                  <FontAwesome5
                    name="cat"
                    color={theme.colors.black}
                    size={25}
                  />,
                ]}
                selectedIndex={dadosPet.tipo}
                onPress={e => {
                  onchangeDados({tipo: e});
                }}
                containerStyle={{marginBottom: 15}}
              />

              <ButtonGroup
                buttons={['Macho', 'Fêmea']}
                selectedIndex={dadosPet.sexo}
                color={theme.colors.black}
                onPress={e => {
                  onchangeDados({sexo: e});
                }}
                containerStyle={{marginBottom: 15}}
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontWeight: 'bold',
                  color: 'grey',
                  fontSize: 15,
                }}>
                Selecione a Raça
              </Text>
              <Texto onPress={() => setOpenModalSelect(true)}>
                {dadosPet.raca}
              </Texto>
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
                title={
                  dadosPet?.latitude !== ''
                    ? 'Alterar a localização do Pet'
                    : 'Informe a localização do Pet'
                }
                type="clear"
                icon={
                  <Ionicons
                    name="location-sharp"
                    color={theme.colors.black}
                    size={20}
                  />
                }
                iconRight
                onPress={() => {
                  setOpenModaMapa(true);
                }}
                buttonStyle={styles.button}
              />

              <Button
                title="Salvar"
                onPress={sendImageDatabase}
                buttonStyle={styles.button}
                disabled={disabledSalveModal}
              />
              <Button
                title="Cancelar"
                onPress={() => {
                  clearDadosForm(true);
                }}
                buttonStyle={styles.button}
                type={'outline'}
              />
            </ScrollView>
          </Modal>

          <ModalMapa
            title={'MAPA'}
            visible={openModalMapa}
            setVisible={setOpenModaMapa}
            updateLocalizacao={onchangeDados}
            coordenadasRecebidas={{
              latitude: dadosPet.latitude,
              longitude: dadosPet.longitude,
              nome: dadosPet.nome,
              raca: dadosPet.raca,
              img: imageUri,
            }}
          />
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(MyPets);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  superior: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 8,
    paddingLeft: 8,
    paddingTop: 13,
    paddingBottom: 13,
  },
  texto: {
    color: COLORS.primary,
    textAlign: 'center',
  },
  text: {
    width: '95%',
    height: '26',
    fontSize: '16',
    color: 'blue',
    border: '0 solid grey',
    borderBottomWidth: '',
    paddingLeft: '2',
    paddingBottom: '1',
    marginBottom: '1',
    marginTop: '10',
  },
  button: {
    margin: 5,
    borderWidth: 1,
  },
  textInput: {
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
