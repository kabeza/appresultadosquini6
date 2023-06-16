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
  const estaCargando = true;

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
                {detalleSorteo.resultados.map((item) => {
                  console.log(uuid.v4());
                  console.log(`Item ==> ${JSON.stringify(item)}`);
                  return <DetalleSorteo key={uuid.v4()} sorteo={item} />;
                })}
                {/*
                {detalleSorteo.resultados.map(item => (
                  <View key={uuid.v4()}>
                    {Object.entries(item).map(([key, val]) => {
                      return (
                        <>
                          <Text>
                            KEY {key.toString()} = {JSON.stringify(val)}
                          </Text>
                          <Text>--------</Text>
                        </>
                      );
                    })}
                  </View>
                ))}
                */}
                {/*
                {detalleSorteo.resultados.map(({titulo, numeros, premios}) => {
                  console.log(titulo);
                  console.log(numeros);
                  return (
                    <>
                      <Card
                        mode="outlined"
                        theme={{roundness: 4}}
                        style={estiloGlobal.mb10}>
                        <Card.Content>
                          <Text variant="titleMedium">{titulo}</Text>
                          <Text variant="titleSmall">{numeros}</Text>
                        </Card.Content>
                      </Card>
                    </>
                  );
                })}
                */}
              </>
            ) : null}
            <View style={{minHeight:150}}></View>
          </>
        )}
      </ScrollView>
      {/*
      <Card mode="outlined" theme={{roundness: 4}} style={estiloGlobal.mb10}>
        <Card.Content>
          {isLoading ? (
            <>
              <View style={{minHeight:150}}>
                <Cargando />
              </View>
            </>
          ) : (
            <>
              <View>
                {detalleSorteo !== null &&
                detalleSorteo.resultados.length > 0 &&
                !isLoading ? (
                  <>
                    {detalleSorteo.resultados.map(
                      ({titulo, numeros, premios}) => {
                        console.log(titulo);
                        console.log(numeros);
                        return (
                          <>
                            <Text>Titulo {titulo}</Text>
                          </>
                        );
                      },
                    )}
                  </>
                ) : null}
              </View>
              {// <Text>Hola {JSON.stringify(detalleSorteo)}</Text> }
            </>
          )}
        </Card.Content>
      </Card>
      */}
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
