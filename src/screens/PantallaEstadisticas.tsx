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
        <>
          <ScrollView>
            {todosLosNumeros.todosLosNumerosEver.map((numero, ni) => {
              return (
                <>
                  <View
                    key={ni}
                    style={{
                      width: '100%',
                      marginBottom: 6,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {numero.split(',').map((numerito, fi) => {
                      return (
                        <Card key={fi}>
                          <Card.Content style={{padding:0}}>
                            <Text variant="titleSmall">{numerito}</Text>
                          </Card.Content>
                        </Card>
                      );
                      // <Text key={fi}>{numerito}</Text>;
                    })}
                  </View>
                </>
              );
            })}
          </ScrollView>
          <View style={{marginTop:5, marginBottom:5}}>
            <Card mode="outlined" style={{width: '100%'}}>
              <Card.Content style={{padding:10}}>
                <Text variant="titleLarge">Detalle Histórico por Sorteo</Text>
              </Card.Content>
            </Card>
          </View>
          <ScrollView>
            {todosLosNumeros.data.tiposorteo.map((object, fi) => {
              return <EstadisticaSorteo key={fi} sorteo={object} />;
            })}
          </ScrollView>
        </>
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
