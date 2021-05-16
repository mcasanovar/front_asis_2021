//--- RESERVATION MODEL
export interface IReservationObservations {
  obs: string,
  fecha: string
};

export interface ReservationModel {
  _id: string,
  codigo: string,
  id_GI_Principal: string,
  id_GI_Secundario: string,
  id_GI_personalAsignado: string,
  faena_seleccionada_cp: string,
  valor_servicio: number,
  rut_cp: string,
  razon_social_cp: string,
  rut_cs: string,
  razon_social_cs: string,
  fecha_reserva: string,
  hora_reserva: string,
  fecha_reserva_fin: string,
  hora_reserva_fin: string,
  jornada: string,
  mes: string,
  anio: string,
  nombre_servicio: string,
  lugar_servicio: string,
  sucursal: string,
  url_file_adjunto: object,
  observacion: IReservationObservations[],
  reqEvaluacion?: string,
  url_file_adjunto_confirm?: object,
  estado: string,
  isActive: boolean
};

export interface IResponseReservation {
  err: any,
  msg: string,
  res: any
};

export interface IResponseAllReservations {
  total_items: number,
  pagina_actual: number,
  nro_paginas: 0,
  reservas: ReservationModel[],
  err?: string
};

export interface IFiltersReservation {
  key: number,
  value: string,
  name: string
};

export interface IDataReservationConfirmation {
  fecha_reserva: string,
  fecha_reserva_fin: string,
  hora_reserva: string,
  hora_reserva_fin: string,
  id_GI_personalAsignado: string,
  sucursal: string,
  observacion: string,
  reqEvaluacion: string
}