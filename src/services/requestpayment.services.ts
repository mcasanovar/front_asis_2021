import { httpClient, httpClientFormData } from "../libs/axios";
import { PREFIX_REQUEST_PAYMENT } from "../constants/var";

const getAllRequestPaymentService = async (pageNumber: number, nPerPage: number) => {
  const extension = `${PREFIX_REQUEST_PAYMENT}/pagination`;
  try {
    const response = await httpClient.post(extension, { pageNumber, nPerPage });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const filterRequestPaymentService = async (
  identificador: number,
  filtro: string,
  headFilter: string,
  pageNumber: number,
  nPerPage: number
) => {
  const extension = `${PREFIX_REQUEST_PAYMENT}/buscar`;
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

const sendMailsTemplatRequestPaymentService = async (id: string, data: any) => {
  const extension = `${PREFIX_REQUEST_PAYMENT}/sendmail/${id}`;
  try {
    const response = await httpClient.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { getAllRequestPaymentService, filterRequestPaymentService, sendMailsTemplatRequestPaymentService }