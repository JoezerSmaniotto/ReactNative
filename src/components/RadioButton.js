import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-elements';

// import {COLORS} from '../assets/colors';

export const RadioButtonView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  margin-rigth: 20px;
  padding-top: 10px;
`;

export const TextIcon = styled.Text`
  font-size: 18px;
  color: black;
`;

const RadioButton = ({label, selected, onClick}, onPress) => {
  const {theme} = useTheme();
  return (
    <RadioButtonView onPress={() => onClick(label)}>
      {selected ? (
        <Icon
          name="radio-button-on-outline"
          size={18}
          color={theme.colors.primary}>
          <TextIcon>{label}</TextIcon>
        </Icon>
      ) : (
        <Icon
          name="radio-button-off-outline"
          size={18}
          color={theme.colors.black}>
          <TextIcon>{label}</TextIcon>
        </Icon>
      )}
    </RadioButtonView>
  );
};
export default RadioButton;
