import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {estiloGlobal} from '../styles/EstiloGlobal';
import {useContext, useEffect} from 'react';
import {ContextoSorteos} from '../context/ContextoSorteos';
import Cargando from '../components/Cargando';
import DetalleSorteo from '../components/DetalleSorteo';

const PantallaDetalleSorteo = ({route}: {route: any}) => {
  const {isLoading, detalleSorteo, obtenerDetalleSorteo} =
    useContext(ContextoSorteos);
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
          <View style={{minHeight:150}}>
            <Cargando />
          </View>
        ) : (
          <>
            {detalleSorteo !== null &&
            detalleSorteo.resultados.length > 0 &&
            !isLoading ? (
              <>
                <View>
                  <Card
                    mode="elevated"
                    theme={{roundness: 4, colors: {background:'green'}}}
                    style={estiloGlobal.mb10}>
                    <Card.Content>
                      <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:3}}>
                          <Text>
                            Controlar una o mas Boletas con los resultados que
                            se muestran de este sorteo para verificar si posee
                            algún premio
                          </Text>
                        </View>
                        <View style={{flex:2}}>
                          <Button
                            compact={true}
                            theme={{roundness: 2}}
                            icon="alert-box"
                            mode="contained">
                            ¡Controlar!
                          </Button>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </View>
                {detalleSorteo.resultados.map((object, i) => {
                  return <DetalleSorteo key={i} sorteo={object} />;
                })}
              </>
            ) : null}
            {/* Ugly Fix porque el bottom tabs está por sobre el contenido del View */}
            <View style={{minHeight:90}} />
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
