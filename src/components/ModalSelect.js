import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  Overlay,
  Icon,
  Input,
  Tooltip,
  Text,
  useTheme,
} from 'react-native-elements';
import {ScrollView, View, StyleSheet, Alert} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RacaPetContext} from '../context/RacaPetProvider';
import RadioButton from './RadioButton';
const ModalSelect = ({
  title,
  visible,
  setVisible,
  id,
  children,
  tipoPet,
  racaDoPet,
  trocaRacaPet,
}) => {
  const {getRacaPets, saveRacaPets, racasList} = useContext(RacaPetContext);
  const [novaRacaPet, setNovaRacaPet] = useState('');
  const [disabledButtonNovaRacaPet, setdisabledButtonNovaRacaPet] =
    useState(false);
  const [racaSelecionadaPet, setRacaSelecionadaPet] = useState('');
  const [apresentaCriarNovaRaca, setApresentaCriarNovaRaca] = useState(false);
  const [racasFilterPet, setRacasFilterPet] = useState([]);
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
    if (racaDoPet.length > 0) {
      setRacaSelecionadaPet(racaDoPet);
    }
  }, [racaDoPet]);

  const toggleOverlay = () => {
    setNovaRacaPet('');
    setdisabledButtonNovaRacaPet(false);
    setApresentaCriarNovaRaca(false);
    setRacaSelecionadaPet('');
    setVisible(!visible);
  };

  const criarNovaRaca = async () => {
    if (novaRacaPet.length > 0) {
      setdisabledButtonNovaRacaPet(true);
      const newRaca = {
        nomeRaca: novaRacaPet,
        tipoPet: tipoPet,
      };
      await saveRacaPets(newRaca, () => {
        trocaRacaPet({raca: novaRacaPet});
        toggleOverlay();
      });
    } else {
      Alert.alert('Erro', 'Informe o nome da raça.');
    }
  };

  const racaEscolhidaSelect = val => {
    if (val !== 'Outra') {
      if (racaDoPet !== 'val') {
        setRacaSelecionadaPet(val);
        trocaRacaPet({raca: val});
      }
      toggleOverlay();
    } else {
      setApresentaCriarNovaRaca(true);
      setRacaSelecionadaPet(val);
    }
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={styles.container}>
        <View style={styles.viewButton}>
          <>
            {!apresentaCriarNovaRaca ? (
              <Text
                h4
                h4Style={{color: theme.colors.black}}
                containerStyle={{
                  width: '85%',
                  alignSelf: 'center',
                }}>
                Escolha a raça do Pet
              </Text>
            ) : (
              <Text
                h4
                h4Style={{color: theme.colors.black}}
                containerStyle={{
                  width: '85%',
                  alignSelf: 'center',
                }}>
                Cadastre uma raça!
              </Text>
            )}
          </>
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

        <View style={styles.viewInput}>
          {apresentaCriarNovaRaca && (
            <>
              <Input
                placeholder="Informe a raça"
                leftIcon={
                  <MaterialIcons name="create" color={'#f9ba08'} size={19} />
                }
                onChangeText={value => setNovaRacaPet(value)}
                value={novaRacaPet}
                containerStyle={{width: '85%'}}
              />
              <Button
                icon={<FontAwesome5 name="check" color={'#000'} size={19} />}
                onPress={() => criarNovaRaca()}
                type={'solid'}
                containerStyle={{alignSelf: 'center', marginBottom: 9}}
                // color="primary"
                disabled={disabledButtonNovaRacaPet}
              />
            </>
          )}
        </View>
        <View style={styles.select}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {/* horizontal={true} */}
            <>
              {racasFilterPet.length > 0 &&
                apresentaCriarNovaRaca === false &&
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
        {/* <RadioButton /> */}
        {children}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
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

export default ModalSelect;
