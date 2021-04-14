import * as React from 'react';
import { Input, Row, Col, Select } from "antd";

import TableComponent from "../../../component/Table/Table";

interface IConfirmGroupOCViewProps {
}

const ConfirmGroupOCView: React.FunctionComponent<IConfirmGroupOCViewProps> = (props) => {
  const { Option } = Select;
  const { TextArea, Search } = Input;

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={8}>
          <Select placeholder='Estado archivo' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Aprobado</Option>
            <Option value="lucy">Rechazado</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={24}>
          <TextArea rows={3} placeholder='Observaciones'></TextArea>
        </Col>
      </Row>
      <br/>
      <br/>
      <br/>
      <br/>
      <Row>
        <Col span={24}>
          <Search
            placeholder="Buscar solicitudes"
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
      </Row>
    </Input.Group>
  );
};

export default ConfirmGroupOCView;
