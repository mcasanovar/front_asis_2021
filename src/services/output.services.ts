import { httpClient, httpClientFormData } from "../libs/axios";
import { PREFIX_OUTPUT } from "../constants/var";
import { OutputModel } from "../models/outputs.models";

const getAllOutputsService = async (pageNumber: number, nPerPage: number) => {
  const extension = `${PREFIX_OUTPUT}/pagination`;
  try {
    const response = await httpClient.post(extension, { pageNumber, nPerPage });
    return response.data
  } catch (error) {
    return error.response.data;
  }
};

const insertOutputService = async (data: any) => {
  const extension = `${PREFIX_OUTPUT}`;
  try {
    const response = await httpClient.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const editOutputService = async (id: string, data: any) => {
  const extension = `${PREFIX_OUTPUT}/${id}`;
  try {
    const response = await httpClient.put(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteOutputService = async (id: string) => {
  const extension = `${PREFIX_OUTPUT}/${id}`;
  try {
    const response = await httpClient.delete(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const filterOutputsService = async (
  identificador: number,
  filtro: string,
  headFilter: string,
  pageNumber: number,
  nPerPage: number
) => {
  const extension = `${PREFIX_OUTPUT}/buscar`;
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
  getAllOutputsService, 
  insertOutputService,
  editOutputService, 
  deleteOutputService, 
  filterOutputsService 
}


