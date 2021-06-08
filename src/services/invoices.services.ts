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

//----------------------------------------GROUP SERVICES
const getGroupOCService = async () => {
  const extension = `${PREFIX_INVOICES}/getoc`;
  try {
    const response = await httpClient.get(extension);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const uploadGroupOCService = async (data: FormData) => {
  const extension = `${PREFIX_INVOICES}/oc/subiroc/many`;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const getGroupOCConfirmService = async () => {
  const extension = `${PREFIX_INVOICES}/getconfirmoc`;
  try {
    const response = await httpClient.get(extension);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const confirmGroupOCService = async (data: any) => {
  const extension = `${PREFIX_INVOICES}/oc/confirmaroc/many`;
  try {
    const response = await httpClient.post(extension, data);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const getGroupInvoiceToUploadService = async () => {
  const extension = `${PREFIX_INVOICES}/getinvoices`;
  try {
    const response = await httpClient.get(extension);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const uploadGroupInvoicesService = async (data: FormData) => {
  const extension = `${PREFIX_INVOICES}/`;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const confirmGroupInvoicesService = async (data: any) => {
  const extension = `${PREFIX_INVOICES}/validar/factura/asis/many`;
  try {
    const response = await httpClient.post(extension, data);
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

//-----------------------------------------------------

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

const deleteInvoiceService = async (id: string) => {
  const extension = `${PREFIX_INVOICES}/${id}`;
  try {
    const response = await httpClient.delete(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  getAllInvoicesService,
  getGroupOCService,
  uploadGroupOCService,
  uploadOCService,
  getGroupOCConfirmService,
  getGroupInvoiceToUploadService,
  uploadGroupInvoicesService,
  confirmGroupOCService,
  downloadFilesService,
  confirmGroupInvoicesService,
  confirmOCService,
  generateInvoiceService,
  filterInvoicesService,
  confirmInvoiceService,
  deleteInvoiceService
}