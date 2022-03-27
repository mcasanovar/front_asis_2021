export type IProduction = {
    type: string
    data: number[]
}

export type ICashFlow = {
    type: string
    data: number[]
}

type IRankingInvoices = {
    rut: string
    name: string
    quantity: number
}

type IRankingPayment = {
    rut: string
    name: string
    quantity: number
}

type IResponseTypeData = {
    type: string[]
    data: number[]
}

type ITotalCategories = {
    category1: IResponseTypeData
    category3: IResponseTypeData
    services: IResponseTypeData
    typeServices: IResponseTypeData
    placeServices: IResponseTypeData
    workplaces: IResponseTypeData
}

export type IResportsResponse = {
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

export type IResponseDashboard = {
    err: any
    msg: string
    res: IResportsResponse
}
