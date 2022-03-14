import { httpClient, httpClientFormData } from '../libs/axios'
import { PREFIX_LOGIN } from '../constants/var'

const loginService = async (rut: string, password: string) => {
    const extension = PREFIX_LOGIN
    try {
        const response = await httpClient.post(extension, { rut, password })
        return response.data
    } catch (error: any) {
        return error.response.data
    }
}

export { loginService }
