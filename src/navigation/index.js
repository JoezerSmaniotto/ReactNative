import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {ApiProvider} from '../context/ApiProvider';
import {UserProvider} from '../context/UserProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <SafeAreaProvider>
      <AuthUserProvider>
        <ApiProvider>
          <UserProvider>
            <Routes />
          </UserProvider>
        </ApiProvider>
      </AuthUserProvider>
    </SafeAreaProvider>
  );
}
