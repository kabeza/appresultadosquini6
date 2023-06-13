import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="slot-machine" />;
const MiTarjeta = () => (
  <Card mode="contained" theme={{roundness: 4}}>
    <Card.Title title="Sorteo Número" subtitle="Fecha:" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Actions>
      <Button mode="contained">Ver Resultados</Button>
    </Card.Actions>
  </Card>
);

const PantallaSorteos = () => {
  return (
    <View style={estilo.contenedor}>
      <MiTarjeta />
    </View>
  );
};

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
  },
});

export default PantallaSorteos;
