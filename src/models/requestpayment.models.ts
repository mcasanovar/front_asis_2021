import { Moment } from "moment";

//--- REQUEST PAYMENT
export interface RequestPaymentModel {
  _id: string,
  codigo: string,
  nombre_servicio: string,
  faena_seleccionada_cp: string,
  valor_servicio: number,
  valor_servicio_string?: string,
  categoria_cliente: string,
  fecha_facturacion: string,
  fecha_cobranza?: Date,
  dias_credito: number,
  rut_cp: string,
  razon_social_cp: string,
  rut_cs: string,
  razon_social_cs: string,
  lugar_servicio: string,
  sucursal: string,
  estado: string,
  valor_cancelado: number,
  valor_cancelado_string?: string,
  valor_deuda: number,
  valor_deuda_string?: string,
  cartas_cobranza: string[],
  isActive: boolean
}

export interface IResponseRequestPayment {
  err: any,
  msg: string,
  res: any
};

export interface IResponseAllRequestPayment {
  total_items: number,
  pagina_actual: number,
  nro_paginas: 0,
  cobranzas: RequestPaymentModel[]
  err?: string
};

export interface IFiltersRequestPayment {
  key: number,
  value: string,
  name: string
};