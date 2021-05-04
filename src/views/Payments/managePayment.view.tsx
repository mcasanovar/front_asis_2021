import * as React from 'react';
import { Col, Input, Row, Card, Typography, Form, Table } from 'antd';

import { PaymentModel } from '../../models/payments.models';
import moment from 'moment';
import { FORMAT_DATE } from '../../constants/var';
import { MilesFormat } from '../../libs/formattedPesos';

interface IManagePaymentViewProps {
  onCloseModal: (value: string, message: string) => string | void
  paymentSelected: PaymentModel | undefined
}

const ManagePaymentView: React.FunctionComponent<IManagePaymentViewProps> = ({
  onCloseModal,
  paymentSelected
}) => {
  const { Title, Text } = Typography;
  const { Column } = Table;

  const handleCalculateDatePaymentRequest = () => {
    const invoiceDate = moment(paymentSelected?.fecha_facturacion)
      .add(paymentSelected?.dias_credito, 'days')
      .format(FORMAT_DATE) || moment().format(FORMAT_DATE);
    return invoiceDate;
  };

  const handlePaymentsCount = () => {
    return paymentSelected?.pagos.length || 0;
  };

  const handleDividedAmmount = (type: string) => {
    return paymentSelected?.pagos.reduce((acc, current) => {
      if (current.tipo_pago === type) {
        return acc + current.total
      };
      return acc
    }, 0) || 0;
  };

  return (
    <Form layout='vertical'>
      <Input.Group>
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              label='Fecha factura'
            >
              <Input
                readOnly
                value={paymentSelected?.fecha_facturacion}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Dias crédito'
            >
              <Input
                readOnly
                value={paymentSelected?.dias_credito}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Fecha inicio cobranza'
            >
              <Input
                readOnly
                value={handleCalculateDatePaymentRequest()}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item
              label='Efectivo'
            >
              <Input
                readOnly
                value={`$ ${MilesFormat(handleDividedAmmount('Efectivo'))}`}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Débito'
            >
              <Input
                readOnly
                value={`$ ${MilesFormat(handleDividedAmmount('Débito'))}`}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Crédito'
            >
              <Input
                readOnly
                value={`$ ${MilesFormat(handleDividedAmmount('Crédito'))}`}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label='Transferencia bancaria'
            >
              <Input
                readOnly
                value={`$ ${MilesFormat(handleDividedAmmount('Transferencia bancaria'))}`}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Card
              title="Cantidad de pagos"
              headStyle={{ backgroundColor: '#1073B5', color: 'white' }}
              bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}
            >
              <Title level={4}>{handlePaymentsCount()}</Title>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Recaudado / Deuda total"
              headStyle={{ backgroundColor: '#1073B5', color: 'white' }}
              bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}
            >
              <Title level={4}>
                {`$ ${MilesFormat(paymentSelected?.valor_cancelado || 0)} / $ ${MilesFormat(paymentSelected?.valor_servicio || 0)}`}
              </Title>
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={8}>
          <Col span={24} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
          }}>
            <Table style={{ width: '100%' }} showHeader={true} dataSource={paymentSelected?.pagos} pagination={false}>
              <Column className='column-money' title="Fecha de pago" dataIndex="fecha_pago" key="fecha_pago" />
              <Column className='column-money' title="Sucursal" dataIndex="sucursal" key="sucursal" />
              <Column className='column-money' title="Método de pago" dataIndex="tipo_pago" key="tipo_pago" />
              <Column 
                className='column-money' 
                title="Monto" 
                dataIndex="monto" 
                key="monto"
                render={(_, record: any) => {
                  return <>
                    <Text>{`$ ${MilesFormat(record.monto)}`}</Text>
                  </>
                }} 
              />
              <Column 
                className='column-money' 
                title="Descuento" 
                dataIndex="descuento" 
                key="descuento"
                render={(_, record: any) => {
                  return <>
                    <Text>{`$ ${MilesFormat(record.descuento)}`}</Text>
                  </>
                }}  
              />
              <Column 
                className='column-money' 
                title="Total" 
                dataIndex="total" 
                key="total"
                render={(_, record: any) => {
                  return <>
                    <Text>{`$ ${MilesFormat(record.total)}`}</Text>
                  </>
                }}  
              />
              {/* <Column
                width='20%'
                title="Estado archivo"
                dataIndex="estado_archivo"
                key="estado_archivo"
                className='column-money'
                render={(_, record: any) => {
                  let color = 'grey';
                  if (record.estado === 'Cargado') {
                    color = '#2db7f5';
                  }
                  if (record.estado === 'Aprobado') {
                    color = '#4CAF50';
                  }
                  if (record.estado === 'Rechazado') {
                    color = '#E41B0E';
                  }
                  return <>
                    <Tag color={color}>
                      {record.estado}
                    </Tag>
                  </>
                }}
              /> */}
            </Table>
          </Col>
        </Row>
      </Input.Group>
    </Form>
  );
};

export default ManagePaymentView;
