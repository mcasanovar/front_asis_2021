import { GiModel } from "../models/gi.models";

export const EmployeesInitialization = {
  tipo_contrato: '',
  estado_contrato: '',
  fecha_inicio_contrato: '',
  fecha_fin_contrato: '',
  sueldo_bruto: 0,
  sueldo_bruto_string: '',
  afp: '',
  isapre: '',
  seguridad_laboral: '',
  dias_vacaciones: '',
  comentarios: '',
  detalle_empleado: {
    dias_acumulados: 0,
    dias_recuperados: 0,
    dias_total_ausencias: 0,
    dias_pendientes: 0,
    enfermedad_cant: 0,
    maternidad_cant: 0,
    mediodia_cant: 0,
    tramites_cant: 0,
    vacaciones_cant: 0,
    recuperados_cant: 0,
    mediodia_recuperados_cant: 0
  }
}

export const GiInitializationData: GiModel = {
  _id: '',
  codigo: '',
  rut: '',
  razon_social: '',
  nombre_fantasia: '',
  rubro_principal: '',
  actividad_principal: {
    codigo: '',
    actividad: '',
    rubro: ''
  },
  rubro_secundario: '',
  actividad_secundaria: {
    codigo: '',
    actividad: '',
    rubro: ''
  },
  grupo_interes: '',
  categoria: '',
  categoria_empresa: '',
  categoria_cliente: '',
  fecha_inic_mac: '',
  edad_gi: 0,
  contacto: 0,
  contacto_2: 0,
  email_central: '',
  email_encargado: '',
  profesion_oficio: '',
  direccion: '',
  localidad: '',
  comuna: '',
  provincia: '',
  region: '',
  sector: '',
  nacionalidad: '',
  pais_origen: '',
  grado_formalizacion: '',
  credito: '',
  cargo: '',
  genero: '',
  estado_civil: '',
  fecha_vencimiento_ci: '',
  fecha_venc_licencia: '',
  usa_pc: '',
  dias_credito: 0,
  orden_compra: '',
  url_file_adjunto: [],
  activo_inactivo: true,
  contrato_faenas: [],
  imagen_perfil_gi: '',
  licencia_conduccion: undefined,
  clase_licencia: [],
  ley_aplicable: undefined,
  estado_licencia: '',
  nivel_educacional: '',
  rol: '',
};

export const ConfigurationGIInitialization = {
  rol: '',
  isEditPassword: false,
  new_password: ''
}