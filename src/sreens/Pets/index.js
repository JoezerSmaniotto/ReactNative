import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet, Alert} from 'react-native';
import {Input, Image, Text, Button, useTheme} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardPetList from '../../components/CardPetList';
import Loading from '../../components/Loading';

const Pets = ({navigation}) => {
  const {theme} = useTheme();
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.divSuperior}>
        <Text h3 h3Style={{color: theme.colors.black}}>
          Encontre Pets
        </Text>
        <Button
          icon={
            <MaterialIcons
              name="search"
              color={theme.colors.primary}
              size={35}
              onPress={() => {
                Alert.alert('Oi', 'Teste');
              }}
            />
          }
          type={'solid'}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttoncontainerStyle}
        />
      </View>
      <ScrollView>
        <View style={styles.divInferior}>
          <CardPetList />
        </View>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};
export default Pets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    zIndex: 0,
  },
  divSuperior: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBotton: 10,
    zIndex: 10,
  },
  buttonStyle: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-end',
    padding: 10,
  },

  buttoncontainerStyle: {
    marginLeft: 20,
  },

  cardPet: {
    width: '100%',
    height: 140,
    marginTop: 10,
    backgroundColor: '#e5e5e5',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardPetImg: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  cardPetInfo: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPetInfoDetails: {
    flex: 1,
  },
  cardPetInfoActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonActionCard: {
    backgroundColor: '#e5e5e5',
    alignSelf: 'flex-end',
    padding: 10,
  },
});
