import React, {useState, useEffect} from 'react';
import {Button, Overlay, Icon} from 'react-native-elements';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

export const Picture = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 20px;
`;
export const ViewMarker = styled.TouchableHighlight`
  width: 70px;
  height: 70px;
  border-radius: 20px;
`;

//-----

const ModalMapa = ({
  title,
  visible,
  setVisible,
  updateLocalizacao,
  coordenadasRecebidas,
}) => {
  const [mapType, setMatType] = useState('standard');
  const [markers, setMarkers] = useState([]);

  const toggleOverlay = () => {
    setMarkers([]);
    setVisible(!visible);
  };

  const showToast = message => {
    toggleOverlay();
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (
        coordenadasRecebidas.latitude !== '' &&
        coordenadasRecebidas.latitude !== null
      ) {
        let m = [];
        m.push({
          key: 'trtrw2455445gfg676',
          coords: {
            latitude: Number(coordenadasRecebidas.latitude), //dados.latitude
            longitude: Number(coordenadasRecebidas.longitude), //dados.latitude
          },
          title: coordenadasRecebidas.nome, // dados.nome
          description: coordenadasRecebidas.raca, ////../../assets/images/person_map_accent.png'
          image:
            coordenadasRecebidas.img !== ''
              ? coordenadasRecebidas.img
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXusGK_JYWv_WvhPl9PAVKb7g71ny6lRMiA&usqp=CAUss',
        });
        setMarkers(m);
      }
    }

    return () => {
      // when component unmounts, set isMounted to false
      setMarkers([]);
      isMounted = false;
    };
  }, [coordenadasRecebidas]);

  const updateLocation = val => {
    updateLocalizacao({
      latitude: Number(val.nativeEvent.coordinate.latitude),
      longitude: Number(val.nativeEvent.coordinate.longitude),
    });
    showToast('Local definido com sucesso!');
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
              latitude:
                markers[0].coords.latitude !== ''
                  ? markers[0].coords.latitude
                  : -31.766108372781073,
              longitude:
                markers[0].coords.longitude !== ''
                  ? markers[0].coords.longitude
                  : -52.35215652734042,
              latitudeDelta: 0.015, //baseado na documentação
              longitudeDelta: 0.0121, //baseado na documentação
            }}>
            {markers.map(marker => {
              return (
                <Marker
                  key={'trtrw2455445gfg676'}
                  coordinate={marker.coords}
                  title={marker.title}
                  description={marker.description}
                  draggable
                  // image={marker.image}
                >
                  <ViewMarker>
                    <Picture
                      source={{
                        uri: marker.image,
                      }}
                      style={{width: 50, height: 50, borderRadius: 10}}
                    />
                  </ViewMarker>
                </Marker>
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

export default React.memo(ModalMapa);
