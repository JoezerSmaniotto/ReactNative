import React from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';
import {COLORS} from '../assets/colors';

function MeuButton(props) {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => props.onClick()}
      underlayColor="#e5e5e5">
      <Text style={styles.text}>{props.texto}</Text>
    </TouchableHighlight>
  );
}

export default MeuButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: COLORS.black,
  },
  button: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
