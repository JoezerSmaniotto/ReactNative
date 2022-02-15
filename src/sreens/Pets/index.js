import React, {useState, useEffect, useCallback, useContext} from 'react';
import {Text} from 'react-native-elements';
import {COLORS} from '../../assets/colors';
import {SafeAreaView, StyleSheet, Alert, ScrollView} from 'react-native';
import {ApiContext} from '../../context/ApiProvider';
import {View} from 'react-native';
import {FAB, Input, Button} from 'react-native-elements';
import Modal from '../../components/modal';
import {UserContext} from '../../context/UserProvider';
import {AuthUserContext} from '../../context/AuthUserProvider';

const Pets = ({navigation}) => {
  const {getApi} = useContext(ApiContext);
  const [visible, setVisible] = useState(false);
  const [dadosPet, setDadosPet] = useState('');
  const {getUser, userE, updateUser, deleteUser} = useContext(UserContext);

  useEffect(() => {
    getApi(); // Obtem o Objeto de acesso a API REST (Do Firebase)
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    await getUser();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onchangeDados = novosDados => {
    setDadosPet(prevState => ({
      ...prevState,
      ...novosDados,
    }));
  };

  const sendDados = useCallback(async () => {
    let pets = userE?.pets?.length > 0 ? [...userE?.pets] : [];
    if (pets?.length === 0) {
      pets.push(dadosPet);
      console.log('-- pets: ', pets);
      let user = {...userE, pets: [...pets]};
      console.log('userE: => ', userE);
      console.log('userPet: ', user);
      await updateUser(user);
    }
  }, [userE, dadosPet, updateUser]);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={{flex: 1}}> */}
      <View style={styles.divSuperior}>
        <Text h1 style={styles.texto}>
          Pets
        </Text>

        {/* </ScrollView> */}
        <FAB
          visible={true}
          icon={{name: 'add', color: 'white'}}
          color={COLORS.primary}
          style={{position: 'absolute', bottom: 8, right: 8}}
          onPress={() => {
            setVisible(true);
          }}
        />

        <Modal
          title={'Crição/Edição'}
          visible={visible}
          setVisible={setVisible}>
          <Input
            label="Nome"
            // placeholder="teste@gmail.com"
            onChangeText={e => onchangeDados({nome: e})}
            keyboardType="default"
            value={dadosPet.nome}
            style={{width: '100%'}}
            // leftIcon={{type: 'font-awesome', name: 'envelope'}}
            // returnKeyType="next"
            // onEndEditing={() => this.passTextInput.focus()}
          />
          <Input
            label="Raça"
            // placeholder="teste@gmail.com"
            onChangeText={e => onchangeDados({raca: e})}
            keyboardType="default"
            value={dadosPet.raca}
            // leftIcon={{type: 'font-awesome', name: 'envelope'}}
            // returnKeyType="next"
            // onEndEditing={() => this.passTextInput.focus()}
          />
          <Button
            title="Salvar"
            onPress={sendDados}
            buttonStyle={styles.button}
          />
          <Button
            title="Cancelar"
            onPress={() => {
              setVisible(false);
            }}
            buttonStyle={styles.button}
          />
        </Modal>
      </View>

      {/* </ScrollView > */}
    </SafeAreaView>
  );
};

export default Pets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  divSuperior: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'blue',
  },
  texto: {
    color: COLORS.primary,
  },
  button: {
    margin: 5,
  },
});
