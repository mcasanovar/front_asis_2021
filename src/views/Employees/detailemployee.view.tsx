import * as React from 'react';
import { Collapse } from "antd";

import TableComponent from "../../component/Table/Table";

import EmployeeInformationView from "./editemployee.view";

interface IDetailsEmployeeProps {
}

const DetailsEmployee: React.FunctionComponent<IDetailsEmployeeProps> = (props) => {
  const { Panel } = Collapse;

  //-----------RENDERS
  const renderEmployeeInformation = () => {
    return (
      <EmployeeInformationView />
    );
  };

  return (
    <Collapse accordion defaultActiveKey={['1']}>
      <Panel header="Empleado" key="1">
        {renderEmployeeInformation()}
      </Panel>
      <Panel header="Desglose" key="2">
        <TableComponent
          onClickAction={(id: string) => { }}
          onClickDelete={() => { }}
          useStyle={false}
        />
      </Panel>
      <Panel header="Ausencias" key="3">
        <TableComponent
          onClickAction={(id: string) => { }}
          onClickDelete={() => { }}
          useStyle={false}
        />
      </Panel>
      <Panel header="Pagos" key="4">
        <TableComponent
          onClickAction={(id: string) => { }}
          onClickDelete={() => { }}
          useStyle={false}
        />
      </Panel>
    </Collapse>
  );
};

export default DetailsEmployee;
