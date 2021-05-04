//--- AUSENCES MODEL
export interface AusencesModel {
  _id: string,
  id_empleado: string,
  fecha_inicio_ausencia: string,
  hora_inicio_ausencia: string,
  fecha_fin_ausencia: string,
  hora_fin_ausencia: string,
  tipo_ausencia: string,
  abrev_ausencia: string,
  color_ausencia: string,
  descripcion: string,
  mes_ausencia: string,
  anio_ausencia: string,
  cantidad_dias: number,
  fechas: string[],
  archivo_adjunto: string
};

export interface IResponseAusences {
  err: any,
  msg: string,
  res: any,
};