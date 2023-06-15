import * as React from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TipoSorteo} from '../interfaces/RespuestaSorteos';
import {estiloGlobal} from '../styles/EstiloGlobal';
import {useNavigation} from '@react-navigation/native';

interface Props {
  sorteo: TipoSorteo;
}

const Sorteo = ({sorteo}: Props) => {
  const navigation = useNavigation();
  
  const verDetalleSorteo = (sorteoNumero: string) => {
    console.log(`Sorteo ## ${sorteoNumero}`);
    navigation.navigate('PantallaSorteos');
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => verDetalleSorteo(sorteo.numero)}
      >
      <Card mode="outlined" theme={{roundness: 4}} style={estiloGlobal.mb10}>
        <Card.Content>
          <View style={estilo.itemSorteo}>
            <View style={estilo.isL}>
              <Text variant="titleLarge">Sorteo {sorteo.numero}</Text>
              <Text variant="titleMedium">Fecha {sorteo.fecha}</Text>
            </View>
            <View style={estilo.isR}>
              {/* <Button
                compact={true}
                // onPress={() => console.log(`Sorteo ${sorteo.numero}`)}
                onPress={() => verDetalleSorteo(sorteo.numero)}
                icon="eye-arrow-right"
                mode="contained"
                theme={{roundness: 2}}>
              </Button> */}
            </View>
          </View>
        </Card.Content>
      </Card>
      </TouchableOpacity>
    </>
  );
};

export default Sorteo;

const estilo = StyleSheet.create({
  itemSorteo: {flex: 1, flexDirection: 'row'},
  isL: {flex: 3},
  isR: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
