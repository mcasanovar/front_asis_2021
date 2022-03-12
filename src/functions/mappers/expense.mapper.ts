import moment from 'moment'
import { FORMAT_DATE } from '../../constants/var'
import { ExpensesModel } from '../../models/expenses.models'

const MapExpenseToInsert = (expense: ExpensesModel) => {
    return {
        ...expense,
        fecha_registro: moment().format(`${FORMAT_DATE} HH:mm`),
        id_servicio:
            expense.requiere_servicio === 'Si' ? expense.id_servicio : '',
        servicio: expense.requiere_servicio === 'Si' ? expense.servicio : '',
    }
}

export { MapExpenseToInsert }
