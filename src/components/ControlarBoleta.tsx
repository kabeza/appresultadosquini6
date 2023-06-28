import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, MD3Colors} from 'react-native-paper';
import {DatosSorteo} from '../interfaces/RespuestaDetalleSorteo';

interface Props {
  sorteo: DatosSorteo;
}

interface NumerosSorteo {
  n1: number | string;
  n2: number | string;
  n3: number | string;
  n4: number | string;
  n5: number | string;
  n6: number | string;
}

const ControlarBoleta = ({sorteo}: Props) => {
  const [todoOK, setTodoOK] = useState(false);
  const [hayError, setHayError] = useState(false);
  const [numeros, setNumeros] = useState<NumerosSorteo>({
    n1: '',
    n2: '',
    n3: '',
    n4: '',
    n5: '',
    n6: '',
  });
  // Inputs Refs
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();

  const numerosValidos = (): Boolean => {
    if (
      (numeros.n1 !== '') && (parseInt(numeros.n1) >= 0) && (parseInt(numeros.n1) <= 45) &&
      (numeros.n2 !== '') && (parseInt(numeros.n2) >= 0) && (parseInt(numeros.n2) <= 45) &&
      (numeros.n3 !== '') && (parseInt(numeros.n3) >= 0) && (parseInt(numeros.n3) <= 45) &&
      (numeros.n4 !== '') && (parseInt(numeros.n4) >= 0) && (parseInt(numeros.n4) <= 45) &&
      (numeros.n5 !== '') && (parseInt(numeros.n5) >= 0) && (parseInt(numeros.n5) <= 45) &&
      (numeros.n6 !== '') && (parseInt(numeros.n6) >= 0) && (parseInt(numeros.n6) <= 45)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const encontrarDuplicados = (): Boolean => {
    let temp = [
      numeros.n1,
      numeros.n2,
      numeros.n3,
      numeros.n4,
      numeros.n5,
      numeros.n6,
    ];
    console.log('Temporal:');
    console.log(JSON.stringify(temp));
    let toMap = {};
    let resultado = false;
    for (let i = 0; i < temp.length; i++) {
      if (toMap[temp[i]]) {
        resultado = true;
        break;
      }
      toMap[temp[i]] = true;
    }
    if (resultado) { console.log('Si hay duplicados'); } else { console.log('No hay dupes'); }
    return resultado;
  };

  const handleChangeText = (numero: number, valor: string) => {
    // 1. Seteo el valor correspondiente al input que cambia
    if (Number(valor) >= 0 && Number(valor) <= 45) {
      switch (numero) {
        case 1:
          setNumeros({...numeros, n1: valor});
          break;
        case 2:
          setNumeros({...numeros, n2: valor});
          break;
        case 3:
          setNumeros({...numeros, n3: valor});
          break;
        case 4:
          setNumeros({...numeros, n4: valor});
          break;
        case 5:
          setNumeros({...numeros, n5: valor});
          break;
        case 6:
          setNumeros({...numeros, n6: valor});
          break;
        default:
          break;
      }
      console.log(JSON.stringify(numeros));
    }
    if (numerosValidos()) {
      setTodoOK(true);
      setHayError(false);
    } else {
      setTodoOK(false);
      setHayError(true);
    }
  };

  const handleControlarBoleta = () => {
    console.log('Numeros ingresados:');
    console.log(JSON.stringify(numeros));
    if (!numerosValidos()) {
      setHayError(true);
    }
    if (encontrarDuplicados()) {
      setTodoOK(false);
      setHayError(true);
    } else {
      setTodoOK(true);
      setHayError(false);
    }
  };

  useEffect(() => {
    setTodoOK(false);
    setHayError(false);
  }, []);

  return (
    <View>
      <View style={{marginBottom:10}}>
        <Text variant='titleLarge'>A continuación ingresá los datos de tu boleta para verificar con los datos del sorteo</Text>
      </View>
      <View style={{flexDirection:'row', marginBottom:15, justifyContent:'space-between'}}>
        <View>
          <TextInput
            autoFocus={true}
            autoComplete="off"
            autoCorrect={false}
            maxLength={2}
            keyboardType="number-pad"
            mode="outlined"
            label=""
            returnKeyType="next"
            value={numeros.n1.toString()}
            onSubmitEditing={() => ref_input2.current.focus()}
            onChangeText={text => handleChangeText(1, text)}
          />
        </View>
        <View>
          <TextInput
            ref={ref_input2}
            autoComplete="off"
            autoCorrect={false}
            maxLength={2}
            keyboardType="number-pad"
            mode="outlined"
            label=""
            value={numeros.n2.toString()}
            onSubmitEditing={() => ref_input3.current.focus()}
            onChangeText={text => handleChangeText(2, text)}
          />
        </View>
        <View>
          <TextInput
            ref={ref_input3}
            autoComplete="off"
            autoCorrect={false}
            maxLength={2}
            keyboardType="number-pad"
            mode="outlined"
            label=""
            value={numeros.n3.toString()}
            onSubmitEditing={() => ref_input4.current.focus()}
            onChangeText={text => handleChangeText(3, text)}
          />
        </View>
        <View>
          <TextInput
            ref={ref_input4}
            autoComplete="off"
            autoCorrect={false}
            maxLength={2}
            keyboardType="number-pad"
            mode="outlined"
            label=""
            value={numeros.n4.toString()}
            onSubmitEditing={() => ref_input5.current.focus()}
            onChangeText={text => handleChangeText(4, text)}
          />
        </View>
        <View>
          <TextInput
            ref={ref_input5}
            autoComplete="off"
            autoCorrect={false}
            maxLength={2}
            keyboardType="number-pad"
            mode="outlined"
            label=""
            value={numeros.n5.toString()}
            onSubmitEditing={() => ref_input6.current.focus()}
            onChangeText={text => handleChangeText(5, text)}
          />
        </View>
        <View>
          <TextInput
            ref={ref_input6}
            autoComplete="off"
            autoCorrect={false}
            maxLength={2}
            keyboardType="number-pad"
            mode="outlined"
            label=""
            value={numeros.n6.toString()}
            onChangeText={text => handleChangeText(6, text)}
          />
        </View>
      </View>
      {hayError ? (
        <View style={{marginBottom:15}}>
          <Text variant="titleSmall" style={{color: MD3Colors.error60}}>
            Por favor ingrese los seis números entre 0 y 45 inclusive y sin repetirse
          </Text>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          justifyContent: 'space-between',
        }}>
        <Button
          disabled={!todoOK}
          labelStyle={{fontSize: 18, fontWeight: 'bold'}}
          icon="cash-check"
          style={{flex: 1, marginRight: 6}}
          mode="contained"
          onPress={handleControlarBoleta}
          theme={{roundness: 2}}>
          Controlar
        </Button>
        <Button
          icon="delete-empty"
          style={{flex: 1, marginLeft: 6}}
          mode="contained"
          onPress={() => {
            setNumeros({n1: '', n2: '', n3: '', n4: '', n5: '', n6: ''});
            setHayError(false);
            setTodoOK(false);
          }}
          theme={{roundness: 2}}>
          Limpiar
        </Button>
      </View>
    </View>
  );
};

export default ControlarBoleta;

const styles = StyleSheet.create({});
