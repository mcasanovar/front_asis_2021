export interface IProduction {
  type: string,
  data: number[]
}

export interface ICashFlow {
  type: string,
  data: number[]
}

interface IRankingInvoices {
  rut: string,
  name: string,
  quantity: number
}

interface IRankingPayment {
  rut: string,
  name: string,
  quantity: number
}

interface ITotalOffices {
  type: string[],
  data: number[]
}

export interface IResportsResponse {
  activeGIs: number,
  countRequests: number,
  countResults: number,
  production: IProduction[],
  invoices: number[],
  cashFlow: ICashFlow[],
  rankingInvoices: IRankingInvoices[],
  rankingPayments: IRankingPayment[],
  totalOffices: ITotalOffices[]
}

export interface IResponseDashboard {
  err: any,
  msg: string,
  res: IResportsResponse
}