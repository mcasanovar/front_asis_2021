import * as React from 'react';
import { Calendar } from "antd";
import moment, { Moment } from 'moment';

interface ICalendarComponentProps {
  onSelect: (e: Moment) => void | Moment
  onPanelChange: (e: Moment, mode: string) => void | Moment,
  dateCellRender: (date: Moment) => React.ReactNode 
}

const CalendarComponent: React.FunctionComponent<ICalendarComponentProps> = ({
  onSelect,
  onPanelChange,
  dateCellRender
}) => {
  return (
    <Calendar 
      onSelect={(e) => onSelect(e)}
      onPanelChange={(e, type) => onPanelChange(e, type)}
      dateCellRender={dateCellRender}
    />
  );
};

export default CalendarComponent;
