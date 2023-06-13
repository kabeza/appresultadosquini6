import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import PantallaInicio from './../screens/PantallaInicio';
import PantallaSorteos from './../screens/PantallaSorteos';
import {useTheme} from 'react-native-paper';

const Tab = createBottomTabNavigator();

const NavegadorTabs = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          backgroundColor: theme.colors.secondaryContainer,
          elevation: 0,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          marginBottom: 10,
        },
        tabBarActiveTintColor: theme.colors.error,
        tabBarInactiveTintColor: theme.colors.secondary,
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Inicio',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="seal" color={color} size={size} />
          ),
        }}
        name="PantallaInicio"
        component={PantallaInicio}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Sorteos',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="slot-machine"
              color={color}
              size={size}
            />
          ),
        }}
        name="PantallaSorteos"
        component={PantallaSorteos}
      />
    </Tab.Navigator>
  );
};

export default NavegadorTabs;
