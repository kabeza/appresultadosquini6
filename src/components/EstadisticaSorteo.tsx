import * as React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {Tiposorteo} from '../interfaces/RespuestaTodosLosNumeros';

interface Props {
  sorteo: Tiposorteo;
}

const EstadisticaSorteo = ({sorteo}: Props) => {
  return (
    <View>
      <Card style={{width: '100%', marginBottom:10}}>
        <Card.Content style={{padding:10}}>
          <Text variant="titleLarge">{sorteo.titulo}</Text>
        </Card.Content>
      </Card>
      {sorteo.numeros.map((objNumber, ji) => {
        return (
          <View key={ji} style={{flexDirection: 'row', marginBottom: 4}}>
            <View style={{flex:1}}>
              <Text>{objNumber.fecha}</Text>
              <Text>Sorteo: {objNumber.numero}</Text>
            </View>
            <View
              style={{
                flex: 4,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              {objNumber.numeros.split(',').map((nro, ki) => {
                return (
                  <Card key={ki} style={{marginRight: 1}}>
                    <Card.Content style={{padding:0}}>
                      <Text variant="titleSmall">{nro}</Text>
                    </Card.Content>
                  </Card>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default EstadisticaSorteo;
