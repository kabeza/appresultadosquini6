import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

const StackPrueba = createNativeStackNavigator();

const PP1 = () => {
  return (
    <View>
      <Text>PP1</Text>
    </View>
  );
};

const PP2 = () => {
  return (
    <View>
      <Text>PP2</Text>
    </View>
  );
};

const NavegadorStackPrueba = () => {
  return (
    <StackPrueba.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackPrueba.Screen name="P1" component={PP1} />
      <StackPrueba.Screen name="P2" component={PP2} />
    </StackPrueba.Navigator>
  );
};

export default NavegadorStackPrueba;
