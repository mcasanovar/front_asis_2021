//--- REQUEST MODEL
export interface ICategory4 {
  id: number,
  nivel_4: string
}

export interface ICategory3 {
  id: number,
  nivel_3: string,
  nivel_4: ICategory4[]
}

export interface ICategory2 {
  id: number,
  nivel_2: string,
  nivel_3: ICategory3[]
}

export interface ICategory1 {
  id: number,
  nivel_1: string,
  nivel_2: ICategory2[]
}

export interface IRequestObservations {
  obs: string,
  fecha: string
};

export interface RequestModel {
  _id: string,
  codigo: string,
  fecha_system: string,
  hora_system: string,
  id_GI_Principal: string,
  id_GI_Secundario: string,
  id_GI_PersonalAsignado: string,
  rut_CP: string,
  razon_social_CP: string,
  nro_contrato_seleccionado_cp: string,
  faena_seleccionada_cp: string,
  rut_cs: string,
  razon_social_cs: string,
  fecha_solicitud: string,
  mes_solicitud: string,
  hora_solicitud: string,
  anio_solicitud: string,
  nombre_receptor: string,
  categoria1: string,
  categoria2: string,
  categoria3: string,
  nombre_servicio: string,
  tipo_servicio: string,
  monto_neto: number,
  porcentaje_impuesto: number,
  valor_impuesto: number,
  monto_total: number,
  exento: number,
  lugar_servicio: string,
  sucursal: string,
  descripcion_servicio: string,
  observacion_solicitud: string,
  observacion_solicitud_array?: IRequestObservations[],
  fecha_servicio_solicitado: string,
  hora_servicio_solicitado: string,
  fecha_servicio_solicitado_termino: string,
  hora_servicio_solicitado_termino: string,
  jornada: string,
  estado: string,
  isActive: boolean,
  fecha_confirmacion?: string,
  hora_confirmacion?: string,
  medio_confirmacion?: string,
  email_gi?: string,
  url_file_adjunto_confirm?: object
};

export interface IResponseRequest {
  err: any,
  msg: string,
  res: any
};

export interface IResponseAllRequests {
  total_items: number,
  pagina_actual: number,
  nro_paginas: 0,
  solicitudes: RequestModel[],
  err?: string
};

export interface IFiltersRequest {
  key: number,
  value: string,
  name: string
}