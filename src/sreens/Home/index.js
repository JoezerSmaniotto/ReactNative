import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyPets from '../MyPets';
import Pets from '../Pets';
import User from '../User';
import PetsMap from '../PetsMap';
import {PetContext} from '../../context/PetProvider';

const Tab = createBottomTabNavigator();
const Home = ({navigation}) => {
  const {petsList} = useContext(PetContext);
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.black,
        tabBarStyle: {height: 60},
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          marginTop: -5,
          marginBottom: 5,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Pets') {
            iconName = 'pets';
          } else if (route.name === 'MyPets') {
            iconName = 'pets';
          } else if (route.name === 'User') {
            iconName = 'people';
          } else if (route.name === 'PetsMap') {
            iconName = 'map';
          }
          return (
            <MaterialIcons
              name={iconName}
              size={focused ? size + 14 : size}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Pets"
        component={Pets}
        options={{
          tabBarLabel: 'Pets',
        }}
      />
      <Tab.Screen
        name="MyPets"
        component={MyPets}
        options={{
          tabBarLabel: 'MyPets',
        }}
      />
      <Tab.Screen
        name="PetsMap"
        component={PetsMap}
        options={{
          tabBarLabel: 'PetsMap',
          tabBarBadge: petsList.length, // exemplo de badge só tens que colocar em state
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: 'User',
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
