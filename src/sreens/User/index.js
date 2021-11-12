import React from 'react';
import {Text} from 'react-native-elements';
import {COLORS} from '../../assets/colors';
import {SafeAreaView, ScrollView, StyleSheet, Button} from 'react-native';

const User = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <Text h1 style={styles.texto}>
        User
      </Text>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default User;

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
