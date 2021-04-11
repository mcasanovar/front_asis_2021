import * as React from 'react';
import { Calendar } from "antd";

interface ICalendarComponentProps {
  onSelect: () => void
}

const CalendarComponent: React.FunctionComponent<ICalendarComponentProps> = ({
  onSelect
}) => {
  return (
    <Calendar 
      onSelect={() => onSelect()}
    />
  );
};

export default CalendarComponent;
