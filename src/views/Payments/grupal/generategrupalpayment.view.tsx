import * as React from 'react';
import { Input, Row, Col, Select, DatePicker, Upload, TimePicker } from "antd";
import { DollarOutlined, InboxOutlined } from '@ant-design/icons';

import TableComponent from "../../../component/Table/Table";

interface IGenerateGroupPaymentViewProps {
}

const GenerateGroupPaymentView: React.FunctionComponent<IGenerateGroupPaymentViewProps> = (props) => {
  const { Option } = Select;
  const { TextArea } = Input;

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={8}>
          <DatePicker placeholder='Fecha pago' style={{ width: '100%' }} />
        </Col>
        <Col span={8}>
          <TimePicker placeholder='Hora pago' format='HH:mm' style={{ width: '100%' }} />
        </Col>
        <Col span={8}>
          <Select placeholder='Sucursal' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={12}>
          <Select placeholder='Método de pago' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Efectivo</Option>
            <Option value="lucy">Débito</Option>
            <Option value="Yiminghe">Crédito</Option>
            <Option value="Yiminghe">Transferencia bancaria</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Select placeholder='Institución bancaria' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Efectivo</Option>
            <Option value="lucy">Débito</Option>
            <Option value="Yiminghe">Crédito</Option>
            <Option value="Yiminghe">Transferencia bancaria</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={8}>
          <Input
            placeholder="Monto"
            prefix={<DollarOutlined />}
            type='number'
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Descuento"
            prefix={<DollarOutlined />}
            type='number'
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Total"
            prefix={<DollarOutlined />}
            type='number'
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={24}>
          <TextArea rows={4} placeholder='Observaciones' />
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
      <br />
      <Row>
        <Col span={24}>
          <TableComponent
            onClickAction={() => { }}
            onClickDelete={() => { }}
            useStyle={false}
            enablePagination={false}
            headerWithColor
          />
        </Col>
      </Row>
    </Input.Group>
  );
};

export default GenerateGroupPaymentView;
