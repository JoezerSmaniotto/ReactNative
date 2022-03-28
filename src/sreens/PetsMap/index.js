import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {PetContext} from '../../context/PetProvider';

const MapStudentsTab = () => {
  const [mapType, setMatType] = useState('standard');
  const [markers, setMarkers] = useState([]);
  const {petsList} = useContext(PetContext);

  useEffect(() => {
    console.log('petsListEffects: ', petsList);
    let m = [];
    if (petsList.length > 0) {
      petsList.map((s, index) => {
        //console.log(s);
        m.push({
          key: index,
          coords: {
            latitude: Number(s.latitude),
            longitude: Number(s.longitude),
          },
          title: s.nome,
          description: s.raca,
          image: require('../../assets/images/person_map_accent.png'),
        });
      });
      console.log('M => ', m);
      setMarkers(m);
    }
  }, [petsList]);

  useEffect(() => {
    console.log('markers: ', markers);
  }, [markers]);

  return (
    <View style={styles.container}>
      {markers.length >= 1 && (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          ref={map => (this.map = map)}
          style={styles.map}
          mapType={mapType}
          showsUserLocation={true}
          followsUserLocation={true}
          onPress={e => {
            Alert.alert(
              'Coordenadas',
              'latitude= ' +
                e.nativeEvent.coordinate.latitude +
                ' longitude= ' +
                e.nativeEvent.coordinate.longitude,
            );
          }}
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
