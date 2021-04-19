import { GiModel } from "../../models/gi.models";

const MapGIToInsert = (gi: GiModel) => {
  const { _id, ...restOfData } = gi;
  return restOfData;
};

export { MapGIToInsert }