import * as React from 'react';
import {createContext, useState} from 'react';
import {RespuestaSorteos, TipoSorteo} from '../interfaces/RespuestaSorteos';
import APISorteos from '../api/SorteosApi';

type ContextoSorteosProps = {
  sorteos: TipoSorteo[];
  isLoading: boolean;
  obtenerSorteos: () => Promise<void>;
};

export const ContextoSorteos = createContext({} as ContextoSorteosProps);

export const SorteosProvider = ({children}: any) => {
  const [sorteos, setSorteos] = useState<TipoSorteo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const obtenerSorteos = async () => {
    console.log('Se llama a obtenerSorteos en el Contexto');
    setIsLoading(true);
    await APISorteos.get<RespuestaSorteos>('q6r/sorteos')
      .then(function (response) {
        console.log('Llamado a la API');
        console.log(response.data);
        setSorteos(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setSorteos([]);
      });
    setIsLoading(false);
  };

  return (
    <ContextoSorteos.Provider
      value={{
        sorteos,
        isLoading,
        obtenerSorteos,
      }}>
      {children}
    </ContextoSorteos.Provider>
  );
};
