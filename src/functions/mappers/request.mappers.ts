import { RequestModel } from "../../models/request.models";

const MapRequestToInsert = (request: RequestModel) => {
  const { _id, ...restOfData } = request;
  return restOfData;
};

export { MapRequestToInsert }