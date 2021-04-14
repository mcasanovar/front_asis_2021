import * as React from 'react';
import { Input, Row, Col, Select, DatePicker, Upload, TimePicker } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import TableComponent from "../../component/Table/Table";

interface IGroupConfirmReservationViewProps {
}

const GroupConfirmReservationView: React.FunctionComponent<IGroupConfirmReservationViewProps> = (props) => {
  const { Option } = Select;
  const { TextArea, Search } = Input;

  return (
    <Row>
      <Col span={12}>
        <Input.Group>
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
            <Col span={12}>
              <Select placeholder='Profesional asignado' style={{ width: '100%' }} onChange={() => { }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select placeholder='Sucursal' style={{ width: '100%' }} onChange={() => { }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select placeholder='¿Requiere evaluación?' style={{ width: '100%' }} onChange={() => { }}>
                <Option value="jack">Si</Option>
                <Option value="lucy">No</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <TextArea rows={3} placeholder='Observaciones' />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
                <p className="ant-upload-hint">10mb max.</p>
              </Upload.Dragger>
            </Col>
          </Row>
        </Input.Group>
      </Col>
      <Col span={12} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        paddingLeft: '1rem'
      }}>
        <Search
          placeholder="Buscar reservas"
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
        />
      </Col>
    </Row>
  );
};

export default GroupConfirmReservationView;
