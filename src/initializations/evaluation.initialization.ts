import { ExamAversionModel, ExamPsicosensotecnicoModel } from "../models/evaluations.models"

export const EvaluationInitialization = {
  _id: '',
  codigo: '',
  id_GI_personalAsignado: '',
  valor_servicio: 0,
  faena_seleccionada_cp: '',
  fecha_evaluacion: '',
  fecha_evaluacion_fin: '',
  hora_inicio_evaluacion: '',
  hora_termino_evaluacion: '',
  mes: '',
  anio: '',
  nombre_servicio: '',
  rut_cp: '',
  razon_social_cp: '',
  rut_cs: '',
  razon_social_cs: '',
  lugar_servicio: '',
  sucursal: '',
  observaciones: [],
  estado_archivo: '',
  estado: '',
  isActive: true
}

export const ExamPsicosensotecnicoInitialization: ExamPsicosensotecnicoModel = {
  resultado: 'Aprobado',
  licencia_a_acreditar: [],
  restricciones: '',
  //examen obligatorios
  examen_sensometrico: 'Aprobado',
  obs_examen_sensometrico: '',
  examen_psicotecnico: 'Aprobado',
  obs_examen_psicotecnico: '',
  evaluacion_somnolencia: 'Aprobado',
  obs_evaluacion_somnolencia: '',
  evaluacion_psicologica: 'Aprobado',
  obs_evaluacion_psicologica: '',
  //psicotecnico
  tiempo_reaccion: 'Aprobado',
  promedio_tiempo_reaccion: 0,
  coordinacion_bimanual: 'Aprobado',
  promedio_coordinacion_bimanual: 0,
  precision_coordinacion_visomotriz: 'Aprobado',
  promedio_precision_coordinacion_vis: 0,
  //sensometrico
  monocular_derecha: 'Aprobado',
  monocular_izquierda: 'Aprobado',
  vision_binocular: 'Aprobado',
  perimetria: 'Aprobado',
  profundidad: 'Aprobado',
  discriminacion_colores: 'Aprobado',
  vision_nocturna: 'Aprobado',
  phoria_vertical: 'Aprobado',
  phoria_horizontal: 'Aprobado',
  recuperacion_encandilamiento: 'Aprobado',
  audiometria: 'Aprobado',
  //que examenes viene extras
  is_anticipacion: false,
  test_velocidad_anticipacion: 'Aprobado',
  obs_test_velocidad_anticipacion: '',
  is_monotonia: false,
  test_tolerancia_monotonia: 'Aprobado',
  obs_test_tolerancia_monotonia: '',
  is_reacciones_multiples: false,
  test_reacciones_multiples: 'Aprobado',
  obs_test_reacciones_multiples: '',
  is_ley_transito: false,
  evaluacion_transito_nacional: 'Aprobado',
  obs_evaluacion_transito_nacional: '',
  is_somnolencia: false,
  probabilidad_somnolencia: '',
  punto: 0,
  test_epworth: 'Aprobado',
  is_psicologico: false,
  observacion_psicologica: '',
  test_aciertos_tolerancia: 0,
  test_errores_tolerancia: 0,
  promedio_reaccion_monotonia: 0,
  test_estado_ley_transito: 'Aprobado',
  porcentaje_legales: 0,
  porcentaje_reglamentarios: 0,
  porcentaje_mecanica: 0,
  porcentaje_se??ales_viales: 0,
  porcentaje_conducta_vial: 0,
  meses_vigencia: 0,
  conclusion_recomendacion: ''
};

export const ExamAversionInitialization: ExamAversionModel = {
  maquinaria: '',
  razonamiento_abstracto: 'Promedio',
  percepcion_concentracion: 'Promedio',
  comprension_instrucciones: 'Promedio',
  acato_autoridad: 'Promedio',
  relacion_grupo_pares: 'Promedio',
  comportamiento_social: 'Promedio',
  locus_control_impulsividad: 'Promedio',
  manejo_frustracion: 'Promedio',
  empatia: 'Promedio',
  grado_ansiedad: 'Promedio',
  actitud_prevencion_accidentes: 'Promedio',
  confianza_acciones_realizadas: 'Promedio',
  capacidad_modificar_ambiente_seguridad: 'Promedio',
  orientacion_tarea: 'Promedio',
  energia_vital: 'Promedio',
  conclusion: 0,
  observaciones_conclusion: '',
  meses_vigencia: 0
};