export interface OutputModel {
  _id: string,
  codigo: string,
  fecha: string,
  tipo_salida: string,
  nro_documento: string,
  usuario: string,
  categoria_general: string,
  subcategoria_uno: string,
  subcategoria_dos: string,
  subcategoria_tres: string,
  codigo_categoria_tres: string,
  descripcion: string,
  motivo_salida: string,
  cantidad: number,
  costo_unitario: number,
  costo_unitario_string?: string,
  costo_total: number,
  costo_total_string?: string,
  precio_venta_unitario: number,
  ingreso_total: number
};

export interface IResponseOutputs {
  err: any,
  msg: string,
  res: any,
  filename?: string
};

export interface IResponseAllOutputs {
  total_items: number,
  pagina_actual: number,
  nro_paginas: 0,
  salidas: OutputModel[]
  err?: string
};

export interface IFiltersOutputs {
  key: number,
  value: string,
  name: string
};