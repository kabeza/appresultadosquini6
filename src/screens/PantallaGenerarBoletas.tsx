import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import BoletaQuini6 from '../components/BoletaQuini6';
import {ContextoGenerarBoletas} from '../context/ContextoGenerarBoletas';
import {TipoBoleta} from '../interfaces/RespuestaDetalleSorteo';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import {ContextoSorteos} from '../context/ContextoSorteos';

const PantallaGenerarBoletas = () => {
  const {boletas, generateNewSets} = useContext(ContextoGenerarBoletas);
  const {todosLosNumeros, obtenerTodosLosNumeros} = useContext(ContextoSorteos);
  const [refrescando, setRefrescando] = useState(false);

  const generarBoletasyCopiar = () => {
    // generarBoletas();
    if (todosLosNumeros != null) {
      generateNewSets(todosLosNumeros.todosLosNumerosEver);
    }
  };

  useEffect(() => {
    // setRefrescando(true);
    obtenerTodosLosNumeros();
    // generarBoletasyCopiar();
    // setRefrescando(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const boletasClipboard = boletas
      .map(boleta => Object.values(boleta).join(','))
      .join('\n');
    Clipboard.setString(boletasClipboard);
    Toast.show({
      type: 'info',
      text1: '!Boletas Copiadas!',
      text2: 'Se han copiado al portapapeles las boletas generadas',
      position: 'bottom',
      bottomOffset: 100,
    });
  }, [boletas]);

  const onRefresh = () => {
    setRefrescando(true);
    generarBoletasyCopiar();
    setTimeout(() => {
      setRefrescando(false);
    }, 10);
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
              <Pressable onPress={() => generarBoletasyCopiar()}>
                <Image
                  source={require('../assets/images/numeros.png')}
                  style={{
                    width: '70%',
                    height: undefined,
                    aspectRatio: 135 / 76,
                  }}
                />
              </Pressable>
            </View>
            <Card style={{width: '100%', marginBottom: 10}}>
              <Card.Content style={{padding: 10}}>
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
