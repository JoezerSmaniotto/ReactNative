import React, {useState} from 'react';
import {createContext} from 'react';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({chidren}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthUserContext.Provider value={{user, setUser}}>
      {chidren}
    </AuthUserContext.Provider>
  );
};
