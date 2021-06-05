import { IReceiverMails } from "../../models/request.models";
import { IDataReservationConfirmation, ReservationModel } from "../../models/reservation.models";

const MapReservation = (
    reservation: ReservationModel, 
    obs: string, 
    idProfessional: string,
    sendMail?: boolean,
    emailsArray?: IReceiverMails[]
  ) => {
  const { observacion, ...restOfData } = reservation;
  return {
    ...restOfData,
    id_GI_personalAsignado: idProfessional,
    observacion: obs,
    sendMail,
    emailsArray
  };
};

const MapGroupReservationsToConfirm = (data: IDataReservationConfirmation, selectedKeyRequests: React.Key[]) => {
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

export { MapReservation, MapGroupReservationsToConfirm }