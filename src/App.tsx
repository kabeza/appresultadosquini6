import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PantallaInicio from './screens/PantallaInicio';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // Navegador Principal, por ahora solo el stack
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={PantallaInicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
