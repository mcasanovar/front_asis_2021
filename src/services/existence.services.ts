import { httpClient, httpClientFormData } from '../libs/axios'
import { PREFIX_EXISTENCE } from '../constants/var'

const getAllExistencesService = async (
    pageNumber: number,
    nPerPage: number
) => {
    const extension = `${PREFIX_EXISTENCE}/pagination`
    try {
        const response = await httpClient.post(extension, {
            pageNumber,
            nPerPage,
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const filterExistencesService = async (
    identificador: number,
    filtro: string,
    headFilter: string,
    pageNumber: number,
    nPerPage: number
) => {
    const extension = `${PREFIX_EXISTENCE}/buscar`
    try {
        const response = await httpClient.post(extension, {
            identificador,
            filtro,
            headFilter,
            pageNumber,
            nPerPage,
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { getAllExistencesService, filterExistencesService }
