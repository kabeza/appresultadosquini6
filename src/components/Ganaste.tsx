import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {DatosSorteo, TipoAciertos} from '../interfaces/RespuestaDetalleSorteo';
import {Button, Card, Text} from 'react-native-paper';

interface Props {
  numeroSorteo: number;
  datosSorteo: DatosSorteo;
  aciertos: number;
}

const Aciertos = ({numeroSorteo, aciertos, datosSorteo}: Props) => {
  console.log(
    `NroSorteo: ${numeroSorteo} Aciertos: ${aciertos} Sorteo: ${JSON.stringify(
      datosSorteo.resultados[numeroSorteo - 1],
    )}`,
  );

  let premio = '';

  switch (numeroSorteo) {
    case 4:
      premio = datosSorteo.resultados[numeroSorteo - 1].premios[0].premio;
      break;
    case 5:
      break;
    default:
      {datosSorteo.resultados[numeroSorteo - 1].premios.map((object, i) => {
        if (parseInt(object.aciertos, 10) === aciertos) {
          premio = object.premio;
        }
        });
      }
      break;
  }

  return (
    <>
      <View>
        <Text variant="titleLarge">{aciertos} aciertos</Text>
      </View>
      <View>
        <Text variant="titleLarge">Premio: {premio}</Text>
      </View>
    </>
  );
};

const Ganaste = ({numeroSorteo, datosSorteo, aciertos}: Props) => {
  return (
    <>
      <Card style={{width: '100%'}}>
        <Card.Content>
          <View>
            <Text variant="titleLarge">
              {datosSorteo.resultados[numeroSorteo - 1].titulo}
            </Text>
          </View>
          <View style={estilo.aciertos}>
            <Aciertos
              numeroSorteo={numeroSorteo}
              aciertos={aciertos}
              datosSorteo={datosSorteo}
            />
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

export default Ganaste;

const estilo = StyleSheet.create({
  aciertos: {
    paddingRight: 5,
  },
});
