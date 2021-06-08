import { httpClient, httpClientFormData } from "../libs/axios";
import { PREFIX_PAYMENTS } from "../constants/var";
import { IPayment } from "../models/payments.models";

const getAllPaymentsService = async (pageNumber: number, nPerPage: number) => {
  const extension = `${PREFIX_PAYMENTS}/pagination`;
  try {
    const response = await httpClient.post(extension, { pageNumber, nPerPage });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getAllPendingPaymentsService = async () => {
  const extension = `${PREFIX_PAYMENTS}/pending`;
  try {
    const response = await httpClient.get(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const generateParcialPaymentService = async (id: string, data: FormData) => {
  const extension = `${PREFIX_PAYMENTS}/nuevo/${id}`;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const generateGroupPaymentsService = async (data: FormData) => {
  const extension = `${PREFIX_PAYMENTS}/many`;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const filterPaymentsService = async (
  identificador: number,
  filtro: string,
  headFilter: string,
  pageNumber: number,
  nPerPage: number
) => {
  const extension = `${PREFIX_PAYMENTS}/buscar`;
  try {
    const response = await httpClient.post(extension, {
      identificador,
      filtro,
      headFilter,
      pageNumber,
      nPerPage
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteGeneralPaymentService = async (id: string) => {
  const extension = `${PREFIX_PAYMENTS}/${id}`;
  try {
    const response = await httpClient.delete(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const deletePaymentService = async (id: string, payment: IPayment) => {
  const extension = `${PREFIX_PAYMENTS}/pagos/onepayment/${id}`;
  try {
    const response = await httpClient.post(extension, payment);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  getAllPaymentsService,
  getAllPendingPaymentsService,
  generateParcialPaymentService,
  generateGroupPaymentsService,
  filterPaymentsService,
  deleteGeneralPaymentService,
  deletePaymentService
}