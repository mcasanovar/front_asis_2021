import * as React from 'react';
import { Input, Row, Col, Select, DatePicker, Upload, TimePicker } from "antd";
import { InboxOutlined } from '@ant-design/icons';

import TableComponent from "../../component/Table/Table";

interface IEditReservationViewProps {
}

const EditReservationView: React.FunctionComponent<IEditReservationViewProps> = (props) => {
  const { Option } = Select;

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={12}>
          <Input
            placeholder="Código reserva"
          />
        </Col>
        <Col span={12}>
          <Select placeholder='Profesional asignado' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={6}>
          <DatePicker placeholder='Fecha inicio reserva' style={{ width: '100%' }} />
        </Col>
        <Col span={6}>
          <TimePicker format='HH:mm' placeholder='Hora inicio reserva' style={{ width: '100%' }} />
        </Col>
        <Col span={6}>
          <DatePicker placeholder='Fecha término reserva' style={{ width: '100%' }} />
        </Col>
        <Col span={6}>
          <TimePicker format='HH:mm' placeholder='Hora término reserva' style={{ width: '100%' }} />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={6}>
          <Select placeholder='Sucursal' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Si</Option>
            <Option value="lucy">No</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Select placeholder='¿Requiere evaluación?' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Si</Option>
            <Option value="lucy">No</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
            <p className="ant-upload-hint">10mb max.</p>
          </Upload.Dragger>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col span={24}>
          <TableComponent
            onClickAction={() => { }}
            onClickDelete={() => { }}
            useStyle={false}
            enablePagination={false}
          />
        </Col>
      </Row>
    </Input.Group>
  );
};

export default EditReservationView;
