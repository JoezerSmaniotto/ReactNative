/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';
import {Text, Button, useTheme} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CardPetList from '../../components/CardPetList';
import ModalFilterPet from '../../components/ModalFilterPet';
import Loading from '../../components/Loading';
import {PetContext} from '../../context/PetProvider';
import {UserContext} from '../../context/UserProvider';

const Pets = ({navigation}) => {
  const {theme} = useTheme();
  const [loading, setLoading] = useState(true);
  const [openModalFilterPet, setOpenModalFilterPet] = useState(false);
  const [dataPetsFiltered, setdataPetsFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [parametrosFiltrosPets, setParametrosFiltrosPets] = useState({
    raca: '',
    tipo: 1,
    sexo: 2,
    favoritos: false,
  });
  const {getPets, petsList} = useContext(PetContext);
  const {getUser, userE} = useContext(UserContext);

  useEffect(() => {
    //  set isMounted to true
    let isMounted = true;
    // only update state if component is mounted
    if (isMounted) {
      getPets();
      getUser();
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
    return () => {
      // when component unmounts, set isMounted to false
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setdataPetsFiltered(petsList);
  }, [petsList]);

  useEffect(() => {
    // let data = petsList;
    if ((parametrosFiltrosPets, petsList, userE.uid !== '')) {
      let data = '';
      if (parametrosFiltrosPets.favoritos) {
        let petFavoritados = [];
        petsList.forEach(pet => {
          // if (pet.favorite.filter(item => item === userE.uid).length > 0) {
          pet.favorite.forEach(item => {
            if (item === userE.uid) {
              petFavoritados.push(pet);
            }
          });
        });
        data = petFavoritados;
        // Tipo
        data = data.filter(pet => {
          return pet.tipo === parametrosFiltrosPets.tipo;
        });

        // Sexo
        if (parametrosFiltrosPets.sexo !== 2) {
          data = data.filter(pet => {
            return pet.sexo === parametrosFiltrosPets.sexo;
          });
        }
      } else {
        // Tipo
        data = petsList.filter(pet => {
          return pet.tipo === parametrosFiltrosPets.tipo;
        });

        // Sexo
        if (parametrosFiltrosPets.sexo !== 2) {
          data = data.filter(pet => {
            return pet.sexo === parametrosFiltrosPets.sexo;
          });
        }

        // Raca
        if (parametrosFiltrosPets.raca !== '') {
          data = data.filter(pet => {
            return pet.raca === parametrosFiltrosPets.raca;
          });
        }
      }
      if (parametrosFiltrosPets.isFiltered) {
        setIsFiltered(true);
      }

      setdataPetsFiltered(data);
    }
    //"raca": "Labrador retriver", "sexo": 0, "tipo": 0,
  }, [parametrosFiltrosPets, petsList, userE]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <>
          <TouchableHighlight
            style={styles.divSuperior}
            onPress={() => setOpenModalFilterPet(!openModalFilterPet)}
            underlayColor="#e5e5e5">
            <>
              <Text h4 h3Style={{color: theme.colors.black}}>
                FILTRAR PETS
              </Text>
              <Button
                icon={
                  <MaterialIcons
                    name="search"
                    color={theme.colors.primary}
                    size={35}
                  />
                }
                onPress={() => setOpenModalFilterPet(!openModalFilterPet)}
                type={'solid'}
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttoncontainerStyle}
              />
            </>
          </TouchableHighlight>
          <ScrollView style={{flex: 1}}>
            <View style={styles.divInferior}>
              {!isFiltered ? (
                petsList.map(item => {
                  return (
                    <CardPetList key={item.uid} dadosPet={item} user={userE} />
                  );
                })
              ) : dataPetsFiltered.length > 0 ? (
                dataPetsFiltered.map(item => {
                  return (
                    <CardPetList key={item.uid} dadosPet={item} user={userE} />
                  );
                })
              ) : (
                <View style={styles.emptyContent}>
                  <MaterialIcons
                    name="pets"
                    color={theme.colors.primary}
                    size={60}
                  />
                  <Text
                    style={{
                      color: theme.colors.black,
                      fontSize: 19,
                      marginTop: 10,
                    }}>
                    Não existe Pets para os filtros aplicados!
                  </Text>
                  <Button
                    icon={
                      <MaterialCommunityIcons
                        name="filter-remove-outline"
                        color={theme.colors.black}
                        size={27}
                      />
                    }
                    onPress={() => {
                      setIsFiltered(false);
                      setParametrosFiltrosPets({
                        raca: '',
                        tipo: 1,
                        sexo: 2,
                        favoritos: false,
                      });
                      showToast('Filtro removido');
                    }}
                    type={'solid'}
                    buttonStyle={styles.buttonFilterStyle}
                    containerStyle={styles.containerStyle}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
      {loading && <Loading />}

      <ModalFilterPet
        visible={openModalFilterPet}
        setVisible={setOpenModalFilterPet}
        setParametrosFiltrosPets={setParametrosFiltrosPets}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
      />
    </SafeAreaView>
  );
};
export default React.memo(Pets);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    zIndex: 0,
  },
  divSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    padding: 10,
  },

  buttoncontainerStyle: {
    marginLeft: 20,
  },

  cardPet: {
    width: '100%',
    height: 140,
    marginTop: 10,
    backgroundColor: '#e5e5e5',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardPetImg: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  cardPetInfo: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPetInfoDetails: {
    flex: 1,
  },
  cardPetInfoActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonActionCard: {
    backgroundColor: '#e5e5e5',
    alignSelf: 'flex-end',
    padding: 10,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
});
