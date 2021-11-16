import React from 'react';
import {Text} from 'react-native-elements';
import {COLORS} from '../../assets/colors';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';

const Pets = ({navigation}) => {
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
