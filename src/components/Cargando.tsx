import * as React from 'react';
import {ActivityIndicator, MD3Colors, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {estiloGlobal} from './../styles/EstiloGlobal';

const Cargando = () => {
  return (
    <>
      <View style={estilos.vistaCargando}>
        <Text style={estiloGlobal.mb10}>
          Por favor aguarde mientras se cargan los datos ...
        </Text>
        <ActivityIndicator size={40} />
      </View>
    </>
  );
};

export default Cargando;

const estilos = StyleSheet.create({
  vistaCargando: {
    // backgroundColor:MD3Colors.primary30,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
