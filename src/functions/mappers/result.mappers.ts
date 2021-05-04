import { ResultModel } from "../../models/results.model";

const MapResult = (result: ResultModel, obs: string, ) => {
  const { observaciones, ...restOfData } = result;
  return {
    ...restOfData,
    observaciones: obs
  };
};

export { MapResult }