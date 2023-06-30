import * as React from 'react';
import {Button, Card, Text, MD3Colors} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TipoSorteo} from '../interfaces/RespuestaSorteos';
import {estiloGlobal} from '../styles/EstiloGlobal';
import {useNavigation} from '@react-navigation/native';

interface Props {
  sorteo: TipoSorteo;
  indice: number;
}

const SorteoItemListado = ({sorteo, indice}: Props) => {
  const navigation = useNavigation();

  const verDetalleSorteo = (paramSorteo: TipoSorteo) => {
    navigation.navigate('DetalleSorteo', {paramSorteo});
  };

  return (
    <>
      <TouchableOpacity onPress={() => verDetalleSorteo(sorteo)}>
        <Card
          mode={indice === 0 ? 'outlined' : 'elevated'}
          theme={{roundness: 4}}
          style={{
            borderColor:
              indice === 0 ? MD3Colors.tertiary60 : MD3Colors.primary40,
            ...estiloGlobal.mb10,
          }}>
          <Card.Content>
            <View style={estilo.itemSorteo}>
              <View style={estilo.isL}>
                <Text variant="titleLarge">Sorteo {sorteo.numero}</Text>
                <Text variant="titleMedium">Fecha {sorteo.fecha}</Text>
              </View>
              <View style={estilo.isR}>
                <Button
                  compact={true}
                  onPress={() => verDetalleSorteo(sorteo)}
                  icon="eye-arrow-right"
                  mode="contained"
                  theme={{roundness: 2}}>
                  Ver
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </>
  );
};

export default SorteoItemListado;

const estilo = StyleSheet.create({
  itemSorteo: {flex: 1, flexDirection: 'row'},
  isL: {flex: 3},
  isR: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
