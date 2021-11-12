import React, {useLayoutEffect} from 'react';
import {Text} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../assets/colors';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import LogoutButton from '../../components/LogoutButton';
import {Button} from 'react-native';
import Pets from '../Pets';
import User from '../User';

const Tab = createBottomTabNavigator();
const Home = ({navigation}) => {
  // useLayoutEffect(() => {
  //   // Personalização da barra de status
  //   /* Setando os OPTIONS  que passo de default na APP, aqui como irei passar component
  //   fiz o Options aqui */
  //   navigation.setOptions({
  //     // headerLeft: false,
  //     title: 'Usuários',
  //     headerStyle: {
  //       backgroundColor: COLORS.primary,
  //     },
  //     headerTitleStyle: {color: COLORS.white},
  //     headerRight: () => <LogoutButton />,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <Tab.Navigator
      // screenOptions={({route}) => ({
      //   tabBarIcon: ({focused, color, size}) => {
      //     let iconName;

      //     if (route.name === 'Home') {
      //       iconName = focused
      //         ? 'ios-information-circle'
      //         : 'ios-information-circle-outline';
      //     } else if (route.name === 'Settings') {
      //       iconName = focused ? 'ios-list-box' : 'ios-list';
      //     }

      //     // You can return any component that you like here!
      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      //   tabBarActiveTintColor: 'tomato',
      //   tabBarInactiveTintColor: 'gray',
      // })}
      // initialRouteName={Pets}
      tabBarOptions={{
        initialRouteName: 'Pets',
        activeTintColor: COLORS.primary,
        labelStyle: {
          height: 18,
          fontSize: 12,
          margin: 0,
          fontWeight: 'bold',
        },
        style: {backgroundColor: COLORS.white},
        showIcon: true,
      }}>
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
    </Tab.Navigator>
  );
};

export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   texto: {
//     color: COLORS.primary,
//   },
// });
