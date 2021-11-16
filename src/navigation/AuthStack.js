import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import Home from './src/sreens/Home';
import SignIn from '../sreens/SignIn';
import SignUp from '../sreens/SignUp';
import ForgotPassWord from '../sreens/ForgotPassWord';
import {COLORS} from '../assets/colors';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      {/*name =Nome Que quero q página apareça Na parte superior da tela
          component=Nome do component da página a ser importado */}
      <Stack.Screen name="SignIn" component={SignIn} options={signInStyle} />

      <Stack.Screen name="SignUp" component={SignUp} options={signUpStyle} />
      <Stack.Screen
        name="ForgotPassWord"
        s
        component={ForgotPassWord}
        options={forgotPassWordStyle}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;

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
