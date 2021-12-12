/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState, useCallback} from 'react';
import {Text} from 'react-native-elements';
import {COLORS} from '../../assets/colors';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import {UserContext} from '../../context/UserProvider';
import {AuthUserContext} from '../../context/AuthUserProvider';
import auth from '@react-native-firebase/auth';
import MeuButton from '../../components/MeuButton';

import {Input} from 'react-native-elements';
import {CommonActions} from '@react-navigation/routers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = ({route, navigation}) => {
  const {getUser, userE, updateUser, deleteUser} = useContext(UserContext);
  const {signOut} = useContext(AuthUserContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [disabled, setDisabled] = useState(true);

  const fetchData = async () => {
    await getUser();
  };

  useEffect(() => {
    if (userE) {
      // console.log('############# E F E C T ##################');
      // console.log('-----------User--------: ', userE);
      setNome(userE.nome);
      setEmail(userE.email);
    }
  }, [userE]);

  useEffect(() => {
    fetchData();
  }, []);

  const editar = async () => {
    setDisabled(!disabled);
    if (userE.nome !== nome) {
      let userUpdate = {
        uid: userE.uid,
        nome: nome,
        email: userE.email,
      };
      if (!disabled) {
        await updateUser(userUpdate);
      }
    }
  };

  // const editar = useCallback(async () => {
  //   // console.log('-- -- -- EDITAR -- -- --');
  //   // console.log('NOME => ', nome);
  //   // console.log('email => ', email);
  //   // console.log('----------');
  //   setDisabled(!disabled);
  //   if (userE.nome !== nome) {
  //     let userUpdate = {
  //       uid: userE.uid,
  //       nome: nome,
  //       email: userE.email,
  //     };
  //     if (!disabled) {
  //       await updateUser(userUpdate);
  //     }
  //   }
  // }, [disabled, nome, email]);

  const excluir = async () => {
    console.log('-- -- -- Exlcuir Conta -- -- --');
    await deleteUser(userE.uid);
    AsyncStorage.removeItem('user'); // deleta na cache
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.superior}>
          <Text h2>Edição Usuário</Text>
          <Input
            // label="Nome Completo"
            placeholder="Nome Completo"
            onChangeText={t => setNome(t)}
            keyboardType="default"
            leftIcon={{type: 'font-awesome', name: 'user'}}
            value={nome}
            disabled={disabled}

            // style={styles.input}
            // returnKeyType="next"
            // onEndEditing={() => this.emailTextInput.focus()}
          />

          <Input
            // ref={ref => {
            //   this.emailTextInput = ref;
            // }}
            // label="Email"
            placeholder="Email"
            onChangeText={t => setEmail(t)}
            keyboardType="email-address"
            leftIcon={{type: 'font-awesome', name: 'envelope'}}
            value={email}
            // disabled={true}
            // style={styles.input}
            // returnKeyType="next"
            // onEndEditing={() => this.passTextInput.focus()}
          />
          {/* <Input
            // ref={ref => {
            //   this.passTextInput = ref; // recebe a referencia
            // }}
            // label="Senha"
            placeholder="Senha"
            onChangeText={t => setPass(t)}
            keyboardType="default"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            value={pass}
            // style={styles.input}
            // returnKeyType="next"
            // onEndEditing={() => this.confirPassTextInput.focus()}
          /> */}

          <MeuButton texto={disabled ? 'Editar' : 'Salvar'} onClick={editar} />

          <MeuButton texto="Excluir Conta" onClick={excluir} />

          <MeuButton texto="SAIR" onClick={() => signOut()} />
        </View>
      </ScrollView>
      {/* {loading && <Loading />} */}
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 20,
    backgroundColor: COLORS.white,
  },

  superior: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 2,

    // boxShadow:
    // '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
  },

  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
});
