import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet, Alert} from 'react-native';
import {Input, Text, Button, useTheme} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardPetList from '../../components/CardPetList';
import ModalFilterPet from '../../components/ModalFilterPet';
import Loading from '../../components/Loading';
import {PetContext} from '../../context/PetProvider';
import {UserContext} from '../../context/UserProvider';

const Pets = ({navigation}) => {
  const {theme} = useTheme();
  const [loading, setLoading] = useState(false);
  const [openModalFilterPet, setOpenModalFilterPet] = useState(false);
  const [dataPetsFiltered, setdataPetsFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [parametrosFiltrosPets, setParametrosFiltrosPets] = useState({
    raca: '',
    tipo: 1,
    sexo: 2,
  });
  const {getPetsView, petsListView} = useContext(PetContext);
  const {getUser, userE} = useContext(UserContext);

  useEffect(() => {
    //  set isMounted to true
    let isMounted = true;
    // 👇️ only update state if component is mounted
    if (isMounted) {
      getPetsView({
        raca: '',
        tipo: 0,
        sexo: 2,
      });
    }
    return () => {
      //  when component unmounts, set isMounted to false
      isMounted = false;
      // setdataPetsFiltered(false);
      // setParametrosFiltrosPets({raca: '', tipo: 1, sexo: 2});
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setdataPetsFiltered(petsListView);
  }, [petsListView]);

  useEffect(() => {
    // Tipo
    let data = petsListView.filter(pet => {
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
    if (parametrosFiltrosPets.isFiltered) {
      setIsFiltered(true);
    }

    console.log('dataFiltroAplicado: ', data);
    setdataPetsFiltered(data);
    //"raca": "Labrador retriver", "sexo": 0, "tipo": 0,
  }, [parametrosFiltrosPets, petsListView]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.divSuperior}>
        <Text h3 h3Style={{color: theme.colors.black}}>
          Encontre Pets
        </Text>
        <Button
          icon={
            <MaterialIcons
              name="search"
              color={theme.colors.primary}
              size={35}
              onPress={() => {
                setOpenModalFilterPet(!openModalFilterPet);
              }}
            />
          }
          type={'solid'}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttoncontainerStyle}
        />
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.divInferior}>
          {!isFiltered ? (
            petsListView.map(item => {
              return <CardPetList key={item.uid} dados={item} user={userE} />;
            })
          ) : dataPetsFiltered.length > 0 ? (
            dataPetsFiltered.map(item => {
              return <CardPetList key={item.uid} dados={item} user={userE} />;
            })
          ) : (
            <View style={styles.emptyContent}>
              <MaterialIcons
                name="pets"
                color={theme.colors.primary}
                size={60}
                onPress={() => {
                  setOpenModalFilterPet(!openModalFilterPet);
                }}
              />
              <Text
                style={{
                  color: theme.colors.black,
                  fontSize: 19,
                  marginTop: 10,
                }}>
                Não existe Pets para os filtros aplicados!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {loading && <Loading />}

      <ModalFilterPet
        visible={openModalFilterPet}
        setVisible={setOpenModalFilterPet}
        setParametrosFiltrosPets={setParametrosFiltrosPets}
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBotton: 10,
    zIndex: 10,
  },
  buttonStyle: {
    backgroundColor: '#F5F5F5',
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
