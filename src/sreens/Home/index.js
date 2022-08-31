import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyPets from '../MyPets';
import Pets from '../Pets';
import User from '../User';
import PetsMap from '../PetsMap';

const Tab = createBottomTabNavigator();
const Home = ({navigation}) => {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.blacks,
      }}>
      <Tab.Screen
        name="Pets"
        component={Pets}
        options={{
          tabBarLabel: 'Pets',
          tabBarIcon: () => (
            <MaterialIcons name="pets" color={theme.colors.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPets"
        component={MyPets}
        options={{
          tabBarLabel: 'MyPets',
          tabBarIcon: () => (
            <MaterialIcons name="pets" color={theme.colors.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: () => (
            <Ionicons name="people" color={theme.colors.primary} size={20} />
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
              color={theme.colors.primary}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
