import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/sreens/Home';
import SignIn from './src/sreens/SignIn';
import SignUp from './src/sreens/SignUp';
import ForgotPassWord from './src/sreens/ForgotPassWord';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.primaryDark} />
        <Stack.Navigator initialRouteName="SignIn">
          {/*name =Nome Que quero q página apareça Na parte superior da tela
          component=Nome do component da página a ser importado */}
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={signInStyle}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
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
  headerLet: false,
  title: 'Bem vindo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.black},
};

const forgotPassWordStyle = {
  title: 'Recuperação Senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};
