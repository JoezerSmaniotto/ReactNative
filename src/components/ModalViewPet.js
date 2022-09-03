/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Text, useTheme, Image} from 'react-native-elements';
import {View, StyleSheet, Modal, Dimensions} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ModalViewPet = ({visible, setVisible, dadosPet}) => {
  const {theme} = useTheme();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <Modal visible={visible} onBackdropPress={toggleOverlay}>
      <MaterialIcons
        style={{alignSelf: 'flex-end', marginTop: 18, marginRight: 18}}
        name="close"
        color={theme.colors.primary}
        size={50}
        onPress={() => {
          setVisible(false);
        }}
      />
      <View style={styles.container}>
        <View style={styles.viewSupior} />
        <View style={styles.viewConteudo}>
          <View style={styles.viewImage}>
            <Image
              //resizeMode="center" // Contain
              style={styles.image}
              source={{
                uri: dadosPet.imagemPet,
              }}
              accessibilityLabel="logo do app"
            />
          </View>
          <View style={styles.Info}>
            <Text
              h4
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{textAlign: 'center'}}
              h4Style={theme.colors.black}>
              Nome: {dadosPet.nome}
            </Text>
            <View style={styles.InfoAdicionais}>
              <MaterialIcons
                name="pets"
                color={theme.colors.primary}
                size={25}
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.textoEstilo}>
                {dadosPet.raca}
              </Text>
            </View>
            <View style={styles.InfoAdicionais}>
              <FontAwesome5
                name="venus-mars"
                color={theme.colors.primary}
                size={25}
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={styles.textoEstiloSexoPet}>
                {dadosPet.sexo === 0 ? 'Macho' : 'Fêmea'}
              </Text>
            </View>
            <View style={styles.InfoAdicionais}>
              <FontAwesome5
                name="info-circle"
                color={theme.colors.primary}
                size={25}
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.textoEstilo}>
                {dadosPet.infAdi}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSupior: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewConteudo: {
    marginTop: 10,
  },

  viewImage: {
    flex: 1,
  },
  Info: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  image: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').width - 50,
    borderRadius: 18,
  },

  buttonStyle: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    padding: 10,
  },
  button: {
    margin: 7,
  },
  containerStyle: {
    alignSelf: 'flex-end',
  },
  InfoAdicionais: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  textoEstilo: {
    fontSize: 18,
    marginLeft: 8,
  },
  textoEstiloSexoPet: {
    fontSize: 18,
    marginLeft: 8,
  },
});

export default ModalViewPet;
