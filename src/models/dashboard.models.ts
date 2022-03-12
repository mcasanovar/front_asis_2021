export interface IProduction {
    type: string
    data: number[]
}

export interface ICashFlow {
    type: string
    data: number[]
}

interface IRankingInvoices {
    rut: string
    name: string
    quantity: number
}

interface IRankingPayment {
    rut: string
    name: string
    quantity: number
}

interface IResponseTypeData {
    type: string[]
    data: number[]
}

interface ITotalCategories {
    category1: IResponseTypeData
    category3: IResponseTypeData
    services: IResponseTypeData
    typeServices: IResponseTypeData
    placeServices: IResponseTypeData
    workplaces: IResponseTypeData
}

export interface IResportsResponse {
    activeGIs: number
    countRequests: number
    countResults: number
    production: IProduction[]
    invoices: number[]
    cashFlow: ICashFlow[]
    rankingInvoices: IRankingInvoices[]
    rankingPayments: IRankingPayment[]
    totalOffices: IResponseTypeData[]
    categories: ITotalCategories
}

export interface IResponseDashboard {
    err: any
    msg: string
    res: IResportsResponse
}
