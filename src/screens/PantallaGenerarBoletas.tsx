import * as React from 'react';
import { useEffect } from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import BoletaRandom from '../components/BoletaRandom';

const PantallaGenerarBoletas = () => {
  useEffect(() => {
    console.log('Genboleta');
  }, []);

  return (
    <View style={estilo.contenedor}>      
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
