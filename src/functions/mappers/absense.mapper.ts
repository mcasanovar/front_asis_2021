import { Moment } from 'moment'
import { FORMAT_DATE } from '../../constants/var'
import { AusencesModel } from '../../models/ausences.models'

const MapAbsenseToInsert = (
    absense: AusencesModel,
    idEmployee: string,
    initdate: Moment,
    finishdate: Moment
) => {
    const diffDays = finishdate.diff(initdate, 'days')
    const auxDays =
        absense.abrev_ausencia === 'MD' || absense.abrev_ausencia === 'MR'
            ? diffDays / 2
            : diffDays
    return {
        ...absense,
        id_empleado: idEmployee,
        fecha_inicio_ausencia: initdate.format(FORMAT_DATE),
        fecha_fin_ausencia: finishdate.format(FORMAT_DATE),
        cantidad_dias: finishdate === initdate ? 1 : auxDays,
        mes_ausencia: initdate.format('MMMM'),
        anio_ausencia: initdate.format('YYYY'),
    }
}

export { MapAbsenseToInsert }
