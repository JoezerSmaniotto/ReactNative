import React, {useLayoutEffect} from 'react';
import {Text} from 'react-native-elements';
import {COLORS} from '../../assets/colors';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import {Button} from 'react-native';

const Home = ({navigation}) => {
  useLayoutEffect(() => {
    // Personalização da barra de status
    /* Setando os OPTIONS  que passo de default na APP, aqui como irei passar component
    fiz o Options aqui */
    navigation.setOptions({
      // headerLeft: false,
      title: 'Usuários',
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTitleStyle: {color: COLORS.white},
      headerRight: () => <LogoutButton />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
