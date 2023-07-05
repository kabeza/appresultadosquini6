import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NavegadorTabs from './NavegadorTabs';

const Drawer = createDrawerNavigator();

// El NavegadorDrawer es el componente menu lateral que aparece con un swipe desde la izquierda
const NavegadorDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Tabs">
      <Drawer.Screen name="Tabs" component={NavegadorTabs} />
    </Drawer.Navigator>
  );
};

export default NavegadorDrawer;
