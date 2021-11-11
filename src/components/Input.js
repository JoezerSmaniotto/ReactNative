import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

export default Input = ({
  label,
  placeholder,
  leftIcon,
  keyboardType,
  ...props
}) => {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      keyboardType={keyboardType}
      leftIcon={leftIcon}
      {...props}
    />
  );
};
