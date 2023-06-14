export interface RespuestaSorteos {
  message: string;
  cantidad: number;
  data: Sorteo[];
}

export interface Sorteo {
  numero: string;
  titulo: string;
  fecha: string;
  link: string;
}
