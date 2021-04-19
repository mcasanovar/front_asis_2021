import * as React from 'react';
import { Input, Row, Col, Select, DatePicker, Upload, TimePicker } from "antd";
import { InboxOutlined } from "@ant-design/icons";

interface IConfirmRequestViewProps {
}

const ConfirmRequestView: React.FunctionComponent<IConfirmRequestViewProps> = (props) => {
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={6}>
          <Input
            placeholder="Código servicio"
          />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Nombre servicio"
          />
        </Col>
        <Col span={6}>
          <DatePicker placeholder='Fecha confirmación' style={{ width: '100%' }} />
        </Col>
        <Col span={6}>
          <TimePicker placeholder='Hora confirmación' style={{ width: '100%' }} format='HH:mm'/>
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={12}>
          <Input
            placeholder="Email"
            type='email'
          />
        </Col>
        <Col span={12}>
          <Select placeholder='Medio de confirmación' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
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
      {/* <Row>
        <Col span={24}>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click o arrastra el archivo para subirlo</p>
            <p className="ant-upload-hint">10mb max.</p>
          </Upload.Dragger>
        </Col>
      </Row> */}
    </Input.Group>
  );
};

export default ConfirmRequestView;
