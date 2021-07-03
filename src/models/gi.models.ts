//--- GI MODEL
export interface IActivity {
  codigo: string,
  actividad: string,
  rubro: string
};

export interface IFaena {
  name: string,
}

export interface IContract {
  nro_contrato: string,
  faenas: IFaena[]
}

export interface IDetailsEmployees {
  dias_acumulados: number,
  dias_recuperados: number,
  dias_total_ausencias: number,
  dias_pendientes: number,
  enfermedad_cant: number,
  maternidad_cant: number,
  mediodia_cant: number,
  tramites_cant: number,
  vacaciones_cant: number,
  recuperados_cant: number,
  mediodia_recuperados_cant: number 
};

export interface IDetailsPayments {
  codigo: string,
  fecha: string,
  categoria_general: string,
  subcategoria_uno: string,
  subcategoria_dos: string,
  tipo_registro: string,
  medio_pago: string,
  institucion_bancaria: string,
  monto_total: number,
  archivo_adjunto: string
}

export interface GiModel {
  _id: string,
  codigo: string,
  rut: string,
  razon_social: string,
  nombre_fantasia: string,
  rubro_principal: string,
  actividad_principal: IActivity,
  rubro_secundario: string,
  actividad_secundaria: IActivity,
  grupo_interes: string,
  categoria: string,
  categoria_empresa: string,
  categoria_cliente: string,
  fecha_inic_mac: string,
  edad_gi: number,
  contacto: number,
  contacto_2: number,
  email_central: string,
  email_encargado: string,
  profesion_oficio: string,
  direccion: string,
  localidad: string,
  comuna: string,
  provincia: string,
  region: string,
  sector: string,
  nacionalidad: string,
  pais_origen: string,
  grado_formalizacion: string,
  credito: string,
  cargo?: string,
  genero?: string,
  estado_civil?: string,
  grupo_sanguineo?: string,
  usa_lente_optico?: string,
  usa_lente_contacto?: string,
  usa_audifonos?: string,
  fecha_vencimiento_ci?: string,
  fecha_venc_licencia?: string,
  usa_pc?: string,
  dias_credito: number,
  orden_compra: string,
  url_file_adjunto: any,
  contrato_faenas: IContract[],
  imagen_perfil_gi?: string,
  licencia_conduccion?: string,
  clase_licencia?: string[],
  ley_aplicable?: number,
  estado_licencia?: string,
  nro_contrato?: string,
  faena?: string,
  nivel_educacional?: string,
  id_GI_org_perteneciente?: string,
  razon_social_org_perteneciente?: string,
  activo_inactivo: boolean,
  rol: string,
  //employees data
  tipo_contrato?: string,
  estado_contrato?: string,
  fecha_inicio_contrato?: string,
  fecha_fin_contrato?: string,
  sueldo_bruto?: number,
  sueldo_bruto_string?: string,
  afp?: string,
  isapre?: string,
  seguridad_laboral?: string,
  dias_vacaciones?: string,
  comentarios?: string,
  detalle_empleado?: IDetailsEmployees
  detalle_pagos?: IDetailsPayments[]
};

export interface ConfigurationGIModel {
  rol: string,
  isEditPassword: boolean,
  new_password: string
}

export interface IResponseGI {
  err: any,
  msg?: string,
  res: any,
  filename?: string
};

export interface IResponseEmployees {
  err: any,
  msg: string,
  res: any,
};

export interface IReponseAllGIs {
  total_items: number,
  pagina_actual: number,
  nro_paginas: 0,
  gis: GiModel[],
  err?: string
};

export interface IReponseAllEmployees {
  total_items: number,
  pagina_actual: number,
  nro_paginas: 0,
  empleados: GiModel[],
  err?: string
};

export interface IFiltersGI {
  key: number,
  value: string,
}

export interface IFiltersEmployees {
  key: number,
  value: string,
  name: string
}