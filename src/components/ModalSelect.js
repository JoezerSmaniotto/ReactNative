import React, {useState, useEffect, useContext} from 'react';
import {Button, Overlay, Icon, Input} from 'react-native-elements';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RacaPetContext} from '../context/RacaPetProvider';

import RadioButton from './RadioButton';
const ModalSelect = ({title, visible, setVisible, id, children, tipoPet}) => {
  const {getRacaPets, saveRacaPets} = useContext(RacaPetContext);
  const [racaPet, setRacaPet] = useState('');
  const [novaRacaPet, setNovaRacaPet] = useState('');

  // useEffect(() => {
  //   getRacaPets();
  //   // eslint-disable-next-line
  // }, []);

  const toggleOverlay = () => {
    // alert('oiii');
    setVisible(!visible);
  };

  const criarNovaRaca = async () => {
    console.log('***** CRIAR NOVA RAÇA *****');
    const newRaca = {
      nomeRaca: novaRacaPet,
      tipoPet: tipoPet,
    };
    await saveRacaPets(newRaca, toggleOverlay);
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
            type={'clear'}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
          />
        </View>
        <ScrollView style={{width: '100%'}}>
          {/* esta view aqui professor */}
          {/* <View style={styles.viewInput}>
            <Input
              placeholder="Encontre a raça"
              leftIcon={<Fontisto name="search" color={'#f9ba08'} size={17} />}
              onChangeText={value => setRacaPet(value)}
              value={racaPet}
              // inputContainessrStyle, containerStyle
              containerStyle={{width: '85%'}}
            />
            <Button
              icon={
                <MaterialIcons
                  name="create"
                  color={'#000'}
                  size={19}
                  onPress={() => toggleOverlay()}
                />
              }
              type={'solid'}
              containerStyle={{alignSelf: 'center', marginBottom: 9}}
              color="primary"
            />
          </View> */}

          <View style={styles.viewInput}>
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
              icon={
                <FontAwesome5
                  name="check"
                  color={'#000'}
                  size={19}
                  onPress={() => criarNovaRaca()}
                />
              }
              type={'solid'}
              containerStyle={{alignSelf: 'center', marginBottom: 9}}
              color="primary"
            />
          </View>

          <View style={styles.select}>
            {/* <Button
              icon={
                <MaterialIcons
                  name="create"
                  color={'#000'}
                  size={20}
                  onPress={() => toggleOverlay()}
                />
              }
              type={'clear'}
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.containerStyle}
            />
            <Input
              placeholder="Encontre a raça"
              leftIcon={<Fontisto name="search" color={'#f9ba08'} size={17} />}
              onChangeText={value => setRacaPet(value)}
              value={racaPet}
              // inputContainessrStyle, containerStyle
            /> */}
          </View>
        </ScrollView>
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
