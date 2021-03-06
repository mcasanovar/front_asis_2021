import moment from "moment";
import { FORMAT_DATE } from "../constants/var";
import { RequestModel } from "../models/request.models";

const userLogged = localStorage.getItem('userLogged');

export const RequestInitialization: RequestModel = {
  _id: '',
  codigo: '',
  fecha_system: moment().format(FORMAT_DATE),
  hora_system: moment().format('HH:mm'),
  id_GI_Principal: '',
  id_GI_Secundario: '',
  id_GI_PersonalAsignado: '',
  rut_CP: '',
  razon_social_CP: '',
  nro_contrato_seleccionado_cp: '',
  faena_seleccionada_cp: '',
  rut_cs: '',
  razon_social_cs: '',
  fecha_solicitud: moment().format(`${FORMAT_DATE} HH:mm`),
  hora_solicitud: moment().format('HH:mm'),
  mes_solicitud: '',
  anio_solicitud: '',
  nombre_receptor: userLogged !== null ? JSON.parse(userLogged).gi.razon_social : '',
  categoria1: '',
  categoria2: '',
  categoria3: '',
  nombre_servicio: '',
  tipo_servicio: '',
  monto_neto: 0,
  porcentaje_impuesto: 19,
  valor_impuesto: 0,
  monto_total: 0,
  exento: 0,
  lugar_servicio: '',
  sucursal: '',
  descripcion_servicio: '',
  observacion_solicitud: '',
  fecha_servicio_solicitado: '',
  hora_servicio_solicitado: '',
  fecha_servicio_solicitado_termino: '',
  hora_servicio_solicitado_termino: '',
  jornada: '',
  estado: 'Ingresado',
  isActive: true,
}