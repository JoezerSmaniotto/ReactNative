import React from 'react';
import {Button, colors, ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {ApiProvider} from '../context/ApiProvider';
import {UserProvider} from '../context/UserProvider';
import {ApiAuthProvider} from '../context/ApiAuthProvider';
import {PetProvider} from '../context/PetProvider';
import {RacaPetProvider} from '../context/RacaPetProvider';
import Routes from './Routes';

const theme = {
  colors: {
    primary: '#EEB310',
    secondary: '#202121',
    white: '#F5F5F5',
    black: '#202121',
    // grey0,
    // grey1,
    // grey2,
    // grey3,
    // grey4,
    // grey5,
    // greyOutline,
    // searchBg,
    // success,
    // error,
    // warning,
    // divider,
    platform: {
      ios: {
        primary: '#EEB310',
        secondary: '#202121',
        // grey,
        // searchBg,
        // success,
        // error,
        // warning,
      },
      android: {
        // Same as ios
      },
      web: {
        // Same as ios
      },
    },
    components: {
      Button: {
        raised: true,
        color: 'red',
      },
    },
  },
};

export default function Providers() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <ApiProvider>
          <ApiAuthProvider>
            <AuthUserProvider>
              <UserProvider>
                <RacaPetProvider>
                  <PetProvider>
                    <Routes />
                  </PetProvider>
                </RacaPetProvider>
              </UserProvider>
            </AuthUserProvider>
          </ApiAuthProvider>
        </ApiProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
