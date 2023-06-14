import React, {createContext, useEffect, useState} from 'react';
import {RespuestaSorteos} from '../interfaces/RespuestaSorteos';
import APISorteos from './../api/SorteosApi';

type SorteosContextProps = {
  sorteos: RespuestaSorteos;
  isLoading: boolean;
  cantidad: number;
  getSorteos: () => Promise<void>;
};

export const SorteosContext = createContext({} as SorteosContextProps);

export const SorteosProvider = ({children}: any) => {
  const [sorteos, setSorteos] = useState<RespuestaSorteos>();
  const [cantidad, setCantidad] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const getSorteos = async () => {
    setIsLoading(true);

    await APISorteos.get<RespuestaSorteos>('q6r/sorteos')
      .then(function (response) {
        console.log(response);
        setCantidad(response.data.cantidad);
        setSorteos(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        // setSorteos([]);
      });
    setIsLoading(false);
  };
  return (
    <SorteosContext.Provider
      value={{
        sorteos,
        isLoading,
        cantidad,
        getSorteos,
      }}>
      {children}
    </SorteosContext.Provider>
  );
};
