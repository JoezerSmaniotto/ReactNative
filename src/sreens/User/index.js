/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native-elements';
import {COLORS} from '../../assets/colors';
import {SafeAreaView, StyleSheet, ScrollView, View, Alert} from 'react-native';
import {UserContext} from '../../context/UserProvider';
import {AuthUserContext} from '../../context/AuthUserProvider';
import Loading from '../../components/Loading';
import MeuButton from '../../components/MeuButton';

import {Input} from 'react-native-elements';
import {CommonActions} from '@react-navigation/routers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = ({route, navigation}) => {
  const {getUser, userE, updateUser, deleteUser} = useContext(UserContext);
  const {signOut} = useContext(AuthUserContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const fetchData = async () => {
    await getUser();
  };

  const handlerSelfDestruct = () => {
    Alert.alert('ATENÇÃO', 'Tem certeza que deseja excluir a sua conta?', [
      {
        text: 'SIM',
        onPress: () => excluir(),
      },
      {
        text: 'NÃO',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };
  const handlerEdit = () => {
    Alert.alert('ATENÇÃO', 'Tem certeza que deseja editar a sua conta?', [
      {
        text: 'SIM',
        onPress: () => editar(),
      },
      {
        text: 'NÃO',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  const handlerExit = () => {
    Alert.alert('ATENÇÃO', 'Tem certeza que deseja sair do App?', [
      {
        text: 'SIM',
        onPress: () => signOut(),
      },
      {
        text: 'NÃO',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    if (userE) {
      setNome(userE.nome);
      setEmail(userE.email);
      setTel(userE.tel);
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
        tel: tel,
      };
      if (!disabled) {
        await updateUser(userUpdate);
      }
    }
    // setTimeout(() => {
    //   setLoading(false);
    //   setDisabled(true);
    // }, 400);
  };

  const excluir = async () => {
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
      <View style={styles.superior}>
        <Text h4>EDIÇÃO DO USUÁRIO</Text>
      </View>
      <View style={styles.conteudo}>
        <Input
          placeholder="Nome Completo"
          onChangeText={t => setNome(t)}
          keyboardType="default"
          leftIcon={{type: 'font-awesome', name: 'user'}}
          value={nome}
          disabled={disabled}
        />
        <Input
          placeholder="Email"
          onChangeText={t => setEmail(t)}
          keyboardType="email-address"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          value={email}
          disabled={true}
        />
        <Input
          placeholder="53-99999-9999"
          onChangeText={t => setTel(t)}
          keyboardType="numeric"
          leftIcon={{type: 'font-awesome', name: 'phone'}}
          value={tel}
          disabled={disabled}
        />

        <MeuButton
          texto={disabled ? 'Editar' : 'Salvar'}
          onClick={() => (disabled ? handlerEdit() : setDisabled(!disabled))}
        />

        <MeuButton texto="Excluir Conta" onClick={handlerSelfDestruct} />

        <MeuButton texto="Sair" onClick={() => handlerExit()} />
      </View>

      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },

  superior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#e5e5e5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 8,
    paddingLeft: 8,
    paddingTop: 13,
    paddingBottom: 13,
  },

  conteudo: {
    paddingTop: 20,
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
