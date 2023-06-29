import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, MD3Colors, Card} from 'react-native-paper';
import {DatosSorteo} from '../interfaces/RespuestaDetalleSorteo';

interface Props {
  sorteo: DatosSorteo;
}

interface TipoAciertos {
  res0: number; // tradicional
  res1: number; // la segunda
  res2: number; // revancha
  res3: number; // siempre sale
  res4: number; // pozo extra
}

interface numerosIngresados {
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
  const [numeros, setNumeros] = useState<numerosIngresados>({
    n1: '',
    n2: '',
    n3: '',
    n4: '',
    n5: '',
    n6: '',
  });
  const [aciertos, setAciertos] = useState<TipoAciertos>({
    res0: 0,
    res1: 0,
    res2: 0,
    res3: 0,
    res4: 0,
  });

  useEffect(() => {
    if (numerosValidos()) {
      setTodoOK(true);
      setHayError(false);
    } else {
      setTodoOK(false);
      setHayError(true);
    }
  }, [numeros]);

  useEffect(() => {
    console.log(`Aciertos nuevo: ${JSON.stringify(aciertos)}`);
    // console.log(`Arre Aciertos: ${JSON.stringify(arreAciertos)}`);
  }, [aciertos]);

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
    switch (numero) {
      case 1:
        setNumeros(prevState => {
          return {
            ...prevState,
            n1:
              parseInt(valor, 10) >= 0 && parseInt(valor, 10) <= 45
                ? valor
                : '',
          };
        });
        break;
      case 2:
        setNumeros(prevState => {
          return {
            ...prevState,
            n2:
              parseInt(valor, 10) >= 0 && parseInt(valor, 10) <= 45
                ? valor
                : '',
          };
        });
        break;
      case 3:
        setNumeros(prevState => {
          return {
            ...prevState,
            n3:
              parseInt(valor, 10) >= 0 && parseInt(valor, 10) <= 45
                ? valor
                : '',
          };
        });
        break;
      case 4:
        setNumeros(prevState => {
          return {
            ...prevState,
            n4:
              parseInt(valor, 10) >= 0 && parseInt(valor, 10) <= 45
                ? valor
                : '',
          };
        });
        break;
      case 5:
        setNumeros(prevState => {
          return {
            ...prevState,
            n5:
              parseInt(valor, 10) >= 0 && parseInt(valor, 10) <= 45
                ? valor
                : '',
          };
        });
        break;
      case 6:
        setNumeros(prevState => {
          return {
            ...prevState,
            n6:
              parseInt(valor, 10) >= 0 && parseInt(valor, 10) <= 45
                ? valor
                : '',
          };
        });
        break;
      default:
        break;
    }
  };

  const handleControlarBoleta = () => {
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

    // 1 ---- zerofill y ordenar
    let temp = [
      parseInt(numeros.n1.toString(), 10),
      parseInt(numeros.n2.toString(), 10),
      parseInt(numeros.n3.toString(), 10),
      parseInt(numeros.n4.toString(), 10),
      parseInt(numeros.n5.toString(), 10),
      parseInt(numeros.n6.toString(), 10),
    ];
    let tempSort: number[] = temp.sort((n1, n2) => n1 - n2);

    // Ahora controlo los aciertos por cada sorteo

    // Sorteo Tradicional
    let s1: number[] = tempSort.filter(element =>
      sorteo.resultados[0].numeros.split(',').map(Number).includes(element),
    );
    setAciertos(prevState => {
      return {
        ...prevState,
        res0: s1.length,
      };
    });

    // La Segunda
    let s2: number[] = tempSort.filter(element =>
      sorteo.resultados[1].numeros.split(',').map(Number).includes(element),
    );
    setAciertos(prevState => {
      return {
        ...prevState,
        res1: s2.length,
      };
    });

    // Revancha
    let s3: number[] = tempSort.filter(element =>
      sorteo.resultados[2].numeros.split(',').map(Number).includes(element),
    );
    setAciertos(prevState => {
      return {
        ...prevState,
        res2: s3.length,
      };
    });

    // Siempre Sale
    let s4: number[] = tempSort.filter(element =>
      sorteo.resultados[3].numeros.split(',').map(Number).includes(element),
    );
    setAciertos(prevState => {
      return {
        ...prevState,
        res3: s4.length,
      };
    });

    // Pozo Extra
    let s5: string[] = [];
    s5.push(sorteo.resultados[0].numeros);
    s5.push(sorteo.resultados[1].numeros);
    s5.push(sorteo.resultados[2].numeros);
    s5.push(sorteo.resultados[3].numeros);
    setAciertos(prevState => {
      return {
        ...prevState,
        res4: s5.length,
      };
    });
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
            ref={ref_input1}
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
            setAciertos({res0: 0, res1: 0, res2: 0, res3: 0, res4: 0});
            setHayError(false);
            setTodoOK(false);
            ref_input1.current.focus();
            // Keyboard.dismiss();
          }}
          theme={{roundness: 2}}>
          Limpiar
        </Button>
      </View>
      {todoOK ? (
        <>
          {aciertos.res0 >= 4 ||
          aciertos.res1 >= 4 ||
          aciertos.res2 >= 4 ||
          aciertos.res3 >= 4 ||
          aciertos.res4 === 6 ? (
            <View>
              <Card mode='contained' style={{backgroundColor:'#2a9d8f'}}>
                <Card.Content style={{alignItems:'center'}}>
                  <Text
                    variant="headlineMedium"
                    style={{color: '#fff', marginBottom: 10}}>
                    ¡GANASTE!
                  </Text>
                  {aciertos.res0 >= 4 ? (
                    <View style={estilo.contenedorGanaste}>
                      <View style={{flex:2, paddingLeft:5}}><Text variant="titleMedium">{sorteo.resultados[0].titulo}</Text></View>
                      <View style={{flex:1, alignItems:'center', paddingRight:5}}><Text variant="titleLarge">{aciertos.res0} aciertos</Text></View>
                    </View>
                  ) : null}
                  {aciertos.res1 >= 4 ? (
                    <View style={estilo.contenedorGanaste}>
                      <View style={{flex:2, paddingLeft:5}}><Text variant="titleMedium">{sorteo.resultados[1].titulo}</Text></View>
                      <View style={{flex:1, alignItems:'center', paddingRight:5}}><Text variant="titleLarge">{aciertos.res1} aciertos</Text></View>
                    </View>
                  ) : null}
                  {aciertos.res2 >= 4 ? (
                    <View style={estilo.contenedorGanaste}>
                      <View style={{flex:2, paddingLeft:5}}><Text variant="titleMedium">{sorteo.resultados[2].titulo}</Text></View>
                      <View style={{flex:1, alignItems:'center', paddingRight:5}}><Text variant="titleLarge">{aciertos.res2} aciertos</Text></View>
                    </View>
                  ) : null}
                  {aciertos.res3 >= 4 ? (
                    <View style={estilo.contenedorGanaste}>
                      <View style={{flex:2, paddingLeft:5}}><Text variant="titleMedium">{sorteo.resultados[3].titulo}</Text></View>
                      <View style={{flex:1, alignItems:'center', paddingRight:5}}><Text variant="titleLarge">{aciertos.res3} aciertos</Text></View>
                    </View>
                  ) : null}
                  {aciertos.res4 === 6 ? (
                    <View style={estilo.contenedorGanaste}>
                      <View style={{flex:2, paddingLeft:5}}><Text variant="titleMedium">{sorteo.resultados[4].titulo}</Text></View>
                      <View style={{flex:1, alignItems:'center', paddingRight:5}}><Text variant="titleLarge">6 aciertos</Text></View>
                    </View>
                  ) : null}
                </Card.Content>
              </Card>
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
};

export default ControlarBoleta;

const estilo = StyleSheet.create({
  contenedorGanaste: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 4,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },
});
