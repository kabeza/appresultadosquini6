import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PantallaInicio from '../screens/PantallaInicio';
import PantallaSorteos from '../screens/PantallaSorteos';

const Stack = createNativeStackNavigator();

const NavegadorStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={PantallaInicio} />
        <Stack.Screen name="Sorteos" component={PantallaSorteos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegadorStack;
