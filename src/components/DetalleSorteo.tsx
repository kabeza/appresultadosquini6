import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, MD3Colors, Text} from 'react-native-paper';
import {estiloGlobal} from '../styles/EstiloGlobal';
import {Resultado} from '../interfaces/RespuestaDetalleSorteo';
import uuid from 'react-native-uuid';

interface Props {
  sorteo: Resultado;
}

const DetalleSorteo = ({sorteo}: Props) => {
  let arreNumeros = sorteo.numeros.split(',');

  return (
    <>
      <Card
        mode="contained"
        theme={{roundness: 4, colors: {background:'green'}}}
        style={estiloGlobal.mb10}>
        <Card.Content>
          <Text variant="titleMedium" style={{fontWeight:'bold'}}>{sorteo.titulo}</Text>
        </Card.Content>
      </Card>
      <Card mode="elevated" theme={{roundness: 4}} style={estiloGlobal.mb10}>
        <Card.Content>
          <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            {Object.entries(arreNumeros).map(([key, val]) => {
              return (
                <>
                  <View key={uuid.v4()}>
                    <Card
                      style={{
                        backgroundColor: MD3Colors.tertiary30,
                        borderRadius: 12,
                        elevation: 4,
                        padding:0,
                      }}
                      mode="contained"
                      theme={{roundness: 4}}>
                      <Card.Content>
                        <Text
                          variant="headlineSmall"
                          style={{color: MD3Colors.primary90}}>
                          {val}
                        </Text>
                      </Card.Content>
                    </Card>
                  </View>
                </>
              );
            })}
          </View>
          <Text variant="titleSmall">{JSON.stringify(sorteo)}</Text>
        </Card.Content>
      </Card>
    </>
  );
};

export default DetalleSorteo;

const estilo = StyleSheet.create({
});
