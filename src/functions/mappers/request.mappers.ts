import moment from "moment";
import React from "react";
import { FORMAT_DATE } from "../../constants/var";
import { IDataConfirmation, IReceiverMails, RequestModel } from "../../models/request.models";

const MapRequestToInsert = (request: RequestModel, sendMail: boolean, emailsArray: IReceiverMails[]) => {
  const { _id, ...restOfData } = request;
  return {
    ...restOfData,
    fecha_solicitud: moment(request.fecha_solicitud, FORMAT_DATE).format(FORMAT_DATE),
    sendMail,
    emailsArray
  };
};

const MapRequestToEdit = (request: RequestModel) => {
  const { _id, ...restOfData } = request;
  return restOfData;
};

const MapRequestToConfirm = (request: RequestModel, sendMail: boolean, emailsArray: IReceiverMails[]) => {
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
    url_file_adjunto_confirm: {},
    sendMail,
    emailsArray
  }
};

const MapGroupRequestsToConfirm = (data: IDataConfirmation, selectedKeyRequests: React.Key[]) => {
  const aux = [
    {
      ...data
    },
    {
      ids: selectedKeyRequests
    }
  ];

  return aux;
};

export { MapRequestToInsert, MapRequestToConfirm, MapGroupRequestsToConfirm, MapRequestToEdit }