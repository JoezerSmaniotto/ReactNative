import React, {useEffect, useContext} from 'react';
import {Text} from 'react-native-elements';
import {COLORS} from '../../assets/colors';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {ApiContext} from '../../context/ApiProvider';

const Pets = ({navigation}) => {
  const {getApi} = useContext(ApiContext);

  useEffect(() => {
    getApi(); // Obtem o Objeto de acesso a API REST (Do Firebase)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <Text h1 style={styles.texto}>
        Pets
      </Text>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Pets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: COLORS.primary,
  },
});
