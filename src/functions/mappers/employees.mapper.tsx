import moment from 'moment'
import { FORMAT_DATE } from '../../constants/var'
import { GiModel } from '../../models/gi.models'

const MapEmployeeToEdit = (employee: GiModel) => {
    return {
        ...employee,
        fecha_inicio_contrato:
            employee.fecha_inicio_contrato !== ''
                ? employee.fecha_inicio_contrato
                : moment().format(FORMAT_DATE),
    }
}

export { MapEmployeeToEdit }
