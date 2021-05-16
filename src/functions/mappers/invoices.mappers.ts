import { ICompanyInfo, IGroupConfirmOC, IGroupUploadOC, InvoicesModel } from "../../models/invoices.models";

const MapOcToUpload = (invoice: InvoicesModel, obs_oc: string) => {
  return {
    ...invoice,
    observacion_oc: obs_oc
  }
};

const MapInvoiceToGenerate = (invoice: InvoicesModel, observation: string, companyBussinesName: string, company: ICompanyInfo | undefined) => {
  return {
    ...invoice,
    observacion_factura: observation,
    representante: company?.nombre,
    razon_social_empresa: companyBussinesName,
    email_empresa: company?.email,
  }
};

const MapInvoiceToConfirm = (invoice: InvoicesModel, observation: string) => {
  return {
    estado_archivo: invoice.estado_archivo,
    observaciones: observation,
    nro_nota_credito: invoice.nro_nota_credito,
    fecha_nota_credito: invoice.fecha_nota_credito,
    monto_nota_credito: invoice.monto_nota_credito,
    factura_anular: invoice.factura_anular
  }
};

const MapGroupInvoiceToUploadOC = (data: IGroupUploadOC, selectedKeyInvoices: React.Key[]) => {
  const aux = [
    {
      ...data
    },
    {
      ids: selectedKeyInvoices
    }
  ];

  return aux;
};

const MapGroupInvoiceToConfirmOC = (data: IGroupConfirmOC, selectedKeyInvoices: React.Key[]) => {
  const aux = [
    {
      ...data
    },
    {
      ids: selectedKeyInvoices
    }
  ];

  return aux;
};

export { 
  MapOcToUpload, 
  MapInvoiceToGenerate, 
  MapInvoiceToConfirm, 
  MapGroupInvoiceToUploadOC,
  MapGroupInvoiceToConfirmOC
}