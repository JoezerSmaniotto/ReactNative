import React, {useState, useEffect} from 'react';
import {Button, Overlay, Icon} from 'react-native-elements';
import {View, Text, Alert, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const ModalMapa = ({
  title,
  visible,
  setVisible,
  id,
  updateLocalizacao,
  coordenadasRecebidas,
}) => {
  //   const [visible, setVisible] = useState(false);
  const [mapType, setMatType] = useState('standard');
  const [markers, setMarkers] = useState([]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    console.log('coordenadasRecebidas: ', coordenadasRecebidas);
  }, [coordenadasRecebidas]);

  useEffect(() => {
    console.log('markers: ', markers);
  }, [markers]);

  useEffect(() => {
    if (
      coordenadasRecebidas.latitude !== '' &&
      coordenadasRecebidas.latitude !== null
    ) {
      let m = [];
      m.push({
        key: 'trtrw2455445gfg676',
        coords: {
          latitude: Number(coordenadasRecebidas.latitude), //dados.latitude
          longitude: Number(coordenadasRecebidas.latitude), //dados.latitude
        },
        title: coordenadasRecebidas.nome, // dados.nome
        description: coordenadasRecebidas.raca, ////../../assets/images/person_map_accent.png'
        image: require('../assets/images/person_map_accent.png'),
      });
      setMarkers(m);
    }
  }, [coordenadasRecebidas]);

  const updateLocation = val => {
    updateLocalizacao({
      latitude: Number(val.nativeEvent.coordinate.latitude),
      longitude: Number(val.nativeEvent.coordinate.longitude),
    });
    Alert.alert(
      'Coordenadas',
      'latitude= ' +
        val.nativeEvent.coordinate.latitude +
        ' longitude= ' +
        val.nativeEvent.coordinate.longitude,
    );
    toggleOverlay();
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      fullScreen={true}>
      <View style={styles.containerMap}>
        {markers.length > 0 ? (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            // ref={map => (this.map = map)}
            style={styles.map}
            mapType={mapType}
            showsUserLocation={true}
            followsUserLocation={true}
            onPress={updateLocation}
            initialRegion={{
              //região onde deve focar o mapa na inicialização
              latitude: -31.766108372781073,
              longitude: -52.35215652734042,
              latitudeDelta: 0.015, //baseado na documentação
              longitudeDelta: 0.0121, //baseado na documentação
            }}>
            {markers.map(marker => {
              return (
                <Marker
                  key={marker.key}
                  coordinate={marker.coords}
                  title={marker.title}
                  description={marker.description}
                  draggable
                  image={marker.image}
                />
              );
            })}
          </MapView>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            // ref={map => (this.map = map)}
            style={styles.map}
            mapType={mapType}
            showsUserLocation={true}
            followsUserLocation={true}
            onPress={updateLocation}
            initialRegion={{
              //região onde deve focar o mapa na inicialização
              latitude: -31.766108372781073,
              longitude: -52.35215652734042,
              latitudeDelta: 0.015, //baseado na documentação
              longitudeDelta: 0.0121, //baseado na documentação
            }}
          />
        )}
      </View>
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
    fontSize: 25,
  },
  containerMap: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ModalMapa;
