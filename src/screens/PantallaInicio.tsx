import * as React from 'react';
import {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, Keyboard} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {ContextoSorteos} from '../context/ContextoSorteos';
import {estiloGlobal} from '../styles/EstiloGlobal';
import Cargando from '../components/Cargando';
import SorteoItemListado from '../components/SorteoItemListado';

const PantallaInicio = ({navigation}: {navigation: any}) => {
  const {sorteos, isLoading, obtenerSorteos} = useContext(ContextoSorteos);

  useEffect(() => {
    obtenerSorteos();
  }, []);

  return (
    <>
      <View style={estilo.contenedor}>
        <View>
          <Card
            mode="contained"
            theme={{roundness: 4}}
            style={estiloGlobal.mb10}>
            <Card.Content>
              <Text variant="titleLarge">Resultados Quini 6</Text>
              <Text variant="bodyMedium">Últimos Sorteos Realizados</Text>
            </Card.Content>
          </Card>
        </View>
        <View style={estilo.listaSorteos}>
          {isLoading ? (
            <>
              <Cargando />
            </>
          ) : (
            <FlatList
              onScrollBeginDrag={() => Keyboard.dismiss()}
              data={sorteos}
              keyExtractor={item => item.numero}
              renderItem={({item, index}) => (
                <SorteoItemListado
                  key={item.numero}
                  sorteo={item}
                  indice={index}
                  navigation={navigation}
                />
              )}
            />
          )}
        </View>
      </View>
    </>
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
