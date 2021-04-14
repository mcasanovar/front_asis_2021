import * as React from 'react';
import { Col, Input, Row, Card, Typography } from 'antd';

import TableComponent from "../../component/Table/Table";

interface IManagePaymentViewProps {
}

const ManagePaymentView: React.FunctionComponent<IManagePaymentViewProps> = (props) => {
  const { Title, Paragraph } = Typography;

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={8}>
          <Input
            placeholder="Fecha factura"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Dias crédito"
          />
        </Col>
        <Col span={8}>
          <Input
            placeholder="Fecha inicio cobranza"
          />
        </Col>
      </Row>
      <br />
      <Row gutter={8}>
        <Col span={8}>
          <Card
            title="Cantidad de pagos"
            headStyle={{ backgroundColor: '#1073B5', color: 'white' }}
            bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}
          >
            <Title level={4}>2</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Recaudado / Deuda total"
            headStyle={{ backgroundColor: '#1073B5', color: 'white' }}
            bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10rem' }}
          >
            <Title level={4}>$11.000 / $25.000</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Detalle"
            headStyle={{ backgroundColor: '#1073B5', color: 'white' }}
            bodyStyle={{ height: '10rem' }}
          >
            <Paragraph >Efectivo : $11.000</Paragraph>
            <Paragraph >Débito : $0</Paragraph>
            <Paragraph >Crédito : $0</Paragraph>
            <Paragraph >Transferencia bancaria : $0</Paragraph>
          </Card>
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

export default ManagePaymentView;
