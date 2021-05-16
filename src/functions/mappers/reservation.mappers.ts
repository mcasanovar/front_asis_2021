import { IDataReservationConfirmation, ReservationModel } from "../../models/reservation.models";

const MapReservation = (reservation: ReservationModel, obs: string, idProfessional: string) => {
  const { observacion, ...restOfData } = reservation;
  return {
    ...restOfData,
    id_GI_personalAsignado: idProfessional,
    observacion: obs
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