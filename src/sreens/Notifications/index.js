/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Text, useTheme} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CardNotifications from '../../components/CardNotifications';

import Loading from '../../components/Loading';
import {PetContext} from '../../context/PetProvider';
import {UserContext} from '../../context/UserProvider';

const Pets = ({navigation}) => {
  const {theme} = useTheme();
  const [loading, setLoading] = useState(true);
  const [dataPetsNotifications, setDataPetsNotifications] = useState([]);
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
    if (petsList.length > 0 && userE.uid !== '') {
      let petFavoritados = [];
      let myPetsFiltered = petsList.filter(
        item => item.donoPet.uid === userE.uid,
      );
      myPetsFiltered.forEach(pet => {
        pet.favorite.forEach(item => {
          if (item.status === 's') {
            petFavoritados.push({dadosPet: pet, idUserCont: item.userIdSol});
          }
        });
      });
      setDataPetsNotifications(petFavoritados);
    }
  }, [petsList, userE]);

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <>
          <View
            style={styles.divSuperior}
            onPress={() => {}}
            underlayColor="#e5e5e5">
            <>
              <Text h4 h3Style={{color: theme.colors.black}}>
                NOTIFICAÇÕES
              </Text>
              <MaterialIcons
                name="notifications-none"
                color={theme.colors.primary}
                size={35}
                style={styles.iconNotificate}
              />
            </>
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={styles.divInferior}>
              {dataPetsNotifications.length > 0 ? (
                dataPetsNotifications.map((item, index) => {
                  return (
                    <CardNotifications
                      key={`0td0${index}`}
                      dadosPet={item.dadosPet}
                      idUserCont={item.idUserCont}
                    />
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
                    Não notificações para seus Pets!
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
      {loading && <Loading />}
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
  iconNotificate: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    padding: 10,
  },
});
