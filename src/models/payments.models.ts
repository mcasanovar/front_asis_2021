//--- PAYMENTS MODEL
export interface IPayment {
    id: string
    fecha_pago: string
    hora_pago: string
    sucursal: string
    tipo_pago: string
    monto: number
    descuento: number
    total: number
    observaciones: string
    institucion_bancaria: string
    archivo_pago: string
    isActive: boolean
}

export interface PaymentModel {
    _id: string
    codigo: string
    nombre_servicio: string
    id_GI_personalAsignado: string
    faena_seleccionada_cp: string
    rut_cp: string
    razon_social_cp: string
    rut_cs: string
    razon_social_cs: string
    lugar_servicio: string
    sucursal: string
    estado: string
    fecha_facturacion: string
    nro_factura: string
    credito: string
    dias_credito: number
    valor_servicio: number
    valor_servicio_string?: string
    valor_cancelado: number
    valor_cancelado_string?: string
    fecha_pago: string
    pagos: IPayment[]
    isActive: boolean
}

export interface IResponsePayment {
    err: any
    msg: string
    res: any
}

export interface IResponseAllPayments {
    total_items: number
    pagina_actual: number
    nro_paginas: 0
    pagos: PaymentModel[]
    err?: string
}

export interface IFiltersPayment {
    key: number
    value: string
    name: string
}

export interface IGroupConfirmPayment {
    fecha_pago: string
    hora_pago: string
    sucursal: string
    tipo_pago: string
    descuento: number
    observaciones: string
    institucion_bancaria: string
}
