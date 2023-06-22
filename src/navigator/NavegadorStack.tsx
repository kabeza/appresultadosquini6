import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PantallaInicio from '../screens/PantallaInicio';
import PantallaDetalleSorteo from '../screens/PantallaDetalleSorteo';

const Stack = createNativeStackNavigator();

const NavegadorStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Inicio" component={PantallaInicio} />
      <Stack.Screen name="DetalleSorteo" component={PantallaDetalleSorteo} />
    </Stack.Navigator>
  );
};

export default NavegadorStack;
