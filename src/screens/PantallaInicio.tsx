import * as React from 'react';
import {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, Keyboard} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  MD3Colors,
  Text,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Cargando from '../components/Cargando';
import Sorteo from '../components/Sorteo';
import {ContextoSorteos} from '../context/ContextoSorteos';
import {estiloGlobal} from '../styles/EstiloGlobal';

const PantallaInicio = ({navigation}: {navigation: any}) => {
  const {sorteos, isLoading, obtenerSorteos} = useContext(ContextoSorteos);
  const estaCargando = true;

  useEffect(() => {
    obtenerSorteos();
    console.log('Datos desde Pantalla Inicio');
    console.log(sorteos);
  }, []);

  return (
    <View style={estilo.contenedor}>
      <View>
        <Card mode="contained" theme={{roundness: 4}} style={estiloGlobal.mb10}>
          <Card.Content>
            <Text variant="titleLarge">Resultados Quini 6</Text>
            <Text variant="bodyMedium">
              Datos de los Últimos Sorteos Realizados
            </Text>
          </Card.Content>
        </Card>
        <Card mode="contained" theme={{roundness: 4}} style={estiloGlobal.mb10}>
          <Card.Content>
            <View>
              <Text variant="titleMedium">Último Sorteo Realizado</Text>
            </View>
            <View>
              <Text>
                Enim consectetur officia excepteur ipsum voluptate nulla mollit
                mollit ipsum ad qui. Excepteur deserunt nisi ex ea.
              </Text>
            </View>
          </Card.Content>
        </Card>
        {/* <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          icon="camera"
          raised
          theme={{roundness: 3}}>
          Prueba Boton
        </Button> */}
      </View>
      <View style={estilo.listaSorteos}>
        {isLoading ? (
          <>
            <Cargando />
            {/* <Text>Cargando...</Text> */}
          </>
        ) : (
          <FlatList
            onScrollBeginDrag={() => Keyboard.dismiss()}
            data={sorteos}
            keyExtractor={item => item.numero}
            renderItem={({item}) => (
              <Sorteo key={item.numero} sorteo={item} navigation={navigation} />
            )}
          />
        )}
      </View>
    </View>
  );
};

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
  },
  listaSorteos: {
    // backgroundColor:MD3Colors.neutral40,
    flex: 1,
  },
});

export default PantallaInicio;
