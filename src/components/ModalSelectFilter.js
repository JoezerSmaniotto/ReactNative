import React, {useState, useEffect, useContext} from 'react';
import {Button, Overlay, Input, Text, useTheme} from 'react-native-elements';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RacaPetContext} from '../context/RacaPetProvider';
import RadioButton from './RadioButton';

const ModalSelectFilter = ({visible, setVisible, tipoPet, setaRaca, raca}) => {
  const {getRacaPets, saveRacaPets, racasList} = useContext(RacaPetContext);
  const [racaSelecionadaPet, setRacaSelecionadaPet] = useState('');
  const [racasFilterPet, setRacasFilterPet] = useState([]);
  const [disabledButtonNovaRacaPet, setdisabledButtonNovaRacaPet] =
    useState(false);
  const {theme} = useTheme();

  useEffect(() => {
    getRacaPets();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (racasList.length > 0 && (tipoPet === 1 || tipoPet === 0)) {
      const petFiltradoTipo = racasList.filter(racaPet => {
        return racaPet.tipoPet === tipoPet;
      });
      setRacasFilterPet(petFiltradoTipo);
    }
  }, [tipoPet, racasList]);

  useEffect(() => {
    if (raca.length > 0) {
      setRacaSelecionadaPet(raca);
    }
  }, [raca]);

  const toggleOverlay = () => {
    setdisabledButtonNovaRacaPet(false);
    setRacaSelecionadaPet('');
    setVisible(!visible);
  };

  const racaEscolhidaSelect = val => {
    if (val !== 'Outra') {
      setRacaSelecionadaPet(val);
      setaRaca({raca: val});
      toggleOverlay();
    }
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={styles.container}>
        <View style={styles.viewButton}>
          <Text
            h4
            h4Style={{color: theme.colors.black}}
            containerStyle={{
              width: '85%',
              alignSelf: 'center',
            }}>
            Escolha a raça do Pet
          </Text>

          <Button
            icon={
              <Fontisto
                name="close"
                color={{color: theme.colors.black}}
                size={23}
                onPress={() => toggleOverlay()}
              />
            }
            type={'solid'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
          />
        </View>
        <View style={styles.select}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {/* horizontal={true} */}
            <>
              {racasFilterPet.length > 0 &&
                racasFilterPet.map((raca, index) => {
                  return (
                    <RadioButton
                      key={`${index}${raca.uid}`}
                      label={`${raca.nomeRacaPet}`}
                      selected={
                        raca.nomeRacaPet === racaSelecionadaPet ? true : false
                      }
                      onClick={racaEscolhidaSelect}
                    />
                  );
                })}
            </>
          </ScrollView>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
  select: {
    width: '100%',
    height: 250,
  },

  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default React.memo(ModalSelectFilter);
