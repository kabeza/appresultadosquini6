import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {FlatList, Image, RefreshControl, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import BoletaQuini6 from '../components/BoletaQuini6';
import {ContextoGenerarBoletas} from '../context/ContextoGenerarBoletas';
import {TipoBoleta} from '../interfaces/RespuestaDetalleSorteo';

const PantallaGenerarBoletas = () => {
  const {boletas, generarBoletas} = useContext(ContextoGenerarBoletas);
  const [refrescando, setRefrescando] = useState(false);

  useEffect(() => {
    setRefrescando(true);
    generarBoletas();
    setRefrescando(false);
  }, []);

  const onRefresh = () => {
    setRefrescando(true);
    generarBoletas();
    setTimeout(() => {
      setRefrescando(false);
    }, 500);
  };

  const renderItem = (item: TipoBoleta, index: number) => (
    <View>
      <Text style={{alignSelf: 'center'}}>Boleta Número: {index + 1}</Text>
      <BoletaQuini6 boleta={item} />
    </View>
  );

  return (
    <View style={estilo.contenedor}>
      <FlatList
        data={boletas}
        renderItem={({item, index}) => renderItem(item, index)}
        ListHeaderComponent={
          <>
            <View
              style={{width: '100%', alignItems: 'center', marginBottom: 10}}>
              <Image
                source={require('../assets/images/numeros.png')}
                style={{width: '100%', height: undefined, aspectRatio: 135/76,}}
              />
            </View>
            <Card style={{width: '100%', marginBottom:10}}>
              <Card.Content style={{padding:10}}>
                <Text variant="titleLarge">Generar Boletas de Quini 6</Text>
                <Text variant="bodyMedium">
                  Arrastre hacia abajo para actualizar y generar nuevamente
                </Text>
              </Card.Content>
            </Card>
          </>
        }
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refrescando}
            onRefresh={() => onRefresh()}
          />
        }
      />
    </View>
  );
};

const estilo = StyleSheet.create({
  contenedor: {
    padding: 10,
    marginBottom: 50,
  },
});

export default PantallaGenerarBoletas;
