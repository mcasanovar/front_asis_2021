export interface ExistenceModel {
    _id: string
    categoria_general: string
    subcategoria_uno: string
    subcategoria_dos: string
    subcategoria_tres: string
    codigo_categoria_tres: string
    entradas: number
    salidas: number
    existencia: number
    cantMaxima: number
    costo_total: number
    costo_total_string?: string
    costo_unitario_promedio: number
    costo_unitario_promedio_string?: string
    estado: string
}

export interface IResponseExistence {
    err: any
    msg: string
    res: any
    filename?: string
}

export interface IResponseAllExistence {
    total_items: number
    pagina_actual: number
    nro_paginas: 0
    existencias: ExistenceModel[]
    err?: string
}

export interface IFiltersExistence {
    key: number
    value: string
    name: string
}
