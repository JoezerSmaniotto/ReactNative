import React from 'react';
import {Button, Overlay, Text, useTheme, Image} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ModalViewPet = ({visible, setVisible, dados}) => {
  const {theme} = useTheme();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={styles.container}>
        <View style={styles.viewSupior}>
          <Button
            icon={
              <Fontisto
                name="close"
                color={{color: theme.colors.black}}
                size={23}
                onPress={() => {
                  toggleOverlay();
                }}
              />
            }
            type={'solid'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
          />
        </View>
        <View style={styles.viewConteudo}>
          <View style={styles.viewImage}>
            <Image
              // resizeMode="center" // Contain
              style={styles.image}
              source={{
                uri: dados.imagemPet,
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
              {dados.nome}
            </Text>
            <View style={styles.InfoAdicionais}>
              <MaterialIcons
                name="pets"
                color={theme.colors.primary}
                size={15}
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.textoEstilo}>
                {dados.raca}
              </Text>
            </View>
            <View style={styles.InfoAdicionais}>
              <FontAwesome5
                name="venus-mars"
                color={theme.colors.primary}
                size={15}
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={styles.textoEstiloSexoPet}>
                {dados.sexo === 0 ? 'Macho' : 'Fêmea'}
              </Text>
            </View>
            <View style={styles.InfoAdicionais}>
              <FontAwesome5
                name="info-circle"
                color={theme.colors.primary}
                size={15}
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.textoEstilo}>
                {dados.infAdi}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 340,
    height: 210,
    display: 'flex',
  },
  viewSupior: {
    width: '100%',
    sdisplay: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewConteudo: {
    marginTop: 10,
    width: '100%',
    height: 130,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    width: 160,
    height: 120,
    borderRadius: 8,
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
  },
  textoEstilo: {
    fontSize: 15,
    marginLeft: 5,
  },
  textoEstiloSexoPet: {
    fontSize: 15,
    marginLeft: 4,
  },
});

export default ModalViewPet;
