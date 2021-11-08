import React from 'react';
import {Text, StyleSheet, TouchableHighlight, View} from 'react-native';
import {COLORS} from '../assets/colors';
import {Button} from 'react-native-elements';
function MeuButton(props) {
  return (
    // <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
    //   <Text style={styles.text}>{props.texto}</Text>
    // </TouchableHighlight>
    <View style={styles.button}>
      <Button
        title={props.texto}
        type={
          props.texto !== null || props.texto !== undefined ? props.texto : ''
        }
        buttonStyle={{backgroundColor: 'trasparent'}}
        onPress={() => props.onClick()}
        titleStyle={styles.text}
      />
    </View>
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
