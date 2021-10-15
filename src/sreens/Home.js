import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MeuButton from '../components/MeuButton';

// import { Container } from './styles';

const Home = props => {
  const [contador, setContado] = useState(0);
  console.log(props);
  // 1. Montagem do Component.
  // useEffect(() => {
  //   console.log('Montou o Componente');
  // }, []);

  // 2. A cada atualização do component, se alterar um state dento dele, qualquer coisa.
  // useEffect(() => {
  //   console.log('Fez update Componente');
  // });

  // 3. A cada atualização do que estiver dentro do array dependencias sera atualizado, renderizado.
  // useEffect(() => {
  //   console.log('Fez update baseado em contador');
  // }, [contador]);

  const contar = () => {
    setContado(contador + 1);
  };

  const reset = () => {
    setContado(0);
  };

  return (
    <View>
      <Text style={styles.texto}>Olá, mundo!</Text>
      <Text style={styles.texto}>Contador = {contador}</Text>
      <MeuButton texto="Contar" onClick={contar} />
      <MeuButton texto="Reset" onClick={reset} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
  },
});
