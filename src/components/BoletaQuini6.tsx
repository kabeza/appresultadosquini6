import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {TipoBoleta} from '../interfaces/RespuestaDetalleSorteo';

interface Props {
  boleta: TipoBoleta;
}

const BoletaQuini6 = ({boleta}: Props) => {
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom:5}}>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{boleta.n1}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{boleta.n2}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{boleta.n3}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{boleta.n4}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{boleta.n5}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{boleta.n6}</Text>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

export default BoletaQuini6;

const estilo = StyleSheet.create({
  tarjetaNumero: {
    width: '16%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
