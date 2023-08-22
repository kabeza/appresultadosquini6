import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Text,
  TextInput,
  MD3Colors,
  Card,
  Avatar,
} from 'react-native-paper';
import {
  DatosSorteo,
  TipoAciertos,
  numerosIngresados,
} from '../interfaces/RespuestaDetalleSorteo';
import Ganaste from './Ganaste';

interface Props {
  sorteo: DatosSorteo;
}

const ControlarBoleta = ({sorteo}: Props) => {
  const estadoInicial = {
    puedeControlar: false,
    hayError: false,
    hayPremio: false,
    malaSuerte: false,
  };
  const [estado, setEstado] = useState(estadoInicial);
  const [numeros, setNumeros] = useState<numerosIngresados>({
    n1: '',
    n2: '',
    n3: '',
    n4: '',
    n5: '',
    n6: '',
  });
  const [aciertos, setAciertos] = useState<TipoAciertos>({
    res1: 0,
    res2: 0,
    res3: 0,
    res4: 0,
    res5: 0,
  });

  const generarAciertos = () => {
    if (numerosValidos() && !encontrarDuplicados()) {
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
          res1: s1.length,
        };
      });

      // La Segunda
      let s2: number[] = tempSort.filter(element =>
        sorteo.resultados[1].numeros.split(',').map(Number).includes(element),
      );
      setAciertos(prevState => {
        return {
          ...prevState,
          res2: s2.length,
        };
      });

      // Revancha
      let s3: number[] = tempSort.filter(element =>
        sorteo.resultados[2].numeros.split(',').map(Number).includes(element),
      );
      setAciertos(prevState => {
        return {
          ...prevState,
          res3: s3.length,
        };
      });

      // Siempre Sale
      let s4: number[] = tempSort.filter(element =>
        sorteo.resultados[3].numeros.split(',').map(Number).includes(element),
      );
      setAciertos(prevState => {
        return {
          ...prevState,
          res4: s4.length,
        };
      });

      // Pozo Extra
      let pozoExtra: string = '';
      pozoExtra = pozoExtra.concat(
        sorteo.resultados[0].numeros,
        ',',
        sorteo.resultados[1].numeros,
        ',',
        sorteo.resultados[2].numeros,
      );
      let s5match: number[] = tempSort.filter(element =>
        pozoExtra.split(',').map(Number).includes(element),
      );
      setAciertos(prevState => {
        return {
          ...prevState,
          res5: s5match.length,
        };
      });
    }
  };

  const hayAciertos = () => {
    setEstado(prev => {
      return {
        ...prev,
        malaSuerte: false,
        hayPremio: false,
      };
    });

    if (
      numeros.n1.toString().length > 0 &&
      numeros.n2.toString().length > 0 &&
      numeros.n3.toString().length > 0 &&
      numeros.n4.toString().length > 0 &&
      numeros.n5.toString().length > 0 &&
      numeros.n6.toString().length > 0
    ) {
      if (
        aciertos.res1 < 4 &&
        aciertos.res2 < 4 &&
        aciertos.res3 < 4 &&
        aciertos.res4 < 5 &&
        aciertos.res5 < 6
      ) {
        setEstado(prev => {
          return {
            ...prev,
            malaSuerte: true,
          };
        });
      } else if (
        aciertos.res1 >= 4 ||
        aciertos.res2 >= 4 ||
        aciertos.res3 >= 4 ||
        aciertos.res4 === 5 ||
        aciertos.res5 === 6
      ) {
        setEstado(prev => {
          return {
            ...prev,
            hayPremio: true,
          };
        });
      }
    }
  };

  useEffect(() => {
    setEstado(prev => {
      return {
        ...prev,
        hayError: false,
      };
    });
    if (numerosValidos()) {
      generarAciertos();
      setEstado(prev => {
        return {
          ...prev,
          puedeControlar: true,
        };
      });
    } else {
      setEstado(prev => {
        return {
          ...prev,
          puedeControlar: false,
        };
      });
    }
  }, [numeros]);

  /*
  useEffect(() => {
    hayAciertos();
  }, [aciertos]);
  */

  useEffect(() => {
    setEstado(prevAppState => ({
      ...prevAppState,
      puedeControlar: false,
      hayError: false,
      hayPremio: false,
      malaSuerte: false,
    }));
    // console.log(`Estado inicial: ${JSON.stringify(estado)}`);
  }, []);

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
    if (!numerosValidos() || encontrarDuplicados()) {
      setEstado(prev => {
        return {
          ...prev,
          hayError: true,
        };
      });
    }
    hayAciertos();
  };

  const handleLimpiar = () => {
    setNumeros({n1: '', n2: '', n3: '', n4: '', n5: '', n6: ''});
    setAciertos({res1: 0, res2: 0, res3: 0, res4: 0, res5: 0});
    setEstado(prev => {
      return {
        ...prev,
        hayError: false,
        puedeControlar: false,
        malaSuerte: false,
        hayPremio: false,
      };
    });
    console.log(`Estado: ${JSON.stringify(estado)}`);
    ref_input1.current.focus();
  };

  const controlarAciertos = (aciertos: TipoAciertos, sorteo: DatosSorteo) => {
    if (aciertos.res1 >= 4) {
      return (
        <Ganaste
          numeroSorteo={1}
          datosSorteo={sorteo}
          aciertos={aciertos.res1}
        />
      );
    } else if (aciertos.res2 >= 4) {
      return (
        <Ganaste
          numeroSorteo={2}
          datosSorteo={sorteo}
          aciertos={aciertos.res2}
        />
      );
    } else if (aciertos.res3 >= 4) {
      return (
        <Ganaste
          numeroSorteo={3}
          datosSorteo={sorteo}
          aciertos={aciertos.res3}
        />
      );
    } else if (aciertos.res4 === 5) {
      return (
        <Ganaste
          numeroSorteo={4}
          datosSorteo={sorteo}
          aciertos={aciertos.res4}
        />
      );
    } else if (aciertos.res5 === 6) {
      return (
        <Ganaste
          numeroSorteo={5}
          datosSorteo={sorteo}
          aciertos={aciertos.res5}
        />
      );
    }
  };

  return (
    <View>
      <View style={{marginBottom:10}}>
        <Text variant='titleLarge' style={{color:MD3Colors.neutral80}}>
          A continuación ingresá los datos de tu boleta para verificar con los datos del sorteo</Text>
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
      {estado.hayError ? (
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
          disabled={!estado.puedeControlar}
          labelStyle={{fontSize: 18, fontWeight: 'bold'}}
          icon="cash-check"
          style={{flex: 1, marginRight: 6}}
          mode="contained"
          onPress={() => handleControlarBoleta()}
          theme={{roundness: 2}}>
          Controlar
        </Button>
        <Button
          icon="delete-empty"
          style={{flex: 1, marginLeft: 6}}
          labelStyle={{fontSize:16}}
          mode="contained"
          onPress={() => handleLimpiar()}
          theme={{roundness: 2}}>
          Limpiar
        </Button>
      </View>

      {estado.hayPremio ? (
        <>
          <View>
            <Card mode='contained' style={{backgroundColor:'#2a9d8f'}}>
              <Card.Content style={{alignItems:'center'}}>
                <Text
                  variant="headlineMedium"
                  style={{color: '#fff', marginBottom: 10}}>
                  ¡GANASTE!
                </Text>
                {controlarAciertos(aciertos, sorteo)}
              </Card.Content>
            </Card>
          </View>
        </>
      ) : null}

      {estado.malaSuerte === true ? (
        <>
          <View>
            <Card>
              <Card.Title
                title="No hubo suerte esta vez..."
                subtitle="¡La próxima tendrás mas suerte!"
                left={props => <Avatar.Icon {...props} icon="emoticon-sad" />}
              />
            </Card>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default ControlarBoleta;
