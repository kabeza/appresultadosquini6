import * as React from 'react';
import {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, Keyboard} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {ContextoSorteos} from '../context/ContextoSorteos';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {estiloGlobal} from '../styles/EstiloGlobal';
import Cargando from '../components/Cargando';
import Sorteo from '../components/Sorteo';

const PantallaInicio = ({navigation}: {navigation: any}) => {
  const {sorteos, isLoading, obtenerSorteos} = useContext(ContextoSorteos);

  useEffect(() => {
    obtenerSorteos();
    console.log('Datos desde Pantalla Inicio');
    console.log(sorteos);
  }, []);

  // const arre1 = [1,2,3,4,5,6,7,8];

  return (
    <>
      {/*
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'green',
          padding: 5,
        }}>
        <ScrollView style={{flex:1}}>
          {arre1.map((object, i) => {
            return (
              <View key={i} style={{backgroundColor:'red', marginBottom:10, minHeight:100}}>
                <Text>{object}</Text>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
      */}
      <View style={estilo.contenedor}>
        <View>
          <Card
            mode="contained"
            theme={{roundness: 4}}
            style={estiloGlobal.mb10}>
            <Card.Content>
              <Text variant="titleLarge">Resultados Quini 6</Text>
              <Text variant="bodyMedium">Últimos Sorteos Realizados</Text>
            </Card.Content>
          </Card>
        </View>
        <View style={estilo.listaSorteos}>
          {isLoading ? (
            <>
              <Cargando />
            </>
          ) : (
            <FlatList
              onScrollBeginDrag={() => Keyboard.dismiss()}
              data={sorteos}
              keyExtractor={item => item.numero}
              renderItem={({item}) => (
                <Sorteo
                  key={item.numero}
                  sorteo={item}
                  navigation={navigation}
                />
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
  },
  listaSorteos: {
    // backgroundColor:MD3Colors.neutral40,
    flex: 1,
  },
});

export default PantallaInicio;
