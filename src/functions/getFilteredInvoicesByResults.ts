import { InvoicesModel } from '../models/invoices.models'
import { ResultModel } from '../models/results.model'

export default function getFilteredInvoicesByResults(
    results: ResultModel[],
    invoices: InvoicesModel[]
) {
    let invoicesFiltered: InvoicesModel[] = []
    if (!results.length) return []
    results.forEach((result: ResultModel) => {
        const aux: InvoicesModel | undefined = invoices.find(
            (invoice: InvoicesModel) =>
                invoice.codigo.replace('FAC', 'RES') === result.codigo
        )
        if (aux) {
            invoicesFiltered.push({
                ...aux,
                fecha_resultado: result.fecha_resultado,
            })
        }
    })

    return invoicesFiltered
}
