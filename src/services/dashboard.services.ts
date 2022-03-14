import { httpClient, httpClientFormData } from '../libs/axios'
import { PREFIX_DASHBOARD } from '../constants/var'

const getAllReportsServices = async (year: string) => {
    const extension = `${PREFIX_DASHBOARD}/${year}`
    try {
        const response = await httpClient.get(extension)
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export { getAllReportsServices }
