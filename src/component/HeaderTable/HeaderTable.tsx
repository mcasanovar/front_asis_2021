import * as React from 'react';
import { Select, Input, DatePicker } from 'antd';

import { IButtonsProps } from '../../models/index.models';

import ButtonComponent from "../Button/Button";
import { IFiltersGI } from '../../models/gi.models';
import { FORMAT_DATE } from '../../constants/var';
import { IFiltersEvaluation } from '../../models/evaluations.models';
import { IFiltersResults } from '../../models/results.model';

interface IHeaderTableProps {
  title: string,
  subtitle: string,
  buttons?: IButtonsProps[],
  showDateFilter?: boolean,
  onClick: (button: IButtonsProps) => IButtonsProps | void,
  onClickSearch: () => void,
  onClickDateFilter: (date: string) => string | void,
  showInvoicesOptions?: boolean
  onClickGrupal: (value: string) => void
  dataFilter?: IFiltersGI[] | IFiltersEvaluation[] | IFiltersResults[],
  filterText?: string,
  setFilterText: React.Dispatch<React.SetStateAction<string>>
  setOptionFilter: React.Dispatch<React.SetStateAction<number>>
}

const HeaderTableComponent: React.FunctionComponent<IHeaderTableProps> = ({
  title,
  subtitle,
  buttons = [],
  showDateFilter = false,
  onClick,
  showInvoicesOptions = false,
  onClickGrupal,
  dataFilter = [],
  filterText = '',
  setFilterText,
  onClickSearch,
  onClickDateFilter,
  setOptionFilter
}) => {

  const { Option } = Select;
  const { Search } = Input;

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
            <DatePicker 
              style={{ width: 150, marginRight: '10px' }}
              onSelect={(e) => onClickDateFilter(e.format(FORMAT_DATE))} 
            />
          }
          <Select
            showSearch
            style={{ width: 160, paddingRight: 5 }}
            placeholder="Filtro"
            optionFilterProp="children"
            onSelect={(e) => setOptionFilter(parseInt(e.toString()))}
          >
            {dataFilter.length > 0 && dataFilter.map((item) => (
              <Option value={item.key}>{item.value}</Option>
            ))}
          </Select>
          <Search 
            placeholder="Buscar..." 
            enterButton="Buscar" 
            size="middle" 
            loading={false}
            style={{ width: 600, height: '2rem', marginLeft: 0 }}
            onChange={(e) => setFilterText(e.currentTarget.value)}
            onSearch={() => onClickSearch()}
            value={filterText}
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
          {showInvoicesOptions &&
            <Select placeholder='Pago Grupal...' style={{ width: 160 }} onChange={onClickGrupal}>
              <Option value="uploadgroupoc">Carga OC grupal</Option>
              <Option value="validategroupoc">Validar OC grupal</Option>
              <Option value="uploadgroupinvoice">Carga factura grupal</Option>
              <Option value="validategroupinvoice">Validar factura grupal</Option>
            </Select>}
        </div>
      </div>
    </div>
  );
};

export default HeaderTableComponent;
