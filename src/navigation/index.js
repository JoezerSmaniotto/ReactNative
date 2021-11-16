import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}
