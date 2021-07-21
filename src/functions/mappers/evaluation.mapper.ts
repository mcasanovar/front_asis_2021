import moment from "moment";
import { FORMAT_DATE } from "../../constants/var";
import { EvaluationModel, ExamAversionModel, ExamPsicosensotecnicoModel } from "../../models/evaluations.models";
import { IExamPsicoExtras } from "../../models/index.models";

const MapEvaluationToSend = (evaluation: EvaluationModel, obs: string) => {
  const { nombre_servicio, codigo } = evaluation;
  return {
    nombre_servicio,
    codigo,
    fecha_carga_examen: moment().format(FORMAT_DATE),
    hora_carga_examen: moment().format('HH:mm'),
    observaciones: obs
  };
};

const MapAversionToCreateExam = (
  evaluation: EvaluationModel | undefined,
  aversion: ExamAversionModel
) => {
  return {
    rut_cp: evaluation?.rut_cp,
    rut_cs: evaluation?.rut_cs,
    codigo: evaluation?.codigo,
    id_GI_personalAsignado: evaluation?.id_GI_personalAsignado,
    fecha_evaluacion: moment(evaluation?.fecha_evaluacion, `${FORMAT_DATE} HH:mm`).format(FORMAT_DATE) || moment().format(FORMAT_DATE),
    ...aversion
  }
};

const MapPsicoToCreateExam = (
  evaluation: EvaluationModel | undefined,
  psico: ExamPsicosensotecnicoModel,
  options: IExamPsicoExtras[]
) => {
  let psicoMapped: ExamPsicosensotecnicoModel = psico;

  options.forEach((element: IExamPsicoExtras) => {
    switch (element.name_exam) {
      case 'is_anticipacion':
        psicoMapped.is_anticipacion = true
        break;
      case 'is_somnolencia':
        psicoMapped.is_somnolencia = true
        break;
      case 'is_psicologico':
        psicoMapped.is_psicologico = true
        break;
      case 'is_monotonia':
        psicoMapped.is_monotonia = true
        break;
      case 'is_reacciones_multiples':
        psicoMapped.is_reacciones_multiples = true
        break;
      case 'is_ley_transito':
        psicoMapped.is_ley_transito = true
        break;
      default:
        break;
    }
  });

  return {
    codigo: evaluation?.codigo,
    rut_cp: evaluation?.rut_cp,
    rut_cs: evaluation?.rut_cs,
    id_GI_personalAsignado: evaluation?.id_GI_personalAsignado,
    ...psico,
    obs_examen_psicotecnico: psico.obs_examen_psicotecnico !== ''
      ? psico.obs_examen_psicotecnico : 'Sin Observaciones',
    obs_examen_sensometrico: psico.obs_examen_sensometrico !== ''
      ? psico.obs_examen_sensometrico : 'Sin Observaciones',
    obs_evaluacion_somnolencia: psico.obs_evaluacion_somnolencia !== ''
      ? psico.obs_evaluacion_somnolencia : 'Sin Observaciones',
    obs_evaluacion_psicologica: psico.obs_evaluacion_psicologica !== ''
      ? psico.obs_evaluacion_psicologica : 'Sin Observaciones',
    obs_test_velocidad_anticipacion: psico.obs_test_velocidad_anticipacion !== ''
      ? psico.obs_test_velocidad_anticipacion : 'Sin Observaciones',
    obs_test_tolerancia_monotonia: psico.obs_test_tolerancia_monotonia !== ''
      ? psico.obs_test_tolerancia_monotonia : 'Sin Observaciones',
    obs_test_reacciones_multiples: psico.obs_test_reacciones_multiples !== ''
      ? psico.obs_test_reacciones_multiples : 'Sin Observaciones',
    obs_evaluacion_transito_nacional: psico.obs_evaluacion_transito_nacional !== ''
      ? psico.obs_evaluacion_transito_nacional : 'Sin Observaciones',
    restricciones: psico.restricciones !== '' ? psico.restricciones : 'Sin Restricciones'
  }
};

export { MapEvaluationToSend, MapPsicoToCreateExam, MapAversionToCreateExam }