import { httpClient, httpClientFormData } from "../libs/axios";
import { PREFIX_RESERVATION } from "../constants/var";

const getAllReservationsService = async (pageNumber: number, nPerPage: number) => {
  const extension = `${PREFIX_RESERVATION}/pagination`;
  try {
    const response = await httpClient.post(extension, { pageNumber, nPerPage });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getGroupReservationsService = async () => {
  const extension = `${PREFIX_RESERVATION}/ingresadas`;
  try {
    const response = await httpClient.get(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getReservationsByDateService = async (month: string | null = null, year: string | null = null) => {
  const extension = `${PREFIX_RESERVATION}/date`;
  try {
    const response = await httpClient.post(extension, { month, year });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const filterReservationsService = async (
  identificador: number,
  filtro: string,
  headFilter: string,
  pageNumber: number,
  nPerPage: number
) => {
  const extension = `${PREFIX_RESERVATION}/buscar`;
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

const getOneReservationService = async (id: string) => {
  const extension = `${PREFIX_RESERVATION}/${id}`;
  try {
    const response = await httpClient.get(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const confirmReservationService = async (id: string, data: FormData) => {
  const extension = `${PREFIX_RESERVATION}/confirmar/${id}`;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const confirmGroupReservationsService = async (data: FormData) => {
  const extension = `${PREFIX_RESERVATION}/confirmar`;
  try {
    const response = await httpClientFormData.post(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const editReservationService = async (id: string, data: FormData) => {
  const extension = `${PREFIX_RESERVATION}/${id}`;
  try {
    const response = await httpClientFormData.put(extension, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteReservationService = async (id: string) => {
  const extension = `${PREFIX_RESERVATION}/${id}`;
  try {
    const response = await httpClient.delete(extension);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  getAllReservationsService,
  getGroupReservationsService,
  filterReservationsService,
  confirmReservationService,
  getReservationsByDateService,
  confirmGroupReservationsService,
  getOneReservationService,
  editReservationService,
  deleteReservationService
}