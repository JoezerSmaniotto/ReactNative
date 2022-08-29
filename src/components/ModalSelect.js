import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  Overlay,
  Icon,
  Input,
  Tooltip,
  Text,
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
  const [racaPet, setRacaPet] = useState('');
  const [novaRacaPet, setNovaRacaPet] = useState('');
  const [disabledButaoNovaRacaPet, setdisabledButaoNovaRacaPet] =
    useState(false);
  const [controleShowFristView, setControleShowFristView] = useState(false);
  const [racaSelecionadaPet, setRacaSelecionadaPet] = useState('');
  const [apresentBotaoCriarNovaRaca, setApresentBotaoCriarNovaRaca] =
    useState(false);

  useEffect(() => {
    getRacaPets();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log('racasList: ', racasList);
  // }, [racasList]);

  useEffect(() => {
    if (racaDoPet.length > 0) {
      setRacaSelecionadaPet(racaDoPet);
    }
  }, [racaDoPet]);

  const toggleOverlay = () => {
    setRacaPet('');
    setNovaRacaPet('');
    setdisabledButaoNovaRacaPet(false);
    setControleShowFristView(false);
    setApresentBotaoCriarNovaRaca(false);
    setRacaSelecionadaPet('');
    setVisible(!visible);
  };

  const criarNovaRaca = async () => {
    if (novaRacaPet.length > 0) {
      setdisabledButaoNovaRacaPet(true);
      const newRaca = {
        nomeRaca: novaRacaPet,
        tipoPet: tipoPet,
      };
      await saveRacaPets(newRaca, () => {
        trocaRacaPet({raca: novaRacaPet});
        toggleOverlay();
        // setVisible(!visible);
      });
    } else {
      Alert.alert('Erro', 'Informe o nome da raça.');
    }
  };

  const racaEscolhidaSelect = val => {
    console.log('Raça Escolhida: ', val);
    if (val !== 'Outra') {
      if (racaDoPet !== 'val') {
        setRacaSelecionadaPet(val);
        trocaRacaPet({raca: val});
      }
      toggleOverlay();
    } else {
      setRacaSelecionadaPet(val);
      setApresentBotaoCriarNovaRaca(true);
    }
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={styles.container}>
        <View style={styles.viewButton}>
          <Button
            icon={
              <Fontisto
                name="close"
                color={'#000'}
                size={23}
                onPress={() => toggleOverlay()}
              />
            }
            type={'solid'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}>
            Criar raça
          </Button>
        </View>

        <View style={styles.viewInput}>
          {!controleShowFristView ? (
            <>
              {apresentBotaoCriarNovaRaca ? (
                <>
                  <Text
                    h4
                    containerStyle={{
                      width: '85%',
                      // display: 'inline-block',
                      backgroundColor: 'red',
                      alignSelf: 'center',
                    }}>
                    Cadastre uma raça!
                  </Text>

                  <Button
                    icon={
                      <MaterialIcons name="create" color={'#000'} size={15} />
                    }
                    onPress={() => setControleShowFristView(true)}
                    type={'solid'}
                    size="sm"
                    containerStyle={{
                      marginLeft: 5,
                      alignSelf: 'center',
                    }}
                    titleStyle={{fontSize: 14}}
                    color="primary"
                    title={'Criar raça'}
                  />
                </>
              ) : (
                <>
                  <Text
                    h4
                    containerStyle={{
                      width: '85%',
                      // display: 'inline-block',
                      backgroundColor: 'red',
                      alignSelf: 'center',
                    }}>
                    Escolha a raça!
                  </Text>
                </>
              )}
            </>
          ) : (
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
                disabled={disabledButaoNovaRacaPet}
              />
            </>
          )}
        </View>
        <View style={styles.select}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {/* horizontal={true} */}
            <>
              {racasList.length > 0 &&
                apresentBotaoCriarNovaRaca === false &&
                racasList.map((raca, index) => {
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
    justifyContent: 'flex-end',
    alignItems: 'center',
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
