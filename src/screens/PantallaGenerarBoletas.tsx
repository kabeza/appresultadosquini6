import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import BoletaRandom from '../components/BoletaRandom';
import {ContextoGenerarBoletas} from '../context/ContextoGenerarBoletas';
import { TipoBoleta } from '../interfaces/RespuestaDetalleSorteo';

const PantallaGenerarBoletas = () => {
  const {boletas, generarBoletas, isLoading} = useContext(
    ContextoGenerarBoletas,
  );
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  useEffect(() => {
    generarBoletas();
    console.log('Pantalla Generar Boletas');
    console.log(`Boletas: ${JSON.stringify(boletas)}`);
  }, []);

  const onRefresh = () => {
    setRefrescando(true);
    generarBoletas();
    setTimeout(() => {
      setRefrescando(false);
    }, 2000);
  };

  const renderItem = ({item}: {item: TipoBoleta}) => (
    <View style={{ marginVertical: 8 }}>
      <View><Text>{item.n1}</Text></View>
      <View><Text>{item.n2}</Text></View>
      <View><Text>{item.n3}</Text></View>
      <View><Text>{item.n4}</Text></View>
      <View><Text>{item.n5}</Text></View>
      <View><Text>{item.n6}</Text></View>
    </View>
  );

  return (
    <View style={estilo.contenedor}>
      <View>
        <Text>Hola</Text>
      </View>
      <View style={{padding:5, backgroundColor:'#ff0000'}}>
        <FlatList
          data={boletas}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<ActivityIndicator animating={cargando} />}
          onEndReached={generarBoletas}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refrescando} onRefresh={onRefresh} />
          }
        />
      </View>
      {/* 
      <View style={{width:'100%', alignItems:'center', marginBottom:10}}>
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
      <View>
        <BoletaRandom />
        <BoletaRandom />
        <BoletaRandom />
        <BoletaRandom />
      </View>
      */}
    </View>
  );
};

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
  },
});

export default PantallaGenerarBoletas;
