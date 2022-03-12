//--- RESULTS MODEL
export interface IResultObservations {
    obs: string
    fecha: string
    estado: string
}

export interface ResultModel {
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
    observaciones: IResultObservations[]
    fecha_confirmacion_examen: string
    hora_confirmacion_examen: string
    estado: string
    url_file_adjunto_res: string
    estado_archivo: string
    estado_resultado: string
    fecha_resultado?: string
    fecha_resultado_date?: Date
    hora_resultado?: string
    isActive: boolean
}

export interface IResponseResults {
    err: any
    msg: string
    res: any
    filename?: string
}

export interface IResponseAllResults {
    total_items: number
    pagina_actual: number
    nro_paginas: 0
    resultados: ResultModel[]
    err?: string
}

export interface IFiltersResults {
    key: number
    value: string
    name: string
}
