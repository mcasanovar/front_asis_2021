import React, { useState } from 'react';
import { Col, Input, Row, Form, Typography, Button} from 'antd';
import { DollarOutlined } from "@ant-design/icons";
import { PaymentModel } from '../../models/payments.models';
import { IAlertMessageContent } from '../../models/index.models';

import AlertComponent from "../../component/Alert/Alert";

import { MilesFormat } from '../../libs/formattedPesos';

interface IDetailsPaymentViewProps {
  onCloseModal: (value: string, message: string) => string | void
  paymentSelected: PaymentModel | undefined
}

const DetailsPaymentView: React.FunctionComponent<IDetailsPaymentViewProps> = ({
  onCloseModal,
  paymentSelected
}) => {
  const { Title } = Typography;

  const [messageAlert] = useState<IAlertMessageContent>({ message: '', type: 'success', show: false });

  return (
    <Form layout='vertical'>
      {messageAlert.show && <AlertComponent message={messageAlert.message} type={messageAlert.type} />}
      {<Title level={4}>{`${paymentSelected?.nombre_servicio} - ${paymentSelected?.codigo}`}</Title>}
      <br />
      <Input.Group>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label='Código'
            >
              <Input
                readOnly
                value={paymentSelected?.codigo}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Estado proceso'
            >
              <Input
                readOnly
                value={paymentSelected?.estado}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            <Form.Item
              label='Rut CP'
            >
              <Input
                readOnly
                value={paymentSelected?.rut_cp}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Razon social CP'
            >
              <Input
                readOnly
                value={paymentSelected?.razon_social_cp}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label='Rut CS'
            >
              <Input
                readOnly
                value={paymentSelected?.rut_cs}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Razon social CS'
            >
              <Input
                readOnly
                value={paymentSelected?.razon_social_cs}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              label='Faena'
            >
              <Input
                readOnly
                value={paymentSelected?.faena_seleccionada_cp}
              />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label='Nombre servicio'
            >
              <Input
                readOnly
                value={paymentSelected?.nombre_servicio}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              label='Fecha facturación'
            >
              <Input
                readOnly
                value={paymentSelected?.fecha_facturacion}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Nro. factura'
            >
              <Input
                readOnly
                value={paymentSelected?.nro_factura}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Fecha de pago'
            >
              <Input
                readOnly
                value={paymentSelected?.fecha_pago}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label='Sucursal'
            >
              <Input
                readOnly
                value={paymentSelected?.sucursal}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Lugar de servicio'
            >
              <Input
                readOnly
                value={paymentSelected?.lugar_servicio}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label='Valor servicio'
            >
              <Input
                readOnly
                value={`$ ${MilesFormat(paymentSelected?.valor_servicio || 0)}`}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Valor pagado'
            >
              <Input
                readOnly
                value={`$ ${MilesFormat(paymentSelected?.valor_cancelado || 0)}`}
              />
            </Form.Item>
          </Col>
        </Row>
      </Input.Group>
      <Row gutter={8} style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
        <Col
          span={2}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={() => onCloseModal('', '')}
            style={{ backgroundColor: '#1073B5', color: 'white', width: '100%' }}
          >
            OK
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DetailsPaymentView;
