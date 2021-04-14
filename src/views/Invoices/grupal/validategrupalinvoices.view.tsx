import * as React from 'react';
import { Input, Row, Col, Select } from "antd";

import TableComponent from "../../../component/Table/Table";

interface IValidateGroupInvoicesViewProps {
}

const ValidateGroupInvoicesView: React.FunctionComponent<IValidateGroupInvoicesViewProps> = (props) => {
  const { TextArea, Search } = Input;
  const { Option } = Select;

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={8}>
          <Select placeholder='Estado factura' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Aprobado</Option>
            <Option value="lucy">Rechazado</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={24}>
          <TextArea rows={4} placeholder='Observaciones'></TextArea>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <Col span={24}>
        <Search
          placeholder="Buscar factura"
          onSearch={() => { }}
          style={{
            paddingBottom: '1rem',
            width: '100%'
          }}
        />
        <TableComponent
          onClickAction={() => { }}
          onClickDelete={() => { }}
          useStyle={false}
          enableRowSelection
          enablePagination={false}
          headerWithColor
        />
      </Col>
    </Input.Group>
  );
};

export default ValidateGroupInvoicesView;
