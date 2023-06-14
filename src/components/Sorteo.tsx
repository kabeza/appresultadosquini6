import * as React from 'react';
import {Text} from 'react-native-paper';
import {View} from 'react-native';
import {TipoSorteo} from '../interfaces/RespuestaSorteos';

interface Props {
  sorteo: TipoSorteo;
}

const Sorteo = ({sorteo}: Props) => {
  return (
    <>
      <View>
        <Text>Sorteo: {sorteo.numero}</Text>
        <Text>Fecha: {sorteo.fecha}</Text>
      </View>
    </>
  );
};

export default Sorteo;
