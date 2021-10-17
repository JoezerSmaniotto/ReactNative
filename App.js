import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/sreens/Home';
import SignIn from './src/sreens/SignIn';
import SignUp from './src/sreens/SignUp';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/colors';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator initialRouteName="SignIn">
        {/*name =Nome Que quero q página apareça Na parte superior da tela
          component=Nome do component da página a ser importado */}
        <Stack.Screen
          name="Bem vindo"
          component={SignIn}
          options={signInStyle}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const signInStyle = {
  headerLet: false,
  title: 'Bem vindo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
};
