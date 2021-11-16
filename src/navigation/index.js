import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthUserProvider} from '../context/AuthUserProvider';
import Routes from './Routes';

export default function Providers() {
  console.log(AuthUserProvider);

  return (
    <SafeAreaProvider>
      <AuthUserProvider>
        <Routes />
      </AuthUserProvider>
    </SafeAreaProvider>
  );
}
