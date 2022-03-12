//--- INVOICES MODEL
export interface IObservationDetail {
    obs: string
    fecha: string
    estado: string
}

export interface InvoicesModel {
    _id: string
    codigo: string
    nombre_servicio: string
    id_GI_personalAsignado: string
    faena_seleccionada_cp: string
    valor_servicio: number
    rut_cp: string
    razon_social_cp: string
    rut_cs: string
    razon_social_cs: string
    lugar_servicio: string
    sucursal: string
    condicionantes: string[]
    vigencia_examen: number
    oc: string
    archivo_oc: string
    fecha_oc: string
    hora_oc: string
    nro_oc: string
    observacion_oc: IObservationDetail[]
    observacion_factura: IObservationDetail[]
    estado: string
    estado_archivo: string
    fecha_facturacion: string
    nro_factura: string
    archivo_factura: string
    monto_neto: number
    porcentaje_impuesto: number
    valor_impuesto: number
    sub_total: number
    exento: number
    descuento: number
    total: number
    representante?: string
    razon_social_empresa?: string
    email_empresa?: string
    total_string?: string
    nro_nota_credito?: string
    fecha_nota_credito?: string
    monto_nota_credito?: number
    factura_anular?: string
    fecha_resultado?: string
    isActive: boolean
}

export interface IResponseInvoices {
    err: any
    msg: string
    res: any
    filename?: string
}

export interface IRazonSocial {
    rut: string
    razon: string
}

export interface ICompanyInfo {
    nombre: string
    razon_social: IRazonSocial[]
    email: string
}

export interface IResponseAllInvoices {
    total_items: number
    pagina_actual: number
    nro_paginas: 0
    empresa?: ICompanyInfo
    facturaciones: InvoicesModel[]
    err?: string
}

export interface IFiltersInvoices {
    key: number
    value: string
    name: string
}

export interface IGroupUploadOC {
    fecha_oc: string
    hora_oc: string
    nro_oc: string
    observacion_oc: string
}

export interface IGroupConfirmOC {
    estado_archivo: string
    observaciones: string
}

export interface IGroupUploadInvoices {
    fecha_facturacion: string
    nro_factura: string
    monto_neto: number
    porcentaje_impuesto: number
    valor_impuesto: number
    sub_total: number
    exento: number
    descuento: number
    total: number
    representante: string
    razon_social_empresa: string
    email_empresa: string
    observacion_factura: string
}

export interface IGroupConfirmInvoices {
    estado_archivo: string
    nro_nota_credito: string
    fecha_nota_credito: string
    monto_nota_credito: number
    factura_anular: string
    observaciones: string
}
