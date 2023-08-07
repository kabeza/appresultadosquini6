export interface RespuestaSorteos {
  message: string;
  cantidad: number;
  data: TipoSorteo[];
}

export interface TipoSorteo {
  numero: string;
  titulo: string;
  fecha: string;
  link: string;
}
