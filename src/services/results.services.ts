import { httpClient, httpClientFormData } from "../libs/axios";
import { PREFIX_RESULTS } from "../constants/var";

const getAllResultsService = async (pageNumber: number, nPerPage: number) => {
  const extension = `${PREFIX_RESULTS}/pagination`;
  try {
    const response = await httpClient.post(extension, { pageNumber, nPerPage });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const downloadResultService = async (id: string) => {
  const extension = `${PREFIX_RESULTS}/downloadfile/${id}`;
  try {
    const response = await httpClient.get(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getOneResultService = async (id: string) => {
  const extension = `${PREFIX_RESULTS}/${id}`;
  try {
    const response = await httpClient.get(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const confirmResultService = async (id: string, data: any) => {
  const extension = `${PREFIX_RESULTS}/confirmar/${id}`;
  try {
    const response = await httpClient.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const uploadResultService = async (id: string, data: FormData) => {
  const extension = `${PREFIX_RESULTS}/subir/${id}`;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteResultService = async (id: string) => {
  const extension = `${PREFIX_RESULTS}/${id}`;
  try {
    const response = await httpClient.delete(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const filterResultsService = async (
  identificador: number,
  filtro: string,
  headFilter: string,
  pageNumber: number,
  nPerPage: number
) => {
  const extension = `${PREFIX_RESULTS}/buscar`;
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

const sendMailsTemplatResultService = async (id: string, data: any) => {
  const extension = `${PREFIX_RESULTS}/sendmail/${id}`;
  try {
    const response = await httpClient.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getResultsByRutGIService = async (rut: string) => {
  const extension = `${PREFIX_RESULTS}/gifilter/${rut}`;
  try {
    const response = await httpClient.get(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const generateConsolidatedReportResultsService = async (data: any) => {
  const extension = `${PREFIX_RESULTS}/pdfconsolidado`;
  try {
    const response = await httpClient.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { 
  getAllResultsService, 
  downloadResultService, 
  getOneResultService,
  deleteResultService,
  filterResultsService,
  confirmResultService,
  uploadResultService,
  sendMailsTemplatResultService,
  getResultsByRutGIService,
  generateConsolidatedReportResultsService
}