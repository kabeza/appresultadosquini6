import * as React from 'react';
import { useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Divider, Text} from 'react-native-paper';

export interface numerosAleatorios {
  n1: number;
  n2: number;
  n3: number;
  n4: number;
  n5: number;
  n6: number;
}

const BoletaRandom = () => {
  var Chance = require('chance');
  const [numerosAleatorios, setNumerosAleatorios] = useState<numerosAleatorios>(
    {
      n1: 0,
      n2: 0,
      n3: 0,
      n4: 0,
      n5: 0,
      n6: 0,
    },
  );
  useEffect(() => {
    var numal = new Chance();
    let arreTemp: number[] = [];
    arreTemp.push(numal.integer({min: 0, max: 45}));
    arreTemp.push(numal.integer({min: 0, max: 45}));
    arreTemp.push(numal.integer({min: 0, max: 45}));
    arreTemp.push(numal.integer({min: 0, max: 45}));
    arreTemp.push(numal.integer({min: 0, max: 45}));
    arreTemp.push(numal.integer({min: 0, max: 45}));
    let tempSort: number[] = arreTemp.sort((n1, n2) => n1 - n2);
    setNumerosAleatorios(prevState => {
      return {
        ...prevState,
        n1: tempSort[0],
        n2: tempSort[1],
        n3: tempSort[2],
        n4: tempSort[3],
        n5: tempSort[4],
        n6: tempSort[5],
      };
    });
  }, []);

  return (
    <>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{numerosAleatorios.n1}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{numerosAleatorios.n2}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{numerosAleatorios.n3}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{numerosAleatorios.n4}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{numerosAleatorios.n5}</Text>
          </Card.Content>
        </Card>
        <Card mode="contained" style={estilo.tarjetaNumero}>
          <Card.Content>
            <Text variant="titleLarge">{numerosAleatorios.n6}</Text>
          </Card.Content>
        </Card>
      </View>
      <Divider style={{width:'100%', height:1, marginTop: 4, marginBottom: 4}} />
    </>
  );
};

export default BoletaRandom;

const estilo = StyleSheet.create({
  tarjetaNumero: {
    width: '16%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
