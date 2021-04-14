import * as React from 'react';
import { Col, Input, Row } from 'antd';
import { DollarOutlined } from "@ant-design/icons";

interface IDetailsRequestPaymentViewProps {
}

const DetailsRequestPaymentView: React.FunctionComponent<IDetailsRequestPaymentViewProps> = (props) => {
  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={12}>
          <Input
            placeholder="Código"
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Estado"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={4}>
          <Input
            placeholder="Rut cliente principal"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Razon social cliente principal"
          />
        </Col>
        <Col span={4}>
          <Input
            placeholder="Rut cliente secundario"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Razon social cliente secundario"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={6}>
          <Input
            placeholder="Faena"
          />
        </Col>
        <Col span={18}>
          <Input
            placeholder="Servicio"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={8}>
          <Input
            placeholder="Fecha facturación"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Nro factura"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Fecha pago"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={12}>
          <Input
            placeholder="Sucursal"
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Lugar de servicio"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={12}>
          <Input
            placeholder="Valor servicio"
            prefix={<DollarOutlined />}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Valor pagado"
            prefix={<DollarOutlined />}
          />
        </Col>
      </Row>
    </Input.Group>
  );
};

export default DetailsRequestPaymentView;
