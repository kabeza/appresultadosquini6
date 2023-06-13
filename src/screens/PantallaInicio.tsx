import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const PantallaInicio = () => {
  return (
    <View style={estilo.contenedor}>
      <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        icon="camera"
        raised
        theme={{roundness: 3}}>
        Prueba Boton
      </Button>
    </View>
  );
};

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
  },
});

export default PantallaInicio;
