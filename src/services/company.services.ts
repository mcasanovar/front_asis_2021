import { PREFIX_INVOICES } from '../constants/var'
import { httpClient } from '../libs/axios'

const getCompanyInfoService = async () => {
    const extension = `${PREFIX_INVOICES}/asis`
    try {
        const response = await httpClient.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { getCompanyInfoService }
