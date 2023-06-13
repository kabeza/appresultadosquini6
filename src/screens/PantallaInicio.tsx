import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PantallaInicio = () => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>Pantalla Inicio</Text>
    </View>
  );
};

export default PantallaInicio;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#000',
  },
  texto: {
    fontSize: 20,
    fontWeight: '400',
  },
});
