import * as React from 'react';
import { Select, Input, DatePicker } from 'antd';

import { IButtonsProps } from '../../models/index.models';

import ButtonComponent from "../Button/Button";

interface IHeaderTableProps {
  title: string,
  subtitle: string,
  buttons?: IButtonsProps[],
  showDateFilter?: boolean,
  onClick: (button: IButtonsProps) => IButtonsProps | void
}

const HeaderTableComponent: React.FunctionComponent<IHeaderTableProps> = ({
  title,
  subtitle,
  buttons = [],
  showDateFilter = false,
  onClick
}) => {

  const { Option } = Select;

  return (
    <div className="container-header-table">
      <div className="container-header-table-grid">
        {/* section title and subtitle */}
        <div className="container-header-table-section1">
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
        </div>
        {/* section button and textinput */}
        <div className="container-header-table-section2">
          {showDateFilter &&
            <DatePicker style={{ width: 150, marginRight: '10px' }} />
          }
          <Select
            showSearch
            style={{ width: 160 }}
            placeholder="Search to Select"
            optionFilterProp="children"
          >
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
            <Option value="3">Communicated</Option>
            <Option value="4">Identified</Option>
            <Option value="5">Resolved</Option>
            <Option value="6">Cancelled</Option>
          </Select>
          <Input.Search
            allowClear
            placeholder='Ingrese texto...'
            style={{ width: 500, height: '2rem', paddingLeft: '1rem' }}
          />
        </div>
        <div></div>
        {/* section buttons right */}
        <div className="container-header-table-section3">
          {buttons.length > 0 && buttons.map((button: IButtonsProps, index: number) => (
            <ButtonComponent
              key={index}
              title={button.title}
              size={button.size}
              ghost={true}
              onClick={() => onClick(button)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderTableComponent;
