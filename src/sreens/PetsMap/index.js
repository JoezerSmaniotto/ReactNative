/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styled from 'styled-components/native';

import {PetContext} from '../../context/PetProvider';

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

const MapStudentsTab = () => {
  const [mapType, setMatType] = useState('standard');
  const [markers, setMarkers] = useState([]);
  const {petsList} = useContext(PetContext);

  useEffect(() => {
    let m = [];
    if (petsList.length > 0) {
      petsList.map((s, index) => {
        m.push({
          key: index,
          coords: {
            latitude: Number(s.latitude),
            longitude: Number(s.longitude),
          },
          title: s.nome,
          description: s.raca,
          image: s.imagemPet, //require('../../assets/images/person_map_accent.png'),
        });
      });
      setMarkers(m);
    }
  }, [petsList]);

  return (
    <View style={styles.container}>
      {markers.length >= 1 && (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          // ref={map => (this.map = map)}
          style={styles.map}
          mapType={mapType}
          showsUserLocation={true}
          followsUserLocation={true}
          // onPress={e => {
          //   Alert.alert(
          //     'Coordenadas',
          //     'latitude= ' +
          //       e.nativeEvent.coordinate.latitude +
          //       ' longitude= ' +
          //       e.nativeEvent.coordinate.longitude,
          //   );
          // }}
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
      )}
    </View>
  );
};
export default MapStudentsTab;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
