import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../assets/colors';
import Pets from '../Pets';
import User from '../User';
import PetsMap from '../PetsMap';

const Tab = createBottomTabNavigator();
const Home = ({navigation}) => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Pets"
        component={Pets}
        options={{
          tabBarLabel: 'Pets',
          tabBarIcon: () => (
            <MaterialIcons name="pets" color={COLORS.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: () => (
            <Ionicons name="people" color={COLORS.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="PetsMap"
        component={PetsMap}
        options={{
          tabBarLabel: 'PetsMap',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="map-marker-circle"
              color={COLORS.primary}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
