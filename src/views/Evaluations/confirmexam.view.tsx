import * as React from 'react';

import { Input, Row, Col, Select } from "antd";

import TableComponent from "../../component/Table/Table";

interface IConfirmExamViewProps {
}

const ConfirmExamView: React.FunctionComponent<IConfirmExamViewProps> = (props) => {
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <Row gutter={8}>
      <Col span={12}>
        <Input.Group>
          <Row gutter={8}>
            <Col span={8}>
              <Select placeholder='Estado' style={{ width: '100%' }} onChange={() => { }}>
                <Option value="jack">Aprobado</Option>
                <Option value="lucy">Rechazado</Option>
              </Select>
            </Col>
            <Col span={8}>
              <Input
                placeholder="Fecha"
              />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Hora"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <TextArea rows={4} />
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

export default ConfirmExamView;
