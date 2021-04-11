import * as React from 'react';
import { Col, Input, Row, Select, DatePicker, Upload } from "antd";

import { DollarOutlined, InboxOutlined } from "@ant-design/icons";

interface IEditEmployeeViewProps {
}

const EditEmployeeView: React.FunctionComponent<IEditEmployeeViewProps> = (props) => {
  const { Option } = Select;
  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={6}>
          <Input
            placeholder="Rut"
            onChange={() => { }}
          />
        </Col>
        <Col span={9}>
          <Input
            placeholder="Nombre"
            onChange={() => { }}
          /></Col>
        <Col span={9}>
          <Input
            placeholder="Cargo"
            onChange={() => { }}
          /></Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={10}>
          <Select placeholder='Tipo de contrato' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={5}>
          <DatePicker placeholder='Inicio contrato' style={{ width: '100%' }} />
        </Col>
        <Col span={5}>
          <DatePicker placeholder='Término contrato' style={{ width: '100%' }} />
        </Col>
        <Col span={4}>
          <Input
            placeholder="Estado"
            onChange={() => { }}
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={6}>
          <Input
            placeholder="Sueldo bruto"
            prefix={<DollarOutlined style={{ color: 'green' }} />}
            onChange={() => { }}
          />
        </Col>
        <Col span={9}>
          <Select placeholder='AFP' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={9}>
          <Select placeholder='ISAPRE' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={6}>
          <Select placeholder='Seguridad laboral' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={3}>
          <Input
            placeholder="Dias vacaciones"
            type='number'
            onChange={() => { }}
          />
        </Col>
        <Col span={15}>
          <Input
            placeholder="Comentarios"
            onChange={() => { }}
          />
        </Col>
      </Row>
      <br />
      <Row>
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
    </Input.Group>
  );
};

export default EditEmployeeView;
