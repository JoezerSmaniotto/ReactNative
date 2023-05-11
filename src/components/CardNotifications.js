/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Image, Text, Button, useTheme} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PetContext} from '../context/PetProvider';

const CardNotifications = ({dadosPet, idUserCont}) => {
  const {theme} = useTheme();
  const {solicitaContatoDonoPetContext} = useContext(PetContext);
  const [openModalPetView, setOpenModalPetView] = useState(false);

  const contactRequest = status => {
    let indexData = dadosPet.favorite.findIndex(
      item => item.userIdSol === idUserCont,
    );
    let newfavorite = dadosPet.favorite;
    if (indexData !== -1) {
      if (status) {
        newfavorite[indexData].status = 'a';
        solicitaContatoDonoPetContext(dadosPet.uid, newfavorite);
      } else {
        newfavorite[indexData].status = 'r';
        solicitaContatoDonoPetContext(dadosPet.uid, newfavorite);
      }
    }
  };

  const confirmContact = () => {
    Alert.alert(
      'ATENÇÃO',
      'Tem certeza que deseja liberar seu contato para o usuario solicitante ?',
      [
        {
          text: 'SIM',
          onPress: () => contactRequest(true),
        },
        {
          text: 'NÃO',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  };

  const rejectContact = () => {
    Alert.alert(
      'ATENÇÃO',
      'Tem certeza que não deseja liberar seu  contato para o usuario solicitante ?',
      [
        {
          text: 'SIM',
          onPress: () => contactRequest(false),
        },
        {
          text: 'NÃO',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={styles.cardPet} underlayColor="#e5e5e5">
      <>
        <View style={styles.cardPetImg}>
          <Image
            // resizeMode="center" // Contain
            style={styles.image}
            source={{
              uri: dadosPet.imagemPet,
            }}
            accessibilityLabel="logo do pet"
          />
        </View>
        <View style={styles.cardPetInfo}>
          <View style={styles.cardPetInfoDetails}>
            <Text
              h4
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{textAlign: 'center'}}
              h4Style={theme.colors.black}>
              {dadosPet.nome}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.textRaca}>
              {dadosPet.raca}
            </Text>
            <FontAwesome
              name={dadosPet.sexo === 0 ? 'mars' : 'venus'}
              color={theme.colors.primary}
              size={18}
              style={{alignSelf: 'center'}}
            />
          </View>
          <View style={styles.cardPetInfoActions}>
            <Button
              icon={
                <MaterialIcons
                  name="close"
                  color={theme.colors.primary}
                  size={30}
                />
              }
              onPress={() => rejectContact()}
              type={'solid'}
              buttonStyle={styles.buttonActionCard}
            />
            <Button
              icon={
                <MaterialIcons
                  name="check"
                  color={theme.colors.primary}
                  size={30}
                />
              }
              onPress={() => confirmContact()}
              type={'solid'}
              buttonStyle={styles.buttonActionCard}
              containerStyle={styles.buttoncontainerStyle}
            />
          </View>
        </View>
      </>
    </View>
  );
};

export default CardNotifications;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-end',
    padding: 10,
  },

  buttoncontainerStyle: {
    marginLeft: 5,
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
    borderRadius: 8,
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
  textRaca: {
    textAlign: 'center',
    fontSize: 15,
  },
});
