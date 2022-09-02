import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Image, Text, Button, useTheme} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalViewPet from './ModalViewPet';
import {PetContext} from '../context/PetProvider';

const CardPet = ({dadosPet, user}) => {
  const {theme} = useTheme();
  const {favoritePetContext} = useContext(PetContext);
  const [openModalPetView, setOpenModalPetView] = useState(false);

  const favoritePet = () => {
    if (dadosPet.favorite.filter(item => item === user.uid).length > 0) {
      let removeUserFavorite = dadosPet.favorite.filter(
        item => item !== user.uid,
      );
      favoritePetContext(dadosPet.uid, removeUserFavorite);
    } else {
      let addUserFavorite = dadosPet.favorite;
      addUserFavorite.push(user.uid);
      favoritePetContext(dadosPet.uid, addUserFavorite);
    }
  };

  return (
    <View style={styles.cardPet}>
      <View style={styles.cardPetImg}>
        <Image
          // resizeMode="center" // Contain
          style={styles.image}
          source={{
            uri: dadosPet.imagemPet,
          }}
          accessibilityLabel="logo do app"
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
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.textRaca}>
            {dadosPet.raca}
          </Text>
        </View>
        <View style={styles.cardPetInfoActions}>
          {user.uid !== dadosPet.donoPet.uid &&
            (dadosPet.favorite.filter(item => item === user.uid).length > 0 ? (
              <>
                <Button
                  icon={
                    <MaterialIcons
                      name="favorite"
                      color={theme.colors.primary}
                      size={30}
                    />
                  }
                  onPress={favoritePet}
                  type={'solid'}
                  buttonStyle={styles.buttonActionCard}
                  containerStyle={styles.buttoncontainerStyle}
                />
              </>
            ) : (
              <>
                <Button
                  icon={
                    <MaterialIcons
                      name="favorite-border"
                      color={theme.colors.primary}
                      size={30}
                    />
                  }
                  onPress={favoritePet}
                  type={'solid'}
                  buttonStyle={styles.buttonActionCard}
                  containerStyle={styles.buttoncontainerStyle}
                />
              </>
            ))}
          <Button
            icon={
              <MaterialIcons
                name="search"
                color={theme.colors.primary}
                size={30}
                onPress={() => {
                  setOpenModalPetView(true);
                }}
              />
            }
            type={'solid'}
            buttonStyle={styles.buttonActionCard}
            containerStyle={styles.buttoncontainerStyle}
          />
        </View>
      </View>

      <ModalViewPet
        visible={openModalPetView}
        setVisible={setOpenModalPetView}
        dadosPet={dadosPet}
      />
    </View>
  );
};

export default CardPet;

const styles = StyleSheet.create({
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
