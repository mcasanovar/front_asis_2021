import * as React from 'react'
import { Calendar } from 'antd'
import { Moment } from 'moment'

type ICalendarComponentProps = {
    onSelect: (e: Moment) => void | Moment
    onPanelChange: (e: Moment, mode: string) => void | Moment
    dateCellRender: (date: Moment) => React.ReactNode
    monthCellRender: (date: Moment) => React.ReactNode
    customStyle?: React.CSSProperties
}

const CalendarComponent: React.FunctionComponent<ICalendarComponentProps> = ({
    onSelect,
    onPanelChange,
    dateCellRender,
    monthCellRender,
    customStyle,
}) => {
    return (
        <Calendar
            onSelect={e => onSelect(e)}
            onPanelChange={(e, type) => onPanelChange(e, type)}
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            style={{ ...customStyle }}
        />
    )
}

export default CalendarComponent
