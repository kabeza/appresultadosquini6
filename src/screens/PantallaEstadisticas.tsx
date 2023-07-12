import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {ContextoSorteos} from '../context/ContextoSorteos';
import {useContext, useEffect} from 'react';
import Cargando from '../components/Cargando';
import uuid from 'react-native-uuid';
import EstadisticaSorteo from '../components/EstadisticaSorteo';

const PantallaEstadisticas = () => {
  const {todosLosNumeros, isLoading, obtenerTodosLosNumeros} = useContext(ContextoSorteos);

  useEffect(() => {
    obtenerTodosLosNumeros();
  }, []);

  return (
    <View style={estilo.contenedor}>
      <Card style={{width: '100%', marginBottom:10}}>
        <Card.Content style={{padding:10}}>
          <Text variant="titleLarge">Todos los números sorteados</Text>
          <Text variant="bodyMedium">
            Datos de los últimos números sorteados según tipo de sorteo
          </Text>
        </Card.Content>
      </Card>
      {isLoading || todosLosNumeros === null ? (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Cargando />
          </View>
        </>
      ) : (
        <ScrollView>
          {todosLosNumeros.data.tiposorteo.map((object, fi) => {
            return <EstadisticaSorteo key={fi} sorteo={object} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default PantallaEstadisticas;

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
    marginBottom: 50,
  },
});
