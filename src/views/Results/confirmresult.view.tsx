import * as React from 'react';
import { Input, Row, Col, Select, DatePicker, TimePicker } from "antd";

import TableComponent from "../../component/Table/Table";

interface IConfirmResultViewProps {
}

const ConfirmResultView: React.FunctionComponent<IConfirmResultViewProps> = (props) => {
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <Row>
      <Col span={12}>
        <Input.Group>
          <Row gutter={8}>
            <Col span={12}>
              <Select placeholder='Estado' style={{ width: '100%' }} onChange={() => { }}>
                <Option value="jack">Aprobado</Option>
                <Option value="lucy">Rechazado</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Select placeholder='Estado' style={{ width: '100%' }} onChange={() => { }}>
                <Option value="jack">Aprobado</Option>
                <Option value="lucy">Aprobado con obs</Option>
                <Option value="jack">Pendiente</Option>
                <Option value="lucy">Rechazado</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={8}>
            <Col span={8}>
              <Input
                placeholder="Vigencia examen"
                type='number'
              />
            </Col>
            <Col span={8}>
              <DatePicker placeholder='Fecha resultado' style={{ width: '100%' }} />
            </Col>
            <Col span={8}>
              <TimePicker placeholder='Hora resultado' format='HH:mm' style={{ width: '100%' }} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <TextArea rows={4} placeholder='Observaciones' />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Select
                mode="tags"
                placeholder="Please select"
                onChange={() => {}}
                style={{ width: '100%' }}
              >
                <Option value="lentes" key='1'>Uso lentes</Option>
                <Option value="audifonos" key='2'>Uso audífonos</Option>
                <Option value="sin" key='3'>Sin condicionantes</Option>
              </Select>
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
        />
      </Col>
    </Row>
  );
};

export default ConfirmResultView;
