import * as React from 'react';
import {  Input, Row, Col, Select } from "antd";

import TableComponent from "../../component/Table/Table";


interface IConfirmOCViewProps {
}

const ConfirmOCView: React.FunctionComponent<IConfirmOCViewProps> = (props) => {
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <Row gutter={8}>
      <Col span={12}>
        <Input.Group>
          <Row gutter={8}>
            <Col span={12}>
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
        </Input.Group>
      </Col>
      <Col span={12}>
        <TableComponent
          onClickAction={() => { }}
          onClickDelete={() => { }}
          useStyle={false}
          enablePagination={false}
          headerWithColor
        />
      </Col>
    </Row>
  );
};

export default ConfirmOCView;
