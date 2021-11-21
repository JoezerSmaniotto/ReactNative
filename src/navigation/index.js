import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {ApiProvider} from '../context/ApiProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <SafeAreaProvider>
      <AuthUserProvider>
        <ApiProvider>
          <Routes />
        </ApiProvider>
      </AuthUserProvider>
    </SafeAreaProvider>
  );
}
