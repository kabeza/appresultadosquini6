import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import PantallaInicio from './../screens/PantallaInicio';
import PantallaSorteos from './../screens/PantallaSorteos';

const BottomStack = createBottomTabNavigator();

const NavegadorTabs = () => {
  return (
    <BottomStack.Navigator>
      <BottomStack.Screen name="PantallaInicio" component={PantallaInicio} />
      <BottomStack.Screen name="PantallaSorteos" component={PantallaSorteos} />
    </BottomStack.Navigator>
  );
};

export default NavegadorTabs;
