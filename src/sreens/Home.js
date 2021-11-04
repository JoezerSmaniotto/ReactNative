import React, {useEffect} from 'react';
import {Text} from 'react-native-elements';
import {COLORS} from '../assets/colors';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import LogoutButton from '../components/LogoutButton';

const Home = props => {
  useEffect(({navigation}) => {
    navigation.setOptions({
      headerLeft: false,
      title: 'Usuários',
      headerStyle: {
        backgroundColor: COLORS.white,
      },
      headerTitleStyle: {color: COLORS.white},
      headerRight: () => {
        <LogoutButton />;
      },
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text h1 style={styles.texto}>
          HOME
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
