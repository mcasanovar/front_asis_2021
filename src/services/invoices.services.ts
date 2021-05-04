import { PREFIX_INVOICES } from "../constants/var";
import { httpClient, httpClientFormData } from "../libs/axios";

const getAllInvoicesService = async (pageNumber: number, nPerPage: number) => {
  const extension = `${PREFIX_INVOICES}/pagination`;
  try {
    const response = await httpClient.post(extension, { pageNumber, nPerPage });
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const uploadOCService = async (id: string, data: FormData) => {
  const extension = `${PREFIX_INVOICES}/subiroc/${id}`;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const downloadFilesService = async (id: string, type: string) => {
  const extension = `${PREFIX_INVOICES}/downloadfile/${id}/${type}`;
  try {
    const response = await httpClientFormData.get(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const confirmOCService = async (id: string, data: any) => {
  const extension = `${PREFIX_INVOICES}/confirmaroc/${id}`;
  try {
    const response = await httpClient.post(extension, data);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const generateInvoiceService = async (id: string, data: FormData) => {
  const extension = `${PREFIX_INVOICES}/${id}`;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const confirmInvoiceService = async (id: string, data: any) => {
  const extension = `${PREFIX_INVOICES}/validar/${id}`;
  try {
    const response = await httpClient.post(extension, data);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const filterInvoicesService = async (
  identificador: number,
  filtro: string,
  headFilter: string,
  pageNumber: number,
  nPerPage: number
) => {
  const extension = `${PREFIX_INVOICES}/buscar`;
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
  getAllInvoicesService,
  uploadOCService,
  downloadFilesService,
  confirmOCService,
  generateInvoiceService,
  filterInvoicesService,
  confirmInvoiceService
}