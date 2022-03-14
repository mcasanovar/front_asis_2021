import { PREFIX_ADMIN } from '../constants/var'
import { httpClient } from '../libs/axios'

const getRequestsByCode = async (code: string) => {
    const extension = `${PREFIX_ADMIN}/solicitudes/${code}`
    try {
        const response = await httpClient.post(extension)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

const updateRequestAdmin = async (id: string, data: any) => {
    const extension = `${PREFIX_ADMIN}/solicitudes/${id}`
    try {
        const response = await httpClient.put(extension, data)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export { getRequestsByCode, updateRequestAdmin }
