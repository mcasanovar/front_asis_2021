import { PREFIX_GIS } from '../constants/var'
import { httpClient, httpClientFormData } from '../libs/axios'
import { ConfigurationGIModel } from '../models/gi.models'

const getAllGIWithoutPaginationService = async () => {
    const extension = `${PREFIX_GIS}`
    try {
        const response = await httpClient.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const getAllGIService = async (pageNumber: number, nPerPage: number) => {
    const extension = `${PREFIX_GIS}/pagination`
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

const getCompanyGIService = async () => {
    const extension = `${PREFIX_GIS}/empresas`
    try {
        const response = await httpClient.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const getWorkersGIService = async () => {
    const extension = `${PREFIX_GIS}/workers`
    try {
        const response = await httpClient.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const insertGIService = async (data: FormData) => {
    const extension = PREFIX_GIS
    try {
        const response = await httpClientFormData.post(extension, data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const filterGisService = async (
    identificador: number,
    filtro: string,
    pageNumber: number,
    nPerPage: number
) => {
    const extension = `${PREFIX_GIS}/buscar`
    try {
        const response = await httpClient.post(extension, {
            identificador,
            filtro,
            pageNumber,
            nPerPage,
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const getOneGIService = async (id: string) => {
    const extension = `${PREFIX_GIS}/${id}`
    try {
        const response = await httpClient.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const editOneGIService = async (id: string, data: FormData) => {
    const extension = `${PREFIX_GIS}/${id}`
    try {
        const response = await httpClientFormData.put(extension, data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const deleteOneGiService = async (id: string) => {
    const extension = `${PREFIX_GIS}/${id}`
    try {
        const response = await httpClient.delete(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const getGIByRutService = async (rut: string, selector: number) => {
    const extension = `${PREFIX_GIS}/client`
    try {
        const response = await httpClient.post(extension, { rut, selector })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const editPasswordService = async (id: string, data: ConfigurationGIModel) => {
    const extension = `${PREFIX_GIS}/editpassword/${id}`
    try {
        const response = await httpClient.put(extension, data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const downloadGIFilesService = async (id: string) => {
    const extension = `${PREFIX_GIS}/downloadfile/${id}`
    try {
        const response = await httpClientFormData.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export {
    getAllGIWithoutPaginationService,
    getCompanyGIService,
    getWorkersGIService,
    insertGIService,
    getAllGIService,
    filterGisService,
    getOneGIService,
    editOneGIService,
    deleteOneGiService,
    getGIByRutService,
    editPasswordService,
    downloadGIFilesService,
}
