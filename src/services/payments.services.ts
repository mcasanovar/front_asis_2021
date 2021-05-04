import { httpClient, httpClientFormData } from "../libs/axios";
import { PREFIX_PAYMENTS } from "../constants/var";

const getAllPaymentsService = async (pageNumber: number, nPerPage: number) => {
  const extension = `${PREFIX_PAYMENTS}/pagination`;
  try {
    const response = await httpClient.post(extension, { pageNumber, nPerPage });
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


export { 
  getAllPaymentsService,
  generateParcialPaymentService,
  filterPaymentsService
}