import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {estiloGlobal} from '../styles/EstiloGlobal';
import {useContext, useEffect} from 'react';
import {ContextoSorteos} from '../context/ContextoSorteos';
import Cargando from '../components/Cargando';
import uuid from 'react-native-uuid';
import DetalleSorteo from '../components/DetalleSorteo';

const PantallaDetalleSorteo = ({route}: {route: any}) => {
  const {isLoading, detalleSorteo, obtenerDetalleSorteo} = useContext(ContextoSorteos);
  const {paramSorteo} = route.params;

  useEffect(() => {
    obtenerDetalleSorteo(paramSorteo.numero);
  }, []);

  return (
    <SafeAreaView style={estilo.contenedor}>
      <Card mode="contained" theme={{roundness: 4}} style={estiloGlobal.mb10}>
        <Card.Content>
          <Text variant="headlineMedium">
            Sorteo número{' '}
            <Text style={{fontFamily: 'Oswald'}}>{paramSorteo.numero}</Text>
          </Text>
          <Text variant="titleLarge">Fecha: {paramSorteo.fecha}</Text>
        </Card.Content>
      </Card>
      <ScrollView>
        {isLoading ? (
          <Card
            mode="outlined"
            theme={{roundness: 4}}
            style={{flex: 1, ...estiloGlobal.mb10}}>
            <Card.Content>
              <View style={{minHeight:150}}>
                <Cargando />
              </View>
            </Card.Content>
          </Card>
        ) : (
          <>
            {detalleSorteo !== null &&
            detalleSorteo.resultados.length > 0 &&
            !isLoading ? (
              <>
                {detalleSorteo.resultados.map((object, i) => {
                  return <DetalleSorteo key={i} sorteo={object} />;
                })}
              </>
            ) : null}
            <View style={{minHeight:150}} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PantallaDetalleSorteo;

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
  },
});
