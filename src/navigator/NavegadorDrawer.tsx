import {Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NavegadorTabs from './NavegadorTabs';

const DrawerStack = createDrawerNavigator();

// El NavegadorDrawer es el componente menu lateral que aparece con un swipe desde la izquierda
const NavegadorDrawer = () => {
  return (
    <DrawerStack.Navigator drawerContent={props => <DrawerView {...props} />}>
      <DrawerStack.Screen name="NavegadorTabs" component={NavegadorTabs} />
    </DrawerStack.Navigator>
  );
};

function DrawerView() {
  return (
    <View>
      <Text>Vista en el Drawer</Text>
    </View>
  );
}

export default NavegadorDrawer;
