import * as React from 'react';
import {createContext, useState} from 'react';
import {RespuestaSorteos, TipoSorteo} from '../interfaces/RespuestaSorteos';
import APISorteos from '../api/SorteosApi';
import {
  RespuestaDetalleSorteo,
  DatosSorteo,
} from '../interfaces/RespuestaDetalleSorteo';

type ContextoSorteosProps = {
  sorteos: TipoSorteo[];
  detalleSorteo: DatosSorteo | null;
  isLoading: boolean;
  obtenerSorteos: () => Promise<void>;
  obtenerDetalleSorteo: (numeroSorteo: string) => Promise<void>;
};

export const ContextoSorteos = createContext({} as ContextoSorteosProps);

export const SorteosProvider = ({children}: any) => {
  const [sorteos, setSorteos] = useState<TipoSorteo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [detalleSorteo, setDetalleSorteo] = useState<DatosSorteo | null>(null);

  const obtenerDetalleSorteo = async (numeroSorteo: string) => {
    setIsLoading(true);
    await APISorteos.get<RespuestaDetalleSorteo>(`q6r/sorteo/${numeroSorteo}`)
      .then(function (response) {
        console.log('Detalle de Sorteo');
        console.log(response.data);
        setDetalleSorteo(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setDetalleSorteo(null);
      });
    setIsLoading(false);
  };

  const obtenerSorteos = async () => {
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
        detalleSorteo,
        isLoading,
        obtenerSorteos,
        obtenerDetalleSorteo,
      }}>
      {children}
    </ContextoSorteos.Provider>
  );
};
