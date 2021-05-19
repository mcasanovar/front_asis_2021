import { IGroupConfirmPayment, IPayment, PaymentModel } from "../../models/payments.models";

const MapParcialPaymentToGenerate = (payment: PaymentModel, partialPayment: IPayment) => {
  return {
    ...partialPayment,
    sucursal: payment.sucursal,
    codigo: payment.codigo
  }
};

const MapGroupConfirmPayments= (data: IGroupConfirmPayment, selectedKeyInvoices: React.Key[], payments: PaymentModel[]) => {
  const codesPayments = payments.map((payment) => payment.codigo);
  const aux = [
    {
      ...data
    },
    {
      ids: selectedKeyInvoices
    },
    {
      codes: codesPayments
    }
  ];

  return aux;
};

export { MapParcialPaymentToGenerate, MapGroupConfirmPayments }