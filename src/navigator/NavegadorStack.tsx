import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavegadorDrawer from './NavegadorDrawer';

const Stack = createNativeStackNavigator();

const NavegadorStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NavegadorDrawer" component={NavegadorDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegadorStack;
