import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import PantallaInicio from '../screens/PantallaInicio';
import PantallaSorteos from '../screens/PantallaSorteos';
import PantallaDetalleSorteo from '../screens/PantallaDetalleSorteo';

const Stack = createNativeStackNavigator();

const NavegadorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inicio"
        component={PantallaInicio}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetalleSorteo"
        component={PantallaDetalleSorteo}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Sorteos" component={PantallaSorteos} />
    </Stack.Navigator>
  );
};

export default NavegadorStack;
