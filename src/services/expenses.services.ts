import { httpClient, httpClientFormData } from '../libs/axios'
import { PREFIX_EXPENSES } from '../constants/var'
import { IEntries } from '../models/expenses.models'

const getAllExpensesService = async (pageNumber: number, nPerPage: number) => {
    const extension = `${PREFIX_EXPENSES}/pagination`
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

const insertExpenseService = async (data: FormData) => {
    const extension = PREFIX_EXPENSES
    try {
        const response = await httpClientFormData.post(extension, data)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const downloadFileExpenseService = async (id: string) => {
    const extension = `${PREFIX_EXPENSES}/downloadfile/${id}`
    try {
        const response = await httpClient.get(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const filterExpensesService = async (
    identificador: number,
    filtro: string,
    headFilter: string,
    pageNumber: number,
    nPerPage: number
) => {
    const extension = `${PREFIX_EXPENSES}/buscar`
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

const insertEntriesService = async (idExpense: string, entries: IEntries[]) => {
    const extension = `${PREFIX_EXPENSES}/entrada/${idExpense}`
    try {
        const response = await httpClient.post(extension, entries)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const getExpenseByCategory = async (
    category: string,
    subcategoryone: string,
    subcategorytwo: string
) => {
    const extension = `${PREFIX_EXPENSES}/searchbycategory`
    try {
        const response = await httpClient.post(extension, {
            category,
            subcategoryone,
            subcategorytwo,
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const deleteExpenseService = async (id: string) => {
    const extension = `${PREFIX_EXPENSES}/${id}`
    try {
        const response = await httpClient.delete(extension)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export {
    insertExpenseService,
    getAllExpensesService,
    downloadFileExpenseService,
    filterExpensesService,
    insertEntriesService,
    getExpenseByCategory,
    deleteExpenseService,
}
