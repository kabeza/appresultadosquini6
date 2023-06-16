import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Chip, Divider, MD3Colors, Text} from 'react-native-paper';
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
          {sorteo.titulo !== 'POZO EXTRA' ? (
            <View style={estilo.contenedorNumeros}>
              {Object.entries(arreNumeros).map(([key, val]) => {
                return (
                  <>
                    <View>
                      <Card
                        style={estilo.numerito}
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
          ) : (
            <View style={estilo.contenedorNumeros}>
              {Object.entries(arreNumeros).map(([key, val]) => {
                return (
                  <>
                    <View>
                      <Card
                        style={estilo.numerito}
                        mode="contained"
                        theme={{roundness: 4}}>
                        <Card.Content>
                          <Text
                            variant="titleMedium"
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
          )}
          <View>
            {sorteo.premios.map((object, i) => {
              return (
                <>
                  <View
                    key={i}
                    style={{marginBottom: 10, flexDirection: 'row'}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                      <View>
                        {sorteo.titulo !== 'POZO EXTRA' ? (
                          <Text variant="titleLarge">
                            {object.aciertos} aciertos
                          </Text>
                        ) : (
                          <Text variant="titleLarge">6 aciertos</Text>
                        )}
                      </View>
                      <View>
                        {object.ganadores === 'Vacante' ? (
                          <View
                            style={{
                              backgroundColor: MD3Colors.error10,
                              padding: 4,
                            }}>
                            <Text variant="headlineMedium">
                              {object.ganadores}
                            </Text>
                          </View>
                        ) : (
                          <>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                              <Text variant="titleMedium">Ganadores: </Text>
                              <Text variant="headlineSmall" style={{color:MD3Colors.primary70}}>{object.ganadores}</Text>
                            </View>
                          </>
                        )}
                      </View>
                    </View>
                    <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
                      <Text variant='titleMedium'>Premio</Text>
                      <Text variant='headlineMedium'>{object.premio}</Text>
                    </View>
                  </View>
                  {i + 1 !== sorteo.premios.length ? (
                    <Divider bold={true} style={{marginBottom:4}} />
                  ) : null}
                </>
              );
            })}
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

export default DetalleSorteo;

const estilo = StyleSheet.create({
  contenedorNumeros: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  numerito: {
    backgroundColor: MD3Colors.tertiary30,
    borderRadius: 12,
    elevation: 4,
    padding: 0,
  },
});
