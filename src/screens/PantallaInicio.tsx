import * as React from 'react';
import {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, Keyboard} from 'react-native';
import {ActivityIndicator, Button, Card, MD3Colors, Text} from 'react-native-paper';
import {ContextoSorteos} from '../context/ContextoSorteos';
import {Sorteo} from '../interfaces/RespuestaSorteos';

interface Props {
  sorteo: Sorteo;
}

export const Sorteo = ({sorteo}: Props) => {
  return (
    <>
      <Text>Hola desde {sorteo.numero}</Text>
    </>
  );
};

const PantallaInicio = () => {
  const {sorteos, isLoading, obtenerSorteos} = useContext(ContextoSorteos);

  useEffect(() => {
    obtenerSorteos();
    console.log('Datos desde Pantalla Inicio');
    console.log(sorteos);
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
        <ActivityIndicator size={60} />
      ) : (
        <FlatList
          onScrollBeginDrag={() => Keyboard.dismiss()}
          data={sorteos}
          keyExtractor={item => item.numero}
          renderItem={({item}) => <Sorteo key={item.numero} sorteo={item} />}
        />
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
