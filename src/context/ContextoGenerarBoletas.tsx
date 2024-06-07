import * as React from 'react';
import {createContext, useState} from 'react';
import {TipoBoleta} from '../interfaces/RespuestaDetalleSorteo';

type ContextoGenerarBoletasProps = {
  boletas: TipoBoleta[];
  generarBoletas: () => void;
  generateNewSets: (numerosHistoricos: string[]) => void;
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

  function generateNewSets(numerosHistoricos: string[]): void {
    // Convert the string of numbers to an array of arrays
    const numbersArray: number[][] = numerosHistoricos.map(set =>
      set.split(',').map(Number),
    );

    function shuffleArray<T>(array: T[]): void {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Function to calculate the frequency of each number in the given sets
    function calculateNumberFrequency(sets: number[][]): Map<number, number> {
      let frequency = new Map<number, number>();
      sets.forEach(set => {
        set.forEach(num => {
          frequency.set(num, (frequency.get(num) || 0) + 1);
        });
      });
      return frequency;
    }

    // Calculate the frequency of each number in the original sets
    const originalFrequency = calculateNumberFrequency(numbersArray);

    // Function to generate a new set based on probability
    function generateNewSet(): TipoBoleta {
      let pool = Array.from(originalFrequency.keys());
      // Shuffle the pool
      shuffleArray(pool);
      let newSet: number[] = [];
      for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * pool.length);
        let chosenNum = pool[randomNumber];

        newSet.push(chosenNum);
        pool.splice(randomNumber, 1); // Remove the chosen number from the pool
      }
      // Sort the set in ascending order
      newSet.sort((a, b) => a - b);
      return {
        n1: newSet[0],
        n2: newSet[1],
        n3: newSet[2],
        n4: newSet[3],
        n5: newSet[4],
        n6: newSet[5],
      };
      //return newSet;
    }

    const boletasNuevas: TipoBoleta[] = [];
    for (let i = 0; i < 4; i++) {
      boletasNuevas.push(generateNewSet());
    }
    setBoletas(boletasNuevas);
    console.log(`Boletas nuevas: ${JSON.stringify(boletasNuevas)}`);

    /*
    // Generate the specified number of new sets
    let newSets: number[][] = [];
    for (let i = 0; i < 4; i++) {
      newSets.push(generateNewSet());
    }
    return newSets;
    */
  }

  return (
    <ContextoGenerarBoletas.Provider
      value={{
        boletas,
        generarBoletas,
        generateNewSets,
      }}>
      {children}
    </ContextoGenerarBoletas.Provider>
  );
};
