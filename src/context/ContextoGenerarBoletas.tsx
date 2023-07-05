import * as React from 'react';
import {createContext, useState} from 'react';
import {TipoBoleta} from '../interfaces/RespuestaDetalleSorteo';

type ContextoGenerarBoletasProps = {
  boletas: TipoBoleta[];
  generarBoletas: () => void;
};

export const ContextoGenerarBoletas = createContext(
  {} as ContextoGenerarBoletasProps,
);

export const GenerarBoletasProvider = ({children}: any) => {
  var Chance = require('chance');
  const [boletas, setBoletas] = useState<TipoBoleta[]>([]);

  function generaBoletaQuini6(): TipoBoleta {
    var numal = new Chance();
    const numeros: number[] = [];
    // Me aseguro que genere solo 6 numeros
    // Que ninguno se repita y queden ordenados ascendente
    while (numeros.length < 6) {
      const randomNumber = numal.integer({min: 0, max: 45});
      if (!numeros.includes(randomNumber)) {
        numeros.push(randomNumber);
      }
    }
    numeros.sort((a, b) => a - b);
    return {
      n1: numeros[0],
      n2: numeros[1],
      n3: numeros[2],
      n4: numeros[3],
      n5: numeros[4],
      n6: numeros[5],
    };
  }

  const generarBoletas = () => {
    // Generate 4 sets of numbers
    const newBoletas: TipoBoleta[] = [];
    for (let i = 0; i < 4; i++) {
      newBoletas.push(generaBoletaQuini6());
    }
    setBoletas(newBoletas);
  };

  return (
    <ContextoGenerarBoletas.Provider
      value={{
        boletas,
        generarBoletas,
      }}>
      {children}
    </ContextoGenerarBoletas.Provider>
  );
};
