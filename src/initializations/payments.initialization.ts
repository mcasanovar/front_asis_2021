import moment from 'moment'
import { FORMAT_DATE } from '../constants/var'

export const PaymentInitialization = {
    _id: '',
    codigo: '',
    nombre_servicio: '',
    id_GI_personalAsignado: '',
    faena_seleccionada_cp: '',
    rut_cp: '',
    razon_social_cp: '',
    rut_cs: '',
    razon_social_cs: '',
    lugar_servicio: '',
    sucursal: '',
    estado: '',
    fecha_facturacion: '',
    nro_factura: '',
    credito: '',
    dias_credito: 0,
    valor_servicio: 0,
    valor_servicio_string: '',
    valor_cancelado: 0,
    valor_cancelado_string: '',
    fecha_pago: '',
    pagos: [],
    isActive: true,
}

export const ParcialPaymentInitialization = {
    id: '',
    fecha_pago: moment().format(FORMAT_DATE),
    hora_pago: moment().format('HH:mm'),
    sucursal: '',
    tipo_pago: '',
    monto: 0,
    descuento: 0,
    total: 0,
    observaciones: '',
    institucion_bancaria: '',
    archivo_pago: '',
    isActive: true,
}

export const IGroupConfirmPaymentInitialization = {
    fecha_pago: '',
    hora_pago: '',
    sucursal: '',
    tipo_pago: '',
    descuento: 0,
    observaciones: '',
    institucion_bancaria: '',
}
