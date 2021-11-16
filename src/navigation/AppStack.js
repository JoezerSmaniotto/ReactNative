import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../sreens/Home';
import Preload from '../sreens/Preload';
import Pets from '../sreens/Pets';
import User from '../sreens/User';
import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Preload">
      {/*name =Nome Que quero q página apareça Na parte superior da tela
          component=Nome do component da página a ser importado */}
      <Stack.Screen name="Preload" component={Preload} options={preloadStyle} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Pets" component={Pets} options={petsStyle} />
      <Stack.Screen name="User" component={User} options={userStyle} />
    </Stack.Navigator>
  );
}

export default AppStack;

const preloadStyle = {
  headerShown: false, // APAGA A BARRA DE AÇÕES DE CIMA
};

const petsStyle = {
  title: 'Pets',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.black}, //Estilda seta <-
};

const userStyle = {
  title: 'Usuário',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.black}, //Estilda seta <-
};
