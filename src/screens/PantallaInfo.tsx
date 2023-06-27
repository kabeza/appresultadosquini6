import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const PantallaInfo = () => {
  return (
    <View style={estilo.contenedor}>
      <Text>PantallaInfo</Text>
    </View>
  );
};

export default PantallaInfo;

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#ffff00',
  }
});
