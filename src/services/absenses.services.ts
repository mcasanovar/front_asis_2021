import { httpClient, httpClientFormData } from '../libs/axios'
import { PREFIX_AUSENCES } from '../constants/var'

const getAbsensesByIdAndDateService = async (
    id: string,
    month: string,
    year: string
) => {
    const extension = `${PREFIX_AUSENCES}/show/${id}/${month}/${year}`
    try {
        const response = await httpClient.post(extension)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

const insertAbsenseService = async (data: FormData) => {
    const extension = `${PREFIX_AUSENCES}`
    try {
        const response = await httpClientFormData.post(extension, data)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export { getAbsensesByIdAndDateService, insertAbsenseService }
