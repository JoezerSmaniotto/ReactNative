import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet, Alert} from 'react-native';
import {Input, Image, Text, Button, useTheme} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardPet = ({deletePet, dados, open}) => {
  const {theme} = useTheme();
  return (
    <View style={styles.cardPet}>
      <View style={styles.cardPetImg}>
        <Image
          // resizeMode="center" // Contain
          style={styles.image}
          source={{
            uri: 'https://i0.statig.com.br/bancodeimagens/br/4j/48/br4j4845bvi3ygylo5wnhk84v.jpg',
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
            Encontre Pets
          </Text>
          <Text
            h4
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{textAlign: 'center'}}
            h4Style={theme.colors.black}>
            Encontre Pets
          </Text>
        </View>
        <View style={styles.cardPetInfoActions}>
          <Button
            icon={
              <MaterialIcons
                name="favorite-border"
                color={theme.colors.primary}
                size={30}
                onPress={() => {
                  Alert.alert('Oi', 'Teste');
                }}
              />
            }
            type={'solid'}
            buttonStyle={styles.buttonActionCard}
            containerStyle={styles.buttoncontainerStyle}
          />
          <Button
            icon={
              <MaterialIcons
                name="search"
                color={theme.colors.primary}
                size={30}
                onPress={() => {
                  Alert.alert('Oi', 'Teste');
                }}
              />
            }
            type={'solid'}
            buttonStyle={styles.buttonActionCard}
            containerStyle={styles.buttoncontainerStyle}
          />
        </View>
      </View>
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
});
