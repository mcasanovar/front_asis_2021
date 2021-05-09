import moment from "moment";
import { FORMAT_DATE } from "../../constants/var";
import { IEntries } from "../../models/expenses.models";
import { OutputModel } from "../../models/outputs.models";

const MapOutputToInsert = (output: OutputModel, entry: IEntries | undefined) => {
  return {
    ...output,
    costo_unitario: entry?.costo_unitario,
    fecha: output.fecha !== '' ? output.fecha : moment().format(FORMAT_DATE)
  }
};

export { MapOutputToInsert }