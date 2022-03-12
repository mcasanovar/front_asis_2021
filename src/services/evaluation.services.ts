import { httpClient, httpClientFormData } from '../libs/axios'
import { PREFIX_EVALUATION } from '../constants/var'

const getAllEvaluationsService = async (
    pageNumber: number,
    nPerPage: number
) => {
    const extension = `${PREFIX_EVALUATION}/pagination`
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

const getOneEvaluationService = async (id: string) => {
    const extension = `${PREFIX_EVALUATION}/${id}`
    try {
        const response = await httpClient.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const uploadExamService = async (id: string, data: FormData) => {
    const extension = `${PREFIX_EVALUATION}/evaluar/${id}`
    try {
        const response = await httpClientFormData.post(extension, data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const downloadExamService = async (id: string) => {
    const extension = `${PREFIX_EVALUATION}/downloadfile/${id}`
    try {
        const response = await httpClientFormData.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const confirmExamService = async (
    id: string,
    estado_archivo: string,
    fecha_confirmacion_examen: string,
    hora_confirmacion_examen: string,
    observaciones: string
) => {
    const extension = `${PREFIX_EVALUATION}/evaluado/${id}`
    try {
        const response = await httpClient.post(extension, {
            estado_archivo,
            fecha_confirmacion_examen,
            hora_confirmacion_examen,
            observaciones,
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const deleteEvaluationService = async (id: string) => {
    const extension = `${PREFIX_EVALUATION}/${id}`
    try {
        const response = await httpClient.delete(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const filterEvaluationsService = async (
    identificador: number,
    filtro: string,
    headFilter: string,
    pageNumber: number,
    nPerPage: number
) => {
    const extension = `${PREFIX_EVALUATION}/buscar`
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

const createExamPsicoService = async (data: any) => {
    const extension = `${PREFIX_EVALUATION}/evaluacionpsico`
    try {
        const response = await httpClient.post(extension, data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const createExamAversionService = async (data: any) => {
    const extension = `${PREFIX_EVALUATION}/evaluacionaversion`
    try {
        const response = await httpClient.post(extension, data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export {
    getAllEvaluationsService,
    getOneEvaluationService,
    uploadExamService,
    downloadExamService,
    confirmExamService,
    deleteEvaluationService,
    filterEvaluationsService,
    createExamPsicoService,
    createExamAversionService,
}
