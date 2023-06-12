import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PantallaInicio = () => {
  return (
    <View style={styles.contenedor}>
      <Text>Pantalla Inicio</Text>
    </View>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
});
