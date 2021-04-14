import * as React from 'react';
import { Col, Input, Row, Tag, DatePicker, TimePicker, Select, Upload } from 'antd';
import { DollarOutlined, InboxOutlined } from "@ant-design/icons";

interface IGeneratePaymentViewProps {
}

const GeneratePaymentView: React.FunctionComponent<IGeneratePaymentViewProps> = (props) => {
  const { Option } = Select;
  const { TextArea } = Input

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={8}>
          <Tag
            color="#108ee9"
            style={{ width: '100%', height: 40, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >Valor servicio : $25.000</Tag>
        </Col>
        <Col span={8}>
          <Tag
            color="#87d068"
            style={{ width: '100%', height: 40, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >Valor pagado : $11.000</Tag>
        </Col>
        <Col span={8}>
          <Tag
            color="#f50"
            style={{ width: '100%', height: 40, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >Valor pendiente : $14.000</Tag>
        </Col>
      </Row>
      <br />
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
          <Input
            placeholder="Cliente principal"
          />
        </Col>
        <Col span={12}>
          <Select placeholder='Método de pago' style={{ width: '100%' }} onChange={() => { }}>
            <Option value="jack">Efectivo</Option>
            <Option value="lucy">Débito</Option>
            <Option value="Yiminghe">Crédito</Option>
            <Option value="Yiminghe">Transferencia bancaria</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Select placeholder='Institución bancaria' style={{ width: '100%' }} onChange={() => { }}>

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
    </Input.Group>
  );
};

export default GeneratePaymentView;
