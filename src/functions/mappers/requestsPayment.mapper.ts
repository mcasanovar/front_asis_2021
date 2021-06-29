import { GiModel } from "../../models/gi.models";
import { RequestPaymentModel } from "../../models/requestpayment.models";

export const MapDataToConsolidatedReport = (gi: GiModel | undefined, cobranzas: RequestPaymentModel[] | undefined, emails: {email: string, name: string}[]) => {
  return {
    gi,
    cobranzas,
    emails
  }
};