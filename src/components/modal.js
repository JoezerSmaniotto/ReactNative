import React, {useState, useEffect} from 'react';
import {Button, Overlay, Icon} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';

const Modal = ({title, visible, setVisible, id, children}) => {
  //   const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      fullScreen={true}>
      <Text style={styles.textSecondary}>{title}</Text>
      {children}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'red!important',
  // },
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default Modal;
