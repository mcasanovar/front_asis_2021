import { httpClient, httpClientFormData } from "../libs/axios";
import { PREFIX_REQUEST } from "../constants/var";

const getAllRequestsService = async (pageNumber: number, nPerPage: number) => {
  const extension = `${PREFIX_REQUEST}/pagination`;
  try {
    const response = await httpClient.post(extension, { pageNumber, nPerPage });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getOneRequestService = async (id: string) => {
  const extension = `${PREFIX_REQUEST}/${id}`;
  try {
    const response = await httpClient.get(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const insertRequestService = async (data: FormData) => {
  const extension = PREFIX_REQUEST;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const editRequestService = async (id: string, data: FormData) => {
  const extension = `${PREFIX_REQUEST}/${id}`;
  try {
    const response = await httpClientFormData.put(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteOneRequestService = async (id: string) => {
  const extension = `${PREFIX_REQUEST}/${id}`;
  try {
    const response = await httpClient.delete(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { 
  getAllRequestsService, 
  insertRequestService, 
  getOneRequestService,
  editRequestService,
  deleteOneRequestService
}