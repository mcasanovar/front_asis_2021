import { IPayment, PaymentModel } from "../../models/payments.models";

const MapParcialPaymentToGenerate = (payment: PaymentModel, partialPayment: IPayment) => {
  return {
    ...partialPayment,
    sucursal: payment.sucursal,
    codigo: payment.codigo
  }
};

export { MapParcialPaymentToGenerate }