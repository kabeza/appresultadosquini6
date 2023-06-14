import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Button, Card, MD3Colors, Text} from 'react-native-paper';
import {SorteosContext} from '../context/SorteosContext';

const PantallaInicio = () => {
  const {cantidad, getSorteos, isLoading, sorteos} = useContext(SorteosContext);

  useEffect(() => {
    console.log('Aca llama');
    getSorteos();
  }, []);

  return (
    <View style={estilo.contenedor}>
      <Card mode="contained" theme={{roundness: 4}} style={{marginBottom: 10}}>
        <Card.Content>
          <Text variant="titleLarge">Resultados Quini 6</Text>
          <Text variant="bodyMedium">
            Listado de los Últimos Sorteos Realizados
          </Text>
        </Card.Content>
      </Card>
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={MD3Colors.primary50}
          size={20}
        />
      ) : (
        <>
          <Text>Ya cargaron los resultados</Text>
          <Text>Cantidad: {cantidad}</Text>
        </>
      )}
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
    padding: 10,
  },
});

export default PantallaInicio;
