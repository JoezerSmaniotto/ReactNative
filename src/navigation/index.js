import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {ApiProvider} from '../context/ApiProvider';
import {UserProvider} from '../context/UserProvider';
import {ApiAuthProvider} from '../context/ApiAuthProvider';
import {PetProvider} from '../context/PetProvider';
import {RacaPetProvider} from '../context/RacaPetProvider';
import Routes from './Routes';

export default function Providers() {
  return (
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
  );
}
