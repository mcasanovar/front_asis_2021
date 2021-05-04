import { RequestModel } from "../../models/request.models";

const MapRequestToInsert = (request: RequestModel) => {
  const { _id, ...restOfData } = request;
  return restOfData;
};

const MapRequestToConfirm = (request: RequestModel) => {
  const { 
    fecha_confirmacion: fecha_solicitud,
    hora_confirmacion: hora_solicitud,
    medio_confirmacion,
    email_gi: email_central,
    observacion_solicitud,
    id_GI_Principal
  } = request;

  return {
    fecha_solicitud,
    hora_solicitud,
    medio_confirmacion,
    email_central,
    observacion_solicitud,
    id_GI_Principal,
    url_file_adjunto_confirm: {}
  }
};

export { MapRequestToInsert, MapRequestToConfirm }