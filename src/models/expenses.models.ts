export interface IEntries {
    _id: string
    nombre_proveedor: string
    categoria_general: string
    subcategoria_uno: string
    subcategoria_dos: string
    subcategoria_tres: string
    codigo_categoria_tres: string
    cant_maxima_categoria_tres: number
    detalle: string
    cantidad: number
    porcentaje_impuesto: number
    valor_impuesto: number
    costo_unitario: number
    costo_total: number
}

export interface ExpensesModel {
    _id: string
    codigo: string
    fecha: string
    fecha_registro: string
    categoria_general: string
    subcategoria_uno: string
    subcategoria_dos: string
    descripcion_gasto: string
    id_proveedor: string
    rut_proveedor: string
    categoria_proveedor: string
    razon_social_proveedor: string
    requiere_servicio: string
    id_servicio: string
    servicio: string
    tipo_registro: string
    tipo_documento: string
    nro_documento: string
    medio_pago: string
    institucion_bancaria: string
    inventario: string
    cantidad_factor: number
    precio_unitario: number
    monto_neto: number
    impuesto: number
    exento: number
    total: number
    total_string?: string
    observaciones: string
    archivo_adjunto: string
    entradas: IEntries[]
    isActive: boolean
}

export interface IResponseExpenses {
    err: any
    msg: string
    res: any
    filename?: string
}

export interface IResponseAllExpenses {
    total_items: number
    pagina_actual: number
    nro_paginas: 0
    gastos: ExpensesModel[]
    err?: string
}

export interface IFiltersExpenses {
    key: number
    value: string
    name: string
}
