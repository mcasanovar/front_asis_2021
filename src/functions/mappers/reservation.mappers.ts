import { ReservationModel } from "../../models/reservation.models";

const MapReservation = (reservation: ReservationModel, obs: string, idProfessional: string) => {
  const { observacion, ...restOfData } = reservation;
  return {
    ...restOfData,
    id_GI_personalAsignado: idProfessional,
    observacion: obs
  };
};

export { MapReservation }