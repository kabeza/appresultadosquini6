import * as React from 'react';
import {createContext, useState} from 'react';
import {RespuestaSorteos, TipoSorteo} from '../interfaces/RespuestaSorteos';
import APISorteos from '../api/SorteosApi';
import {
  RespuestaDetalleSorteo,
  DatosSorteo,
} from '../interfaces/RespuestaDetalleSorteo';
import {TypeTodosLosNumeros} from '../interfaces/RespuestaTodosLosNumeros';

type ContextoSorteosProps = {
  isLoading: boolean;
  sorteos: TipoSorteo[];
  detalleSorteo: DatosSorteo | null;
  todosLosNumeros: TypeTodosLosNumeros | null;
  obtenerSorteos: () => Promise<void>;
  obtenerDetalleSorteo: (numeroSorteo: string) => Promise<void>;
  obtenerTodosLosNumeros: () => Promise<void>;
};

export const ContextoSorteos = createContext({} as ContextoSorteosProps);

export const SorteosProvider = ({children}: any) => {
  const [sorteos, setSorteos] = useState<TipoSorteo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [detalleSorteo, setDetalleSorteo] = useState<DatosSorteo | null>(null);
  const [todosLosNumeros, setTodosLosNumeros] =
    useState<TypeTodosLosNumeros | null>(null);

  const obtenerDetalleSorteo = async (numeroSorteo: string) => {
    setIsLoading(true);
    await APISorteos.get<RespuestaDetalleSorteo>(`q6r/sorteo/${numeroSorteo}`)
      .then(function (response) {
        setDetalleSorteo(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        setDetalleSorteo(null);
      });
    setIsLoading(false);
  };

  const obtenerSorteos = async () => {
    setIsLoading(true);
    await APISorteos.get<RespuestaSorteos>('q6r/sorteos')
      .then(function (response) {
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

  const obtenerTodosLosNumeros = async () => {
    setIsLoading(true);
    await APISorteos.get<TypeTodosLosNumeros>('q6r/todoslosnumeros')
      .then(function (response) {
        setTodosLosNumeros(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setTodosLosNumeros(null);
      });
    setIsLoading(false);
  };

  return (
    <ContextoSorteos.Provider
      value={{
        isLoading,
        sorteos,
        detalleSorteo,
        todosLosNumeros,
        obtenerSorteos,
        obtenerDetalleSorteo,
        obtenerTodosLosNumeros,
      }}>
      {children}
    </ContextoSorteos.Provider>
  );
};
