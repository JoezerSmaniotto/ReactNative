/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native-elements';
import {COLORS} from '../../assets/colors';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import {UserContext} from '../../context/UserProvider';
import auth from '@react-native-firebase/auth';
import MeuButton from '../../components/MeuButton';
import {Input} from 'react-native-elements';

const User = ({route, navigation}) => {
  const {getUser, userE} = useContext(UserContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const fetchData = async () => {
    await getUser();
  };

  useEffect(() => {
    fetchData();
    if (userE) {
      console.log('-----------User--------: ', userE);
    }
  }, [userE, fetchData]);

  const editar = () => {
    console.log('-- -- -- EDITAR -- -- --');
  };

  const excluir = () => {
    console.log('-- -- -- Exlcuir Conta -- -- --');
  };

  // useEffect(() => {
  //   console.log('User: ', userE);
  // }, [userE]);

  // useEffect(() => {
  //   console.log('userLogado:', auth()?.currentUser?.uid);
  // }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text h2 style={styles.text}>
            Edição Usuário
          </Text>
          <Input
            // label="Nome Completo"
            placeholder="Nome Completo"
            onChangeText={t => setNome(t)}
            keyboardType="default"
            leftIcon={{type: 'font-awesome', name: 'user'}}
            value={nome}
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
            // style={styles.input}
            // returnKeyType="next"
            // onEndEditing={() => this.passTextInput.focus()}
          />
          <Input
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
          />

          <MeuButton texto="Editar" onClick={editar} />

          <MeuButton texto="Excluir Conta" onClick={excluir} />
        </View>
      </ScrollView>
      {/* {loading && <Loading />} */}
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },

  text: {
    justifyContent: 'center',
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
