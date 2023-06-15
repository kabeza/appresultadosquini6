import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetalleSorteo = () => {
  return (
    <SafeAreaView style={estilo.contenedor}>
      <View>
        <Text>Hola</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetalleSorteo;

const estilo = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
});
