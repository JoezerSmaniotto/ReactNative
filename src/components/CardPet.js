import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Text, Card, Button, Icon} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CardPet = ({deletePet, dados, open}) => {
  return (
    <Card>
      <Card.Title>{dados.nome}</Card.Title>
      <Card.Divider />
      <Card.Image
        style={{padding: 0}}
        source={{
          uri:
            dados.imagemPet !== ''
              ? dados.imagemPet
              : 'https://i0.statig.com.br/bancodeimagens/br/4j/48/br4j4845bvi3ygylo5wnhk84v.jpg',
        }}
      />
      <Text style={{marginBottom: 10, marginTop: 10}}>
        Nome: {dados.nome} Raça: {dados.raca}
      </Text>
      <Button
        icon={<FontAwesome5 name="edit" color={'#ffffff'} size={18} />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 8,
        }}
        title="Editar"
        onPress={() => {
          open();
        }}
      />
      <Button
        icon={<FontAwesome5 name="trash-alt" color={'#ffffff'} size={18} />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 8,
        }}
        title="Excluir"
        onPress={() => {
          deletePet();
        }}
      />
    </Card>
  );
};

export default CardPet;
