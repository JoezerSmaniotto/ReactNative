import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Home from './src/sreens/Home';
import SignIn from './src/sreens/SignIn';
import SignUp from './src/sreens/SignUp';
import ForgotPassWord from './src/sreens/ForgotPassWord';
import Preload from './src/sreens/Preload';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/colors';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.primaryDark} />
        <Stack.Navigator initialRouteName="Preload">
          {/*name =Nome Que quero q página apareça Na parte superior da tela
          component=Nome do component da página a ser importado */}
          <Stack.Screen
            name="Preload"
            component={Preload}
            options={preloadStyle}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={signInStyle}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={signUpStyle}
          />
          <Stack.Screen
            name="ForgotPassWord"
            component={ForgotPassWord}
            options={forgotPassWordStyle}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

const signInStyle = {
  headerLet: false, // Não aparece a seta de votar <-
  title: 'Bem vindo', // Titulo da página
  headerStyle: {backgroundColor: COLORS.primary}, // Estilo do header do menu
  headerTitleStyle: {color: COLORS.black}, // Estilda do titulo
};

const forgotPassWordStyle = {
  title: 'Recuperação Senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white, //Estilda seta <-
};

const signUpStyle = {
  title: 'Cadastre-se',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.black}, //Estilda seta <-
};

const preloadStyle = {
  headerShown: false, // APAGA A BARRA DE AÇÕES DE CIMA
};
