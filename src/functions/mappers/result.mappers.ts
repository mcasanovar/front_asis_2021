import { GiModel } from "../../models/gi.models";
import { ResultModel } from "../../models/results.model";

const MapResult = (result: ResultModel, obs: string, ) => {
  const { observaciones, ...restOfData } = result;
  return {
    ...restOfData,
    observaciones: obs
  };
};

const MapDataResultToConsolidatedReport = (gi: GiModel | undefined, results: ResultModel[] | undefined, emails: {email: string, name: string}[]) => {
  return {
    gi,
    results,
    emails
  }
};

export { MapResult, MapDataResultToConsolidatedReport }