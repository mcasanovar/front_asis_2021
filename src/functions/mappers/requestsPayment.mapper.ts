import { GiModel } from "../../models/gi.models";
import { RequestPaymentModel } from "../../models/requestpayment.models";

export const MapDataToConsolidatedReport = (
  gi: GiModel | undefined, 
  cobranzas: RequestPaymentModel[] | undefined, 
  emails: {email: string, name: string}[],
  datefilter: string | null,
  contractfilter: string | null,
  faenafilter: string | null
) => {
  return {
    gi,
    cobranzas,
    emails,
    filtrofecha: datefilter,
    filtrocontrato: contractfilter,
    filtrofaena: faenafilter
  }
};