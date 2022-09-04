/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Button,
  Overlay,
  Text,
  useTheme,
  ButtonGroup,
} from 'react-native-elements';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalSelectFilter from '../components/ModalSelectFilter';
import {Text as Texto} from './styles';

const ModalFilterPet = ({
  visible,
  setVisible,
  setParametrosFiltrosPets,
  isFiltered,
  setIsFiltered,
}) => {
  const {theme} = useTheme();
  const [dadosFilter, setDadosFilter] = useState({
    tipo: 0,
    sexo: 0,
    raca: '',
    favoritos: false,
  });
  const [openSelectFilter, setOpenSelectFilter] = useState(false);

  useEffect(() => {
    return () => {
      //console.log('DEVERIA APARECER QUANDO FECHO ELE');
      setDadosFilter({
        tipo: 0,
        sexo: 0,
        raca: '',
        favoritos: false,
      });
    };
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onchangeDados = novosDados => {
    setDadosFilter(prevState => ({
      ...prevState,
      ...novosDados,
    }));
  };

  const buscaDados = () => {
    setParametrosFiltrosPets({...dadosFilter, isFiltered: true});
    toggleOverlay();
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const removeFilter = () => {
    setDadosFilter({
      tipo: 0,
      sexo: 0,
      raca: '',
      favoritos: false,
    });
    setIsFiltered(false);
    showToast('Filtro removido');
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={styles.container}>
        <View style={styles.viewSupior}>
          <Text
            h4
            h4Style={{color: theme.colors.black}}
            containerStyle={{
              width: '85%',
              alignSelf: 'center',
            }}>
            Filtrar Pets
          </Text>
          <Button
            label={'Favoritos'}
            icon={
              <Fontisto
                name="close"
                color={theme.colors.black}
                size={23}
                onPress={() => {
                  toggleOverlay();
                }}
              />
            }
            iconRight
            type={'solid'}
            buttonStyle={styles.buttonStyle}
          />
        </View>
        <View style={styles.viewConteudo}>
          <ButtonGroup
            buttons={[
              <FontAwesome5 name="dog" color={theme.colors.black} size={25} />,
              <FontAwesome5 name="cat" color={theme.colors.black} size={25} />,
            ]}
            selectedIndex={dadosFilter.tipo}
            onPress={e => {
              onchangeDados({tipo: e, raca: ''});
            }}
            containerStyle={styles.buttonGroupContainer}
          />
          <ButtonGroup
            buttons={['Macho', 'Fêmea', 'Ambos']}
            selectedIndex={dadosFilter.sexo}
            color={theme.colors.black}
            onPress={e => {
              onchangeDados({sexo: e});
            }}
            containerStyle={styles.buttonGroupContainer}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: 'grey',
              fontSize: 15,
            }}>
            Selecione a Raça
          </Text>
          <Texto
            onPress={() => {
              setOpenSelectFilter(true);
            }}>
            {dadosFilter.raca}
          </Texto>

          <Button
            type={dadosFilter.favoritos ? 'solid' : 'outline'}
            buttonStyle={{width: 150}}
            containerStyle={styles.buttonFavorite}
            disabledStyle={{
              borderWidth: 2,
            }}
            icon={
              <MaterialIcons
                name="favorite"
                color={theme.colors.black}
                size={17}
              />
            }
            iconContainerStyle={{background: '#000'}}
            iconRight
            onPress={() => onchangeDados({favoritos: !dadosFilter.favoritos})}
            title="Favoritos"
            titleStyle={{marginHorizontal: 5}}
          />
          <View style={styles.viewButonsActions}>
            <Button
              icon={
                <MaterialCommunityIcons
                  name="filter-remove-outline"
                  color={theme.colors.black}
                  size={27}
                />
              }
              onPress={removeFilter}
              type={'solid'}
              buttonStyle={styles.buttonFilterStyle}
              containerStyle={styles.bottonButtonMargin}
            />
            <Button
              icon={
                <MaterialIcons
                  name="search"
                  color={theme.colors.black}
                  size={27}
                />
              }
              type={'solid'}
              onPress={buscaDados}
              buttonStyle={styles.buttonFilterStyle}
            />
          </View>
        </View>
        <ModalSelectFilter
          visible={openSelectFilter}
          setVisible={setOpenSelectFilter}
          tipoPet={dadosFilter.tipo}
          setaRaca={onchangeDados}
          raca={dadosFilter.raca}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 340,
    height: 350,
    display: 'flex',
  },
  viewSupior: {
    width: '100%',
    sdisplay: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewConteudo: {
    marginTop: 10,
    width: '100%',
    height: 240,
    display: 'flex',
  },

  buttonStyle: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    padding: 10,
  },
  buttonFilterStyle: {
    backgroundColor: '#EEB310',
    alignSelf: 'flex-end',
    padding: 10,
  },
  button: {
    margin: 7,
  },
  buttonGroupContainer: {
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  containerStyle: {
    alignSelf: 'flex-end',
  },
  viewButonsActions: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottonButtonMargin: {
    marginRight: 5,
  },
  buttonFavorite: {
    alignItems: 'flex-end',
    borderSolid: 2,
    marginRight: 2,
  },
});

export default React.memo(ModalFilterPet);
