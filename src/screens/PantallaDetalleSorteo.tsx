import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text, Card, Button, Portal, Modal, MD3Colors} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {estiloGlobal} from '../styles/EstiloGlobal';
import {useContext, useEffect} from 'react';
import {ContextoSorteos} from '../context/ContextoSorteos';
import Cargando from '../components/Cargando';
import DetalleSorteo from '../components/DetalleSorteo';
import ControlarBoleta from '../components/ControlarBoleta';

const PantallaDetalleSorteo = ({route}: {route: any}) => {
  const {isLoading, detalleSorteo, obtenerDetalleSorteo} = useContext(ContextoSorteos);
  const {paramSorteo} = route.params;

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleModal = () => {
    if (!visible) {
      showModal();
    } else {
      hideModal();
    }
  };

  // const estaCargando = true;

  useEffect(() => {
    obtenerDetalleSorteo(paramSorteo.numero);
  }, []);

  return (
    <SafeAreaView style={estilo.contenedor}>
      <Portal>
        <Modal
          dismissable={false}
          dismissableBackButton={true}
          visible={visible}
          onDismiss={hideModal}
          style={{margin:10}}
          theme={{roundness: 10}}
          contentContainerStyle={{
            backgroundColor: MD3Colors.tertiary20,
            padding: 20,
            borderColor: MD3Colors.error80,
            borderWidth: 1,
          }}>
          <View style={{padding: 5}}>
            <ControlarBoleta sorteo={detalleSorteo} />
          </View>
          <View style={{alignContent: 'center', padding: 6}}>
            <Button
              disabled={isLoading}
              onPress={() => hideModal()}
              compact={true}
              theme={{roundness: 2}}
              icon="close-box"
              mode="contained">
              Cerrar
            </Button>
          </View>
        </Modal>
      </Portal>

      <Card mode="contained" theme={{roundness: 4}} style={estiloGlobal.mb10}>
        <Card.Content>
          <Text variant="headlineMedium">
            Sorteo número{' '}
            <Text style={{fontFamily: 'Oswald'}}>{paramSorteo.numero}</Text>
          </Text>
          <Text variant="titleLarge">Fecha: {paramSorteo.fecha}</Text>
        </Card.Content>
      </Card>

      <Card
        mode="elevated"
        theme={{roundness: 4}}
        style={{...estiloGlobal.mb10}}>
        <Card.Content>
          <View>
            <View style={estiloGlobal.mb10}>
              <Text variant="bodyLarge">
                Controle una o mas boletas con los resultados que se muestran de
                este sorteo para verificar si posee algún premio
              </Text>
            </View>
            <View>
              <Button
                disabled={isLoading}
                onPress={() => handleModal()}
                compact={true}
                theme={{roundness: 2}}
                icon="alert-box"
                labelStyle={{fontSize: 16}}
                mode="contained">
                ¡Controlar Boletas!
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>

      {isLoading ? (
        <View style={{minHeight: 150}}>
          <Cargando />
        </View>
      ) : (
        <ScrollView>
          <>
            {detalleSorteo !== null &&
            detalleSorteo.resultados.length > 0 &&
            !isLoading ? (
              <>
                {detalleSorteo.resultados.map((object, i) => {
                  return <DetalleSorteo key={i} sorteo={object} />;
                })}
              </>
            ) : null}
          </>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default PantallaDetalleSorteo;

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
    marginBottom: 50,
  },
});
