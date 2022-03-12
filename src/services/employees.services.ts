import { httpClient, httpClientFormData } from '../libs/axios'
import { PREFIX_EMPLOYEES } from '../constants/var'

const getAllEmployeesService = async (pageNumber: number, nPerPage: number) => {
    const extension = `${PREFIX_EMPLOYEES}/pagination`
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

const filterEmployeesService = async (
    identificador: number,
    filtro: string,
    headFilter: string,
    pageNumber: number,
    nPerPage: number
) => {
    const extension = `${PREFIX_EMPLOYEES}/buscar`
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

const editEmployeeService = async (id: string, data: any) => {
    const extension = `${PREFIX_EMPLOYEES}/${id}`
    try {
        const response = await httpClient.put(extension, data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const deleteEmployeeService = async (id: string) => {
    const extension = `${PREFIX_EMPLOYEES}/${id}`
    try {
        const response = await httpClient.delete(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const downloadFileEmployeeService = async (filestring: string) => {
    const extension = `${PREFIX_EMPLOYEES}/downloadfile/${filestring}/`
    try {
        const response = await httpClient.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export {
    getAllEmployeesService,
    filterEmployeesService,
    editEmployeeService,
    deleteEmployeeService,
    downloadFileEmployeeService,
}
