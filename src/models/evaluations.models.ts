//--- EVALUATION MODEL
export interface IEvaluationObservations {
    obs: string
    fecha: string
    estado: string
}

export interface EvaluationModel {
    _id: string
    codigo: string
    id_GI_personalAsignado: string
    valor_servicio: number
    faena_seleccionada_cp: string
    fecha_evaluacion: string
    fecha_evaluacion_fin: string
    hora_inicio_evaluacion: string
    hora_termino_evaluacion: string
    mes: string
    anio: string
    nombre_servicio: string
    rut_cp: string
    razon_social_cp: string
    rut_cs: string
    razon_social_cs: string
    lugar_servicio: string
    sucursal: string
    observaciones: IEvaluationObservations[]
    estado_archivo: string
    fecha_carga_examen?: string
    hora_carga_examen?: string
    url_file_adjunto_EE?: string
    fecha_confirmacion_examen?: string
    hora_confirmacion_examen?: string
    estado: string
    isActive: boolean
}

//--------------------------------------------------------------------------------PSICOTECNICO
export interface ExamPsicosensotecnicoModel {
    resultado: string
    licencia_a_acreditar: string[]
    restricciones: string
    //examen obligatorios
    examen_sensometrico: string
    obs_examen_sensometrico: string
    examen_psicotecnico: string
    obs_examen_psicotecnico: string
    evaluacion_somnolencia: string
    obs_evaluacion_somnolencia: string
    evaluacion_psicologica: string
    obs_evaluacion_psicologica: string
    //psicotecnico
    tiempo_reaccion: string
    promedio_tiempo_reaccion: number
    coordinacion_bimanual: string
    promedio_coordinacion_bimanual: number
    precision_coordinacion_visomotriz: string
    promedio_precision_coordinacion_vis: number
    //sensometrico
    monocular_derecha: string
    monocular_izquierda: string
    vision_binocular: string
    perimetria: string
    profundidad: string
    discriminacion_colores: string
    vision_nocturna: string
    phoria_vertical: string
    phoria_horizontal: string
    recuperacion_encandilamiento: string
    audiometria: string
    //que examenes viene extras
    is_anticipacion: boolean
    test_velocidad_anticipacion: string
    obs_test_velocidad_anticipacion: string
    is_monotonia: boolean
    test_tolerancia_monotonia: string
    obs_test_tolerancia_monotonia: string
    is_reacciones_multiples: boolean
    test_reacciones_multiples: string
    obs_test_reacciones_multiples: string
    is_ley_transito: boolean
    evaluacion_transito_nacional: string
    obs_evaluacion_transito_nacional: string
    is_somnolencia: boolean
    probabilidad_somnolencia: string
    punto: number
    test_epworth: string
    is_psicologico: boolean
    observacion_psicologica: string
    test_aciertos_tolerancia: number
    test_errores_tolerancia: number
    promedio_reaccion_monotonia: number
    test_estado_ley_transito: string
    porcentaje_legales: number
    porcentaje_reglamentarios: number
    porcentaje_mecanica: number
    porcentaje_señales_viales: number
    porcentaje_conducta_vial: number
    meses_vigencia: number
    conclusion_recomendacion: string
}

export interface IResponseEvaluation {
    err: any
    msg: string
    res: any
    filename?: string
}

export interface IResponseAllEvaluations {
    total_items: number
    pagina_actual: number
    nro_paginas: 0
    evaluaciones: EvaluationModel[]
    err?: string
}

export interface IFiltersEvaluation {
    key: number
    value: string
    name: string
}

//--------------------------------------------------------------------------------AVERSION
export interface ExamAversionModel {
    maquinaria: string
    razonamiento_abstracto: string
    percepcion_concentracion: string
    comprension_instrucciones: string
    acato_autoridad: string
    relacion_grupo_pares: string
    comportamiento_social: string
    locus_control_impulsividad: string
    manejo_frustracion: string
    empatia: string
    grado_ansiedad: string
    actitud_prevencion_accidentes: string
    confianza_acciones_realizadas: string
    capacidad_modificar_ambiente_seguridad: string
    orientacion_tarea: string
    energia_vital: string
    conclusion: number
    observaciones_conclusion: string
    meses_vigencia: number
}
